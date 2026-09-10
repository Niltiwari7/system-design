# Adapter Design Pattern

The **Adapter Pattern** is a structural design pattern that allows objects with incompatible interfaces to collaborate and work together without modifying their source code.

---

## 1. Real-World Analogy

```text
+-----------------+          +-----------------+          +---------------+
|   Indian Plug   |  ----->  |     Adapter     |  ----->  |   US Socket   |
| (3-pin rounded) |          | (Transforms Pin)|          | (2-flat slots)|
+-----------------+          +-----------------+          +---------------+

```

A physical travel adapter converts the pins of your plug into a shape that fits a foreign wall socket. The adapter doesn't change how the plug consumes electricity or how the socket provides it—it translates between two incompatible physical interfaces.

---

## 2. What Problem Does It Solve?

Suppose an existing application relies on a standardized interface for payment processing:

```typescript
// Standard interface expected by your application
interface PaymentProcessor {
  pay(amount: number): void;
}

// Client function consuming the standard interface
function checkout(processor: PaymentProcessor) {
  processor.pay(1000);
}

```

Now, you need to integrate a third-party payment library (or a vendor API):

```typescript
// Third-party class with an incompatible interface
class ThirdPartyPayment {
  makePayment(amount: number): void {
    console.log(`Payment of $${amount} processed via ThirdPartyPayment.`);
  }
}

```

### The Incompatibility Problem

* Your application calls `processor.pay(amount)`.
* The third-party library exposes `makePayment(amount)`.

Passing `ThirdPartyPayment` directly to `checkout()` throws a TypeScript compilation error because `ThirdPartyPayment` does not satisfy the `PaymentProcessor` contract.

---

## 3. How Does the Adapter Pattern Solve This?

Instead of altering the third-party class or rewriting core application logic, you wrap the third-party object inside an **Adapter** class that implements your application's target interface.

```typescript
// Adapter converts PaymentProcessor requests into ThirdPartyPayment calls
class PaymentAdapter implements PaymentProcessor {
  constructor(private thirdPartyPayment: ThirdPartyPayment) {}

  pay(amount: number): void {
    // Translates pay() into makePayment()
    this.thirdPartyPayment.makePayment(amount);
  }
}

```

### Usage

```typescript
const thirdParty = new ThirdPartyPayment();
const adapter = new PaymentAdapter(thirdParty);

// The checkout function now works seamlessly
checkout(adapter); // Output: Payment of $1000 processed via ThirdPartyPayment.

```

---

## 4. Pattern Architecture

```text
                  +-------------------+
                  |      Client       |
                  | (checkout function)|
                  +-------------------+
                            |
                            | depends on
                            v
                  +-------------------+
                  | Target Interface  |
                  | (PaymentProcessor)|
                  +-------------------+
                            ^
                            | implements
                            |
                  +-------------------+
                  |      Adapter      |
                  | (PaymentAdapter)  |
                  +-------------------+
                            |
                            | wraps / delegates to
                            v
                  +-------------------+
                  |      Adaptee      |
                  | (ThirdPartyPay)   |
                  +-------------------+

```

### Key Components

| Role | Component in Example | Description |
| --- | --- | --- |
| **Target Interface** | `PaymentProcessor` | The interface that the domain/application expects. |
| **Adaptee** | `ThirdPartyPayment` | The existing or third-party class with an incompatible interface. |
| **Adapter** | `PaymentAdapter` | Implements `Target` and wraps `Adaptee` to translate calls. |
| **Client** | `checkout()` | Executes code against the `Target Interface`. |

---

## 5. Implementations: Object vs. Class Adapter

1. **Object Adapter (Composition - Recommended):**
* Uses object composition: the adapter wraps the adaptee instance.
* Works across languages that support interface implementation (e.g., TypeScript, Java, C#).
* Flexibly adapts subclasses of the Adaptee as well.


2. **Class Adapter (Multiple Inheritance):**
* Inherits from both `Target` and `Adaptee` simultaneously.
* Can only be implemented in languages supporting multiple class inheritance (e.g., C++, Python).
* Less flexible because it tightly couples the adapter directly to the adaptee class.



---

## 6. Why Is This Better Than Modifying Existing Code?

1. **Adherence to Open/Closed Principle (SOLID):** You extend application functionality by adding new adapter classes without touching existing client code or third-party implementations.
2. **Adherence to Single Responsibility Principle (SOLID):** Interface/data transformation logic is isolated within the adapter, leaving business domain logic clean.
3. **Third-Party Code Immutability:** External npm/pip/NuGet libraries shouldn't be altered directly because package updates will overwrite manual edits.
4. **Decoupling and Testability:** The core business application remains completely agnostic of third-party implementation details, making it simple to mock or swap dependencies in unit tests.

---

## 7. When Should You Use It?

* **Integrating Third-Party Libraries or SDKs:** When an external library provides required features but its interface doesn't match your domain models.
* **Working with Legacy Systems:** When refactoring legacy code is risky or prohibited, but modern services need to interact with it.
* **Standardizing Multiple Vendor APIs:** When supporting multiple service providers (e.g., Stripe, PayPal, Square) behind a single unified interface within your application:

```typescript
// Multiple adapters unifying behind one interface
const stripeAdapter = new StripePaymentAdapter(new StripeSDK());
const paypalAdapter = new PayPalPaymentAdapter(new PayPalSDK());

checkout(stripeAdapter);
checkout(paypalAdapter);

```

---

## 8. Trade-Offs

| Advantages | Disadvantages |
| --- | --- |
| Increases code reusability and flexibility. | Increases overall code complexity by introducing extra classes/interfaces. |
| Clean separation of translation logic from domain logic. | Can sometimes mask poorly designed or changing underlying interfaces. |
| Allows integration of completely incompatible classes. | Overuse for minor signature changes can clutter the codebase. |