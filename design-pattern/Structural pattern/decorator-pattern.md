# Decorator Design Pattern

## 1. Overview & Mental Model

The **Decorator Pattern** is a structural design pattern that allows behavior to be added to an individual object, dynamically at runtime, without affecting the behavior of other objects from the same class.

### Mental Model: Wrapping Layers

Think of ordering a coffee or putting on winter clothes:

* You start with a base object (**Base Coffee** / **Person**).
* You add a layer (**Milk** / **Shirt**).
* You add another layer (**Sugar** / **Jacket**).
* You add a third layer (**Whipped Cream** / **Raincoat**).

```text
  +---------------------------------------+
  | Whipped Cream Decorator               |
  |   +-------------------------------+   |
  |   | Sugar Decorator               |   |
  |   |   +-----------------------+   |   |
  |   |   | Milk Decorator        |   |   |
  |   |   |   +---------------+   |   |   |
  |   |   |   | Base Coffee   |   |   |   |
  |   |   |   +---------------+   |   |   |
  |   |   +-----------------------+   |   |
  |   +-------------------------------+   |
  +---------------------------------------+

```

Key Takeaway: Each layer **implements the same interface** as the core object and holds a **reference** to the object it wraps.

---

## 2. Problem Statement: Subclass Explosion

Suppose you are building a notification service. You start with a base `EmailNotification`. Soon, business requirements demand new features:

* **Logging** (log notification payloads)
* **Encryption** (encrypt payload before sending)
* **Retry Mechanism** (retry sending if network fails)
* **Metrics Tracking** (record latency and success metrics)

### Static Inheritance Approach (Anti-Pattern)

If you rely on traditional inheritance, every unique combination requires a new subclass:

```text
                     [ Notification ]
                            |
         +------------------+------------------+
         |                                     |
[ LoggingEmail ]                      [ EncryptedEmail ]
         |                                     |
[ LoggingAndEncryptedEmail ]           [ EncryptedAndRetryEmail ]
         |
[ LoggingEncryptedAndRetryEmail ]  <-- Combinatorial Explosion (2^N classes)

```

### Why Inheritance Fails Here

1. **Combinatorial Explosion:** $N$ independent features require up to $2^N$ static classes.
2. **Rigid at Runtime:** You cannot add or remove behaviors dynamically after an object is instantiated.
3. **Violates Single Responsibility Principle (SRP):** Monolithic subclasses end up handling domain logic alongside cross-cutting concerns.

---

## 3. Structural Architecture

The Decorator pattern resolves this by substituting **inheritance** with **aggregation (composition)**.

```text
                  +-------------------+
                  |   <<interface>>   |
                  |    Component      |
                  +-------------------+
                  | + send(msg): void |
                  +-------------------+
                            ^
                            |
          +-----------------+-----------------+
          |                                   |
+-------------------+               +-------------------+
| ConcreteComponent |               |  Base Decorator   |
+-------------------+               +-------------------+
| + send(msg): void |               |- component: Comp  |
+-------------------+               +-------------------+
                                    | + send(msg): void |
                                    +-------------------+
                                              ^
                                              |
                             +----------------+----------------+
                             |                                 |
                   +-------------------+             +-------------------+
                   | ConcreteDecoratorA|             | ConcreteDecoratorB|
                   +-------------------+             +-------------------+
                   | + send(msg): void |             | + send(msg): void |
                   +-------------------+             +-------------------+

```

### Core Participants

1. **Component Interface (`Component`):** Defines the common interface for both wrapped objects and decorators.
2. **Concrete Component (`ConcreteComponent`):** The primary domain object containing basic implementation.
3. **Base Decorator (`Decorator`):** Implements the component interface and maintains a reference (`protected component`) to a component object.
4. **Concrete Decorators (`ConcreteDecorator`):** Extend the base decorator to add extra state or behaviors before/after delegating to the wrapped object.

---

## 4. Complete TypeScript Implementation

### Step 1: Component Interface

```ts
interface Notification {
    send(message: string): void;
}

```

### Step 2: Concrete Component

```ts
class EmailNotification implements Notification {
    send(message: string): void {
        console.log(`[EMAIL SENT] Core payload: "${message}"`);
    }
}

```

### Step 3: Abstract Base Decorator

```ts
abstract class NotificationDecorator implements Notification {
    constructor(protected wrappee: Notification) {}

    send(message: string): void {
        // Default delegation
        this.wrappee.send(message);
    }
}

```

### Step 4: Concrete Decorators

