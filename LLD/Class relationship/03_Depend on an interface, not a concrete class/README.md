### Depend on an interface, not a concrete class
### 1. The problem
Our previous implementation was:

```ts
class OrderService {
  constructor(private paymentProcessor: PaymenntProcessor){}

  checkout(amount: number): void {
    this.paymentProcessor.pay(amount)
  }
}
```

This works, but `OrderService` specifically requires a `PaymentProcessor` object.

what if we want to support different payment method, such as UPI or a mock payment processor for testing?

We want `OrderService` to care about what the payment object can do, not its specific class.

### The solution
An interface is a contract that specifies which methods an object must provide.

```ts
interface PaymentMethod {
  pay(amount: number) : void;
}
```
Any class implementing PaymentMethod must provides a compatible `pay()` method.

```ts
interface PaymentMethod {
  pay(amount: number): void;
}

class CardPayment implements PaymentMethod {
  pay(amount: number) : void {
    console.log(`Card payment successful: ${amount}`)
  }
}

class UpiPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`UPI payment successful: ${amount}`);
  }
}

class CashPayment implements PaymentMethod {
  pay(amount:number) : void {
    console.log(`Cash payment successful: ${amount}`)
  }
}
class OrderService {
  constructor(private paymentMethod: PaymentMethod) {}

  checkout(amount: number): void {
    this.paymentMethod.pay(amount);
  }
}

const cardOrder = new OrderService(new CardPayment());
cardOrder.checkout(500);

const upiOrder = new OrderService(new UpiPayment());
upiOrder.checkout(300);

const cashOrder = new OrderService(new CashPayment())
cashOrder.checkout(200)
```

**Expected output**
```
Card payment successful: 500
UPI payment successful: 300
Cash payment successful: 200
```
What changed?
- PaymentMethod defines the contract.
- CardPayment and UpiPayment implement that contract.
- OrderService depends on the interface, not either concrete class.
- We can switch payment implementations without modifying OrderService.