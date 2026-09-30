## Feature Flags

> A feature flag lets you deploy code without necessarily exposing the new feature to users.

### 1. The problem feature flags solve

Imaging we are building a new checkout system.

we finish the code:

```
New Checkout
     ↓
Code completed
```

Normally we might do:

```
Code
 ↓
Deploy
 ↓
Everyone gets new checkout
```

But what if the new checkout has a bug?
we may have to:

```
Rollback entire deployment
```

With a feature flag:

```
Code deployed
     ↓
Feature OFF
     ↓
Users still see old checkout
```

Then you can enable it gradually.
```
1% users
   ↓
10%
   ↓
50%
   ↓
100%
```

### 2. Deployment vs Release
This is the most important concept.
Without feature flags:
```
Write code
   ↓
Deploy
   ↓
Users get feature
```

With feature flags:

```
Write code
   ↓
Deploy
   ↓
Feature OFF
   ↓
Test
   ↓
Enable feature
   ↓
Users get feature
```

So:
```
Deployment
    =
Putting code into production

Release
    =
Making functionality available to users
```

### 3. Feature flag architecture

```
                    Application
                         │
                         │
                         ▼
                  Feature Flag SDK
                         │
                         ▼
                 Feature Flag Service
                         │
                         ▼
                    Flag Storage
```

### 4. Why not simply use configuration?
Because large system need more flexibility
```
new_checkout
     │
     ├── Internal users → ON
     ├── Beta users → ON
     ├── India → ON
     ├── US → OFF
     └── Everyone else → OFF
```

### 4. Types of feature flag

1. Boolean flag
2. User targeting: Enable for specific users
3. Geographic targeting
4. Organization targeting

