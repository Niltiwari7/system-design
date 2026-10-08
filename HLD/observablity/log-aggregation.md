### Log Aggregation

> **Many services -> collect logs -> centralize them -> search/analyze**

### 1. Why do we need log Aggregation?
Imagine our system has 10 servers:
```
Server 1 → logs
Server 2 → logs
Server 3 → logs
...
Server 10 → logs
```

If something goes wrong, we don't want an engineer doing:
```
SSH → Server 1 → grep
SSH → Server 2 → grep
SSH → Server 3 → grep
...
```

That's terrible at scale.

Instead:
```
             ┌── Server 1
             ├── Server 2
             ├── Server 3
Applications ├── Server 4
             └── Server 5
                    |
                    ↓
              Log Collector
                    |
                    ↓
            Central Log Storage
                    |
                    ↓
             Search / Dashboard
```

### 2. Real world example
Suppose we have food delivery system:

```
                API Gateway
                     |
        ┌────────────┼────────────┐
        ↓            ↓            ↓
   User Service  Order Service  Payment Service
        |            |            |
        ↓            ↓            ↓
      Logs         Logs         Logs
        \            |           /
         \           |          /
          └──────────┼─────────┘
                     ↓
              Log Aggregator
                     ↓
              Central Storage
```

A user says:
> My payment failed
you search:
```
orderId = 12345
```

and get:
```
API Gateway
   ↓
Order Service
   ↓
Payment Service
   ↓
ERROR PAYMENT_TIMEOUT
```

We can investigate the entire flow without checking individual machines.

### 3. How does Log Aggregation work?
There are usually four major stages:

```
1. Generate
      ↓
2. Collect
      ↓
3. Transport
      ↓
4. Store + Search
```

### Step 1 — Applications generate logs
Your application writes:
```
INFO Order created
ERROR Payment failed
WARN Database latency high
```

Usually these are written to:
```
stdout
stderr
log file
```
For containers, logging to stdout/stderr is commonly preferred because the container/runtime platform can collect it.


### Step 2 — Log Collector
A log collector/agent runs close to the application and collects logs.
For example:
```
Server
┌──────────────────────────┐
│ Service A                │
│ Service B                │
│ Service C                │
│                          │
│ Log Agent                │
└──────────────────────────┘
```

The agent might collect:
stdout
/var/log/*.log
container logs

Examples of tools:
- Fluent Bit
- Fluentd
- Filebeat
- Vector
we don't need to memorize all of them for an interview.
Just remember:
Agent = collects logs near where they are produced.



### Step 3 — Transport / Buffer
The collector sends logs to a central system.
For example:
```
Application
     ↓
Log Agent
     ↓
Kafka
     ↓
Log Processing
     ↓
Storage
```
Why use Kafka or another queue?
Because log generation and log storage don't have to happen at exactly the same speed.
Imagine:
```
Application
10,000 logs/sec
```

but storage can temporarily handle:
```
7,000 logs/sec
```

A queue can buffer the difference.
```
10,000/sec
    ↓
  Kafka
    ↓
7,000/sec
```
This prevents temporary spikes from immediately overwhelming the storage system.

### Step 4 — Central Storage
Finally, logs are stored somewhere searchable.
Examples:
```
Elasticsearch
Loki
Splunk
Cloud Logging
```
Then engineers can search:
```
service = payment-service
AND
level = ERROR
AND
timestamp > last 1 hour
```

### Complete architecture

```
                         Applications
                    /        |        \
                   /         |         \
                  ↓          ↓          ↓
             Service A   Service B   Service C
                  |          |          |
                  ↓          ↓          ↓
              Log Agent  Log Agent  Log Agent
                  \          |          /
                   \         |         /
                    └────────┼────────┘
                             ↓
                       Log Collector
                             ↓
                       Queue / Buffer
                         (Kafka)
                             ↓
                      Log Processing
                             ↓
                     Central Storage
                             ↓
                    Search / Dashboard
                             ↓
                       Engineers
```


### 4. Why do we need a Queue?
This is an important system-design question.
Imagine:
```
Normal traffic:

1,000 logs/sec
```
Suddenly:
```
Traffic spike

50,000 logs/sec
```
If applications directly write to 
```
Elasticsearch:
Application
     ↓
Elasticsearch
     ↓
💥 overloaded
```
Instead:
```
Application
     ↓
Log Agent
     ↓
Kafka
     ↓
Storage
```
Kafka absorbs the spike:
```
50,000 logs/sec
       ↓
     Kafka
       ↓
10,000 logs/sec
       ↓
Storage
```
The backlog can be processed gradually.