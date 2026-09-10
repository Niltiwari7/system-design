#  Facade Pattern

**Pattern Type:** Structural Design Pattern

**Core Intent:** Provides a simplified, unified interface to a complex set of interfaces in a subsystem, reducing coupling and hiding implementation complexity from the client.

---

## 1. Core Concept & Analogy

Think of ordering food on an app like Uber Eats or DoorDash:

```
                  [ Customer / Client ]
                            │
                            │ placeOrder()
                            ▼
                    [ Order Facade ]
                            │
       ┌────────────────────┼────────────────────┐
       ▼                    ▼                    ▼
[ Inventory ]         [ Payment ]          [ Delivery ]
  Check Stock           Charge Card          Assign Driver

```

* **Without Facade:** You would have to manually call the restaurant to verify stock, call the bank to wire money, call a courier to pick up food, and text yourself a receipt.
* **With Facade:** You click **`placeOrder()`**, and the app coordinates all behind-the-scenes subsystems for you.

---

## 2. What Problem Does It Solve?

In complex software systems, a single user-facing action often requires orchestrating multiple independent services.

### Problem: High Coupling & Tight Dependencies

Without a Facade, every client must know:

1. Which subsystems exist.
2. The exact sequence of method calls.
3. How to handle partial failures across steps.

```
Client ───────► InventoryService
Client ───────► PaymentService
Client ───────► ShippingService
Client ───────► NotificationService

```

### Solution: Centralized Orchestration

The Facade acts as a single point of entry. It shields clients from subsystem mechanics and isolates changes inside the subsystem.

```
Client ───────► OrderFacade ───────► [ Inventory, Payment, Shipping, Notification ]

```

---

## 3. Structural Breakdown

```text
                  ┌─────────────────┐
                  │     Client      │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  OrderFacade    │
                  └────────┬────────┘
                           │
      ┌────────────────────┼────────────────────┐
      ▼                    ▼                    ▼
┌───────────┐        ┌───────────┐        ┌───────────┐
│Subsystem A│        │Subsystem B│        │Subsystem C│
└───────────┘        └───────────┘        └───────────┘

```

* **Facade:** Knows which subsystem classes are responsible for a request and delegates client requests to appropriate subsystem objects.
* **Subsystems:** Implement subsystem functionality and handle work assigned by the `Facade` object. They have no knowledge of the facade.

---

## 4. TypeScript Implementation

### Step 1: Define Subsystem Services

```ts
class InventoryService {
  checkStock(productId: string): boolean {
    console.log(`[Inventory] Checking stock for ${productId}...`);
    return true;
  }

  reduceStock(productId: string): void {
    console.log(`[Inventory] Reducing stock for ${productId}`);
  }
}

class PaymentService {
  processPayment(amount: number): boolean {
    console.log(`[Payment] Processing transaction of ₹${amount}...`);
    return true;
  }
}

class ShippingService {
  createShipment(productId: string): void {
    console.log(`[Shipping] Dispatching order for ${productId}...`);
  }
}

class NotificationService {
  sendConfirmation(): void {
    console.log(`[Notification] Order confirmation sent to customer.`);
  }
}

```

---

### Step 2: Implement the Facade

```ts
class OrderFacade {
  private inventory = new InventoryService();
  private payment = new PaymentService();
  private shipping = new ShippingService();
  private notification = new NotificationService();

  placeOrder(productId: string, amount: number): boolean {
    console.log("--- Starting Order Process ---");

    if (!this.inventory.checkStock(productId)) {
      console.log("Order Failed: Out of Stock");
      return false;
    }

    if (!this.payment.processPayment(amount)) {
      console.log("Order Failed: Payment Rejected");
      return false;
    }

    this.inventory.reduceStock(productId);
    this.shipping.createShipment(productId);
    this.notification.sendConfirmation();

    console.log("--- Order Successfully Placed ---");
    return true;
  }
}

```

---

### Step 3: Client Usage Comparison

#### ❌ Before Facade (Verbose & Error-Prone)

```ts
// Client must manage instantiation, logic sequence, and error checks
const inventory = new InventoryService();
const payment = new PaymentService();
const shipping = new ShippingService();
const notification = new NotificationService();

if (inventory.checkStock("P100")) {
  if (payment.processPayment(1000)) {
    inventory.reduceStock("P100");
    shipping.createShipment("P100");
    notification.sendConfirmation();
  }
}

```

#### ✅ With Facade (Clean & Intent-Driven)

```ts
// Client only interacts with a clean high-level method
const orderFacade = new OrderFacade();
orderFacade.placeOrder("P100", 1000);

```

---

## 5. Architectural Comparisons

| Pattern / Term | Primary Purpose | Scope | Modifies Interface? |
| --- | --- | --- | --- |
| **Facade** | Simplifies interaction with a complex subsystem | Code Level / Module | Provides a **new, simpler** interface |
| **Adapter** | Makes two incompatible interfaces work together | Code Level / Wrapper | Translates **one** interface to another |
| **Proxy** | Controls access to an object (caching, auth, logging) | Object Level | Retains the **exact same** interface |
| **API Gateway** | Architectural-level entry point for microservices | System Infrastructure | Aggregates, routes, and secures APIs |

---

## 6. Trade-Off Analysis

### Pros

* **Loose Coupling:** Decouples clients from internal subsystem mechanics.
* **Improved Readability:** Eliminates boilerplate workflow code on the client side.
* **Easier Refactoring:** Subsystem implementations can change without breaking client code.
* **Layering:** Helps establish clear boundaries between system layers.

### Cons

* **Risk of "God Object":** A Facade can easily become overloaded with too many responsibilities if not carefully scoped.
* **Limited Control:** Advanced clients might feel restricted if the Facade masks power features they need access to (solution: leave subsystems accessible for edge cases).

---

## 7. Real-World Use Cases

1. **Complex SDK / Library Wrappers:** Simplifying third-party APIs (e.g., hiding complex OAuth, crypto, and socket steps behind a simple `login()` method).
2. **Microservice Aggregation:** Serving as a client-side or backend-for-frontend (BFF) orchestrator for multiple domain services.
3. **Legacy Code Migration:** Wrapping legacy procedural code with a modern object-oriented facade while refactoring under the hood.
4. **Layered System Interfaces:** Providing an entry point from the UI layer to the Core Domain layer.
