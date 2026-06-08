# Curriculum Context Ledger

This document tracks the conceptual architecture for the computing learning path. It is not a lesson module. It is the continuity ledger used to prevent missing prerequisite layers, duplicated explanations, and disconnected topic expansion.

## Curriculum Philosophy

The curriculum teaches computing as a layered abstraction system. Each layer exists because the previous layer solved some problems but introduced new limits.

Canonical learning flow:

1. Electricity
2. Transistors
3. Logic Gates
4. CPU Architecture
5. Machine Instructions
6. Operating Systems
7. Memory
8. Primitive Data Types
9. Memory & References
10. Data Structures
11. Algorithms
12. Concurrency
13. Networking
14. Databases
15. Application Engineering
16. Distributed Systems
17. Internet Infrastructure
18. Cloud Computing
19. Modern Software Ecosystems
20. AI Systems

Every section should answer:

- What problem existed?
- Why was this abstraction invented?
- How does it work internally?
- What limitations does it solve?
- What tradeoffs does it introduce?
- What new systems become possible because of it?
- How does it relate to memory, data structures, and algorithms?
- How does it scale into modern software systems?

## Depth Scale

- Level 0: Mentioned only.
- Level 1: Basic beginner explanation.
- Level 2: Internal mechanics explained.
- Level 3: Production engineering understanding.
- Level 4: Distributed systems or scalability implications.
- Level 5: Graduate or systems-level mastery.

## Current Coverage Snapshot

This snapshot reflects the current authored source files:

- `src/data/tutorial-content.ts`
- `src/data/app-layer-content.ts`
- `src/app/page.tsx`

### Fully Or Strongly Covered

No layer is currently complete to Level 5.

Strongest current area:

- Data Structures: Level 2 in many topics, with some Level 3 connections.

Current data structure topics include arrays, dynamic arrays, linked lists, stacks, sets, maps, queues, deques, heaps, binary trees, BSTs, tries, union-find, and graphs. These are presented with internal shape, operation costs, language examples, recognition signals, and interview-style practice.

### Partially Covered

- Primitive Data Types: Level 1.
- Memory & References: Level 1 to partial Level 2.
- Algorithms: Level 1, embedded inside data-structure examples.
- Concurrency: Level 0 to Level 1.
- Networking: Level 0 to Level 1.
- Databases: Level 1 to partial Level 2.
- Application Engineering: Level 2 to partial Level 3.
- Distributed Systems: Level 0 to Level 1.
- Internet Infrastructure: Level 0.
- Cloud Computing: Level 0.
- Modern Software Ecosystems: Level 0.
- AI Systems: Missing.

### Missing Prerequisite Layers

The current app starts at primitive types and collections. The canonical arc requires earlier foundations before primitive types:

- Electricity
- Transistors
- Logic gates
- CPU architecture
- Machine instructions
- Operating systems
- Memory as a first-class layer

These do not need to become electronics or hardware-engineering courses, but they must exist enough to explain why bits, bytes, instructions, memory addresses, processes, and types matter.

## Current Structural Risk

The current content risks becoming a broad application-engineering survey before the algorithm, OS, networking, database, and distributed-system foundations are mature.

Primary risk:

- Framework and production concepts appear before students have the prerequisite mental model.

Examples:

- React Query, Zustand, Room, SwiftData, Redis, ORM migrations, CQRS, event sourcing, CAP, and WebSockets are useful, but they currently appear before a full algorithms layer, a database internals layer, a networking internals layer, and a distributed systems layer.

## Algorithm Layer Requirement

Algorithms must become a first-class curriculum layer.

They must not remain only as examples inside data-structure lessons.

Required algorithm families:

- Problem-solving patterns
- Searching
- Sorting
- Traversal
- Recursion
- Divide and conquer
- Greedy algorithms
- Dynamic programming
- Backtracking
- Graph algorithms
- String algorithms
- Concurrency algorithms
- Distributed algorithms

Every algorithm lesson must include:

- Problem solved
- Naive approach
- Optimized approach
- Internal execution walkthrough
- Memory usage
- Time complexity
- Scalability implications
- Tradeoffs
- Java implementation
- Python implementation
- TypeScript implementation where relevant
- Edge cases
- Interview expectations
- Production system relevance

## Content Generation Rules

Before adding or expanding any lesson:

1. Check whether prerequisite concepts exist at sufficient depth.
2. Add missing conceptual bridges before advanced framework or architecture content.
3. Avoid duplicate explanations unless the repetition adds a new abstraction level.
4. Keep algorithms, data structures, memory, and system design connected.
5. Explain why an abstraction exists before showing how to use it.
6. Prefer durable fundamentals before framework-specific examples.
7. Keep Java examples mandatory for core computing concepts.
8. Include Python examples for general computing concepts.
9. Include TypeScript examples when the topic touches web, Node.js, or modern application engineering.
10. Include production implications once the topic reaches Level 3 or higher.
11. Include distributed implications only when the topic naturally crosses process, machine, or network boundaries.

