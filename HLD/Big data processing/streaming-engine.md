## Streaming Engines
> A streaming engine is the component that continuously process data as events arrive, instead of waiting for a large batch of data.

### 1. Start with the problem
Imagine Amazon receives these events:

```text
10:00:01 → Order ₹500
10:00:02 → Order ₹300
10:00:03 → Order ₹700
10:00:04 → Order ₹200
...
```

We want to continuously calculate:

```text
Orders per minute
Revenue per minute
Active users
Fraud detection
```

We don't want:

```text
Wait 1 hour
    ↓
Collect all events
    ↓
Process them
    ↓
Return result
```

We want:

```text
Event
 ↓
Process immediately
 ↓
Update result
 ↓
Next event
 ↓
Process immediately
```

That is stream processing.

### 2. Where does the streaming Engine fit?

```text
                    Producer
                       │
                       ↓
                     Kafka
                       │
                       ↓
              ┌─────────────────┐
              │ Streaming Engine│
              └────────┬────────┘
                       │
             ┌─────────┼─────────┐
             ↓         ↓         ↓
           Redis    Database   Data Lake
```

#### Kafka
Kafka primarily provides:

> Durable event storage + event delivery

#### Streaming Engine
The streaming engine provides:
> Computation over those events.

### 3. What does a streaming engine actually do?
Suppose Kafka gives it:

```text
Event 1
Event 2
Event 3
Event 4
```

The engine can:

`Filter`

```text
Keep only:

event.type == "PURCHASE"
```

`Transform`
```text
USD → INR
```

`Aggregate`
```text
Total revenue
```

`Window`
```text
Count events every 5 minutes
```

`Detect patterns`
```text
5 failed logins
within 1 minute
```

`Maintain state`
```text
Maintain state
```

### 4. Streaming architecture

```text
                   Applications
                        │
                        ↓
                      Kafka
                        │
                ┌───────┴───────┐
                ↓               ↓
             Flink           Consumer
                │
        ┌───────┼────────┐
        ↓       ↓        ↓
      Redis   Database  Data Lake
        │       │        │
        └───────┼────────┘
                ↓
              API
                ↓
             Clients
```

### 5. What happens if the streaming engine crashes?

```text
Kafka
  ↓
Events remain durable
  ↓
Flink crashes
  ↓
Restore checkpoint/state
  ↓
Resume from appropriate offset
  ↓
Continue processing
```

### 6. Scaling a streaming engine

Suppose:

100,000 events/sec

One processor isn't enough.

We partition the work.

```kafka
Kafka

Partition 1 ──→ Worker 1
Partition 2 ──→ Worker 2
Partition 3 ──→ Worker 3
Partition 4 ──→ Worker 4
```

Now
```
More partitions
      +
More processing workers
      ↓
Higher throughput
```