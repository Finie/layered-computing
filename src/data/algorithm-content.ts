import type {
  AlgorithmFamily,
  AlgorithmLanguageExample,
  AlgorithmTopic,
  Complexity,
} from "@/types/tutorial";

type Spec = {
  id: string;
  title: string;
  family: AlgorithmFamily;
  summary: string;
  problem: string;
  whyExists: string;
  history: string;
  dataStructures: string[];
  prerequisites?: string[];
  naiveApproach: string;
  optimizedApproach: string;
  mechanics: string[];
  visualization: string[];
  complexity: Complexity[];
  memoryBehavior: string;
  scalability: string;
  tradeoffs: string[];
  edgeCases?: string[];
  beginnerMistakes?: string[];
  variants?: string[];
  interviewQuestions?: string[];
  interviewerFocus: string;
  engineeringThinking: string;
  pairsBestWith: string[];
  whenNotToUse: string;
  productionUse: string;
  databaseRelevance: string;
  faangScaleUse: string;
  distributedImplications?: string;
  java: string;
  optimizedJava?: string;
  typescript?: string;
  optimizedTypescript?: string;
  python?: string;
  optimizedPython?: string;
};

const defaultEdgeCases = [
  "Empty input",
  "One element",
  "Duplicate values",
  "Null or invalid input where the language allows it",
  "Very large input",
];

const systemsConnections = [
  "Primitive data types provide comparable values, counters, indexes, flags, and numeric costs.",
  "Data structures determine whether the algorithm scans, indexes, queues, hashes, sorts, or traverses.",
  "Memory behavior decides whether the algorithm is cache-friendly, allocation-heavy, stack-heavy, or suitable for streaming.",
  "Application state uses algorithms to validate, diff, rank, schedule, synchronize, and transform data.",
  "Backend systems use algorithms for routing, caching, indexing, authorization, retries, and job scheduling.",
  "Databases, networks, distributed systems, and AI systems scale by choosing algorithms with predictable cost under load.",
];

function code(spec: Spec) {
  return {
    java: {
      naiveCode: spec.java,
      optimizedCode: spec.optimizedJava ?? spec.java,
    },
    typescript: {
      naiveCode: spec.typescript ?? spec.java,
      optimizedCode:
        spec.optimizedTypescript ?? spec.typescript ?? spec.optimizedJava ?? spec.java,
    },
    python: {
      naiveCode: spec.python ?? spec.java,
      optimizedCode: spec.optimizedPython ?? spec.python ?? spec.optimizedJava ?? spec.java,
    },
  };
}

function topic(spec: Spec): AlgorithmTopic {
  return {
    id: spec.id,
    title: spec.title,
    family: spec.family,
    summary: spec.summary,
    problem: spec.problem,
    whyExists: spec.whyExists,
    history: spec.history,
    prerequisites: spec.prerequisites ?? [
      "Primitive values",
      "Memory and references",
      "Data structures",
      "Big-O reasoning",
    ],
    dataStructures: spec.dataStructures,
    naiveApproach: spec.naiveApproach,
    optimizedApproach: spec.optimizedApproach,
    mechanics: spec.mechanics,
    walkthrough: spec.mechanics,
    visualization: spec.visualization,
    memoryBehavior: spec.memoryBehavior,
    complexity: spec.complexity,
    scalability: spec.scalability,
    tradeoffs: spec.tradeoffs,
    edgeCases: spec.edgeCases ?? defaultEdgeCases,
    beginnerMistakes: spec.beginnerMistakes ?? [
      "Memorizing code without understanding the invariant.",
      "Ignoring the input shape and choosing the wrong data structure.",
      "Only stating time complexity and forgetting memory behavior.",
      "Missing boundary cases and termination conditions.",
    ],
    variants: spec.variants ?? [
      "Recursive implementation",
      "Iterative implementation",
      "Streaming or batched implementation",
      "Parallel or distributed implementation where the dependency pattern allows it",
    ],
    interviewerExpectations: [
      "Explain the brute-force baseline before optimizing.",
      "Name the data structures and invariants.",
      "Walk through a concrete example.",
      "State time and space complexity.",
      "Explain when not to use the algorithm.",
    ],
    interviewQuestions: spec.interviewQuestions ?? [
      `Implement ${spec.title}.`,
      `Analyze the complexity of ${spec.title}.`,
      `Describe a production system where ${spec.title} is useful.`,
    ],
    interviewerFocus: spec.interviewerFocus,
    engineeringThinking: spec.engineeringThinking,
    juniorMisses: "Junior engineers often solve the toy input but miss invariants, memory growth, pathological inputs, and production-scale failure modes.",
    seniorOptimizesFor: "Senior engineers optimize for correctness under edge cases, predictable growth, memory locality, observability, maintainability, and graceful behavior at scale.",
    pairsBestWith: spec.pairsBestWith,
    whenNotToUse: spec.whenNotToUse,
    productionUse: spec.productionUse,
    databaseRelevance: spec.databaseRelevance,
    faangScaleUse: spec.faangScaleUse,
    systemsConnections,
    distributedImplications: spec.distributedImplications,
    languages: code(spec),
  };
}

const sortBase = {
  prerequisites: ["Arrays", "Comparison operators", "Indexes", "Swapping", "Big-O"],
  databaseRelevance:
    "Sorting underlies ORDER BY, external merge sort, log compaction, search ranking, distributed shuffle phases, and index construction.",
  faangScaleUse:
    "Large systems sort feeds, logs, ads, search results, recommendations, traces, and analytics partitions, usually with external, parallel, or distributed variants.",
  pairsBestWith: ["Arrays", "Comparators", "Recursion", "Heaps", "External storage"],
};

