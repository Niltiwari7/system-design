### Interfaces in TypeScript

An interface describes what properties an object must have and what types those properties should use.

In typescript, we define that template using `interface`:

```ts
interface User {
  name : string,
  age : number
}

const user1: User = {
  name : "Amit",
  age : 25
};

const user2: User = {
  name: "Priya",
  age: 28
}

```

### 2. Why are interfaces useful in LLD?
Imagine we are designing a library management system. Every book needs a title , author and ISBN.

```ts
interface Book {
  title: string,
  author: string,
  isbn : string
}

const book: Book = {
  title : "Clean code",
  author: "Robert C. Martin",
  isbn : "978-811"
}
```

#### Coding exercise
Create an interface called Employee with these required properties:
- name — a string
- salary — a number
- isFullTime — a boolean
Then create two employee objects that follow your interface.

```ts
interface Employee {
  name: string,
  salary: number,
  isFullTime: boolean
}

const employee1: Employee = {
  name : "Nilesh 1",
  salary: 900000,
  isFullTime: true
};

const employee2: Employee = {
  name : "Nilesh 2",
  salary: 100000,
  isFullTime : true
};
```