```ts
// 1. Logging Decorator
class LoggingDecorator extends NotificationDecorator {
    send(message: string): void {
        console.log(`[LOG] Logged dispatch attempt at ${new Date().toISOString()}`);
        super.send(message);
    }
}

// 2. Encryption Decorator
class EncryptionDecorator extends NotificationDecorator {
    send(message: string): void {
        const encryptedMessage = this.encrypt(message);
        console.log(`[ENCRYPTION] Payload transformed -> "${encryptedMessage}"`);
        super.send(encryptedMessage);
    }

    private encrypt(data: string): string {
        return `Encrypted(${Buffer.from(data).toString('base64')})`;
    }
}

// 3. Retry Decorator
class RetryDecorator extends NotificationDecorator {
    constructor(wrappee: Notification, private maxRetries: number = 3) {
        super(wrappee);
    }

    send(message: string): void {
        let attempts = 0;
        while (attempts < this.maxRetries) {
            try {
                attempts++;
                console.log(`[RETRY] Attempt ${attempts}/${this.maxRetries}`);
                super.send(message);
                break; // Exit on success
            } catch (error) {
                console.error(`[RETRY] Attempt ${attempts} failed.`);
                if (attempts === this.maxRetries) throw error;
            }
        }
    }
}

```

### Step 5: Flexible Client Usage

```ts
// --- Scenario A: Basic Notification ---
const simpleEmail: Notification = new EmailNotification();
simpleEmail.send("Hello World");
// Output:
// [EMAIL SENT] Core payload: "Hello World"


// --- Scenario B: Email + Encryption + Logging ---
const secureLoggedNotification: Notification = new LoggingDecorator(
    new EncryptionDecorator(
        new EmailNotification()
    )
);

secureLoggedNotification.send("Sensitive Payload");
// Output:
// [LOG] Logged dispatch attempt at 2026-09-12T04:28:21.000Z
// [ENCRYPTION] Payload transformed -> "Encrypted(U2Vuc2l0aXZlIFBheWxvYWQ=)"
// [EMAIL SENT] Core payload: "Encrypted(U2Vuc2l0aXZlIFBheWxvYWQ=)"


// --- Scenario C: Full Stack (Retry -> Logging -> Encryption -> Base) ---
const resilientPipeline: Notification = new RetryDecorator(
    new LoggingDecorator(
        new EncryptionDecorator(
            new EmailNotification()
        )
    ),
    2 // Retries
);

resilientPipeline.send("Mission Critical Data");

```

---

## 5. Execution Call Chain

When `resilientPipeline.send(...)` is called, execution flows inward through the wrappers and then unwinds:

```text
Call Stack Execution Sequence:

Client -> RetryDecorator.send()
            │
            ▼
        LoggingDecorator.send()
            │
            ▼
        EncryptionDecorator.send()  ──> Encrypts Message
            │
            ▼
        EmailNotification.send()   ──> Executes Base Behavior

```

---

## 6. Trade-offs & Analysis

| Advantages | Disadvantages |
| --- | --- |
| **Greater Flexibility than Static Inheritance:** Add/remove responsibilities at runtime. | **Initial Object Configuration Overhead:** Instantiating deeply nested decorators can make initialization verbose. |
| **Adheres to Open/Closed Principle (OCP):** Introduce new behavior without breaking existing classes. | **Order Dependency:** Decorators are often dependent on the sequence in which they wrap (e.g., Encrypt *before* Email vs Encrypt *after* Logging). |
| **Adheres to Single Responsibility Principle (SRP):** Split cross-cutting concerns (logging, auth, retry) into dedicated classes. | **Identity Issues:** A wrapped component is not identical (`===`) to the raw target object, which may trip up reference equality checks. |

---

## 7. Real-World Applications

1. **Standard I/O Streams (Java / Node.js):**
```java
// Java InputStream Decorators
InputStream stream = new BufferedInputStream(new GZIPInputStream(new FileInputStream("data.txt")));

```


2. **HTTP Middleware (Express.js / ASP.NET Core):**
* Wrapping request/response pipeline handling for CORS, Auth, Rate Limiting, and Logging.


3. **UI Toolkit Components:**
* Wrapping a basic `TextView` inside a `ScrollDecorator` and a `BorderDecorator`.



---

## 8. Pattern Comparisons

| Pattern | Intent | Key Difference |
| --- | --- | --- |
| **Decorator** | Dynamically enhances core behavior without changing interface. | Wraps target, keeps same interface, recursive nesting. |
| **Adapter** | Converts one existing interface into another target interface. | Changes interface to make incompatible classes work together. |
| **Proxy** | Controls access to an object (Lazy load, Security, Caching). | Manages object lifecycle; interface identical, but wraps for access control rather than behavior expansion. |
| **Strategy** | Swaps out an entire algorithm implementation internally. | Alters object's *guts* (behavior replacement) rather than *skin* (behavior wrapping). |