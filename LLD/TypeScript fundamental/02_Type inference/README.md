### Type inference
> Typescript can often figure out a variable's type automatically, so we don't always need to write it yourself.

for example:
```ts
let username="Nilesh";
let age = 25;
let isStudent = true
```

Typescript infers these types:
- `username` -> `string`
- `age` -> `number`
- `isStudent` -> `boolean`

This is called type inference.

Important: Type inference doesn't mean TypeScript accepts any value. It means TypeScript works out the type for you.