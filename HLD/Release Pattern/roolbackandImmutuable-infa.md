### 1. Rollback
Rollback means returning the system to a previous known-good version when the new release has a problem.

Example:
```
Production

v1.0  ────────────────> v2.0
                         ❌ Bug

                    ROLLBACK

v1.0  <────────────────
```

### Why do we need rollback?
Imagine we deploy:
```
v1 → v2
```


After deployment we discover:
- 20% increase in 500 errors.
- Api latency doubled
- Checkout is failing
- Memory usage is increasing

We don'n want engineers debugging for 2 hours while users are affected.

Instead:

```
Detect problem
     ↓
Stop rollout
     ↓
Rollback
     ↓
Restore healthy version
     ↓
Investigate v2
```


### Different rollback approaches

#### 1. Rolling deployment
Suppose
```
Before:

v1 v1 v1 v1 v1

During:

v2 v2 v1 v1 v1
```

if v2 starts failing:
```
Stop rollout
```
we can replace the unhealthy v2 instances with v1.


#### 2. Blue-Green
This is one of the easiest rollback strategies.
```

             Load Balancer
                  |
             ┌────┴────┐
             ↓         ↓
          BLUE       GREEN
           v1          v2
          ACTIVE      NEW
```

If Green is bad:
```
Traffic
   ↓
BLUE v1
```


we simply switch traffic back.

```
Before:

Users → Green v2

After rollback:

Users → Blue v1
```

#### 3. Canary
Suppose:
```
v1 → 99%
v2 → 1%
```

Ww discover:
```
v2 error rate = 15%
```

Stop the rollout.
```
v1 → 100%
v2 → 0%
```

This is another very fast rollback.

#### The important problem: Database rollback

This is where interviews become interesting.

Suppose:
```
Application v1
      ↓
Database
```

We deploy v2 which changes the schema.

```
v2 expects:

users.first_name
users.last_name
```
Then we rollback the application:
```
v2 ❌
↓
rollback
↓
v1
```

But what if the database migration already removed:
```
users.name
```

Now v1 expects:

```
users.name
```

and it does not exist.

so:
> Application rollback does not automatically mean db rollback.

This is why we follow:

```
Expand
   ↓
Migrate
   ↓
Deploy
   ↓
Verify
   ↓
Contract
```

### 2. Immutable Infrastructure

Now let's connect this with rollback.

What does immutable mean?

Immutable infrastructure means that once a server/container/image is deployed, we don't modify it in place.

Instead of:

```
Server v1
   ↓
SSH
   ↓
install packages
   ↓
change config
   ↓
patch code
   ↓
Server v2
```

we do:
```
Build new image
      ↓
Deploy new instance
      ↓
Test
      ↓
Remove old instance
```

The old infrastructure is never modified.