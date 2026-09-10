# Prototype Design Pattern

The **Prototype Design Pattern** is a creational pattern that produces new objects by **cloning an existing object** (the prototype) rather than creating new instances from scratch using constructor calls (`new Class()`).

```
+-------------------+                      +-------------------+
|  Original Object  | ---- .clone() ---->  |    New Object     |
|   (Prototype)     |                      |  (Independent)    |
+-------------------+                      +-------------------+

```

---

## 1. Problem Solved

Initializing an object from scratch can be computationally expensive or complex. For instance, creating a document object might require:

```
Document Creation Pipeline
 ├── 1. Load default templates from disk
 ├── 2. Fetch user metadata via API
 ├── 3. Load font configurations
 ├── 4. Run layout & rendering calculations
 └── 5. Construct object state

```

If you need 10 similar documents with only minor differences (e.g., target company name on a resume), running this full initialization pipeline 10 times is inefficient and wasteful.

### The Prototype Solution

Configure **one base prototype object** through the expensive pipeline once, and then simply duplicate it in memory via `.clone()`.

```
                  Base Document (Prototype)
                            │
                       .clone()
                     ┌──────┴──────┐
                     ▼             ▼
              Document A       Document B
             (Google Copy)   (Amazon Copy)

```

---

## 2. Structural Architecture

```
┌─────────────────────────┐
│     <<interface>>       │
│      Prototype<T>       │
├─────────────────────────┤
│ + clone(): T            │
└────────────▲────────────┘
             │
             │ implements
┌────────────┴────────────┐
│    ConcretePrototype    │
├─────────────────────────┤
│ - state: any            │
├─────────────────────────┤
│ + clone(): Prototype    │
└─────────────────────────┘

```

* **`Prototype<T>`**: Declares the cloning interface (typically a single `clone()` method).
* **`ConcretePrototype`**: Implements the `clone()` logic, managing how primitive and reference values are copied.
* **`Client`**: Requests the prototype object to create a duplicate of itself.

---

## 3. TypeScript Implementation

### Step 1: Define Prototype Interface

```ts
interface Prototype<T> {
  clone(): T;
}

```

### Step 2: Implement Concrete Prototype

```ts
interface DocumentMetadata {
  tags: string[];
  createdAt: Date;
}

class Document implements Prototype<Document> {
  constructor(
    public title: string,
    public content: string,
    public author: string,
    public metadata: DocumentMetadata
  ) {}

  // Deep clone implementation
  public clone(): Document {
    return new Document(
      this.title,
      this.content,
      this.author,
      {
        tags: [...this.metadata.tags], // Clone array reference
        createdAt: new Date(this.metadata.createdAt.getTime()) // Clone Date object
      }
    );
  }
}

```

### Step 3: Usage Example

```ts
// 1. Create a base template (expensive setup done once)
const baseResume = new Document(
  "Base Resume",
  "Software Engineer with experience in TypeScript...",
  "Nilesh",
  { tags: ["engineering", "tech"], createdAt: new Date() }
);

// 2. Clone and customize variations rapidly
const googleResume = baseResume.clone();
googleResume.title = "Resume - Google Application";
googleResume.metadata.tags.push("google");

const amazonResume = baseResume.clone();
amazonResume.title = "Resume - Amazon Application";

console.log(googleResume.title); // "Resume - Google Application"
console.log(googleResume.metadata.tags); // ["engineering", "tech", "google"]
console.log(baseResume.metadata.tags); // ["engineering", "tech"] (Unmutated)

```

---

## 4. Shallow Copy vs. Deep Copy

Understanding memory allocation during cloning is essential to avoid reference mutation bugs.

| Metric | Shallow Copy | Deep Copy |
| --- | --- | --- |
| **Primitives** (`string`, `number`, `boolean`) | Copied by value | Copied by value |
| **Objects / Arrays / References** | Copied by **reference** (shared memory) | Copied by **value** (new memory allocation) |
| **Performance** | Extremely fast | Slightly slower (recursive) |
| **Mutation Risk** | **High**—modifying copy's nested state mutates the original | **Zero**—completely isolated objects |

### Shallow Copy Bug Example

```ts
// ❌ Dangerous: Shallow copy using Object.assign or Spread Operator
class BadDocument {
  constructor(public title: string, public metadata: { tags: string[] }) {}

  clone(): BadDocument {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }
}

const doc1 = new BadDocument("Original", { tags: ["v1"] });
const doc2 = doc1.clone();

doc2.metadata.tags.push("v2"); 

// Both objects now point to the same array in memory!
console.log(doc1.metadata.tags); // ["v1", "v2"] 

```

### Deep Copy Strategies in Modern JavaScript / TypeScript

1. **Native `structuredClone()**` *(Recommended for standard objects)*:
```ts
clone(): Document {
  return new Document(
    this.title,
    this.content,
    this.author,
    structuredClone(this.metadata)
  );
}

```


2. **Manual Field Duplication** *(Best performance & explicit control)*:
Explicitly instantiate complex nested references (as shown in Section 3).

---

## 5. When to Use

### Primary Use Cases

1. **Expensive Object Creation**: When constructing an object requires heavy DB queries, network calls, complex algorithms, or file I/O.
2. **Preserving Pre-Configured States**: When you need many instances that share 90% of the same state, with only minor variations needed per instance.
3. **Decoupling from Concrete Classes**: When your code shouldn't depend on the explicit classes of the objects you need to duplicate.
4. **Alternative to Subclassing**: When you want to avoid a massive class hierarchy just to produce variations of complex objects.

---

## 6. Trade-offs

### Advantages

* **Performance Optimization**: Bypasses expensive constructor logic and repeated initialization.
* **Dynamic Configuration**: Create object variations at runtime without altering class structure.
* **Reduced Coupling**: Client code works directly with clones without needing concrete constructor dependencies.

### Disadvantages

* **Complex Nested Copying**: Objects with complex circular dependencies or uncloneable state (e.g., open file streams, DB sockets, DOM nodes) are difficult to deep-clone safely.
* **Hidden Complexity**: If shallow copy is accidentally used instead of deep copy, hard-to-track state-mutation bugs will occur across distant parts of an application.