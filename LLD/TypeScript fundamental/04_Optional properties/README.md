### Optional properties
### 1. The real world problem
Imagine we are building an shopping application. Every product has a name and a price, but not every product has a discount.

Should we force every product to have a discount value? No.

for example: 
- Keyboard: name, price, discount
- Mouse: name, price, no discount

We need to tell typescript that a property is not always required.

### 2. Meet `?` Symbol
Typescript lets us mark a property as optional by adding `?` after its name.

```ts
type Product = {
  name: string,
  price: number,
  discount?: number
}
```

Remember: Optional means the property can be omitted. It does not mean that TypeScript stops checking its type when you provide it.