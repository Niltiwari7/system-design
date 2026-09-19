## Kappa Architecture

> Kappa architecture uses one streaming pipeline to process both real-time data and historical data.

### 1. Kappa's idea
> why maintain two pipelines? Let's use one streaming pipeline.
```text
                       Events
                          │
                          ↓
                        Kafka
                          │
                          ↓
                  Stream Processor
                          │
                          ↓
                     Data Store
                          │
                          ↓
                        API
                          │
                          ↓
                        User
```

### 2. But wait- what about historical data?
This is the most important question.

Suppose you have:
```text
Kafka

Event 1
Event 2
Event 3
...
Event 1,000,000
```

A new processing application starts.

How does it calculate the historical result?

Replay the events.
```text
              Kafka
                │
        ┌───────┴────────┐
        ↓                ↓
   New events       Historical events
        │                │
        └───────┬────────┘
                ↓
          Stream Processor
                ↓
             Database
```

So kafka isn't merely being used as a temporary message queue.

It can act as the durable event log from which events can be replayed.

### 3. The key mental model

Remember this:
```text
                 EVENT LOG
                    │
                    ↓
                  Kafka
                    │
                    ↓
             Stream Processor
                    │
                    ↓
                 Storage
                    │
                    ↓
                  Query
```

for new events:

```text
Kafka
 ↓
Processor
 ↓
Result
```

for historical processing:
```text
Kafka
 ↓
Replay old events
 ↓
Same Processor
 ↓
Recomputed result
```
same processing logic.

That's the heart of kappa.

### 4. Kappa architecture

```text
                    DATA SOURCES
                         │
                         ↓
                      Kafka
                  Event Log
                         │
             ┌───────────┴───────────┐
             │                       │
       New Events              Historical Events
             │                       │
             └───────────┬───────────┘
                         ↓
                 Stream Processor
                  Flink / Kafka
                    Streams
                         │
                         ↓
                  Processed Data
                         │
             ┌───────────┼───────────┐
             ↓           ↓           ↓
           Redis      Database    Data Lake
             │           │           │
             └───────────┼───────────┘
                         ↓
                        API
                         ↓
                       Users
```