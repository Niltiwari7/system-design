## Deployment Strategies

> Deployment strategy = How do we release a new version of our application to users while controlling risk, downtime, and rollback.

Imagine you have:
```
Version 1.0
   ↓
Users
```

You developed:
```
Version 2.0
```
The question is:
> How do we move from users from 1.0 -> 2.0 safely?

That's what deployment strategies solve.

### 1. Why do we need deployment strategies?

Suppose you have 100 servers running your application:
```
100 servers
     │
     ▼
   v1.0
     │
  1 million
   users
```

You deployed everywhere:

```
100 servers
     │
     ▼
   v2.0
```

But v2.0 has a bug.

Now 1 million users are affected.

You need to:
- minimize downtime
- minimize blast radius
- detect problems early
- rollback quickly
- gradually introduce changes
- maintain availability


### 2. The important strategies

```
Deployment Strategies
        │
        ├── Recreate
        │
        ├── Rolling Deployment
        │
        ├── Blue-Green
        │
        ├── Canary
        │
        └── A/B Testing
```

### 3. Recreate Deployment
This is the simple strategy.
You have:
```
       Load Balancer
             │
       ┌─────┴─────┐
       │           │
     v1.0        v1.0
```

You stop the old version:
```
       Load Balancer
             │
            ❌
```
Deploy the new version:
```
       Load Balancer
             │
       ┌─────┴─────┐
       │           │
     v2.0        v2.0
```

#### Problem
There is downtime.

```
v1 running
    ↓
STOP
    ↓
deploy v2
    ↓
v2 running
```
During the transition

```
Users → ❌
```

When useful?

Usually:
- development
- internal applications
- applications where downtime is acceptable.
- very simple deployments


### 4. Rolling Deployment

This is much more interesting.
Instead of replacing everything at once, replaces server gradually.

Initially:

```
Load Balancer

 ┌────┬────┬────┬────┐
 │v1  │v1  │v1  │v1  │
 └────┴────┴────┴────┘
```

Deploy to one server:

```
 ┌────┬────┬────┬────┐
 │v2  │v1  │v1  │v1  │
 └────┴────┴────┴────┘
```

Then:

```
 ┌────┬────┬────┬────┐
 │v2  │v2  │v1  │v1  │
 └────┴────┴────┴────┘
```

Then so on:

Why is this useful?

If v2 has a problem:

v2 -> error

Only some servers have the new version.
You can stop the rollout .

This reduces the blast radius.

### 5. Blue - Green Deployment

This is the one of the most important deployment strategies.

Imagine two complete environments:

```
BLUE
────
v1.0
100% production


GREEN
─────
v2.0
not receiving traffic
```

Initially:

```
             Load Balancer
                  │
                  ▼
               BLUE
                v1
```

You deploy v2 to Green:

```
             Load Balancer
                  │
                  ▼
               BLUE
                v1

               GREEN
                v2
```

you test Green.

if everything looks good:

```
             Load Balancer
                  │
                  ▼
               GREEN
                v2
```

Now users are using v2.

### Why is this powerful?
Rollback becomes easy.

Suppose:

```
Green -> v2
```

has a problem.
Simple switch traffic back:
```
             Load Balancer
                  │
                  ▼
               BLUE
                v1
```

That is extremely fast.


### Disadvantage

You are maintaining two environment.
Therefore:
```
Infrastructure cost ≈ 2x
```


### 6. Canary Deployment

Instead of sending traffic to v2 immediately:
> Send a small percentage of real traffic to v2.

Suppose:
```
1,000,000 users
```

Start with:

```
v1 → 99%
v2 → 1%
```

Monitor:
- error rate
- latency
- CPU
- memory
- crashes
- business metrics

If everything looks good:
```
v1 → 95%
v2 → 5%
```

Then
```
v1 → 90%
v2 → 10%
```

Then:
```
v1 → 50%
v2 → 50%
```
Finally:
```
v1 → 0%
v2 → 100%
```

### 7. A/B Testing

A/B testing is slightly different.

Here you're not necessarily testing whether the deployment itself works.

You're testing different behavior/features.

for example:

```
                Load Balancer
                     │
             ┌───────┴───────┐
             ▼               ▼
          Group A          Group B
          Checkout         Checkout
          Button            Button
           Blue              Green
```

Suppose:

```
Group A → old checkout UI
Group B → new checkout UI
```

Then compare:
```
Conversion
Revenue
Click-through rate
User engagement
```

> Determine which product behavior performs better..
