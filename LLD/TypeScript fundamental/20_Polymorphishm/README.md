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

