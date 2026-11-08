### Enum
enum stands for enumeration.

An enum allows us to define a collection of named constants.

for example:
- TODO
- NPROGRESS
- COMPLETED
- CANCELLED

Without enums, we might write:
```ts
let taskStatus = "TODO";
taskStatus = "NPROGRESS";
taskStatus = "COMPLETED";
taskStatus = "CANCELLED";
```
But there is a problem.
What happens someone writes:
```ts
let taskStatus = "COMPLTED";
```
There is a spelling mistake!

TypeScript won't catch this if `taskStatus` is just a normal string.
we can solve this using enums.

```ts
enum TaskStatus {
  TODO,
  NPROGRESS,
  COMPLETED,
  CANCELLED
}
```

### 2. Numeric Enums
By default, TypeScript assigns numbers to enum members, starting from `0`.
Example:
```ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}
```

### 3. String Enums
This is one of the most useful enum types in application development.
Syntax:
```ts
enum EnumName {
  MEMBER="VALUE"
}
```


### 4. Reverse mapping in Numeric enums
This is an interesting feature.

In numeric enums, we can access both:
- The number using the member name.
- The member name using the number

Example:
```ts
enum direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

console.log(direction.NORTH) // 0
console.log(direction[0]) // NORTH
console.log(direction[1]) // SOUTH
```

This is called reverse mapping.

### 5. Const enum
Typescript also provides `const enum`
Example:
```ts
const enum direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}

const dir= direction.NORTH;
console.log(dir)
```



