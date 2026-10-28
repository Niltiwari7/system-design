# Scalability

Let's learn scalability the way you need it for an SDE 2 interview: simple explanation → diagram → short notes → interview-ready answer.

## 1. What is scalability?

Scalability is a system's ability to handle increasing workload by adding resources while maintaining acceptable performance.

Imagine you build a URL shortener. Initially, 100 people use it daily. Later, 1 million people use it.

- If the application handles the growth by adding resources or improving its architecture, it scales.
- If requests become slow or the server crashes, the system has a scalability problem.

Remember: More users → More load → Need more capacity.

## 2. The two types of scalability

1\. Vertical scaling (Scale Up)

Increase the power of one machine: more CPU, RAM, or storage.

Example: upgrade a server from 4 GB RAM to 32 GB RAM.

Easy to implement, but limited by the maximum capacity of one machine.

2\. Horizontal scaling (Scale Out)

Add more machines and distribute the workload among them.

Example: increase from 1 application server to 5 servers behind a load balancer.

Supports larger growth, but requires coordination, load balancing, and shared-state handling.

### Diagram: Vertical vs. horizontal scaling

![alt text](image-1.png)

Memory trick: Vertical = bigger machine. Horizontal = more machines.

## 3. How to scale a real application

![alt text](image.png)

### What does each component solve?

| Component            | Purpose                                |
| -------------------- | -------------------------------------- |
| Load balancer        | Distributes traffic across servers     |
| Multiple app servers | Handles more concurrent requests       |
| Cache (e.g., Redis)  | Avoids repeated database reads         |
| Read replicas        | Distributes database read traffic      |
| Database sharding    | Splits data across database nodes      |
| Message queue        | Handles background work asynchronously |
| CDN                  | Serves static content closer to users  |

## 4. The most important SDE 2 concept: bottlenecks

Scaling is not just adding servers. You must find what is limiting the system.

Example:

- App servers can handle 50,000 requests/second.
- Database can handle only 5,000 queries/second.
- Your application is database-bound.

Adding 10 more app servers may make the database overload worse!

Remember: Find → Measure → Fix → Verify

1. Find the bottleneck using metrics and profiling.
2. Measure CPU, memory, latency, throughput, and database load.
3. Fix the actual bottleneck with caching, indexing, replicas, sharding, or more capacity.
4. Verify the improvement using load testing.

## 5. Scalability vs. performance vs. availability

These are frequently confused in interviews.

| Concept      | Easy meaning                                           |
| ------------ | ------------------------------------------------------ |
| Performance  | How fast does one request complete?                    |
| Scalability  | Can the system handle more workload?                   |
| Availability | Is the system operational when users need it?          |
| Reliability  | Does the system continue behaving correctly over time? |

A system can be fast for 100 users but slow for 100,000 users. That is a scalability issue, even if its initial performance was excellent.

## 6. Short notes to revise before an interview

Vertical scaling = Scale UP

Bigger machine; simple, but hardware limits apply.

Horizontal scaling = Scale OUT

More machines; better growth potential, but distributed-system complexity increases.

Database bottleneck

Optimize queries and indexes, cache reads, add replicas, or shard when justified.

Stateless application servers

Keep session state outside individual servers where practical, so requests can go to any healthy instance.

One-line revision: Scale applications horizontally, cache repeated reads, scale databases based on bottlenecks, and measure before optimizing.
