### Metrics & Instrumentation

### 1. What are Metrics?

A metric is a numerical measurement of something in our system, collected overtime.

Examples:

```
CPU usage          = 72%
Memory usage       = 64%
Requests/sec       = 2,500
Error rate         = 1.2%
p95 latency        = 320 ms
Active users       = 15,000
```

So:
> Metrics tell us the health and behavior of the system using numbers.

### 2. Why do we need Metrics?

Imagine users say:
> The application is slow.

we need objective information.

Metrics might slow:

```
Request rate
     ↓
2500 req/sec

Error rate
     ↓
0.8%

p95 latency
     ↓
2.4 sec 🚨
```

Now we know :
> The system is experiencing a latency problem.

Metrics are especially useful for:

- Monitoring
- Alerting
- Capacity planning
- Detecting incidents
- SLO/SLA tracking
- Performance analysis

### 3. What is Instrumentation?
This is the important distinction.

Instrumentation means adding code/configuration to our application so that it produces observability data.

For metrics:

```
Application
    ↓
Instrumentation
    ↓
Metrics
```

For example:

```ts
requestCounter.inc();
```
or
```ts

requestDuration.observe(duration);
```

The instrumentation measures what is happening inside our application.

### 4. Simple example

Suppose we have:
```
POST /orders
```


we want to measure:

```
How many requests?
How many failed?
how long do they take?
```


We instrument the application:

```
Request
   ↓
Start timer
   ↓
Execute request
   ↓
Record duration
   ↓
Increment counter
```

Conceptually:

```ts
const start = Date.now();

try {
    await createOrder();

    requestCounter.inc();
    requestDuration.observe(Date.now() - start);
} catch (error) {
    errorCounter.inc();
}
```
Now we can produce metrics such as:

```
orders_created_total = 10,523

orders_failed_total = 123

request_duration = 240ms
```

### 5. The four important metric types

```
Counter
Gauge
Histogram
Summary
```

### 6. How Metrics Architecture Works
```
                Application
                    |
                    ↓
              Instrumentation
                    |
                    ↓
                 Metrics
                    |
             Metrics Collector
                    |
                    ↓
             Metrics Storage
                    |
                    ↓
             Dashboard/Alerts
```

### The Cheat Sheet
```
METRICS
│
├── Counter
│      └── How many?
│
├── Gauge
│      └── Current value?
│
├── Histogram
│      └── Distribution?
│
├── RED
│      ├── Rate
│      ├── Errors
│      └── Duration
│
└── USE
       ├── Utilization
       ├── Saturation
       └── Errors
```