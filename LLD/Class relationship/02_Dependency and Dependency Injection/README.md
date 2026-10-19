### Dependency and Dependency Injection

### 1. What is dependency?
A dependency exists when one class needs another object to do its work.

For example, a `NotificationService` needs an email sender to send an email
![alt text](image.png)

Here, `NotificationService` depends on `EmailSender`.

There are two ways to build this relationship. Let's start with the problematic approach.

### 2. Creating dependencies inside a class
```ts
class EmailSender {
  send(message : string) : void {
    console.log(`Email sent: ${message}`)
  }
}

class NotificationService {
  private emailSender = new EmailSender();

  notify(message: string) : void {
    this.emailSender.send(message);
  }
}
```

This code works, `NotificationService` decides exactly which sender to create.

Suppose later we want to send SMS notification instead. We may need to modify `NotificationService` itself.

That makes changing or testing the service more difficult.

### 3. Dependency injection
Dependency injection means giving an object the dependency it needs instead of making it create that dependency itself.

```ts
class EmailSender {
  send(message : string) : void {
    console.log(`Email Sent: ${message}`);
  }
}

class NotificationService {
  constructor(private sender : EmailSender) {

  }

  notify(message: string): void {
    this.sender.send(message);
  }
}

const sender = new EmailSender();
const service = new NotificationService(sender);

service.notify("Your order has shipped");
```

Notice the difference:
- `EmailSender` created the outside `NotificationService`.
- The service receives the sender though its constructor.
- The service uses the sender without deciding how it is created.

This is called constructor injection.

### Coding Exercise
Requirements:
1. Create a PaymentProcessor class with a pay(amount: number): void method that prints the amount paid.
2. Create an OrderService class that receives a PaymentProcessor through its constructor.
3. Add a checkout(amount: number): void method that calls pay().
4. Create the processor and pass it to the service from outside.

```ts

class PaymentProcessor {
  pay(amount: number): void {
    console.log(`Payment successful: ${amount}`);
  }
}

class OrderService {
  constructor(private paymentProcessor: PaymentProcessor) {}

  checkout(amount: number): void {
    this.paymentProcessor.pay(amount);
  }
}

const processor = new PaymentProcessor();
const orderService = new OrderService(processor);

orderService.checkout(500);

```