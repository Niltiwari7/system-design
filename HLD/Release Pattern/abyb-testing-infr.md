## A/B testing Infrastructure

### 1. Simple example
Suppose we are building an e-commerce application.

we want to know weather this: `Buy now` or this `Add to cart` produces more purchases.

Instead of guessing, divide users into two groups:

```
                 Users
                   │
                   ▼
              Experiment
               Assignment
                /     \
               /       \
              ▼         ▼
          Group A     Group B
          Control      Variant
             │           │
             ▼           ▼
         BUY NOW      ADD TO CART
```

Then measure:

```
Purchases
Revenue
Click-through rate
Conversion rate
```

This is A/B testing.

### 2. The core idea

we have:

```
Control = A
Variant = B
```

for example:
```
A → Existing checkout
B → New checkout
```

Then:
```
Users
 │
 ├── 50% → A
 │
 └── 50% → B
```

After collecting enough data:

```
A:
100,000 users
5,000 purchases

B:
100,000 users
5,500 purchases
```
we can calculate:
```
A conversion = 5%
B conversion = 5.5%
```
The important point is that the experiment measures the outcome rather than assuming B is better.

### 3. Basic A/B infrastructure
A production system might look like:

```
                         Users
                           │
                           ▼
                  ┌─────────────────┐
                  │ Experiment      │
                  │ Assignment      │
                  └────────┬────────┘
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                 Group A       Group B
                 Control        Variant
                    │             │
                    └──────┬──────┘
                           │
                           ▼
                       User Events
                           │
                           ▼
                    Event Collection
                           │
                           ▼
                    Data Warehouse
                           │
                           ▼
                    Experimentation
                       Analytics
                           │
                           ▼
                        Results
```

### 4. Experiment Assignment Service

This is one of the most important components:

The system needs to answer:

> Which variant should user 123 receive?

for example:
```
User ID = 12345

Experiment = new_checkout

        ↓

Assignment Service

        ↓

Variant B
```

The result might be:

```json
{
  "experiment": "new_checkout",
  "variant": "B"
}
```

### 5. Deterministic assignment

we don't want:
```
Request 1 → A
Request 2 → B
Request 3 → A
```

for the same user.

That would make the experiment unreliable.

Instead of use deterministic hashing.

### 6. Sticky assignment

Suppose user A receives:
```
Experiment: checkout
Variant:B
```

They should continue seeing B.
Otherwise:

```
Monday -> A
Tuesday -> B
Wednesday -> A
```
makes the experiment noisy.

So we need sticky assignment.

Common ways:

```
User ID
Cookie
Account ID
Device ID
```

For logged in application, a stable user/account ID is generally preferable


### 7. Control and Treatment
we may hear these terms.

```
A = Control
B = Treatment / Variant
```

For example:

```
Control : Old checkout
Treatment: New checkout
```

### 8. Exposure event

This is extremely important.
Suppose:
```
User 123 -> Variant B
```

You need to record that the user actually saw/was exposed to B.

Example:
```
{
  "event": "experiment_exposure",
  "userId": "123",
  "experiment": "new_checkout",
  "variant": "B",
  "timestamp": "..."
}
```

Why?
Because merely assigning a user is not necessarily the same as exposing them.

For example:
```
Assigned B
   ↓
User never opened checkout
```

### 9. Event tracking

Now suppose the user completes a purchase.

We record:

```
{
  "event": "purchase",
  "userId": "123",
  "amount": 1499
}
```
Now we can connect:
```
User
 ↓
Experiment assignment
 ↓
Variant B
 ↓
Purchase
```

This is the foundation of experiment analysis.

### 10. A/B infrastructure architecture
```
                         User
                           │
                           ▼
                    API / Application
                           │
                           ▼
                 Experiment Evaluator
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                Control A      Variant B
                    │             │
                    └──────┬──────┘
                           │
                           ▼
                     User Events
                           │
                           ▼
                    Event Collector
                           │
                           ▼
                       Kafka
                           │
                           ▼
                   Stream Processing
                           │
                           ▼
                    Data Warehouse
                           │
                           ▼
                 Experiment Analytics
                           │
                           ▼
                       Dashboard
```