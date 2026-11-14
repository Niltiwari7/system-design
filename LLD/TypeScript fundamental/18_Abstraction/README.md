### 1. What is abstraction?
Let's start with a real world example.
Imagine you are driving a car.

When you drive a car, you interact with:
- Steering wheel
- Accelerator
- Brake
- Gear

But you don't need to understand:
- HOw engine burns fuel.
- How the transmission works internally.
- How braking system generates friction.
- How the engine control unit manages combustion.

You only need to know what the car can do, not all the internal details of how it does it.
That is abstraction.

**Technical definition**
Abstraction is an OOP principle that exposes essential functionality while hiding unnecessary implementation details.
Remember these two things:
- What an object can do -> Exposed
- how an object perform that operation -> hidden

### 2. Abstraction in typescript
Let's understand this through payment system.
Our application supports three payment methods
1. Credit Card
2. UPI
3. PayPal

Each payment method processes payments differently.

But the application perspective we only need one common operations:
`pay(amount)`

Let's first see the problem without abstraction

```ts
class CreditCardPayment {
  pay(amount : number) : void {
    console.log(`Paid ${amount} using  Credit Card`)
  }
}

class UPIPayment {
  makeUPIPayment(amount : number) : void {
    console.log(`Paid ${amount} using UPI`)
  }
}

class PayPalPayment {
  processPayPal(amount : number ): void {
    console.log(`Paid ${amount} using PayPal`)
  }
}

```
Notice the problem?
Every payment class has a different method name:
- `pay()`
- `makeUPIPayment()`
- `processPayPal()`
This creates unnecessary dependency on implementation details.

**With abstraction**

First , define a common contract.
```ts
interface Payment {
  pay(amount : number) : void;
}
```
This interface says:
Any class that wants to act as a Payment must implement the pay method.

Now implement it:
```ts
class CreditCardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using Credit Card`);
    }
}

class UPIPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using UPI`);
    }
}

class PayPalPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using PayPal`);
    }
}
```

Now our checkout service can depend on the abstraction.
```ts
class CheckoutService {
    constructor(private payment: Payment) {}

    checkout(amount: number): void {
        this.payment.pay(amount);
    }
}
```
Usage:
```ts
const payment = new UPIPayment();

const checkout = new CheckoutService(payment);

checkout.checkout(1000);
```

