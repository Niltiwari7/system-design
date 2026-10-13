### Type aliases and object types

### 1. The problem we are solving
Imagine we are building library management system. Every book has a title, an author, and a price.

we could write 
```ts
let bookTitle: string = "Clean code";
let author: string = "Robert C. Martin"
let price: number = 450;
```

But as our application grows we will have many books. We need a consistent way to describe what information every book should contain.

### 2. Understand object types
An object groups related information together.
```ts
let book = {
  title : "Clean code",
  author: "Robert C. Martin",
  price: 450
};
```

### 3. What is a type alias?
A type alias gives a name to a type so you can reuse it.

```ts
type Book = {
  title: string,
  author: string,
  price: number
};
```
> A `Book` must have a `title` that is a string, an `author` that is a string and a `price` that is a number.

Now we can create multiple books using that same description.
```ts
type Book = {
  title: string;
  author: string;
  price: number;
};

let book1: Book = {
  title: "Clean Code",
  author: "Robert C. Martin",
  price: 450
};

let book2: Book = {
  title: "The Pragmatic Programmer",
  author: "Andrew Hunt",
  price: 600
};
```
Why is this useful?
Without a reusable type, you might accidentally give one book a numeric title or forget its price. With the Book type, TypeScript catches these mistakes.

### 4. What happens if we make a mistake?
Consider this code:
```ts
type Product = {
  name: string;
  price: number;
};

let product: Product = {
  name: "Keyboard",
  price: "1500"
};
```

TypeScript reports an error because `price` expects a number, but "1500" is a string.

The correct version is:
```
let product: Product = {
  name: "Keyboard",
  price: 1500
};
```

