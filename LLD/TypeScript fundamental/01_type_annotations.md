### Type annotations
> Telling the computer what kind of a value a variable should hold.

### 1. What is typescript
Javascript lets assign different kind of  value to a variable. Typescript adds rules that help you catch mistakes while writing the code.

Imagine a box labelled Age. we expect a number inside it, not someone's name

Javascript:
```js
let age = 25;
age = "Nilesh"  // Javascript allows this
```
but Typescript:
```ts
let age:number = 25;
age = "Nilesh"  // Error : string is not a number
```

The `: number` part is called a type annotations. it tell typescript that age should hold a number.

### 2. The four basic types
# TypeScript Basic Types

| Type       | What it stores           | Example                          |
|------------|--------------------------|----------------------------------|
| `string`   | Text                     | `"Laptop"`                       |
| `number`   | Numbers                  | `25`, `99.5`                     |
| `boolean`  | True or false values     | `true`                           |
| `string[]` | A list of text values    | `["JavaScript", "TypeScript"]`   |

Notice that typescript uses lowercase `string`, `number` and `boolean`.

### 3. Why does this matter in LLD?
Suppose we are designing a library management system. A book has a title, price and availability status.

```ts
let title : string = "Clean code";
let price: number  = 450;
let isAvailable: boolean = true;
```

These types help us prevent mistakes before we build more complicated designs.