Every technical topic should include:

- Intuition
- Internal mechanics
- Memory behavior
- Time and space implications
- Real-world use cases
- Java examples
- Python examples
- TypeScript examples where relevant
- Common interview questions
- What interviewers are testing
- Common beginner misunderstandings
- Production engineering implications
- Distributed systems implications when relevant

## Current Gap Register

### Primitive Data Types

Current status: Level 1.

Needs:

- Bits and bytes
- Integer ranges and overflow
- Signed vs unsigned representation
- Floating-point precision
- Boolean representation
- Character encodings
- Value vs reference behavior
- Java primitive vs wrapper distinction
- Primitive arrays vs boxed collections
- Nullability and object references

### Memory & References

Current status: Level 1 to partial Level 2.

Needs:

- Memory addresses
- Stack frames
- Heap allocation
- Object layout
- References and aliasing
- Pass-by-value for references in Java
- Copying vs sharing
- Garbage collection
- Cache locality
- Memory leaks and retention

### Data Structures

Current status: Level 2 with partial Level 3.

Needs:

- Abstract data type vs implementation
- Invariants
- Interface contracts
- Amortized analysis
- Cache behavior
- Failure modes
- Implementation variants
- More explicit transition into algorithms

### Algorithms

Current status: Level 1, embedded.

Needs:

- Separate top-level curriculum layer
- Full algorithm lesson schema
- Sorting and searching modules
- Recursion and traversal modules
- Dynamic programming modules
- Graph algorithm modules
- Correctness reasoning
- Edge-case discipline
- Interview expectation sections

### Concurrency

Current status: Level 0 to Level 1.

Needs:

- Threads and processes
- Scheduling
- Race conditions
- Locks and monitors
- Deadlocks
- Atomic operations
- Thread-safe data structures
- Producer-consumer queues
- Async I/O
- Structured concurrency
- Backpressure

### Networking

Current status: Level 0 to Level 1.

Needs:

- Packets
- IP addressing
- TCP vs UDP
- Ports and sockets
- DNS
- TLS
- HTTP request and response internals
- Latency, bandwidth, and retries
- WebSockets and SSE after HTTP fundamentals

### Databases

Current status: Level 1 to partial Level 2.

Needs:

- Relational model
- SQL fundamentals
- Normalization
- Index internals
- B-trees and LSM trees
- Transactions
- Isolation levels
- MVCC
- Query planning
- Replication
- Sharding

### Application Engineering

Current status: Level 2 to partial Level 3.

Needs:

- Clear dependency on algorithms, networking, and databases
- Testing strategy
- API contracts
- Error handling
- Build and deployment basics
- Observability fundamentals
- Security fundamentals

### Distributed Systems

Current status: Level 0 to Level 1.

Needs:

- Failure model
- Network partitions
- Replication
- Consensus
- Idempotency
- Ordering
- Clocks and time
- Consistency models
- Queues and streams
- Distributed transactions
- CAP as a later synthesis, not the first explanation

### Internet Infrastructure

Current status: Level 0.

Needs:

- DNS internals
- TLS certificates
- Browsers and HTTP
- CDNs
- Proxies
- Load balancers
- Routing basics
- Email and identity infrastructure if relevant

### Cloud Computing

Current status: Level 0.

Needs:

- Compute
- Storage
- IAM
- VPCs and networking
- Containers
- Kubernetes
- Serverless
- Autoscaling
- Observability
- Cost and reliability tradeoffs

### Modern Software Ecosystems

Current status: Level 0.

Needs:

- Git and version control
- Package managers
- Dependency graphs
- Build systems
- CI/CD
- Testing ecosystems
- Security and supply chain
- Open-source maintenance
- Semantic versioning

### AI Systems

Current status: Missing.

Needs:

- Data and features
- Model training vs inference
- Embeddings
- Vector search
- Transformers and attention at the right abstraction level
- LLM application architecture
- Retrieval-augmented generation
- Evaluation
- Monitoring
- Safety and failure modes
- AI infrastructure and serving

## Recommended Next Structural Move

Do not expand application-layer framework content next.

The next curriculum work should create the missing bridge from the current data-structure material into a first-class Algorithms layer.

Recommended immediate sequence:

1. Add a formal Algorithms top-level category and navigation section.
2. Define a reusable algorithm lesson data model.
3. Add introductory lessons:
   - What Is an Algorithm?
   - Complexity and Growth
   - Linear Search
   - Binary Search
   - Sorting Overview
   - Recursion
   - Traversal
4. Then connect existing data-structure practice examples to the new algorithm lessons.

This preserves the intended causality:

Primitive values become many values.
Many values require structure.
Structured data enables procedures.
Procedures become algorithms.
Algorithms become the engine of applications, databases, networking, distributed systems, and AI systems.
