import type {
  LanguageOption,
  TopicLearningNotes,
  TutorialTopic,
} from "@/types/tutorial";

export const languages: LanguageOption[] = [
  { id: "java", label: "Java" },
  { id: "typescript", label: "TypeScript / Node.js" },
  { id: "python", label: "Python" },
];

export const topics: TutorialTopic[] = [
  {
    id: "primitive-types",
    title: "Primitive Types",
    category: "Foundations",
    summary:
      "Primitive types are the smallest building blocks: single values stored directly in memory-like slots.",
    bestFor: "Representing one number, true/false value, or character before grouping values into structures.",
    avoidWhen: "You need to store many related values, search across values, count values, or preserve order.",
    internalShape: "One variable holds one simple value.",
    interviewSignals: ["single value", "condition", "counter", "comparison", "collection choice"],
    complexity: [
      { label: "Read", value: "O(1)" },
      { label: "Write", value: "O(1)" },
      { label: "Compare", value: "O(1)" },
      { label: "Space", value: "O(1)" },
    ],
    languages: {
      java: {
        internals:
          "Java primitives store simple values directly: int for whole numbers, double for decimals, boolean for true/false, and char for one character. Collections cannot store primitives directly, so Java uses wrapper types like Integer and Character.",
        internalCode: `int age = 20;
double price = 99.99;
boolean isActive = true;
char grade = 'A';

// One primitive is one value. To store many, move into a structure.
int[] scores = {90, 85, 92};                 // array of primitives
ArrayList<Integer> ids = new ArrayList<>();  // wrapper type in collection
ids.add(101);

HashSet<Character> seenLetters = new HashSet<>();
seenLetters.add('a');`,
        problem:
          "Given one score, decide if it passes. Then see why many scores need a collection.",
        solutionCode: `static boolean passes(int score) {
    return score >= 50;
}

static int countPassing(int[] scores) {
    int count = 0;
    for (int score : scores) {
        if (passes(score)) count++;
    }
    return count;
}`,
        whyItFits:
          "A primitive handles one score. An array appears when the problem becomes many scores.",
      },
      typescript: {
        internals:
          "TypeScript uses JavaScript runtime values: number for numeric values, boolean for true/false, string for text/characters. When you need many values, you place them into arrays, Set, or Map depending on the operation.",
        internalCode: `const age: number = 20;
const price: number = 99.99;
const isActive: boolean = true;
const grade: string = "A";

// One primitive-like value becomes many values through collections.
const scores: number[] = [90, 85, 92];
const seenLetters = new Set<string>();
seenLetters.add("a");

const scoreByStudent = new Map<string, number>();
scoreByStudent.set("ada", 92);`,
        problem:
          "Given one score, decide if it passes. Then see why many scores need a collection.",
        solutionCode: `function passes(score: number): boolean {
  return score >= 50;
}

function countPassing(scores: number[]): number {
  let count = 0;
  for (const score of scores) {
    if (passes(score)) count++;
  }
  return count;
}`,
        whyItFits:
          "A number handles one score. An array appears when the operation repeats across many scores.",
      },
      python: {
        internals:
          "Python values like int, float, bool, and str represent simple single values. When one value becomes many values, use list, set, dict, tuple, or deque depending on the operation.",
        internalCode: `age = 20
price = 99.99
is_active = True
grade = "A"

# One value becomes many values through collections.
scores = [90, 85, 92]
seen_letters = set()
seen_letters.add("a")

score_by_student = {}
score_by_student["ada"] = 92`,
        problem:
          "Given one score, decide if it passes. Then see why many scores need a collection.",
        solutionCode: `def passes(score):
    return score >= 50

def count_passing(scores):
    count = 0
    for score in scores:
        if passes(score):
            count += 1
    return count`,
        whyItFits:
          "An int handles one score. A list appears when you need to repeat the same operation across many scores.",
      },
    },
  },
  {
    id: "why-collections-exist",
    title: "Why Collections Exist",
    category: "Foundations",
    summary:
      "Collections appear when one value is no longer enough: you need to store, find, compare, count, order, or process many values together.",
    bestFor:
      "Understanding the jump from primitive values to arrays, sets, maps, stacks, queues, trees, and graphs.",
    avoidWhen:
      "You are already solving a concrete problem and know the exact structure needed.",
    internalShape:
      "A collection is a rule for arranging many values so certain operations become easier.",
    interviewSignals: [
      "many values",
      "operation decides structure",
      "order vs uniqueness",
      "lookup vs processing",
    ],
    complexity: [
      { label: "One value", value: "primitive" },
      { label: "Many in order", value: "array/list" },
      { label: "Unique values", value: "set" },
      { label: "Key lookup", value: "map" },
    ],
    languages: {
      java: {
        internals:
          "Collections originate from the need to manage many values. An array is the simplest collection: a block of same-type slots. Higher structures add rules: HashSet uses buckets for uniqueness, HashMap stores key-value pairs, Stack controls access from the top, Queue controls access from the front.",
        internalCode: `// Start: one value
int score = 90;

// Need many scores in order: array
int[] scores = {90, 85, 92};

// Need many scores but only unique values: set
Set<Integer> uniqueScores = new HashSet<>();
for (int value : scores) uniqueScores.add(value);

// Need to find a score by student name: map
Map<String, Integer> scoreByStudent = new HashMap<>();
scoreByStudent.put("Ada", 90);

// Same primitive value, different collection rules:
// Array asks: where is it by position?
// Set asks: have I seen it before?
// Map asks: what value belongs to this key?`,
        problem:
          "Given student scores, choose the right collection for three needs: preserve order, remove duplicates, and look up a score by name.",
        solutionCode: `int[] orderedScores = {90, 85, 90};       // order matters

Set<Integer> uniqueScores = new HashSet<>(); // uniqueness matters
for (int score : orderedScores) {
    uniqueScores.add(score);
}

Map<String, Integer> scoreByName = new HashMap<>(); // lookup matters
scoreByName.put("Ada", 90);
scoreByName.put("Grace", 85);`,
        whyItFits:
          "The values are still simple integers, but the operation changes the structure we choose.",
      },
      typescript: {
        internals:
          "Collections come from repeated values plus repeated operations. Arrays keep order, Set keeps uniqueness, Map connects keys to values, and stack/queue patterns restrict which end you use.",
        internalCode: `// Start: one value
const score = 90;

// Need many scores in order: array
const scores = [90, 85, 92];

// Need unique scores: set
const uniqueScores = new Set(scores);

// Need lookup by student name: map
const scoreByStudent = new Map<string, number>();
scoreByStudent.set("Ada", 90);

// Same number values, different collection rules:
// Array: position and order
// Set: uniqueness
// Map: key-based lookup`,
        problem:
          "Given student scores, choose the right collection for order, uniqueness, and lookup.",
        solutionCode: `const orderedScores = [90, 85, 90];       // order matters
const uniqueScores = new Set(orderedScores); // uniqueness matters

const scoreByName = new Map<string, number>(); // lookup matters
scoreByName.set("Ada", 90);
scoreByName.set("Grace", 85);`,
        whyItFits:
          "The value type is still number. The collection changes because the operation changes.",
      },
      python: {
        internals:
          "Collections exist because programs rarely work with only one value. A list keeps values in order, a set keeps unique values, a dict connects keys to values, and deque supports controlled end-based processing.",
        internalCode: `# Start: one value
score = 90

# Need many scores in order: list
scores = [90, 85, 92]

# Need unique scores: set
unique_scores = set(scores)

# Need lookup by student name: dict
score_by_student = {}
score_by_student["Ada"] = 90

# Same number values, different collection rules:
# list: position and order
# set: uniqueness
# dict: key-based lookup`,
        problem:
          "Given student scores, choose the right collection for order, uniqueness, and lookup.",
        solutionCode: `ordered_scores = [90, 85, 90]   # order matters
unique_scores = set(ordered_scores)  # uniqueness matters

score_by_name = {}                  # lookup matters
score_by_name["Ada"] = 90
score_by_name["Grace"] = 85`,
        whyItFits:
          "The data begins as simple numbers. The structure comes from what you need to do with many numbers.",
      },
    },
  },
  {
    id: "memory-model",
    title: "Memory & References",
    category: "Foundations",
    summary:
      "Every value lives somewhere in memory. Primitives are copied on assignment. Objects live on the heap, and variables hold references — addresses pointing to those objects.",
    bestFor:
      "Understanding why modifying one variable can unexpectedly affect another, why null errors happen, how garbage collection works, and why shallow copies can betray you.",
    avoidWhen:
      "You only have simple primitive values with no sharing, aliasing, or ownership concerns.",
    internalShape:
      "Stack (local, fast, fixed-size) holds primitive values and object references. Heap (dynamic, GC-managed) holds all objects and collections.",
    interviewSignals: [
      "null pointer / undefined / None error",
      "unexpected mutation through another variable",
      "shallow copy vs deep copy",
      "stack overflow from deep recursion",
      "pass by value vs pass by reference",
      "garbage collection or memory leak",
    ],
    complexity: [
      { label: "Stack alloc", value: "O(1)" },
      { label: "Heap alloc", value: "O(1) amortized" },
      { label: "Reference follow", value: "O(1)" },
      { label: "GC scan", value: "O(live objects)" },
    ],
    languages: {
      java: {
        internals:
          "Java stores primitive values (int, double, boolean, char) directly in stack frames. All objects and arrays live on the heap. A variable of object type holds a reference — an address pointing to the heap object. Assigning one reference variable to another copies the reference, not the object. Java's garbage collector periodically finds unreachable heap objects and frees them. This is why NullPointerException happens: the reference variable exists on the stack but holds a reference pointing to nothing.",
        internalCode: `// Primitives: copied by value — two independent variables
int x = 10;
int y = x;       // y is a copy
y = 99;
System.out.println(x); // 10 — unchanged

// Object references: two variables pointing to one heap object
int[] a = {1, 2, 3};
int[] b = a;     // b holds the SAME reference — same heap object
b[0] = 99;
System.out.println(a[0]); // 99 — both see the mutation

// null: reference pointing to nothing
String s = null;
// s.length(); → NullPointerException — the reference exists, the object does not

// Aliasing with collections
List<Integer> list1 = new ArrayList<>(List.of(1, 2, 3));
List<Integer> list2 = list1;   // same heap object
list2.add(99);
System.out.println(list1.size()); // 4 — unexpected mutation visible through list1

// Deep copy: break the alias
List<Integer> list3 = new ArrayList<>(list1); // new object on the heap`,
        problem:
          "A method receives a list, is supposed to add 10 to every element, and return a new list without modifying the original. The naive implementation modifies the original. Fix it and explain why.",
        solutionCode: `import java.util.ArrayList;
import java.util.List;

// WRONG: mutates the original through the shared reference
static List<Integer> addTenWrong(List<Integer> numbers) {
    for (int i = 0; i < numbers.size(); i++) {
        numbers.set(i, numbers.get(i) + 10); // mutates via shared reference
    }
    return numbers; // caller's list is modified too
}

// CORRECT: work on an independent copy
static List<Integer> addTen(List<Integer> numbers) {
    List<Integer> copy = new ArrayList<>(numbers); // new heap object
    for (int i = 0; i < copy.size(); i++) {
        copy.set(i, copy.get(i) + 10);
    }
    return copy; // original untouched
}`,
        whyItFits:
          "Creating a new ArrayList breaks the alias. The caller's reference still points to the original heap object. The method works on a second independent object.",
      },
      typescript: {
        internals:
          "JavaScript primitives (number, boolean, string, null, undefined) are value types — copied on assignment. Objects, arrays, and functions are reference types — the variable holds a pointer to heap memory. V8's GC uses a generational strategy: short-lived objects in 'young space' are collected frequently; long-lived objects promoted to 'old space'. The spread operator and Object.assign() perform shallow copies: new container, but nested objects still share references.",
        internalCode: `// Primitives: independent copies
let x = 10;
let y = x;
y = 99;
console.log(x); // 10

// Arrays and objects: shared reference
const a = [1, 2, 3];
const b = a;       // same reference
b[0] = 99;
console.log(a[0]); // 99

// Shallow copy: new top-level container, shared nested objects
const obj1 = { scores: [1, 2, 3], name: "Ada" };
const obj2 = { ...obj1 };        // spread copies one level deep
obj2.scores.push(99);
console.log(obj1.scores);        // [1, 2, 3, 99] — nested array still shared!
obj2.name = "Grace";
console.log(obj1.name);          // "Ada" — primitive field was independently copied

// Deep copy (Node 17+ / modern browsers)
const obj3 = structuredClone(obj1); // fully independent`,
        problem:
          "A function receives an array of student objects, doubles the score field, and returns a new array. The naive implementation modifies the originals. Fix it.",
        solutionCode: `type Student = { name: string; score: number };

// WRONG: spread copies the array but Student objects inside are still shared
function doubleScoresWrong(students: Student[]): Student[] {
  return [...students].map((s) => {
    s.score *= 2; // mutates the ORIGINAL object
    return s;
  });
}

// CORRECT: create a new object for each student inside map
function doubleScores(students: Student[]): Student[] {
  return students.map((s) => ({ ...s, score: s.score * 2 }));
}`,
        whyItFits:
          "Spreading inside map creates a new object per student. The original array and original objects are untouched. This is the standard immutable-update pattern in React and Redux.",
      },
      python: {
        internals:
          "In Python, every variable is a binding — a name pointing to an object. Even small integers are objects on the heap. Python uses reference counting plus a cyclic GC for cycles. Immutable types (int, str, tuple) cannot be mutated — operations produce new objects. Mutable types (list, dict, set) can be mutated through any binding. id() returns the memory address; 'is' checks whether two names point to the same object.",
        internalCode: `# Immutable types: rebinding does not mutate
x = 10
y = x
y = 99
print(x)   # 10 — x still points to the integer object 10

# Mutable: shared reference
a = [1, 2, 3]
b = a          # b points to the same list object
b[0] = 99
print(a[0])    # 99 — same object

# id() reveals identity (memory address in CPython)
print(id(a) == id(b))  # True — same object

# Shallow copy: new list, inner elements share references if mutable
import copy
nested = [[1, 2], [3, 4]]
shallow = nested[:]     # new outer list
shallow[0].append(99)
print(nested[0])        # [1, 2, 99] — inner list still shared!

# Deep copy: fully independent at every level
deep = copy.deepcopy(nested)`,
        problem:
          "A function receives a list of student dicts, adds a 'grade' key, and returns a new list without modifying the originals. The naive implementation modifies originals. Fix it.",
        solutionCode: `students = [{"name": "Ada", "score": 90}, {"name": "Grace", "score": 75}]

# WRONG: shallow copy of list — dicts inside still shared
def add_grades_wrong(students):
    result = students[:]
    for s in result:
        s["grade"] = "A" if s["score"] >= 80 else "B"  # mutates original dict
    return result

# CORRECT: create a new dict for each student
def add_grades(students):
    return [{**s, "grade": "A" if s["score"] >= 80 else "B"} for s in students]`,
        whyItFits:
          "Dict unpacking ({**s, 'grade': ...}) creates a new dict object, leaving the originals untouched. This is the standard immutable-update pattern in Python.",
      },
    },
  },
  {
    id: "array",
    title: "Array",
    category: "Core",
    summary: "Solves the multiple-variable problem: instead of a separate variable for every value, you get one name for N values stored contiguously in memory, making any position reachable in O(1) because the address of index i is always base + i × size.",
    bestFor: "When you know the size upfront and need O(1) access by position — the fastest possible element retrieval.",
    avoidWhen: "You need to grow the collection or insert/remove in the middle — both force allocating new memory or shifting every subsequent element.",
    internalShape: "Contiguous indexed storage.",
    interviewSignals: ["maximum/minimum scan", "two pointers", "prefix sums", "sliding window"],
    complexity: [
      { label: "Access", value: "O(1)" },
      { label: "Search", value: "O(n)" },
      { label: "Insert middle", value: "O(n)" },
      { label: "Space", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "A Java array is fixed-size storage. The index maps directly to a position, so lookup is constant time.",
        internalCode: `class SimpleIntArray {
    private final int[] data;

    SimpleIntArray(int size) {
        data = new int[size];
    }

    void set(int index, int value) {
        data[index] = value;
    }

    int get(int index) {
        return data[index];
    }
}`,
        problem: "Find the largest number in an array.",
        solutionCode: `static int max(int[] nums) {
    int best = nums[0];
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] > best) best = nums[i];
    }
    return best;
}`,
        whyItFits: "The problem only needs a single pass through indexed values.",
      },
      typescript: {
        internals: "JavaScript arrays are dynamic, but normal numeric indexes behave like array positions.",
        internalCode: `class SimpleArray<T> {
  private data: T[];

  constructor(size: number) {
    this.data = new Array<T>(size);
  }

  set(index: number, value: T): void {
    this.data[index] = value;
  }

  get(index: number): T {
    return this.data[index];
  }
}`,
        problem: "Find the largest number in an array.",
        solutionCode: `function max(nums: number[]): number {
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > best) best = nums[i];
  }
  return best;
}`,
        whyItFits: "The array gives direct ordered access and a simple linear scan.",
      },
      python: {
        internals: "Python lists are dynamic arrays, but this fixed-size class shows the core indexed-storage idea.",
        internalCode: `class SimpleArray:
    def __init__(self, size):
        self.data = [None] * size

    def set(self, index, value):
        self.data[index] = value

    def get(self, index):
        return self.data[index]`,
        problem: "Find the largest number in a list.",
        solutionCode: `def max_value(nums):
    best = nums[0]
    for num in nums[1:]:
        if num > best:
            best = num
    return best`,
        whyItFits: "A list is ideal for scanning ordered values once.",
      },
    },
  },
  {
    id: "array-list",
    title: "Dynamic Array / Growable List",
    category: "Core",
    summary: "Fixes the fixed-size limitation of plain arrays: you declare no size upfront — it starts small, and when full it allocates a larger internal array and copies over, so you can keep appending without managing memory yourself.",
    bestFor: "Building result lists of unknown size where you mostly append to the end.",
    avoidWhen: "You frequently insert or remove near the front or middle — every element after the insertion point must shift one position.",
    internalShape: "Resizable internal array.",
    interviewSignals: ["filter results", "merge arrays", "build output", "dynamic programming table"],
    complexity: [
      { label: "Access", value: "O(1)" },
      { label: "Append", value: "O(1) amortized" },
      { label: "Insert middle", value: "O(n)" },
      { label: "Search", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "ArrayList keeps an internal array. When full, it allocates a bigger array and copies values.",
        internalCode: `class SimpleArrayList {
    private int[] data = new int[2];
    private int size = 0;

    void add(int value) {
        if (size == data.length) resize();
        data[size++] = value;
    }

    int get(int index) {
        return data[index];
    }

    private void resize() {
        int[] bigger = new int[data.length * 2];
        for (int i = 0; i < data.length; i++) bigger[i] = data[i];
        data = bigger;
    }
}`,
        problem: "Return only positive numbers.",
        solutionCode: `static ArrayList<Integer> positives(int[] nums) {
    ArrayList<Integer> result = new ArrayList<>();
    for (int num : nums) {
        if (num > 0) result.add(num);
    }
    return result;
}`,
        whyItFits: "The number of positives is unknown, so a growable result is useful.",
      },
      typescript: {
        internals: "TypeScript arrays use JavaScript's dynamic array behavior. push appends to the end.",
        internalCode: `class SimpleList {
  private data: number[] = new Array(2);
  private size = 0;

  add(value: number): void {
    if (this.size === this.data.length) this.resize();
    this.data[this.size++] = value;
  }

  private resize(): void {
    const bigger = new Array(this.data.length * 2);
    for (let i = 0; i < this.data.length; i++) bigger[i] = this.data[i];
    this.data = bigger;
  }
}`,
        problem: "Return only positive numbers.",
        solutionCode: `function positives(nums: number[]): number[] {
  const result: number[] = [];
  for (const num of nums) {
    if (num > 0) result.push(num);
  }
  return result;
}`,
        whyItFits: "A growable array lets the result expand only when needed.",
      },
      python: {
        internals: "Python list append grows internal storage as needed.",
        internalCode: `class SimpleList:
    def __init__(self):
        self.data = [None] * 2
        self.size = 0

    def add(self, value):
        if self.size == len(self.data):
            self._resize()
        self.data[self.size] = value
        self.size += 1

    def _resize(self):
        bigger = [None] * (len(self.data) * 2)
        for i in range(len(self.data)):
            bigger[i] = self.data[i]
        self.data = bigger`,
        problem: "Return only positive numbers.",
        solutionCode: `def positives(nums):
    result = []
    for num in nums:
        if num > 0:
            result.append(num)
    return result`,
        whyItFits: "A list is a natural output builder.",
      },
    },
  },
  {
    id: "linked-list",
    title: "Linked List",
    category: "Core",
    summary: "Fixes the O(n) shift cost of arrays: each node lives anywhere in memory and holds a pointer to the next one, so prepending or removing the head rewires one pointer — always O(1), with no shifting.",
    bestFor: "Frequent head insertions or removals, and as the backbone of stacks and queues where index access is never needed.",
    avoidWhen: "You need to read by index — without contiguous memory there is no formula, so you must walk from the head every time, making access O(n).",
    internalShape: "Node objects with next, and sometimes previous, references.",
    interviewSignals: ["reverse list", "cycle detection", "kth from end", "merge sorted lists"],
    complexity: [
      { label: "Access index", value: "O(n)" },
      { label: "Add first", value: "O(1)" },
      { label: "Remove first", value: "O(1)" },
      { label: "Search", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "Each node stores a value and a reference to the next node. Java LinkedList is doubly linked.",
        internalCode: `class Node {
    int value;
    Node next;
    Node(int value) { this.value = value; }
}

class SimpleLinkedList {
    private Node first;
    private Node last;

    void addLast(int value) {
        Node node = new Node(value);
        if (first == null) first = last = node;
        else {
            last.next = node;
            last = node;
        }
    }
}`,
        problem: "Reverse a linked list.",
        solutionCode: `static Node reverse(Node head) {
    Node previous = null;
    Node current = head;
    while (current != null) {
        Node next = current.next;
        current.next = previous;
        previous = current;
        current = next;
    }
    return previous;
}`,
        whyItFits: "The operation is pointer reassignment, which is exactly how linked lists work.",
      },
      typescript: {
        internals: "A linked list node is an object whose next field points to another node.",
        internalCode: `class NodeItem {
  constructor(
    public value: number,
    public next: NodeItem | null = null
  ) {}
}

class SimpleLinkedList {
  private first: NodeItem | null = null;
  private last: NodeItem | null = null;

  addLast(value: number): void {
    const node = new NodeItem(value);
    if (!this.first) this.first = this.last = node;
    else {
      this.last!.next = node;
      this.last = node;
    }
  }
}`,
        problem: "Reverse a linked list.",
        solutionCode: `function reverse(head: NodeItem | null): NodeItem | null {
  let previous: NodeItem | null = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
}`,
        whyItFits: "The solution redirects next references.",
      },
      python: {
        internals: "A Python node class can hold value and next fields.",
        internalCode: `class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

class SimpleLinkedList:
    def __init__(self):
        self.first = None
        self.last = None

    def add_last(self, value):
        node = Node(value)
        if self.first is None:
            self.first = self.last = node
        else:
            self.last.next = node
            self.last = node`,
        problem: "Reverse a linked list.",
        solutionCode: `def reverse(head):
    previous = None
    current = head
    while current:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous`,
        whyItFits: "The list is literally made of links, so reversing means changing links.",
      },
    },
  },
  {
    id: "doubly-linked-list",
    title: "Doubly Linked List",
    category: "Core",
    summary: "Extends the singly linked list with a prev pointer on each node: now you can splice out any node you already hold in O(1) without scanning from the head — something a singly linked list cannot do.",
    bestFor: "LRU cache, browser history, and any structure needing O(1) removal from the middle when you already have a reference to the node.",
    avoidWhen: "You only traverse forward — the prev pointer doubles memory per node with no benefit.",
    internalShape: "Node objects with both next and prev references, plus head and tail sentinels.",
    interviewSignals: ["LRU cache", "browser history", "undo/redo", "deque implementation"],
    complexity: [
      { label: "Access index", value: "O(n)" },
      { label: "Add first / last", value: "O(1)" },
      { label: "Remove first / last", value: "O(1)" },
      { label: "Remove by node ref", value: "O(1)" },
      { label: "Search", value: "O(n)" },
    ],
    languages: {
      java: {
        internals:
          "Each node holds prev and next. Maintaining both pointers lets you splice out a node in O(1) without scanning from the head. Java's built-in LinkedList uses this layout.",
        internalCode: `class Node {
    int value;
    Node prev, next;
    Node(int value) { this.value = value; }
}

class DoublyLinkedList {
    private Node head, tail;

    void addLast(int value) {
        Node node = new Node(value);
        if (head == null) { head = tail = node; return; }
        node.prev = tail;
        tail.next = node;
        tail = node;
    }

    void remove(Node node) {
        if (node.prev != null) node.prev.next = node.next;
        else head = node.next;           // node was head
        if (node.next != null) node.next.prev = node.prev;
        else tail = node.prev;           // node was tail
    }
}`,
        problem: "Implement an LRU cache with O(1) get and put.",
        solutionCode: `class LRUCache {
    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0), tail = new Node(0);

    LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        moveToFront(node);
        return node.value;
    }

    void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.value = value;
            moveToFront(node);
        } else {
            if (map.size() == capacity) evict();
            Node node = new Node(value);
            node.key = key;
            insertFront(node);
            map.put(key, node);
        }
    }

    private void moveToFront(Node node) { remove(node); insertFront(node); }

    private void insertFront(Node node) {
        node.next = head.next; node.prev = head;
        head.next.prev = node; head.next = node;
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void evict() {
        Node lru = tail.prev;
        remove(lru);
        map.remove(lru.key);
    }

    static class Node {
        int key, value;
        Node prev, next;
        Node(int value) { this.value = value; }
    }
}`,
        whyItFits:
          "The LRU cache needs O(1) removal from the middle of the list (on cache hit) and O(1) insertion at the front. Only a doubly linked list can do both without scanning.",
      },
      typescript: {
        internals:
          "Each node carries both next and prev. A sentinel head and tail node eliminate null-checks in insert/remove.",
        internalCode: `class DLLNode {
  constructor(
    public value: number,
    public prev: DLLNode | null = null,
    public next: DLLNode | null = null
  ) {}
}

class DoublyLinkedList {
  private head: DLLNode | null = null;
  private tail: DLLNode | null = null;

  addLast(value: number): DLLNode {
    const node = new DLLNode(value);
    if (!this.head) { this.head = this.tail = node; return node; }
    node.prev = this.tail;
    this.tail!.next = node;
    this.tail = node;
    return node;
  }

  remove(node: DLLNode): void {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }
}`,
        problem: "Implement an LRU cache with O(1) get and put.",
        solutionCode: `class LRUCache {
  private map = new Map<number, DLLNode>();
  private head = new DLLNode(-1);   // sentinel
  private tail = new DLLNode(-1);   // sentinel

  constructor(private capacity: number) {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (!node) return -1;
    this.moveToFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.moveToFront(existing);
      return;
    }
    if (this.map.size === this.capacity) this.evict();
    const node = new DLLNode(value);
    this.insertFront(node);
    this.map.set(key, node);
  }

  private moveToFront(node: DLLNode) { this.remove(node); this.insertFront(node); }

  private insertFront(node: DLLNode) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private remove(node: DLLNode) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private evict() {
    const lru = this.tail.prev!;
    this.remove(lru);
    this.map.delete(lru.value);
  }
}

class DLLNode {
  constructor(
    public value: number,
    public prev: DLLNode | null = null,
    public next: DLLNode | null = null
  ) {}
}`,
        whyItFits:
          "Moving a recently-used node to the front requires splicing it out and reinserting it. The prev pointer makes the splice O(1).",
      },
      python: {
        internals:
          "Python nodes hold both prev and next. Sentinel nodes at each end simplify boundary logic.",
        internalCode: `class Node:
    def __init__(self, value=0):
        self.value = value
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = Node()   # sentinel
        self.tail = Node()   # sentinel
        self.head.next = self.tail
        self.tail.prev = self.head

    def add_last(self, node: Node):
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node

    def remove(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev`,
        problem: "Implement an LRU cache with O(1) get and put.",
        solutionCode: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: dict[int, Node] = {}
        self.list = DoublyLinkedList()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self.list.remove(node)
        self.list.add_last(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self.list.remove(node)
            self.list.add_last(node)
            return
        if len(self.cache) == self.capacity:
            lru = self.list.head.next   # oldest is right after sentinel head
            self.list.remove(lru)
            del self.cache[lru.key]
        node = Node(value)
        node.key = key
        self.list.add_last(node)
        self.cache[key] = node`,
        whyItFits:
          "Evicting the LRU entry and promoting a recently used one both require O(1) list surgery — possible only with prev pointers.",
      },
    },
  },
  {
    id: "stack",
    title: "Stack",
    category: "Core",
    summary: "Models the 'most recently opened must close first' constraint: nested function calls return in reverse order, brackets must close in reverse order, and undo must reverse the last action — all require the last item in to be the first item out.",
    bestFor: "Nested structures, undo/redo, backtracking, and DFS — anywhere the most recent context must finish before the previous one resumes.",
    avoidWhen: "Items should be processed in arrival order — use a queue instead.",
    internalShape: "One active top end.",
    interviewSignals: ["balanced brackets", "undo", "DFS", "next greater element"],
    complexity: [
      { label: "Push", value: "O(1)" },
      { label: "Pop", value: "O(1)" },
      { label: "Peek", value: "O(1)" },
      { label: "Search", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "A stack tracks the top position. Push moves top up; pop returns top then moves it down.",
        internalCode: `class SimpleStack {
    private int[] data = new int[10];
    private int top = -1;

    void push(int value) {
        data[++top] = value;
    }

    int pop() {
        return data[top--];
    }
}`,
        problem: "Check if parentheses are balanced.",
        solutionCode: `static boolean balanced(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char ch : s.toCharArray()) {
        if (ch == '(') stack.push(ch);
        if (ch == ')') {
            if (stack.isEmpty()) return false;
            stack.pop();
        }
    }
    return stack.isEmpty();
}`,
        whyItFits: "The most recent opening bracket must close first.",
      },
      typescript: {
        internals: "Use an array where the end is the top.",
        internalCode: `class SimpleStack<T> {
  private data: T[] = [];

  push(value: T): void {
    this.data.push(value);
  }

  pop(): T | undefined {
    return this.data.pop();
  }
}`,
        problem: "Check if parentheses are balanced.",
        solutionCode: `function balanced(s: string): boolean {
  const stack: string[] = [];
  for (const ch of s) {
    if (ch === "(") stack.push(ch);
    if (ch === ")") {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}`,
        whyItFits: "Parentheses nesting is last-in, first-out.",
      },
      python: {
        internals: "Use list append and pop, treating the end as the top.",
        internalCode: `class SimpleStack:
    def __init__(self):
        self.data = []

    def push(self, value):
        self.data.append(value)

    def pop(self):
        return self.data.pop()`,
        problem: "Check if parentheses are balanced.",
        solutionCode: `def balanced(s):
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif ch == ")":
            if not stack:
                return False
            stack.pop()
    return not stack`,
        whyItFits: "The last opener must be the first closer.",
      },
    },
  },
  {
    id: "hash-set",
    title: "HashSet",
    category: "Sets",
    summary: "Fixes the O(n) membership scan of arrays: instead of checking every element, it hashes each value to a bucket so 'have I seen this?' takes O(1) average — regardless of how many items are stored.",
    bestFor: "Deduplication and membership checks where speed matters more than order.",
    avoidWhen: "You need sorted order or insertion-order iteration — hashing randomizes the internal position of elements.",
    internalShape: "Hash table buckets with collision handling.",
    interviewSignals: ["duplicate", "repeated", "contains", "intersection"],
    complexity: [
      { label: "Add", value: "O(1) avg" },
      { label: "Contains", value: "O(1) avg" },
      { label: "Remove", value: "O(1) avg" },
      { label: "Worst case", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "HashSet uses hashCode to choose a bucket and equals to verify duplicates.",
        internalCode: `class SimpleHashSet {
    private LinkedList<Integer>[] buckets = new LinkedList[10];

    private int bucketIndex(int value) {
        return Math.abs(value) % buckets.length;
    }

    boolean add(int value) {
        int index = bucketIndex(value);
        if (buckets[index] == null) buckets[index] = new LinkedList<>();
        if (buckets[index].contains(value)) return false;
        buckets[index].add(value);
        return true;
    }

    boolean contains(int value) {
        int index = bucketIndex(value);
        return buckets[index] != null && buckets[index].contains(value);
    }

    boolean remove(int value) {
        int index = bucketIndex(value);
        if (buckets[index] == null) return false;
        return buckets[index].remove(Integer.valueOf(value));
    }
}`,
        problem: "Find the first duplicate number.",
        solutionCode: `static Integer firstDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) return num;
    }
    return null;
}`,
        whyItFits: "Set directly answers whether a value has already appeared.",
      },
      typescript: {
        internals: "Set provides hash-like membership for unique values.",
        internalCode: `class SimpleSet {
  private buckets: number[][] = Array.from({ length: 10 }, () => []);

  private bucketIndex(value: number): number {
    return Math.abs(value) % this.buckets.length;
  }

  add(value: number): boolean {
    const index = this.bucketIndex(value);
    if (this.buckets[index].includes(value)) return false;
    this.buckets[index].push(value);
    return true;
  }

  has(value: number): boolean {
    const index = this.bucketIndex(value);
    return this.buckets[index].includes(value);
  }

  delete(value: number): boolean {
    const index = this.bucketIndex(value);
    const position = this.buckets[index].indexOf(value);
    if (position === -1) return false;
    this.buckets[index].splice(position, 1);
    return true;
  }
}`,
        problem: "Find the first duplicate number.",
        solutionCode: `function firstDuplicate(nums: number[]): number | null {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return num;
    seen.add(num);
  }
  return null;
}`,
        whyItFits: "Set membership is the simplest duplicate check.",
      },
      python: {
        internals: "Python set is hash-based, so hashable values can be checked quickly.",
        internalCode: `class SimpleSet:
    def __init__(self):
        self.buckets = [[] for _ in range(10)]

    def _bucket_index(self, value):
        return abs(value) % len(self.buckets)

    def add(self, value):
        index = self._bucket_index(value)
        if value in self.buckets[index]:
            return False
        self.buckets[index].append(value)
        return True

    def contains(self, value):
        index = self._bucket_index(value)
        return value in self.buckets[index]

    def remove(self, value):
        index = self._bucket_index(value)
        if value not in self.buckets[index]:
            return False
        self.buckets[index].remove(value)
        return True`,
        problem: "Find the first duplicate number.",
        solutionCode: `def first_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return num
        seen.add(num)
    return None`,
        whyItFits: "A set is built for 'already seen' checks.",
      },
    },
  },
  {
    id: "linked-hash-set",
    title: "LinkedHashSet",
    category: "Sets",
    summary: "Fixes the insertion-order loss of HashSet: it maintains a linked list alongside the hash buckets so you get O(1) membership checks and iteration that gives elements back in the order they were first added.",
    bestFor: "Removing duplicates while preserving the original sequence — for example, deduplicating a stream of events without reordering them.",
    avoidWhen: "Order doesn't matter — HashSet is simpler and uses less memory.",
    internalShape: "Hash table plus a linked insertion-order chain.",
    interviewSignals: ["dedupe with order", "first-seen order", "stable unique values"],
    complexity: [
      { label: "Add", value: "O(1) avg" },
      { label: "Contains", value: "O(1) avg" },
      { label: "Remove", value: "O(1) avg" },
      { label: "Iteration", value: "O(n), insertion order" },
    ],
    languages: {
      java: {
        internals: "LinkedHashSet is like HashSet plus a linked list of entries, so iteration follows insertion order.",
        internalCode: `class SimpleOrderedSet {
    private HashSet<String> lookup = new HashSet<>();
    private ArrayList<String> order = new ArrayList<>();

    boolean add(String value) {
        if (!lookup.add(value)) return false;
        order.add(value);
        return true;
    }
}`,
        problem: "Remove duplicate words but keep the order they first appeared.",
        solutionCode: `static List<String> uniqueInOrder(String[] words) {
    LinkedHashSet<String> set = new LinkedHashSet<>();
    for (String word : words) set.add(word);
    return new ArrayList<>(set);
}`,
        whyItFits: "You need set uniqueness and predictable first-seen iteration order.",
      },
      typescript: {
        internals: "JavaScript Set already preserves insertion order, so it behaves like an ordered set.",
        internalCode: `class OrderedSet<T> {
  private lookup = new Set<T>();
  private order: T[] = [];

  add(value: T): boolean {
    if (this.lookup.has(value)) return false;
    this.lookup.add(value);
    this.order.push(value);
    return true;
  }
}`,
        problem: "Remove duplicate words but keep the order they first appeared.",
        solutionCode: `function uniqueInOrder(words: string[]): string[] {
  return [...new Set(words)];
}`,
        whyItFits: "Set removes duplicates and preserves insertion order in JavaScript.",
      },
      python: {
        internals: "Python does not have LinkedHashSet as a separate type; dict keys preserve insertion order and can model it.",
        internalCode: `class OrderedSet:
    def __init__(self):
        self.lookup = set()
        self.order = []

    def add(self, value):
        if value in self.lookup:
            return False
        self.lookup.add(value)
        self.order.append(value)
        return True`,
        problem: "Remove duplicate words but keep the order they first appeared.",
        solutionCode: `def unique_in_order(words):
    return list(dict.fromkeys(words))`,
        whyItFits: "Dictionary keys are unique and preserve first-seen order.",
      },
    },
  },
  {
    id: "tree-set",
    title: "TreeSet",
    category: "Sets",
    summary: "Fixes the unordered output of HashSet using a balanced BST: every insert maintains sorted order, so you can ask for the smallest, largest, or any floor/ceiling value in O(log n) — impossible with a hash.",
    bestFor: "Unique values where you need sorted iteration, range queries, or nearest-value lookups.",
    avoidWhen: "You only need membership checks — HashSet's O(1) average beats TreeSet's O(log n).",
    internalShape: "Self-balancing binary search tree.",
    interviewSignals: ["sorted unique", "range query", "floor", "ceiling"],
    complexity: [
      { label: "Add", value: "O(log n)" },
      { label: "Contains", value: "O(log n)" },
      { label: "Remove", value: "O(log n)" },
      { label: "Sorted iteration", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "TreeSet is backed by a Red-Black Tree. Values are positioned by comparison, not by hash.",
        internalCode: `class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;
}

boolean contains(TreeNode node, int value) {
    if (node == null) return false;
    if (node.value == value) return true;
    if (value < node.value) return contains(node.left, value);
    return contains(node.right, value);
}`,
        problem: "Remove duplicates and return numbers sorted.",
        solutionCode: `static TreeSet<Integer> uniqueSorted(int[] nums) {
    TreeSet<Integer> result = new TreeSet<>();
    for (int num : nums) result.add(num);
    return result;
}`,
        whyItFits: "TreeSet handles uniqueness and sorted order together.",
      },
      typescript: {
        internals: "Node.js has no built-in TreeSet. The concept is a search tree; for final output, Set plus sort is common.",
        internalCode: `class TreeNode {
  constructor(
    public value: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}`,
        problem: "Remove duplicates and return numbers sorted.",
        solutionCode: `function uniqueSorted(nums: number[]): number[] {
  return [...new Set(nums)].sort((a, b) => a - b);
}`,
        whyItFits: "Set gives uniqueness; sorting gives the TreeSet-style final order.",
      },
      python: {
        internals: "Python has set but no built-in TreeSet. Use sorted(set(values)) for final sorted unique output.",
        internalCode: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None`,
        problem: "Remove duplicates and return numbers sorted.",
        solutionCode: `def unique_sorted(nums):
    return sorted(set(nums))`,
        whyItFits: "The operation needs both uniqueness and sorted output.",
      },
    },
  },
  {
    id: "hash-map",
    title: "HashMap / Dictionary",
    category: "Maps",
    summary: "Replaces the need to scan a list of pairs to find a value: hashing the key goes directly to its bucket in O(1) average, so key-to-value lookup stays fast no matter how many entries the map holds.",
    bestFor: "Counting, grouping, and any 'given X, what is Y?' lookup.",
    avoidWhen: "You need keys in sorted order — hashing destroys any key ordering.",
    internalShape: "Hash table entries stored by key hash.",
    interviewSignals: ["count", "frequency", "lookup", "two sum", "group"],
    complexity: [
      { label: "Put", value: "O(1) avg" },
      { label: "Get", value: "O(1) avg" },
      { label: "Remove", value: "O(1) avg" },
      { label: "Iteration", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "HashMap stores key-value entries in buckets. The key hash chooses the bucket.",
        internalCode: `class Entry {
    String key;
    int value;
    Entry(String key, int value) {
        this.key = key;
        this.value = value;
    }
}

class SimpleHashMap {
    private LinkedList<Entry>[] buckets = new LinkedList[10];

    void put(String key, int value) {
        int index = Math.abs(key.hashCode()) % buckets.length;
        if (buckets[index] == null) buckets[index] = new LinkedList<>();
        for (Entry entry : buckets[index]) {
            if (entry.key.equals(key)) {
                entry.value = value;
                return;
            }
        }
        buckets[index].add(new Entry(key, value));
    }
}`,
        problem: "Count how often each word appears.",
        solutionCode: `static Map<String, Integer> wordCount(String[] words) {
    Map<String, Integer> counts = new HashMap<>();
    for (String word : words) {
        counts.put(word, counts.getOrDefault(word, 0) + 1);
    }
    return counts;
}`,
        whyItFits: "The word is the key; its count is the value.",
      },
      typescript: {
        internals: "Map stores key-value pairs. This simplified version shows bucketed storage.",
        internalCode: `type Entry = { key: string; value: number };

class SimpleMap {
  private buckets: Entry[][] = Array.from({ length: 10 }, () => []);

  put(key: string, value: number): void {
    const index = Math.abs(hash(key)) % this.buckets.length;
    const found = this.buckets[index].find((entry) => entry.key === key);
    if (found) found.value = value;
    else this.buckets[index].push({ key, value });
  }
}

function hash(key: string): number {
  return [...key].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}`,
        problem: "Count how often each word appears.",
        solutionCode: `function wordCount(words: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of words) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}`,
        whyItFits: "Map keeps each word tied to one running count.",
      },
      python: {
        internals: "dict is Python's hash map. Keys point to values.",
        internalCode: `class SimpleMap:
    def __init__(self):
        self.buckets = [[] for _ in range(10)]

    def put(self, key, value):
        index = hash(key) % len(self.buckets)
        for entry in self.buckets[index]:
            if entry[0] == key:
                entry[1] = value
                return
        self.buckets[index].append([key, value])`,
        problem: "Count how often each word appears.",
        solutionCode: `def word_count(words):
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts`,
        whyItFits: "A dictionary maps each word to its frequency.",
      },
    },
  },
  {
    id: "linked-hash-map",
    title: "LinkedHashMap",
    category: "Maps",
    summary: "Fixes the insertion-order loss of HashMap: a linked list threads through the entries in insertion order, so iteration is predictable without sacrificing O(1) key lookup.",
    bestFor: "Frequency maps or caches where you also need to replay or display entries in the order they were added.",
    avoidWhen: "Insertion order doesn't matter (use HashMap) or you need keys sorted (use TreeMap) — the extra links add memory overhead for no benefit.",
    internalShape: "Hash table plus linked entry order.",
    interviewSignals: ["first unique", "ordered counts", "LRU cache"],
    complexity: [
      { label: "Put", value: "O(1) avg" },
      { label: "Get", value: "O(1) avg" },
      { label: "Remove", value: "O(1) avg" },
      { label: "Iteration", value: "O(n), insertion order" },
    ],
    languages: {
      java: {
        internals: "LinkedHashMap stores map entries in hash buckets and also links them in insertion/access order.",
        internalCode: `class SimpleOrderedMap {
    private HashMap<String, Integer> lookup = new HashMap<>();
    private ArrayList<String> order = new ArrayList<>();

    void put(String key, int value) {
        if (!lookup.containsKey(key)) order.add(key);
        lookup.put(key, value);
    }
}`,
        problem: "Find the first non-repeating character.",
        solutionCode: `static Character firstUnique(String text) {
    LinkedHashMap<Character, Integer> counts = new LinkedHashMap<>();
    for (char ch : text.toCharArray()) {
        counts.put(ch, counts.getOrDefault(ch, 0) + 1);
    }
    for (char ch : counts.keySet()) {
        if (counts.get(ch) == 1) return ch;
    }
    return null;
}`,
        whyItFits: "You need counts and the original character order.",
      },
      typescript: {
        internals: "JavaScript Map preserves insertion order, so it behaves like an ordered map.",
        internalCode: `class OrderedMap {
  private lookup = new Map<string, number>();
  private order: string[] = [];

  put(key: string, value: number): void {
    if (!this.lookup.has(key)) this.order.push(key);
    this.lookup.set(key, value);
  }
}`,
        problem: "Find the first non-repeating character.",
        solutionCode: `function firstUnique(text: string): string | null {
  const counts = new Map<string, number>();
  for (const ch of text) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  for (const [ch, count] of counts) if (count === 1) return ch;
  return null;
}`,
        whyItFits: "Map keeps counts and insertion order.",
      },
      python: {
        internals: "Python dict preserves insertion order, so normal dict often fills this role.",
        internalCode: `class OrderedMap:
    def __init__(self):
        self.lookup = {}
        self.order = []

    def put(self, key, value):
        if key not in self.lookup:
            self.order.append(key)
        self.lookup[key] = value`,
        problem: "Find the first non-repeating character.",
        solutionCode: `def first_unique(text):
    counts = {}
    for ch in text:
        counts[ch] = counts.get(ch, 0) + 1
    for ch, count in counts.items():
        if count == 1:
            return ch
    return None`,
        whyItFits: "dict gives counts and keeps first-seen order.",
      },
    },
  },
  {
    id: "tree-map",
    title: "TreeMap",
    category: "Maps",
    summary: "Fixes the unordered keys of HashMap using a balanced BST: keys stay sorted at all times, enabling range queries like 'all entries between A and B' and floor/ceiling lookups — operations a hash cannot support.",
    bestFor: "Key-value storage where you need to iterate keys in order or ask 'what keys fall between X and Y?'",
    avoidWhen: "You only need point lookups — HashMap's O(1) average beats TreeMap's O(log n).",
    internalShape: "Self-balancing binary search tree of key-value entries.",
    interviewSignals: ["sorted keys", "range by key", "floor key", "ceiling key"],
    complexity: [
      { label: "Put", value: "O(log n)" },
      { label: "Get", value: "O(log n)" },
      { label: "Remove", value: "O(log n)" },
      { label: "Sorted iteration", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "TreeMap stores entries in a Red-Black Tree ordered by key.",
        internalCode: `class MapNode {
    int key;
    String value;
    MapNode left;
    MapNode right;
}

String get(MapNode node, int key) {
    if (node == null) return null;
    if (node.key == key) return node.value;
    if (key < node.key) return get(node.left, key);
    return get(node.right, key);
}`,
        problem: "Store scores by student ID and iterate IDs sorted.",
        solutionCode: `static TreeMap<Integer, Integer> scoresById(int[] ids, int[] scores) {
    TreeMap<Integer, Integer> result = new TreeMap<>();
    for (int i = 0; i < ids.length; i++) result.put(ids[i], scores[i]);
    return result;
}`,
        whyItFits: "TreeMap gives lookup plus sorted key iteration.",
      },
      typescript: {
        internals: "Node.js has no built-in TreeMap. A search tree is the concept; Map plus sorted entries is common for final output.",
        internalCode: `class MapNode {
  constructor(
    public key: number,
    public value: string,
    public left: MapNode | null = null,
    public right: MapNode | null = null
  ) {}
}`,
        problem: "Store scores by student ID and return IDs sorted.",
        solutionCode: `function scoresById(ids: number[], scores: number[]): [number, number][] {
  const result = new Map<number, number>();
  for (let i = 0; i < ids.length; i++) result.set(ids[i], scores[i]);
  return [...result.entries()].sort((a, b) => a[0] - b[0]);
}`,
        whyItFits: "Map stores values; sorted entries provide TreeMap-style output.",
      },
      python: {
        internals: "Python dict is not key-sorted; sorted(dict.items()) gives TreeMap-style final output.",
        internalCode: `class MapNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.left = None
        self.right = None`,
        problem: "Store scores by student ID and return IDs sorted.",
        solutionCode: `def scores_by_id(ids, scores):
    result = {}
    for i in range(len(ids)):
        result[ids[i]] = scores[i]
    return sorted(result.items())`,
        whyItFits: "The requirement is key-value storage with sorted key output.",
      },
    },
  },
  {
    id: "queue",
    title: "Queue",
    category: "Core",
    summary: "Enforces fairness: the first item added is the first item processed, which is what CPU schedulers, print spoolers, and BFS all need — a stack would process the newest job first, which is wrong when arrival order matters.",
    bestFor: "Processing items in the order they arrived — first-come, first-served.",
    avoidWhen: "The most urgent item (not the oldest) should go next — use a priority queue instead.",
    internalShape: "Front index for removal, back index for insertion.",
    interviewSignals: ["BFS", "level order", "tickets", "arrival order"],
    complexity: [
      { label: "Add", value: "O(1)" },
      { label: "Remove", value: "O(1)" },
      { label: "Peek", value: "O(1)" },
      { label: "Search", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "A circular-array queue moves front and back indexes instead of shifting values.",
        internalCode: `class SimpleQueue {
    private int[] data = new int[10];
    private int front = 0;
    private int size = 0;

    void add(int value) {
        int back = (front + size) % data.length;
        data[back] = value;
        size++;
    }

    int remove() {
        int value = data[front];
        front = (front + 1) % data.length;
        size--;
        return value;
    }
}`,
        problem: "Process tickets in the order they arrived.",
        solutionCode: `static void processTickets(List<String> tickets) {
    Queue<String> queue = new ArrayDeque<>(tickets);
    while (!queue.isEmpty()) {
        System.out.println(queue.remove());
    }
}`,
        whyItFits: "FIFO behavior matches first-come, first-served processing.",
      },
      typescript: {
        internals: "A head index avoids costly array shifts for every removal.",
        internalCode: `class SimpleQueue<T> {
  private data: T[] = [];
  private head = 0;

  add(value: T): void {
    this.data.push(value);
  }

  remove(): T | undefined {
    if (this.head >= this.data.length) return undefined;
    return this.data[this.head++];
  }
}`,
        problem: "Process tickets in the order they arrived.",
        solutionCode: `function processTickets(tickets: string[]): void {
  const queue = [...tickets];
  let head = 0;
  while (head < queue.length) {
    console.log(queue[head++]);
  }
}`,
        whyItFits: "The oldest item is always read from the head.",
      },
      python: {
        internals: "collections.deque is the real Python choice; this simple version shows the head-index idea.",
        internalCode: `class SimpleQueue:
    def __init__(self):
        self.data = []
        self.head = 0

    def add(self, value):
        self.data.append(value)

    def remove(self):
        if self.head >= len(self.data):
            return None
        value = self.data[self.head]
        self.head += 1
        return value`,
        problem: "Process tickets in the order they arrived.",
        solutionCode: `from collections import deque

def process_tickets(tickets):
    queue = deque(tickets)
    while queue:
        print(queue.popleft())`,
        whyItFits: "Deque popleft gives efficient FIFO behavior.",
      },
    },
  },
  {
    id: "deque",
    title: "Deque",
    category: "Core",
    summary: "Generalizes stack and queue into one structure: a stack only opens one end, a queue only one end; a deque opens both, which is the minimum shape needed for sliding-window algorithms and palindrome checks.",
    bestFor: "Sliding window problems, palindrome checks, and anywhere you need LIFO from one side and FIFO from the other without two separate structures.",
    avoidWhen: "You only need indexed access — an array or list is clearer.",
    internalShape: "Circular buffer with front and back indexes.",
    interviewSignals: ["palindrome", "front and back", "sliding window maximum"],
    complexity: [
      { label: "Add front/back", value: "O(1)" },
      { label: "Remove front/back", value: "O(1)" },
      { label: "Peek front/back", value: "O(1)" },
      { label: "Search", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "ArrayDeque uses circular-array behavior so both ends can move without shifting all items.",
        internalCode: `class SimpleDeque {
    private int[] data = new int[10];
    private int front = 5;
    private int size = 0;

    void addFirst(int value) {
        front = (front - 1 + data.length) % data.length;
        data[front] = value;
        size++;
    }

    void addLast(int value) {
        int back = (front + size) % data.length;
        data[back] = value;
        size++;
    }
}`,
        problem: "Check if a word is a palindrome.",
        solutionCode: `static boolean palindrome(String word) {
    Deque<Character> deque = new ArrayDeque<>();
    for (char ch : word.toCharArray()) deque.addLast(ch);
    while (deque.size() > 1) {
        if (!deque.removeFirst().equals(deque.removeLast())) return false;
    }
    return true;
}`,
        whyItFits: "A deque compares and removes from the front and back.",
      },
      typescript: {
        internals: "JavaScript has no built-in deque; a simple class can expose both-end operations.",
        internalCode: `class SimpleDeque<T> {
  private data: T[] = [];

  addFirst(value: T): void { this.data.unshift(value); }
  addLast(value: T): void { this.data.push(value); }
  removeFirst(): T | undefined { return this.data.shift(); }
  removeLast(): T | undefined { return this.data.pop(); }
}`,
        problem: "Check if a word is a palindrome.",
        solutionCode: `function palindrome(word: string): boolean {
  let left = 0;
  let right = word.length - 1;
  while (left < right) {
    if (word[left++] !== word[right--]) return false;
  }
  return true;
}`,
        whyItFits: "The same two-ended idea can be implemented with two indexes.",
      },
      python: {
        internals: "collections.deque is optimized for both-end operations.",
        internalCode: `from collections import deque

d = deque()
d.appendleft(1)
d.append(2)
d.popleft()
d.pop()`,
        problem: "Check if a word is a palindrome.",
        solutionCode: `from collections import deque

def palindrome(word):
    d = deque(word)
    while len(d) > 1:
        if d.popleft() != d.pop():
            return False
    return True`,
        whyItFits: "Deque operations directly match the problem.",
      },
    },
  },
  {
    id: "priority-queue",
    title: "PriorityQueue / Heap",
    category: "Heaps",
    summary: "Fixes the O(n) 'find the minimum' scan: a heap keeps the smallest (or largest) element at the top at all times, so each extraction costs O(log n) — far cheaper than re-scanning an unsorted list each time.",
    bestFor: "Repeatedly extracting the smallest or largest item — top-K problems, Dijkstra's algorithm, task scheduling.",
    avoidWhen: "You need full sorted order at once — just sort the array; a heap only guarantees the next item.",
    internalShape: "Binary heap stored inside an array.",
    interviewSignals: ["top k", "kth largest", "merge k lists", "shortest path"],
    complexity: [
      { label: "Peek", value: "O(1)" },
      { label: "Add", value: "O(log n)" },
      { label: "Poll", value: "O(log n)" },
      { label: "Contains", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "A min-heap stores the smallest value at index 0. Add bubbles up; poll bubbles down.",
        internalCode: `class MinHeap {
    private ArrayList<Integer> heap = new ArrayList<>();

    void add(int value) {
        heap.add(value);
        bubbleUp(heap.size() - 1);
    }

    private void bubbleUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (heap.get(parent) <= heap.get(index)) break;
            Collections.swap(heap, parent, index);
            index = parent;
        }
    }
}`,
        problem: "Find the second smallest number.",
        solutionCode: `static int secondSmallest(int[] nums) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int num : nums) pq.add(num);
    pq.poll();
    return pq.poll();
}`,
        whyItFits: "A priority queue repeatedly gives the next smallest value.",
      },
      typescript: {
        internals: "Node has no built-in priority queue. A heap class gives the same internal behavior.",
        internalCode: `class MinHeap {
  private data: number[] = [];

  push(value: number): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] <= this.data[index]) break;
      [this.data[parent], this.data[index]] = [this.data[index], this.data[parent]];
      index = parent;
    }
  }
}`,
        problem: "Find the second smallest number.",
        solutionCode: `function secondSmallest(nums: number[]): number {
  const sorted = [...nums].sort((a, b) => a - b);
  return sorted[1];
}`,
        whyItFits: "For repeated priority removals, use a heap instead of sorting every time.",
      },
      python: {
        internals: "heapq uses a list as a min-heap. The smallest value stays at index 0.",
        internalCode: `class MinHeap:
    def __init__(self):
        self.data = []

    def push(self, value):
        self.data.append(value)
        self._bubble_up(len(self.data) - 1)

    def _bubble_up(self, index):
        while index > 0:
            parent = (index - 1) // 2
            if self.data[parent] <= self.data[index]:
                break
            self.data[parent], self.data[index] = self.data[index], self.data[parent]
            index = parent`,
        problem: "Find the second smallest number.",
        solutionCode: `import heapq

def second_smallest(nums):
    heap = nums[:]
    heapq.heapify(heap)
    heapq.heappop(heap)
    return heapq.heappop(heap)`,
        whyItFits: "The heap repeatedly returns the next smallest value.",
      },
    },
  },
  {
    id: "binary-tree",
    title: "Binary Tree",
    category: "Trees",
    summary: "Models hierarchical data that flat structures cannot represent: file systems, org charts, expression parsers, and HTML all have natural parent-child relationships — an array or list can only express a sequence, not a branching hierarchy.",
    bestFor: "Recursive traversal, depth/height questions, and any data where each item has an ordered left and right child.",
    avoidWhen: "Your data is a flat sequence with no hierarchy — an array or list is simpler and faster to index.",
    internalShape: "Nodes connected parent-to-child.",
    interviewSignals: ["depth", "traversal", "lowest common ancestor", "level order"],
    complexity: [
      { label: "Visit all nodes", value: "O(n)" },
      { label: "Max depth", value: "O(n)" },
      { label: "Traversal", value: "O(n)" },
      { label: "Space", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "A binary tree node stores a value and references to left and right child nodes.",
        internalCode: `class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;
    TreeNode(int value) { this.value = value; }
}`,
        problem: "Find the maximum depth of a binary tree.",
        solutionCode: `static int maxDepth(TreeNode root) {
    if (root == null) return 0;
    int left = maxDepth(root.left);
    int right = maxDepth(root.right);
    return 1 + Math.max(left, right);
}`,
        whyItFits: "Depth is naturally recursive: each node asks for the depth of its children.",
      },
      typescript: {
        internals: "A tree node stores child references.",
        internalCode: `class TreeNode {
  constructor(
    public value: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}`,
        problem: "Find the maximum depth of a binary tree.",
        solutionCode: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        whyItFits: "The recursive function mirrors the tree's recursive structure.",
      },
      python: {
        internals: "A Python tree node stores value, left, and right.",
        internalCode: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None`,
        problem: "Find the maximum depth of a binary tree.",
        solutionCode: `def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))`,
        whyItFits: "Every subtree is itself a smaller tree.",
      },
    },
  },
  {
    id: "tree",
    title: "Binary Search Tree (BST)",
    category: "Trees",
    summary: "Adds a search rule to the binary tree: smaller values go left, larger go right — so at every node you discard half the remaining values, giving O(log n) search, insert, and delete on a structure that also stays dynamic.",
    bestFor: "Ordered search and sorted traversal on data that changes frequently — faster than re-sorting an array on every insert.",
    avoidWhen: "Input is already sorted or nearly sorted — insertions build a lopsided tree that degrades to O(n); use a self-balancing variant (AVL, Red-Black) for guarantees.",
    internalShape: "Binary tree with ordering rules.",
    interviewSignals: ["ordered search", "validate BST", "in-order sorted", "successor/predecessor"],
    complexity: [
      { label: "Balanced search", value: "O(log n)" },
      { label: "Unbalanced search", value: "O(n)" },
      { label: "Traversal", value: "O(n)" },
      { label: "Space", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "A binary search tree sends smaller values left and larger values right.",
        internalCode: `class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;
    TreeNode(int value) { this.value = value; }
}`,
        problem: "Check whether a value exists in a BST.",
        solutionCode: `static boolean contains(TreeNode root, int target) {
    if (root == null) return false;
    if (root.value == target) return true;
    if (target < root.value) return contains(root.left, target);
    return contains(root.right, target);
}`,
        whyItFits: "The BST ordering lets each step choose left or right.",
      },
      typescript: {
        internals: "A BST node is a binary tree node plus the rule that left is smaller and right is larger.",
        internalCode: `class TreeNode {
  constructor(
    public value: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}`,
        problem: "Check whether a value exists in a BST.",
        solutionCode: `function contains(root: TreeNode | null, target: number): boolean {
  if (!root) return false;
  if (root.value === target) return true;
  return target < root.value
    ? contains(root.left, target)
    : contains(root.right, target);
}`,
        whyItFits: "Each comparison removes half of the remaining direction when the tree is balanced.",
      },
      python: {
        internals: "A BST node stores value, left, and right, with ordering rules.",
        internalCode: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None`,
        problem: "Check whether a value exists in a BST.",
        solutionCode: `def contains(root, target):
    if root is None:
        return False
    if root.value == target:
        return True
    if target < root.value:
        return contains(root.left, target)
    return contains(root.right, target)`,
        whyItFits: "The recursive code follows the BST ordering rule.",
      },
    },
  },
  {
    id: "trie",
    title: "Trie",
    category: "Trees",
    summary: "Fixes the 'find all words with this prefix' problem: a HashMap must scan every key to find matches, but a trie stores characters as edges so prefix lookup is just a path walk — O(k) where k is the prefix length, independent of dictionary size.",
    bestFor: "Autocomplete, spell check, and any problem where the query is a prefix of stored keys.",
    avoidWhen: "You only need exact key lookup — a HashMap is simpler and uses less memory.",
    internalShape: "Each node maps characters to child nodes.",
    interviewSignals: ["prefix", "startsWith", "autocomplete", "word search"],
    complexity: [
      { label: "Insert word", value: "O(k)" },
      { label: "Search word", value: "O(k)" },
      { label: "Prefix search", value: "O(k)" },
      { label: "Space", value: "O(total chars)" },
    ],
    languages: {
      java: {
        internals: "Each character chooses the next child node; isWord marks a complete word.",
        internalCode: `class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isWord;
}`,
        problem: "Insert a word into a trie.",
        solutionCode: `void insert(String word) {
    TrieNode current = root;
    for (char ch : word.toCharArray()) {
        current = current.children.computeIfAbsent(ch, key -> new TrieNode());
    }
    current.isWord = true;
}`,
        whyItFits: "Shared prefixes reuse the same nodes.",
      },
      typescript: {
        internals: "A Map stores child nodes by character.",
        internalCode: `class TrieNode {
  children = new Map<string, TrieNode>();
  isWord = false;
}`,
        problem: "Insert a word into a trie.",
        solutionCode: `function insert(root: TrieNode, word: string): void {
  let current = root;
  for (const ch of word) {
    if (!current.children.has(ch)) current.children.set(ch, new TrieNode());
    current = current.children.get(ch)!;
  }
  current.isWord = true;
}`,
        whyItFits: "Each character advances one level.",
      },
      python: {
        internals: "A dictionary stores child nodes by character.",
        internalCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False`,
        problem: "Insert a word into a trie.",
        solutionCode: `def insert(root, word):
    current = root
    for ch in word:
        current = current.children.setdefault(ch, TrieNode())
    current.is_word = True`,
        whyItFits: "Prefix paths are shared across words.",
      },
    },
  },
  {
    id: "union-find",
    title: "Union-Find / Disjoint Set",
    category: "Advanced",
    summary: "Fixes the slow connectivity query on graphs: BFS/DFS answers 'are X and Y connected?' in O(V+E) and must repeat the full traversal for every query — union-find answers the same question in nearly O(1) amortized using path-compressed trees.",
    bestFor: "Counting connected components, cycle detection, and Kruskal's MST — anywhere you need to repeatedly merge groups and query membership.",
    avoidWhen: "You need the actual path between nodes — union-find only tells you connected or not, not how.",
    internalShape: "Parent array where each set has a representative root.",
    interviewSignals: ["connected components", "same group", "union", "cycle in undirected graph"],
    complexity: [
      { label: "Find", value: "Near O(1)" },
      { label: "Union", value: "Near O(1)" },
      { label: "Connected", value: "Near O(1)" },
      { label: "Space", value: "O(n)" },
    ],
    languages: {
      java: {
        internals: "Each item points to a parent. Path compression makes future finds faster.",
        internalCode: `class UnionFind {
    private int[] parent;

    UnionFind(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
}`,
        problem: "Check whether two nodes are connected.",
        solutionCode: `boolean connected(int a, int b) {
    return find(a) == find(b);
}`,
        whyItFits: "Connectivity is exactly what disjoint sets track.",
      },
      typescript: {
        internals: "The parent array stores the representative chain.",
        internalCode: `class UnionFind {
  private parent: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
}`,
        problem: "Check whether two nodes are connected.",
        solutionCode: `function connected(uf: UnionFind, a: number, b: number): boolean {
  return uf.find(a) === uf.find(b);
}`,
        whyItFits: "Two items are connected when they share a root.",
      },
      python: {
        internals: "A parent list represents the forest of sets.",
        internalCode: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]`,
        problem: "Check whether two nodes are connected.",
        solutionCode: `def connected(uf, a, b):
    return uf.find(a) == uf.find(b)`,
        whyItFits: "Shared representative means same group.",
      },
    },
  },
  {
    id: "graph",
    title: "Graph",
    category: "Graphs",
    summary: "Generalizes the tree to allow any node to connect to any other: real-world networks — roads, social graphs, package dependencies — have cycles and multiple parents that a tree cannot represent.",
    bestFor: "Any network with arbitrary connections: routes, social relationships, dependency graphs, state machines.",
    avoidWhen: "The data is strictly hierarchical with one parent per node — a tree is simpler and traversal algorithms are more predictable.",
    internalShape: "Adjacency list or adjacency matrix.",
    interviewSignals: ["connected", "route", "dependency", "network", "shortest path"],
    complexity: [
      { label: "BFS/DFS", value: "O(V + E)" },
      { label: "Adj list space", value: "O(V + E)" },
      { label: "Edge check list", value: "O(degree)" },
      { label: "Edge check matrix", value: "O(1)" },
    ],
    languages: {
      java: {
        internals: "An adjacency list maps each node to the nodes it can reach.",
        internalCode: `Map<String, List<String>> graph = new HashMap<>();
graph.put("A", List.of("B", "C"));
graph.put("B", List.of("D"));
graph.put("C", List.of());
graph.put("D", List.of());`,
        problem: "Visit every reachable node with BFS.",
        solutionCode: `static void bfs(Map<String, List<String>> graph, String start) {
    Set<String> visited = new HashSet<>();
    Queue<String> queue = new ArrayDeque<>();
    queue.add(start);
    visited.add(start);

    while (!queue.isEmpty()) {
        String node = queue.poll();
        for (String next : graph.getOrDefault(node, List.of())) {
            if (visited.add(next)) queue.add(next);
        }
    }
}`,
        whyItFits: "Graphs model relationships; BFS explores relationships layer by layer.",
      },
      typescript: {
        internals: "Use a Map from node to neighbor list.",
        internalCode: `const graph = new Map<string, string[]>([
  ["A", ["B", "C"]],
  ["B", ["D"]],
  ["C", []],
  ["D", []],
]);`,
        problem: "Visit every reachable node with BFS.",
        solutionCode: `function bfs(graph: Map<string, string[]>, start: string): Set<string> {
  const visited = new Set<string>([start]);
  const queue = [start];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    for (const next of graph.get(node) ?? []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return visited;
}`,
        whyItFits: "The queue keeps graph traversal in breadth-first order.",
      },
      python: {
        internals: "A dictionary from node to list of neighbors is the common adjacency-list shape.",
        internalCode: `graph = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": [],
    "D": [],
}`,
        problem: "Visit every reachable node with BFS.",
        solutionCode: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for next_node in graph.get(node, []):
            if next_node not in visited:
                visited.add(next_node)
                queue.append(next_node)
    return visited`,
        whyItFits: "Adjacency lists keep each node's outgoing connections easy to scan.",
      },
    },
  },
];

export const learningNotes: Record<string, TopicLearningNotes> = {
  "memory-model": {
    recognition: [
      {
        signal: "unexpected mutation",
        meaning:
          "Two variables point to the same heap object. Mutating through one is visible through the other.",
        example: "A method modifies a list and the caller's list is also changed.",
        code: {
          java: `List<Integer> a = new ArrayList<>(List.of(1, 2, 3));
List<Integer> b = a;   // same object
b.add(99);
System.out.println(a.size()); // 4 — unexpected`,
          typescript: `const a = [1, 2, 3];
const b = a;
b.push(99);
console.log(a.length); // 4 — unexpected`,
          python: `a = [1, 2, 3]
b = a
b.append(99)
print(len(a))  # 4 — unexpected`,
        },
      },
      {
        signal: "null / undefined / None error",
        meaning:
          "A reference variable was declared but never assigned to a heap object. Dereferencing it crashes at runtime.",
        example: "NullPointerException in Java. TypeError: Cannot read properties of null in JavaScript.",
        code: {
          java: `String s = null;
s.length(); // NullPointerException`,
          typescript: `const s: string | null = null;
console.log(s!.toUpperCase()); // TypeError at runtime`,
          python: `s = None
print(len(s))  # TypeError: object of type 'NoneType' has no len()`,
        },
      },
      {
        signal: "shallow copy vs deep copy",
        meaning:
          "A copy operation duplicated the container but nested objects still share the same heap addresses.",
        example: "Spread operator copies an object one level deep but nested arrays remain shared.",
        code: {
          java: `List<List<Integer>> orig = new ArrayList<>(List.of(new ArrayList<>(List.of(1, 2))));
List<List<Integer>> shallow = new ArrayList<>(orig);
shallow.get(0).add(99);
System.out.println(orig.get(0)); // [1, 2, 99] — inner list shared`,
          typescript: `const orig = { scores: [1, 2] };
const copy = { ...orig };
copy.scores.push(99);
console.log(orig.scores); // [1, 2, 99]`,
          python: `import copy
orig = [[1, 2], [3, 4]]
shallow = orig[:]
shallow[0].append(99)
print(orig[0])  # [1, 2, 99]`,
        },
      },
      {
        signal: "pass-by-reference behavior",
        meaning:
          "A function mutates its caller's data because objects are passed as references, not copies.",
        example: "A helper method clears a list and the caller's list is also empty.",
        code: {
          java: `static void clear(List<Integer> list) { list.clear(); }
List<Integer> data = new ArrayList<>(List.of(1, 2, 3));
clear(data);
System.out.println(data.size()); // 0 — mutated through the shared reference`,
          typescript: `function clear(arr: number[]) { arr.length = 0; }
const data = [1, 2, 3];
clear(data);
console.log(data.length); // 0`,
          python: `def clear(lst): lst.clear()
data = [1, 2, 3]
clear(data)
print(len(data))  # 0`,
        },
      },
    ],
    practice: {
      setup:
        "Before assuming a bug, ask: does this variable hold a primitive value or a reference to a heap object? If two variables share the same object, any mutation is visible through both. The fix is usually to create an independent copy at the right depth.",
      steps: [
        "Identify whether the variable type is primitive (value copy) or object (reference copy).",
        "Trace which variables point to the same heap object by following assignments.",
        "Determine whether an operation is a mutation (add, set, clear) or a reassignment (=).",
        "Decide whether a shallow copy (one level) or deep copy (all levels) is required.",
        "Create the copy before mutating, and return the copy instead of the original.",
      ],
      extraExamples: [
        "Explain why reassigning a parameter inside a method does not affect the caller.",
        "Write a defensive copy utility for a list of lists.",
        "Explain what Java's clone() does and why it is often insufficient.",
      ],
    },
  },
  "primitive-types": {
    recognition: [
      {
        signal: "single value",
        meaning:
          "A primitive is enough when the problem talks about one value and one direct operation.",
        example: "Is this score passing? Is this user active? Is this number even?",
        code: {
          java: `int score = 72;
boolean passing = score >= 50;`,
          typescript: `const score: number = 72;
const passing = score >= 50;`,
          python: `score = 72
passing = score >= 50`,
        },
      },
      {
        signal: "condition",
        meaning:
          "Primitive booleans often represent yes/no answers from comparisons.",
        example: "price > budget becomes true or false.",
        code: {
          java: `double price = 99.99;
double budget = 120.00;
boolean canBuy = price <= budget;`,
          typescript: `const price = 99.99;
const budget = 120.00;
const canBuy = price <= budget;`,
          python: `price = 99.99
budget = 120.00
can_buy = price <= budget`,
        },
      },
      {
        signal: "counter",
        meaning:
          "A primitive number can track how many times something happened while you scan a collection.",
        example: "count how many scores passed.",
        code: {
          java: `int count = 0;
for (int score : scores) {
    if (score >= 50) count++;
}`,
          typescript: `let count = 0;
for (const score of scores) {
  if (score >= 50) count++;
}`,
          python: `count = 0
for score in scores:
    if score >= 50:
        count += 1`,
        },
      },
      {
        signal: "collection choice",
        meaning:
          "When one primitive becomes many values, the operation decides the data structure.",
        example:
          "Many scores in order use an array/list; unique IDs use a set; score by student uses a map.",
        code: {
          java: `int[] scores = {90, 85, 92};          // ordered scores
Set<Integer> uniqueIds = new HashSet<>(); // uniqueness
Map<String, Integer> scoreByName = new HashMap<>(); // lookup`,
          typescript: `const scores: number[] = [90, 85, 92]; // ordered scores
const uniqueIds = new Set<number>();     // uniqueness
const scoreByName = new Map<string, number>(); // lookup`,
          python: `scores = [90, 85, 92]  # ordered scores
unique_ids = set()     # uniqueness
score_by_name = {}     # lookup`,
        },
      },
    ],
    practice: {
      setup:
        "Start with one value. When the same operation must happen repeatedly, wrap those values in the structure that matches the operation.",
      steps: [
        "Name the single value first, such as one score or one character.",
        "Ask whether the problem now has many of those values.",
        "If order matters, use an array/list.",
        "If uniqueness matters, use a set.",
        "If lookup by a name or ID matters, use a map/dictionary.",
      ],
      extraExamples: [
        {
          title: "One value: check if a number is even.",
          code: {
            java: `static boolean isEven(int number) {
    return number % 2 == 0;
}`,
            typescript: `function isEven(number: number): boolean {
  return number % 2 === 0;
}`,
            python: `def is_even(number):
    return number % 2 == 0`,
          },
        },
        {
          title: "Many values in order: count passing scores.",
          code: {
            java: `static int countPassing(int[] scores) {
    int count = 0;
    for (int score : scores) {
        if (score >= 50) count++;
    }
    return count;
}`,
            typescript: `function countPassing(scores: number[]): number {
  let count = 0;
  for (const score of scores) {
    if (score >= 50) count++;
  }
  return count;
}`,
            python: `def count_passing(scores):
    count = 0
    for score in scores:
        if score >= 50:
            count += 1
    return count`,
          },
        },
        {
          title: "Many values with uniqueness: detect repeated IDs.",
          code: {
            java: `static boolean hasRepeatedId(int[] ids) {
    Set<Integer> seen = new HashSet<>();
    for (int id : ids) {
        if (!seen.add(id)) return true;
    }
    return false;
}`,
            typescript: `function hasRepeatedId(ids: number[]): boolean {
  return new Set(ids).size !== ids.length;
}`,
            python: `def has_repeated_id(ids):
    return len(set(ids)) != len(ids)`,
          },
        },
      ],
    },
  },
  "why-collections-exist": {
    recognition: [
      {
        signal: "many values",
        meaning:
          "Once the problem has more than one related value, separate variables stop scaling.",
        example:
          "score1, score2, score3 becomes scores because the same operation repeats.",
        code: {
          java: `int score1 = 90;
int score2 = 85;
int score3 = 92;

// Better: one collection
int[] scores = {score1, score2, score3};`,
          typescript: `const score1 = 90;
const score2 = 85;
const score3 = 92;

// Better: one collection
const scores = [score1, score2, score3];`,
          python: `score1 = 90
score2 = 85
score3 = 92

# Better: one collection
scores = [score1, score2, score3]`,
        },
      },
      {
        signal: "operation decides structure",
        meaning:
          "The same values can belong in different structures depending on what question you ask.",
        example:
          "Scores in order use a list; duplicate detection uses a set; lookup by name uses a map.",
        code: {
          java: `int[] scores = {90, 85, 90};           // preserve order
Set<Integer> unique = new HashSet<>();   // remove repeats
Map<String, Integer> byName = new HashMap<>(); // lookup`,
          typescript: `const scores = [90, 85, 90];     // preserve order
const unique = new Set(scores); // remove repeats
const byName = new Map<string, number>(); // lookup`,
          python: `scores = [90, 85, 90]     # preserve order
unique = set(scores)       # remove repeats
by_name = {}               # lookup`,
        },
      },
      {
        signal: "order vs uniqueness",
        meaning:
          "If position matters, use an ordered structure. If repeated values should collapse, use a set.",
        example:
          "Leaderboard attempts need order; list of visited IDs needs uniqueness.",
        code: {
          java: `ArrayList<Integer> attempts = new ArrayList<>();
attempts.add(90);
attempts.add(90); // both attempts are kept

HashSet<Integer> visitedIds = new HashSet<>();
visitedIds.add(90);
visitedIds.add(90); // duplicate ignored`,
          typescript: `const attempts: number[] = [];
attempts.push(90);
attempts.push(90); // both attempts are kept

const visitedIds = new Set<number>();
visitedIds.add(90);
visitedIds.add(90); // duplicate ignored`,
          python: `attempts = []
attempts.append(90)
attempts.append(90)  # both attempts are kept

visited_ids = set()
visited_ids.add(90)
visited_ids.add(90)  # duplicate ignored`,
        },
      },
      {
        signal: "lookup vs processing",
        meaning:
          "If you need to retrieve by key, use a map. If you need to process in a controlled order, use stack or queue.",
        example:
          "studentId -> score is a map; customer tickets in arrival order are a queue.",
        code: {
          java: `Map<String, Integer> scoreById = new HashMap<>();
scoreById.put("S1", 90);

Queue<String> tickets = new ArrayDeque<>();
tickets.add("ticket-1");
tickets.add("ticket-2");`,
          typescript: `const scoreById = new Map<string, number>();
scoreById.set("S1", 90);

const tickets = ["ticket-1", "ticket-2"];
let nextTicketIndex = 0;`,
          python: `score_by_id = {"S1": 90}

from collections import deque
tickets = deque(["ticket-1", "ticket-2"])`,
        },
      },
    ],
    practice: {
      setup:
        "To choose a collection, do not start by naming a class. Start by naming the operation the program must do repeatedly.",
      steps: [
        "Identify the single value type: number, character, boolean, object, or string.",
        "Ask whether you now have many of that value.",
        "Ask the main operation: access by position, keep unique, lookup by key, process first/last, or sort.",
        "Choose the structure whose internal rule makes that operation easy.",
      ],
      extraExamples: [
        {
          title: "Need position: choose an array/list.",
          code: {
            java: `int[] scores = {90, 85, 92};
int firstScore = scores[0];`,
            typescript: `const scores = [90, 85, 92];
const firstScore = scores[0];`,
            python: `scores = [90, 85, 92]
first_score = scores[0]`,
          },
        },
        {
          title: "Need uniqueness: choose a set.",
          code: {
            java: `Set<Integer> seen = new HashSet<>();
boolean firstTime = seen.add(90);`,
            typescript: `const seen = new Set<number>();
const firstTime = !seen.has(90);
seen.add(90);`,
            python: `seen = set()
first_time = 90 not in seen
seen.add(90)`,
          },
        },
        {
          title: "Need lookup: choose a map/dictionary.",
          code: {
            java: `Map<String, Integer> scores = new HashMap<>();
scores.put("Ada", 90);
int adaScore = scores.get("Ada");`,
            typescript: `const scores = new Map<string, number>();
scores.set("Ada", 90);
const adaScore = scores.get("Ada");`,
            python: `scores = {"Ada": 90}
ada_score = scores["Ada"]`,
          },
        },
      ],
    },
  },
  array: {
    recognition: [
      {
        signal: "maximum/minimum scan",
        meaning: "The problem asks for one best value after looking through a sequence.",
        example: "Largest number, smallest price, earliest timestamp.",
      },
      {
        signal: "two pointers",
        meaning: "You compare or move through positions, often from both ends or at different speeds.",
        example: "Pair sum in a sorted array, reverse an array, remove duplicates in-place.",
      },
      {
        signal: "prefix sums",
        meaning: "You need repeated range totals, so you precompute running totals once.",
        example: "Sum from index 2 to 7 without adding every value each time.",
      },
      {
        signal: "sliding window",
        meaning: "You track a moving range inside the array instead of restarting work.",
        example: "Longest substring, max sum of 3 consecutive numbers.",
      },
    ],
    practice: {
      setup: "For max/min problems, keep one variable that represents the best answer seen so far.",
      steps: [
        "Start with the first item as the current best.",
        "Walk through the rest of the array one item at a time.",
        "If the current item beats the best, replace the best.",
        "Return the best after the scan finishes.",
      ],
      extraExamples: [
        "Find the smallest number.",
        "Find the index of the largest number.",
        "Find the difference between max and min.",
      ],
    },
  },
  "array-list": {
    recognition: [
      {
        signal: "filter results",
        meaning: "You inspect many values and keep only the ones that pass a condition.",
        example: "Keep positives, keep even numbers, keep names longer than 5 letters.",
      },
      {
        signal: "merge arrays",
        meaning: "You produce a new ordered collection from existing collections.",
        example: "Merge two sorted arrays into one sorted result.",
      },
      {
        signal: "build output",
        meaning: "The answer size is unknown until you process the input.",
        example: "Return all duplicates, all matching users, all valid moves.",
      },
      {
        signal: "dynamic programming table",
        meaning: "You store intermediate answers in an indexed structure.",
        example: "Fibonacci table, coin change table, path count table.",
      },
    ],
    practice: {
      setup: "Growable-list problems usually create an empty result and append answers as they are discovered.",
      steps: [
        "Create an empty result list.",
        "Loop through the input.",
        "Check the condition for each item.",
        "Append matching items to the result.",
      ],
      extraExamples: [
        "Return all odd numbers.",
        "Return all strings containing a letter.",
        "Return squares of positive numbers.",
      ],
    },
  },
  "linked-list": {
    recognition: [
      {
        signal: "reverse list",
        meaning: "The problem is about changing node directions, not moving array values.",
        example: "1 -> 2 -> 3 becomes 3 -> 2 -> 1.",
      },
      {
        signal: "cycle detection",
        meaning: "A next pointer may eventually point back to an earlier node.",
        example: "Use slow and fast pointers to detect a loop.",
      },
      {
        signal: "kth from end",
        meaning: "You need a position relative to the tail without knowing the length upfront.",
        example: "Find the 2nd node from the end.",
      },
      {
        signal: "merge sorted lists",
        meaning: "You compare front nodes and relink them into sorted order.",
        example: "Merge 1 -> 4 and 2 -> 3 into 1 -> 2 -> 3 -> 4.",
      },
    ],
    practice: {
      setup: "Linked-list practice is mostly about protecting references before you overwrite them.",
      steps: [
        "Keep a previous pointer for the reversed part.",
        "Keep a current pointer for the node you are visiting.",
        "Save current.next before changing it.",
        "Point current.next backward, then move both pointers forward.",
      ],
      extraExamples: [
        "Detect if a linked list has a cycle.",
        "Remove the nth node from the end.",
        "Merge two sorted linked lists.",
      ],
    },
  },
  stack: {
    recognition: [
      {
        signal: "balanced brackets",
        meaning: "The newest opening symbol must be closed before older openings.",
        example: "([{}]) is valid, ([)] is not.",
      },
      {
        signal: "undo",
        meaning: "The most recent action is the first action reversed.",
        example: "Text editor undo stack.",
      },
      {
        signal: "DFS",
        meaning: "Depth-first traversal can use a stack to remember where to go back.",
        example: "Explore a maze path deeply before trying another path.",
      },
      {
        signal: "next greater element",
        meaning: "A monotonic stack keeps candidates until a future value resolves them.",
        example: "For each temperature, find the next warmer day.",
      },
    ],
    practice: {
      setup: "Stack problems usually ask whether the newest unresolved thing can now be resolved.",
      steps: [
        "Push opening or unresolved values.",
        "When a closing/resolving value appears, check the top.",
        "If the top matches, pop it.",
        "At the end, the stack should contain no unresolved items.",
      ],
      extraExamples: [
        "Validate brackets with (), [], and {}.",
        "Reverse a string.",
        "Evaluate postfix expressions.",
      ],
    },
  },
  "hash-set": {
    recognition: [
      {
        signal: "duplicate",
        meaning: "You need to know if a value appeared before.",
        example: "First repeated number.",
        code: {
          java: `Set<Integer> seen = new HashSet<>();
for (int num : nums) {
    if (!seen.add(num)) return num;
}`,
          typescript: `const seen = new Set<number>();
for (const num of nums) {
  if (seen.has(num)) return num;
  seen.add(num);
}`,
          python: `seen = set()
for num in nums:
    if num in seen:
        return num
    seen.add(num)`,
        },
      },
      {
        signal: "repeated",
        meaning: "The problem is about repeated membership, not order.",
        example: "Does this array contain any repeated value?",
        code: {
          java: `static boolean hasDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) return true;
    }
    return false;
}`,
          typescript: `function hasDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
          python: `def has_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
        },
      },
      {
        signal: "contains",
        meaning: "Fast yes/no membership checks are the main operation.",
        example: "Does list B contain a value from list A?",
        code: {
          java: `Set<Integer> lookup = new HashSet<>();
for (int value : listA) lookup.add(value);

for (int value : listB) {
    if (lookup.contains(value)) return true;
}`,
          typescript: `const lookup = new Set(listA);
for (const value of listB) {
  if (lookup.has(value)) return true;
}`,
          python: `lookup = set(list_a)
for value in list_b:
    if value in lookup:
        return True`,
        },
      },
      {
        signal: "intersection",
        meaning: "You compare two collections and keep values found in both.",
        example: "Common numbers between two arrays.",
        code: {
          java: `static Set<Integer> intersection(int[] a, int[] b) {
    Set<Integer> lookup = new HashSet<>();
    Set<Integer> result = new HashSet<>();
    for (int value : a) lookup.add(value);
    for (int value : b) {
        if (lookup.contains(value)) result.add(value);
    }
    return result;
}`,
          typescript: `function intersection(a: number[], b: number[]): Set<number> {
  const lookup = new Set(a);
  const result = new Set<number>();
  for (const value of b) {
    if (lookup.has(value)) result.add(value);
  }
  return result;
}`,
          python: `def intersection(a, b):
    lookup = set(a)
    result = set()
    for value in b:
        if value in lookup:
            result.add(value)
    return result`,
        },
      },
    ],
    practice: {
      setup: "For duplicate problems, the set represents memory: everything you have already seen.",
      steps: [
        "Create an empty set.",
        "Loop through values in order.",
        "If the value is already in the set, you found the repeat.",
        "Otherwise add the value and continue.",
      ],
      extraExamples: [
        {
          title: "Check if an array has duplicates.",
          code: {
            java: `static boolean hasDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) return true;
    }
    return false;
}`,
            typescript: `function hasDuplicate(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}`,
            python: `def has_duplicate(nums):
    return len(set(nums)) != len(nums)`,
          },
        },
        {
          title: "Find common values between two arrays.",
          code: {
            java: `static Set<Integer> common(int[] a, int[] b) {
    Set<Integer> lookup = new HashSet<>();
    Set<Integer> result = new HashSet<>();
    for (int value : a) lookup.add(value);
    for (int value : b) {
        if (lookup.contains(value)) result.add(value);
    }
    return result;
}`,
            typescript: `function common(a: number[], b: number[]): number[] {
  const lookup = new Set(a);
  return [...new Set(b.filter((value) => lookup.has(value)))];
}`,
            python: `def common(a, b):
    return list(set(a).intersection(b))`,
          },
        },
        {
          title: "Find the first repeated character.",
          code: {
            java: `static Character firstRepeatedChar(String text) {
    Set<Character> seen = new HashSet<>();
    for (char ch : text.toCharArray()) {
        if (!seen.add(ch)) return ch;
    }
    return null;
}`,
            typescript: `function firstRepeatedChar(text: string): string | null {
  const seen = new Set<string>();
  for (const ch of text) {
    if (seen.has(ch)) return ch;
    seen.add(ch);
  }
  return null;
}`,
            python: `def first_repeated_char(text):
    seen = set()
    for ch in text:
        if ch in seen:
            return ch
        seen.add(ch)
    return None`,
          },
        },
      ],
    },
  },
  "linked-hash-set": {
    recognition: [
      {
        signal: "dedupe with order",
        meaning: "The answer must remove repeats but keep the order values first appeared.",
        example: "[bob, ana, bob] becomes [bob, ana], not a random order.",
      },
      {
        signal: "first-seen order",
        meaning: "The first occurrence is the one that matters.",
        example: "Keep the first category tag and ignore later repeats.",
      },
      {
        signal: "stable unique values",
        meaning: "Stable means the original relative order should not change.",
        example: "Clean a list of selected filters without rearranging them.",
      },
    ],
    practice: {
      setup: "LinkedHashSet is the set to reach for when both uniqueness and order are part of the answer.",
      steps: [
        "Create an empty ordered set.",
        "Loop through the input in normal order.",
        "Add each value; duplicates are ignored.",
        "Convert the ordered set back to a list if the answer needs a list.",
      ],
      extraExamples: [
        "Remove duplicate names while keeping order.",
        "Keep first-seen tags.",
        "Clean repeated menu items without changing layout order.",
      ],
    },
  },
  "tree-set": {
    recognition: [
      {
        signal: "sorted unique",
        meaning: "The result needs no duplicates and should come out sorted.",
        example: "[4, 2, 4, 1] becomes [1, 2, 4].",
      },
      {
        signal: "range query",
        meaning: "You care about values between two bounds.",
        example: "All scores from 70 to 90.",
      },
      {
        signal: "floor",
        meaning: "You need the greatest value less than or equal to a target.",
        example: "Closest price at or below 100.",
      },
      {
        signal: "ceiling",
        meaning: "You need the smallest value greater than or equal to a target.",
        example: "Next available appointment at or after 10:00.",
      },
    ],
    practice: {
      setup: "TreeSet is the sorted set. Choose it when sorted order is part of the actual operation, not just final display.",
      steps: [
        "Create a TreeSet.",
        "Add every value; duplicates disappear.",
        "Use normal iteration for sorted values.",
        "Use range/floor/ceiling operations when the question asks for nearby values.",
      ],
      extraExamples: [
        "Return sorted unique numbers.",
        "Find the next greater stored value.",
        "Find all values inside a range.",
      ],
    },
  },
  "hash-map": {
    recognition: [
      {
        signal: "count",
        meaning: "A key needs a number attached to it.",
        example: "word -> how many times it appears.",
      },
      {
        signal: "frequency",
        meaning: "You need to summarize repeated values.",
        example: "Most common character.",
      },
      {
        signal: "lookup",
        meaning: "You have an identifier and need its associated data quickly.",
        example: "studentId -> student record.",
      },
      {
        signal: "two sum",
        meaning: "You need to remember previous numbers by value while scanning once.",
        example: "For target 9, when you see 7, ask if 2 was seen before.",
      },
    ],
    practice: {
      setup: "Map problems attach meaning to a key: count, index, object, or group.",
      steps: [
        "Decide what the key should be.",
        "Decide what value should be stored for that key.",
        "Loop through input and update the map.",
        "Read the map to produce the answer.",
      ],
      extraExamples: [
        "Count each word in a sentence.",
        "Two sum.",
        "Group anagrams by sorted letters.",
      ],
    },
  },
  "linked-hash-map": {
    recognition: [
      {
        signal: "first unique",
        meaning: "You need counts but also need to return the earliest item with a certain count.",
        example: "First character that appears once.",
      },
      {
        signal: "ordered counts",
        meaning: "The map stores counts, but iteration order still matters.",
        example: "Report word counts in the order words first appeared.",
      },
      {
        signal: "LRU cache",
        meaning: "Least-recently-used caches need map lookup plus order tracking.",
        example: "Evict the oldest unused page when capacity is full.",
      },
    ],
    practice: {
      setup: "LinkedHashMap is useful when the key-value relationship is not enough; you also need predictable iteration order.",
      steps: [
        "Create an ordered map.",
        "Scan input and update values by key.",
        "Iterate the map in insertion order.",
        "Return the first entry that satisfies the condition.",
      ],
      extraExamples: [
        "First non-repeating character.",
        "Word counts in first-seen order.",
        "Simple LRU cache design.",
      ],
    },
  },
  "tree-map": {
    recognition: [
      {
        signal: "sorted keys",
        meaning: "The keys must be visited in sorted order.",
        example: "Student IDs should print as 101, 204, 330.",
      },
      {
        signal: "range by key",
        meaning: "You want entries whose keys fall inside a range.",
        example: "All orders placed between two timestamps.",
      },
      {
        signal: "floor key",
        meaning: "You need the closest key at or below a target.",
        example: "Find the latest version number not greater than requested.",
      },
      {
        signal: "ceiling key",
        meaning: "You need the closest key at or above a target.",
        example: "Find the next scheduled event after a time.",
      },
    ],
    practice: {
      setup: "TreeMap is the sorted-key map. Use it when key order drives the operation.",
      steps: [
        "Create a TreeMap.",
        "Insert key-value pairs normally.",
        "Iterate entries to receive sorted keys.",
        "Use range/floor/ceiling methods for nearest-key questions.",
      ],
      extraExamples: [
        "Scores by sorted student ID.",
        "Events sorted by timestamp.",
        "Find nearest version number.",
      ],
    },
  },
  queue: {
    recognition: [
      {
        signal: "BFS",
        meaning: "You visit all neighbors at the current level before going deeper.",
        example: "Shortest path in an unweighted graph.",
      },
      {
        signal: "level order",
        meaning: "Tree nodes must be processed row by row.",
        example: "Print a tree from top to bottom.",
      },
      {
        signal: "tickets",
        meaning: "Oldest request should be handled first.",
        example: "Customer support queue.",
      },
      {
        signal: "arrival order",
        meaning: "Processing order should match insertion order.",
        example: "Print jobs sent to a printer.",
      },
    ],
    practice: {
      setup: "Queue problems preserve fairness: first item in is first item out.",
      steps: [
        "Add starting items to the queue.",
        "Remove from the front.",
        "Process that item.",
        "Add newly discovered items to the back.",
      ],
      extraExamples: [
        "Breadth-first graph traversal.",
        "Tree level-order traversal.",
        "Simulate a printer queue.",
      ],
    },
  },
  deque: {
    recognition: [
      {
        signal: "palindrome",
        meaning: "You compare the first and last values repeatedly.",
        example: "racecar reads the same both ways.",
      },
      {
        signal: "front and back",
        meaning: "Both ends matter as active positions.",
        example: "Remove from front, add to back.",
      },
      {
        signal: "sliding window maximum",
        meaning: "A monotonic deque tracks candidates for the best value in the current window.",
        example: "Maximum of every 3-number window.",
      },
    ],
    practice: {
      setup: "Deque problems usually need cheap access to both ends.",
      steps: [
        "Load or track values in order.",
        "Compare or remove from the front when it expires.",
        "Compare or remove from the back when it is no longer useful.",
        "Use the remaining front/back as the current answer.",
      ],
      extraExamples: [
        "Palindrome check.",
        "Sliding window maximum.",
        "Implement browser forward/back history.",
      ],
    },
  },
  "priority-queue": {
    recognition: [
      {
        signal: "top k",
        meaning: "You only care about the best K items, not the full sorted list.",
        example: "Top 5 scores.",
      },
      {
        signal: "kth largest",
        meaning: "You repeatedly remove or maintain priority until position K.",
        example: "3rd largest value.",
      },
      {
        signal: "merge k lists",
        meaning: "You repeatedly choose the smallest current item among many lists.",
        example: "Merge sorted logs from multiple servers.",
      },
      {
        signal: "shortest path",
        meaning: "You always expand the currently cheapest option next.",
        example: "Dijkstra's algorithm.",
      },
    ],
    practice: {
      setup: "Priority queue problems ask for the next best item many times.",
      steps: [
        "Choose whether smaller or larger values should come out first.",
        "Insert candidate values into the priority queue.",
        "Poll when you need the next best item.",
        "Optionally keep the heap size limited to K.",
      ],
      extraExamples: [
        "Find kth largest.",
        "Top K frequent words.",
        "Merge K sorted arrays.",
      ],
    },
  },
  "binary-tree": {
    recognition: [
      {
        signal: "depth",
        meaning: "Depth asks how far a node is from the root, so you are moving down levels.",
        example: "Maximum depth of a tree means the longest root-to-leaf path.",
      },
      {
        signal: "traversal",
        meaning: "Traversal means visiting nodes in a specific order.",
        example: "Pre-order visits node before children; post-order visits children before node.",
      },
      {
        signal: "lowest common ancestor",
        meaning: "You need the deepest node that contains two target nodes under it.",
        example: "The shared manager closest to two employees in an org chart.",
      },
      {
        signal: "level order",
        meaning: "You need to visit the tree row by row.",
        example: "Print all nodes at depth 0, then depth 1, then depth 2.",
      },
    ],
    practice: {
      setup: "For binary tree depth, each node asks the same question of its left and right child.",
      steps: [
        "If the node is null, its depth is 0.",
        "Recursively find the depth of the left child.",
        "Recursively find the depth of the right child.",
        "Return 1 plus the larger child depth.",
      ],
      extraExamples: [
        "Find minimum depth of a tree.",
        "Print level-order traversal.",
        "Find lowest common ancestor.",
      ],
    },
  },
  tree: {
    recognition: [
      {
        signal: "ordered search",
        meaning: "Each comparison tells you which whole side of the tree can be ignored.",
        example: "Looking for 7 at node 10 means go left.",
      },
      {
        signal: "validate BST",
        meaning: "You must prove every node respects lower and upper bounds.",
        example: "Left descendants must be smaller; right descendants must be larger.",
      },
      {
        signal: "in-order sorted",
        meaning: "In-order traversal of a BST visits values from smallest to largest.",
        example: "A BST containing 3, 1, 2 prints 1, 2, 3 in-order.",
      },
      {
        signal: "successor/predecessor",
        meaning: "You need the next larger or next smaller value in sorted order.",
        example: "The successor of 8 is the smallest value greater than 8.",
      },
    ],
    practice: {
      setup: "For BST search, each comparison eliminates one side of the tree.",
      steps: [
        "Start at the root.",
        "If the root is null, the value is not present.",
        "If the current value matches, return true.",
        "If target is smaller, search left; if larger, search right.",
      ],
      extraExamples: [
        "Validate whether a tree is a BST.",
        "Return values in sorted order.",
        "Find the next greater value.",
      ],
    },
  },
  trie: {
    recognition: [
      {
        signal: "prefix",
        meaning: "The question cares about the beginning of words, not just full-word equality.",
        example: "Find all words that start with app.",
      },
      {
        signal: "startsWith",
        meaning: "You only need to know if a prefix path exists.",
        example: "Does any saved word start with pre?",
      },
      {
        signal: "autocomplete",
        meaning: "User types characters and you return possible completions.",
        example: "Typing ca suggests car, cat, cart.",
      },
      {
        signal: "word search",
        meaning: "A trie can prune impossible paths while exploring characters.",
        example: "Search many dictionary words on a board.",
      },
    ],
    practice: {
      setup: "Trie problems turn each character into a step down a tree.",
      steps: [
        "Start at the root node.",
        "For each character, create or follow the child node.",
        "After the last character, mark the node as a full word.",
        "For prefix search, stop after the prefix and check that the path exists.",
      ],
      extraExamples: [
        "Implement startsWith.",
        "Build autocomplete suggestions.",
        "Search dictionary words by prefix.",
      ],
    },
  },
  "union-find": {
    recognition: [
      {
        signal: "connected components",
        meaning: "You need to group items that are connected directly or indirectly.",
        example: "How many friend groups are there?",
      },
      {
        signal: "same group",
        meaning: "The question asks whether two items share a representative/root.",
        example: "Are user A and user B in the same network?",
      },
      {
        signal: "union",
        meaning: "You are repeatedly merging groups.",
        example: "Add road between city 1 and city 2.",
      },
      {
        signal: "cycle in undirected graph",
        meaning: "If an edge connects two nodes already in the same set, it creates a cycle.",
        example: "Detect redundant connection.",
      },
    ],
    practice: {
      setup: "Union-Find problems do not need the full path, only whether roots match.",
      steps: [
        "Give every item itself as its starting parent.",
        "Use find to get an item's root.",
        "Use union to connect two roots.",
        "Answer connected by comparing roots.",
      ],
      extraExamples: [
        "Count connected components.",
        "Detect cycle in an undirected graph.",
        "Kruskal's minimum spanning tree.",
      ],
    },
  },
  graph: {
    recognition: [
      {
        signal: "connected",
        meaning: "You need to know whether one thing can reach another through links.",
        example: "Can city A reach city B?",
      },
      {
        signal: "route",
        meaning: "The data behaves like locations and paths.",
        example: "Find a path through airports.",
      },
      {
        signal: "dependency",
        meaning: "One item must come before another.",
        example: "Course prerequisites.",
      },
      {
        signal: "shortest path",
        meaning: "You need the fewest edges or lowest total cost to reach a target.",
        example: "Fewest moves in a maze.",
      },
    ],
    practice: {
      setup: "Graph traversal keeps track of what has been visited so it does not loop forever.",
      steps: [
        "Represent neighbors with an adjacency list.",
        "Add the start node to visited and to the queue.",
        "Remove one node, then inspect its neighbors.",
        "Add unvisited neighbors to visited and queue.",
      ],
      extraExamples: [
        "Find if a path exists.",
        "Count islands in a grid.",
        "Topological sort for dependencies.",
      ],
    },
  },
};
