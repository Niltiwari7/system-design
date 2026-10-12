### Alert and monitoring

Monitoring and alerting are essential parts of observability.

> Monitoring watches the system. Alerting notifies you when something needs attention.

### 1. What is Monitoring?
Monitoring is the continuous collection and observation of system health data to understand weather an application is behaving as expected.

we need ot monitor things such as:
- Is the API responding?
- Are requests getting slower?
- Are request failing?
- Is the database overloaded?
- Is the queue accumulating too many jobs?

### 2. What is Alerting?

Alerting is the process of notifying someone or triggering an automated action when a defined condition indicates a problem.

for example:
```
Monitor API error rate
          |
          v
Is error rate > 5%?
       /      \
     No        Yes
      |          |
      v          v
  Continue    Fire alert
 monitoring       |
                  v
             Notify engineer
```

### 3. Monitoring vs Alerting


| Aspect                          | Monitoring                                      | Alerting                                      |
|---------------------------------|-------------------------------------------------|-----------------------------------------------|
| Purpose                         | Observes system health                          | Notifies when conditions require attention     |
| Functionality                   | Collects and displays data                      | Evaluates conditions and triggers notifications|
| Value                           | Helps identify trends                           | Helps respond to incidents quickly             |
| Typical Outputs                 | Dashboards and time-series graphs               | Pages, messages, incident tickets              |

### 4. What should we monitor?
For system design interviews, remember these categories.

- Application metrics - Request rate, error rate, failed jobs and API availability.
- Infrastructure metrics: CPU, memory, disk space, network errors and container restarts.
- Database and queue metrics: Connection pool usage, query latency, replication lag, queue depth and consumer lag.

- Business metrics: Successful payments, orders created, signup conversion and checkout failures.

For api:
- R - Rate
- E - Error
- D - Duration

for infrastructure:
- U - Utilization
- S - Saturation
- E - Error

### 5. HOw do we create a good alert?
Suppose our api error rate briefly rises to `5.1%` for one second. Should we wake up the on-call engineer?
Not necessarily. A short spike may be harmless.
A better rule might be:
```
IF error rate > 5%
AND condition persists for 5 minutes
THEN trigger an alert
```

### 6. Understand SLI, SLO and SLA

- SLI - Service level indicator: The measurement of service performance.
- SLO - Service level Objective: The target for that measurement.
- SLA - Service level Agreement: A formal commitment to customers, potentially with consequences if it is breached.

Example:
```
SLI: Percentage of successful API requests

SLO: 99.9% of requests should succeed

SLA: Contractual availability commitment
     with defined terms and remedies
 ```

### 7. Monitoring and alerting architecture
```
Application / Infrastructure
             |
             v
      Instrumentation
             |
             v
       Metrics Collector
             |
             v
      Metrics Storage
             |
        ┌────┴─────┐
        v          v
    Dashboard   Alert Rules
                   |
                   v
             Alert Manager
                   |
          ┌────────┼────────┐
          v        v        v
        Slack    Pager    Email
```

### 8. Alerting best practices
1. Alert on actionable problem.
2. Avoid alert fatigue
3. Use Severity level
4. Add Context
5. Group related alert