const baseAlgorithmTopics: AlgorithmTopic[] = [
  topic({
    id: "alg-what-is-an-algorithm",
    title: "What Is an Algorithm?",
    family: "Foundations",
    summary: "A precise computational procedure that turns input data into a correct output.",
    problem: "Computers need exact steps for transforming, finding, comparing, ranking, grouping, or deciding over data.",
    whyExists: "Data structures store information; algorithms make information useful by operating on those structures.",
    history: "Early computer science formalized algorithms through Turing machines, computability, sorting/searching research, and analysis of growth rates.",
    dataStructures: ["Variables", "Arrays", "Sets", "Maps", "Queues", "Trees", "Graphs"],
    naiveApproach: "Write informal code that works for one example.",
    optimizedApproach: "Define input, output, invariant, data structure choice, termination, and cost model.",
    mechanics: [
      "Read input from memory.",
      "Maintain working state.",
      "Apply deterministic or probabilistic steps.",
      "Stop at a termination condition.",
      "Return output with known cost.",
    ],
    visualization: ["input -> state -> repeated rule -> termination -> output"],
    complexity: [
      { label: "Direct operation", value: "O(1)" },
      { label: "Scan", value: "O(n)" },
      { label: "Nested scan", value: "O(n^2)" },
      { label: "Extra memory", value: "varies" },
    ],
    memoryBehavior: "Algorithms allocate working state: counters, stacks, queues, hash tables, trees, matrices, buffers, or model weights.",
    scalability: "The growth rate matters more than syntax. A clear O(n log n) algorithm usually beats a clever O(n^2) implementation at scale.",
    tradeoffs: ["Correctness vs speed", "Time vs memory", "Simplicity vs specialization", "Local computation vs distributed coordination"],
    interviewerFocus: "Whether you can reason from problem constraints to a data structure and procedure instead of memorizing snippets.",
    engineeringThinking: "Algorithms are engineering tools for controlling work, memory, latency, throughput, and failure behavior.",
    pairsBestWith: ["Primitive values", "Data structures", "Memory models", "Complexity analysis"],
    whenNotToUse: "Do not over-engineer a simple one-off task with a complex algorithm unless scale, correctness, or constraints require it.",
    productionUse: "Validation, rendering, ranking, routing, compression, encryption, indexing, scheduling, caching, retries, and model training.",
    databaseRelevance: "Database engines are algorithm collections: parsing, planning, indexing, joining, sorting, locking, caching, and replication.",
    faangScaleUse: "Large platforms compose thousands of algorithms across feeds, ads, storage, inference, search, observability, and infrastructure automation.",
    java: `static boolean hasDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int n : nums) if (!seen.add(n)) return true;
    return false;
}`,
  }),

  // Sorting algorithms
  topic({
    ...sortBase,
    id: "alg-bubble-sort",
    title: "Bubble Sort",
    family: "Sorting",
    summary: "Repeatedly swaps adjacent out-of-order values until the array is sorted.",
    problem: "Sort small arrays while teaching comparison, swapping, and loop invariants.",
    whyExists: "It is pedagogically useful because every operation is visible, even though it is rarely useful in production.",
    history: "Bubble sort appears in early programming education as a simple exchange sort, not as a serious industrial sorting algorithm.",
    dataStructures: ["Array"],
    naiveApproach: "Keep sweeping the full array even after the largest values are already placed.",
    optimizedApproach: "Stop early when a pass performs no swaps and shrink the unsorted boundary.",
    mechanics: ["Compare adjacent pair.", "Swap if left is greater than right.", "Largest value bubbles to the end.", "Repeat over the remaining unsorted prefix."],
    visualization: ["[5,1,4] -> swap 5/1 -> [1,5,4] -> swap 5/4 -> [1,4,5]"],
    complexity: [
      { label: "Best", value: "O(n)" },
      { label: "Average", value: "O(n^2)" },
      { label: "Worst", value: "O(n^2)" },
      { label: "Space", value: "O(1)" },
    ],
    memoryBehavior: "In-place and cache-local, but it performs too many comparisons and swaps.",
    scalability: "Does not scale beyond tiny inputs because quadratic comparisons dominate.",
    tradeoffs: ["Stable", "In-place", "Simple", "Very slow compared with insertion, merge, quick, or heap sort"],
    variants: ["Cocktail shaker sort", "Odd-even sort", "Early-exit bubble sort"],
    interviewQuestions: ["Why is bubble sort O(n^2)?", "Is bubble sort stable?", "When would bubble sort ever be acceptable?"],
    interviewerFocus: "Loop invariants, stability, in-place mutation, and recognizing an intentionally poor algorithm.",
    engineeringThinking: "Use it to learn mechanics, not to build production systems.",
    whenNotToUse: "Do not use for real sorting except tiny educational examples.",
    productionUse: "Almost none; useful mainly for teaching and detecting nearly sorted behavior concepts.",
    java: `static void bubbleSort(int[] a) {
    for (int pass = 0; pass < a.length - 1; pass++) {
        for (int i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;
            }
        }
    }
}`,
    optimizedJava: `static void bubbleSortOptimized(int[] a) {
    for (int end = a.length - 1; end > 0; end--) {
        boolean swapped = false;
        for (int i = 0; i < end; i++) {
            if (a[i] > a[i + 1]) {
                int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-selection-sort",
    title: "Selection Sort",
    family: "Sorting",
    summary: "Repeatedly selects the smallest remaining value and places it at the front.",
    problem: "Sort with minimal swaps when write operations are more expensive than comparisons.",
    whyExists: "It separates finding the next smallest item from placing it, making selection and swapping clear.",
    history: "Selection-style sorting is one of the oldest simple sorting methods and remains useful for explaining in-place selection.",
    dataStructures: ["Array"],
    naiveApproach: "Repeatedly build a new sorted output by scanning for the minimum.",
    optimizedApproach: "Keep the array in-place and swap the minimum into the current boundary.",
    mechanics: ["Fix a boundary index.", "Scan the suffix for the minimum.", "Swap the minimum into the boundary.", "Advance the boundary."],
    visualization: ["[4,2,7,1] -> select 1 -> [1,2,7,4] -> select 2 -> [1,2,7,4]"],
    complexity: [
      { label: "Best", value: "O(n^2)" },
      { label: "Average", value: "O(n^2)" },
      { label: "Worst", value: "O(n^2)" },
      { label: "Space", value: "O(1)" },
    ],
    memoryBehavior: "In-place and low allocation; performs few swaps but many comparisons.",
    scalability: "Quadratic comparisons make it unsuitable for large datasets.",
    tradeoffs: ["In-place", "Few swaps", "Usually unstable", "Not adaptive to nearly sorted input"],
    variants: ["Stable selection sort", "Bidirectional selection sort", "Heap sort generalizes repeated selection efficiently"],
    interviewQuestions: ["How is selection sort different from insertion sort?", "Why is it not stable by default?"],
    interviewerFocus: "Understanding scan boundaries and the difference between comparisons and writes.",
    engineeringThinking: "Useful when writes are costly, but still dominated by better algorithms for large n.",
    whenNotToUse: "Avoid for normal application sorting or large inputs.",
    productionUse: "Rare; sometimes useful in constrained systems with tiny arrays and expensive writes.",
    java: `static void selectionSort(int[] a) {
    for (int i = 0; i < a.length - 1; i++) {
        int min = i;
        for (int j = i + 1; j < a.length; j++) {
            if (a[j] < a[min]) min = j;
        }
        int t = a[i]; a[i] = a[min]; a[min] = t;
    }
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-insertion-sort",
    title: "Insertion Sort",
    family: "Sorting",
    summary: "Builds a sorted prefix by inserting each new value into its correct position.",
    problem: "Sort small or nearly sorted arrays efficiently with low overhead.",
    whyExists: "It exploits existing order and has excellent constant factors for tiny partitions.",
    history: "Insertion sort mirrors hand-sorting cards and is used inside hybrid production sorts for small runs.",
    dataStructures: ["Array", "Sorted prefix"],
    naiveApproach: "For every value, repeatedly swap backward until order is restored.",
    optimizedApproach: "Store the value once, shift larger values right, and write the value into the gap.",
    mechanics: ["Treat index 0 as sorted.", "Take next value.", "Shift larger sorted-prefix values right.", "Insert value into the open slot."],
    visualization: ["sorted | unsorted", "[2,5 | 3,1] -> insert 3 -> [2,3,5 | 1]"],
    complexity: [
      { label: "Best", value: "O(n)" },
      { label: "Average", value: "O(n^2)" },
      { label: "Worst", value: "O(n^2)" },
      { label: "Space", value: "O(1)" },
    ],
    memoryBehavior: "In-place, stable, cache-friendly, and allocation-free.",
    scalability: "Scales poorly for random large arrays but very well for tiny or nearly sorted runs.",
    tradeoffs: ["Stable", "In-place", "Adaptive", "Quadratic on random/reversed large inputs"],
    variants: ["Binary insertion sort", "Shell sort", "Used in TimSort and introsort cutoffs"],
    interviewQuestions: ["Why is insertion sort fast on nearly sorted data?", "Is it stable?", "Why do production sorts use it for small partitions?"],
    interviewerFocus: "Adaptive behavior, sorted-prefix invariant, and constant-factor reasoning.",
    engineeringThinking: "Sometimes the best engineering choice is a simple algorithm on the right input size.",
    whenNotToUse: "Avoid as the main sort for large random data.",
    productionUse: "Hybrid sorting implementations use insertion sort for small partitions or naturally ordered runs.",
    java: `static void insertionSort(int[] a) {
    for (int i = 1; i < a.length; i++) {
        int value = a[i], j = i - 1;
        while (j >= 0 && a[j] > value) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = value;
    }
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-merge-sort",
    title: "Merge Sort",
    family: "Sorting",
    summary: "Divide-and-conquer sorting by recursively sorting halves and merging sorted runs.",
    problem: "Sort data predictably in O(n log n), especially when stability or external sorting matters.",
    whyExists: "It converts a hard global ordering problem into smaller sorted runs that can be merged linearly.",
    history: "Merge sort dates to von Neumann-era computing and remains central to external sorting and distributed data processing.",
    dataStructures: ["Array", "Temporary buffer", "Recursion stack"],
    naiveApproach: "Repeatedly scan for the next smallest output value from unsorted input.",
    optimizedApproach: "Split into halves, sort each half, then merge two sorted sequences with two pointers.",
    mechanics: ["Split array into halves.", "Recursively sort left and right.", "Compare heads of both sorted halves.", "Copy the smaller value into a buffer.", "Copy merged output back."],
    visualization: ["[8,3,5,1] -> [8,3] [5,1] -> [3,8] [1,5] -> [1,3,5,8]"],
    complexity: [
      { label: "Best", value: "O(n log n)" },
      { label: "Average", value: "O(n log n)" },
      { label: "Worst", value: "O(n log n)" },
      { label: "Space", value: "O(n)" },
    ],
    memoryBehavior: "Sequential merging is cache-friendly, but the extra buffer costs O(n) memory.",
    scalability: "Excellent for external and distributed sorting because sorted partitions can be merged independently.",
    tradeoffs: ["Stable", "Predictable worst case", "Parallelizable", "Needs extra memory"],
    variants: ["Bottom-up merge sort", "Natural merge sort", "External merge sort", "TimSort"],
    interviewQuestions: ["Implement merge sort.", "Why is merge sort stable?", "Why is merge sort good for linked lists or external data?"],
    interviewerFocus: "Divide and conquer, merging invariants, auxiliary memory, and recursion cost.",
    engineeringThinking: "Choose merge sort when predictable latency, stability, or distributed merging matters more than in-place memory savings.",
    whenNotToUse: "Avoid when O(n) extra memory is unacceptable and stability is not needed.",
    productionUse: "External sorting, distributed analytics, stable sorting, log processing, and merge phases in data systems.",
    distributedImplications: "MapReduce-style systems sort local partitions and merge shuffled sorted runs across machines.",
    java: `static void mergeSort(int[] a) {
    int[] tmp = new int[a.length];
    mergeSort(a, tmp, 0, a.length - 1);
}
static void mergeSort(int[] a, int[] tmp, int lo, int hi) {
    if (lo >= hi) return;
    int mid = lo + (hi - lo) / 2;
    mergeSort(a, tmp, lo, mid);
    mergeSort(a, tmp, mid + 1, hi);
    merge(a, tmp, lo, mid, hi);
}
static void merge(int[] a, int[] tmp, int lo, int mid, int hi) {
    int i = lo, j = mid + 1, k = lo;
    while (i <= mid && j <= hi) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= hi) tmp[k++] = a[j++];
    for (i = lo; i <= hi; i++) a[i] = tmp[i];
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-quicksort",
    title: "QuickSort",
    family: "Sorting",
    summary: "Partitions values around a pivot, then recursively sorts each side.",
    problem: "Sort arrays quickly in practice with low extra memory.",
    whyExists: "It avoids merge sort's O(n) buffer while usually achieving O(n log n) time with excellent cache locality.",
    history: "Tony Hoare introduced QuickSort in 1960; it became a classic because its average-case performance is extremely strong.",
    dataStructures: ["Array", "Pivot", "Recursion stack"],
    naiveApproach: "Always choose a bad pivot such as the first element on already sorted data.",
    optimizedApproach: "Use randomized or median-style pivots and switch to insertion sort for tiny partitions.",
    mechanics: ["Choose pivot.", "Move smaller values left and larger values right.", "Place pivot in final position.", "Recursively sort left and right partitions."],
    visualization: ["[9,2,7,1], pivot 7 -> [2,1] 7 [9] -> sort partitions"],
    complexity: [
      { label: "Best", value: "O(n log n)" },
      { label: "Average", value: "O(n log n)" },
      { label: "Worst", value: "O(n^2)" },
      { label: "Space", value: "O(log n) avg" },
    ],
    memoryBehavior: "In-place partitioning is cache-efficient and allocation-light; recursion consumes stack frames.",
    scalability: "Fast for in-memory arrays; worst-case pivots must be controlled in production.",
    tradeoffs: ["Very fast in practice", "In-place", "Usually unstable", "Worst case can be quadratic"],
    variants: ["Randomized QuickSort", "Three-way partitioning", "Introsort", "Dual-pivot QuickSort"],
    interviewQuestions: ["Implement partition.", "Why can QuickSort be O(n^2)?", "Why is it fast in practice?"],
    interviewerFocus: "Partition invariants, recursion, pivot strategy, and practical performance reasoning.",
    engineeringThinking: "Balance average speed with safeguards against adversarial or already ordered input.",
    whenNotToUse: "Avoid when stability or guaranteed worst-case O(n log n) is mandatory unless using introsort safeguards.",
    productionUse: "In-memory sorting libraries and ranking pipelines when data fits in RAM.",
    java: `static void quickSort(int[] a, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    quickSort(a, lo, p - 1);
    quickSort(a, p + 1, hi);
}
static int partition(int[] a, int lo, int hi) {
    int pivot = a[hi], i = lo;
    for (int j = lo; j < hi; j++) {
        if (a[j] <= pivot) {
            int t = a[i]; a[i] = a[j]; a[j] = t; i++;
        }
    }
    int t = a[i]; a[i] = a[hi]; a[hi] = t;
    return i;
}`,
    optimizedJava: `static void quickSortOptimized(int[] a, int lo, int hi) {
    while (lo < hi) {
        int p = partition(a, lo, hi);
        if (p - lo < hi - p) {
            quickSortOptimized(a, lo, p - 1);
            lo = p + 1;
        } else {
            quickSortOptimized(a, p + 1, hi);
            hi = p - 1;
        }
    }
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-heap-sort",
    title: "Heap Sort",
    family: "Sorting",
    summary: "Builds a heap, then repeatedly extracts the maximum into its final sorted position.",
    problem: "Sort in-place with guaranteed O(n log n) worst-case time.",
    whyExists: "It combines priority queue selection with in-place array storage.",
    history: "Heap sort follows Williams and Floyd's heap work from the 1960s and is central to priority queue theory.",
    dataStructures: ["Binary heap", "Array"],
    naiveApproach: "Repeatedly scan for the largest remaining value.",
    optimizedApproach: "Heapify once, then use O(log n) sift-down after each extraction.",
    mechanics: ["Build max heap.", "Swap root with end.", "Shrink heap boundary.", "Sift new root down.", "Repeat."],
    visualization: ["array as heap -> max at root -> swap to end -> restore heap"],
    complexity: [
      { label: "Build heap", value: "O(n)" },
      { label: "Sort", value: "O(n log n)" },
      { label: "Worst", value: "O(n log n)" },
      { label: "Space", value: "O(1)" },
    ],
    memoryBehavior: "In-place but less cache-friendly than QuickSort due to heap jumps across the array.",
    scalability: "Predictable worst-case and low memory; often slower in practice than QuickSort because of cache behavior.",
    tradeoffs: ["In-place", "Guaranteed worst case", "Unstable", "Poorer locality than QuickSort"],
    variants: ["Min-heap selection", "PriorityQueue top-k", "Smoothsort"],
    interviewQuestions: ["How is a heap stored in an array?", "Why is heapify O(n)?", "Is heap sort stable?"],
    interviewerFocus: "Tree-to-array indexing, heap invariant, and selection under constraints.",
    engineeringThinking: "Useful when memory and worst-case guarantees matter.",
    whenNotToUse: "Avoid when stable ordering or cache-maximized performance is more important.",
    productionUse: "Priority scheduling, top-k, bounded memory ranking, and systems requiring predictable memory.",
    java: `static void heapSort(int[] a) {
    for (int i = a.length / 2 - 1; i >= 0; i--) siftDown(a, i, a.length);
    for (int end = a.length - 1; end > 0; end--) {
        int t = a[0]; a[0] = a[end]; a[end] = t;
        siftDown(a, 0, end);
    }
}
static void siftDown(int[] a, int i, int n) {
    while (true) {
        int left = 2 * i + 1, right = left + 1, largest = i;
        if (left < n && a[left] > a[largest]) largest = left;
        if (right < n && a[right] > a[largest]) largest = right;
        if (largest == i) return;
        int t = a[i]; a[i] = a[largest]; a[largest] = t;
        i = largest;
    }
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-counting-sort",
    title: "Counting Sort",
    family: "Sorting",
    summary: "Sorts integers by counting how many times each key occurs.",
    problem: "Sort bounded integer keys faster than comparison sorting.",
    whyExists: "Comparison sorts have an O(n log n) lower bound; counting sort avoids comparisons when key range is small.",
    history: "Counting techniques are foundational in non-comparison sorting and histogram-based data processing.",
    dataStructures: ["Array", "Frequency table", "Prefix sums"],
    naiveApproach: "Use comparison sorting even when keys are small bounded integers.",
    optimizedApproach: "Count frequencies, prefix-sum counts, and place values by key.",
    mechanics: ["Find key range.", "Count occurrences.", "Convert counts to positions.", "Write output in key order."],
    visualization: ["values -> counts[ key ] -> prefix positions -> sorted output"],
    complexity: [
      { label: "Time", value: "O(n + k)" },
      { label: "Space", value: "O(k)" },
      { label: "Stable version", value: "O(n + k)" },
      { label: "Comparison lower bound", value: "bypassed" },
    ],
    memoryBehavior: "Allocates a count array proportional to key range k, not just input size n.",
    scalability: "Excellent when k is small; terrible when key range is huge or sparse.",
    tradeoffs: ["Linear time for bounded keys", "Can be stable", "Range-dependent memory", "Only works for discrete keys"],
    variants: ["Stable counting sort", "Counting histograms", "Radix sort digit pass"],
    interviewQuestions: ["Why can counting sort beat O(n log n)?", "When does it fail?", "How do prefix sums make it stable?"],
    interviewerFocus: "Recognizing non-comparison sorting and range-memory tradeoffs.",
    engineeringThinking: "Exploit domain constraints instead of blindly using general-purpose sorting.",
    whenNotToUse: "Avoid for wide, sparse, floating-point, or arbitrary comparable keys.",
    productionUse: "Histograms, bucketed metrics, small integer IDs, image processing, radix sort internals.",
    java: `static int[] countingSort(int[] a, int max) {
    int[] count = new int[max + 1];
    for (int v : a) count[v]++;
    int[] out = new int[a.length];
    int k = 0;
    for (int value = 0; value < count.length; value++) {
        while (count[value]-- > 0) out[k++] = value;
    }
    return out;
}`,
  }),
  topic({
    ...sortBase,
    id: "alg-radix-sort",
    title: "Radix Sort",
    family: "Sorting",
    summary: "Sorts numbers or strings by processing digits or characters from least to most significant.",
    problem: "Sort fixed-width keys in linear time relative to digits and input size.",
    whyExists: "It uses repeated stable counting/bucket passes to avoid full key comparisons.",
    history: "Radix sorting predates electronic computers in card sorting machines and remains relevant for fixed-width keys.",
    dataStructures: ["Array", "Buckets", "Counting sort", "Digit extraction"],
    naiveApproach: "Compare whole numbers or strings directly with comparison sort.",
    optimizedApproach: "Use stable counting sort per digit, preserving previous digit ordering.",
    mechanics: ["Choose radix/base.", "Process least significant digit.", "Stable-sort by current digit.", "Move to next digit.", "Stop after most significant digit."],
    visualization: ["170,45,75 -> ones pass -> tens pass -> hundreds pass -> sorted"],
    complexity: [
      { label: "Time", value: "O(d(n + b))" },
      { label: "Space", value: "O(n + b)" },
      { label: "Digits", value: "d" },
      { label: "Base", value: "b" },
    ],
    memoryBehavior: "Needs output buffers and bucket/count arrays; sequential passes are cache-friendly.",
    scalability: "Good for fixed-width integers, IDs, and strings; less useful for arbitrary objects with expensive key extraction.",
    tradeoffs: ["Linear for fixed-width keys", "Stable if digit pass is stable", "Needs extra memory", "Key-format dependent"],
    variants: ["LSD radix sort", "MSD radix sort", "American flag sort"],
    interviewQuestions: ["Why must digit passes be stable?", "How does radix sort use counting sort?", "When does radix sort beat QuickSort?"],
    interviewerFocus: "Non-comparison sorting, stability, and key representation.",
    engineeringThinking: "Use representation-level structure in primitive values to avoid generic comparison cost.",
    whenNotToUse: "Avoid when keys are variable, unbounded, or expensive to decompose.",
    productionUse: "Sorting integer IDs, fixed-length strings, IP-like values, and high-volume numeric keys.",
    java: `static void radixSort(int[] a) {
    int max = 0;
    for (int v : a) max = Math.max(max, v);
    for (int exp = 1; max / exp > 0; exp *= 10) countingPass(a, exp);
}
static void countingPass(int[] a, int exp) {
    int[] count = new int[10], out = new int[a.length];
    for (int v : a) count[(v / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = a.length - 1; i >= 0; i--) {
        int digit = (a[i] / exp) % 10;
        out[--count[digit]] = a[i];
    }
    System.arraycopy(out, 0, a, 0, a.length);
}`,
  }),

  // Searching and traversal
  topic({
    id: "alg-linear-search",
    title: "Linear Search",
    family: "Searching",
    summary: "Checks each value sequentially until the target is found or the input ends.",
    problem: "Find a value in unsorted data.",
    whyExists: "Without ordering, hashing, or indexing, every item may be the target.",
    history: "Linear scan is the baseline search model used since the earliest sequential memory and tape processing.",
    dataStructures: ["Array", "List", "Iterator"],
    prerequisites: ["Arrays", "Loops", "Equality"],
    naiveApproach: "Scan everything even after finding a match.",
    optimizedApproach: "Stop immediately on the first match.",
    mechanics: ["Start at index 0.", "Compare current value to target.", "Return index if equal.", "Advance one position.", "Return -1 if exhausted."],
    visualization: ["target 7: [2] no -> [4] no -> [7] yes"],
    complexity: [
      { label: "Best", value: "O(1)" },
      { label: "Average", value: "O(n)" },
      { label: "Worst", value: "O(n)" },
      { label: "Space", value: "O(1)" },
    ],
    memoryBehavior: "Sequential and cache-friendly; no extra structures.",
    scalability: "Acceptable once; bad for repeated lookup over large data.",
    tradeoffs: ["Works on any order", "No preprocessing", "Poor repeated lookup", "Cannot skip candidates"],
    variants: ["Sentinel search", "Predicate search", "Vectorized scan"],
    interviewQuestions: ["When is O(n) search optimal?", "How would you improve repeated lookup?"],
    interviewerFocus: "Recognizing the baseline and knowing when to build an index or hash set.",
    engineeringThinking: "Start simple, then index only when repeated access justifies memory.",
    pairsBestWith: ["Arrays", "Lists", "Streams"],
    whenNotToUse: "Do not repeatedly scan large collections when a set, map, sorted index, or database index is available.",
    productionUse: "Filtering, validation, one-time scans, parsing, and small in-memory lists.",
    databaseRelevance: "A full table scan is database linear search; indexes exist to avoid it.",
    faangScaleUse: "Large systems avoid repeated scans by indexing, caching, batching, and precomputing lookups.",
    java: `static int linearSearch(int[] a, int target) {
    for (int i = 0; i < a.length; i++) {
        if (a[i] == target) return i;
    }
    return -1;
}`,
  }),
  topic({
    id: "alg-binary-search",
    title: "Binary Search",
    family: "Searching",
    summary: "Halves a sorted indexed search space after each comparison.",
    problem: "Find a target or boundary in sorted data.",
    whyExists: "Sorted order lets one comparison eliminate half the candidates.",
    history: "Binary search is a classic logarithmic algorithm and a foundation for index lookup and boundary search.",
    dataStructures: ["Sorted array", "Index boundaries"],
    prerequisites: ["Sorted arrays", "Indexes", "Comparison"],
    naiveApproach: "Scan sorted data linearly.",
    optimizedApproach: "Track left/right bounds and repeatedly compare the middle value.",
    mechanics: ["Set left and right.", "Compute midpoint.", "Compare target with middle.", "Discard impossible half.", "Repeat until found or empty."],
    visualization: ["[1 3 5 7 9] target 9 -> mid 5 -> right half -> mid 9"],
    complexity: [
      { label: "Best", value: "O(1)" },
      { label: "Worst", value: "O(log n)" },
      { label: "Iterative space", value: "O(1)" },
      { label: "Recursive space", value: "O(log n)" },
    ],
    memoryBehavior: "Only primitive boundary variables in iterative form.",
    scalability: "One billion elements need about 30 comparisons if random access is O(1).",
    tradeoffs: ["Very fast lookup", "Requires sorted random-access data", "Boundary bugs common", "Sorting cost may dominate one-off use"],
    variants: ["First occurrence", "Last occurrence", "Lower bound", "Upper bound", "Binary search on answer"],
    interviewQuestions: ["Find first true in a monotonic predicate.", "Find insert position.", "Search rotated sorted array."],
    interviewerFocus: "Boundary discipline and using monotonic structure.",
    engineeringThinking: "Search not only values but also feasible answer spaces.",
    pairsBestWith: ["Sorted arrays", "B-trees", "Monotonic predicates"],
    whenNotToUse: "Avoid on linked lists or unsorted data.",
    productionUse: "Version lookup, sorted logs, pagination boundaries, index probing, and capacity threshold search.",
    databaseRelevance: "B-tree pages use binary-like ordered search inside nodes.",
    faangScaleUse: "Used in ranking boundaries, shard metadata, sorted time-series, and search/index internals.",
    java: `static int binarySearch(int[] a, int target) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == target) return mid;
        if (target < a[mid]) hi = mid - 1;
        else lo = mid + 1;
    }
    return -1;
}`,
  }),
  topic({
    id: "alg-bfs",
    title: "Breadth First Search (BFS)",
    family: "Traversal",
    summary: "Explores nodes in layers using a queue.",
    problem: "Visit reachable nodes by increasing unweighted distance.",
    whyExists: "Some problems require nearest-first exploration, such as shortest unweighted paths and level-order traversal.",
    history: "BFS is a core graph traversal formalized in graph theory and used widely in AI search, networks, and routing.",
    dataStructures: ["Queue", "Set", "Adjacency list"],
    prerequisites: ["Graphs", "Queues", "Sets"],
    naiveApproach: "Recursively wander through neighbors without level order or visited tracking.",
    optimizedApproach: "Use a queue for frontier order and mark nodes visited when enqueued.",
    mechanics: ["Enqueue start.", "Mark visited.", "Dequeue front.", "Enqueue unvisited neighbors.", "Repeat until queue empty."],
    visualization: ["A -> enqueue B,C -> visit B,C before D,E"],
    complexity: [
      { label: "Time", value: "O(V + E)" },
      { label: "Visited", value: "O(V)" },
      { label: "Queue", value: "O(V)" },
      { label: "Shortest path", value: "unweighted" },
    ],
    memoryBehavior: "Can hold an entire frontier layer; wide graphs consume large queues.",
    scalability: "Large BFS needs frontier partitioning, deduplication, and often distributed processing.",
    tradeoffs: ["Shortest unweighted paths", "Memory-heavy", "Cycle-safe with visited set", "Not for weighted shortest paths"],
    variants: ["Bidirectional BFS", "Multi-source BFS", "0-1 BFS"],
    interviewQuestions: ["Shortest path in a grid.", "Level-order tree traversal.", "Word ladder."],
    interviewerFocus: "Queue discipline, visited timing, and shortest-path reasoning.",
    engineeringThinking: "Use BFS when level order or minimum edge count is the invariant.",
    pairsBestWith: ["Queue", "HashSet", "Adjacency list", "Grid"],
    whenNotToUse: "Avoid for weighted paths; use Dijkstra or A*.",
    productionUse: "Dependency expansion, permissions, social distance, crawling, routing candidates.",
    databaseRelevance: "Graph databases and recommendation systems use BFS-like traversals over relationship edges.",
    faangScaleUse: "Social networks, knowledge graphs, crawler frontiers, and abuse-detection graph expansion.",
    distributedImplications: "Distributed BFS must coordinate frontier ownership and duplicate suppression across machines.",
    java: `static Set<String> bfs(Map<String, List<String>> g, String start) {
    Set<String> seen = new HashSet<>();
    Queue<String> q = new ArrayDeque<>();
    seen.add(start); q.add(start);
    while (!q.isEmpty()) {
        String node = q.remove();
        for (String next : g.getOrDefault(node, List.of())) {
            if (seen.add(next)) q.add(next);
        }
    }
    return seen;
}`,
  }),
  topic({
    id: "alg-dfs",
    title: "Depth First Search (DFS)",
    family: "Traversal",
    summary: "Explores one path deeply before backtracking.",
    problem: "Traverse trees/graphs, detect cycles, enumerate paths, or process nested structures.",
    whyExists: "Many structures are recursive; DFS mirrors recursive descent and backtracking.",
    history: "DFS is fundamental in graph theory, compilers, search, topological ordering, and connectivity analysis.",
    dataStructures: ["Stack", "Set", "Adjacency list", "Recursion stack"],
    prerequisites: ["Graphs", "Stacks", "Recursion"],
    naiveApproach: "Recurse without visited tracking on cyclic graphs.",
    optimizedApproach: "Track visited nodes and choose recursive or explicit stack based on depth constraints.",
    mechanics: ["Visit node.", "Mark visited.", "Choose a neighbor.", "Recurse or push deeper.", "Backtrack when no unvisited neighbors remain."],
    visualization: ["A -> B -> D -> backtrack -> C"],
    complexity: [
      { label: "Time", value: "O(V + E)" },
      { label: "Visited", value: "O(V)" },
      { label: "Stack", value: "O(h) to O(V)" },
      { label: "Paths", value: "can be exponential" },
    ],
    memoryBehavior: "Recursive DFS consumes call stack; iterative DFS uses explicit stack memory.",
    scalability: "Deep graphs can overflow recursion; production systems often use iterative stacks or depth limits.",
    tradeoffs: ["Memory-light on narrow graphs", "Natural recursion", "Does not guarantee shortest path", "Can go too deep"],
    variants: ["Recursive DFS", "Iterative DFS", "Depth-limited search", "Backtracking DFS"],
    interviewQuestions: ["Detect graph cycle.", "Number of islands.", "Clone graph.", "Topological sort."],
    interviewerFocus: "Visited state, recursion/backtracking, and cycle handling.",
    engineeringThinking: "Use DFS when structure is nested, path-oriented, or dependency-oriented.",
    pairsBestWith: ["Stack", "Recursion", "HashSet", "Adjacency list"],
    whenNotToUse: "Avoid for shortest unweighted path; BFS is correct there.",
    productionUse: "Compilers, parsers, dependency graphs, filesystem walks, tree processing.",
    databaseRelevance: "Graph query engines and recursive CTEs perform DFS-like expansions for path queries.",
    faangScaleUse: "Dependency analysis, service graph inspection, static analysis, graph validation.",
    java: `static void dfs(Map<String, List<String>> g, String node, Set<String> seen) {
    if (!seen.add(node)) return;
    for (String next : g.getOrDefault(node, List.of())) {
        dfs(g, next, seen);
    }
}`,
    optimizedJava: `static Set<String> dfsIterative(Map<String, List<String>> g, String start) {
    Set<String> seen = new HashSet<>();
    Deque<String> stack = new ArrayDeque<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        String node = stack.pop();
        if (!seen.add(node)) continue;
        for (String next : g.getOrDefault(node, List.of())) stack.push(next);
    }
    return seen;
}`,
  }),

  // Graph algorithms
  topic({
    id: "alg-dijkstra",
    title: "Dijkstra",
    family: "Graphs",
    summary: "Finds shortest paths from a source when all edge weights are non-negative.",
    problem: "Compute minimum-cost routes in weighted graphs.",
    whyExists: "BFS only handles equal edge costs; Dijkstra expands the currently cheapest known path next.",
    history: "Edsger Dijkstra published the algorithm in 1959; it became foundational for routing and optimization.",
    dataStructures: ["Graph", "PriorityQueue", "Distance map", "Visited set"],
    naiveApproach: "Repeatedly scan all unvisited nodes to find the smallest tentative distance.",
    optimizedApproach: "Use a min-priority queue to retrieve the cheapest frontier node.",
    mechanics: ["Set source distance to 0.", "Push source into min-heap.", "Pop cheapest node.", "Relax outgoing edges.", "Update distances and heap entries."],
    visualization: ["source -> cheapest frontier -> relax neighbors -> repeat"],
    complexity: [
      { label: "Heap time", value: "O((V+E) log V)" },
      { label: "Array time", value: "O(V^2)" },
      { label: "Space", value: "O(V + E)" },
      { label: "Weights", value: "non-negative" },
    ],
    memoryBehavior: "Stores graph, distances, and heap frontier.",
    scalability: "Scales well for sparse graphs; huge road/social graphs need partitioning and heuristics.",
    tradeoffs: ["Optimal with non-negative weights", "Not valid for negative weights", "Heap overhead", "Can stop early for one target"],
    variants: ["Bidirectional Dijkstra", "A*", "Dial's algorithm", "Contraction hierarchies"],
    interviewQuestions: ["Network delay time.", "Cheapest path with constraints.", "Why not negative weights?"],
    interviewerFocus: "Relaxation, priority queues, and correctness assumptions.",
    engineeringThinking: "Match graph weights and constraints to the pathfinding algorithm.",
    pairsBestWith: ["PriorityQueue", "Adjacency list", "HashMap"],
    whenNotToUse: "Do not use with negative edges; use Bellman-Ford.",
    productionUse: "Routing, scheduling, dependency costs, recommendation path costs.",
    databaseRelevance: "Graph databases and search systems use weighted shortest-path variants.",
    faangScaleUse: "Maps, logistics, network routing, ads/recommendation graph scoring.",
    java: `record Edge(String to, int weight) {}
static Map<String, Integer> dijkstra(Map<String, List<Edge>> g, String src) {
    Map<String, Integer> dist = new HashMap<>();
    PriorityQueue<String> pq = new PriorityQueue<>(Comparator.comparingInt(n -> dist.get(n)));
    dist.put(src, 0); pq.add(src);
    while (!pq.isEmpty()) {
        String node = pq.poll();
        for (Edge e : g.getOrDefault(node, List.of())) {
            int nd = dist.get(node) + e.weight();
            if (nd < dist.getOrDefault(e.to(), Integer.MAX_VALUE)) {
                dist.put(e.to(), nd); pq.add(e.to());
            }
        }
    }
    return dist;
}`,
  }),
  topic({
    id: "alg-bellman-ford",
    title: "Bellman-Ford",
    family: "Graphs",
    summary: "Finds shortest paths even with negative edges and detects negative cycles.",
    problem: "Compute shortest paths when edge weights may be negative.",
    whyExists: "Dijkstra fails with negative weights; Bellman-Ford repeatedly relaxes all edges to handle them safely.",
    history: "Based on dynamic programming formulations by Bellman and Ford in the 1950s.",
    dataStructures: ["Edge list", "Distance array"],
    naiveApproach: "Try Dijkstra and get incorrect results with negative edges.",
    optimizedApproach: "Relax every edge V-1 times and run one extra pass to detect negative cycles.",
    mechanics: ["Initialize source.", "Repeat V-1 times.", "For each edge, relax destination.", "Extra pass finds negative cycle if relaxation still possible."],
    visualization: ["distances improve by paths of length 1, then 2, up to V-1 edges"],
    complexity: [
      { label: "Time", value: "O(VE)" },
      { label: "Space", value: "O(V)" },
      { label: "Negative edges", value: "allowed" },
      { label: "Negative cycles", value: "detected" },
    ],
    memoryBehavior: "Compact memory: edge list plus distance table.",
    scalability: "Slower than Dijkstra; used when correctness under negative weights matters.",
    tradeoffs: ["Handles negative edges", "Detects negative cycles", "Slower", "Simple edge-list implementation"],
    variants: ["SPFA", "Distributed distance-vector routing", "Early-stop Bellman-Ford"],
    interviewQuestions: ["Detect negative cycle.", "Cheapest flights with k stops.", "Why V-1 passes?"],
    interviewerFocus: "Relaxation count, negative cycles, and dynamic programming over path length.",
    engineeringThinking: "Prefer slower algorithms when their correctness model matches the risk.",
    pairsBestWith: ["Edge list", "Distance array"],
    whenNotToUse: "Avoid when all weights are non-negative and performance matters; use Dijkstra.",
    productionUse: "Currency arbitrage detection, routing theory, constrained shortest paths.",
    databaseRelevance: "Graph analytics systems use Bellman-Ford variants for weighted path analysis.",
    faangScaleUse: "Used conceptually in network routing, fraud/arbitrage analysis, and graph analytics.",
    java: `record WEdge(int from, int to, int weight) {}
static int[] bellmanFord(List<WEdge> edges, int vertices, int source) {
    int[] dist = new int[vertices];
    Arrays.fill(dist, 1_000_000_000);
    dist[source] = 0;
    for (int i = 0; i < vertices - 1; i++) {
        for (WEdge e : edges) {
            if (dist[e.from()] + e.weight() < dist[e.to()]) {
                dist[e.to()] = dist[e.from()] + e.weight();
            }
        }
    }
    return dist;
}`,
  }),
  topic({
    id: "alg-floyd-warshall",
    title: "Floyd-Warshall",
    family: "Graphs",
    summary: "Computes shortest paths between every pair of nodes using dynamic programming.",
    problem: "Find all-pairs shortest paths in dense graphs.",
    whyExists: "Some systems need every source-to-target distance, not just one source.",
    history: "Floyd and Warshall popularized the dynamic programming method in the early 1960s.",
    dataStructures: ["Matrix", "Dynamic programming table"],
    naiveApproach: "Run Dijkstra or Bellman-Ford from every node.",
    optimizedApproach: "Use a distance matrix and progressively allow each node as an intermediate.",
    mechanics: ["Initialize distance matrix.", "For each intermediate k.", "For each i,j.", "Replace dist[i][j] if i->k->j is shorter."],
    visualization: ["allow intermediate nodes: none -> 0 -> 0,1 -> 0,1,2 ..."],
    complexity: [
      { label: "Time", value: "O(V^3)" },
      { label: "Space", value: "O(V^2)" },
      { label: "Graph", value: "dense/small" },
      { label: "Output", value: "all pairs" },
    ],
    memoryBehavior: "Matrix memory grows quadratically, limiting large sparse use.",
    scalability: "Good for small dense graphs; unsuitable for massive sparse graphs.",
    tradeoffs: ["Simple", "All-pairs result", "Handles negative edges without negative cycles", "Expensive O(V^3)"],
    variants: ["Path reconstruction", "Transitive closure", "Min-plus matrix multiplication variants"],
    interviewQuestions: ["All-pairs shortest path.", "Detect negative cycles.", "Transitive closure."],
    interviewerFocus: "Dynamic programming state and matrix update ordering.",
    engineeringThinking: "Compute full tables only when you will actually use many pair distances.",
    pairsBestWith: ["Adjacency matrix", "DP table"],
    whenNotToUse: "Avoid for large sparse graphs.",
    productionUse: "Small network analysis, game maps, routing tables for limited node sets.",
    databaseRelevance: "Graph engines may use matrix-style all-pairs methods for small dense subgraphs.",
    faangScaleUse: "Used on bounded internal graphs, precomputed distance matrices, and dense relationship analytics.",
    java: `static void floydWarshall(int[][] dist) {
    int n = dist.length;
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
  }),
  topic({
    id: "alg-a-star",
    title: "A*",
    family: "Graphs",
    summary: "Guided shortest-path search using actual cost plus a heuristic estimate.",
    problem: "Find a path faster than Dijkstra when a useful distance heuristic exists.",
    whyExists: "Dijkstra explores equally in all directions; A* prioritizes paths that appear closer to the goal.",
    history: "A* emerged from AI pathfinding research in the 1960s and remains central to games and navigation.",
    dataStructures: ["PriorityQueue", "Graph/grid", "Distance map", "Heuristic"],
    naiveApproach: "Use BFS or Dijkstra and explore many irrelevant nodes.",
    optimizedApproach: "Prioritize f(n)=g(n)+h(n), where g is known cost and h estimates remaining cost.",
    mechanics: ["Push start with f score.", "Pop lowest f.", "If goal, stop.", "Relax neighbors.", "Use heuristic to rank frontier."],
    visualization: ["start -> frontier biased toward goal -> shortest path if heuristic admissible"],
    complexity: [
      { label: "Worst", value: "exponential" },
      { label: "Good heuristic", value: "near optimal expansion" },
      { label: "Space", value: "O(V)" },
      { label: "Correctness", value: "admissible h" },
    ],
    memoryBehavior: "Stores open frontier, closed set, and path metadata.",
    scalability: "Heuristic quality determines scalability; poor heuristics collapse toward Dijkstra.",
    tradeoffs: ["Fast with good heuristics", "Optimal with admissible heuristic", "Heuristic design required", "Memory-heavy frontier"],
    variants: ["Weighted A*", "IDA*", "Jump Point Search", "Theta*"],
    interviewQuestions: ["A* vs Dijkstra.", "What makes a heuristic admissible?", "Grid pathfinding."],
    interviewerFocus: "Using domain knowledge to guide search without breaking correctness.",
    engineeringThinking: "Use approximations carefully: heuristics improve performance but must preserve required guarantees.",
    pairsBestWith: ["PriorityQueue", "Grid", "Heuristic function"],
    whenNotToUse: "Avoid when no meaningful heuristic exists.",
    productionUse: "Games, maps, robotics, route planning, spatial search.",
    databaseRelevance: "Search systems use heuristic scoring to prioritize candidate expansion.",
    faangScaleUse: "Maps, delivery, robotics, game platforms, and route optimization use A*-style guided search.",
    java: `// Sketch: same structure as Dijkstra, but priority is gScore + heuristic.
record Node(int id, int fScore) {}
PriorityQueue<Node> open = new PriorityQueue<>(Comparator.comparingInt(Node::fScore));`,
  }),
  topic({
    id: "alg-topological-sort",
    title: "Topological Sort",
    family: "Graphs",
    summary: "Orders DAG nodes so every dependency appears before dependents.",
    problem: "Resolve dependency order.",
    whyExists: "Builds, courses, migrations, and workflows require prerequisites before consumers.",
    history: "Topological ordering is fundamental in partial-order theory and dependency graph processing.",
    dataStructures: ["DAG", "Queue", "In-degree map", "Adjacency list"],
    naiveApproach: "Run tasks in arbitrary order and fail when prerequisites are missing.",
    optimizedApproach: "Use Kahn's algorithm or DFS ordering to respect dependency edges.",
    mechanics: ["Count in-degrees.", "Enqueue nodes with zero in-degree.", "Remove node.", "Decrease neighbors.", "Detect cycle if output incomplete."],
    visualization: ["A -> B, A -> C: queue A -> output A -> B,C become available"],
    complexity: [
      { label: "Time", value: "O(V + E)" },
      { label: "Space", value: "O(V + E)" },
      { label: "Input", value: "DAG" },
      { label: "Cycle", value: "invalid" },
    ],
    memoryBehavior: "Stores adjacency and in-degree counts.",
    scalability: "Works well for large sparse DAGs; distributed execution adds scheduling and failure concerns.",
    tradeoffs: ["Detects cycles", "Enables scheduling", "Multiple valid orders", "Only valid for DAGs"],
    variants: ["DFS topological sort", "Kahn's algorithm", "Priority topological order"],
    interviewQuestions: ["Course schedule.", "Alien dictionary.", "Build order."],
    interviewerFocus: "Dependency modeling and cycle detection.",
    engineeringThinking: "Turn ordering requirements into graph constraints.",
    pairsBestWith: ["Queue", "HashMap", "Adjacency list"],
    whenNotToUse: "Do not use when cycles are valid; use graph cycle handling instead.",
    productionUse: "Build systems, package managers, workflow engines, migration runners.",
    databaseRelevance: "Schema migration tools and query planners resolve dependency orders.",
    faangScaleUse: "Monorepo builds, CI pipelines, DAG schedulers, ML workflows, and data pipelines.",
    java: `static List<Integer> topo(int n, int[][] edges) {
    List<List<Integer>> g = new ArrayList<>();
    for (int i = 0; i < n; i++) g.add(new ArrayList<>());
    int[] indeg = new int[n];
    for (int[] e : edges) { g.get(e[0]).add(e[1]); indeg[e[1]]++; }
    Queue<Integer> q = new ArrayDeque<>();
    for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);
    List<Integer> out = new ArrayList<>();
    while (!q.isEmpty()) {
        int u = q.remove(); out.add(u);
        for (int v : g.get(u)) if (--indeg[v] == 0) q.add(v);
    }
    return out.size() == n ? out : List.of();
}`,
  }),
  topic({
    id: "alg-union-find",
    title: "Union Find",
    family: "Graphs",
    summary: "Tracks connected components with near-constant union and find operations.",
    problem: "Answer whether two items belong to the same connected group.",
    whyExists: "Many graph problems need connectivity, not full paths.",
    history: "Disjoint-set forests became classic through work on efficient equivalence relations and Kruskal MST.",
    dataStructures: ["Parent array", "Rank/size array"],
    naiveApproach: "Run BFS/DFS for every connectivity query.",
    optimizedApproach: "Maintain representatives with path compression and union by rank.",
    mechanics: ["Each node starts as its own parent.", "find follows parents to root.", "Path compression flattens chains.", "union attaches smaller tree to larger/root-rank tree."],
    visualization: ["1->2->3 compresses to 1->3 and 2->3"],
    complexity: [
      { label: "Find", value: "amortized near O(1)" },
      { label: "Union", value: "amortized near O(1)" },
      { label: "Space", value: "O(n)" },
      { label: "Formal", value: "O(alpha(n))" },
    ],
    memoryBehavior: "Dense primitive arrays are compact and cache-friendly.",
    scalability: "Excellent for millions of connectivity operations when elements can be mapped to integer IDs.",
    tradeoffs: ["Very fast connectivity", "No path details", "Static-ish universe", "Needs ID mapping"],
    variants: ["Weighted union", "Rollback union-find", "DSU on tree"],
    interviewQuestions: ["Number of connected components.", "Redundant connection.", "Kruskal MST."],
    interviewerFocus: "Separating connectivity from traversal and understanding amortized optimization.",
    engineeringThinking: "Track exactly the information needed; do not traverse when a representative is enough.",
    pairsBestWith: ["Arrays", "HashMap ID mapping", "Graphs"],
    whenNotToUse: "Avoid when you need actual shortest paths or full route reconstruction.",
    productionUse: "Clustering, deduplication, image segmentation, network connectivity, MST.",
    databaseRelevance: "Entity resolution and graph analytics use disjoint-set-style component tracking.",
    faangScaleUse: "Identity merging, connected-component analytics, spam rings, and graph clustering.",
    java: `class UnionFind {
    int[] parent, rank;
    UnionFind(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    void union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return;
        if (rank[ra] < rank[rb]) parent[ra] = rb;
        else if (rank[ra] > rank[rb]) parent[rb] = ra;
        else { parent[rb] = ra; rank[ra]++; }
    }
}`,
  }),

  // Compression
  topic({
    id: "alg-huffman",
    title: "Huffman Encoding",
    family: "Compression",
    summary: "Assigns shorter bit codes to frequent symbols using a prefix tree.",
    problem: "Compress data losslessly by exploiting symbol frequency.",
    whyExists: "Fixed-width encodings waste bits when some symbols appear much more often than others.",
    history: "David Huffman introduced the optimal prefix-code algorithm in 1952.",
    dataStructures: ["Frequency map", "PriorityQueue", "Binary tree", "Bit buffer"],
    naiveApproach: "Use fixed-width codes for all symbols.",
    optimizedApproach: "Build a tree by repeatedly combining least frequent symbols.",
    mechanics: ["Count symbols.", "Push leaves into min-heap.", "Merge two least frequent nodes.", "Assign 0/1 along tree edges.", "Encode symbols by paths."],
    visualization: ["frequencies -> heap -> tree -> symbol paths -> bitstream"],
    complexity: [
      { label: "Build", value: "O(k log k)" },
      { label: "Encode", value: "O(n)" },
      { label: "Space", value: "O(k)" },
      { label: "Symbols", value: "k" },
    ],
    memoryBehavior: "Stores frequency table, tree, code table, and packed output bits.",
    scalability: "Good for large streams when frequency distribution is skewed; static trees need header metadata.",
    tradeoffs: ["Lossless", "Optimal prefix code for known frequencies", "Bit-level complexity", "Poor if frequencies uniform"],
    variants: ["Canonical Huffman", "Adaptive Huffman", "Arithmetic coding"],
    interviewQuestions: ["Build Huffman tree.", "Why is it prefix-free?", "Decode a bitstream."],
    interviewerFocus: "Greedy algorithm reasoning and tree encoding.",
    engineeringThinking: "Use data statistics to reduce network and storage cost.",
    pairsBestWith: ["PriorityQueue", "Binary tree", "HashMap"],
    whenNotToUse: "Avoid for encrypted/random/uniform data with little redundancy.",
    productionUse: "Compression formats, codecs, network payload reduction.",
    databaseRelevance: "Columnar stores and search indexes compress postings and values to reduce I/O.",
    faangScaleUse: "Storage and network systems compress massive logs, media metadata, and index structures.",
    distributedImplications: "Compression reduces bandwidth and storage but costs CPU; distributed systems trade CPU for network efficiency.",
    java: `record HNode(char ch, int freq, HNode left, HNode right) {}
PriorityQueue<HNode> pq = new PriorityQueue<>(Comparator.comparingInt(HNode::freq));
// Count frequencies, add leaves, repeatedly merge two smallest nodes into a parent.`,
  }),
  topic({
    id: "alg-rle",
    title: "Run Length Encoding",
    family: "Compression",
    summary: "Replaces repeated runs with value plus count.",
    problem: "Compress data containing long repeated sequences.",
    whyExists: "Many simple datasets repeat the same value consecutively.",
    history: "RLE is one of the earliest lossless compression methods, used in bitmap and fax-like encodings.",
    dataStructures: ["String/array", "Output buffer", "Counter"],
    naiveApproach: "Store every repeated value explicitly.",
    optimizedApproach: "Track current value and run count, then emit compact pairs.",
    mechanics: ["Start first value.", "Count same consecutive values.", "Flush value/count when value changes.", "Repeat."],
    visualization: ["AAAABB -> A4 B2"],
    complexity: [
      { label: "Time", value: "O(n)" },
      { label: "Space", value: "O(r)" },
      { label: "Runs", value: "r" },
      { label: "Worst output", value: "can expand" },
    ],
    memoryBehavior: "Streaming-friendly with only current run state and output buffer.",
    scalability: "Excellent for repetitive streams; bad for high-entropy data.",
    tradeoffs: ["Simple", "Fast", "Streaming", "Can increase size when runs are short"],
    variants: ["Bitmap RLE", "PackBits", "Delta plus RLE"],
    interviewQuestions: ["Compress string.", "Decompress RLE.", "When can compression expand?"],
    interviewerFocus: "State tracking and boundary handling.",
    engineeringThinking: "Simple transforms can be valuable when data distribution matches.",
    pairsBestWith: ["Arrays", "Strings", "Counters"],
    whenNotToUse: "Avoid for random or highly varied data.",
    productionUse: "Bitmap masks, sparse flags, repeated telemetry values.",
    databaseRelevance: "Columnar databases use RLE for repeated sorted column values.",
    faangScaleUse: "Large analytics systems compress repeated dimensions and bitmap-like structures.",
    java: `static String rle(String s) {
    if (s.isEmpty()) return "";
    StringBuilder out = new StringBuilder();
    int count = 1;
    for (int i = 1; i <= s.length(); i++) {
        if (i < s.length() && s.charAt(i) == s.charAt(i - 1)) count++;
        else { out.append(s.charAt(i - 1)).append(count); count = 1; }
    }
    return out.toString();
}`,
  }),
  topic({
    id: "alg-lzw",
    title: "LZW",
    family: "Compression",
    summary: "Builds a dictionary of repeated sequences while reading the input.",
    problem: "Compress repeated substrings without a pre-shared frequency table.",
    whyExists: "Real data often repeats phrases or byte sequences, not just single symbols or adjacent runs.",
    history: "Lempel-Ziv-Welch evolved from LZ compression and was used in GIF and UNIX compress.",
    dataStructures: ["Dictionary map", "String buffer", "Code stream"],
    naiveApproach: "Emit every byte or character literally.",
    optimizedApproach: "Emit dictionary codes for previously seen sequences and add new sequences dynamically.",
    mechanics: ["Initialize dictionary.", "Extend current sequence while known.", "Emit code for longest known sequence.", "Add new sequence.", "Continue."],
    visualization: ["TOBE -> dictionary learns TO, OB, BE and later reuses codes"],
    complexity: [
      { label: "Time", value: "O(n) avg" },
      { label: "Dictionary", value: "O(k)" },
      { label: "Space", value: "O(k)" },
      { label: "Lookup", value: "hash map" },
    ],
    memoryBehavior: "Dictionary grows with observed sequences and may need reset/limits.",
    scalability: "Good for repeated patterns; dictionary size must be bounded for streams.",
    tradeoffs: ["Adaptive", "Lossless", "No prior frequencies", "Dictionary memory and patent/history concerns"],
    variants: ["LZ77", "LZ78", "DEFLATE", "Dictionary reset LZW"],
    interviewQuestions: ["How does dictionary compression work?", "Why does decompressor rebuild the same dictionary?"],
    interviewerFocus: "State synchronization between encoder and decoder.",
    engineeringThinking: "Compression can be a protocol: both sides must evolve state identically.",
    pairsBestWith: ["HashMap", "Byte streams", "Dictionaries"],
    whenNotToUse: "Avoid when low latency and tiny payloads make dictionary overhead too high.",
    productionUse: "Historical formats, stream compression ideas, dictionary-based encoders.",
    databaseRelevance: "Dictionary encoding is central in column stores and search indexes.",
    faangScaleUse: "Dictionary compression concepts appear in storage, analytics, and wire-format optimization.",
    java: `// Sketch: map repeated strings to integer codes.
Map<String, Integer> dict = new HashMap<>();
for (int i = 0; i < 256; i++) dict.put("" + (char) i, i);
// Read longest known sequence, emit its code, add sequence + next char.`,
  }),

  // Security
  topic({
    id: "alg-rsa",
    title: "RSA",
    family: "Security",
    summary: "Asymmetric cryptography based on modular arithmetic and factoring hardness.",
    problem: "Let parties communicate securely or verify signatures without sharing a secret key first.",
    whyExists: "Symmetric encryption needs a shared key; public-key cryptography solves key exchange and digital signatures.",
    history: "Rivest, Shamir, and Adleman published RSA in 1977 after public-key cryptography was introduced.",
    dataStructures: ["Big integers", "Public/private keys", "Modular exponentiation"],
    naiveApproach: "Send a symmetric key directly over the network.",
    optimizedApproach: "Use public/private key operations for key exchange or signatures, then symmetric encryption for bulk data.",
    mechanics: ["Generate large primes.", "Compute modulus n.", "Create public/private exponents.", "Encrypt/sign with modular exponentiation.", "Decrypt/verify with corresponding key."],
    visualization: ["public key locks data; private key unlocks it"],
    complexity: [
      { label: "Operation", value: "big-int modular exp" },
      { label: "Space", value: "key-size dependent" },
      { label: "Bulk data", value: "too slow" },
      { label: "Security", value: "key length" },
    ],
    memoryBehavior: "Uses large integer buffers and padding structures.",
    scalability: "Too expensive for high-volume payload encryption; used for signatures or key establishment.",
    tradeoffs: ["Solves key distribution", "Slow", "Requires padding", "Quantum-vulnerable in theory"],
    variants: ["RSA-OAEP", "RSA-PSS", "Hybrid TLS use"],
    interviewQuestions: ["Symmetric vs asymmetric encryption.", "Why not encrypt all HTTPS data with RSA?"],
    interviewerFocus: "Key exchange, trust, and correct abstraction of cryptography.",
    engineeringThinking: "Never implement raw cryptography in production; use vetted libraries and protocols.",
    pairsBestWith: ["AES", "TLS", "Certificates", "SecureRandom"],
    whenNotToUse: "Do not use raw RSA or RSA for bulk encryption.",
    productionUse: "Digital signatures, certificates, legacy key exchange.",
    databaseRelevance: "Security systems sign tokens, certificates, and deployment artifacts.",
    faangScaleUse: "Large platforms use public-key infrastructure for service identity, certificates, and artifact signing.",
    java: `KeyPairGenerator gen = KeyPairGenerator.getInstance("RSA");
gen.initialize(2048);
KeyPair pair = gen.generateKeyPair();`,
  }),
  topic({
    id: "alg-aes",
    title: "AES",
    family: "Security",
    summary: "Fast symmetric block cipher for encrypting data with a shared secret key.",
    problem: "Protect confidentiality of data at rest or in transit efficiently.",
    whyExists: "Bulk encryption needs speed and strong security once a shared key is established.",
    history: "AES was standardized by NIST in 2001 after the Rijndael cipher won the AES competition.",
    dataStructures: ["Byte arrays", "Secret key", "Initialization vector/nonce", "Blocks"],
    naiveApproach: "Use homemade XOR or ECB mode.",
    optimizedApproach: "Use AES-GCM or another authenticated mode through a vetted library.",
    mechanics: ["Generate key.", "Generate unique nonce/IV.", "Encrypt blocks/stream mode.", "Authenticate ciphertext.", "Decrypt only after verification."],
    visualization: ["plaintext + key + nonce -> ciphertext + auth tag"],
    complexity: [
      { label: "Time", value: "O(n)" },
      { label: "Space", value: "O(block/output)" },
      { label: "Hardware", value: "AES-NI/GPU possible" },
      { label: "Security", value: "mode dependent" },
    ],
    memoryBehavior: "Processes byte buffers; streaming modes avoid loading entire files.",
    scalability: "Highly scalable with hardware acceleration; nonce management is the operational risk.",
    tradeoffs: ["Fast", "Strong", "Requires shared key", "Mode misuse can destroy security"],
    variants: ["AES-GCM", "AES-CBC with HMAC", "AES-CTR"],
    interviewQuestions: ["Symmetric vs asymmetric.", "Why is ECB bad?", "What is an IV/nonce?"],
    interviewerFocus: "Security engineering discipline and protocol awareness.",
    engineeringThinking: "Correct key/nonce management matters as much as the cipher.",
    pairsBestWith: ["TLS", "Key management service", "SecureRandom"],
    whenNotToUse: "Do not use AES without authenticated mode and proper nonce handling.",
    productionUse: "Disk encryption, database encryption, TLS session encryption, secrets protection.",
    databaseRelevance: "Databases and object stores use AES-style encryption at rest.",
    faangScaleUse: "Cloud providers use AES-backed envelope encryption and hardware acceleration at enormous throughput.",
    java: `Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
SecretKey key = KeyGenerator.getInstance("AES").generateKey();
byte[] nonce = new byte[12];
new SecureRandom().nextBytes(nonce);
cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, nonce));`,
  }),
  topic({
    id: "alg-hashing",
    title: "Hashing Algorithms",
    family: "Security",
    summary: "Map arbitrary input to fixed-size digests.",
    problem: "Represent data compactly for lookup, integrity checks, partitioning, or fingerprints.",
    whyExists: "Systems need fast equality checks, integrity verification, hash tables, and stable identifiers.",
    history: "Hashing evolved across compiler symbol tables, checksums, cryptography, and distributed storage.",
    dataStructures: ["Byte arrays", "Hash table", "Digest"],
    naiveApproach: "Compare full objects or route data by raw key.",
    optimizedApproach: "Compute a digest or bucket hash with the right collision/security properties.",
    mechanics: ["Read bytes.", "Mix state repeatedly.", "Produce fixed-size digest.", "Use digest for lookup, integrity, or partitioning."],
    visualization: ["input bytes -> mixing rounds -> fixed digest"],
    complexity: [
      { label: "Time", value: "O(n)" },
      { label: "Digest", value: "O(1)" },
      { label: "Space", value: "O(1)" },
      { label: "Collisions", value: "possible" },
    ],
    memoryBehavior: "Streaming hash functions process chunks with constant state.",
    scalability: "Hashing is central to partitioning, caching, deduplication, and integrity at scale.",
    tradeoffs: ["Fast lookup", "Collision risk", "Cryptographic vs non-cryptographic choice", "Hash flooding risks"],
    variants: ["MurmurHash", "xxHash", "SHA-256", "Consistent hashing"],
    interviewQuestions: ["How does HashMap use hashing?", "What is a collision?", "Cryptographic vs normal hash?"],
    interviewerFocus: "Understanding identity, equality, distribution, and collision handling.",
    engineeringThinking: "Choose hashes based on security, speed, and distribution requirements.",
    pairsBestWith: ["HashMap", "HashSet", "Bloom filter", "Consistent hashing"],
    whenNotToUse: "Do not use non-cryptographic hashes for security decisions.",
    productionUse: "Hash tables, checksums, content addressing, cache keys, deduplication.",
    databaseRelevance: "Hash indexes, hash joins, partitioning, and bloom filters depend on hashing.",
    faangScaleUse: "Storage systems, caches, load balancers, deduplication, and telemetry pipelines use hashing constantly.",
    java: `MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] digest = md.digest(inputBytes);`,
  }),
  topic({
    id: "alg-bcrypt",
    title: "BCrypt",
    family: "Security",
    summary: "Slow salted password hashing designed to resist brute-force attacks.",
    problem: "Store password verifiers without storing passwords.",
    whyExists: "Fast hashes are too easy to brute force if a password database leaks.",
    history: "BCrypt is based on Blowfish and introduced an adjustable cost factor for password storage.",
    dataStructures: ["Salt", "Cost factor", "Password hash string"],
    naiveApproach: "Store plain passwords or fast SHA hashes.",
    optimizedApproach: "Hash each password with a unique salt and configurable work factor.",
    mechanics: ["Generate salt.", "Run expensive key schedule.", "Store algorithm/cost/salt/hash.", "Verify by recomputing with stored parameters."],
    visualization: ["password + salt + cost -> slow hash"],
    complexity: [
      { label: "Verify", value: "cost-dependent" },
      { label: "Space", value: "O(1)" },
      { label: "Attack cost", value: "intentionally high" },
      { label: "Salt", value: "unique" },
    ],
    memoryBehavior: "BCrypt is CPU-expensive; Argon2 adds stronger memory-hardness.",
    scalability: "Authentication systems must balance login latency and brute-force resistance.",
    tradeoffs: ["Slows attackers", "Slows legitimate logins", "Cost can be increased", "Not ideal compared with Argon2 for memory-hard needs"],
    variants: ["Argon2id", "scrypt", "PBKDF2"],
    interviewQuestions: ["Why salt passwords?", "Why not SHA-256 passwords?", "What is work factor?"],
    interviewerFocus: "Security threat modeling and password-storage basics.",
    engineeringThinking: "Design for database compromise, not only normal operation.",
    pairsBestWith: ["Unique salts", "Rate limiting", "MFA", "Secure password policy"],
    whenNotToUse: "Do not use BCrypt for general file hashing or encryption.",
    productionUse: "Password authentication systems.",
    databaseRelevance: "User tables store salted password hashes, never plaintext passwords.",
    faangScaleUse: "Large auth systems combine slow password hashing, risk scoring, rate limits, and MFA.",
    java: `// Use a library such as jBCrypt or Spring Security PasswordEncoder.
String hash = BCrypt.hashpw(password, BCrypt.gensalt(12));
boolean ok = BCrypt.checkpw(passwordAttempt, hash);`,
  }),
  topic({
    id: "alg-sha-family",
    title: "SHA Family",
    family: "Security",
    summary: "Cryptographic hash functions for integrity and fingerprints.",
    problem: "Detect tampering and create fixed-size secure digests.",
    whyExists: "Systems need collision-resistant fingerprints for files, messages, signatures, and certificates.",
    history: "The SHA family was standardized by NIST; SHA-256 is widely used after weaknesses in SHA-1.",
    dataStructures: ["Byte stream", "Digest state", "Fixed output"],
    naiveApproach: "Use checksums or weak hashes for security.",
    optimizedApproach: "Use SHA-256/SHA-3 as appropriate through vetted libraries.",
    mechanics: ["Pad input.", "Process blocks.", "Mix compression state.", "Emit digest."],
    visualization: ["message blocks -> compression rounds -> digest"],
    complexity: [
      { label: "Time", value: "O(n)" },
      { label: "Space", value: "O(1)" },
      { label: "Digest", value: "fixed" },
      { label: "Collision resistance", value: "algorithm-dependent" },
    ],
    memoryBehavior: "Streaming-friendly with constant internal state.",
    scalability: "Efficient for large files and streams; often hardware accelerated.",
    tradeoffs: ["Strong integrity", "Not encryption", "Not password hashing alone", "Algorithm lifecycle matters"],
    variants: ["SHA-256", "SHA-512", "SHA-3", "HMAC-SHA256"],
    interviewQuestions: ["Hashing vs encryption.", "Why not SHA for passwords?", "What is HMAC?"],
    interviewerFocus: "Security semantics and misuse prevention.",
    engineeringThinking: "Choose primitives by purpose: integrity, authentication, password storage, or encryption.",
    pairsBestWith: ["HMAC", "Digital signatures", "Content-addressed storage"],
    whenNotToUse: "Do not use raw SHA for password storage.",
    productionUse: "File integrity, signatures, certificates, content IDs, artifact verification.",
    databaseRelevance: "Content-addressed storage and deduplication use secure hashes.",
    faangScaleUse: "Artifact signing, deployment verification, storage deduplication, and integrity pipelines.",
    java: `MessageDigest sha = MessageDigest.getInstance("SHA-256");
byte[] digest = sha.digest(data);`,
  }),

  // AI & ML
  topic({
    id: "alg-gradient-descent",
    title: "Gradient Descent",
    family: "AI & ML",
    summary: "Iteratively adjusts parameters in the direction that reduces loss.",
    problem: "Optimize model parameters when a loss function is differentiable.",
    whyExists: "Many ML models cannot be solved by simple closed-form equations at scale.",
    history: "Gradient methods come from numerical optimization and became central to modern machine learning.",
    dataStructures: ["Vectors", "Matrices", "Tensors", "Parameter arrays"],
    naiveApproach: "Try random parameter values or grid search.",
    optimizedApproach: "Use gradients to move parameters downhill with a learning rate.",
    mechanics: ["Compute predictions.", "Compute loss.", "Compute gradient.", "Update parameters opposite gradient.", "Repeat until convergence."],
    visualization: ["point on loss surface -> slope -> small downhill step -> repeat"],
    complexity: [
      { label: "Per step", value: "O(parameters + data batch)" },
      { label: "Space", value: "O(parameters)" },
      { label: "Iterations", value: "problem-dependent" },
      { label: "GPU", value: "matrix parallelism" },
    ],
    memoryBehavior: "Stores parameters, gradients, optimizer state, and mini-batches.",
    scalability: "Scales through mini-batching, vectorization, GPUs, and distributed training.",
    tradeoffs: ["General optimizer", "Sensitive learning rate", "May converge slowly", "Can get stuck in bad regions"],
    variants: ["Batch GD", "Stochastic GD", "Mini-batch GD", "Momentum", "Adam"],
    interviewQuestions: ["What is a learning rate?", "Why use mini-batches?", "What causes divergence?"],
    interviewerFocus: "Optimization intuition, convergence, and vectorized computation.",
    engineeringThinking: "Training is systems engineering: memory, throughput, numerical stability, and observability matter.",
    pairsBestWith: ["Tensors", "Matrices", "GPU kernels", "Backpropagation"],
    whenNotToUse: "Avoid when the problem is non-differentiable and no surrogate is available.",
    productionUse: "Training regression, classifiers, neural networks, recommenders, and embeddings.",
    databaseRelevance: "Feature stores and vector databases feed optimized models; model outputs often power ranking/search.",
    faangScaleUse: "Large-scale recommendation, ads, ranking, fraud detection, and LLM training rely on gradient optimization.",
    java: `double w = 0.0, lr = 0.01;
for (int step = 0; step < 1000; step++) {
    double grad = 0.0;
    for (double[] row : data) {
        double x = row[0], y = row[1];
        grad += 2 * (w * x - y) * x;
    }
    w -= lr * grad / data.length;
}`,
  }),
  topic({
    id: "alg-backpropagation",
    title: "Backpropagation",
    family: "AI & ML",
    summary: "Computes neural network gradients by applying the chain rule backward through layers.",
    problem: "Efficiently compute gradients for many parameters in layered models.",
    whyExists: "Naively perturbing each parameter is too expensive for neural networks.",
    history: "Backpropagation popularized neural network training in the 1980s and powers deep learning.",
    dataStructures: ["Computational graph", "Tensors", "Activations", "Gradients"],
    naiveApproach: "Estimate each parameter gradient separately with finite differences.",
    optimizedApproach: "Reuse intermediate derivatives by propagating error backward through the graph.",
    mechanics: ["Forward pass stores activations.", "Compute loss.", "Start output gradient.", "Apply chain rule layer by layer backward.", "Update weights."],
    visualization: ["inputs -> layers -> loss, then loss gradient -> layers reversed -> weight gradients"],
    complexity: [
      { label: "Backward", value: "similar to forward" },
      { label: "Space", value: "activations + gradients" },
      { label: "Finite diff", value: "O(parameters * forward)" },
      { label: "Backprop", value: "O(forward)" },
    ],
    memoryBehavior: "Stores activations for backward pass; memory is a major training bottleneck.",
    scalability: "Uses GPU tensor kernels, activation checkpointing, mixed precision, and distributed training.",
    tradeoffs: ["Efficient gradients", "Needs differentiable graph", "Memory-heavy", "Numerical stability issues"],
    variants: ["Automatic differentiation", "Checkpointing", "Truncated BPTT"],
    interviewQuestions: ["Why is backprop efficient?", "What is the chain rule?", "Why store activations?"],
    interviewerFocus: "Understanding gradient flow and training mechanics.",
    engineeringThinking: "Optimize memory and compute together; model math and systems constraints are inseparable.",
    pairsBestWith: ["Neural networks", "Gradient descent", "Tensors", "GPUs"],
    whenNotToUse: "Avoid for non-differentiable systems without surrogate gradients.",
    productionUse: "Training deep learning models, embeddings, language models, vision models.",
    databaseRelevance: "Trained embeddings power semantic search and recommendation retrieval.",
    faangScaleUse: "Large-scale deep learning training uses distributed backprop over huge tensor graphs.",
    java: `// Production backprop is handled by tensor/autodiff libraries.
// Conceptually: dLoss/dW = dLoss/dOutput * dOutput/dW for each layer in reverse.`,
  }),
  topic({
    id: "alg-linear-regression",
    title: "Linear Regression",
    family: "AI & ML",
    summary: "Fits a linear relationship between input features and a numeric output.",
    problem: "Predict a continuous value.",
    whyExists: "Many real systems need interpretable numeric prediction from features.",
    history: "Least squares regression dates to Gauss and Legendre and remains foundational in statistics and ML.",
    dataStructures: ["Feature matrix", "Weight vector", "Labels"],
    naiveApproach: "Use averages or manual rules.",
    optimizedApproach: "Fit weights by least squares or gradient descent.",
    mechanics: ["Represent input as feature vector.", "Compute dot product.", "Compare prediction to label.", "Minimize squared error."],
    visualization: ["points -> best-fit line/plane -> residual errors minimized"],
    complexity: [
      { label: "Prediction", value: "O(d)" },
      { label: "GD step", value: "O(nd)" },
      { label: "Space", value: "O(d)" },
      { label: "Closed form", value: "matrix cost" },
    ],
    memoryBehavior: "Stores feature batches and weight vector.",
    scalability: "Scales with sparse features, mini-batches, and distributed training.",
    tradeoffs: ["Interpretable", "Fast", "Limited to linear relationships", "Sensitive to feature scaling/outliers"],
    variants: ["Ridge", "Lasso", "Polynomial features", "Online regression"],
    interviewQuestions: ["What loss does linear regression minimize?", "Why normalize features?"],
    interviewerFocus: "Basic supervised learning and optimization reasoning.",
    engineeringThinking: "Baseline simple models before complex neural architectures.",
    pairsBestWith: ["Matrices", "Gradient descent", "Feature engineering"],
    whenNotToUse: "Avoid when relationships are highly nonlinear and features cannot represent them.",
    productionUse: "Forecasting, pricing, trend estimation, baseline ranking features.",
    databaseRelevance: "Feature tables and analytics data often feed regression models.",
    faangScaleUse: "Simple models remain valuable baselines and interpretable components in larger ranking systems.",
    java: `static double predict(double[] w, double[] x) {
    double y = 0;
    for (int i = 0; i < w.length; i++) y += w[i] * x[i];
    return y;
}`,
  }),
  topic({
    id: "alg-logistic-regression",
    title: "Logistic Regression",
    family: "AI & ML",
    summary: "Predicts probability for binary classification using a sigmoid over a linear score.",
    problem: "Classify examples into yes/no outcomes with calibrated probability.",
    whyExists: "Many decisions need probabilities, not just continuous numeric predictions.",
    history: "Logistic models grew from statistics and became a workhorse for classification and ranking.",
    dataStructures: ["Feature vector", "Weight vector", "Labels"],
    naiveApproach: "Threshold a linear regression output.",
    optimizedApproach: "Use sigmoid and optimize cross-entropy loss.",
    mechanics: ["Compute linear score.", "Apply sigmoid.", "Compare to label.", "Update weights by gradient."],
    visualization: ["linear score -> S-shaped probability -> threshold"],
    complexity: [
      { label: "Prediction", value: "O(d)" },
      { label: "Training step", value: "O(nd)" },
      { label: "Space", value: "O(d)" },
      { label: "Output", value: "probability" },
    ],
    memoryBehavior: "Compact model; feature storage dominates.",
    scalability: "Strong for sparse high-dimensional features and online learning.",
    tradeoffs: ["Fast", "Interpretable", "Probabilistic", "Linear decision boundary"],
    variants: ["Multinomial logistic regression", "Regularized logistic regression", "Online SGD"],
    interviewQuestions: ["Why sigmoid?", "What is cross-entropy?", "Classification vs regression?"],
    interviewerFocus: "Probability, loss functions, and feature representation.",
    engineeringThinking: "A simple calibrated model can outperform complex models when data/latency constraints dominate.",
    pairsBestWith: ["Sparse vectors", "Gradient descent", "Feature stores"],
    whenNotToUse: "Avoid when nonlinear interactions dominate and features are insufficient.",
    productionUse: "Spam detection, risk scoring, ads click prediction baselines.",
    databaseRelevance: "Feature stores and online inference systems provide logistic model inputs.",
    faangScaleUse: "Large platforms use logistic-style models in ads, ranking, trust, and safety pipelines.",
    java: `static double sigmoid(double z) {
    return 1.0 / (1.0 + Math.exp(-z));
}
static double predictProb(double[] w, double[] x) {
    double z = 0;
    for (int i = 0; i < w.length; i++) z += w[i] * x[i];
    return sigmoid(z);
}`,
  }),
  topic({
    id: "alg-decision-trees",
    title: "Decision Trees",
    family: "AI & ML",
    summary: "Predict by recursively splitting data based on feature tests.",
    problem: "Create interpretable classification or regression rules.",
    whyExists: "Some domains need explainable decisions and nonlinear feature splits.",
    history: "Decision-tree learning grew through ID3, C4.5, CART, and ensemble methods.",
    dataStructures: ["Tree", "Feature table", "Split criteria"],
    naiveApproach: "Manually write if/else rules.",
    optimizedApproach: "Choose splits that maximize information gain or reduce impurity/error.",
    mechanics: ["Evaluate candidate splits.", "Pick best split.", "Partition data.", "Recurse.", "Stop at depth/purity/min samples."],
    visualization: ["feature test -> left/right branch -> leaf prediction"],
    complexity: [
      { label: "Train", value: "varies; often O(n d log n)" },
      { label: "Predict", value: "O(depth)" },
      { label: "Space", value: "O(nodes)" },
      { label: "Risk", value: "overfit" },
    ],
    memoryBehavior: "Stores tree nodes and split metadata; training stores partitions/statistics.",
    scalability: "Single trees can overfit; ensembles scale better but use more memory.",
    tradeoffs: ["Interpretable", "Nonlinear", "Handles mixed features", "Unstable without pruning/ensembles"],
    variants: ["Random forests", "Gradient boosted trees", "CART", "XGBoost-style boosting"],
    interviewQuestions: ["Information gain.", "Gini impurity.", "Why prune trees?"],
    interviewerFocus: "Splitting criteria and bias/variance reasoning.",
    engineeringThinking: "Model interpretability and robustness matter as much as accuracy.",
    pairsBestWith: ["Trees", "Priority queues for split search", "Feature tables"],
    whenNotToUse: "Avoid a single deep tree when generalization matters; use ensembles or regularization.",
    productionUse: "Risk models, ranking features, fraud, explainable decisioning.",
    databaseRelevance: "Tree models consume structured database features and can be compiled into decision logic.",
    faangScaleUse: "Boosted trees and forests power ranking, ads, fraud detection, and tabular ML systems.",
    java: `class TreeNode {
    int feature;
    double threshold;
    TreeNode left, right;
    double prediction;
}`,
  }),
  topic({
    id: "alg-neural-networks",
    title: "Neural Networks",
    family: "AI & ML",
    summary: "Layered differentiable functions trained to approximate complex mappings.",
    problem: "Learn nonlinear patterns from high-dimensional data.",
    whyExists: "Manual features and linear models struggle with language, vision, speech, and complex recommendation signals.",
    history: "Neural networks evolved from perceptrons to backprop-trained multilayer networks to modern deep learning and transformers.",
    dataStructures: ["Tensors", "Weight matrices", "Activation buffers", "Computational graph"],
    naiveApproach: "Hand-code rules or use shallow linear models.",
    optimizedApproach: "Use layered matrix operations, nonlinear activations, backpropagation, and GPU acceleration.",
    mechanics: ["Input tensor.", "Matrix multiply plus bias.", "Activation.", "Repeat layers.", "Compute loss.", "Backpropagate gradients."],
    visualization: ["input vector -> hidden layers -> output logits/probabilities"],
    complexity: [
      { label: "Forward", value: "matrix/tensor cost" },
      { label: "Backward", value: "similar to forward" },
      { label: "Space", value: "weights + activations" },
      { label: "Acceleration", value: "GPU/TPU" },
    ],
    memoryBehavior: "Training is activation-memory heavy; inference is weight-memory and bandwidth heavy.",
    scalability: "Scales with batching, tensor parallelism, data parallelism, quantization, and accelerator hardware.",
    tradeoffs: ["Expressive", "Data-hungry", "Less interpretable", "Expensive to train and serve"],
    variants: ["MLP", "CNN", "RNN", "Transformer", "Mixture of experts"],
    interviewQuestions: ["What is an activation?", "Why GPUs?", "Training vs inference?"],
    interviewerFocus: "High-level ML systems literacy, tensors, optimization, and deployment constraints.",
    engineeringThinking: "Modern AI is both algorithmic and infrastructural: data, memory, hardware, latency, and evaluation all matter.",
    pairsBestWith: ["Tensors", "Backpropagation", "Gradient descent", "GPUs"],
    whenNotToUse: "Avoid when a simpler interpretable model solves the problem with less data and cost.",
    productionUse: "Vision, speech, language, recommendations, anomaly detection, ranking, generative AI.",
    databaseRelevance: "Neural embeddings connect AI systems to vector databases and semantic search.",
    faangScaleUse: "Large platforms train and serve neural models for search, ads, feeds, moderation, assistants, and infra automation.",
    java: `// Production neural networks use tensor libraries.
// A dense layer computes: output = activation(weights * input + bias).`,
  }),

  // Database and distributed systems
  topic({
    id: "alg-b-tree",
    title: "B-Trees",
    family: "Databases",
    summary: "Balanced multi-way search trees optimized for block/page storage.",
    problem: "Index data so lookups and range scans avoid full table scans.",
    whyExists: "Binary trees cause too many disk/page reads; B-trees store many keys per node to match storage pages.",
    history: "B-trees were introduced by Bayer and McCreight in 1970 and became foundational in database indexes.",
    dataStructures: ["Sorted arrays inside nodes", "Tree pages", "Pointers"],
    naiveApproach: "Scan every row to find matching keys.",
    optimizedApproach: "Traverse balanced pages from root to leaf, then scan leaf ranges.",
    mechanics: ["Search keys inside root page.", "Choose child pointer.", "Repeat until leaf.", "Find key or range.", "Split pages on insert overflow."],
    visualization: ["root page -> child page -> leaf page -> row pointer/range"],
    complexity: [
      { label: "Search", value: "O(log_b n)" },
      { label: "Insert", value: "O(log_b n)" },
      { label: "Range scan", value: "O(log n + k)" },
      { label: "Space", value: "O(n)" },
    ],
    memoryBehavior: "Optimized around page/cache-line locality and minimizing random I/O.",
    scalability: "Excellent for disk-backed indexes and ordered range queries.",
    tradeoffs: ["Ordered", "Range-friendly", "Write amplification from splits", "More complex than hash index"],
    variants: ["B+ tree", "Fractal tree", "Bw-tree"],
    interviewQuestions: ["Why do databases use B-trees?", "B-tree vs hash index?", "How does range scan work?"],
    interviewerFocus: "Storage-aware algorithm design.",
    engineeringThinking: "Algorithms must match hardware: disk/page I/O changes the data-structure choice.",
    pairsBestWith: ["Sorted keys", "Database pages", "Buffer cache"],
    whenNotToUse: "Avoid for pure exact-key in-memory lookup where hash tables are simpler and faster.",
    productionUse: "Relational database indexes, filesystems, ordered key-value stores.",
    databaseRelevance: "Primary structure behind many SQL indexes.",
    faangScaleUse: "Storage engines use B-tree variants for low-latency ordered lookup at massive scale.",
    java: `// Sketch: a B-tree node stores many sorted keys and child pointers.
class BTreeNode {
    int[] keys;
    BTreeNode[] children;
    int keyCount;
    boolean leaf;
}`,
  }),
  topic({
    id: "alg-lsm-tree",
    title: "LSM Trees",
    family: "Databases",
    summary: "Write-optimized storage structure using memory tables and sorted disk runs.",
    problem: "Handle high write throughput without random disk writes.",
    whyExists: "B-tree updates can cause random I/O; LSM trees batch writes sequentially and compact later.",
    history: "Log-structured merge trees were formalized in the 1990s and power many modern NoSQL/storage engines.",
    dataStructures: ["Memtable", "Write-ahead log", "SSTables", "Bloom filters"],
    naiveApproach: "Update disk pages randomly for every write.",
    optimizedApproach: "Append to log, write to memory, flush sorted runs, and compact in the background.",
    mechanics: ["Write WAL.", "Insert into memtable.", "Flush full memtable to SSTable.", "Use bloom filters for lookup.", "Compact levels."],
    visualization: ["writes -> WAL/memtable -> SSTable L0 -> compaction -> lower levels"],
    complexity: [
      { label: "Write", value: "amortized efficient" },
      { label: "Read", value: "may check levels" },
      { label: "Space", value: "write amplification" },
      { label: "Range", value: "sorted runs" },
    ],
    memoryBehavior: "Uses memory buffers and disk runs; compaction trades background I/O for write throughput.",
    scalability: "Excellent write scalability; read and compaction tuning are critical.",
    tradeoffs: ["High write throughput", "Sequential I/O", "Compaction cost", "Read amplification"],
    variants: ["Leveled compaction", "Size-tiered compaction", "RocksDB-style LSM"],
    interviewQuestions: ["B-tree vs LSM.", "What is compaction?", "Why use bloom filters?"],
    interviewerFocus: "Storage-engine tradeoffs and write/read amplification.",
    engineeringThinking: "Move random writes into sequential batches, then pay cleanup cost deliberately.",
    pairsBestWith: ["WAL", "Sorted arrays", "Bloom filters", "Background compaction"],
    whenNotToUse: "Avoid when stable low-latency reads matter more than write throughput and compaction cannot be tolerated.",
    productionUse: "Cassandra, RocksDB, LevelDB, time-series storage, event-heavy systems.",
    databaseRelevance: "Core storage design for many distributed databases.",
    faangScaleUse: "Write-heavy databases and stream/event storage use LSM concepts to absorb massive write volume.",
    java: `// Sketch: writes go to WAL and memtable first.
NavigableMap<String, String> memtable = new TreeMap<>();
void put(String key, String value) {
    // appendToWal(key, value);
    memtable.put(key, value);
}`,
  }),
  topic({
    id: "alg-consistent-hashing",
    title: "Consistent Hashing",
    family: "Distributed",
    summary: "Maps keys to nodes on a hash ring so membership changes move only a fraction of keys.",
    problem: "Distribute keys across changing cache/storage nodes.",
    whyExists: "Modulo hashing remaps almost every key when node count changes.",
    history: "Consistent hashing became prominent in distributed caching and peer-to-peer systems.",
    dataStructures: ["Hash ring", "Sorted map", "Virtual nodes"],
    naiveApproach: "Assign node = hash(key) % nodeCount.",
    optimizedApproach: "Place nodes and keys on a ring; key goes to next node clockwise.",
    mechanics: ["Hash node IDs to ring.", "Hash key.", "Find first node hash >= key hash.", "Wrap around if needed.", "Use virtual nodes for balance."],
    visualization: ["ring: key hash lands between node A and B -> assigned to B"],
    complexity: [
      { label: "Lookup", value: "O(log n)" },
      { label: "Move on change", value: "O(keys/n)" },
      { label: "Space", value: "O(virtual nodes)" },
      { label: "Balance", value: "virtual-node dependent" },
    ],
    memoryBehavior: "Stores ring metadata in sorted maps; data lives on assigned nodes.",
    scalability: "Enables elastic distributed caches and storage clusters.",
    tradeoffs: ["Minimal remapping", "Needs virtual nodes", "Hot keys still possible", "Operational complexity"],
    variants: ["Rendezvous hashing", "Jump consistent hash", "Weighted rings"],
    interviewQuestions: ["Why not modulo hashing?", "How do virtual nodes help?", "How do you handle hot keys?"],
    interviewerFocus: "Distributed partitioning and operational tradeoffs.",
    engineeringThinking: "Scale-out systems need stable ownership when machines join or leave.",
    pairsBestWith: ["Hashing", "SortedMap", "Caching", "Sharding"],
    whenNotToUse: "Avoid for tiny fixed clusters where simple partitioning is enough.",
    productionUse: "Distributed caches, sharded databases, key-value stores, load distribution.",
    databaseRelevance: "Sharded databases and distributed caches use consistent-hashing-like placement.",
    faangScaleUse: "Large caches and storage fleets use stable partitioning to add/remove capacity safely.",
    distributedImplications: "Node churn, replication, hot keys, and rebalancing become first-class concerns.",
    java: `class Ring {
    TreeMap<Integer, String> ring = new TreeMap<>();
    String nodeFor(String key) {
        int h = key.hashCode();
        Integer slot = ring.ceilingKey(h);
        return ring.get(slot != null ? slot : ring.firstKey());
    }
}`,
  }),
  topic({
    id: "alg-replication",
    title: "Replication Algorithms",
    family: "Distributed",
    summary: "Copy data across nodes for availability, durability, and read scalability.",
    problem: "Keep data available when machines fail and serve reads closer/faster.",
    whyExists: "A single copy is a single point of failure and a scalability limit.",
    history: "Replication is foundational in databases, distributed filesystems, and fault-tolerant services.",
    dataStructures: ["Write log", "Replica set", "Version/timestamp", "Quorum state"],
    naiveApproach: "Write to one server and hope it stays available.",
    optimizedApproach: "Use leader/follower, quorum, or multi-leader replication with explicit consistency guarantees.",
    mechanics: ["Accept write.", "Append to log.", "Send to replicas.", "Wait for configured acknowledgments.", "Serve reads based on consistency mode."],
    visualization: ["client -> leader -> followers -> quorum ack -> commit"],
    complexity: [
      { label: "Write latency", value: "network-dependent" },
      { label: "Space", value: "O(replicas * data)" },
      { label: "Availability", value: "replica-dependent" },
      { label: "Consistency", value: "protocol-dependent" },
    ],
    memoryBehavior: "Stores logs, buffers, replica metadata, and sometimes divergent versions.",
    scalability: "Improves read availability but introduces lag, conflict, and failover complexity.",
    tradeoffs: ["Durability", "Availability", "Read scale", "Consistency/latency tradeoff"],
    variants: ["Leader-follower", "Quorum replication", "Multi-leader", "Read replicas"],
    interviewQuestions: ["Leader vs follower replication.", "What is replication lag?", "What is quorum?"],
    interviewerFocus: "Failure modes and consistency guarantees.",
    engineeringThinking: "Replication is not copying; it is a protocol under failure.",
    pairsBestWith: ["Logs", "Consensus", "Version vectors", "Quorums"],
    whenNotToUse: "Avoid unnecessary replication when operational complexity outweighs availability needs.",
    productionUse: "Databases, caches, file storage, service state, disaster recovery.",
    databaseRelevance: "Replication is central to high-availability databases.",
    faangScaleUse: "Every large platform replicates data across nodes, zones, and regions with explicit consistency tradeoffs.",
    distributedImplications: "Network partitions, lag, split brain, and conflict resolution define the system behavior.",
    java: `// Sketch: commit after quorum acknowledgments.
boolean committed = acknowledgments >= quorumSize;`,
  }),
  topic({
    id: "alg-consensus",
    title: "Consensus Algorithms",
    family: "Distributed",
    summary: "Allow distributed nodes to agree on a value or log despite failures.",
    problem: "Coordinate state changes safely when machines can fail or messages can be delayed.",
    whyExists: "Replicas need one agreed order of operations to behave like a reliable system.",
    history: "Paxos, Raft, and related protocols formalized fault-tolerant agreement in distributed systems.",
    dataStructures: ["Replicated log", "Term/epoch", "Quorum", "Leader state"],
    naiveApproach: "Let any node write independently, causing conflicts and split brain.",
    optimizedApproach: "Elect a leader and commit log entries after quorum agreement.",
    mechanics: ["Elect leader.", "Leader proposes log entry.", "Followers append.", "Quorum acknowledges.", "Entry commits and applies in order."],
    visualization: ["leader -> propose entry -> majority ack -> commit"],
    complexity: [
      { label: "Commit", value: "network round trips" },
      { label: "Space", value: "replicated log" },
      { label: "Fault tolerance", value: "majority" },
      { label: "Latency", value: "coordination cost" },
    ],
    memoryBehavior: "Stores durable logs and volatile election/replication state.",
    scalability: "Consensus is expensive; use it for metadata/control planes, not every hot data operation.",
    tradeoffs: ["Strong consistency", "Fault tolerance", "Latency cost", "Leader bottlenecks"],
    variants: ["Raft", "Paxos", "Multi-Paxos", "Viewstamped Replication"],
    interviewQuestions: ["Why need consensus?", "What is quorum?", "Raft leader election basics."],
    interviewerFocus: "Distributed failure reasoning, not code memorization.",
    engineeringThinking: "Correct coordination is expensive; isolate it to the state that truly needs agreement.",
    pairsBestWith: ["Replicated logs", "Quorums", "Leader election", "State machines"],
    whenNotToUse: "Avoid consensus for high-volume eventually consistent data where weaker guarantees suffice.",
    productionUse: "Metadata stores, cluster membership, locks, configuration, strongly consistent databases.",
    databaseRelevance: "Distributed databases use consensus for leader election, metadata, and replicated logs.",
    faangScaleUse: "Large systems use consensus in control planes, coordination services, and strongly consistent storage.",
    distributedImplications: "Consensus is the core abstraction for surviving partial failure while preserving agreement.",
    java: `// Sketch: Raft-style log entry becomes committed after majority replication.
boolean majority = replicatedCount > clusterSize / 2;`,
  }),

  // ── Recursion ───────────────────────────────────────────────────────────────

  topic({
    id: "alg-recursion-fundamentals",
    title: "Recursion",
    family: "Recursion",
    summary: "A function that solves a problem by calling itself on a smaller version of the same problem until it reaches a base case that terminates.",
    problem: "Many problems have self-similar structure: a tree is a node with subtrees, factorial(n) = n × factorial(n-1), a file system is a directory containing directories. Loops cannot naturally express recursive structure; recursion can.",
    whyExists: "Many real data structures are recursive — trees, linked lists, file systems, parse trees, graphs. A recursive function mirrors the recursive structure of the data, making solutions natural and provably correct by induction.",
    history: "Recursion was formalized by Alonzo Church in lambda calculus (1936) and Alan Turing in Turing machine theory. It became practical in Lisp (McCarthy, 1958) and is now foundational in every language.",
    prerequisites: ["Functions", "Memory and references", "Call stack"],
    dataStructures: ["Call stack", "Arrays", "Trees", "Linked lists"],
    naiveApproach: "Write the recursive case but omit the base case. The call stack grows until the OS kills it with StackOverflowError or RecursionError.",
    optimizedApproach: "Every recursive function needs exactly two things: a base case (the smallest problem with a known answer) and a recursive case that reduces the problem by one unit toward the base case.",
    mechanics: [
      "Identify the base case: the smallest version of the problem with a trivially known answer (n <= 1, node == null, list is empty).",
      "Identify the recursive case: solve one unit of work, then delegate the remaining problem to a recursive call.",
      "Each call creates a new stack frame. Stack frames unwind as base cases return values back up the call chain.",
      "Stack depth equals the depth of recursion. For factorial(n), depth is n. For a balanced binary tree, depth is log n.",
      "Python caps recursion at 1,000 by default. Java's default stack allows roughly 500–10,000 frames depending on frame size.",
    ],
    visualization: [
      "factorial(4):",
      "  frame 4: 4 × factorial(3)",
      "  frame 3:   3 × factorial(2)",
      "  frame 2:     2 × factorial(1)",
      "  frame 1:       return 1  ← base case",
      "  frame 2:     return 2",
      "  frame 3:   return 6",
      "  frame 4: return 24",
    ],
    complexity: [
      { label: "Factorial time", value: "O(n)" },
      { label: "Factorial space", value: "O(n) stack frames" },
      { label: "Naive fib time", value: "O(2^n)" },
      { label: "Tree traversal", value: "O(nodes)" },
    ],
    memoryBehavior: "Each recursive call allocates a stack frame containing local variables and a return address. Deep recursion without tail-call optimization consumes O(depth) stack space. Stack space is limited and not garbage-collected — a stack overflow crashes the process.",
    scalability: "Recursion is safe for problems with bounded depth (trees of height log n, parse trees of bounded depth). For unbounded depth or very large inputs, convert to iteration with an explicit stack to avoid stack overflow.",
    tradeoffs: [
      "Recursive code maps directly to recursive data structure — easier to read and prove correct.",
      "Stack frames have overhead. Deep recursion is slower than iteration due to function call costs.",
      "Stack overflow is a production risk for any recursive algorithm on unbounded user input.",
      "Tail recursion can be optimized by some runtimes (Scala, Haskell) but not by Java or CPython.",
    ],
    interviewerFocus: "Whether you identify base cases first, trust the call stack, and know when recursion depth becomes dangerous.",
    engineeringThinking: "Recursion reflects recursive data structure. A recursive solution has a natural inductive proof. Every recursive algorithm has an iterative equivalent with an explicit stack — prefer iterative for production code on large or unbounded inputs.",
    pairsBestWith: ["Trees", "DFS", "Divide and Conquer", "Memoization", "Backtracking"],
    whenNotToUse: "When input depth is unbounded or very large (> ~5,000 levels). When the language lacks tail-call optimization and the recursive case is in tail position. When iterative code is equally readable.",
    productionUse: "File system traversal, AST parsing, DOM manipulation, JSON/XML parsing, recursive descent parsers, directory trees, dependency resolution.",
    databaseRelevance: "Recursive CTEs (WITH RECURSIVE) execute recursive queries over hierarchical data. B-tree splits use recursive logic. Query planners use recursion for nested expression trees.",
    faangScaleUse: "DFS on social graphs, AST compilation, recursive descent parsing in query engines, tree rendering in UI frameworks, recursive configuration resolvers in build systems.",
    java: `// Base case + recursive case — the two parts of every recursive function
static long factorial(int n) {
    if (n <= 1) return 1;              // base case: known answer
    return n * factorial(n - 1);       // recursive case: reduce by one
}

// Tree sum — mirrors the recursive structure of the data
static int treeSum(TreeNode node) {
    if (node == null) return 0;        // base case: null leaf
    return node.val + treeSum(node.left) + treeSum(node.right);
}

// Iterative equivalent of factorial — avoids stack frame overhead
static long factorialIterative(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}`,
    typescript: `function factorial(n: number): number {
  if (n <= 1) return 1;              // base case
  return n * factorial(n - 1);       // recursive case
}

interface TreeNode { val: number; left?: TreeNode; right?: TreeNode; }
function treeSum(node: TreeNode | null | undefined): number {
  if (!node) return 0;               // base case
  return node.val + treeSum(node.left) + treeSum(node.right);
}`,
    python: `def factorial(n):
    if n <= 1: return 1          # base case
    return n * factorial(n - 1)  # recursive case

# Python recursion limit is 1000 by default
# sys.setrecursionlimit(10000) to raise it

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def tree_sum(node):
    if node is None: return 0    # base case
    return node.val + tree_sum(node.left) + tree_sum(node.right)`,
  }),

  topic({
    id: "alg-divide-and-conquer",
    title: "Divide and Conquer",
    family: "Recursion",
    summary: "Recursively split a problem into independent subproblems, solve each, and combine the results — turning O(n²) problems into O(n log n) by halving the work at each level.",
    problem: "Problems that appear O(n²) naively often become O(n log n) when you realize the input can be split in half at each step. Binary search, merge sort, and quicksort are all divide and conquer.",
    whyExists: "The recurrence T(n) = 2T(n/2) + O(n) solves to O(n log n) by the Master Theorem — far better than the O(n²) you get from comparing every element to every other. The insight is that independent halves can be solved separately and their results merged.",
    history: "John von Neumann invented merge sort in 1945. Binary search dates to 1946 (Mauchly). The Master Theorem (1984, Bentley, Haken, Saxe) gave a general formula for divide-and-conquer recurrences.",
    prerequisites: ["Recursion", "Arrays", "Big-O reasoning"],
    dataStructures: ["Arrays", "Sorted arrays", "Binary trees"],
    naiveApproach: "Check every element against every other element, or search every element in an unsorted array. O(n²) or O(n) respectively.",
    optimizedApproach: "Split the problem in half at each recursive step. T(n) = 2T(n/2) + O(n) → O(n log n). T(n) = T(n/2) + O(1) → O(log n) for binary search.",
    mechanics: [
      "Divide: split the input into two or more independent subproblems of the same type.",
      "Conquer: recursively solve each subproblem. Base case when the subproblem is trivially small (size 0 or 1).",
      "Combine: merge or aggregate subproblem results into the final answer.",
      "The log n depth comes from halving: n → n/2 → n/4 → ... → 1 requires log₂n splits.",
      "Subproblems must be truly independent. If they share state or results overlap, use dynamic programming instead.",
    ],
    visualization: [
      "Merge sort [5,3,1,4,2]:",
      "  Divide:  [5,3] | [1,4,2]",
      "  Divide:  [5][3] | [1][4,2] → [4][2]",
      "  Conquer: [3,5]  | [1] [2,4]",
      "  Combine: [1,2,3,4,5]",
    ],
    complexity: [
      { label: "Binary search", value: "O(log n)" },
      { label: "Merge sort time", value: "O(n log n)" },
      { label: "Merge sort space", value: "O(n)" },
      { label: "QuickSort avg", value: "O(n log n)" },
    ],
    memoryBehavior: "Stack depth is O(log n) for balanced splits. Merge sort needs O(n) auxiliary memory for the merge step. QuickSort is in-place with O(log n) average stack depth, O(n) worst case on already-sorted input with a bad pivot choice.",
    scalability: "O(n log n) is optimal for comparison-based sorting — proven no comparison sort can do better. MapReduce and distributed sort extend the D&C pattern to data that doesn't fit on one machine by sorting shards then merging.",
    tradeoffs: [
      "O(n log n) is optimal for comparison-based sorting.",
      "Merge sort needs O(n) auxiliary memory. QuickSort is in-place but has O(n²) worst case without randomized pivots.",
      "Only works when subproblems are independent. Overlapping subproblems require dynamic programming.",
    ],
    interviewerFocus: "Whether you can identify that a problem has recursive substructure that can be split, solved independently, and merged.",
    engineeringThinking: "MapReduce is divide-and-conquer at cluster scale: map = divide work across shards, reduce = combine results. Distributed sort in Spark follows the same recurrence. External merge sort in databases sorts chunks that don't fit in RAM then merges them.",
    pairsBestWith: ["Recursion", "Merge Sort", "QuickSort", "Binary Search", "Trees"],
    whenNotToUse: "When subproblems are not independent (use dynamic programming). When the combine step is too expensive relative to the divide savings.",
    productionUse: "Merge sort, binary search, quickselect (median-of-medians), FFT, Strassen matrix multiplication, external sort in databases, MapReduce.",
    databaseRelevance: "External merge sort runs when sorted data exceeds memory: sort fixed-size chunks, then k-way merge. Sort-merge join divides two sorted relations and merges. B-tree construction uses sorted splits.",
    faangScaleUse: "MapReduce and Spark use D&C at cluster scale. Search engines sort and merge posting lists using multi-way merge. Distributed sort phases in Hadoop shuffle follow the D&C recurrence.",
    java: `// Binary search — O(log n) on sorted array
static int binarySearch(int[] arr, int target, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;     // avoids int overflow vs (lo+hi)/2
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) return binarySearch(arr, target, mid + 1, hi);
    return binarySearch(arr, target, lo, mid - 1);
}

// Merge sort — O(n log n), O(n) space
static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;         // base case: one element
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);         // conquer left half
    mergeSort(arr, mid + 1, right);    // conquer right half
    merge(arr, left, mid, right);      // combine
}

static void merge(int[] arr, int left, int mid, int right) {
    int[] tmp = Arrays.copyOfRange(arr, left, right + 1);
    int i = 0, j = mid - left + 1, k = left;
    while (i <= mid - left && j < tmp.length)
        arr[k++] = tmp[i] <= tmp[j] ? tmp[i++] : tmp[j++];
    while (i <= mid - left) arr[k++] = tmp[i++];
    while (j < tmp.length) arr[k++] = tmp[j++];
}`,
    typescript: `function binarySearch(arr: number[], target: number, lo = 0, hi = arr.length - 1): number {
  if (lo > hi) return -1;
  const mid = lo + Math.floor((hi - lo) / 2);
  if (arr[mid] === target) return mid;
  return arr[mid] < target
    ? binarySearch(arr, target, mid + 1, hi)
    : binarySearch(arr, target, lo, mid - 1);
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return result.concat(left.slice(i), right.slice(j));
}`,
    python: `def binary_search(arr, target, lo=0, hi=None):
    if hi is None: hi = len(arr) - 1
    if lo > hi: return -1
    mid = lo + (hi - lo) // 2
    if arr[mid] == target: return mid
    if arr[mid] < target: return binary_search(arr, target, mid + 1, hi)
    return binary_search(arr, target, lo, mid - 1)

def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i += 1
        else: result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
  }),

  topic({
    id: "alg-memoization",
    title: "Memoization",
    family: "Recursion",
    summary: "Cache the result of each unique recursive call so that each unique subproblem is computed exactly once, converting exponential recursion to polynomial time.",
    problem: "Naive Fibonacci recursion computes fib(3) once for fib(5) and again inside fib(4). With two branches at every level, the call tree has O(2^n) nodes. Memoization recognizes that fib(3) is a pure function of its input and caches the answer after the first computation.",
    whyExists: "Donald Michie coined the term in 1968. It is the top-down form of dynamic programming — the bridge between recognizing a recursive structure and the fully iterative DP table.",
    history: "Michie (1968) formalized the concept. Bellman's dynamic programming (1950s) is the bottom-up equivalent. The two approaches are provably equivalent for problems with optimal substructure and overlapping subproblems.",
    prerequisites: ["Recursion", "Hash maps"],
    dataStructures: ["HashMap (cache keyed by subproblem input)", "Call stack"],
    naiveApproach: "fib(n) = fib(n-1) + fib(n-2) with no cache. The call tree is a full binary tree of height n with O(2^n) nodes. fib(30) requires over a billion calls.",
    optimizedApproach: "Before recursing, check the cache. If hit, return immediately. If miss, compute, cache the result, and return. Each unique input is computed once. The call graph collapses from an exponential tree to a linear chain for 1D problems.",
    mechanics: [
      "Create a cache (HashMap or array indexed by input) before starting the recursion.",
      "At the top of the function, check if the current input is already in the cache.",
      "Cache hit: return the stored value immediately — O(1).",
      "Cache miss: recurse, store the result in the cache, return it.",
      "Total work = number of unique subproblems × cost per subproblem.",
    ],
    visualization: [
      "Without memo — fib(5) call tree, 15 nodes (exponential):",
      "  fib(5) → fib(4) + fib(3)",
      "    fib(4) → fib(3) + fib(2)   ← fib(3) recomputed",
      "With memo — fib(5) call chain, 5 nodes (linear):",
      "  fib(5) → fib(4) → fib(3) → fib(2) → fib(1) → 1",
      "  (cache fills on the way back up)",
    ],
    complexity: [
      { label: "Naive fib", value: "O(2^n)" },
      { label: "Memoized fib", value: "O(n) time" },
      { label: "Space", value: "O(n) cache + O(n) stack" },
      { label: "Cache hit", value: "O(1)" },
    ],
    memoryBehavior: "Memoization trades memory for time. For 1D problems: O(n) cache. For 2D problems (LCS, edit distance): O(n × m) cache. The call stack still grows to O(depth) — very deep recursion can still overflow before the cache helps. Tabulation (bottom-up DP) avoids the stack entirely.",
    scalability: "Memoization works whenever subproblems are pure functions: same input always produces the same output, no side effects. For very large or sparse state spaces, use a HashMap. For dense state spaces, use an array (faster constant factor than HashMap).",
    tradeoffs: [
      "Converts exponential recursion to polynomial — the improvement is dramatic.",
      "Cache consumes O(unique subproblems) memory.",
      "If subproblems do not overlap (divide and conquer), memoization adds overhead with no benefit.",
      "Call stack still grows — for very deep recursion, bottom-up tabulation is safer.",
    ],
    interviewerFocus: "Whether you can recognize overlapping subproblems and add a cache without restructuring the recursive logic.",
    engineeringThinking: "Memoization is a disciplined cache: the cache key is the function input, the invariant is purity. React's useMemo, CDN cache keys, and Redis key design follow the same principle: a pure function of its inputs cached by those inputs.",
    pairsBestWith: ["Recursion", "Dynamic Programming", "Hash maps"],
    whenNotToUse: "When subproblems are not repeated (divide and conquer). When the function has side effects. When memory is severely constrained and tabulation with O(1) space rolling arrays is needed.",
    productionUse: "Compiler caches, React useMemo/useCallback, CPU instruction caches, HTTP caching (ETags), build system artifact caches (Bazel, Gradle).",
    databaseRelevance: "Query plan caches memoize the parsed and optimized plan for a SQL query string. Prepared statements are memoization of query compilation.",
    faangScaleUse: "ML feature computation pipelines memoize expensive features by input hash. Recommendation scoring caches intermediate model outputs. Build systems memoize compilation artifacts by source content hash.",
    java: `// Naive Fibonacci: O(2^n) — exponential recomputation
static int fibNaive(int n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2); // fib(n-2) recomputed in both branches
}

// Memoized Fibonacci: O(n) — each unique n computed once
private static final Map<Integer, Long> memo = new HashMap<>();
static long fib(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);   // cache hit
    long result = fib(n - 1) + fib(n - 2);
    memo.put(n, result);                             // cache miss: store and return
    return result;
}

// Climbing stairs — same recurrence, memoize directly
private static final Map<Integer, Integer> stairMemo = new HashMap<>();
static int climbStairs(int n) {
    if (n <= 2) return n;
    if (stairMemo.containsKey(n)) return stairMemo.get(n);
    int result = climbStairs(n - 1) + climbStairs(n - 2);
    stairMemo.put(n, result);
    return result;
}`,
    typescript: `// Memoized Fibonacci — pass memo through recursive calls
function fib(n: number, memo = new Map<number, number>()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Generic memoize wrapper for pure functions
function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg)!;
  };
}`,
    python: `from functools import lru_cache

