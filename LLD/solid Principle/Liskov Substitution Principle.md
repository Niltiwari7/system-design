### Understand the principle

If a class is a subtype of another class, you should be able to use the subtype wherever the parent type is expected without breaking the program's expected behavior.

Let's use a simple example.

Imagine a Bird class with a fly() method. A Sparrow can fly, so it behaves as expected when used as a Bird.

But what happens if we create a Penguin that inherits from Bird? Penguins cannot fly.

The problem isn't that penguins are birds. The problem is that our parent class promises a behavior that every subtype cannot fulfill.

### Identify the violation

We can separate the general bird concept from the ability to fly.

```ts

class Bird {
  eat(): void {
    console.log("Bird is eating.");
  }
}

interface Flyable {
  fly(): void;
}

class Sparrow extends Bird implements Flyable {
  fly(): void {
    console.log("Sparrow is flying.");
  }
}

class Penguin extends Bird {
  swim(): void {
    console.log("Penguin is swimming.");
  }
}
```

### Coding exercise
Here is a problematic design:
```ts
class Payment {
  refund(): void {
    console.log("Payment refunded.");
  }
}

class RefundablePayment extends Payment {}

class NonRefundablePayment extends Payment {
  refund(): void {
    throw new Error("This payment cannot be refunded.");
  }
}

function processRefund(payment: Payment): void {
  payment.refund();
}
```
Your task is to refactor this design so that a non-refundable payment is not required to support refunds.

Requirements:
1. Create a base Payment class with a pay() method.
2. Create a Refundable interface with a refund() method.
3. Implement Refundable in a CardPayment class.
4. Create a CashPayment class that can make payments but does not implement Refundable.
5. Make processRefund() accept only refundable payments.
Expected behavior:
- CardPayment can be paid and refunded.
- CashPayment can be paid but is not accepted by processRefund().

```ts
// Base class
class Payment {
  pay(): void {
    console.log("Payment processed.");
  }
}

// Refund capability
interface Refundable {
  refund(): void;
}

// Card payment supports refunds
class CardPayment extends Payment implements Refundable {
  refund(): void {
    console.log("Card payment refunded.");
  }
}

// Cash payment does not support refunds
class CashPayment extends Payment {
  // No refund method
}

// Only refundable payments are accepted
function processRefund(payment: Refundable): void {
  payment.refund();
}

// Usage
const card = new CardPayment();
card.pay();
processRefund(card);

const cash = new CashPayment();
cash.pay();

// ❌ Compile-time error
// processRefund(cash);
```