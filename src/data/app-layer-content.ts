import type { AppLayerTopic } from "@/types/tutorial";
import {
  databaseReliabilityTopic,
  databaseSystemsTopic,
} from "./database-curriculum-content";
import { dbreCompleteTrackTopics } from "./dbre-complete-track-content";

const baseAppLayerTopics: AppLayerTopic[] = [
  {
    id: "al-foundations",
    title: "From Programs to Applications",
    overview:
      "You know algorithms. You know data structures. Given an input, you can sort it, search it, traverse it, compress it. But an algorithm by itself is not an application. Something different happens when software has to wait — for a user to click, a server to respond, a timer to fire. That waiting changes everything. This section asks a simple question and follows it all the way down: what is the actual difference between an algorithm and an application?",
    sections: [
      {
        heading: "An Algorithm Runs Once. An Application Waits.",
        content: [
          {
            type: "p",
            text: "Merge sort is clean. You hand it an array, it splits, merges, and returns a sorted result. Done. No matter how many times you call it, it makes no memory of the previous call. It has no opinion about what comes next. It simply runs and exits.",
          },
          {
            type: "p",
            text: "Now think about a login screen. The user types a username. Types a password. Taps submit. A spinner appears. A network response arrives. If valid, the user enters the app. If not, an error shows. The user tries again. Nothing about this is a single algorithm. Something fundamentally different is happening: the software is waiting. It is maintaining state between events. It is reacting, not just computing.",
          },
          {
            type: "callout",
            label: "The Defining Difference",
            text: "An algorithm runs to completion and exits. An application waits for events, updates state in response to them, and keeps running until explicitly stopped. This shift — from 'run once' to 'respond indefinitely' — is what transforms a program into an application. And it is the source of almost all complexity in software engineering.",
          },
          {
            type: "p",
            text: "Most of the patterns, frameworks, and architectural debates you will encounter in application engineering exist because of this one property: applications have state that persists across events, and managing that state safely, consistently, and efficiently is hard.",
          },
        ],
      },
      {
        heading: "The Event Loop: What Every Application Actually Is",
        content: [
          {
            type: "p",
            text: "Strip away React, Android, Spring Boot — strip away every framework — and every application reduces to this:",
          },
          {
            type: "code",
            lang: "TypeScript — The Core of Every Application",
            text: `let state = initialState();

while (true) {
  const event = waitForNextEvent(); // click, network response, timer, OS signal
  state = handle(state, event);
  render(state);
}`,
          },
          {
            type: "p",
            text: "This is the event loop. The browser runs one. Android runs one per thread. A web server listens for incoming TCP connections — each connection is an event. The sophistication of modern frameworks is almost entirely about making this loop manageable as complexity grows: routing events to the right handlers, making state changes predictable, and re-rendering only what changed.",
          },
          {
            type: "grid",
            cards: [
              {
                title: "Web (Browser)",
                body: "JavaScript's event loop processes user gestures (click, keypress, scroll), network callbacks (fetch), and timers (setTimeout) one at a time. React sits on top, batching state changes and reconciling the DOM after each event cycle.",
              },
              {
                title: "Mobile (Android / iOS)",
                body: "The OS delivers touch events, lifecycle transitions (background, foreground, memory pressure), and push notifications to the main thread's message queue. Compose and SwiftUI re-render in response to state changes triggered by those events.",
              },
              {
                title: "Backend (Server)",
                body: "A web server listens on a port. Each incoming HTTP request is an event. The server processes it — validating input, running business logic, querying a database — and sends a response. Then it waits for the next request, potentially from a thousand simultaneous clients.",
              },
            ],
          },
          {
            type: "p",
            text: "The immediate problem that event loops create: what happens between events? The application must remember something. It must store the current user's authentication state, the items in a shopping cart, the partially filled form. That memory is state. And state, unlike an algorithm's local variables, must survive across many event cycles — sometimes across process restarts entirely.",
          },
        ],
      },
      {
        heading: "Where State Lives: Memory Is Not Infinite or Free",
        content: [
          {
            type: "p",
            text: "Between events, state lives in the process's RAM. The OS allocates a block of memory to your process and divides it into two regions. You studied these in the memory model section. Now they matter operationally, not academically.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Stack",
                points: [
                  "One frame per function call, freed when the function returns",
                  "Holds local variables and references to heap objects",
                  "O(1) allocation: just move a pointer",
                  "Small: 1–8 MB total — overflow crashes the process",
                  "Automatic lifetime: no GC needed",
                ],
              },
              {
                heading: "Heap",
                points: [
                  "All objects live here: lists, maps, strings, your domain models",
                  "Managed by garbage collector (Java, JS, Swift) or manually (C, C++)",
                  "Lives until the GC determines no references remain",
                  "Large: bounded only by system RAM",
                  "GC pauses, fragmentation, and leaks are real costs at scale",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "An O(n log n) sort is always O(n log n). But an application that allocates a new object for every network response without releasing old ones will grow its heap until the OS kills the process. This is a memory leak — not an algorithmic bug, but a lifetime management bug. The algorithm was correct. The application was not.",
          },
          {
            type: "code",
            lang: "Java — The Hidden Cost of Abstraction",
            text: `// int[] — one contiguous block, 4 MB for a million integers
int[] rawPrices = new int[1_000_000];

// ArrayList<Integer> — each Integer is a separate heap object
// ~20+ MB: the list + 1M wrapper objects + GC bookkeeping
ArrayList<Integer> boxedPrices = new ArrayList<>(1_000_000);

// In an algorithm, this is a minor style difference.
// In a mobile app with a 300 MB memory budget shared with 20 other apps,
// or a backend handling 500 concurrent requests each loading this list,
// it is an architectural decision with real consequences.`,
          },
          {
            type: "callout",
            label: "Why Mobile Engineers Think About This Constantly",
            text: "A mobile device gives your app a memory budget — often 200–500 MB — shared with every other running app. Exceed it and the OS terminates your process silently. The user returns to a cold launch. This is why Android and iOS engineers profile heap allocations in hot paths and why mobile architecture separates concerns aggressively: keeping as little in memory as possible, loading on demand, releasing eagerly.",
          },
        ],
      },
      {
        heading: "Transient vs. Persisted: The Most Important Distinction in Application Engineering",
        content: [
          {
            type: "p",
            text: "Every piece of state in your application is either transient — alive only while the process runs — or persisted — written somewhere that survives a restart. This distinction seems trivial. It is responsible for a significant fraction of production bugs.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Transient (In-Memory)",
                points: [
                  "Lives in RAM while the process runs",
                  "Immediately gone on crash, background kill, or restart",
                  "Fast: no I/O, no latency",
                  "Examples: form values, scroll position, UI animations, in-progress network requests",
                ],
              },
              {
                heading: "Persisted (Storage)",
                points: [
                  "Written to disk, database, or remote server",
                  "Survives process exit and device restart",
                  "Slower: I/O required to read and write",
                  "Examples: user profiles, purchase history, auth tokens, offline action queues",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "The bug is almost always treating transient state as if it were persisted. A user spends ten minutes filling a complex form. You store the form in useState. The OS kills your mobile app in the background to reclaim memory — a routine event on constrained devices. The user returns to an empty form. You lost their data. The fix is architectural: persist form drafts to localStorage or a local database. But the understanding must come first: in-memory state is inherently temporary.",
          },
          {
            type: "grid",
            cards: [
              {
                title: "Keep transient",
                body: "UI selection, scroll position, animation progress, active search query, values that can be recomputed from persisted data on restart without user input.",
              },
              {
                title: "Must persist",
                body: "User account data, purchase history, draft messages, settings, auth tokens, any user action that should survive a crash or device restart.",
              },
              {
                title: "Gray area (explicit decisions required)",
                body: "Caches (transient but rebuilt from persisted data), session state (persisted per-session only), prefetched data (transient, repopulated from network).",
              },
            ],
          },
        ],
      },
      {
        heading: "Following One Piece of Data Through an Entire System",
        content: [
          {
            type: "p",
            text: "The lifecycle of a user submitting an order touches every concept in application engineering. Trace it end-to-end:",
          },
          { type: "h4", text: "1. Event → Transient State" },
          {
            type: "p",
            text: "The user taps 'Place Order'. An event fires. The app creates an order object in memory — entirely transient, existing nowhere else. The UI disables the button to prevent double submission.",
          },
          { type: "h4", text: "2. Transient State → Optimistic Update" },
          {
            type: "p",
            text: "The app immediately adds the order to a local pending Queue and shows it in the UI as 'Placing...' — without waiting for the server. This is the optimistic update pattern: assume success and correct if wrong. The user sees feedback instantly regardless of network speed.",
          },
          { type: "h4", text: "3. Transient State → Network (Serialization)" },
          {
            type: "p",
            text: "The order object is serialized — converted from an in-memory structure to JSON bytes — and sent via HTTP POST. The event loop does not block. A callback is registered for when the response arrives, and the loop continues processing other events while waiting.",
          },
          { type: "h4", text: "4. Backend: Validate → Business Logic → Persist" },
          {
            type: "p",
            text: "The backend receives the request, validates the data, checks inventory, calculates totals, then writes the order to the database inside a transaction. Either the entire write succeeds or none of it does. The order is now persisted — it will survive any crash on any machine.",
          },
          { type: "h4", text: "5. Response → State Update → Re-render" },
          {
            type: "p",
            text: "The HTTP 201 arrives. The client updates state: the order moves from 'pending' to 'confirmed' with a server-assigned ID. The Queue entry is removed. The UI re-renders. The full journey — event loop, memory, serialization, I/O, transactions, and re-render — is complete.",
          },
          {
            type: "callout",
            label: "The Queue Was Not Academic",
            text: "The pending operations buffer is a Queue — FIFO. If the network is unavailable, orders wait in sequence and retry when connectivity returns. This is the offline-first pattern, and it is built directly on the Queue data structure from the foundational layer. The difference is that now the Queue is not a homework exercise — it is the mechanism that keeps a mobile app usable in a subway tunnel.",
          },
        ],
      },
      {
        heading: "What Application Engineering Is Actually Solving",
        content: [
          {
            type: "p",
            text: "After tracing that lifecycle, the actual problems become clear. Not as a list of technologies to memorize, but as engineering problems that demanded solutions:",
          },
          {
            type: "grid",
            cards: [
              {
                title: "State Management",
                body: "State starts local and simple. As the application grows, the same state needs to be readable by components with no direct relationship. Passing it through layers of intermediaries becomes unmaintainable. Global state stores emerge as the solution.",
              },
              {
                title: "Persistence",
                body: "In-memory state disappears on restart. Every piece of user-created data that must survive a crash needs to be written somewhere durable. The choice of where — local device, remote server, or both — determines the application's offline behavior and data model complexity.",
              },
              {
                title: "Concurrency",
                body: "Multiple things happen simultaneously: a network response arrives while the user is typing, the OS sends a lifecycle event during a database write. Without coordination, shared state gets corrupted. Async patterns, structured concurrency, and actors exist to solve this.",
              },
              {
                title: "Scale",
                body: "One user, one process, one machine works. Ten thousand concurrent users means one process becomes a bottleneck. Caches, queues, load balancers, and eventually distributed systems are the answers that emerge when a single machine is no longer enough.",
              },
            ],
          },
          {
            type: "p",
            text: "The rest of the Application Layer follows this progression: start with one component, one user, one request. Then show what breaks as complexity grows. Then introduce the abstractions that emerged to handle that failure. Every pattern here — state management, ORMs, caching, message queues — has a reason it exists. That reason is a problem that became painful enough to solve.",
          },
        ],
      },
    ],
  },

  {
    id: "al-web",
    title: "Web Applications: The State Problem",
    overview:
      "A React application starts as a single component with a single variable. That works perfectly. Then the application grows: a second component needs the same variable. Then a third, a fourth — all unrelated in the tree, all needing the same data. Then some of that data comes from a server and can go stale. Then the application needs to work after a browser tab closes and reopens. Each of these is a real engineering problem that React and its ecosystem solve — but only if you understand the progression that made those solutions necessary.",
    sections: [
      {
        heading: "Stage 1: Local State Works Perfectly",
        content: [
          {
            type: "p",
            text: "Start with the simplest possible web component. A counter. One variable. One button. One component that owns everything it needs.",
          },
          {
            type: "code",
            lang: "TypeScript — Local State: Simple and Sufficient",
            text: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}`,
          },
          {
            type: "p",
            text: "This is perfect. The state is local — owned by the component, invisible to everything else. When count changes, only this component re-renders. There is no coordination problem because there is only one place that knows about count. This works for a huge range of UI: toggles, form inputs, modal visibility, tabs. Local state is not a stepping stone — it is the right answer for anything used by exactly one component.",
          },
          {
            type: "callout",
            label: "The Rule",
            text: "State should be owned by the lowest component in the tree that needs it. If only one component uses a piece of state, it belongs in that component. The complexity of global state management is not needed — and adding it prematurely makes simple things complicated.",
          },
        ],
      },
      {
        heading: "Stage 2: A Second Component Needs the Same Data",
        content: [
          {
            type: "p",
            text: "The application grows. Now two components need the same data: a product count in a header badge and a product list in the main content area. Both need to know how many items are in the cart. There is one obvious solution: lift the state up to their common parent.",
          },
          {
            type: "code",
            lang: "TypeScript — Lifting State: Still Works",
            text: `function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
    <div>
      <Header itemCount={cartItems.length} />
      <ProductList onAddToCart={(item) => setCartItems(c => [...c, item])} />
    </div>
  );
}`,
          },
          {
            type: "p",
            text: "This is clean. The parent owns the truth. Children receive what they need as props. When the state changes in one child's callback, the parent updates and both children re-render with consistent data. For two or three levels, this is the right approach.",
          },
          {
            type: "p",
            text: "Now the application grows more. The cart badge is in a Header. The Header is inside a Layout. The Layout is inside a Page. The Page is inside a Router. The ProductList is five components deep in a different subtree. You need cartItems in a component that is eight levels away from where the state lives. So you pass cartItems through every component in between — through components that have no interest in cart data, that just pass it along to their children.",
          },
          {
            type: "code",
            lang: "TypeScript — Prop Drilling: The Pain Begins",
            text: `// Every intermediate component must accept and forward cartItems
// even though it has no use for it
function Layout({ cartItems, onAddToCart }) {
  return <Page cartItems={cartItems} onAddToCart={onAddToCart} />;
}

function Page({ cartItems, onAddToCart }) {
  return <ProductSection cartItems={cartItems} onAddToCart={onAddToCart} />;
}

function ProductSection({ cartItems, onAddToCart }) {
  return <ProductList cartItems={cartItems} onAddToCart={onAddToCart} />;
}

// Layout and Page and ProductSection don't USE cartItems.
// They just carry it. Now every refactor of this data
// requires changing 5 component signatures.`,
          },
          {
            type: "callout",
            label: "The Actual Problem with Prop Drilling",
            text: "Prop drilling is not just verbose. It couples every intermediate component to the shape of data it does not use. When the cartItems structure changes, you must update Layout, Page, ProductSection, and ProductList — even though only ProductList actually cares. The components become impossible to reuse independently. The codebase becomes brittle.",
          },
        ],
      },
      {
        heading: "Stage 3: State Wants to Be Global",
        content: [
          {
            type: "p",
            text: "The pain of prop drilling forces an architectural question: what if state didn't need to be passed through the tree at all? What if any component could access shared state directly, by subscribing to it?",
          },
          {
            type: "p",
            text: "This is the idea behind global state management. Instead of lifting state to a common ancestor and threading it through props, you place it in a store — an object that lives outside the component tree. Components connect to the store and subscribe to the slice of state they need. When the store updates, only subscribing components re-render.",
          },
          {
            type: "code",
            lang: "TypeScript — Zustand: State Outside the Tree",
            text: `import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  total: () => number;
}

const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
  removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
  total: () => get().items.reduce((sum, item) => sum + item.price, 0),
}));

// In the Header — no prop drilling required:
function CartBadge() {
  const count = useCart(state => state.items.length);
  return <span>{count}</span>;
}

// In a deeply nested ProductCard — no prop drilling required:
function AddToCartButton({ item }: { item: Product }) {
  const addItem = useCart(state => state.addItem);
  return <button onClick={() => addItem(item)}>Add to Cart</button>;
}`,
          },
          {
            type: "p",
            text: "CartBadge and AddToCartButton can be anywhere in the tree. Neither needs its parent to know about cart state. The store is the single source of truth — one place holds the authoritative value, and all components read from it rather than maintaining their own copies.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "When to Use Local State (useState)",
                points: [
                  "State is used by exactly one component",
                  "Toggle, form input, modal visibility, tab selection",
                  "UI-only state with no business significance",
                  "State that resets naturally when the component unmounts",
                ],
              },
              {
                heading: "When to Use Global State (Zustand / Redux)",
                points: [
                  "Multiple unrelated components need the same data",
                  "State must persist across route navigations",
                  "Authentication, shopping cart, notifications, theme",
                  "Shared data that would require deep prop drilling otherwise",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Stage 4: Server State Is a Different Problem",
        content: [
          {
            type: "p",
            text: "Client state — the cart, auth, UI selections — is owned by the application. You control it. When you update it, it is updated. But most data in a real application comes from a server. And server state behaves differently.",
          },
          {
            type: "p",
            text: "Server state is not owned by the client. Your local copy may be stale — another user may have updated the same record since you fetched it. You do not know when it changed. You have to refetch to find out. And while you are fetching, you need a loading state. And if the fetch fails, you need an error state. And if you navigate away and come back, should you refetch? When?",
          },
          {
            type: "code",
            lang: "TypeScript — What Server State Management Looks Like Without a Library",
            text: `// This gets messy fast
function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/products')
      .then(r => r.json())
      .then(data => { setProducts(data); setIsLoading(false); })
      .catch(e => { setError(e.message); setIsLoading(false); });
  }, []);

  // Now: no deduplication (two components fetching the same URL = two requests),
  // no cache (remount = another fetch even if data is seconds old),
  // no background refetch (stale data persists until remount),
  // no retry logic (network blip = permanent error state).
}`,
          },
          {
            type: "p",
            text: "Every team that built enough React applications eventually built the same infrastructure: a cache keyed by URL, deduplication of concurrent requests, automatic background refetching, and retry logic. TanStack Query (React Query) is the standardization of that solution.",
          },
          {
            type: "code",
            lang: "TypeScript — React Query: Server State as a First-Class Problem",
            text: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching: cached, deduplicated, and auto-refetched when stale
function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
    staleTime: 5 * 60 * 1000,  // treat as fresh for 5 minutes
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <List items={data} />;
}

// Mutating: invalidates the cache on success so data refetches
function AddProductForm() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (product: NewProduct) =>
      fetch('/api/products', { method: 'POST', body: JSON.stringify(product) }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
  // ...
}`,
          },
          {
            type: "callout",
            label: "The Insight",
            text: "Server state and client state need different tools because they have different ownership models. Client state is yours — you change it when you decide to. Server state belongs to the server — your copy is always potentially stale, and the core problem is knowing when to refetch and what to do while waiting. Mixing them into the same Zustand store is possible but fights against the grain.",
          },
        ],
      },
      {
        heading: "Stage 5: The Browser Persists Nothing by Default",
        content: [
          {
            type: "p",
            text: "Close a browser tab. Open it again. Everything in JavaScript memory — every useState, every Zustand store — is gone. The application starts fresh. For some state this is fine. For others it is a catastrophic UX failure: the user's partially written draft, their shopping cart, their authentication.",
          },
          {
            type: "p",
            text: "The browser provides four storage mechanisms, each with different tradeoffs:",
          },
          {
            type: "grid",
            cards: [
              {
                title: "localStorage",
                body: "Synchronous. ~5–10 MB. Persists across sessions. Shared across all tabs from the same origin. Blocks the main thread on every read/write — use sparingly for large data. Good for settings, preferences, small serialized state.",
              },
              {
                title: "sessionStorage",
                body: "Synchronous. ~5 MB. Cleared when the tab closes. Isolated per tab — not shared. Good for single-session flows like multi-step checkout wizards where you want data gone after the session.",
              },
              {
                title: "IndexedDB",
                body: "Asynchronous. Gigabytes of capacity. Structured object store with indexes and transactions. The right tool for offline apps, large local datasets, and anything that needs querying beyond simple key lookup.",
              },
              {
                title: "Cookies",
                body: "~4 KB. Sent with every HTTP request to the same origin. Can be HttpOnly (JavaScript cannot read), Secure, SameSite. The standard mechanism for authentication sessions — the only option that keeps tokens out of JavaScript reach.",
              },
            ],
          },
          {
            type: "callout",
            label: "Security: Never Store Auth Tokens in localStorage",
            text: "localStorage is readable by any JavaScript running on your origin — including injected scripts from XSS vulnerabilities. Auth tokens in localStorage can be silently exfiltrated. Store access tokens in JavaScript memory (gone on tab close, but that is acceptable) and refresh tokens in HttpOnly cookies: the browser sends them with requests automatically, but no JavaScript — yours or an attacker's — can read them.",
          },
        ],
      },
      {
        heading: "Stage 6: The DOM Becomes a Bottleneck",
        content: [
          {
            type: "p",
            text: "The browser renders the page by constructing a DOM tree, computing styles, calculating layout, and painting pixels. Directly manipulating the DOM on every state change is slow — each change can trigger layout recalculation and a repaint. React's solution is a virtual DOM: an in-memory tree of plain JavaScript objects that mirrors the real DOM.",
          },
          {
            type: "p",
            text: "When state changes, React builds a new virtual DOM tree, diffs it against the previous version, and applies only the minimum set of real DOM mutations. This diffing algorithm runs in O(n) because React uses two heuristics: components of the same type are updated in place; components of a different type are replaced. This is fast enough for most UIs — but as apps grow, unnecessary re-renders accumulate.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "What Causes Unnecessary Re-renders",
                points: [
                  "State too high in the tree — changing it re-renders many children",
                  "Inline object/function props — new reference on every render triggers child re-render",
                  "Context with large values — any consumer re-renders on any context change",
                  "Subscribing to full store — getting more from Zustand/Redux than the component needs",
                ],
              },
              {
                heading: "Targeted Fixes",
                points: [
                  "Move state down — only the affected subtree re-renders",
                  "useCallback / useMemo — stable references for props passed to children",
                  "Split contexts — separate frequently-changing from rarely-changing state",
                  "Selector functions — subscribe to only the slice of store state the component uses",
                ],
              },
            ],
          },
          {
            type: "grid",
            cards: [
              {
                title: "Code Splitting",
                body: "React.lazy + Suspense splits the JavaScript bundle by route. Users download only the code for the current page. A large app's bundle can be split into dozens of chunks, reducing initial load from seconds to milliseconds.",
              },
              {
                title: "Virtualization",
                body: "Rendering 10,000 list items creates 10,000 DOM nodes — slow to paint, slow to update. react-window or TanStack Virtual renders only the ~20 items visible in the viewport. Scroll = destroy items that left the view, create items that entered.",
              },
              {
                title: "Normalize Entities",
                body: "Storing entities in a flat HashMap keyed by ID rather than nested objects makes updates O(1) instead of O(n) tree traversal. Normalized state also eliminates the same entity appearing in multiple places and falling out of sync.",
              },
            ],
          },
          {
            type: "callout",
            label: "Profile Before Optimizing",
            text: "React DevTools Profiler shows which components re-rendered, why, and for how long. Most React performance problems are state placement problems — fixing them requires moving state, not adding memoization. Adding React.memo and useMemo everywhere without profiling first adds complexity without measurable benefit. Measure first.",
          },
        ],
      },
      {
        heading: "The Rendering Model: CSR, SSR, and What Next.js Chooses",
        content: [
          {
            type: "p",
            text: "Where the initial HTML comes from determines first-load performance and SEO. The rendering model is an architectural decision with real tradeoffs.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Client-Side Rendering (CSR)",
                points: [
                  "Server sends empty HTML + a JavaScript bundle",
                  "Browser downloads JS, executes it, fetches data, builds DOM",
                  "Slow first paint — content invisible until JS runs",
                  "Fast subsequent navigation — no full page loads",
                  "Poor SEO for public content (crawlers see empty HTML)",
                  "Best for authenticated dashboards, internal tools, SPAs",
                ],
              },
              {
                heading: "Server-Side Rendering (SSR)",
                points: [
                  "Server builds full HTML for each request",
                  "Browser receives complete, readable content immediately",
                  "Fast first paint, good SEO",
                  "Hydration step: React attaches event handlers to existing HTML",
                  "Server bears the rendering cost on every request",
                  "Best for public content, e-commerce, marketing pages",
                ],
              },
            ],
          },
          {
            type: "callout",
            label: "What Hydration Means",
            text: "SSR sends complete HTML to the browser — it looks right immediately, but it is static. Hydration is when React's JavaScript runs in the browser, walks the existing DOM, and attaches event handlers to it. If the server-rendered HTML does not match what React would render on the client (a hydration mismatch), React throws an error and falls back to client rendering. This is why server components must be deterministic — they produce the same output regardless of when they run.",
          },
        ],
      },
    ],
  },

  {
    id: "al-mobile",
    title: "Mobile Applications: Constraints Shape Architecture",
    overview:
      "Mobile development teaches lessons that apply everywhere, because mobile devices make visible the constraints that exist everywhere but are easy to ignore on powerful hardware. Limited RAM means memory management matters. Unreliable networks mean offline behavior must be designed, not assumed away. An OS that kills your process without warning means state persistence cannot be an afterthought. Every mobile architectural pattern exists because one of these constraints became painful.",
    sections: [
      {
        heading: "The Constraints That Change Everything",
        content: [
          {
            type: "p",
            text: "Before writing a single line of mobile code, understand the operating environment. It is fundamentally different from a browser or a server, and the differences drive every architectural decision.",
          },
          {
            type: "grid",
            cards: [
              {
                title: "Memory Budget",
                body: "Your app shares RAM with every other running app. iOS and Android will terminate your process without warning when they need memory for another app or the OS itself. You have no control over when this happens. State in memory is not guaranteed to survive.",
              },
              {
                title: "Network Unreliability",
                body: "Mobile users move through cellular dead zones, switch between WiFi and LTE, enter elevators, and go underground. Assuming network availability means designing an app that regularly fails in the real world. Designing for offline-first means designing an app that works everywhere.",
              },
              {
                title: "UI Thread Sacredness",
                body: "A mobile app renders at 60–120 frames per second. The UI thread draws every frame. Block it — even for a database read or a JSON parse — and you miss frames. The user sees jank. Block it for more than ~5 seconds and the OS shows an Application Not Responding dialog.",
              },
              {
                title: "Process Lifecycle",
                body: "Your app moves through states: active, backgrounded, backgrounded-and-about-to-be-killed, killed. Each transition is a signal. Ignoring these signals means losing unsaved work, holding resources unnecessarily, and breaking state restoration.",
              },
            ],
          },
        ],
      },
      {
        heading: "The UI Thread Is Sacred: Threading Forces Architecture",
        content: [
          {
            type: "p",
            text: "Start with the simplest possible screen: fetch a list of products and display them. The naïve approach — fetch synchronously on the main thread — works in testing. In production, it causes the app to freeze for the duration of every network call. Users see a locked screen. They close the app.",
          },
          {
            type: "p",
            text: "The solution forces an architectural separation that turns out to be valuable for other reasons: business logic and data access must move off the UI thread. The ViewModel pattern emerges not primarily from a desire for clean code — it emerges because the UI thread cannot block, and separating logic from UI is how you enforce that constraint.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "View (UI Layer)",
                points: [
                  "Composables (Android) / SwiftUI Views (iOS)",
                  "Observes state streams emitted by ViewModel",
                  "Renders state, emits user events upward",
                  "Contains zero business logic",
                  "Pure function of state: same state = same UI",
                ],
              },
              {
                heading: "ViewModel",
                points: [
                  "Survives configuration changes (screen rotation)",
                  "Holds UI state as observable streams",
                  "Coordinates async data loading from repositories",
                  "Runs on background threads via coroutines / async/await",
                  "Never holds a reference to a View — prevents memory leaks",
                ],
              },
            ],
          },
          {
            type: "callout",
            label: "The Memory Leak It Prevents",
            text: "A ViewModel that holds a reference to an Activity or Fragment prevents the garbage collector from releasing the UI when the user navigates away. The Activity is destroyed, but the ViewModel still references it, keeping megabytes of UI objects alive indefinitely. On Android, never let a ViewModel hold a Context or View reference. On iOS, never capture self strongly in async closures from a ViewModel — always capture weakly.",
          },
        ],
      },
      {
        heading: "Android: ViewModel with StateFlow",
        content: [
          {
            type: "p",
            text: "Modern Android development uses Kotlin coroutines for structured async work and StateFlow for observable state. The pattern enforces a unidirectional data flow: user events travel up to the ViewModel, new state flows down to the Composable.",
          },
          {
            type: "code",
            lang: "Kotlin — Android ViewModel + Composable",
            text: `data class ProductListState(
    val products: List<Product> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

class ProductListViewModel(
    private val repository: ProductRepository
) : ViewModel() {

    private val _state = MutableStateFlow(ProductListState())
    val state: StateFlow<ProductListState> = _state.asStateFlow()

    init { loadProducts() }

    fun loadProducts() {
        viewModelScope.launch {                          // cancelled when ViewModel clears
            _state.update { it.copy(isLoading = true) }
            try {
                val products = repository.getProducts() // runs on IO thread, not UI thread
                _state.update { it.copy(products = products, isLoading = false) }
            } catch (e: Exception) {
                _state.update { it.copy(error = e.message, isLoading = false) }
            }
        }
    }
}

@Composable
fun ProductListScreen(vm: ProductListViewModel = hiltViewModel()) {
    val state by vm.state.collectAsStateWithLifecycle()
    when {
        state.isLoading -> CircularProgressIndicator()
        state.error != null -> ErrorText(state.error!!)
        else -> LazyColumn { items(state.products) { ProductCard(it) } }
    }
}`,
          },
        ],
      },
      {
        heading: "iOS: Swift Concurrency and ObservableObject",
        content: [
          {
            type: "p",
            text: "SwiftUI uses property wrappers to declare how state flows through the view hierarchy. The @MainActor annotation on the ViewModel ensures that @Published property mutations happen on the main thread — a requirement for UI updates — while async functions do their work on background threads.",
          },
          {
            type: "code",
            lang: "Swift — SwiftUI ViewModel Pattern",
            text: `@MainActor
class ProductListViewModel: ObservableObject {
    @Published var products: [Product] = []
    @Published var isLoading = false
    @Published var error: String?

    private let repository: ProductRepository

    func loadProducts() async {
        isLoading = true
        defer { isLoading = false }  // runs when function exits, even on error
        do {
            products = try await repository.fetchProducts()
        } catch {
            self.error = error.localizedDescription
        }
    }
}

struct ProductListView: View {
    @StateObject private var vm = ProductListViewModel()
    var body: some View {
        Group {
            if vm.isLoading { ProgressView() }
            else if let error = vm.error { Text(error).foregroundColor(.red) }
            else { List(vm.products) { ProductRow(product: $0) } }
        }
        .task { await vm.loadProducts() }
    }
}`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "@State",
                body: "Value owned by the view. Private and local. For simple UI-only state: toggle, text field value, tab selection. Resets when the view is destroyed.",
              },
              {
                title: "@StateObject",
                body: "Owns an ObservableObject — created once when the view appears and kept alive for its lifetime. Use for ViewModels that this view creates.",
              },
              {
                title: "@ObservedObject",
                body: "Observes an ObservableObject owned elsewhere and injected in. The ViewModel outlives the view. Use when a parent or DI container owns the ViewModel.",
              },
              {
                title: "@EnvironmentObject",
                body: "Injected into the SwiftUI environment. Any view in the subtree can read it without explicit passing. Use for app-wide state: auth, theme, settings.",
              },
            ],
          },
        ],
      },
      {
        heading: "The OS Kills Your App: Persistence Is Mandatory",
        content: [
          {
            type: "p",
            text: "Background process termination is not an edge case. It is routine behavior. The OS kills backgrounded apps when it needs memory — and it does not notify your app first. The user returns expecting to find their place. If your app stored its state only in memory, they find a cold launch instead.",
          },
          {
            type: "p",
            text: "This forces a decision: every piece of state that must survive termination must be written to disk. Mobile apps need local databases — not for offline support, but for basic correctness. The database is not an optimization. It is the mechanism that makes the app behave as users expect.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Android — Room",
                points: [
                  "SQLite abstraction with compile-time query verification",
                  "Returns Flow<List<T>> — UI updates automatically when DB changes",
                  "Versioned schema migrations with @Migration classes",
                  "Suspend functions for coroutine-native async queries",
                  "Upsert, relations, and complex queries all supported",
                ],
              },
              {
                heading: "iOS — SwiftData / CoreData",
                points: [
                  "SwiftData (iOS 17+): Swift-native, @Model macro generates schema",
                  "CoreData: battle-tested, supports faulting and lazy loading",
                  "NSPersistentCloudKitContainer: automatic iCloud sync at no extra code",
                  "Background context for off-main-thread writes",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "Kotlin — Room Database Entity + DAO",
            text: `@Entity(tableName = "products")
data class ProductEntity(
    @PrimaryKey val id: String,
    val name: String,
    val price: Double,
    val cachedAt: Long = System.currentTimeMillis()
)

@Dao
interface ProductDao {
    @Query("SELECT * FROM products ORDER BY name ASC")
    fun observeAll(): Flow<List<ProductEntity>>  // emits on every DB change

    @Upsert
    suspend fun upsert(products: List<ProductEntity>)  // insert or replace

    @Query("DELETE FROM products WHERE cachedAt < :cutoff")
    suspend fun evictStale(cutoff: Long)
}`,
          },
        ],
      },
      {
        heading: "Offline-First: Designing for Unreliable Networks",
        content: [
          {
            type: "p",
            text: "The naïve network model: the app needs data, requests it from the server, waits, displays it. This model shows a spinner every time the app launches. It shows an error screen when the user loses connectivity. It is unusable in a subway tunnel, an elevator, or a rural area.",
          },
          {
            type: "p",
            text: "The offline-first model: the app always reads from the local database. The database is the source of truth for the UI. Network requests populate the database in the background. The UI updates reactively when the database changes. The app works immediately on launch — showing cached data — and updates silently as fresh data arrives.",
          },
          {
            type: "code",
            lang: "Kotlin — Offline-First Repository Pattern",
            text: `class ProductRepository(
    private val dao: ProductDao,
    private val api: ProductApiService,
    private val scope: CoroutineScope
) {
    // Always returns the local database as a stream
    // Triggers a background network refresh on every call
    fun getProducts(): Flow<List<Product>> {
        scope.launch {
            try {
                val fresh = api.fetchProducts()
                dao.upsert(fresh.map { it.toEntity() })
            } catch (_: IOException) {
                // Network unavailable: serve cached data, no error shown
            }
        }
        return dao.observeAll().map { it.map { e -> e.toDomain() } }
    }

    // For writes: persist locally first, sync to server when possible
    suspend fun createOrder(order: Order) {
        dao.insertPendingOrder(order.toEntity())  // immediately persisted
        try {
            api.createOrder(order)                 // optimistic network sync
            dao.markOrderSynced(order.id)
        } catch (_: IOException) {
            // WorkManager will retry this write when the network returns
        }
    }
}`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Background Sync",
                body: "Android WorkManager and iOS BGTaskScheduler run sync jobs when the app is backgrounded. Pending writes are stored in a local queue table and retried with exponential backoff until the server confirms receipt.",
              },
              {
                title: "Conflict Resolution",
                body: "When the same record is edited on two devices while offline, a conflict occurs on sync. Strategies: last-write-wins (simplest, loses data), server-wins, client-wins, or three-way merge (most correct, most complex). Choose based on data sensitivity.",
              },
              {
                title: "The Data Structure Behind It",
                body: "The pending operations queue is a Queue — FIFO. Each entry is dequeued, sent to the server, and removed on success. On failure it stays, waiting for retry. This is operationally identical to a message queue in a distributed backend system.",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "al-backend",
    title: "Backend Applications: Building for Many Users",
    overview:
      "A backend that works for one user almost always works for ten. It usually breaks somewhere between ten and a thousand — and the reasons it breaks reveal the entire architecture of modern backend engineering. This section starts with a single request handler and follows the problems that emerge as load increases: concurrent users that corrupt shared state, business logic that needs to be atomic, queries that become catastrophically slow, and eventually a single machine that becomes the bottleneck. Each problem forces a new architectural decision.",
    sections: [
      {
        heading: "One Request, One Database Call: The Happy Path",
        content: [
          {
            type: "p",
            text: "The simplest possible backend: receive an HTTP request, read from a database, return data. One user, one request at a time, no concurrent state. This works perfectly — and understanding why it works is as important as understanding where it breaks.",
          },
          {
            type: "code",
            lang: "TypeScript — The Simplest Backend Endpoint",
            text: `// This works. One request. One database call. One response.
app.get('/products/:id', async (req, res) => {
  const product = await db.query(
    'SELECT * FROM products WHERE id = $1',
    [req.params.id]
  );
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});`,
          },
          {
            type: "p",
            text: "Now add a second endpoint — place an order. It must: validate the request, check inventory, deduct inventory, create the order record, and respond. With one user, all of this runs sequentially and correctly.",
          },
          {
            type: "p",
            text: "Add a hundred concurrent users all placing orders for the same last item. Now two requests both read inventory = 1, both decide 'we have stock', both deduct inventory, both create orders. Inventory is now -1. Two users received confirmation for an item you cannot ship.",
          },
          {
            type: "callout",
            label: "This Is a Race Condition",
            text: "Two operations read shared state, make decisions based on it, and write changes back — interleaved in a way that produces incorrect results. Race conditions are invisible under low load and catastrophic at scale. They are not bugs in the logic. They are bugs in the assumption that operations are atomic.",
          },
        ],
      },
      {
        heading: "Transactions: Making Multi-Step Operations Atomic",
        content: [
          {
            type: "p",
            text: "The database's answer to race conditions is the transaction. A transaction wraps multiple operations into a single atomic unit — either all of them succeed, or none of them do. And within a transaction, you can lock rows to prevent concurrent reads from seeing the same value simultaneously.",
          },
          {
            type: "code",
            lang: "TypeScript — Prisma Transaction: All or Nothing",
            text: `const result = await prisma.$transaction(async (tx) => {
  // SELECT ... FOR UPDATE locks the inventory row
  // preventing concurrent transactions from reading the same value
  const inventory = await tx.$queryRaw\`
    SELECT quantity FROM inventory
    WHERE product_id = \${productId}
    FOR UPDATE
  \`;

  if (inventory.quantity < requestedQty) {
    throw new Error('Insufficient inventory');  // rolls back automatically
  }

  // Both writes happen atomically — or neither does
  await tx.inventory.update({
    where: { productId },
    data: { quantity: { decrement: requestedQty } }
  });

  return await tx.order.create({
    data: { userId, productId, quantity: requestedQty }
  });
});`,
          },
          {
            type: "p",
            text: "ACID is the set of guarantees a transactional database provides. Understanding these isn't exam prep — it is the reasoning behind why database transactions exist at all.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "ACID Guarantee",
                points: [
                  "Atomic — all operations succeed or all are rolled back",
                  "Consistent — database constraints are always satisfied",
                  "Isolated — concurrent transactions don't see each other's partial writes",
                  "Durable — committed transactions survive crashes and power loss",
                ],
              },
              {
                heading: "The Problem It Solves",
                points: [
                  "Partial writes: payment deducted but order not created",
                  "Constraint violations: negative inventory, orphaned foreign keys",
                  "Race conditions: two users buying the last item",
                  "Data loss on crash: committed data is written to durable storage",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Architecture Emerges from Complexity",
        content: [
          {
            type: "p",
            text: "A single endpoint function that handles HTTP parsing, validation, business rules, and database access works at small scale. As the application grows — more endpoints, more business rules, authentication, logging — the function becomes hundreds of lines of mixed concerns. Testing requires a real HTTP server and a real database. Changing one thing breaks another.",
          },
          {
            type: "p",
            text: "Layered architecture emerges as the solution: separate the code into distinct layers where each has one responsibility and communicates only with adjacent layers. The separation is not aesthetic. It is what makes individual layers testable in isolation and replaceable without rewriting unrelated code.",
          },
          {
            type: "code",
            lang: "Java — Spring Boot: Concerns Separated by Layer",
            text: `// Controller — HTTP boundary only. Knows about HTTP. Nothing else.
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest req) {
        Order order = orderService.createOrder(req.toCommand());
        return ResponseEntity.status(201).body(OrderResponse.from(order));
    }
}

// Service — business logic only. Knows nothing about HTTP or SQL.
@Service
@Transactional
public class OrderService {
    private final OrderRepository repo;
    private final InventoryService inventory;

    public Order createOrder(CreateOrderCommand cmd) {
        inventory.reserve(cmd.productId(), cmd.quantity()); // enforces business rule
        return repo.save(new Order(cmd.userId(), cmd.productId(), cmd.quantity()));
    }
}

// Repository — data access only. No business logic.
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable page);
}`,
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Layer",
                points: [
                  "Controller / Handler",
                  "Service",
                  "Repository / DAO",
                  "Domain Model",
                  "Middleware / Filter",
                ],
              },
              {
                heading: "Responsibility",
                points: [
                  "Parse HTTP, validate input, serialize response",
                  "Orchestrate business logic, enforce invariants",
                  "Read and write data, abstract the database",
                  "Pure business entities, no framework dependencies",
                  "Cross-cutting: auth, logging, rate limiting, tracing",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "The Request Lifecycle",
        content: [
          {
            type: "p",
            text: "Understanding every step a request takes through a layered backend makes bottlenecks visible and design decisions legible:",
          },
          {
            type: "ul",
            items: [
              "1. Client sends HTTP request over a TCP connection",
              "2. Load balancer routes it to one healthy server instance",
              "3. Server's thread pool assigns a worker to the request",
              "4. Middleware chain runs: JWT validation, rate limit check, request logging",
              "5. Framework routes to the correct Controller method",
              "6. Controller deserializes JSON body, validates input shapes",
              "7. Controller calls Service with a command or DTO object",
              "8. Service runs business logic, calls Repository or other Services",
              "9. Repository acquires a pooled connection, sends SQL to the database",
              "10. Database executes the query, returns a result set over the pool connection",
              "11. Repository maps the result set to domain objects",
              "12. Service returns the result to the Controller",
              "13. Controller serializes to JSON, builds HTTP response",
              "14. Response sent to client; pool connection returned to the pool",
            ],
          },
          {
            type: "callout",
            label: "Stateless Design Is What Makes Step 2 Possible",
            text: "Each request contains all context needed to process it — user identity in a JWT, request data in the body. No per-user session is stored on the server itself. This means any server instance behind the load balancer can handle any request. To scale throughput, add more instances. This horizontal scalability is why JWT-based auth replaced server-side sessions.",
          },
        ],
      },
      {
        heading: "Caching: When the Database Becomes the Bottleneck",
        content: [
          {
            type: "p",
            text: "A PostgreSQL query against an indexed table might take 5–50 ms. At 100 requests per second all asking for the same product catalog, that is 100 database queries per second for data that changes perhaps once a day. The database becomes the bottleneck not because the queries are slow, but because they are repeated unnecessarily.",
          },
          {
            type: "p",
            text: "The solution is a cache: a layer that stores the result of expensive computations and serves subsequent identical requests from memory instead. Redis is an in-memory data store that serves as the standard application cache — it responds in under 1 ms compared to a database's 5–50 ms.",
          },
          {
            type: "code",
            lang: "Java — Cache-Aside Pattern with Redis",
            text: `@Service
public class ProductService {
    private final ProductRepository repo;
    private final RedisTemplate<String, Product> cache;
    private static final Duration TTL = Duration.ofMinutes(10);

    public Product getProduct(String id) {
        String key = "product:" + id;
        Product cached = cache.opsForValue().get(key);
        if (cached != null) return cached;          // cache hit: <1 ms

        Product product = repo.findById(id)
            .orElseThrow(() -> new NotFoundException(id));
        cache.opsForValue().set(key, product, TTL); // populate cache
        return product;
    }

    public void updateProduct(Product updated) {
        repo.save(updated);
        cache.delete("product:" + updated.getId()); // invalidate stale entry
    }
}`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Cache Aside",
                body: "App checks cache first. On miss, reads database and writes to cache. Most common pattern. App controls what is cached and when. Cache miss penalty is one extra round trip.",
              },
              {
                title: "Write Through",
                body: "Every write goes to both cache and database simultaneously. Cache never misses. Slower writes. Best when reads vastly outnumber writes and the data shape is the same for reads and writes.",
              },
              {
                title: "TTL Eviction",
                body: "Each cached entry expires after a set time. Simple. May serve stale data for up to TTL duration. Set TTL based on how fast the underlying data actually changes — not shorter.",
              },
              {
                title: "Beyond Caching",
                body: "Redis also provides: distributed locks (prevent two instances doing the same job), pub/sub messaging (fan out events to subscribers), rate limiting counters, and sorted sets for leaderboards.",
              },
            ],
          },
        ],
      },
      {
        heading: "The N+1 Problem: ORMs and Their Hidden Costs",
        content: [
          {
            type: "p",
            text: "Object-Relational Mappers (ORMs) let you write code that feels like working with objects rather than SQL. They generate queries automatically. The danger is that the generated queries are not always what you would write — and at scale, the difference is catastrophic.",
          },
          {
            type: "callout",
            label: "The N+1 Problem",
            text: "Fetch 100 orders: 1 query. Then access each order's user in a loop: 100 more queries. Total: 101 queries when 2 would suffice. This is invisible at 10 records and brings down a production service at 10,000. The fix is eager loading — joining the related data in the original query — or a batch loader that fetches all users in one query after the orders load.",
          },
          {
            type: "code",
            lang: "Python — SQLAlchemy: N+1 vs Eager Loading",
            text: `from sqlalchemy.orm import selectinload

# BAD: N+1 — fires one query per order to load its user
orders = session.query(Order).all()           # 1 query
for order in orders:
    print(order.user.name)                    # +1 query each = 101 total

# GOOD: 2 queries total — orders, then all referenced users at once
orders = (
    session.query(Order)
    .options(selectinload(Order.user))        # load all users in one IN query
    .all()
)
for order in orders:
    print(order.user.name)                    # already loaded, no extra query`,
          },
          {
            type: "code",
            lang: "TypeScript — Prisma Transaction",
            text: `// Both writes succeed together or both are rolled back
const order = await prisma.$transaction(async (tx) => {
  const created = await tx.order.create({
    data: { userId, productId, quantity, total }
  });
  await tx.inventory.update({
    where: { productId },
    data: { reserved: { increment: quantity } }
  });
  return created;
});`,
          },
        ],
      },
      {
        heading: "Database Migrations: Evolving Schema Safely",
        content: [
          {
            type: "p",
            text: "The schema you design on day one is not the schema you will have on day 100. Features require new columns, performance requires new indexes, and refactors require moving or renaming data. Without a versioned migration system, schema changes are manual, unrepeatable, and impossible to roll back.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Java — Flyway",
                points: [
                  "SQL migration files named V1__create_users.sql, V2__add_index.sql",
                  "Runs automatically on app startup",
                  "Checksums detect modification of already-applied migrations",
                  "Default in Spring Boot — zero configuration needed",
                ],
              },
              {
                heading: "Node.js — Prisma Migrate",
                points: [
                  "Edit schema.prisma → prisma migrate dev generates SQL automatically",
                  "prisma migrate deploy applies migrations in production",
                  "Shadow database used to safely generate and validate migrations",
                  "prisma db seed to populate initial or test data",
                ],
              },
            ],
          },
          {
            type: "callout",
            label: "Zero-Downtime: The Expand-Contract Pattern",
            text: "Dropping a column in the same deployment that stops using it means running old code against a schema without the column — a crash. The safe sequence: (1) Expand — add the new column; old code ignores it. (2) Migrate — deploy code that writes both old and new columns; backfill existing rows. (3) Contract — deploy code that uses only the new column; drop the old one. Three deployments instead of one, zero downtime, zero crashes.",
          },
        ],
      },
    ],
  },

  {
    id: "al-systems",
    title: "The Full System: When One Machine Is Not Enough",
    overview:
      "Every application eventually hits a wall: a single database cannot handle more write throughput, a single server cannot process more concurrent requests, a single region cannot provide acceptable latency to users everywhere. The solutions to these problems are distributed systems — not because engineers wanted more complexity, but because physics and cost made single-machine scaling insufficient. This section traces that progression from one server to many, showing what breaks at each step and what architecture emerges to fix it.",
    sections: [
      {
        heading: "What Breaks When You Add a Second Server",
        content: [
          {
            type: "p",
            text: "One server handles all requests. You add a load balancer and a second server to handle more traffic. Two things that worked perfectly with one server immediately break.",
          },
          {
            type: "divider",
            text: "Problem 1 — Session State",
          },
          {
            type: "p",
            text: "Your login endpoint stores a session object in the server's process memory — a HashMap keyed by session token. With one server, every request goes to the same process, finds the same HashMap, and works. Add a second server and the load balancer starts splitting traffic between the two.",
          },
          {
            type: "diagram",
            caption: "Session state breaks with two servers",
            text: `SINGLE SERVER  ✓

  Browser ──→ Server A
                │
                └─ sessions: { "abc123": { userId: 1 } }   ← in process memory

  Every request hits the same process.
  Session is always found. Login works.


TWO SERVERS  ✗

  Browser ──→ Load Balancer ─┬─→ Server A  sessions: { "abc123": { userId: 1 } }
                              └─→ Server B  sessions: { }   ← empty

  Request 1 (POST /login)  → routed to Server A → session created in A's memory
  Request 2 (GET /profile) → routed to Server B → session not found → 401 ✗`,
          },
          {
            type: "code",
            lang: "TypeScript — Broken: In-Process Session Store",
            text: `// This pattern works on one server and silently breaks on two
const sessions = new Map<string, { userId: number }>();  // lives in this process only

app.post('/login', (req, res) => {
  const user = validateCredentials(req.body);
  const token = crypto.randomUUID();
  sessions.set(token, { userId: user.id });             // stored on THIS server only
  res.cookie('session', token).json({ ok: true });
});

app.get('/profile', (req, res) => {
  const session = sessions.get(req.cookies.session);    // may not exist on THIS server
  if (!session) return res.status(401).json({ error: 'Unauthorized' });
  // ...
});`,
          },
          {
            type: "p",
            text: "Two fixes exist. First: move sessions to a shared external store (Redis) that all servers read from. Second — and what most modern APIs use — stop storing server-side sessions entirely. Encode identity inside the token itself as a JWT, cryptographically signed. Any server can verify the signature without looking anything up.",
          },
          {
            type: "diagram",
            caption: "Fix A — shared Redis session store",
            text: `  Browser ──→ Load Balancer ─┬─→ Server A ─┐
                              └─→ Server B ─┘
                                            │
                                            ↓
                                   Redis: { "abc123": { userId: 1 } }

  Any server reads from the same Redis instance.
  Session always found regardless of which server responds.  ✓`,
          },
          {
            type: "diagram",
            caption: "Fix B — stateless JWT (no session store needed)",
            text: `  Browser ──→ Load Balancer ─┬─→ Server A ─┐
                              └─→ Server B ─┘
                                            │
                              Token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.sig"

  The token itself contains { userId: 1 }.
  Each server verifies the cryptographic signature locally.
  No external lookup. No shared store. Any server can handle any request.  ✓`,
          },
          {
            type: "divider",
            text: "Problem 2 — In-Process Caches",
          },
          {
            type: "p",
            text: "Your product service caches database results in a HashMap to avoid redundant queries. With one server, a write invalidates the cache and the next read fetches fresh data. With two servers, each process has its own HashMap. A write on Server A clears A's cache — but B's cache still holds the old value. Users get different product data depending on which server handles their request.",
          },
          {
            type: "diagram",
            caption: "In-process cache splits with two servers",
            text: `  Write: UPDATE products SET name = 'Widget Pro' WHERE id = 1

  Server A                              Server B
  ┌───────────────────────────┐         ┌───────────────────────────┐
  │ cache["product:1"]        │         │ cache["product:1"]        │
  │  → { name: "Widget Pro" } │ ✓       │  → { name: "Widget" }    │ ✗ stale
  └───────────────────────────┘         └───────────────────────────┘

  Server A invalidated its own cache after the write.
  Server B has no idea the write happened.

  GET /products/1 → Server A → "Widget Pro"   ✓
  GET /products/1 → Server B → "Widget"       ✗ wrong answer`,
          },
          {
            type: "code",
            lang: "TypeScript — Broken: Per-Process Cache",
            text: `// Each server process has its own Map — they diverge on any write
const cache = new Map<string, Product>();

async function getProduct(id: string): Promise<Product> {
  if (cache.has(id)) return cache.get(id)!;   // may be stale on THIS server
  const product = await db.findById(id);
  cache.set(id, product);
  return product;
}

async function updateProduct(product: Product) {
  await db.update(product);
  cache.delete(product.id);   // only clears THIS server's cache — other servers still stale
}`,
          },
          {
            type: "diagram",
            caption: "Fix — shared Redis cache",
            text: `  Write: UPDATE products SET name = 'Widget Pro' WHERE id = 1

  Server A                              Server B
      │                                     │
      └──────────────┬──────────────────────┘
                     ↓
              Redis: { "product:1": { name: "Widget Pro" } }

  Server A deletes "product:1" from Redis after the write.
  Next read from any server goes to Redis → cache miss → fresh DB fetch.
  All servers see the same data.  ✓`,
          },
          {
            type: "code",
            lang: "TypeScript — Fixed: Shared Redis Cache",
            text: `import { createClient } from 'redis';
const redis = createClient({ url: process.env.REDIS_URL });

async function getProduct(id: string): Promise<Product> {
  const cached = await redis.get(\`product:\${id}\`);
  if (cached) return JSON.parse(cached);           // shared cache hit

  const product = await db.findById(id);
  await redis.setEx(\`product:\${id}\`, 600, JSON.stringify(product)); // 10-min TTL
  return product;
}

async function updateProduct(product: Product) {
  await db.update(product);
  await redis.del(\`product:\${product.id}\`);     // invalidates for ALL servers
}`,
          },
          {
            type: "callout",
            label: "The Underlying Principle",
            text: "Any state stored inside a single process breaks horizontal scaling. Everything that must be consistent across multiple server instances must live outside any single instance: in a shared database, a shared cache (Redis), or encoded in the request itself (JWT). The load balancer is the easy part. Stateless processes are the hard part.",
          },
        ],
      },
      {
        heading: "How the Three Layers Connect",
        content: [
          {
            type: "compare",
            cols: [
              {
                heading: "Web / Mobile (Client)",
                points: [
                  "Sends authenticated HTTP requests with JWT in Authorization header",
                  "Maintains a local cache of server state (React Query, Room, CoreData)",
                  "Receives push notifications (FCM for Android, APNs for iOS)",
                  "Connects via WebSocket for real-time bidirectional events",
                  "Stores refresh tokens securely (HttpOnly cookie, Keychain, EncryptedSharedPrefs)",
                ],
              },
              {
                heading: "Backend (Server)",
                points: [
                  "Validates auth token cryptographically on every request",
                  "Applies business logic and authorization rules",
                  "Reads and writes to the authoritative database",
                  "Publishes events to Redis pub/sub or a message broker",
                  "Sends push notifications through FCM and APNs",
                ],
              },
              {
                heading: "Infrastructure",
                points: [
                  "PostgreSQL / MySQL: authoritative relational data",
                  "Redis: caching, sessions, pub/sub, distributed locks",
                  "Message queue (Kafka, RabbitMQ): async job processing, service decoupling",
                  "CDN: cached static assets, edge API responses",
                  "Object storage (S3): files, images, videos",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Authentication Across the Distributed System",
        content: [
          {
            type: "p",
            text: "Authentication is the most critical cross-layer flow. A mistake at any layer — wrong token storage, missing server-side validation, no expiry — creates an exploitable security hole.",
          },
          {
            type: "ul",
            items: [
              "1. User submits credentials. Backend validates them.",
              "2. Backend issues two tokens: a short-lived access token (JWT, 15 min) and a long-lived refresh token (30 days, stored in Redis).",
              "3. Access token encodes user ID, roles, and expiry. Signed with a secret key — any server can verify the signature without a database lookup.",
              "4. Client sends the access token in the Authorization header with every API request.",
              "5. Backend verifies the JWT signature cryptographically. No shared session store needed — this is why horizontal scaling is simple.",
              "6. When the access token expires (401), client silently exchanges the refresh token for a new pair.",
              "7. If the refresh token is expired or revoked, client redirects to login.",
            ],
          },
          {
            type: "code",
            lang: "TypeScript — JWT Verification Middleware",
            text: `import jwt from 'jsonwebtoken';

function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    // Cryptographic verification — no database lookup required
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: payload.sub, roles: payload.roles };
    next();
  } catch (e) {
    const status = e instanceof jwt.TokenExpiredError ? 401 : 403;
    res.status(status).json({ error: e.message });
  }
}`,
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Web Token Storage",
                points: [
                  "Access token: JavaScript memory — gone on tab close, safe from XSS",
                  "Refresh token: HttpOnly, Secure, SameSite=Strict cookie",
                  "Never store either token in localStorage — XSS can steal it",
                ],
              },
              {
                heading: "Mobile Token Storage",
                points: [
                  "iOS Keychain: AES-256 encrypted, persists across app reinstalls (configurable)",
                  "Android EncryptedSharedPreferences: AES-256, backed by Android Keystore hardware",
                  "Never store tokens in plain SharedPreferences or flat files",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Asynchronous Work: Decoupling Fast from Slow",
        content: [
          {
            type: "p",
            text: "An HTTP request has a timeout — typically 30–60 seconds. Some operations take longer: generating a PDF report, sending email to 100,000 users, processing uploaded video, running a complex data export. Doing these synchronously means the request times out, the user sees an error, and the operation may have partially completed.",
          },
          {
            type: "p",
            text: "The solution: accept the request immediately, enqueue the work, return a job ID. A separate worker process picks up the job and processes it in the background. When done, the worker can push a notification, update a status record, or send an email. The HTTP response returns in milliseconds regardless of how long the actual work takes.",
          },
          {
            type: "code",
            lang: "TypeScript — Queue-Based Background Processing",
            text: `// In the API handler: accept immediately, enqueue, return
app.post('/reports/export', authenticate, async (req, res) => {
  const jobId = await reportQueue.add('generate-csv', {
    userId: req.user.id,
    filters: req.body.filters,
  });
  res.status(202).json({ jobId });  // 202 Accepted = work is queued
});

// In the worker process (separate process, separate machine):
const worker = new Worker('generate-csv', async (job) => {
  const data = await db.query(buildQuery(job.data.filters));
  const csv = await generateCsv(data);
  await s3.upload({ Key: \`reports/\${job.id}.csv\`, Body: csv });
  await notifyUser(job.data.userId, \`Report ready: /reports/\${job.id}.csv\`);
}, { connection: redis });`,
          },
          {
            type: "callout",
            label: "Queues Decouple Services",
            text: "Message queues do more than defer work. They decouple the producer (the API) from the consumer (the worker). The API does not need to know that a worker exists, what it does, or how many instances are running. You can add more workers without changing the API. You can replace the worker implementation without changing the API. This decoupling is the foundation of event-driven architecture.",
          },
        ],
      },
      {
        heading: "Data Synchronization: The Hardest Problem",
        content: [
          {
            type: "p",
            text: "Keeping the same data consistent across web client, mobile client, and backend is a foundational challenge in distributed systems. Every approach trades one thing for another.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Pull (Polling)",
                points: [
                  "Client requests updates on a fixed interval",
                  "Simple to implement — just a repeating HTTP GET",
                  "Data is stale between polls",
                  "Wastes bandwidth with empty responses",
                  "Use when updates are infrequent and small delay is acceptable",
                ],
              },
              {
                heading: "WebSocket / SSE",
                points: [
                  "Persistent connection: server pushes updates as they happen",
                  "Real-time, lowest latency for real-time features",
                  "Stateful connections need Redis pub/sub to fan out across multiple server instances",
                  "Best for chat, collaborative editing, live dashboards",
                ],
              },
              {
                heading: "Push Notifications",
                points: [
                  "Server sends to device via FCM (Android) or APNs (iOS)",
                  "Works when the app is backgrounded or closed",
                  "Delivery is best-effort — not guaranteed, may be delayed",
                  "Battery-efficient: OS manages delivery scheduling",
                  "Use for alerts and wake signals, not data synchronization",
                ],
              },
            ],
          },
          {
            type: "callout",
            label: "Lost Updates and Optimistic Locking",
            text: "Two users read the same record simultaneously. Both modify it. Both write back — one silently overwrites the other's changes. The fix is optimistic locking: add a version column to the row. Include the version in the WHERE clause of your UPDATE. Check that exactly 1 row was updated. If 0 rows updated, someone else changed it first — show a conflict and let the user decide.",
          },
        ],
      },
      {
        heading: "A Complete Journey: One Chat Message",
        content: [
          {
            type: "p",
            text: "Trace a single chat message from keyboard to every recipient's screen to see the entire distributed system working together:",
          },
          {
            type: "ul",
            items: [
              "1. User types message — stored in useState / Compose MutableState (transient, one variable in RAM)",
              "2. User taps Send — message added to a local pending Queue (in-memory buffer, Queue data structure)",
              "3. UI renders message immediately with a 'Sending...' indicator — optimistic update, no server confirmation yet",
              "4. HTTP POST sent to backend — body contains text and room ID; Authorization header carries JWT",
              "5. Backend middleware verifies JWT signature cryptographically — no database lookup",
              "6. Service writes message to PostgreSQL inside a transaction — assigned a server ID and timestamp",
              "7. On commit, service publishes 'new_message' event to Redis pub/sub on the room's channel",
              "8. WebSocket server receives event from Redis and fans it out to all connected clients in the room",
              "9. Other web clients' React Query caches update; components re-render with the new message",
              "10. Backgrounded mobile clients receive push notification via FCM/APNs",
              "11. Original sender receives HTTP 201 — 'Sending...' becomes 'Sent'",
              "12. All parties see the same message with the same server-assigned ID and timestamp",
            ],
          },
        ],
      },
    ],
  },

  {
    id: "al-advanced",
    title: "Distributed Scale and Engineering Thinking",
    overview:
      "Single-machine performance has physical limits. A vertical scaling strategy — adding more CPU and RAM to one server — hits a ceiling determined by hardware economics. At that ceiling, the only path forward is horizontal scaling: multiple machines, coordinated. But coordination introduces new failure modes — split-brain, eventual consistency, race conditions across machines — that do not exist in a single process. This section traces what breaks at scale, what patterns emerged to handle it, and how cloud platforms abstracted the hardest parts.",
    sections: [
      {
        heading: "The Vertical Scaling Ceiling",
        content: [
          {
            type: "p",
            text: "When a single server becomes the bottleneck, the first instinct is to make it bigger: more CPU cores, more RAM, faster storage. This works — up to a point. The largest available cloud VM in 2025 has roughly 448 vCPUs and 24 TB RAM. Beyond that, no amount of money buys a bigger single machine.",
          },
          {
            type: "p",
            text: "Even before hitting the hardware ceiling, vertical scaling has a worse problem: a single machine is a single point of failure. Any crash, deployment, or hardware fault takes the entire system offline. Production systems require horizontal scaling — multiple machines — not just for capacity, but for availability.",
          },
          {
            type: "diagram",
            caption: "Vertical scaling hits a physical and availability ceiling",
            text: `VERTICAL SCALING

  Users ───────────────→ One larger server
                         CPU + RAM + disk increase

  Works until:
    • largest VM size is reached
    • one crash takes everything down
    • one deploy interrupts everyone


HORIZONTAL SCALING

  Users ──→ Load Balancer ─┬─→ Server A
                            ├─→ Server B
                            └─→ Server C

  Capacity increases by adding instances.
  Availability improves because one failed instance can be removed from rotation.`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Load Balancer",
                body: "Distributes incoming requests across multiple server instances. Performs health checks — stops sending traffic to unhealthy instances. Makes horizontal scaling transparent to clients: they connect to one address, the load balancer handles the rest.",
              },
              {
                title: "Stateless Servers",
                body: "For a load balancer to distribute requests freely, any server must be able to handle any request. No in-process session state. No user-specific in-memory cache. All shared state lives in the database or Redis — outside any individual process.",
              },
              {
                title: "Database Replication",
                body: "The database becomes the bottleneck next. Read replicas receive copies of writes from the primary and serve read queries. Route reads to replicas, writes to primary. Read throughput scales with replica count; write throughput is still bounded by the primary.",
              },
              {
                title: "Database Sharding",
                body: "Partition data across multiple database instances. Each shard owns a subset of rows — typically split by user ID range or a hash. Queries that touch one shard are fast; queries that span shards require coordination. Sharding is complex and a last resort.",
              },
            ],
          },
          {
            type: "diagram",
            caption: "Horizontal scaling only works when servers are stateless",
            text: `REQUEST ROUTING

  Client request
      │
      ↓
  Load Balancer ── health checks ── removes unhealthy instances
      │
      ├─→ Server A ─┐
      ├─→ Server B ─┼─→ Shared Redis / Database / Queue
      └─→ Server C ─┘

  Server instances can be created, killed, or replaced.
  Durable/shared state must live outside any one process.`,
          },
        ],
      },
      {
        heading: "CAP Theorem: The Constraint That Cannot Be Escaped",
        content: [
          {
            type: "p",
            text: "When a network partition occurs — two parts of a distributed system lose the ability to communicate — you face a forced choice. You can either serve requests that might return stale or inconsistent data (choose Availability), or you can refuse to serve requests until the partition heals (choose Consistency). You cannot do both. This is the CAP theorem: Consistency, Availability, and Partition Tolerance — choose two.",
          },
          {
            type: "diagram",
            caption: "CAP decision during a network partition",
            text: `NORMAL OPERATION

  Node A  ←──── network ────→  Node B
    │                            │
    └──────── same data ─────────┘


NETWORK PARTITION

  Node A   ✗ no communication ✗   Node B

  Forced choice:

    CP: refuse some requests until nodes can agree
        → correctness first, lower availability

    AP: continue serving requests on both sides
        → availability first, temporary inconsistency`,
          },
          {
            type: "compare",
            cols: [
              {
                heading: "CP Systems (Consistent + Partition-Tolerant)",
                points: [
                  "Refuse requests during a partition rather than risk inconsistency",
                  "All nodes see the same data at all times",
                  "Examples: PostgreSQL with synchronous replication, HBase, ZooKeeper",
                  "Use for: financial data, inventory, anything where correctness beats availability",
                ],
              },
              {
                heading: "AP Systems (Available + Partition-Tolerant)",
                points: [
                  "Serve requests during a partition, accepting possible stale reads",
                  "Nodes may temporarily have different views of the data",
                  "Converge to the same state when the partition heals (eventual consistency)",
                  "Examples: DynamoDB, Cassandra, DNS, CRDTs",
                  "Use for: social feeds, analytics, anything where availability beats consistency",
                ],
              },
            ],
          },
          {
            type: "callout",
            label: "Eventual Consistency in Practice",
            text: "AP systems guarantee that, given no new writes, all nodes will eventually converge to the same state. 'Eventually' may mean milliseconds or seconds depending on replication lag. Instagram's like counts, Twitter's follower counts, DNS propagation — these all use eventual consistency. Your bank balance does not. The choice is a product decision with engineering consequences, not a purely technical one.",
          },
        ],
      },
      {
        heading: "Patterns That Emerge at Scale",
        content: [
          {
            type: "p",
            text: "Several architectural patterns emerged not from first principles but from teams hitting specific limits and solving them. Understanding the problem each solves is more valuable than memorizing the pattern name.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "CQRS — Command Query Responsibility Segregation",
                points: [
                  "Separates the write model (normalized, transactional) from the read model (denormalized, fast)",
                  "Reads outnumber writes 10:1 to 100:1 in most systems",
                  "Read models are optimized specifically for query patterns — flat, pre-joined, possibly in a different database",
                  "Read models updated by consuming events from the write side",
                  "Cost: synchronization complexity between write and read models",
                ],
              },
              {
                heading: "Event Sourcing",
                points: [
                  "Store the sequence of events that produced current state, not the current state itself",
                  "Current state = fold (reduce) over all events from the beginning",
                  "Complete, immutable audit trail — legally required in finance and healthcare",
                  "Replay events to reconstruct state at any point in history",
                  "Project any new read model by replaying the event log",
                  "Cost: replay performance (mitigated by snapshots), higher conceptual complexity",
                ],
              },
            ],
          },
          {
            type: "diagram",
            caption: "CQRS separates write correctness from read speed",
            text: `COMMAND SIDE (writes)                    QUERY SIDE (reads)

  API command                              UI query
      │                                       │
      ↓                                       ↓
  Transactional model ── emits event ──→ Denormalized read model
  normalized tables                         flat/pre-joined/cacheable
  strict invariants                         optimized for screen/query

  Cost: the read side is eventually synchronized from the write side.`,
          },
          {
            type: "callout",
            label: "Event Sourcing Is a Reduce Operation",
            text: "An event log is an append-only list. Deriving current state from it is a fold/reduce: start with an initial state, apply each event in sequence, produce the final state. This is identical to JavaScript's Array.reduce(), Java's Stream.reduce(), or Python's functools.reduce(). Every event-sourced system is, at its foundation, a reduce over an ordered list of facts.",
          },
          {
            type: "diagram",
            caption: "Event sourcing as reduce over facts",
            text: `Event log:

  [AccountOpened(0), Deposited(500), Withdrew(120), Deposited(80)]

Reduce:

  balance = 0
      │
      ├─ Deposited(500)  → 500
      ├─ Withdrew(120)   → 380
      └─ Deposited(80)   → 460

Current state is derived, not directly stored as the source of truth.`,
          },
          {
            type: "code",
            lang: "TypeScript — Event Sourcing as Reduce",
            text: `type Event =
  | { type: 'AccountOpened' }
  | { type: 'Deposited'; amount: number }
  | { type: 'Withdrew'; amount: number };

type AccountState = { balance: number };

function applyEvent(state: AccountState, event: Event): AccountState {
  switch (event.type) {
    case 'AccountOpened':
      return { balance: 0 };
    case 'Deposited':
      return { balance: state.balance + event.amount };
    case 'Withdrew':
      return { balance: state.balance - event.amount };
  }
}

const currentState = events.reduce(applyEvent, { balance: 0 });`,
          },
        ],
      },
      {
        heading: "Cloud Platforms: Distributed Systems as a Service",
        content: [
          {
            type: "p",
            text: "Before cloud platforms, running a distributed system meant buying physical servers, installing operating systems, configuring networking, provisioning storage, handling hardware failures, and managing software deployments across all of it. A team might spend weeks preparing infrastructure before writing a single line of application code.",
          },
          {
            type: "p",
            text: "Cloud platforms (AWS, Google Cloud, Azure) did not invent distributed systems. They abstracted the infrastructure complexity of running them. What took a team of infrastructure engineers weeks now takes a developer an afternoon. The tradeoff: you lose visibility and control over the layers you are not managing.",
          },
          {
            type: "diagram",
            caption: "Cloud services package distributed-system primitives",
            text: `Manual infrastructure                         Managed cloud abstraction

  provision servers       ───────────────→    compute / serverless
  configure networking    ───────────────→    VPC / load balancer / CDN
  install databases       ───────────────→    RDS / Cloud SQL / Aurora
  set up replication      ───────────────→    managed replicas + failover
  run containers          ───────────────→    Kubernetes / container services
  monitor failures        ───────────────→    managed metrics + logs + traces

The abstraction saves operational work, but the failure modes still exist underneath.`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Managed Databases (RDS, Cloud SQL, Aurora)",
                body: "Automatic backups, point-in-time recovery, replication, failover, patching. The alternative: provision EC2 instances, install PostgreSQL, configure replication, set up backup cron jobs, handle failover manually. Cloud wins on operational cost.",
              },
              {
                title: "Kubernetes",
                body: "Container orchestration: schedule containers across a cluster of machines, restart failed containers, scale replicas up or down, route traffic to healthy instances. The primitives of horizontal scaling, packaged as a declarative API.",
              },
              {
                title: "Serverless Functions (Lambda, Cloud Functions)",
                body: "Upload code, define a trigger (HTTP request, queue message, cron). The platform runs your code, scales to zero between invocations, charges only for actual compute time. Eliminates server management entirely for stateless functions.",
              },
              {
                title: "CDN (CloudFront, Cloud CDN)",
                body: "Cache content at edge nodes geographically close to users. A user in Tokyo accessing a CDN-cached asset does not wait for a round trip to a data center in Virginia. Latency is bounded by geography; CDNs move content closer to the boundary.",
              },
            ],
          },
          {
            type: "p",
            text: "Cloud platforms are not magic. They are distributed systems — with all the consistency tradeoffs, failure modes, and network latency of any distributed system — managed by someone else. Understanding the distributed systems concepts in this section is what lets you use cloud services deliberately rather than cargo-culting configurations you do not understand.",
          },
        ],
      },
      {
        heading: "How Senior Engineers Think",
        content: [
          {
            type: "p",
            text: "Junior engineers ask 'how do I build this?' Senior engineers ask 'what is the simplest thing that could work, what are its failure modes, and how easy is it to change when requirements shift?'",
          },
          {
            type: "grid",
            cards: [
              {
                title: "Start Simple",
                body: "A single well-optimized PostgreSQL instance handles millions of rows and thousands of requests per second. Do not build a distributed system until profiling proves you need one. Complexity is a cost that compounds — every abstraction you add is a thing your whole team must understand, debug, and maintain.",
              },
              {
                title: "Design for Observability",
                body: "Code that cannot be debugged in production is a liability. Structured logging, metrics, and distributed tracing are not optional extras — they are how you find the problem at 3 AM before the on-call escalates. If you cannot observe it, you cannot fix it.",
              },
              {
                title: "Understand Your Data Model",
                body: "Most performance problems are data model problems. A missing index or a poorly chosen primary key turns a 10 ms query into a 10-second full table scan at scale. Schema design is the highest-leverage technical decision in most applications — it is harder to change than code.",
              },
              {
                title: "Design for Failure",
                body: "Every external call can fail. Every database can be temporarily unavailable. Circuit breakers, retries with exponential backoff, and graceful degradation are not edge case handling — they are baseline reliability engineering. The question is not whether a dependency will fail. It is what your system does when it does.",
              },
            ],
          },
          {
            type: "callout",
            label: "Every Architecture Is a Trade-off",
            text: "Microservices trade operational complexity for team autonomy and independent deployment. Event sourcing trades query simplicity for full audit trails. CQRS trades code simplicity for separate read and write scalability. Caching trades consistency for speed. There is no universally correct architecture — only trade-offs made explicitly, with full understanding of the consequences, by people who understand the business constraints they are designing within.",
          },
        ],
      },
      {
        heading: "Performance Engineering: Measure First",
        content: [
          {
            type: "p",
            text: "Optimizing code without profiling is guessing. Guessing is expensive: you spend engineering time on code that is not the bottleneck, add complexity that makes the system harder to change, and often make the actual problem worse by making the system harder to reason about.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Memory Efficiency",
                points: [
                  "Use int[] instead of ArrayList<Integer> for large numeric datasets — 4× less memory",
                  "Stream large datasets instead of loading all rows into memory at once",
                  "Allocate objects outside inner loops — reuse rather than re-allocate",
                  "Profile with: VisualVM (Java), Instruments (iOS), Android Studio Memory Profiler",
                ],
              },
              {
                heading: "Throughput Efficiency",
                points: [
                  "Connection pools — never open a new database connection per request",
                  "Batch reads with IN queries instead of N individual queries",
                  "Async I/O — never block a thread waiting for network or disk",
                  "Multi-level caching: CDN edge → in-process → Redis → database",
                  "Read replicas — route read queries to replicas, writes to the primary",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "Python — Cursor-Based Pagination (FastAPI)",
            text: `@app.get("/orders")
def list_orders(
    cursor: str | None = Query(default=None),
    limit: int = Query(default=20, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Order).order_by(Order.created_at.desc())
    if cursor:
        after_time = decode_cursor(cursor)
        query = query.filter(Order.created_at < after_time)

    orders = query.limit(limit + 1).all()
    has_more = len(orders) > limit

    return {
        "orders": orders[:limit],
        "next_cursor": encode_cursor(orders[limit - 1].created_at) if has_more else None
    }

# Why cursor pagination instead of OFFSET?
# OFFSET n scans and discards n rows — O(n) cost that grows with page depth.
# Cursor pagination filters by value — always O(log n) with an index.
# At page 500, OFFSET is 10,000 wasted rows; cursor is one indexed scan.`,
          },
          {
            type: "diagram",
            caption: "OFFSET pagination vs cursor pagination",
            text: `OFFSET PAGE 500

  index scan: [row 1 ... row 10,000] discard
              [row 10,001 ... row 10,020] return

  Cost grows with page depth: O(offset + limit)


CURSOR PAGE AFTER created_at = T

  B-tree seeks directly to T
      ↓
  return next 20 rows

  Cost stays near O(log n + limit) with the right index.`,
          },
          {
            type: "callout",
            label: "Algorithmic Complexity Does Not Stop Mattering",
            text: "O(n²) logic is invisible at 100 items and catastrophic at 1,000,000. A nested loop that passes all tests in development will take down a production service under real load. HashMap lookup is O(1); List.contains() is O(n). The foundational layer — data structures and algorithms — is foundational because application engineers who understand it can reason about the performance of their own code at any scale. Engineers who don't will discover the problem in production.",
          },
        ],
      },
    ],
  },

  {
    id: "al-networking",
    title: "Networking",
    overview:
      "Networking is the layer between application logic and other machines. Every real application communicates: mobile apps fetch data from servers, backend services call APIs and databases, and distributed systems coordinate across data centers. Understanding networking means understanding how data travels, why requests fail, and what controls latency and throughput.",
    sections: [
      {
        heading: "What Is a Network?",
        content: [
          {
            type: "p",
            text: "A network is a collection of machines connected by links that can transmit data. The internet is a network of networks — billions of devices connected through routers, switches, fiber cables, and wireless signals. Every request your application makes crosses this infrastructure.",
          },
          {
            type: "grid",
            cards: [
              {
                title: "Packet Switching",
                body: "Data is broken into packets. Each packet travels independently through the network and is reassembled at the destination. This lets many conversations share the same physical links simultaneously.",
              },
              {
                title: "IP Address",
                body: "Every host has an IP address (IPv4: 4 octets, e.g. 192.168.1.1; IPv6: 128-bit hex). This is the network-layer identifier used by routers to deliver packets between machines.",
              },
              {
                title: "Port",
                body: "A port number (0–65535) identifies a specific process on a host. HTTP: 80, HTTPS: 443, PostgreSQL: 5432. Together, IP + port = socket address — the full endpoint of a network connection.",
              },
            ],
          },
          {
            type: "callout",
            label: "Core Insight",
            text: "An IP address identifies a machine. A port identifies a process on that machine. A socket is the combination of IP + port + protocol — it is the endpoint of a network connection, the network analogue of a file descriptor.",
          },
        ],
      },
      {
        heading: "The TCP/IP Stack",
        content: [
          {
            type: "p",
            text: "The internet uses a layered protocol stack. Each layer solves one problem and delegates the rest to the layer below. Application code operates at the top two layers — TCP and HTTP — and the OS handles everything below.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Layer",
                points: [
                  "Application (HTTP, WebSocket, gRPC, DNS, SMTP)",
                  "Transport (TCP, UDP)",
                  "Network (IP — routing between machines)",
                  "Link (Ethernet, WiFi — local network delivery)",
                  "Physical (cables, radio waves, fiber)",
                ],
              },
              {
                heading: "What It Provides",
                points: [
                  "Protocol-level semantics: request/response, streams, RPC",
                  "End-to-end reliability (TCP) or speed without guarantee (UDP)",
                  "Global addressing and routing across networks",
                  "Hop-to-hop delivery on the local network segment",
                  "Bit transmission over a physical medium",
                ],
              },
            ],
          },
          {
            type: "p",
            text: "TCP provides: ordered delivery, error correction (corrupted packets are retransmitted), flow control, and congestion control. The cost is latency: a TCP connection requires a 3-way handshake (SYN → SYN-ACK → ACK) before any data flows.",
          },
          {
            type: "callout",
            label: "TCP vs UDP",
            text: "UDP sends packets with no ordering or retransmission guarantees — lower latency, higher packet loss risk. Use TCP for anything that must be correct (APIs, databases, file transfers). Use UDP for real-time data where a stale retransmission is worse than a missing packet (video streaming, DNS, real-time game state).",
          },
        ],
      },
      {
        heading: "HTTP: The Application Protocol",
        content: [
          {
            type: "p",
            text: "HTTP is the application-layer protocol used by virtually all web APIs. A client sends a request (method + path + headers + optional body); a server sends a response (status code + headers + optional body). HTTP is stateless — each request is independent. Sessions, authentication tokens, and cookies are application-layer conventions layered on top.",
          },
          {
            type: "grid",
            cards: [
              {
                title: "HTTP Methods",
                body: "GET (read, idempotent, no body), POST (create, not idempotent), PUT (replace, idempotent), PATCH (partial update), DELETE (remove, idempotent). Idempotent means repeating the same request produces the same result — safe to retry.",
              },
              {
                title: "Status Codes",
                body: "2xx success (200 OK, 201 Created, 204 No Content). 3xx redirect. 4xx client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests). 5xx server error (500, 502, 503, 504).",
              },
              {
                title: "HTTP/2 and HTTP/3",
                body: "HTTP/2 multiplexes multiple requests over a single TCP connection — no head-of-line blocking per request. HTTP/3 replaces TCP with QUIC (UDP-based) for lower latency on lossy networks.",
              },
            ],
          },
          {
            type: "code",
            lang: "Java — HTTP GET with HttpClient",
            text: `HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users/1"))
    .header("Authorization", "Bearer " + token)
    .GET()
    .build();

HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.statusCode()); // 200
System.out.println(response.body());       // JSON body`,
          },
          {
            type: "code",
            lang: "TypeScript — fetch with async/await",
            text: `const response = await fetch("https://api.example.com/users/1", {
  headers: {
    "Authorization": \`Bearer \${token}\`,
    "Content-Type": "application/json",
  },
});

if (!response.ok) {
  throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
}

const user = await response.json();`,
          },
          {
            type: "code",
            lang: "Python — requests library",
            text: `import requests

response = requests.get(
    "https://api.example.com/users/1",
    headers={"Authorization": f"Bearer {token}"},
    timeout=5,          # always set a timeout — no default
)
response.raise_for_status()  # raises HTTPError for 4xx/5xx
user = response.json()`,
          },
        ],
      },
      {
        heading: "DNS: Resolving Names to Addresses",
        content: [
          {
            type: "p",
            text: "DNS translates human-readable hostnames (api.example.com) into IP addresses (93.184.216.34) that routers can use. Every network request begins with a DNS lookup — typically invisible but always present.",
          },
          {
            type: "ul",
            items: [
              "Browser/OS checks its local DNS cache. If found and not expired (TTL), use it.",
              "If not cached, query the configured resolver (ISP or public: 8.8.8.8, 1.1.1.1).",
              "Resolver checks its cache. On miss, walks the DNS hierarchy: root servers → TLD servers (.com) → authoritative nameservers for the domain.",
              "The authoritative nameserver returns the IP. The resolver caches it for the TTL duration and returns it to the client.",
            ],
          },
          {
            type: "callout",
            label: "Engineering Implication",
            text: "DNS TTL controls how long clients cache the IP address. Low TTL (60s) enables fast failover — when you change servers, clients pick up the new IP quickly. High TTL (86400s) reduces DNS query overhead but slows failover. Production services typically use 30–300s TTLs. DNS failures cause total application failures — always configure retry logic and connection timeouts.",
          },
        ],
      },
      {
        heading: "TLS and HTTPS",
        content: [
          {
            type: "p",
            text: "TLS sits between TCP and HTTP. It provides confidentiality (encryption), integrity (tamper detection), and authentication (server identity verified via certificates). HTTPS = HTTP over TLS.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "TLS Handshake (simplified)",
                points: [
                  "Client sends ClientHello: supported TLS versions and cipher suites.",
                  "Server sends ServerHello: chosen cipher, plus its certificate (public key + identity).",
                  "Client verifies the certificate against trusted Certificate Authorities.",
                  "Client and server derive a shared session key using asymmetric crypto (RSA or ECDH).",
                  "All subsequent traffic is encrypted with a symmetric cipher (AES-GCM).",
                ],
              },
              {
                heading: "Engineering Implications",
                points: [
                  "TLS adds ~1–2 RTT latency to the first connection (on top of TCP handshake).",
                  "TLS 1.3 reduces this to 1 RTT; session resumption can reduce to 0 RTT.",
                  "Certificate expiry causes production outages — automate renewal (Let's Encrypt, AWS ACM).",
                  "Internal services should also use TLS; mutual TLS (mTLS) authenticates both sides.",
                  "Never disable certificate verification in production code, even for internal services.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "REST vs WebSockets vs gRPC",
        content: [
          {
            type: "grid",
            cards: [
              {
                title: "REST over HTTP",
                body: "Stateless request-response. Client sends a request; server responds; done. Cacheable. Widely understood. Best for standard CRUD APIs, public APIs, and browser clients.",
              },
              {
                title: "WebSocket",
                body: "Full-duplex persistent connection. After an HTTP upgrade handshake, either side can send messages at any time with no request-response ceremony. Best for chat, collaborative editing, live dashboards, game state.",
              },
              {
                title: "gRPC",
                body: "Remote procedure calls over HTTP/2 with Protocol Buffers. Strongly typed, streaming support, binary serialization (smaller and faster than JSON). Best for internal service-to-service communication where latency and throughput matter.",
              },
            ],
          },
          {
            type: "code",
            lang: "Java — WebSocket client",
            text: `HttpClient client = HttpClient.newHttpClient();
WebSocket ws = client.newWebSocketBuilder()
    .buildAsync(URI.create("wss://api.example.com/ws"), new WebSocket.Listener() {
        public CompletionStage<?> onText(WebSocket ws, CharSequence data, boolean last) {
            System.out.println("Received: " + data);
            ws.request(1);
            return null;
        }
    }).join();

ws.sendText("hello", true);`,
          },
        ],
      },
      {
        heading: "Latency, Throughput, and Bandwidth",
        content: [
          {
            type: "grid",
            cards: [
              {
                title: "Latency",
                body: "Time for one round trip between sender and receiver. Dominated by the speed of light over geographic distance. London to Tokyo: ~180ms one-way. Cannot be reduced below the physical limit — only minimized by moving compute closer to users (CDN, edge).",
              },
              {
                title: "Throughput",
                body: "Amount of data transferred per unit time (Mbps, Gbps). Increased by parallelism (more connections, more streams) or more efficient protocols (HTTP/2 multiplexing, binary serialization instead of JSON).",
              },
              {
                title: "Bandwidth",
                body: "The maximum throughput the physical link can carry — the theoretical ceiling. Actual throughput is always lower due to protocol overhead, TCP slow start, congestion, and retransmissions.",
              },
            ],
          },
          {
            type: "callout",
            label: "The Latency Numbers Every Engineer Should Know",
            text: "L1 cache ~1ns. L2 cache ~4ns. RAM ~100ns. SSD random read ~100μs. Network within data center ~0.5ms. Network cross-continent ~100ms. Disk seek ~10ms. These orders of magnitude determine which operations are cheap and which are bottlenecks. An algorithm that makes one database call per list item is not slow at 10 items. At 10,000 items it is 10,000 × 10ms = 100 seconds.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Reduce Latency",
                points: [
                  "Move data closer to users: CDN for assets, edge compute for dynamic content",
                  "Persistent connections: keep-alive, connection pooling — eliminate handshake per request",
                  "HTTP/2 multiplexing: multiple requests over one connection",
                  "Prefetch predictable data before the user requests it",
                  "Compress payloads: gzip/brotli, binary formats (Protobuf vs JSON)",
                ],
              },
              {
                heading: "Increase Throughput",
                points: [
                  "Parallel requests: fetch multiple resources concurrently",
                  "Batch small requests into one larger request",
                  "Streaming: start processing before the full response arrives",
                  "Connection pooling: reuse TCP connections across requests",
                  "Horizontal scaling: multiple server instances behind a load balancer",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Connection Pooling",
        content: [
          {
            type: "p",
            text: "Establishing a new TCP connection for every request is expensive: TCP handshake (~1 RTT) + TLS handshake (~1-2 RTT) before the first byte of application data. For a service making 1,000 database queries per second, opening a new connection for each means the handshake overhead dominates query time — and databases have a hard limit on concurrent connections.",
          },
          {
            type: "ul",
            items: [
              "HTTP keep-alive: the TCP connection is kept open after a request completes and reused for the next. Default in HTTP/1.1. Eliminates TCP+TLS handshake cost for subsequent requests.",
              "HTTP/2 multiplexing: multiple concurrent request/response streams over a single TCP connection. Eliminates per-request connection overhead entirely.",
              "Database connection pools (HikariCP, pgBouncer): a fixed pool of pre-established connections shared across all application threads. Eliminates per-query connection cost. Misconfiguring pool size is a common production bottleneck.",
            ],
          },
          {
            type: "code",
            lang: "Java — HikariCP Connection Pool",
            text: `HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
config.setMaximumPoolSize(20);       // max concurrent DB connections
config.setMinimumIdle(5);            // keep 5 connections warm
config.setConnectionTimeout(30000);  // max wait for a connection from the pool: 30s
config.setIdleTimeout(600000);       // close idle connections after 10 min

HikariDataSource dataSource = new HikariDataSource(config);`,
          },
          {
            type: "callout",
            label: "Common Mistake",
            text: "Opening a new database connection per HTTP request is one of the most common production performance mistakes. Under load, connection establishment time dominates query time, and the database server exhausts its connection limit. Always use a connection pool. Size the pool to match your application's actual concurrency, not your database's maximum connection limit.",
          },
        ],
      },
      {
        heading: "Networking Failures and How to Handle Them",
        content: [
          {
            type: "p",
            text: "Networks are unreliable by design. Packets drop, connections time out, DNS fails, certificates expire, servers crash. Robust application code treats network failures as expected events, not exceptions.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Failure Type",
                points: [
                  "Connection timeout — server not reachable or slow to accept",
                  "Read timeout — server accepted but stopped sending data",
                  "DNS failure — hostname cannot be resolved",
                  "TLS error — certificate invalid, expired, or hostname mismatch",
                  "HTTP 5xx — server accepted request but returned an error",
                  "HTTP 429 — rate limited by the server",
                ],
              },
              {
                heading: "Engineering Response",
                points: [
                  "Set connect timeout (2s). Retry with exponential backoff.",
                  "Set read timeout (30s). Fail fast rather than waiting indefinitely.",
                  "Retry DNS on failure. Cache successes. Use multiple resolvers.",
                  "Automate certificate renewal. Alert on expiry < 30 days.",
                  "Retry idempotent requests (GET, PUT). Do NOT blindly retry POST.",
                  "Respect Retry-After header. Implement client-side token bucket rate limiting.",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "Python — Retry with Exponential Backoff",
            text: `import requests, time, random

def fetch_with_retry(url: str, max_attempts: int = 4):
    for attempt in range(max_attempts):
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 429:
                wait = float(response.headers.get("Retry-After", 2 ** attempt))
                time.sleep(wait)
                continue
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            if attempt == max_attempts - 1:
                raise
            jitter = random.uniform(0, 1)
            time.sleep((2 ** attempt) + jitter)  # exponential backoff + jitter`,
          },
        ],
      },
    ],
  },
];

const appLayerTopicsWithDatabaseOverviews: AppLayerTopic[] = baseAppLayerTopics.map((topic) => {
  if (topic.id === databaseSystemsTopic.id) return databaseSystemsTopic;
  if (topic.id === databaseReliabilityTopic.id) return databaseReliabilityTopic;
  return topic;
});

const databaseTrackInsertIndex =
  appLayerTopicsWithDatabaseOverviews.findIndex(
    (topic) => topic.id === databaseReliabilityTopic.id,
  ) + 1;

export const appLayerTopics: AppLayerTopic[] = [
  ...appLayerTopicsWithDatabaseOverviews.slice(0, databaseTrackInsertIndex),
  ...dbreCompleteTrackTopics,
  ...appLayerTopicsWithDatabaseOverviews.slice(databaseTrackInsertIndex),
];
