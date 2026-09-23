## Rolling Deployment

> Instead of replacing all old application instances at once, replace them gradually while the system continues serving traffic.

### 1. The problem it solves
Suppose you have 5 servers running version v1:

```
                Load Balancer
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
     v1.0           v1.0          v1.0
       │             │             │
       ▼             ▼
     v1.0           v1.0
```

Now you have developed `v2`.

A naive deployment would be:

```
STOP v1
   ↓
Deploy v2 everywhere
   ↓
START v2
```

During that period:
```
Users
  │
  ▼
❌ Service unavailable
```

And if `v2` has a serious bug, every servers affected simultaneously.

### 2. Basic Idea

Start
```
v1  v1  v1  v1  v1
```

Replace one:
```
v2  v1  v1  v1  v1
```

Replace another:
```
v2  v2  v2  v1  v1
```

Continue
```
v2  v2  v2  v1  v1
```

Then:
```
v2  v2  v2  v2  v1
```

Finally:
```
v2  v2  v2  v2  v2
```

### 3. What actually happens ? 
The important part is that the load balancer doesn't send traffic to a server while it begin updated.

Imagine:

```
             Load Balancer
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
      v1         v1         v1
```

We want to update the first server.

First:
```
             Load Balancer
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
      v1         v1         v1
```

Remove it from traffic:

```
             Load Balancer
                  │
             ┌────┴────┐
             ▼         ▼
            v1         v1

           v1 ← updating
```
Deploy:

```
             Load Balancer
                  │
             ┌────┴────┐
             ▼         ▼
            v1         v1

           v2 ← starting
```

Run health checks:

```
v2
 │
 ├── Health check
 ├── Startup check
 └── Readiness check
```

If healthy:
```

             Load Balancer
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
      v2         v1         v1
```
Then repeat.


### 4. Readiness vs Liveness

Liveness

Question:

> Is this application alive?

Readiness

Question:

> Is this application ready to receive traffic?

### 5. Rolling deployment architecture
```
                         Users
                           │
                           ▼
                    Load Balancer
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
            v1.0         v1.0         v1.0
              │            │            │
              └────────────┼────────────┘
                           │
                    Deployment Controller
                           │
                           ▼
                    Update one batch
                           │
                           ▼
                    Start new instance
                           │
                           ▼
                    Readiness Check
                           │
                    ┌──────┴──────┐
                    │             │
                  Fail          Pass
                    │             │
                 Rollback     Add to LB
                                  │
                                  ▼
                            Next instance
```