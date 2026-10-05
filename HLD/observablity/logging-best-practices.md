## Logging best practices

> Logs should be useful for debugging, Searchable, structured, secure, and affordable.

### 1. Use structured logging

Avoid plain text like:

```
Payment failed for user 123
```

Prefer structured JSON:
```json

{
  "timestamp": "2026-10-06T03:40:00Z",
  "level": "ERROR",
  "service": "payment-service",
  "event": "payment_failed",
  "userId": "123",
  "orderId": "456",
  "errorCode": "PAYMENT_TIMEOUT"
}
```

Because logging systems can easily search:

```
service = payment-service
event = payment_failed
errorCode = PAYMENT_TIMEOUT
```

### 2. Use log levels property

Common levels:
```
DEBUG
INFO
WARN
ERROR
FATAL
```


### 3. Include Context

A log should help understand which request caused the problem.

For example:

```json
{
  "level": "ERROR",
  "service": "order-service",
  "requestId": "req-123",
  "traceId": "trace-456",
  "userId": "user-789",
  "orderId": "order-111",
  "event": "order_creation_failed",
  "errorCode": "DB_TIMEOUT"
}
```

### 4. Never logs sensitive information.

### 5. Don't log everything
### 6. Log events. Not just messages
Instead of:

```
Some thing went wrong
```
log:
```json
{
  "event": "payment_failed",
  "orderId": "123",
  "provider": "stripe",
  "errorCode": "TIMEOUT"
}
```

### 8. Centralize Logs
In a distributed system:
```
Service A → logs
Service B → logs
Service C → logs
Service D → logs
```
Don't expect engineers to SSH into every server.

Instead:

```
Services
   |
   ↓
Log Collector
   |
   ↓
Message Queue / Buffer
   |
   ↓
Central Log Storage
   |
   ↓
Search / Dashboard
```


### 9. Use Log Rotation and Retention
Logs grow continuously.
If you keep everything forever:
```1 GB/day
   ↓
365 GB/year
```

And a large production system may generate far more.
So define retention:

```
Hot logs:
7-30 days

Archived logs:
3-12 months

Delete:
after retention period
```

The actual duration depends on business, compliance, and debugging requirements.

### 10. Control Log Costs
Logs can become surprisingly expensive.
Use:
Sampling
Instead of storing every repetitive event:

```
100% → 10%
```

for low-value high-volume logs.
But be careful with errors/security events—you generally don't want to sample away critical evidence.

### 11. Don't Put Business Metrics Only in Logs

### Putting Everything Together
```
                  Microservices
                /      |       \
               /       |        \
              ↓        ↓         ↓
          Service A  Service B  Service C
              |        |         |
              └────────┼─────────┘
                       ↓
                 Log Collector
                       ↓
                Queue / Buffer
                       ↓
                Log Storage
                       ↓
             Search / Dashboard
                       ↓
                  Engineers
```

And each log contains:

```
┌──────────────────────────────────┐
│ timestamp                        │
│ level                            │
│ service                          │
│ environment                      │
│ event                            │
│ requestId / traceId              │
│ userId / resourceId (if safe)    │
│ errorCode                        │
│ useful metadata                  │
└──────────────────────────────────┘
```