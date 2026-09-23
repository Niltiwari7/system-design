## Visitor Design Pattern

> Visitor lets you add new operations to a group of object types without modifying those object classes.

The easiest mental model is
> Objects hold the data; Visitors hold the operations.

### 1. What problem does it solve?

Imagine you have an AST(Abstract syntax tree) for a programming language.

```
Expression
├── Number
├── Addition
├── Subtraction
└── Multiplication
```

Now you want to perform different operations on this tree:

```
Operations
├── Evaluate
├── Pretty Print
├── Type Check
└── Generate Code
```

Without Visitor, you might put everything inside the node classes:

```ts
class NumberNode {
  evaluate() {}
  prettyPrint() {}
  typeCheck() {}
  generateCode(){}
}
```
Then: 
```ts
class AdditionNOde {
  evaluate() {}
  prettyPrint() {}
  typeCheck() {}
  generateCode() {}
}
```
And:

```ts
class MultiplicationNode {
  evaluate() {}
  prettyPrint() {}
  typeCheck() {}
  generateCde() {}
}
```

Now Imagine adding:
```
Optimize()
Debug()
Serialize()
CollectMetrics()
```

You have to modify every node class.
That the problem visitor addresses.


### 2. What does visitor do?
Instead of

```
Number
 ├── evaluate()
 ├── print()
 ├── typeCheck()
 └── optimize()

Addition
 ├── evaluate()
 ├── print()
 ├── typeCheck()
 └── optimize()
```

We separate the operatics:

```
                  Nodes
             ┌──────┼──────┐
             ↓      ↓      ↓
          Number Addition Multiply
             │      │      │
             └──────┼──────┘
                    │
                 Visitor
                    │
          ┌─────────┼─────────┐
          ↓         ↓         ↓
       Evaluate   Print    TypeCheck
```

Now:
```
Objects → hold structure/data

Visitors → perform operations
```

That is the fundamental idea.

### 3. Structure
There are usually four pieces:

```
              Visitor
          /      |       \
         ↓       ↓        ↓
    visitA() visitB() visitC()


              Element
                 │
             accept()
                 │
        ┌────────┼────────┐
        ↓        ↓        ↓
      NodeA    NodeB    NodeC
```

The important method is:
```ts
accept(visitor)
```
This is where the visitor pattern get interesting.

### 4. TypeScript implementation
Let's use a simple document system.

Suppose we have:

```
Document
├── Text
├── Image
└── Video
```

And we want different operations:

```
Render
Export
Analytics
```

### Step 1-Visitor interface
```ts
interface DocumentVisitor {
  visitText(text : Text) : void;
  visitImage(image : Image) : void;
  visitVideo(video : Video) : void;
}
```
The visitor knows about all element types.

### 5. Element interface
```ts
interface DocumentElement {
  accept(visitor: DocumentVisitor) : void;
} 

```

### 5. Element interface

```ts
interface DocumentElement {
  accept(visitor : DocumentVisitor) : void;
}
```

Every document element must support:

```ts
accept()
```

### 6. Concrete elements

Text:

```ts
class Text implements DocumentElement {
  constructor(public content: string) {}
  accept(visitor: DocumentVisitor) : void {
    visitor.visitText(this)
  }
}
```

Image

```ts
class Image implements DocumentElement {
  constructor(public url : string) {}

  accept(visitor: DocumentVisitor) : void {
    visitor.visitImage(this)
  }
}
```
Video

```ts
class Video implements DocumentElement {
  constructor(public url : string) {}

  accept(visitor:DocumentVisitor) : void {
    visitor.visitVideo(this)
  }
}
```

### 7. Concrete Visitor

Let's create a rendering visitor.

```ts
class RenderVisitor implements DocumentVisitor {

    visitText(text: Text): void {
        console.log(`Rendering text: ${text.content}`);
    }

    visitImage(image: Image): void {
        console.log(`Rendering image: ${image.url}`);
    }

    visitVideo(video: Video): void {
        console.log(`Rendering video: ${video.url}`);
    }
}
```

Now we can create another visitor:

```ts
class AnalyticsVisitor implements DocumentVisitor {

    visitText(text: Text): void {
        console.log(
            `Text length: ${text.content.length}`
        );
    }

    visitImage(image: Image): void {
        console.log(
            `Tracking image: ${image.url}`
        );
    }

    visitVideo(video: Video): void {
        console.log(
            `Tracking video: ${video.url}`
        );
    }
}
```

### 8. When should I use Visitor?
1. You have a stable set of object types
2. You frequently add new operations
3. Operations are unrelated to the object's core responsibility

### 9. When should I NOT use Visitor?
1. Object types change frequently
2. Only one or two operations exist
3. The object structure is simple

### 5-point cheat sheet


| Question               | Visitor                                                  |
| ---------------------- | -------------------------------------------------------- |
| **1. Problem?**        | Need to add many operations to a stable object structure |
| **2. Structure?**      | Visitor + Elements with `accept()`                       |
| **3. Use when?**       | Object types are stable, operations change frequently    |
| **4. Don't use when?** | Object types change frequently or structure is simple    |
| **5. Core idea?**      | **Separate operations from the objects they operate on** |