# Decorator-based memoization (Python standard library)
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n - 1) + fib(n - 2)

# Manual memo dict
def fib_manual(n, memo={}):
    if n <= 1: return n
    if n not in memo:
        memo[n] = fib_manual(n - 1, memo) + fib_manual(n - 2, memo)
    return memo[n]`,
  }),

  // ── Dynamic Programming ────────────────────────────────────────────────────

  topic({
    id: "alg-dp-fundamentals",
    title: "Dynamic Programming",
    family: "Dynamic Programming",
    summary: "Solve problems with overlapping subproblems and optimal substructure by computing each unique subproblem exactly once, either top-down with memoization or bottom-up with a DP table.",
    problem: "Many optimization and counting problems have recursive structure where the same subproblems repeat across branches. Naive recursion is exponential. DP solves each subproblem once and reuses the result.",
    whyExists: "Richard Bellman coined the term in the 1950s for multi-stage decision problems. The core insight: if the optimal solution to a problem can be built from optimal solutions to subproblems, you only need to solve each subproblem once.",
    history: "Bellman (1953) introduced DP for control theory. It was then applied to sequence alignment, shortest paths (Bellman-Ford, Floyd-Warshall), and combinatorics. Today it is one of the most important interview and systems topics.",
    prerequisites: ["Recursion", "Memoization", "Arrays"],
    dataStructures: ["1D array dp[]", "2D array dp[][]", "HashMap for sparse state spaces"],
    naiveApproach: "Recursive exploration of all possibilities without reusing results. O(2^n) or O(n!) for most DP problems.",
    optimizedApproach: "Two equivalent approaches: top-down (recursion + memo cache) and bottom-up (fill a table from base cases to the answer). Bottom-up avoids call stack overhead and enables space optimization.",
    mechanics: [
      "Identify optimal substructure: the optimal solution to the problem contains optimal solutions to subproblems.",
      "Identify overlapping subproblems: the same subproblem appears in multiple recursive branches.",
      "Define the DP state: dp[i] = 'answer for input size i', or dp[i][j] for 2D problems.",
      "Write the recurrence relation: dp[i] = f(dp[i-1], dp[i-2], ...) from the recursive structure.",
      "Identify base cases: the smallest known answers (dp[0] = 0, dp[1] = 1).",
      "Fill the table from smallest to largest (tabulation) or let recursion fill the cache (memoization).",
    ],
    visualization: [
      "Bottom-up Fibonacci (tabulation):",
      "  dp[0]=0, dp[1]=1",
      "  dp[2]=dp[1]+dp[0]=1",
      "  dp[3]=dp[2]+dp[1]=2",
      "  dp[4]=dp[3]+dp[2]=3",
      "  dp[5]=dp[4]+dp[3]=5",
    ],
    complexity: [
      { label: "1D DP time", value: "O(n × choices)" },
      { label: "2D DP time", value: "O(n × m)" },
      { label: "1D space", value: "O(n) or O(1) optimized" },
      { label: "2D space", value: "O(n × m) or O(n) rolling" },
    ],
    memoryBehavior: "A 1D DP table is O(n). A 2D table is O(n × m). Many problems allow space optimization: if dp[i] only depends on dp[i-1], store only two values at a time — O(1) space. LCS and edit distance can be reduced from O(n×m) to O(min(n,m)) with rolling rows.",
    scalability: "DP scales to millions of subproblems when the state space is bounded and well-defined. For sparse state spaces, use memoization with a HashMap. For continuous or multi-dimensional state spaces, approximate DP (value iteration in reinforcement learning) is used.",
    tradeoffs: [
      "DP converts exponential problems to polynomial — the improvement can be from O(2^n) to O(n²) or O(n).",
      "Requires identifying the right DP state — this is the hard part and where most interviews focus.",
      "2D tables can use O(n²) memory which may be prohibitive for large inputs.",
      "Space optimization with rolling arrays makes code harder to read and verify.",
    ],
    edgeCases: [
      "Empty input or amount 0 — base cases must handle this explicitly.",
      "No valid solution — the DP table may never reach a valid value; return -1 or -infinity sentinel.",
      "Very large n — O(n²) space may exceed memory limits.",
    ],
    beginnerMistakes: [
      "Jumping to code before defining the DP state in words.",
      "Off-by-one errors in table initialization and loop bounds.",
      "Forgetting to handle the sentinel 'no solution' case.",
      "Confusing memoization (top-down) with tabulation (bottom-up) — they are equivalent but have different debugging profiles.",
    ],
    interviewerFocus: "Whether you define the DP state, write the recurrence, and handle base cases before writing any code.",
    engineeringThinking: "DP is the principled approach to turning exponential decision trees into polynomial computation. The same discipline appears in incremental build systems, query plan optimization, and reinforcement learning.",
    pairsBestWith: ["Memoization", "Recursion", "Graphs (shortest path)", "Strings (LCS, edit distance)"],
    whenNotToUse: "When subproblems are independent (divide and conquer). When the state space is too large. When a greedy approach provably works.",
    productionUse: "Shortest path routing, NLP sequence labeling (Viterbi), bioinformatics alignment, compiler optimization, query plan selection.",
    databaseRelevance: "The Selinger query optimizer uses DP to find the minimum-cost join order — the same structure as coin change with 'join cost' as the 'coin'.",
    faangScaleUse: "Recommendation sequences, ad bid optimization, ride-share driver-rider assignment, NLP models (Viterbi decoding), reinforcement learning policy optimization.",
    java: `// Bottom-up tabulation: Fibonacci
