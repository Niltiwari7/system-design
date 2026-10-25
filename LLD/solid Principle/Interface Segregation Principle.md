### Interface Segregation Principle

### Understand the principle
The Interface Segregation Principle says:
> A class should not be forced to implement methods it doesn't need.

### Identify the violation
Consider this interface:
```ts

interface Worker {
  cook(): void;
  processPayment(): void;
  generateReport(): void;
}

class Chef implements Worker {
  cook(): void {
    console.log("Cooking food.");
  }

  processPayment(): void {
    throw new Error("Chef doesn't process payments.");
  }

  generateReport(): void {
    throw new Error("Chef doesn't generate reports.");
  }
}

```
The `Chef` class is forced to implement methods it doesn't need. Throwing errors just to satisfy the interface is a warning sign.

The interface combines unrelated capabilities into one contract.

### Refactor using smaller interfaces
```ts

interface Cookable {
  cook(): void;
}

interface PaymentProcessor {
  processPayment(): void;
}

interface ReportGenerator {
  generateReport(): void;
}

class Chef implements Cookable {
  cook(): void {
    console.log("Cooking food.");
  }
}

class Cashier implements PaymentProcessor {
  processPayment(): void {
    console.log("Processing payment.");
  }
}

class Manager implements ReportGenerator {
  generateReport(): void {
    console.log("Generating report.");
  }
}
```

### Coding Exercise

Let's apply ISP to a notification system.

Here is the problematic design:

```ts
interface Notification {
  sendEmail(): void;
  sendSMS(): void;
  sendPushNotification(): void;
}

class EmailNotification implements Notification {
  sendEmail(): void {
    console.log("Email sent.");
  }

  sendSMS(): void {
    throw new Error("Not supported.");
  }

  sendPushNotification(): void {
    throw new Error("Not supported.");
  }
}
```
Your task:
1. Create separate interfaces named EmailSender, SMSSender, and PushSender.
2. Create an EmailNotification class that implements only EmailSender.
3. Create an SMSNotification class that implements only SMSSender.
5. Demonstrate sending one notification through each class.
Expected output:
```ts

interface EmailSender {
  sendEmail(): void;
}

interface SMSSender {
  sendSMS(): void;
}

interface PushSender {
  sendPushNotification(): void;
}

class EmailNotification implements EmailSender {
  sendEmail(): void {
    console.log("Email sent.");
  }
}

class SMSNotification implements SMSSender {
  sendSMS(): void {
    console.log("SMS sent.");
  }
}

class PushNotification implements PushSender {
  sendPushNotification(): void {
    console.log("Push notification sent.");
  }
}

const email = new EmailNotification();
email.sendEmail();

const sms = new SMSNotification();
sms.sendSMS();

const push = new PushNotification();
push.sendPushNotification();

```