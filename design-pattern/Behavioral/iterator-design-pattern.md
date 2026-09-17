## Iterator Design Pattern

### 1. What problem does it solve?
Imagine you have a custom collection:
```text
MyCollection
├── item1
├── item2
├── item3
└── item4
```
You could expose the internal array:
```ts
collection.items
```

and let the client do:

```ts
for (const item of collection.items){

}
```


But now the client knows that the collections uses an array.

what if you later change it to:
```text
Linked List
```
or 
```text
tree
```
or
```text
Database cursor
```

Your client code may need to change.

Iterator solves this.

Instead of exposing the internal structure.
```text
Client
   │
   │ next()
   ▼
Iterator
   │
   ▼
Collection
```

### 2. What does the structure look like?
```text
                Collection
                    │
              createIterator()
                    │
                    ▼
                 Iterator
                /        \
               /          \
              ▼            ▼
       hasNext()         next()
```

#### 1. Iterator
Defines how to traverse.

```ts
interface Iterator<T> {
  hasNext(): boolean;
  next():T;
}
```


#### 2. Concrete Iterator
Actually performs the traversal.
```text
ArrayIterator
TreeIterator
LinkedListIterator
```

#### 3. Collection
Contains the data

#### 4. Concretes collection
Creates the appropriate iterator.

### 3. TypeScript Implementation
Let's create a custom collection.

#### Step 1 - Iterator interface

```ts
interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}
```

This gives the client a standard way to traverse.

#### Step 2 — Collection
```ts
class BookCollection {
    private books: string[] = [];

    add(book: string): void {
        this.books.push(book);
    }

    getIterator(): Iterator<string> {
        return new BookIterator(this.books);
    }
}
```

Notice: `getIterator()` instead of exposing `getBooks()`.

#### Step 3 — Concrete Iterator
```ts
class BookIterator implements Iterator<string> {

    private index = 0;

    constructor(
        private books: string[]
    ) {}

    hasNext(): boolean {
        return this.index < this.books.length;
    }

    next(): string {
        if (!this.hasNext()) {
            throw new Error("No more books");
        }

        return this.books[this.index++];
    }
}
```

#### 4. Using the Iterator
```ts
const books = new BookCollection();

books.add("Clean Code");
books.add("Design Patterns");
books.add("The Pragmatic Programmer");

const iterator = books.getIterator();

while (iterator.hasNext()) {
    console.log(iterator.next());
}
```

###  4. When should I use Iterator?

- ① Custom collections
- ② Complex internal data structures


### 5. When should I NOT use it?
- Simple array/list

### Cheat sheet

| Question               | Iterator                                                  |
| ---------------------- | --------------------------------------------------------- |
| **1. Problem?**        | Traverse a collection without exposing its representation |
| **2. Structure?**      | Collection → Iterator → traversal                         |
| **3. Use when?**       | Custom/complex collections or multiple traversal methods  |
| **4. Don't use when?** | Simple collections where built-in iteration is sufficient |
| **5. Core idea?**      | **Separate traversal from collection structure**          |

