### Union Types in TypeScript

### 1. The problem 
Imagine we are building a task management application like trello.

A task can have one of three statuses:
- "todo"
- "in-progress"
- "completed"

How do we tell Typescript that a variable can hold a string, but only one of these specific string?

we use a union type.

### 2. What is a union type?

A union type allows a variable to accept more than one specific type. We use the pipe symbol `|` to separate the allowed types.

for example:

```ts
let id: number | string;

id = 101 ; // Valid
id= "TASK-101" // Valid
id = true; // Error

```

### 3. Union types with specific strings

Now let's model task statuses.

```ts
type TaskStatus = "todo" | "in-progress" | "completed";
let status:TaskStatus = "todo";
status = "completed"; // valid
status = "cancelled"; // Error
```

### 4. Use union types with objects
```ts
type TaskStatus = "todo" | "in-progress" | "completed";

type Task = {
  title: string;
  status: TaskStatus;
};

let task1: Task = {
  title: "Learn TypeScript",
  status: "todo"
};

let task2: Task = {
  title: "Practice LLD",
  status: "in-progress"
};
```