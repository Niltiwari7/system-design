## CI/CD
> CI/CD is an automated pipeline that takes code from a developer's laptop -> tests it -> builds it -> deploys it safety to production.

### 1. The problem CI/CD solves
Imagine a team of 20 developers

Without CI/CD:

```
Developer
   ↓
Write code
   ↓
"Hey, I pushed my code."
   ↓
Someone manually tests
   ↓
Someone manually builds
   ↓
Someone manually deploys
   ↓
Production 💥
```

This creates problems:
- Human errors
- Inconsistent deployments
- Slow releases
- Bugs reaching production
- Difficult rollback
- work on my machine
- No consistent testing

CI/CD automates this process.

### 2. Continuous Integration 
> CI means developers frequently merge their code into shared repository and automated checks run whenever code changes.

Developer A pushes:
```shell
git push
```

That triggers:
```
Git Push
   ↓
CI Pipeline
   ↓
Install dependencies
   ↓
Lint
   ↓
Unit tests
   ↓
Build
   ↓
Security checks
```

### 4. Why is CI called "Integration"?

Because we are continuously integrating everyone's changes.

Without CI:

```
A works
B works
C works

But:

A + B + C
   ↓
💥
```

With CI:
```
A
 ↓
Integration
 ↓
Tests

B
 ↓
Integration
 ↓
Tests

C
 ↓
Integration
 ↓
Tests
```

### 5. Continuous Delivery

Now imagine CI succeeded.

we have:
```
Source Code
     ↓
Tests
     ↓
Build
     ↓
Artifact
```

For example:
```
my-app
   ↓
Docker Image
   ↓
my-app:v1.5.0
```
Continuous Delivery means:
> The software is always kept in a deployable state.

```
Git Push
   ↓
CI
   ↓
Tests
   ↓
Build
   ↓
Deploy to Staging
   ↓
Tests
   ↓
🛑 Manual Approval
   ↓
Production
```

### 6. Continuous Deployment
Continuous Deployment goes one step further.

```
Git Push
   ↓
CI
   ↓
Tests
   ↓
Build
   ↓
Staging
   ↓
Tests
   ↓
Production
```

No human approval is required.

### 8. Complete CI/CD pipeline

```
                  Developer
                     │
                     │ git push
                     ▼
               Git Repository
                     │
                     ▼
              ┌──────────────┐
              │ CI Pipeline   │
              └──────┬───────┘
                     │
              ┌──────▼──────┐
              │   Lint      │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │ Unit Tests  │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │ Integration │
              │    Tests    │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │    Build    │
              └──────┬──────┘
                     │
                     ▼
                  Artifact
                     │
                     ▼
               Container/Image
                     │
                     ▼
                  Staging
                     │
              ┌──────▼──────┐
              │ E2E Tests   │
              └──────┬──────┘
                     │
                     ▼
                Production
```

### 9. What is an Artifact?

Your source code is not necessarily what you deploy directly. You build it into an artifact.
Examples:
```
Java
 ↓
app.jar

Node.js
 ↓
Docker image

React/Vue
 ↓
dist/

Python
 ↓
package/container
```
That artifact can then be promoted:

```
Artifact
   │
   ├── Development
   │
   ├── Staging
   │
   └── Production
```

> Build once, deploy the same artifact everywhere.

### Interview Question
> Design a CI/CD pipeline for a Node.js application running on Kubernetes
```
Developer
    │
    ▼
GitHub
    │
    ▼
CI Pipeline
    │
    ├── Lint
    ├── Unit Tests
    ├── Integration Tests
    ├── Security Scan
    │
    ▼
Docker Build
    │
    ▼
Container Registry
    │
    ▼
Deploy Staging
    │
    ▼
E2E Tests
    │
    ▼
Production
    │
    ▼
Canary Deployment
    │
    ▼
Monitoring
    │
    ├── Healthy → Increase traffic
    │
    └── Unhealthy → Rollback
```