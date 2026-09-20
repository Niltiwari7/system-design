## State Design Pattern

> State lets an object change its behavior when its internal state changes.

The classic example is an `Order`:

```text
Order
 │
 ├── Pending
 ├── Paid
 ├── Shipped
 └── Delivered
```

The same `Order` behaves differently depending on its current state.

###  1. What problem does it solve?
Imagine you have an order:

It can be:
```
PENDING
PAID
SHIPPED
DELIVERED
CANCELLED
```

Now imagine putting all the behavior inside one class:

```ts
class Order {

    status: string;

    cancel() {
        if (this.status === "PENDING") {
            // cancel
        } else if (this.status === "PAID") {
            // refund
        } else if (this.status === "SHIPPED") {
            // cannot cancel
        } else if (this.status === "DELIVERED") {
            // cannot cancel
        }
    }

    ship() {
        if (this.status === "PENDING") {
            // error
        } else if (this.status === "PAID") {
            // ship
        }
        // ...
    }
}
```

As states and operations increase, you get:

```text
if state == A
if state == B
if state == C
if state == D
...
```

### 2. What does state do?

> Move state specific behavior into separate classes.

```text
                    Order
                      │
                currentState
                      │
          ┌───────────┼───────────┐
          ↓           ↓           ↓
     PendingState  PaidState  ShippedState
```

### 3. TypeScript implementation

#### step 1-state interface
```ts
interface OrderState {
    pay(): void;
    ship(): void;
    cancel(): void;
}
```

### 4. Context
```ts
class Order {

    private state: OrderState;

    constructor() {
        this.state = new PendingState(this);
    }

    setState(state: OrderState): void {
        this.state = state;
    }

    pay(): void {
        this.state.pay();
    }

    ship(): void {
        this.state.ship();
    }

    cancel(): void {
        this.state.cancel();
    }
}
```

### 5. Pending State

```ts
class PendingState implements OrderState {

    constructor(
        private order: Order
    ) {}

    pay(): void {
        console.log("Payment successful");

        this.order.setState(
            new PaidState(this.order)
        );
    }

    ship(): void {
        console.log("Cannot ship unpaid order");
    }

    cancel(): void {
        console.log("Order cancelled");
    }
}
```

Notice something important.

The state can transition the context:

```ts
this.order.setState(
    new PaidState(this.order)
);
```

### 6. Paid State

```ts
class ShippedState implements OrderState {

    constructor(
        private order: Order
    ) {}

    pay(): void {
        console.log("Order already paid");
    }

    ship(): void {
        console.log("Order already shipped");
    }

    cancel(): void {
        console.log(
            "Cannot cancel shipped order"
        );
    }
}
```

The behavior changes because the current state changed.

### 8. Usage
```ts
const order = new Order()
order.ship()
```

Output: Cannot ship unpaid order.

Then
```ts
order.pay()
```

Output: Payment Successful

### 9. When should I use state?
1. Many state-dependent `if/else` statements.
2. State transitions are important.
3. state controls the behavior.

### 10. When should I not use it?
1. Only one or two simple states.
2. State does not affect behavior.
3. state machine is simple.

### 5-point cheat sheet
| Question               | State                                                            |
| ---------------------- | ---------------------------------------------------------------- |
| **1. Problem?**        | Behavior becomes complicated because it depends on current state |
| **2. Structure?**      | Context → current State → Concrete States                        |
| **3. Use when?**       | Many states, state-dependent behavior, explicit transitions      |
| **4. Don't use when?** | Simple state variable or few/no behavior differences             |
| **5. Core idea?**      | **Change behavior by changing the object's state**               |
