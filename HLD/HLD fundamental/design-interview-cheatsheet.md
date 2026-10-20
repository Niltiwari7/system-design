### The 60 minute interview structure


| Time (Minutes) | Focus Area                  | Key Actions                                                                 |
|----------------|-----------------------------|-----------------------------------------------------------------------------|
| 0–5            | Understand the problem      | Clarify scope, users, core features, and exclusions                         |
| 5–12           | Estimate capacity           | Users, QPS, read/write ratio, storage, and peak traffic                     |
| 12–20          | APIs and data model         | Define core endpoints, entities, relationships, and access patterns         |
| 20–35          | Draw the architecture       | Explain request flow and each component's responsibility                    |
| 35–52          | Deep dive & failure scenarios | Explore bottlenecks, consistency, caching, reliability, and trade-offs      |
| 52–60          | Review and summarize        | Identify limitations, scaling steps, security risks, and costs              |

### Common HLD notes - questions to ask in almost every interview 
We don't nee d to invent questions from scratch every time. 

#### A. Functional requirements - what should the system do?
Ask: 
1. Who are the users, and what are their main actions?
2. What are the core features we must support?
3. Do we support anonymous users, registered users or both?
4. Can users create , update, delete search or view their data?
5. Are notifications , analytics, dashboards or real time updates are required?
6. What is explicitly out of the scope for this interview?

Example: for a url shortener, creating a short URL and redirecting users are core features. A dashboard is an additional feature if the interview confirms it.

### B. Scale and traffic- How much work must be handle?
Ask:
1. How many daily active users do we expect?
2. How many reads and writes occur per day?
3. What is the expected peak traffic?
4. how much data will we store and for how long?
5. Is traffic evenly distributed or concentrated on a few popular items?

### C. Performance and reliability - how well must it work?
Ask:
1. What response time do we target?
2. What availability is required?
3. Can the system tolerate losing recent writes?
4. What should happen if a database or downstream service fails?
5. Do we need immediate consistency or is a short delay acceptable?

### D. Data, security, and business rules
Ask:
1. Who owns each piece of data?
2. Must users see their changes immediately?
3. Is authentication required? How authorization is enforced?
4. Doe data expire or need permanent retention?
5. Are the privacy audit or abuse prevention requirements?

E. Prioritization
Finish by confirming the most important trade-off:
- Is correctness more important than latency?
- Is high availability more important than immediate consistency?
- Should we optimize for cost at the expected scale or design for rapid growth?

### Reusable system components


| Component         | Why We Use It                                      | Question You Should Be Able to Answer                          |
|-------------------|----------------------------------------------------|----------------------------------------------------------------|
| Load balancer     | Distributes incoming requests                      | What happens if one application server fails?                  |
| API gateway       | Central entry point for APIs                       | Do we need routing, authentication, or rate limiting here?     |
| Application service | Implements business logic                        | Which responsibility belongs in this service?                  |
| SQL database      | Structured data and transactions                   | What are the relationships and transaction requirements?       |
| NoSQL database    | Flexible models or particular scale/access patterns | Why is it preferable to SQL for this workload?                 |
| Cache (e.g. Redis)| Reduces repeated database reads                     | What is cached, for how long, and how is it invalidated?       |
| Message queue     | Decouples asynchronous work                        | What happens if a message is duplicated or delayed?            |
| Object storage    | Stores files and large objects                     | Should the file live in a database or object storage?          |
| CDN               | Serves content closer to users                     | Can this content be cached at the edge?                        |
| Background workers| Process jobs outside the request path              | How do retries, failures, and duplicate jobs work?             |
| Monitoring & logs | Observes system health and records activity        | How do we detect, alert, and respond to incidents effectively? |
