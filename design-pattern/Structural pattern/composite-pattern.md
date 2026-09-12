## 1. Mental Model & Overview

The **Composite Pattern** is a structural design pattern used to treat individual objects (Leaves) and collections of objects (Composites) identically through a shared interface.

It organizes objects into a **tree structure** to represent part-whole hierarchies.

```text
               📁 Root Folder (Composite)
             /       |        \
    📄 file1.txt   📄 file2.txt   📁 Sub-Folder (Composite)
      (Leaf)         (Leaf)        /           \
                          📄 image.png       📄 notes.txt
                             (Leaf)            (Leaf)

```

> **Core Rule:** If your code needs to treat a single element and a group of elements the exact same way, use the Composite pattern.

---

## 2. The Problem: Conditional Type Checking

Without the Composite pattern, containers must maintain explicit logic for every unique object type they can hold.

```ts
// ❌ WITHOUT COMPOSITE
class File {
    constructor(public size: number) {}
}

class Folder {
    // Requires separate tracking or explicit type checking
    files: File[] = [];
    subFolders: Folder[] = []; 

    getSize(): number {
        let total = 0;
        
        // Manual calculation for files
        for (const file of this.files) {
            total += file.size;
        }
        
        // Manual calculation for nested folders
        for (const folder of this.subFolders) {
            total += folder.getSize(); // Recursive call required specifically for Folder
        }

        return total;
    }
}

```

### Why this breaks down:

1. **Violates Open/Closed Principle:** Adding a new element type (e.g., `Shortcut`, `Symlink`, `Archive`) forces you to modify every container class and client type-check.
2. **Cluttered Client Code:** The client code must use repetitive `instanceof` checks to execute actions on unknown items.

---

## 3. Structural Breakdown

```text
                     ┌──────────────────┐
                     │    Component     │ <--- Interface / Abstract Class
                     │  + getSize(): #  │
                     └────────┬─────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
     ┌──────────────────┐          ┌──────────────────┐
     │       Leaf       │          │    Composite     │
     ├──────────────────┤          ├──────────────────┤
     │  + getSize(): #  │          │  + children[]    │
     └──────────────────┘          │  + add(item)     │
                                   │  + remove(item)  │
                                   │  + getSize(): #  │
                                   └──────────────────┘

```

The pattern relies on three core roles:

1. **Component**: Defines the common interface for both simple and complex objects (e.g., `FileSystemItem`).
2. **Leaf**: Defines primitive objects that have no children (e.g., `File`). Performs the actual work.
3. **Composite**: Defines container objects that hold child components (Leaves or other Composites). Delegates operations to its children and aggregates the results.

---

## 4. TypeScript Implementation

```ts
// 1. Component Interface
interface FileSystemItem {
    getName(): string;
    getSize(): number;
}

// 2. Leaf (Primitive Object)
class FileItem implements FileSystemItem {
    constructor(private name: string, private size: number) {}

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.size;
    }
}

// 3. Composite (Container Object)
class FolderItem implements FileSystemItem {
    private children: FileSystemItem[] = [];

    constructor(private name: string) {}

    getName(): string {
        return this.name;
    }

    add(item: FileSystemItem): void {
        this.children.push(item);
    }

    remove(item: FileSystemItem): void {
        this.children = this.children.filter(child => child !== item);
    }

    getSize(): number {
        // Delegates work recursively to all children (files AND subfolders)
        return this.children.reduce((total, child) => total + child.getSize(), 0);
    }
}

// ==========================================
// Usage Example
// ==========================================

// Build Leaf items
const file1 = new FileItem("resume.pdf", 500);
const file2 = new FileItem("notes.txt", 100);
const file3 = new FileItem("project1.pdf", 1200);

// Build Child Composite
const projectFolder = new FolderItem("Projects");
projectFolder.add(file3);

// Build Root Composite
const rootFolder = new FolderItem("Documents");
rootFolder.add(file1);
rootFolder.add(file2);
rootFolder.add(projectFolder); // Nesting a composite inside a composite!

// Uniform Usage: The client treats rootFolder, projectFolder, and file1 identically.
console.log(`${rootFolder.getName()} total size: ${rootFolder.getSize()} KB`); 
// Output: Documents total size: 1800 KB

```

---

## 5. Real-World Use Cases

| Domain | Leaf | Composite | Operation |
| --- | --- | --- | --- |
| **GUI Frameworks (DOM/Flutter)** | `Button`, `Text` | `Panel`, `Div`, `Container` | `render()`, `draw()` |
| **Graphics Engines** | `Circle`, `Rectangle` | `Group`, `Layer` | `move()`, `scale()` |
| **E-Commerce Pricing** | `Single Product` | `Box`, `Bundle`, `Pallet` | `getPrice()` |
| **Organization Charts** | `Developer`, `Designer` | `Department`, `Team` | `getSalaryBudget()` |

---

## 6. Trade-offs

### Advantages

* **Polymorphism in Hierarchies:** Simplifies client code by eliminating explicit conditional type checks (`if/else` or `switch`).
* **Flexibility & Extensibility:** New leaf or composite types can be added without breaking existing client code.

### Disadvantages

* **Over-Generalization:** Harder to restrict components in a container at compile time (e.g., preventing a `Folder` from containing specific file types).
* **Recursion Overhead:** Deeply nested tree structures can cause performance bottlenecks or stack overflows if recursive operations are not optimized.