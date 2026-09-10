## What is the Strangler Fig Pattern?

The **Strangler Fig pattern** (originally coined by Martin Fowler) is an architectural migration strategy that gradually replaces a legacy monolithic application with modern microservices.

Instead of undertaking a high-risk, multi-year "big bang" rewrite, you place an interceptor proxy in front of the legacy system and systematically extract domain features into independent services one by one over time, until the old system shrinks to zero and can be safely decommissioned.

---

## Architecture Evolution Diagram

```text
Phase 1: Add Interceptor Layer         Phase 2: Incremental Feature Migration        Phase 3: Full Monolith Retirement

     [ API Gateway / Proxy ]               [ API Gateway / Proxy ]                     [ API Gateway / Proxy ]
                |                               /        |        \                         /        |        \
                v                              v         v         v                       v         v         v
     +--------------------+          +----------+  +-------+  +-------+             +-------+  +-------+  +-------+
     |  Legacy Monolith   |          | Legacy   |  | Service| | Service|            | Service| | Service| | Service|
     |   (Handles 100%)   |          | Monolith |  |   A   |  |   B   |             |   A   |  |   B   |  |   C   |
     +--------------------+          +----------+  +-------+  +-------+             +-------+  +-------+  +-------+
                                     (Old core)    (Extracted domains)                 (Legacy safely deleted)

```

---

## The 4 Steps of Execution

1. **Transform (Intercept):** Place an API Gateway or Reverse Proxy in front of the existing monolith so all inbound user traffic flows through a central routing point.
2. **Build:** Implement a single target domain or feature as a modern microservice alongside the legacy system.
3. **Cut Over (Redirect):** Update the API Gateway routing rules to direct traffic for that specific feature to the new microservice instead of the monolith.
4. **Repeat & Decommission:** Repeat the process domain by domain. Once all traffic is routed to modern services, delete the remaining legacy monolith codebase and infrastructure.

---

## Core Problems It Solves

* **Catastrophic "Big Bang" Rewrites:** Eliminates the extreme business risk of spending years rebuilding an entire system offline, only for the launch to fail due to missed requirements or scope creep.
* **Delayed Time-to-Value:** Allows teams to deploy modern features, improve performance, and deliver real business value into production continuously from month one.
* **Knowledge Decay:** Solves the challenge of legacy systems where original developers have left and documentation is missing—you only need to understand one domain context at a time to migrate it.

---

## Pattern Comparison: Strangler Fig vs. Big Bang Rewrite

| Metric | Strangler Fig Migration | Big Bang Rewrite |
| --- | --- | --- |
| **Risk Profile** | Low/Controlled (Isolated blast radius) | Extremely High (All-or-nothing cutover) |
| **Time to First Value** | Weeks or months | Years |
| **Coexistence** | Old and new systems run in parallel | Complete switch overnight |
| **Rollback Option** | Easy (Revert proxy routing rule) | Disastrous (Requires full system rollback) |
| **Operational Overhead** | High during migration (Dual infrastructure) | Low during dev, peak stress at launch |

---

## Key Challenges to Watch For

* **Database Dependencies:** Monolithic shared databases with cross-table foreign keys and complex SQL joins make extracting services tricky; database refactoring often requires read/write synchronization techniques (like Change Data Capture).
* **Dual Routing Overhead:** Maintaining backward compatibility and data consistency between the legacy system and new microservices during the transition phase adds temporary architectural complexity.

---

## When to Use vs. Avoid

### Use When:

* Modernizing large, complex, business-critical legacy applications where downtime or migration failures are unacceptable.
* You need to continuously deliver new features while modernizing the underlying tech stack.
* The system can be logically segmented into separate domains or bounded contexts (e.g., using Domain-Driven Design).

### Avoid When:

* The legacy application is small, straightforward, and easily understood (a quick, direct rewrite is cheaper and faster).
* The monolith’s data model is so tightly coupled that extracting a single component without refactoring the entire database is impossible.
* The legacy system receives minimal updates, has low traffic, and carries negligible maintenance costs (leave as-is).