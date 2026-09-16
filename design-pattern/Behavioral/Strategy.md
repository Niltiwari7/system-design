## Strategy Design Pattern

### Mental Modal

Imagine you are building navigation application.

You need different ways to calculate a route.

```text
Route calculation
├── Fastest route
├── Shortest route
├── Avoid tolls
└── Public transport
```

A bad desgin might be:

```ts
if (type === "fastest") {
    // algorithm
} else if (type === "shortest") {
    // algorithm
} else if (type === "avoidTolls") {
    // algorithm
}
```

As strategies increase, this class becomes huge.
```text
                 RouteService
                      │
                      │ uses
                      ▼
                 RouteStrategy
                /      |       \
               /       |        \
              ▼        ▼         ▼
          Fastest    Shortest   AvoidTolls
```

### 1. What problem does it solve?

The main problem is:

> You have multiple algorithms/behaviours for the same task and need to switch between them.

for example

```text
Compression
├── ZIP
├── GZIP
└── TAR
```

without strategy, you might write:
```ts
class FileCompressor {
  compress(type: string) {
    if(type==="zip"){
      // Zip logic
    }

    if(type === "gzip"){
      //GZIP logic
    }

    if(type === "tar") {
      // TAR logic
    }
  }
}

This becomes difficult to maintain.

### 2. What does the structure look like?

```text
             Context
                │
                │ uses
                ▼
          Strategy Interface
           /      |       \
          /       |        \
         ▼        ▼         ▼
    Strategy A Strategy B Strategy C
```

1. Strategy: Defines the common interface.

2. Concrete strategies: Implement different algorithms.

3. Context: Uses a strategy without knowing its implementation details.


### 3. TypeScript implementation

#### Step 1 — Strategy interface

```ts
interface PaymentStrategy {
    pay(amount: number): void;
}
```

This says:
> Every payment strategy must know how to `pay()`

#### Step 2 — Concrete strategies

##### UPI

```ts
class CreditCardPayment implements PaymentStrategy {

    pay(amount: number): void {
        console.log(`Paid ₹${amount} using Credit Card`);
    }
}
```

##### Paypal
```ts
class PayPalPayment implements PaymentStrategy {

    pay(amount: number): void {
        console.log(`Paid ₹${amount} using PayPal`);
    }
}
```
#### 4. Context
Now create the class that uses the strategy.

```ts
class PaymentService {

    constructor(
        private strategy: PaymentStrategy
    ) {}

    makePayment(amount: number): void {
        this.strategy.pay(amount);
    }
}
```

### 4. When should I use Strategy?

1. Multiple algorithms for the same operation.
2. Lots of if/else based on behavior.
3. Behavior needs to change at runtime.
4. you want to add new algorithm without modifying existing code.

### 5. When should I NOT use it?

1. Only one algorithm exists
2. Algorithms aren't actually interchangeable
3. Simple if/else is enough
