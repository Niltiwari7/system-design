## Canary Release

> A canary release deploys a new version to a small percentage of user/traffic first, observes the system, and gradually increases traffic if every thing looks healthy.

```
Small traffic
     ↓
New version
     ↓
Monitor
     ↓
Healthy?
   /   \
 Yes    No
 ↓       ↓
More    Rollback
traffic
```

### 1. Why do we need canary Release?
Suppose we have `1,000,000` users and we deploy `v2`. A dangerous approach is 
```
v1 → 0%
v2 → 100%
```

if `v2` has a bug:
```
1,000,000 users
       ↓
      v2
       ↓
      💥
```

If v2 works wells:

```
v1 → 95%
v2 → 5%
```

Then:
```
v1 → 90%
v2 → 10%
```

Eventually:
```
v1 → 0%
v2 → 100%
```

### 2. Why is it called canary?
Historically, miners used canaries to detect dangerous gases.

The analogy is:
```
Canary
   ↓
Small early signal
   ↓
Danger detected?
   ↓
Stop before everyone is affected
```

In software:

```
Small user group
      ↓
New version
      ↓
Monitor
      ↓
Problem?
      ↓
Stop rollout
```
So the small group of users acts as the canary.

### 3. Basic architecture

Suppose we have:
```
                  Users
                    │
                    ▼
              Load Balancer
                    │
             Traffic Router
                /       \
               /         \
              ▼           ▼
           v1.0         v2.0
           99%           1%
```

### 4. What makes Canary different from rolling?

**Rolling deployment** : 
Replacing instances gradually.
```
v1 v1 v1 v1

↓

v2 v1 v1 v1

↓

v2 v2 v1 v1

↓

v2 v2 v2 v2
```

**Canary release**
> Exposing traffic/users gradually.

```
v1 → 99%
v2 → 1%

↓

v1 → 90%
v2 → 10%

↓

v1 → 0%
v2 → 100%
```

### 5. What should we monitor?
**Application metrics**
```
HTTP 5xx
Error rate
Request latency
Timeouts
Requests/sec
```

**Infrastructure metrics**
```
CPU
Memory
Network
Container restarts
```

### 6. Automatic rollback

A mature canary system can automatically stop or rollback.

Suppose:

```
v1 → 99%
v2 → 1%
```

Everything looks good.

Increase:
```
v1 → 90%
v2 → 10%
```

Suddenly:
```
v2 error rate = 12%
```

The deployment controller can detect this:
```
v2
 │
 ├── Error rate ↑
 ├── Latency ↑
 └── Timeout ↑
       │
       ▼
   Rollback
       │
       ▼
v1 → 100%
v2 → 0%
```

### Architecture

```
                         Users
                           │
                           ▼
                    ┌─────────────┐
                    │Load Balancer│
                    └──────┬──────┘
                           │
                    Traffic Router
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
              v1.0                  v2.0
              99%                    1%
                │                     │
                │                     │
                └─────────┬───────────┘
                          ▼
                     Monitoring
                          │
              ┌───────────┴───────────┐
              │                       │
           Healthy                 Unhealthy
              │                       │
              ▼                       ▼
       Increase traffic             Rollback
              │
              ▼
           5% → 10%
              │
              ▼
           25% → 50%
              │
              ▼
             100%
```