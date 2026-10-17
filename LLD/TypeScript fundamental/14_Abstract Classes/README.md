### Abstract Classes

### 1. What is an abstract class?
Imagine we are designing a payment system. Every payment method must support a `pay()` operation, but each method processes payment differently.

- Credit card payment uses card details.
- UPI payment uses a UPI ID.
- Both need a payment operation, but their implementations differ.

### 2. TypeScript implementation
```ts

abstract class Payment {
  constructor(public amount: number) {}

  // Every payment type must implement this
  abstract pay(): void;

  // Shared behavior for all payment types
  showAmount(): void {
    console.log(`Payment amount: ${this.amount}`);
  }
}

class CreditCardPayment extends Payment {
  pay(): void {
    console.log(`Paid ${this.amount} using Credit Card`);
  }
}

class UpiPayment extends Payment {
  pay(): void {
    console.log(`Paid ${this.amount} using UPI`);
  }
}

const payment = new CreditCardPayment(1000);
payment.showAmount();
payment.pay();
```

Output:
```
Payment amount: 1000
Paid 1000 using Credit Card
```
### Coding exercise
Requirements:
1. Animal must be an abstract class.
2. It must declare an abstract method makeSound(): void.
3. It must have a regular method sleep() that prints "Animal is sleeping".
4. Dog must extend Animal and implement makeSound() to print "Dog barks".
5. Create a Dog object and call both methods.
```ts
abstract class Animal {
  // Declare abstract makeSound()
  abstract makeSound():void;

  // Add sleep() that prints "Animal is sleeping"
  sleep(): void {
    console.log("Animal is sleeping");
  }
}

class Dog extends Animal {
  // Implement makeSound()
  makeSound(): void {
    console.log("Dog barks")
  }
}

const dog = new Dog();
dog.makeSound();
dog.sleep();
```