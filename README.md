# System-Design
---

# 🚀 Scalability in System Design

**Scalability** is the ability of a system to handle an increasing amount of workload by adding resources (hardware, software, or infrastructure) without compromising performance.

---

## 🔹 Ways to Scale a System

### 1. **Vertical Scaling (Scale Up)**

➡️ Add more power to your **existing machine** (upgrade RAM, CPU, storage).

📌 Suitable for small systems but has **hardware limits**.

<img width="682" height="302" alt="Vertical Scaling" src="https://github.com/user-attachments/assets/bf6b54de-f628-4436-80ad-5236215cc453" />  

---

### 2. **Horizontal Scaling (Scale Out)**

➡️ Add **more machines/servers** to distribute workload across multiple nodes.

📌 Provides better **fault tolerance & scalability**.

<img width="644" height="201" alt="Horizontal Scaling" src="https://github.com/user-attachments/assets/b84c4540-19fb-4540-9012-a3029a7e6c8a" />  

---

### 3. **Load Balancing**

➡️ Distributes incoming traffic across multiple servers.

✅ Prevents overload

✅ Ensures **high availability**

<img width="623" height="507" alt="Load Balancing" src="https://github.com/user-attachments/assets/7c967221-9280-4534-84de-741ce9dfb8ad" />  

---

### 4. **Caching**

➡️ Store frequently accessed data in **memory (Redis, Memcached, etc.)**.

✅ Reduces **latency**

✅ Decreases **database load**

<img width="607" height="393" alt="Caching" src="https://github.com/user-attachments/assets/ad2b3277-5f98-4de2-8073-dc3fbdd3ed2d" />  

---

### 5. **Content Delivery Network (CDN)**

➡️ Distributes **static assets (CSS, JS, images, videos)** closer to users.

✅ Faster **response time**

✅ Reduces **server load**

<img width="919" height="522" alt="CDN" src="https://github.com/user-attachments/assets/6f65eb90-f5a3-462b-83af-9407dcb408cf" />  

---

### 6. **Sharding / Partitioning**

➡️ Split data into smaller chunks and distribute across multiple servers.

📌 Helps avoid **bottlenecks** in large databases.

<img width="652" height="627" alt="Sharding" src="https://github.com/user-attachments/assets/ec1962bf-7bd0-4594-9569-4f2a73baffc9" />  

---

### 7. **Asynchronous Communication**

➡️ Defer long-running or non-critical tasks using **message brokers/queues** (RabbitMQ, Kafka, SQS).

📌 Improves **responsiveness** of applications.

---

### 8. **Microservices Architecture**

➡️ Break application into **independent services**.

📌 Each service can be scaled **individually**.

📌 Enables **fault isolation & flexibility**.

---

### 9. **Auto Scaling**

➡️ Automatically adjusts number of servers based on current load.

📌 Cloud providers like AWS, GCP, and Azure support auto-scaling groups.

---

### 10. **Multi-Region Deployment**

➡️ Deploy application across **multiple regions/data centers**.

📌 Reduces **latency**

📌 Improves **redundancy & disaster recovery**

---

## ✅ Summary

* **Vertical Scaling** → Upgrade hardware
* **Horizontal Scaling** → Add more servers
* **Load Balancing** → Distribute traffic
* **Caching** → Reduce repeated DB hits
* **CDN** → Serve static assets closer to users
* **Sharding/Partitioning** → Split large datasets
* **Async Communication** → Use queues for heavy tasks
* **Microservices** → Independent scaling
* **Auto Scaling** → Dynamic resource management
* **Multi-Region** → Global availability

---
# ⚡ Availability

**Availability** refers to the proportion of time a system is **operational and accessible** when required.

$$
\text{Availability} = \frac{\text{Uptime}}{\text{Uptime + Downtime}}
$$

---

## 🔢 Availability Tiers

Availability is often expressed in terms of **“nines”**. The more nines, the less downtime:

<img width="629" height="352" alt="availability table" src="https://github.com/user-attachments/assets/7eee2ce1-82d8-4a65-ad10-7074322c187f" />

---

## 🛠 Strategies for Improving Availability

1. **Redundancy**

   * Backup components take over when primary components fail.
   * Prevents single points of failure.

2. **Load Balancing**

   * Distributes incoming traffic across multiple servers.
   * Avoids bottlenecks and ensures reliability.

3. **Failover Mechanisms**

   * Automatically switch to a redundant system when a failure is detected.
   * Ensures continuity without manual intervention.

4. **Data Replication**

   * Copies data across multiple locations.
   * Protects against data loss and enables disaster recovery.

5. **Monitoring & Alerts**

   * Continuous health checks of system components.
   * Early detection of failures with instant alerts for quick action.

---

# 🏗️ CAP Theorem

<img width="460" height="413" alt="CAP Theorem" src="https://github.com/user-attachments/assets/f603d3d7-bdfd-4a56-9cf4-c5724b41f725" />

### 📌 Note

It is **impossible** for a distributed data store to **simultaneously provide all three guarantees**:

* **Consistency (C):** Every read receives the most recent write or an error.
* **Availability (A):** Every request receives a non-error response (but not guaranteed to be the latest data).
* **Partition Tolerance (P):** The system continues to operate even if network failures cause delays or dropped messages.

---

## ⚖️ The CAP Trade-Off (Pick Any 2)

1. **CP (Consistency + Partition Tolerance)**

   * Prioritizes data correctness over availability.
   * During partitions, some requests may be **rejected** to maintain consistency.
   * ✅ Example: HBase, MongoDB (in certain configurations).

2. **AP (Availability + Partition Tolerance)**

   * Always responds, even during partitions.
   * May serve **stale or different data** from different nodes.
   * ✅ Example: DynamoDB, Cassandra.

3. **CA (Consistency + Availability)**

   * Achievable only in **the absence of partitions**.
   * Since partitions are inevitable, **CA alone is impractical** in real distributed systems.

---

## 🔄 Consistency Models

1. **Eventual Consistency**

   * Updates propagate **eventually**, not instantly.
   * ✅ Example: DNS, Content Delivery Networks (CDNs).

2. **Strong Consistency**

   * Once a write is confirmed, **all subsequent reads** return the latest value.
   * ✅ Example: Banking systems, Inventory management.

3. **Tunable Consistency**

   * Flexibility to adjust consistency level **per operation**.
   * ✅ Example: E-commerce (orders → strong, recommendations → eventual).

4. **Quorum-Based Approaches**

   * Uses **voting among nodes** to reach consistency + fault tolerance.
   * ✅ Example: Consensus algorithms like **Paxos** and **Raft**.

---

## 🎯 Key Takeaway

Distributed systems **cannot have Consistency, Availability, and Partition Tolerance all at once**. Instead, they balance trade-offs depending on use cases:

* Financial apps → **CP**
* Social networks → **AP**
* Theoretical ideal (but impractical) → **CA**

---

