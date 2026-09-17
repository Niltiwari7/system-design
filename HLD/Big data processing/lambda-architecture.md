## Lambda architecture

> Process the same data in two ways: batch processing for accurate historical results, and stream processing for fast real-time results.

```text
                 SAME DATA

            ┌────────┴────────┐
            ↓                 ↓
       Batch path        Streaming path
            ↓                 ↓
     Accurate result     Fast result
            └────────┬────────┘
                     ↓
                  Output
```

### 1. The three layers
Lambda Architecture traditionally has three major layers:
```text
                 DATA SOURCES
                      │
                      ↓
                ┌───────────┐
                │ Data Store │
                └─────┬─────┘
                      │
          ┌───────────┴───────────┐
          ↓                       ↓
    Batch Layer             Speed Layer
          ↓                       ↓
    Batch Views             Real-time Views
          └───────────┬───────────┘
                      ↓
                Serving Layer
                      ↓
                   Users
```

The three layers are:

1. Batch Layer
2. Speed Layer
3. Serving Layer


### 3. Batch Layer

The Batch Layer processes large amounts of historical data.

### 4. Speed Layer
The Speed Layer handles incoming events in real time.
Example:
```text
User purchases product
        ↓
      Kafka
        ↓
Stream Processor
        ↓
Real-time View
        ↓
Dashboard
```

### 5. Serving Layer
The serving layer provides data to applications.

### 6. Complete architecture
```text
                       EVENTS
                         │
                         ↓
                 ┌──────────────┐
                 │ Data Storage  │
                 │ S3 / HDFS     │
                 └───────┬──────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ↓                       ↓
       BATCH LAYER              SPEED LAYER
             │                       │
          Spark                    Kafka
             │                       │
             ↓                     Flink
       Batch View                   │
             │                       ↓
             │                Real-time View
             │                       │
             └───────────┬───────────┘
                         ↓
                  SERVING LAYER
                         │
                         ↓
                       API
                         │
                         ↓
                       User
```

### When should you use Lambda Architecture?

It can make sense when you genuinely need:
```text
Fraud analytics
Real-time monitoring
Large-scale analytics
IoT analytics
Financial event processing
Recommendation analytics
```

### Interview cheat sheet

```text
LAMBDA ARCHITECTURE

Problem:
Need BOTH real-time + accurate historical processing.

                Events
                   │
          ┌────────┴────────┐
          ↓                 ↓
       BATCH             STREAM
          ↓                 ↓
   Accurate result     Fast result
          │                 │
          └────────┬────────┘
                   ↓
              SERVING
                   ↓
                 User
```

Advantages
- Real-time results
- Historical recomputation
- Handles late/corrected data
- Good for large-scale analytics


Disadvantages
- Two pipelines
- More infrastructure
- More code
- Duplicate business logic
- Harder maintenance
- Potential consistency issues

> Lambda Architecture is useful when a system needs low-latency stream processing while also retaining a batch path for complete and recomputable historical results.