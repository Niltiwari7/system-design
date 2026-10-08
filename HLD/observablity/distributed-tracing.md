### Distributed Tracing

> Distributed tracing follows a single request as it travels through multiple services.

### 1. Why do we need Distributed Tracing?

Imagine a simple monolith:

```
User
 ↓
Application
 ↓
Database
```

If the request takes 2 seconds, debugging is relatively easy.

But in a microservices architecture:

```
User
 ↓
API Gateway
 ↓
Order Service
 ↓
Payment Service
 ↓
Inventory Service
 ↓
Notification Service
 ↓
Database
```
The request might task 2 seconds.

Which service caused the delay?
Metrics might tell you:

```
p95 latency = 2 sec
```

Logs might contain thousands of entries.

But distributed tracing gives you:

```
Request
│
├── API Gateway       50ms
│
├── Order Service    100ms
│
├── Payment Service  1.5s    ← 🚨
│
├── Inventory         80ms
│
└── Notification      50ms
```

Immediately :
> Payment Service is  the bottleneck.

### 2. What is a Trace?

A trace represents the complete journey of one request through the system.

For example:
```
Trace ID = abc123

User
 ↓
API Gateway
 ↓
Order Service
 ↓
Payment Service
 ↓
Database
```
All these operation belong to the same:
```
Trace ID: abc123
```

So:

```
Trace = complete request journey.
```
### 3. What is a span?
A span represents one operation within a trace.
Example:
```
Trace: abc123
│
├── API Gateway
│
├── Order Service
│
├── Payment Service
│
└── Database Query
```

Each one is a span.
So:

```
Trace
  |
  +-- Span
  +-- Span
  +-- Span
  +-- Span
```

Easy way to remember:
> Trace = whole journey
> Span = one step in the journey

### 4.Span information
A span typically contains information such as:

```
Trace ID
Span ID
Parent Span ID
Service name
Operation name
Start time
Duration
Status
Attributes
Events
```

### 5. Context Propagation
The process of carrying trace information from one service to another is called:
> Context propagation

### 6. Distributed tracing Architecture

```
                   Microservices
                /      |       \
               ↓       ↓        ↓
             Service A B        C
                \      |       /
                 \     |      /
                  ↓    ↓     ↓
                  Trace Instrumentation
                          |
                          ↓
                  Trace Collector
                          |
                          ↓
                    Trace Storage
                          |
                          ↓
                  Trace UI / Search
```