static long fib(int n) {
    if (n <= 1) return n;
    long[] dp = new long[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Space-optimized: O(1) — only need the last two values
static long fibOpt(int n) {
    if (n <= 1) return n;
    long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
    typescript: `function fib(n: number): number {
  if (n <= 1) return n;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}

// Space-optimized: O(1)
function fibOpt(n: number): number {
  if (n <= 1) return n;
  let [prev2, prev1] = [0, 1];
  for (let i = 2; i <= n; i++) [prev2, prev1] = [prev1, prev1 + prev2];
  return prev1;
}`,
    python: `def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space-optimized: O(1)
def fib_opt(n):
    if n <= 1: return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1`,
  }),

  topic({
    id: "alg-dp-coin-change",
    title: "Coin Change (DP)",
    family: "Dynamic Programming",
    summary: "Find the minimum number of coins to make an exact amount — the canonical example showing why greedy fails and DP is necessary.",
    problem: "Given coin denominations and a target amount, find the minimum number of coins. Greedy (always pick the largest coin) fails for arbitrary coin sets: coins=[1,3,4], amount=6 — greedy picks 4+1+1=3, but 3+3=2 is optimal.",
    whyExists: "Coin change is the canonical DP teaching example because it demonstrates both optimal substructure and why greedy fails. The minimum coins for amount A depends on minimum coins for amounts A-coin for every coin denomination.",
    history: "The coin change problem appears in Bellman's foundational DP papers. It is among the most common interview questions at every major tech company because it cleanly separates greedy from DP reasoning.",
    prerequisites: ["Dynamic Programming fundamentals", "Arrays"],
    dataStructures: ["1D DP array indexed by amount"],
    naiveApproach: "Try every combination recursively. O(amount^coins) — exponential because the same sub-amounts are recomputed in every branch.",
    optimizedApproach: "Build dp[0..amount] where dp[a] = minimum coins for amount a. For each amount and each coin: dp[a] = min(dp[a], dp[a - coin] + 1). Fill from 0 to target.",
    mechanics: [
      "Initialize dp[0] = 0 (zero coins for amount zero).",
      "Initialize dp[1..amount] = amount + 1 as a sentinel representing 'impossible'.",
      "For each amount a from 1 to target: for each coin denomination c:",
      "  If c <= a: dp[a] = min(dp[a], dp[a - c] + 1).",
      "Return dp[amount] if it is not the sentinel value; otherwise -1.",
    ],
    visualization: [
      "Coins=[1,2,5], amount=11:",
      "  dp[0]=0, dp[1]=1(1-coin), dp[2]=1(2-coin)",
      "  dp[3]=2(2+1), dp[4]=2(2+2), dp[5]=1(5-coin)",
      "  dp[6]=2(5+1), dp[10]=2(5+5)",
      "  dp[11]=3(5+5+1) → answer: 3",
    ],
    complexity: [
      { label: "Time", value: "O(amount × coins)" },
      { label: "Space", value: "O(amount)" },
      { label: "Naive", value: "O(amount^coins)" },
    ],
    memoryBehavior: "The dp array has (amount + 1) entries. For interview amounts up to 10,000 this is trivial. For floating-point amounts, convert to integer cents first.",
    scalability: "Scales linearly in amount × coin types. The bottleneck is the dp array size, not computation. For very large amounts with few coin types, a closed-form or greedy variant (for canonical coin sets) is more practical.",
    tradeoffs: [
      "O(amount × k) vs exponential naive — a dramatic improvement.",
      "Greedy is O(k log k) but only optimal for canonical coin sets (US coins).",
      "Space is already optimal at O(amount).",
    ],
    edgeCases: [
      "Amount 0: return 0 immediately.",
      "No solution: all dp values remain at the sentinel — return -1.",
      "Coin larger than amount: skip it in the inner loop (the coin <= a guard handles this).",
    ],
    beginnerMistakes: [
      "Using greedy — it fails for arbitrary coin denominations.",
      "Initializing dp with 0 instead of a sentinel, causing incorrect minimums.",
      "Missing the coin <= a guard, causing negative index access.",
    ],
    interviewQuestions: [
      "Find the minimum number of coins to make an amount (LeetCode 322).",
      "Count the number of ways to make an amount (change inner loop to +=1 instead of min).",
      "Reconstruct which coins were actually used.",
    ],
    interviewerFocus: "Whether you can explain why greedy fails and set up the DP state from first principles.",
    engineeringThinking: "Coin change generalizes to any resource allocation problem: fixed unit costs, minimize count. Appears in memory page allocation, packet segmentation, and task scheduling.",
    pairsBestWith: ["DP fundamentals", "0/1 Knapsack", "Backtracking"],
    whenNotToUse: "When coins form a canonical system where greedy is provably optimal. When amount is so large the dp array doesn't fit in memory.",
    productionUse: "Payment system change-making, memory block allocation, packet segmentation into fixed MTU sizes.",
    databaseRelevance: "Query optimizer selects join order with minimum estimated cost — structurally identical to coin change with 'join cost' as the coin.",
    faangScaleUse: "Ad budget packing, time slot allocation, cloud scheduler resource bin packing.",
    java: `// Naive recursive: O(amount^coins) — exponential
static int coinChangeNaive(int[] coins, int amount) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;
    int min = Integer.MAX_VALUE;
    for (int coin : coins) {
        int sub = coinChangeNaive(coins, amount - coin);
        if (sub >= 0) min = Math.min(min, sub + 1);
    }
    return min == Integer.MAX_VALUE ? -1 : min;
}

// DP tabulation: O(amount × coins), O(amount) space
static int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);   // sentinel: "impossible"
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int coin : coins) {
            if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
    typescript: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}`,
    python: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a:
                dp[a] = min(dp[a], dp[a - coin] + 1)
    return dp[amount] if dp[amount] <= amount else -1`,
  }),

  topic({
    id: "alg-dp-lcs",
    title: "Longest Common Subsequence",
    family: "Dynamic Programming",
    summary: "Find the longest sequence of characters that appears in both strings in the same relative order — the foundation of diff tools, DNA alignment, and version control.",
    problem: "Given two strings, find the length of the longest common subsequence. A subsequence preserves relative order but need not be contiguous: 'ACE' is a subsequence of 'ABCDE'. Substring must be contiguous; subsequence need not be.",
    whyExists: "LCS underlies the unified diff format (git diff), DNA/protein sequence alignment, plagiarism detection, and merge conflict resolution. The 2D DP pattern it demonstrates appears in dozens of related problems.",
    history: "The DP formulation of LCS was established in the 1960s. The Myers diff algorithm (1986) is an optimized LCS variant used in Git. Biological sequence alignment tools like BLAST use LCS-based DP at genome scale.",
    prerequisites: ["DP fundamentals", "2D arrays", "String indexing"],
    dataStructures: ["2D DP array dp[m+1][n+1]"],
    naiveApproach: "Recursively compare all subsequences of both strings. O(2^m × 2^n) — exponential in both lengths.",
    optimizedApproach: "dp[i][j] = LCS length of first i characters of a and first j characters of b. If a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1] + 1 (extend). Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]) (skip one character from either side).",
    mechanics: [
      "Initialize dp[0][j] = 0 and dp[i][0] = 0 — LCS with an empty string is 0.",
      "For each (i, j): if characters match, extend the diagonal: dp[i-1][j-1] + 1.",
      "If characters don't match, take the better of skipping one from either string.",
      "dp[m][n] is the final answer.",
      "Backtrack from dp[m][n] to reconstruct the actual subsequence string.",
    ],
    visualization: [
      "a='ABCD', b='ACDF':",
      "       '' A  C  D  F",
      "  ''    0  0  0  0  0",
      "  A     0  1  1  1  1",
      "  B     0  1  1  1  1",
      "  C     0  1  2  2  2",
      "  D     0  1  2  3  3",
      "LCS length = 3 (ACD)",
    ],
    complexity: [
      { label: "Time", value: "O(m × n)" },
      { label: "Space", value: "O(m × n)" },
      { label: "Space optimized", value: "O(min(m, n))" },
    ],
    memoryBehavior: "Full 2D table is O(m × n). For strings of length 1,000 each, this is 1M entries — trivial. For genome sequences of 30,000 characters each, this is 900M entries — use space-optimized rolling array or heuristic alignment (BLAST).",
    scalability: "O(m × n) is optimal for the general case. For very long biological sequences, Hunt-Szymanski (for sparse matches) or heuristic alignment is used. Space optimization to O(n) loses the ability to reconstruct the sequence without Hirschberg's algorithm.",
    tradeoffs: [
      "O(m × n) is optimal for comparison-based LCS.",
      "Full table is needed to reconstruct the actual sequence — space optimization sacrifices reconstruction.",
      "Substring (contiguous) match is a different problem — use sliding window or KMP.",
    ],
    edgeCases: [
      "One empty string: LCS = 0.",
      "Identical strings: LCS = full string length.",
      "No common characters: LCS = 0.",
    ],
    beginnerMistakes: [
      "Confusing subsequence (non-contiguous) with substring (contiguous).",
      "Off-by-one when indexing dp[i][j] vs a[i] — the table is padded by one row and column.",
      "Forgetting to initialize the first row and column to zero.",
    ],
    interviewQuestions: [
      "Find the LCS length of two strings (LeetCode 1143).",
      "Reconstruct the actual LCS string.",
      "Count minimum insertions and deletions to convert one string to another (= m + n - 2 * LCS).",
      "Find the shortest common supersequence.",
    ],
    interviewerFocus: "Whether you derive the recurrence from first principles — the match case extending the diagonal, the mismatch case taking the max of skipping either side.",
    engineeringThinking: "Git's diff algorithm is a Myers diff (an O(n + d²) LCS variant where d is the edit distance). Understanding LCS explains why diff output shows what it does and why merging two divergent branches sometimes conflicts.",
    pairsBestWith: ["Edit Distance", "Shortest Common Supersequence", "String comparison"],
    whenNotToUse: "For contiguous matching, use KMP or sliding window. For large-scale fuzzy search, use inverted indexes with n-gram overlap instead.",
    productionUse: "Git diff/merge, DNA/protein sequence alignment, plagiarism detection, spell-checking, document comparison tools.",
    databaseRelevance: "Schema migration tools use diff algorithms to detect renamed or reordered columns. Text indexing uses LCS-based similarity for fuzzy search.",
    faangScaleUse: "Code review diff display, document comparison, genome alignment pipelines, speech recognition transcript alignment.",
    java: `// LCS length — O(m × n) time and space
static int lcs(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a.charAt(i-1) == b.charAt(j-1))
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}

// Reconstruct the actual LCS string by backtracking
static String lcsString(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i-1) == b.charAt(j-1)
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    StringBuilder sb = new StringBuilder();
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (a.charAt(i-1) == b.charAt(j-1)) { sb.append(a.charAt(i-1)); i--; j--; }
        else if (dp[i-1][j] > dp[i][j-1]) i--;
        else j--;
    }
    return sb.reverse().toString();
}`,
    typescript: `function lcs(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
    python: `def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
  }),

  topic({
    id: "alg-dp-edit-distance",
    title: "Edit Distance (Levenshtein)",
    family: "Dynamic Programming",
    summary: "Find the minimum number of single-character insertions, deletions, and substitutions to transform one string into another.",
    problem: "Spell checkers need to know how 'close' a misspelled word is to dictionary entries. Edit distance quantifies closeness as the count of operations needed — 'kitten' to 'sitting' is distance 3.",
    whyExists: "Vladimir Levenshtein described this metric in 1965 for error detection in binary codes. It became the standard string similarity measure because it captures what humans recognize as closeness better than character-overlap counts.",
    history: "Levenshtein (1965) for binary codes. Applied to spelling correction (1970s), DNA alignment (1980s), speech recognition (1990s). Today it powers autocorrect on every mobile keyboard.",
    prerequisites: ["DP fundamentals", "LCS", "2D arrays"],
    dataStructures: ["2D DP array dp[m+1][n+1]"],
    naiveApproach: "Try all edit operations recursively — exponential time as options branch at every character.",
    optimizedApproach: "dp[i][j] = minimum edits to convert first i characters of a into first j characters of b. Match: dp[i][j] = dp[i-1][j-1] (free). Mismatch: dp[i][j] = 1 + min(substitute, delete, insert).",
    mechanics: [
      "dp[i][0] = i: delete all i characters from a to reach empty string.",
      "dp[0][j] = j: insert j characters to reach b from empty string.",
      "If a[i-1] == b[j-1]: dp[i][j] = dp[i-1][j-1] (characters match — no operation needed).",
      "Else: dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]).",
      "Three operations: diagonal = substitute, up = delete from a, left = insert into a.",
    ],
    visualization: [
      "a='cat', b='cut':",
      "       '' c  u  t",
      "  ''    0  1  2  3",
      "  c     1  0  1  2",
      "  a     2  1  1  2",
      "  t     3  2  2  1",
      "Edit distance = 1 (substitute a → u)",
    ],
    complexity: [
      { label: "Time", value: "O(m × n)" },
      { label: "Space", value: "O(m × n)" },
      { label: "Space optimized", value: "O(n) rolling rows" },
    ],
    memoryBehavior: "Same structure as LCS. Rolling array reduces to O(n) by keeping only the current and previous rows, at the cost of losing the ability to reconstruct the edit sequence.",
    scalability: "O(m × n) is optimal for the general case. Approximate algorithms (threshold-bounded DP) exit early when distance exceeds a budget, reducing practical cost. For large-scale fuzzy search, trigram overlap (PostgreSQL pg_trgm) approximates edit distance without computing the full table.",
    tradeoffs: [
      "Exact edit distance is O(m × n) — no significantly faster general algorithm is known.",
      "Symmetric: ed(a,b) = ed(b,a) — enables efficient batching.",
      "For very long strings, approximate algorithms using bit-parallelism are faster in practice.",
    ],
    edgeCases: [
      "One empty string: distance equals the other string's length.",
      "Identical strings: distance = 0.",
      "Single character difference: distance = 1.",
    ],
    beginnerMistakes: [
      "Forgetting the base case initialization (first row and column).",
      "Confusing which cell corresponds to which operation: diagonal=substitute, up=delete, left=insert.",
    ],
    interviewQuestions: [
      "Implement edit distance (LeetCode 72).",
      "What is the edit distance between 'horse' and 'ros'? Walk through the table.",
      "How does edit distance relate to LCS? (ed(a,b) = m + n - 2*LCS(a,b) when only insertions and deletions are allowed.)",
    ],
    interviewerFocus: "Whether you derive the three-operation recurrence from first principles rather than recall it.",
    engineeringThinking: "Edit distance powers spell-check suggestions (words within distance 1 or 2 from the misspelling), autocorrect on mobile keyboards, fuzzy string search, DNA alignment, and git blame's line attribution.",
    pairsBestWith: ["LCS", "Trie (for dictionary lookup)", "Approximate string matching"],
    whenNotToUse: "For exact string matching, use KMP or Rabin-Karp. For large-scale fuzzy search, use inverted indexes with n-gram overlap.",
    productionUse: "Spell checkers, mobile autocorrect, DNA/protein alignment, git diff/blame, search engine query correction, plagiarism detection.",
    databaseRelevance: "PostgreSQL pg_trgm uses trigram overlap (an approximation of edit distance) for fast fuzzy full-text search. Elasticsearch fuzzy queries compute edit distance against index terms.",
    faangScaleUse: "Google spelling correction, genome sequencing pipelines, voice recognition phoneme alignment, query suggestion in search autocomplete.",
    java: `static int editDistance(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a.charAt(i-1) == b.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1];           // match: free
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j-1],                   // substitute
                    Math.min(dp[i-1][j], dp[i][j-1])); // delete / insert
            }
        }
    }
    return dp[m][n];
}`,
    typescript: `function editDistance(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}`,
    python: `def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
  }),

  // ── Concurrency ────────────────────────────────────────────────────────────

  topic({
    id: "alg-mutex-semaphore",
    title: "Mutex and Semaphore",
    family: "Concurrency",
    summary: "Synchronization primitives that protect shared state from concurrent modification — a mutex for exclusive access, a semaphore for bounded concurrent access.",
    problem: "When two threads read, modify, and write the same variable concurrently, the result is unpredictable. Both threads may read the same old value before either writes back, causing a lost update. This is a race condition.",
    whyExists: "Multi-core CPUs run threads truly simultaneously. Without coordination, concurrent reads and writes produce incorrect results. A counter incremented by two threads simultaneously may increment only once because both read the same old value before writing.",
    history: "Edsger Dijkstra introduced the semaphore in 1965 with P (acquire/wait) and V (release/signal) operations. The mutex (binary semaphore) became the standard synchronization primitive in POSIX threads (1995) and all major languages.",
    prerequisites: ["Threads and processes", "Memory and references"],
    dataStructures: ["Lock/Mutex object", "Semaphore counter"],
    naiveApproach: "Increment a shared counter from multiple threads without locking. With 100 threads each incrementing 1,000 times, the result may be far less than 100,000 due to lost updates.",
    optimizedApproach: "Wrap the read-modify-write critical section in a mutex lock/unlock pair. One thread holds the lock; others block. Use a semaphore when N concurrent accesses are permitted (e.g., connection pool of size 10).",
    mechanics: [
      "Mutex has two states: locked and unlocked. lock() blocks until available, then acquires. unlock() releases.",
      "Only the thread that locked a mutex should unlock it — ownership invariant.",
      "Semaphore has a counter. acquire() decrements; if 0, the thread blocks. release() increments and unblocks a waiting thread.",
      "A binary semaphore (counter initialized to 1) is equivalent to a mutex.",
      "Always release in a finally block — an exception inside the critical section must not leave the lock held forever.",
    ],
    visualization: [
      "Race condition (no lock):",
      "  Thread A reads counter=0, Thread B reads counter=0",
      "  Thread A writes 1, Thread B writes 1 → counter=1 (WRONG, expected 2)",
      "With mutex:",
      "  Thread A locks, reads 0, writes 1, unlocks",
      "  Thread B locks, reads 1, writes 2, unlocks → counter=2 (CORRECT)",
    ],
    complexity: [
      { label: "Lock (uncontested)", value: "O(1)" },
      { label: "Lock (contested)", value: "O(1) + wait" },
      { label: "AtomicInteger CAS", value: "O(1) hardware" },
    ],
    memoryBehavior: "A mutex is a small struct in runtime memory. The bottleneck is the critical section's hold time, not the lock itself. For single-counter increments, use AtomicInteger (hardware CAS) instead — no OS lock, no thread park.",
    scalability: "Mutexes serialize access — adding threads does not improve throughput inside a locked section. For read-heavy workloads, use ReadWriteLock: many readers proceed simultaneously, writers get exclusive access. For high-contention counters, use atomic integers.",
    tradeoffs: [
      "Mutex correctness is simple to reason about. Throughput under contention is the cost.",
      "Fine-grained locking (per row, per shard) reduces contention but increases deadlock risk.",
      "Coarse-grained locking (one global lock) is safe but becomes a bottleneck at scale.",
      "Lock-free algorithms use hardware CAS and avoid OS-level locks but are complex to implement correctly.",
    ],
    edgeCases: [
      "Not releasing in finally block — leaves lock held if an exception occurs inside the critical section.",
      "Acquiring the same non-reentrant mutex twice from the same thread — deadlock.",
      "Spurious wakeups from condition variables — always check the condition in a while loop, not an if.",
    ],
    beginnerMistakes: [
      "Locking at too coarse a granularity — serializing the entire application instead of just the shared state.",
      "Using synchronized at the method level when only one field needs protection.",
      "Forgetting that ++ is not atomic — it is read, increment, write: three operations.",
    ],
    interviewQuestions: [
      "What is a race condition? Give a concrete example.",
      "What is the difference between a mutex and a semaphore?",
      "Why must lock release always be in a finally block?",
      "When would you prefer AtomicInteger over a ReentrantLock?",
    ],
    interviewerFocus: "Whether you explain race conditions from first principles — not just 'use synchronized'.",
    engineeringThinking: "Concurrency bugs are among the hardest to debug because they are non-deterministic and timing-dependent. Production systems prefer immutable data, message-passing architectures, and actor models to minimize the need for explicit locks.",
    pairsBestWith: ["Producer-Consumer", "Deadlock Detection", "Atomic operations", "Thread pools"],
    whenNotToUse: "For read-heavy workloads, use ReadWriteLock. For simple counter updates, use AtomicInteger. For cross-service coordination, use message queues rather than in-process locks.",
    productionUse: "Database connection pools, in-memory caches, web server thread pools, shared configuration updates, file system access serialization.",
    databaseRelevance: "Database engines use latches (lightweight mutexes) to protect buffer pool pages. Row-level locks are a higher-level mutex applied to rows. MVCC reduces lock contention by giving readers a consistent snapshot.",
    faangScaleUse: "FAANG systems minimize in-process locks by using immutable data, actor models, and message-passing. When locks appear, they are instrumented to detect contention and tuned aggressively.",
    distributedImplications: "Distributed locks (Redis SETNX, ZooKeeper ephemeral nodes, etcd leases) extend the mutex concept across processes. They require TTLs and fencing tokens to handle node failure — a distributed lock that never releases is worse than no lock.",
    java: `import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicInteger;

// Race condition — WRONG: ++ is read-modify-write, not atomic
static int unsafeCounter = 0;
static void incrementUnsafe() { unsafeCounter++; }

// Mutex: ReentrantLock
static int counter = 0;
static final ReentrantLock lock = new ReentrantLock();
static void increment() {
    lock.lock();
    try {
        counter++;     // critical section
    } finally {
        lock.unlock(); // always release, even on exception
    }
}

// AtomicInteger: hardware CAS — no OS lock, faster for counters
static final AtomicInteger atomicCounter = new AtomicInteger(0);
static void incrementAtomic() { atomicCounter.incrementAndGet(); }

// Semaphore: at most N concurrent DB connections
static final Semaphore dbPool = new Semaphore(10);
static void queryDatabase() throws InterruptedException {
    dbPool.acquire();
    try {
        // at most 10 threads here concurrently
    } finally {
        dbPool.release();
    }
}`,
    typescript: `import { Mutex } from 'async-mutex';

// Async mutex for protecting shared state in async/await code
const mutex = new Mutex();
let sharedCounter = 0;

async function increment(): Promise<void> {
  const release = await mutex.acquire();
  try {
    sharedCounter++;
  } finally {
    release();
  }
}

// Atomics for SharedArrayBuffer (Worker threads)
const sab = new SharedArrayBuffer(4);
const shared = new Int32Array(sab);
Atomics.add(shared, 0, 1);  // atomic increment across workers`,
    python: `import threading

# Race condition
counter = 0
def increment_unsafe():
    global counter
    counter += 1  # not guaranteed atomic even with GIL

# Lock (mutex)
lock = threading.Lock()
counter = 0
def increment():
    global counter
    with lock:          # context manager: acquire on enter, release on exit
        counter += 1

# Semaphore: allow N concurrent accesses
semaphore = threading.Semaphore(10)
def query_database():
    with semaphore:
        pass  # at most 10 threads here concurrently`,
  }),

  topic({
    id: "alg-producer-consumer",
    title: "Producer-Consumer",
    family: "Concurrency",
    summary: "Decouple producers (work generators) from consumers (work processors) using a shared bounded buffer, coordinating via blocking queues to apply natural backpressure.",
    problem: "A producer generates work faster than a consumer processes it. Direct coupling stalls both — the producer must wait when the consumer is full, the consumer must wait when empty. A bounded buffer lets them run independently while preventing unbounded memory growth.",
    whyExists: "Producer-consumer separates concerns and improves throughput. It maps directly to thread pools, message queues (Kafka, RabbitMQ), async I/O pipelines, and stream processing in every production system.",
    history: "Dijkstra formalized the bounded buffer problem in 1965 as a semaphore exercise. Java's BlockingQueue (Java 5, 2004) gave a clean API. Reactive streams (2013) generalized the backpressure contract across async systems.",
    prerequisites: ["Mutex and Semaphore", "Threads", "Queues"],
    dataStructures: ["Blocking queue (bounded buffer)"],
    naiveApproach: "Producer adds all items sequentially, then consumer processes them all. No concurrency — full serialization and potentially unbounded memory accumulation.",
    optimizedApproach: "Use a bounded BlockingQueue: producer calls put() which blocks when full; consumer calls take() which blocks when empty. Both run in separate threads; the queue handles all synchronization.",
    mechanics: [
      "Create a bounded BlockingQueue with capacity N — this caps maximum memory usage.",
      "Producer thread: loop, produce an item, call queue.put(item). Blocks when the buffer is full — this is backpressure.",
      "Consumer thread: loop, call item = queue.take(). Blocks when the buffer is empty. Process the item.",
      "Shutdown: producer adds a poison pill sentinel value (or null); consumer stops when it receives it.",
      "With semaphores: emptySlots (init N) and filledSlots (init 0). Producer acquires emptySlots, adds item, releases filledSlots. Consumer acquires filledSlots, takes item, releases emptySlots.",
    ],
    visualization: [
      "Producer → put() → [buffer capacity N] → take() → Consumer",
      "Buffer full  → Producer BLOCKS (backpressure applied)",
      "Buffer empty → Consumer BLOCKS (waits for work)",
      "Real systems: HTTP request queue, Kafka partition, OS pipe, thread pool",
    ],
    complexity: [
      { label: "put/take", value: "O(1)" },
      { label: "Max throughput", value: "min(produce rate, consume rate)" },
      { label: "Buffer memory", value: "O(N) bounded" },
    ],
    memoryBehavior: "The bounded buffer caps memory at N × item_size regardless of producer speed. This is the critical property — an unbounded queue lets memory grow without limit under sustained overload. Choosing N is a throughput-latency tradeoff: too small starves consumers, too large increases latency.",
    scalability: "Add multiple consumer threads reading from the same queue to scale throughput. Note that processing order is not guaranteed across multiple consumers. For ordered processing, use a single consumer or partition the work by key.",
    tradeoffs: [
      "Decouples producer and consumer — both can be optimized and scaled independently.",
      "Bounded buffer applies automatic backpressure — prevents OOM under sustained overload.",
      "Choosing buffer capacity is a tuning parameter — too small: low throughput, too large: high latency.",
      "Multiple consumers improve throughput but sacrifice ordering guarantees.",
    ],
    edgeCases: [
      "Graceful shutdown: drain the buffer before stopping consumers.",
      "Poison pill: a sentinel item that signals consumers to stop cleanly.",
      "Exception in consumer: don't silently drop the item — log it or send to a dead-letter queue.",
    ],
    beginnerMistakes: [
      "Using an unbounded queue — memory grows without limit under overload.",
      "Not handling the shutdown signal — consumer threads block on empty queues forever.",
      "Forgetting that multiple consumers may process the same logical batch out of order.",
    ],
    interviewQuestions: [
      "Implement a thread-safe bounded buffer.",
      "What is backpressure and how does a bounded buffer implement it?",
      "How would you shut down a producer-consumer system gracefully?",
      "What happens if you use an unbounded queue in a production system under load?",
    ],
    interviewerFocus: "Whether you understand backpressure and can explain why bounded queues are necessary in production.",
    engineeringThinking: "Kafka is a durable, distributed, replicated bounded buffer. Thread pools are producer-consumer systems where HTTP requests are the items. The bounded-buffer insight applies at every scale: without backpressure, the fast side fills memory and crashes the slow side.",
    pairsBestWith: ["Mutex and Semaphore", "Thread pools", "Queue data structure", "Deadlock detection"],
    whenNotToUse: "When work is trivially fast and synchronous processing is cleaner. When strict ordering across multiple consumers is required — use a single consumer or partitioned queues.",
    productionUse: "Web server request queues, database connection pools, log aggregation pipelines, async notification delivery, video encoding pipelines.",
    databaseRelevance: "Database write-ahead logs use producer-consumer: writers produce log records, a background flusher consumes and persists them. Replication streams are producer-consumer between primary and replicas.",
    faangScaleUse: "Kafka is the canonical large-scale producer-consumer. Feed ranking pipelines use producer-consumer queues at each stage. Ad serving systems use thread-pool-backed queues to handle traffic spikes.",
    distributedImplications: "Kafka, RabbitMQ, and SQS are distributed bounded buffers with durability, replication, and consumer group coordination. The same backpressure concept applies: a Kafka consumer that falls behind applies backpressure by slowing its reads, which is visible as consumer lag.",
    java: `import java.util.concurrent.*;

static final BlockingQueue<Integer> queue = new LinkedBlockingQueue<>(100);

static class Producer implements Runnable {
    public void run() {
        try {
            for (int i = 0; i < 200; i++) {
                queue.put(i);     // blocks when queue is full (backpressure)
            }
            queue.put(-1);        // poison pill: signal consumer to stop
        } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }
}

static class Consumer implements Runnable {
    public void run() {
        try {
            while (true) {
                int item = queue.take();   // blocks when queue is empty
                if (item == -1) break;     // poison pill received: stop
                process(item);
            }
        } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }
    static void process(int item) { /* do work */ }
}

static void run() throws Exception {
    ExecutorService exec = Executors.newFixedThreadPool(2);
    exec.submit(new Producer());
    exec.submit(new Consumer());
    exec.shutdown();
    exec.awaitTermination(30, TimeUnit.SECONDS);
}`,
    typescript: `// Node.js: async generator as producer, for-await as consumer
async function* produce(): AsyncGenerator<number> {
  for (let i = 0; i < 100; i++) {
    await new Promise(r => setTimeout(r, 10)); // simulate async work
    yield i;
  }
}

async function consume(): Promise<void> {
  for await (const item of produce()) {
    await process(item);
  }
}

async function process(item: number): Promise<void> {
  // process the item
}`,
    python: `import threading
import queue

def producer(q: queue.Queue, n: int) -> None:
    for i in range(n):
        q.put(i)       # blocks when queue is full (maxsize)
    q.put(None)        # poison pill

def consumer(q: queue.Queue) -> None:
    while True:
        item = q.get() # blocks when queue is empty
        if item is None: break
        process(item)

def process(item: int) -> None:
    pass

def run() -> None:
    q = queue.Queue(maxsize=20)   # bounded buffer: max 20 items
    t_prod = threading.Thread(target=producer, args=(q, 100))
    t_cons = threading.Thread(target=consumer, args=(q,))
    t_prod.start(); t_cons.start()
    t_prod.join(); t_cons.join()`,
  }),

  topic({
    id: "alg-deadlock",
    title: "Deadlock Detection and Prevention",
    family: "Concurrency",
    summary: "Detect and prevent circular waiting — the condition where threads hold resources that other threads need, causing all involved threads to block forever.",
    problem: "Thread A holds Lock 1 and waits for Lock 2. Thread B holds Lock 2 and waits for Lock 1. Neither can proceed. Both block forever. This is deadlock — a circular dependency on resources.",
    whyExists: "Deadlock is an emergent property of concurrent systems with multiple resources. It cannot be prevented purely by using mutexes correctly — it requires either a global lock ordering policy, timeouts, or a resource allocation design that eliminates circular waiting.",
    history: "Dijkstra's Banker's Algorithm (1965) was the first formal deadlock avoidance algorithm. Java 6 (2006) added ThreadMXBean.findDeadlockedThreads() for runtime detection. Modern production systems rely on timeouts and lock ordering rather than avoidance algorithms.",
    prerequisites: ["Mutex and Semaphore", "Graphs (cycle detection)"],
    dataStructures: ["Resource allocation graph (directed graph)", "Lock objects"],
    naiveApproach: "Acquire locks in any order dictated by code flow. Two code paths that acquire two locks in opposite order will deadlock under the right interleaving.",
    optimizedApproach: "Prevention: assign a global numeric ID to every lock and always acquire in ascending ID order. This eliminates circular wait. Detection: model the resource allocation as a directed graph and run cycle detection (DFS). Recovery: use trylock with timeout and release-and-retry.",
    mechanics: [
      "Coffman conditions (all four must hold for deadlock): mutual exclusion, hold-and-wait, no preemption, circular wait.",
      "Breaking any one condition prevents deadlock. Lock ordering breaks circular wait.",
      "Lock ordering: assign a global numeric ID to each lock. Always acquire in ascending order. Thread A and Thread B both acquire lock1 before lock2 — circular wait is impossible.",
      "Trylock with timeout: if a lock cannot be acquired within a timeout, release all held locks and retry. Breaks hold-and-wait.",
      "Detection: build a wait-for graph (thread → lock it needs, lock → thread that holds it). A cycle in this graph = deadlock.",
    ],
    visualization: [
      "Deadlock wait-for graph:",
      "  Thread A → waiting for Lock2",
      "  Lock2    → held by Thread B",
      "  Thread B → waiting for Lock1",
      "  Lock1    → held by Thread A",
      "  Cycle: A → Lock2 → B → Lock1 → A = deadlock",
    ],
    complexity: [
      { label: "Cycle detection", value: "O(V + E)" },
      { label: "Lock order check", value: "O(1) per acquisition" },
      { label: "Trylock timeout", value: "O(1) + wait" },
    ],
    memoryBehavior: "The wait-for graph has one node per thread and one per lock. In systems with thousands of threads and hundreds of locks, the graph is small. Java's ThreadMXBean introspects the JVM lock wait graph without additional memory overhead.",
    scalability: "Lock ordering has zero runtime overhead. Detection requires periodic graph snapshots or JVM instrumentation. Distributed deadlock detection across microservices is rarely done — systems use idempotent retries, optimistic locking, and timeouts instead.",
    tradeoffs: [
      "Lock ordering is the simplest prevention strategy — zero runtime cost, requires discipline.",
      "Timeouts prevent deadlock and livelock but add retry complexity.",
      "Lock-free algorithms eliminate locks entirely but are difficult to implement correctly.",
      "Detection and recovery (killing threads or rolling back transactions) is disruptive — used as last resort.",
    ],
    edgeCases: [
      "Reentrant deadlock: a thread acquires the same non-reentrant lock twice in the same call chain.",
      "Livelock: threads retry in a loop but keep blocking each other — CPU usage is high but no progress.",
      "Priority inversion: a high-priority thread waits on a lock held by a low-priority thread.",
    ],
    beginnerMistakes: [
      "Acquiring locks in inconsistent order across different code paths — the deadlock only manifests under specific interleavings that may not appear in tests.",
      "Not using try/finally to release locks — an exception leaves the lock permanently held.",
      "Locking at the class level (synchronized on the class object) when only one instance needs protection.",
    ],
    interviewQuestions: [
      "What are the four conditions required for deadlock?",
      "How does lock ordering prevent deadlock?",
      "What is the difference between deadlock and livelock?",
      "How would you detect a deadlock in a running Java application?",
    ],
    interviewerFocus: "Whether you understand the Coffman conditions and can explain why lock ordering breaks circular wait — not just 'don't use nested locks'.",
    engineeringThinking: "Production deadlocks are detected via thread dumps (jstack, kill -3), heap dumps, and APM agents that monitor thread pool saturation. Prevention is architectural: short critical sections, immutable data, message-passing over shared state, and structured concurrency frameworks.",
    pairsBestWith: ["Mutex and Semaphore", "Producer-Consumer", "Graphs — DFS cycle detection"],
    whenNotToUse: "When you cannot avoid multiple locks, use lock ordering or structured concurrency frameworks (Java virtual threads, Python asyncio) that manage locking for you.",
    productionUse: "Database engines detect row-lock deadlocks and auto-roll back one transaction. JVM thread dumps expose lock contention. ORMs can deadlock when nested transactions hold connections from the same pool.",
    databaseRelevance: "PostgreSQL's deadlock detector runs every deadlock_timeout (default 1s), builds a wait-for graph of row-level lock holders, and rolls back one of the deadlocked transactions with a clear error message.",
    faangScaleUse: "FAANG-scale distributed systems avoid inter-service locks by using idempotent operations, compare-and-swap in distributed stores (ZooKeeper, etcd), and optimistic concurrency control with version numbers.",
    distributedImplications: "Distributed deadlock requires distributed lock coordination (ZooKeeper, Redis Redlock). Most systems avoid it entirely by using leases with TTLs and fencing tokens. If a lock holder dies, the TTL expires and another process can acquire it.",
    java: `// DEADLOCK-PRONE: inconsistent lock order
static final Object lock1 = new Object();
static final Object lock2 = new Object();

static void threadA() throws InterruptedException {
    synchronized (lock1) {
        Thread.sleep(50);
        synchronized (lock2) { /* work */ }  // waits for lock2 held by B
    }
}

static void threadB() throws InterruptedException {
    synchronized (lock2) {
        Thread.sleep(50);
        synchronized (lock1) { /* work */ }  // waits for lock1 held by A — DEADLOCK
    }
}

// PREVENTION: always acquire lock1 before lock2 (consistent order)
static void threadBFixed() throws InterruptedException {
    synchronized (lock1) {       // same order as threadA
        synchronized (lock2) { /* work */ }
    }
}

// DETECTION: Java built-in deadlock detector via ThreadMXBean
import java.lang.management.*;
static void detectDeadlock() {
    ThreadMXBean bean = ManagementFactory.getThreadMXBean();
    long[] deadlocked = bean.findDeadlockedThreads();
    if (deadlocked != null) {
        for (ThreadInfo ti : bean.getThreadInfo(deadlocked)) {
            System.err.println("DEADLOCK: " + ti.getThreadName()
                + " waiting for " + ti.getLockName()
                + " held by " + ti.getLockOwnerName());
        }
    }
}`,
    typescript: `// Prevention: enforce lock ordering by numeric ID
class OrderedLock {
  private id: number;
  private locked = false;
  private waiters: Array<() => void> = [];
  constructor(id: number) { this.id = id; }
  get lockId() { return this.id; }
  async acquire(): Promise<void> {
    if (!this.locked) { this.locked = true; return; }
    return new Promise(resolve => this.waiters.push(resolve));
  }
  release(): void {
    if (this.waiters.length) this.waiters.shift()!();
    else this.locked = false;
  }
}

// Always acquire lower-id lock first — breaks circular wait
async function safeAcquireBoth(a: OrderedLock, b: OrderedLock): Promise<void> {
  const [first, second] = a.lockId < b.lockId ? [a, b] : [b, a];
  await first.acquire();
  await second.acquire();
}`,
    python: `import threading, time

lock1 = threading.Lock()
lock2 = threading.Lock()

# DEADLOCK-PRONE
def thread_a():
    with lock1:
        time.sleep(0.05)
        with lock2: pass   # waits for lock2 held by thread_b

def thread_b_deadlock():
    with lock2:
        time.sleep(0.05)
        with lock1: pass   # waits for lock1 held by thread_a — DEADLOCK

# PREVENTION: consistent lock order
def thread_b():
    with lock1:            # same order as thread_a
        with lock2: pass

# TRYLOCK with timeout: break hold-and-wait
def thread_safe():
    while True:
        got1 = lock1.acquire(timeout=0.1)
        if not got1: continue
        got2 = lock2.acquire(timeout=0.1)
        if not got2:
            lock1.release()
            time.sleep(0.01)
            continue
        try:
            pass  # do work with both locks held
        finally:
            lock2.release()
            lock1.release()
        break`,
  }),
];

