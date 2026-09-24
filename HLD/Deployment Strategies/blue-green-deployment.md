## Blue-Green Deployment
> Blue-Green deployment keeps two production environments- one running the current version and another running the new version- and switches traffic between them.

The key idea is:

```
Blue   = current/old version
Green  = new version
```

### 1. What problem does it solve?
Imagine you have:

```
Users
  │
  ▼
Load Balancer
  │
  ▼
100 servers running v1
```

You want to deploy v2.

With a traditional deployment you might update those servers gradually.

But there is a problem:
> What if v2 has a serious bug after you have deployed it?

With Blue-Green, you prepare the entire new environment before sending production traffic to it.

### 2. The basic structure
```
                    Users
                      │
                      ▼
                Load Balancer
                      │
                      ▼
               ┌────────────┐
               │   BLUE     │
               │   v1.0     │
               │   ACTIVE   │
               └────────────┘

               ┌────────────┐
               │   GREEN    │
               │   v2.0     │
               │   IDLE     │
               └────────────┘
```

Only Blue receives production traffic.

Green is running but doesn't receive normal production traffic.

### 3. Deployment process

Suppose:
```
Blue  → v1
Green → v2
```

### Step - 1 - Users are on Blue
```
Users
  │
  ▼
Load Balancer
  │
  ▼
BLUE
v1
```

### Step 2- Deploy v2 to green
You create the new environment
```
BLUE                 GREEN
────                 ─────
v1                   v2
ACTIVE                IDLE
```

For example:
```
Green
 │
 ├── Health check
 ├── Integration tests
 ├── Smoke tests
 └── Application checks
 ```

Users are still using Blue.

### 4. The traffic switch

If green looks healthy:

```
Before:

Users
  │
  ▼
Load Balancer
  │
  ▼
Blue v1
```

Switch traffic
```
After:

Users
  │
  ▼
Load Balancer
  │
  ▼
Green v2
```

Now:
```
BLUE                 GREEN
────                 ─────
v1                   v2
IDLE                 ACTIVE
```

### 5. Why is rollback so powerful?

Suppose after switching:
```
Green → v2
```

you discover:
```
Error rate ↑
Latency ↑
Payments failing
```

Instead of redeploying v1, you can switch traffic back:
```
Users
  │
  ▼
Load Balancer
  │
  ▼
BLUE
v1
```

So:
```
GREEN → ❌

        ↓ rollback

BLUE → ✅
```
This can be extremely fast.

That is the major advantage of Blue-Green.

### 6. Complete flow

```
                    Users
                      │
                      ▼
               ┌─────────────┐
               │Load Balancer│
               └──────┬──────┘
                      │
                      ▼
              ┌───────────────┐
              │     BLUE      │
              │      v1       │
              │    ACTIVE     │
              └───────────────┘

              ┌───────────────┐
              │     GREEN     │
              │      v2       │
              │     IDLE      │
              └───────────────┘
```

### 7. Why Blue and Green?
There is not technically about the colors.
They are simply names for two environments:

```
Blue  = Environment A
Green = Environment B
```

### 8. Advantage
- Fast rollback.

### 9. Disadvantage
- Two environment

### 10. When would you use Blue-Green?
- rollback needs to be very fast
- downtime should be minimized
- you can afford duplicate infrastructure
- you want to fully test the new environment before cutover
- the application can support two environments simultaneously


### 11. When would you avoid it?
- infrastructure cost is very sensitive
- the application is extremely large and duplicating the environment is expensive
- maintaining two environments is operationally difficult
- database/state compatibility makes the two versions difficult to run safely