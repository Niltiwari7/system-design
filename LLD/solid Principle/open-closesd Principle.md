### Open/Closed Principle
#### Understand the principle
The open/closed principle says:
> Software should be open for extension but closed for modification.

### Identify the problem
Consider this implementation:
```ts
class PaymentService {
  pay(method: string, amount: number) : void {
    if(method == 'card') {
      console.log(`Paying ${amount} by card`);
    }else if(method == 'upi') {
      console.log(`Paying ${amount} by UPI`)
    }
  }
}

const payment = new PaymentService();
payment.pay("card", 500);
payment.pay("upi", 300);
```

This works for the two supported methods. But suppose we add cash, wallet, and bank transfer payments.

We must keep modifying `PaymentService` and adding more conditions. As the number of payment methods grows, this class becomes harder to maintain and test.

### Improve the design
```ts
interface PaymentMethod {
  pay(amount : number): void;
}

class CardPayment implements PaymentMethod {
  pay(amount: number) : void {
    console.log(`Paying ${amount} by card`);
  }
}

class PaymentService {
  constructor(private paymentMethod: PaymentMethod){}

  pay(amount: number ): void {
    this.paymentMethod.pay(amount);
  }
}

const cardService = new PaymentService(new CardPayment());
cardService.pay(500);
```

### Coding Exercise
You are given this design:
```ts
class DiscountCalculator {
  calculate(type: string, price: number) : number {
    if(type === 'regular') {
      return price*0.05;
    }
    if(type == 'premium') {
      return price*0.20;
    }
    return 0;
  }
}
```
Your task:
1. Create a DiscountStrategy interface with a calculate(price: number): number method.
2. Create RegularDiscount that returns a 5% discount.
3. Create PremiumDiscount that returns a 20% discount.
4. Update DiscountCalculator to receive a DiscountStrategy through its constructor.
5. Demonstrate a regular discount on ₹1,000 and a premium discount on ₹1,000.

```ts
interface DiscountStrategy {
  calculate(price: number): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price * 0.05;
  }
}

class PremiumDiscount implements DiscountStrategy {
  calculate(price: number): number {
    return price * 0.20;
  }
}

class DiscountCalculator {
  constructor(private discountStrategy: DiscountStrategy) {}

  calculateDiscount(price: number): number {
    return this.discountStrategy.calculate(price);
  }
}

// Regular customer
const regularCalculator =
  new DiscountCalculator(new RegularDiscount());

console.log(
  "Regular Discount:",
  regularCalculator.calculateDiscount(1000)
);

// Premium customer
const premiumCalculator =
  new DiscountCalculator(new PremiumDiscount());

console.log(
  "Premium Discount:",
  premiumCalculator.calculateDiscount(1000)
);
```