type LanguageOverride = {
  typescript: AlgorithmLanguageExample;
  python: AlgorithmLanguageExample;
};

function lang(
  typescript: string,
  python: string,
  optimizedTypescript = typescript,
  optimizedPython = python,
): LanguageOverride {
  return {
    typescript: { naiveCode: typescript, optimizedCode: optimizedTypescript },
    python: { naiveCode: python, optimizedCode: optimizedPython },
  };
}

const languageOverrides: Record<string, LanguageOverride> = {
  "alg-what-is-an-algorithm": lang(
    `function hasDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,
    `def has_duplicate(nums):
    seen = set()
    for n in nums:
        if n in seen:
            return True
        seen.add(n)
    return False`,
  ),
  "alg-bubble-sort": lang(
    `function bubbleSort(a: number[]): void {
  for (let end = a.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      if (a[i] > a[i + 1]) [a[i], a[i + 1]] = [a[i + 1], a[i]];
    }
  }
}`,
    `def bubble_sort(a):
    for end in range(len(a) - 1, 0, -1):
        for i in range(end):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]`,
    `function bubbleSortOptimized(a: number[]): void {
  for (let end = a.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
}`,
    `def bubble_sort_optimized(a):
    for end in range(len(a) - 1, 0, -1):
        swapped = False
        for i in range(end):
            if a[i] > a[i + 1]:
                a[i], a[i + 1] = a[i + 1], a[i]
                swapped = True
        if not swapped:
            break`,
  ),
  "alg-selection-sort": lang(
    `function selectionSort(a: number[]): void {
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
    [a[i], a[min]] = [a[min], a[i]];
  }
}`,
    `def selection_sort(a):
    for i in range(len(a) - 1):
        min_i = i
        for j in range(i + 1, len(a)):
            if a[j] < a[min_i]:
                min_i = j
        a[i], a[min_i] = a[min_i], a[i]`,
  ),
  "alg-insertion-sort": lang(
    `function insertionSort(a: number[]): void {
  for (let i = 1; i < a.length; i++) {
    const value = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > value) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = value;
  }
}`,
    `def insertion_sort(a):
    for i in range(1, len(a)):
        value = a[i]
        j = i - 1
        while j >= 0 and a[j] > value:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = value`,
  ),
  "alg-merge-sort": lang(
    `function mergeSort(a: number[]): number[] {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const out: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return out.concat(left.slice(i), right.slice(j));
}`,
    `def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]`,
  ),
  "alg-quicksort": lang(
    `function quickSort(a: number[], lo = 0, hi = a.length - 1): void {
  if (lo >= hi) return;
  const p = partition(a, lo, hi);
  quickSort(a, lo, p - 1);
  quickSort(a, p + 1, hi);
}
function partition(a: number[], lo: number, hi: number): number {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] <= pivot) [a[i++], a[j]] = [a[j], a[i]];
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}`,
    `def quick_sort(a, lo=0, hi=None):
    if hi is None:
        hi = len(a) - 1
    if lo >= hi:
        return
    p = partition(a, lo, hi)
    quick_sort(a, lo, p - 1)
    quick_sort(a, p + 1, hi)

