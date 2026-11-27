# Polymorphism

## What problem does polymorphism solve?
Let's start with the real world example.
Imagine you are developing an e-commerce application.

Your application support three payment methods:
- Credit card
- UPI
- PayPal

All three payment methods perform the same high level operation:
Process a payment.
However the internal implementation is different:
For example:
|Payment method | Internal behavior
|---|---|
| Credit Card | Communicates with card payment provider 
| UPI | Initiates UPI transaction |
| PayPal | Communicates with PayPaly API

The business requirement is simple:
```
The order service should process payments without knowing which payment method is begin used internally.
```

This is where polymorphism becomes useful.

## Problem without polymorphism
Consider this implementation
```ts
type PaymentMethod = "CREDIT_CARD" | "UPI" | "PAYPAL"

class PaymentService {
  processPayment (
    method : PaymentMethod,
    amount : number
  ) : void {
    if(method === "CREDIT_CARD") {
      console.log(`Processing credit card payment: ${amount}`)
    } else if(method === "UPI") {
      console.log(`Processing UPI Payment: ${amount}`)
    }else if(method === "PAYPAL") {
      console.log(`Processing PayPal payment: ${amount}`)
    }
  }
}
```

Usage:
```ts
const paymentService = new PaymentService();
paymentService.processPayment("UPI", 1000);
paymentService.processPayment("PAYPAL", 2000);
```

This implementation works.

So why is it a problem?
Because every time we introduce a new payment method, we need modify the existing `PaymentService`.

Imagine the business introduces:
- Stripe
- Apple Pay
- Google Pay
- Razorpay
- Cryptocurrency

We end up modifying the same class repeatedly.

Problems with this approach
1. Growing conditional statements
2. Tight coupling
3. Difficult maintenance
4. Poor extensibility
5. Testing complexity
6. Violates Open Closed Principle

## Polymorphism solution
Let's understand the word first.

Polymorphism means:
- Poly = Many
- Morph = Forms

In object-oriented programming:
```
Polymorphism allows objects of different concrete types to be treated thought a
common abstraction while providing their own implementations of the same behavior.
```
In simple language:
Same interface, different implementations.

### Step 1: Create the interface
```ts
interface PaymentProcessor {
  pay(amount : number) : void;
}
```

This interface establishes a contract.

Any class implementing `PaymentProcessor` must provide a compatible `pay()` method.

### Step 2: Create concrete implementations
```ts

class CreditCardProcessor implements PaymentProcessor {
  pay(amount: number): void {
    console.log(
      `Credit card payment: ${amount}`
    );
  }
}

class UpiProcessor implements PaymentProcessor {
  pay(amount: number): void {
    console.log(
      `UPI payment: ${amount}`
    );
  }
}

class PayPalProcessor implements PaymentProcessor {
  pay(amount: number): void {
    console.log(
      `PayPal payment: ${amount}`
    );
  }
}
```
Notice something important:
All three classes implement the same interface, but each has its own implementation.

### Step 3: Use Polymorphism
```ts
class PaymentService {
  constructor(private processor : PaymentProcessor) {}
  processPayment(amount: number) {
    this.processor.pay(amount)
  }
}
```

Now let's use it.

```ts
const creditCard = new PaymentService(
  new CreditCardProcessor()
)

const upi = new PaymentService(
  new UpiProcessor()
)

const paypal = new PaymentService(
  new PayPalProcessor()
)

creditCard.processPayment(1000)
upi.processPayment(2000);
paypal.processPayment(3000);
```

## How does polymorphism work internally?

we will understand this two things

1. Compile-time behavior
2. Runtime behavior

### A. Compile time behavior in typescript
Look at the example
```ts
const processor: PaymentProcessor =
  new UpiProcessor();
```

What happens?
The TypeScript compiler checks whether UpiProcessor satisfies the PaymentProcessor contract.

It verifies that the required method exists and has a compatible signature.

For example:
```ts
class InvalidProcessor implements PaymentProcessor {
  // Missing pay()
}
```
Typescript will report a compilation error.
Important: TypeScript interfaces are erased during compilation. They don't exist as runtime Javascript object.

### B. Runtime behavior

Now consider:
```ts
const processor: PaymentProcessor =
  new UpiProcessor();

processor.pay(1000);
```

At compile time:
- The variable is typed as PaymentProcessor.
- TypeScript verifies that calling pay() is valid.
At runtime:
- The actual object is a UpiProcessor.
- JavaScript executes the pay() implementation belonging to UpiProcessor.
This is runtime polymorphism through method dispatch.

## Trade-offs and production considerations
Polymorphism is not free.
| Advantages |	Trade-offs |
|---|---|
|Reduces coupling |	More interfaces and classes
| Improves extensibility |	Additional abstraction complexity
| Easier unit testing |	More dependency wiring
| Supports OCP |	Runtime dispatch can complicate debugging
| Independent implementations |	Contracts must be carefully designed