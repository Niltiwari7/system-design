### Interfaces with classes

#### 1. Understand the real world problem
Imagine we are developing an e-commerce application.
our application supports three payment methods.
1. Razorpay
2. Stripe
3. Paypal
All three payment provides pay() operation.
However there internal payment processing logic will be different.

for example:
- Razorpay processes payment using Razorpay APIs.
- Stripe processes payments using Stripe APIs.
- Paypal processes payments using Stripe api.

how we can ensure that every payment provider implements the `pay()` method?
this is where `implements` comes into the picture.

#### 2. Define the interfaces
First , create a contract.

```ts
interface PaymentGateway {
  pay(amount : number) : void;
}
```
Let's understands this:
- `PaymentGateway` is our interface.
- `Pay()` is method signature.
- `amount:number` means the method accepts a number.
- `void` means it doesn't return a value.

Important: we have only declared the method. we haven't written its implementation.

#### 3. Implement the interface in a class
Now let's create our Razorpay class.
```ts
class RazorpayPayment implements PaymentGateWay {
  pay(amount : number) : void {
    console.log(`Processing ${amount} through Razorpay.`)
  }
}
```

![alt text](image.png)


#### 4. Exercise: Notification System
Intermediate

Imagine you're developing a notification service.

Your application supports three notification channels:
- Email
- SMS
- WhatsApp
Task 1: Create an interface
```ts
Create Notification with:
interface Notification {
    send(message: string, recipient: string): void;
}
```


Task 2: Create three classes
- EmailNotification
- SMSNotification
- WhatsAppNotification
All three classes must implement the Notification interface.

Each class should have its own send() implementation.

Task 3: Create a common function

Create:
```ts
function sendNotification(
    notification: Notification,
    message: string,
    recipient: string
): void {
    // Your implementation
}
```

Task 4: Execute all three notification types.

Expected output:
Sending Email to nilesh@gmail.com: Hello!
Sending SMS to 9876543210: Hello!
Sending WhatsApp to 9876543210: Hello!

```ts
// Task 1: Create Notification Interface
interface Notification {
    send(message: string, recipient: string): void;
}

// Task 2: Create three classes implementing Notification

class EmailNotification implements Notification {
    send(message: string, recipient: string): void {
        console.log(`Sending Email to ${recipient}: ${message}`);
    }
}

class SMSNotification implements Notification {
    send(message: string, recipient: string): void {
        console.log(`Sending SMS to ${recipient}: ${message}`);
    }
}

class WhatsAppNotification implements Notification {
    send(message: string, recipient: string): void {
        console.log(`Sending WhatsApp to ${recipient}: ${message}`);
    }
}

// Task 3: Create a common function
function sendNotification(
    notification: Notification,
    message: string,
    recipient: string
): void {
    notification.send(message, recipient);
}

// Task 4: Execute all three notification types

const emailNotification = new EmailNotification();
const smsNotification = new SMSNotification();
const whatsAppNotification = new WhatsAppNotification();

sendNotification(emailNotification, "Hello!", "nilesh@gmail.com");

sendNotification(smsNotification, "Hello!", "9876543210");

sendNotification(whatsAppNotification, "Hello!", "9876543210");
```