def partition(a, lo, hi):
    pivot, i = a[hi], lo
    for j in range(lo, hi):
        if a[j] <= pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]
    return i`,
  ),
  "alg-heap-sort": lang(
    `function heapSort(a: number[]): void {
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) siftDown(a, i, a.length);
  for (let end = a.length - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]];
    siftDown(a, 0, end);
  }
}
function siftDown(a: number[], i: number, n: number): void {
  while (true) {
    let largest = i, left = 2 * i + 1, right = left + 1;
    if (left < n && a[left] > a[largest]) largest = left;
    if (right < n && a[right] > a[largest]) largest = right;
    if (largest === i) return;
    [a[i], a[largest]] = [a[largest], a[i]];
    i = largest;
  }
}`,
    `def heap_sort(a):
    def sift_down(i, n):
        while True:
            largest, left, right = i, 2 * i + 1, 2 * i + 2
            if left < n and a[left] > a[largest]: largest = left
            if right < n and a[right] > a[largest]: largest = right
            if largest == i: return
            a[i], a[largest] = a[largest], a[i]
            i = largest
    for i in range(len(a) // 2 - 1, -1, -1): sift_down(i, len(a))
    for end in range(len(a) - 1, 0, -1):
        a[0], a[end] = a[end], a[0]
        sift_down(0, end)`,
  ),
  "alg-counting-sort": lang(
    `function countingSort(a: number[], max: number): number[] {
  const count = Array(max + 1).fill(0);
  for (const v of a) count[v]++;
  const out: number[] = [];
  for (let value = 0; value < count.length; value++) {
    while (count[value]-- > 0) out.push(value);
  }
  return out;
}`,
    `def counting_sort(a, max_value):
    count = [0] * (max_value + 1)
    for v in a:
        count[v] += 1
    out = []
    for value, amount in enumerate(count):
        out.extend([value] * amount)
    return out`,
  ),
  "alg-radix-sort": lang(
    `function radixSort(a: number[]): void {
  const max = Math.max(...a, 0);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) countingPass(a, exp);
}
function countingPass(a: number[], exp: number): void {
  const count = Array(10).fill(0), out = Array(a.length);
  for (const v of a) count[Math.floor(v / exp) % 10]++;
  for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  for (let i = a.length - 1; i >= 0; i--) {
    const d = Math.floor(a[i] / exp) % 10;
    out[--count[d]] = a[i];
  }
  for (let i = 0; i < a.length; i++) a[i] = out[i];
}`,
    `def radix_sort(a):
    if not a: return
    exp, max_value = 1, max(a)
    while max_value // exp > 0:
        count, out = [0] * 10, [0] * len(a)
        for v in a: count[(v // exp) % 10] += 1
        for i in range(1, 10): count[i] += count[i - 1]
        for v in reversed(a):
            d = (v // exp) % 10
            count[d] -= 1
            out[count[d]] = v
        a[:] = out
        exp *= 10`,
  ),
  "alg-linear-search": lang(
    `function linearSearch(a: number[], target: number): number {
  for (let i = 0; i < a.length; i++) if (a[i] === target) return i;
  return -1;
}`,
    `def linear_search(a, target):
    for i, value in enumerate(a):
        if value == target:
            return i
    return -1`,
  ),
  "alg-binary-search": lang(
    `function binarySearch(a: number[], target: number): number {
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (a[mid] === target) return mid;
    if (target < a[mid]) hi = mid - 1;
    else lo = mid + 1;
  }
  return -1;
}`,
    `def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if a[mid] == target: return mid
        if target < a[mid]: hi = mid - 1
        else: lo = mid + 1
    return -1`,
  ),
  "alg-bfs": lang(
    `function bfs(graph: Map<string, string[]>, start: string): Set<string> {
  const seen = new Set<string>([start]);
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    for (const next of graph.get(node) ?? []) {
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  return seen;
}`,
    `from collections import deque

def bfs(graph, start):
    seen = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for nxt in graph.get(node, []):
            if nxt not in seen:
                seen.add(nxt)
                queue.append(nxt)
    return seen`,
  ),
  "alg-dfs": lang(
    `function dfs(graph: Map<string, string[]>, start: string): Set<string> {
  const seen = new Set<string>();
  const stack = [start];
  while (stack.length) {
    const node = stack.pop()!;
    if (seen.has(node)) continue;
    seen.add(node);
    for (const next of graph.get(node) ?? []) stack.push(next);
  }
  return seen;
}`,
    `def dfs(graph, start):
    seen, stack = set(), [start]
    while stack:
        node = stack.pop()
        if node in seen:
            continue
        seen.add(node)
        stack.extend(graph.get(node, []))
    return seen`,
  ),
  "alg-dijkstra": lang(
    `type Edge = { to: string; weight: number };
function dijkstra(graph: Map<string, Edge[]>, source: string): Map<string, number> {
  const dist = new Map<string, number>([[source, 0]]);
  const pq: Array<[number, string]> = [[0, source]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [cost, node] = pq.shift()!;
    if (cost !== dist.get(node)) continue;
    for (const edge of graph.get(node) ?? []) {
      const nextCost = cost + edge.weight;
      if (nextCost < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, nextCost);
        pq.push([nextCost, edge.to]);
      }
    }
  }
  return dist;
}`,
    `import heapq

def dijkstra(graph, source):
    dist = {source: 0}
    pq = [(0, source)]
    while pq:
        cost, node = heapq.heappop(pq)
        if cost != dist[node]:
            continue
        for nxt, weight in graph.get(node, []):
            next_cost = cost + weight
            if next_cost < dist.get(nxt, float("inf")):
                dist[nxt] = next_cost
                heapq.heappush(pq, (next_cost, nxt))
    return dist`,
  ),
  "alg-bellman-ford": lang(
    `type WEdge = { from: number; to: number; weight: number };
function bellmanFord(edges: WEdge[], vertices: number, source: number): number[] {
  const dist = Array(vertices).fill(Infinity);
  dist[source] = 0;
  for (let i = 0; i < vertices - 1; i++) {
    for (const e of edges) {
      if (dist[e.from] + e.weight < dist[e.to]) dist[e.to] = dist[e.from] + e.weight;
    }
  }
  return dist;
}`,
    `def bellman_ford(edges, vertices, source):
    dist = [float("inf")] * vertices
    dist[source] = 0
    for _ in range(vertices - 1):
        for frm, to, weight in edges:
            if dist[frm] + weight < dist[to]:
                dist[to] = dist[frm] + weight
    return dist`,
  ),
  "alg-floyd-warshall": lang(
    `function floydWarshall(dist: number[][]): void {
  const n = dist.length;
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
}`,
    `def floyd_warshall(dist):
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]`,
  ),
  "alg-a-star": lang(
    `// A* sketch: priority is known cost g plus heuristic h.
type Node = { id: string; fScore: number };
const open: Node[] = [{ id: "start", fScore: 0 }];
open.sort((a, b) => a.fScore - b.fScore);`,
    `# A* sketch: priority is known cost g plus heuristic h.
import heapq
open_set = [(0, "start")]
heapq.heappush(open_set, (g_score + heuristic(node), node))`,
  ),
  "alg-topological-sort": lang(
    `function topo(n: number, edges: number[][]): number[] {
  const graph = Array.from({ length: n }, () => [] as number[]);
  const indeg = Array(n).fill(0);
  for (const [a, b] of edges) { graph[a].push(b); indeg[b]++; }
  const q = indeg.flatMap((v, i) => v === 0 ? [i] : []);
  const out: number[] = [];
  for (let head = 0; head < q.length; head++) {
    const node = q[head]; out.push(node);
    for (const next of graph[node]) if (--indeg[next] === 0) q.push(next);
  }
  return out.length === n ? out : [];
}`,
    `from collections import deque

def topo(n, edges):
    graph = [[] for _ in range(n)]
    indeg = [0] * n
    for a, b in edges:
        graph[a].append(b); indeg[b] += 1
    q = deque(i for i, d in enumerate(indeg) if d == 0)
    out = []
    while q:
        node = q.popleft(); out.append(node)
        for nxt in graph[node]:
            indeg[nxt] -= 1
            if indeg[nxt] == 0: q.append(nxt)
    return out if len(out) == n else []`,
  ),
  "alg-union-find": lang(
    `class UnionFind {
  parent: number[];
  rank: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(a: number, b: number): void {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return;
    if (this.rank[ra] < this.rank[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra;
    if (this.rank[ra] === this.rank[rb]) this.rank[ra]++;
  }
}`,
    `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb: return
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1`,
  ),
  "alg-huffman": lang(
    `type HNode = { ch?: string; freq: number; left?: HNode; right?: HNode };
const heap: HNode[] = symbols.map(([ch, freq]) => ({ ch, freq }));
// Repeatedly remove two smallest nodes and push { freq: a.freq + b.freq, left: a, right: b }.`,
    `from heapq import heappush, heappop
heap = []
for ch, freq in frequencies.items():
    heappush(heap, (freq, ch))
# Repeatedly pop two smallest entries and push their merged tree node.`,
  ),
  "alg-rle": lang(
    `function rle(s: string): string {
  if (!s) return "";
  let out = "", count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) count++;
    else { out += s[i - 1] + String(count); count = 1; }
  }
  return out;
}`,
    `def rle(s):
    if not s: return ""
    out, count = [], 1
    for i in range(1, len(s) + 1):
        if i < len(s) and s[i] == s[i - 1]:
            count += 1
        else:
            out.append(f"{s[i - 1]}{count}")
            count = 1
    return "".join(out)`,
  ),
  "alg-lzw": lang(
    `const dict = new Map<string, number>();
for (let i = 0; i < 256; i++) dict.set(String.fromCharCode(i), i);
// Read the longest known sequence, emit its code, then add sequence + next character.`,
    `dictionary = {chr(i): i for i in range(256)}
# Read the longest known sequence, emit its code, then add sequence + next character.`,
  ),
  "alg-rsa": lang(
    `// Use WebCrypto or a vetted library for RSA.
const keyPair = await crypto.subtle.generateKey(
  { name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
  true,
  ["encrypt", "decrypt"]
);`,
    `# Use a vetted crypto library in production.
from cryptography.hazmat.primitives.asymmetric import rsa
private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)`,
  ),
  "alg-aes": lang(
    `const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
const iv = crypto.getRandomValues(new Uint8Array(12));
const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);`,
    `from cryptography.hazmat.primitives.ciphers.aead import AESGCM
key = AESGCM.generate_key(bit_length=256)
nonce = os.urandom(12)
ciphertext = AESGCM(key).encrypt(nonce, plaintext, None)`,
  ),
  "alg-hashing": lang(
    `const digest = await crypto.subtle.digest("SHA-256", inputBytes);`,
    `import hashlib
digest = hashlib.sha256(input_bytes).digest()`,
  ),
  "alg-bcrypt": lang(
    `// Use bcrypt package in Node.js.
const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(passwordAttempt, hash);`,
    `import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
ok = bcrypt.checkpw(attempt.encode(), hashed)`,
  ),
  "alg-sha-family": lang(
    `const digest = await crypto.subtle.digest("SHA-256", data);`,
    `import hashlib
digest = hashlib.sha256(data).hexdigest()`,
  ),
  "alg-gradient-descent": lang(
    `let w = 0, lr = 0.01;
for (let step = 0; step < 1000; step++) {
  let grad = 0;
  for (const [x, y] of data) grad += 2 * (w * x - y) * x;
  w -= lr * grad / data.length;
}`,
    `w, lr = 0.0, 0.01
for _ in range(1000):
    grad = sum(2 * (w * x - y) * x for x, y in data) / len(data)
    w -= lr * grad`,
  ),
  "alg-backpropagation": lang(
    `// Backprop sketch: autodiff frameworks compute these gradients.
// dLoss/dW = dLoss/dOutput * dOutput/dW for layers visited in reverse order.`,
    `# Backprop sketch: autodiff frameworks compute these gradients.
# d_loss_d_w = d_loss_d_output * d_output_d_w for layers in reverse order.`,
  ),
  "alg-linear-regression": lang(
    `function predict(w: number[], x: number[]): number {
  return w.reduce((sum, wi, i) => sum + wi * x[i], 0);
}`,
    `def predict(w, x):
    return sum(wi * xi for wi, xi in zip(w, x))`,
  ),
  "alg-logistic-regression": lang(
    `function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z));
}
function predictProb(w: number[], x: number[]): number {
  return sigmoid(w.reduce((sum, wi, i) => sum + wi * x[i], 0));
}`,
    `import math
def sigmoid(z):
    return 1 / (1 + math.exp(-z))
def predict_prob(w, x):
    return sigmoid(sum(wi * xi for wi, xi in zip(w, x)))`,
  ),
  "alg-decision-trees": lang(
    `type TreeNode = {
  feature?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  prediction?: number;
};`,
    `class TreeNode:
    def __init__(self, feature=None, threshold=None, left=None, right=None, prediction=None):
        self.feature = feature
        self.threshold = threshold
        self.left = left
        self.right = right
        self.prediction = prediction`,
  ),
  "alg-neural-networks": lang(
    `// Dense layer sketch:
// output = activation(matmul(weights, input) + bias)`,
    `# Dense layer sketch:
# output = activation(weights @ inputs + bias)`,
  ),
  "alg-b-tree": lang(
    `class BTreeNode {
  keys: number[] = [];
  children: BTreeNode[] = [];
  leaf = true;
}`,
    `class BTreeNode:
    def __init__(self, leaf=True):
        self.keys = []
        self.children = []
        self.leaf = leaf`,
  ),
  "alg-lsm-tree": lang(
    `const memtable = new Map<string, string>();
function put(key: string, value: string): void {
  // appendToWal(key, value);
  memtable.set(key, value);
}`,
    `memtable = {}
def put(key, value):
    # append_to_wal(key, value)
    memtable[key] = value`,
  ),
  "alg-consistent-hashing": lang(
    `class Ring {
  ring = new Map<number, string>();
  nodeFor(key: string): string {
    const h = hash(key);
    const slots = [...this.ring.keys()].sort((a, b) => a - b);
    const slot = slots.find((s) => s >= h) ?? slots[0];
    return this.ring.get(slot)!;
  }
}`,
    `class Ring:
    def __init__(self):
        self.ring = {}
    def node_for(self, key):
        h = hash(key)
        slots = sorted(self.ring)
        slot = next((s for s in slots if s >= h), slots[0])
        return self.ring[slot]`,
  ),
  "alg-replication": lang(
    `const committed = acknowledgments >= quorumSize;`,
    `committed = acknowledgments >= quorum_size`,
  ),
  "alg-consensus": lang(
    `const majority = replicatedCount > Math.floor(clusterSize / 2);`,
    `majority = replicated_count > cluster_size // 2`,
  ),
};

export const algorithmTopics: AlgorithmTopic[] = baseAlgorithmTopics.map((topic) => {
  const override = languageOverrides[topic.id];
  if (!override) return topic;
  return {
    ...topic,
    languages: {
      ...topic.languages,
      typescript: override.typescript,
      python: override.python,
    },
  };
});
