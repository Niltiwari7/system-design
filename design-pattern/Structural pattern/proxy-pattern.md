# Proxy Design Pattern

## 1. Mental Model (The 10-Second Memory Hook)

> **"The Security Guard / Bouncer"**
> You don't interact with the VIP directly. You talk to the guard at the door. The guard checks your ID, caches your pass, or delays calling the VIP down until you actually need them.

```text
Client  ──►  Proxy (Bouncer)  ──►  Real Subject (VIP)

```

**Key Principle**: The Proxy implements the **same interface** as the target object. The client should never know (or care) whether it is talking to the Proxy or the Real Object.

---

## 2. The 5 Core Types of Proxies

System design categorizes proxies based on the *intent* of the interception:

| Proxy Type | Problem Solved | Real-World Example |
| --- | --- | --- |
| **Virtual Proxy** *(Lazy Loading)* | Loading heavy resources consumes memory upfront. | Loading high-res images in a feed only when scrolled into view. |
| **Protection Proxy** *(Access Control)* | Sensitive actions executed by unauthorized users. | Checking JWT/RBAC roles before invoking an admin service method. |
| **Caching Proxy** *(Performance)* | Expensive DB calls or network operations repeated unnecessarily. | Caching API responses in memory or Redis before querying DB. |
| **Remote Proxy** *(Network Abstraction)* | Managing network protocols, serialization, and connection sockets. | gRPC client stubs, RPC calls (local code invoking remote server). |
| **Logging / Smart Reference** | Tracking usage stats, garbage collection, or auditing. | Spring AOP logging methods, memory usage auditing. |

---

## 3. Class Structure

```text
               ┌──────────────────────┐
               │     <<Interface>>    │
               │        Subject       │
               └──────────▲───────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
┌───────────────────────┐   ┌───────────────────────┐
│      RealSubject      │   │         Proxy         │
├───────────────────────┤   ├───────────────────────┤
│ + request(): void     │   │ - realSubject: Subject│
└───────────────────────┘   ├───────────────────────┤
                            │ + request(): void     │
                            └───────────┬───────────┘
                                        │ (wraps/holds)
                                        ▼
                            ┌───────────────────────┐
                            │      RealSubject      │
                            └───────────────────────┘

```

---

## 4. TypeScript Implementation

Here is a multi-purpose Proxy handling both **Lazy Initialization** and **Access Control**:

```ts
// 1. Shared Interface (Subject)
interface DatabaseQuery {
    execute(query: string): void;
}

// 2. Heavy Resource (RealSubject)
class RealDatabaseConnection implements DatabaseQuery {
    constructor() {
        this.connectToDatabase();
    }

    private connectToDatabase(): void {
        console.log("⚡ [Heavy] Opening expensive database TCP connection...");
    }

    execute(query: string): void {
        console.log(`🚀 Executing query: "${query}"`);
    }
}

// 3. Proxy Object (Virtual + Protection Proxy)
class DatabaseProxy implements DatabaseQuery {
    private realDb: RealDatabaseConnection | null = null;

    constructor(private userRole: "ADMIN" | "GUEST") {}

    execute(query: string): void {
        // Feature 1: Protection Control
        if (this.userRole !== "ADMIN" && query.toUpperCase().includes("DROP")) {
            console.error("❌ Access Denied: Guests cannot run DROP queries.");
            return;
        }

        // Feature 2: Lazy Loading (Virtual Proxy)
        if (!this.realDb) {
            console.log("🐢 Lazy Init: Creating Database connection on first use...");
            this.realDb = new RealDatabaseConnection();
        }

        // Feature 3: Forwarding call to Real Subject
        this.realDb.execute(query);
    }
}

// ==========================================
// 4. Usage Demo
// ==========================================

// Connection is NOT established here (saves memory)
const guestProxy = new DatabaseProxy("GUEST");

// Connection created ONLY on first execution attempt
guestProxy.execute("SELECT * FROM users;"); 
// Output: 
// 🐢 Lazy Init: Creating Database connection on first use...
// ⚡ [Heavy] Opening expensive database TCP connection...
// 🚀 Executing query: "SELECT * FROM users;"

// Access blocked by proxy without hitting the real DB
guestProxy.execute("DROP TABLE users;"); 
// Output: ❌ Access Denied: Guests cannot run DROP queries.

```

---

## 5. Design Pattern Cheatsheet: Proxy vs. Competitors

| Pattern | Intent | Interface Changes? | Wraps Target? |
| --- | --- | --- | --- |
| **Proxy** | Controls/manages **access** to the underlying object. | **No** (Strictly identical interface) | Yes |
| **Decorator** | Dynamically adds **behavior/responsibilities** to an object. | **No** (Implements same interface) | Yes |
| **Adapter** | Translates between two **incompatible interfaces**. | **Yes** (Adapts old interface to new) | Yes |
| **Facade** | Provides a simplified interface to a whole **subsystem**. | **Yes** (Creates a new simplified API) | Yes (Multiple objects) |

---

## 6. Trade-Offs

### Advantages

* **Single Responsibility Principle (SRP)**: Handles cross-cutting concerns (logging, access control, caching) without modifying core business logic.
* **Open/Closed Principle (OCP)**: Add new proxies without altering existing client code or real targets.
* **Resource Efficiency**: Postpones expensive initialization until necessary.

### Disadvantages

* **Latency Overhead**: Introduces an extra layer of abstraction for every call.
* **Code Complexity**: Increases class count in simple systems where direct access is sufficient.
* **Debugging Depth**: Stack traces grow longer, potentially hiding real target failures inside proxy handlers.

---

## 7. Where You See It in Production

1. **Web Architecture**:
* **Nginx / Envoy**: Reverse Proxy managing SSL termination, rate-limiting, and load balancing before hitting the backend service.


2. **Framework Internals**:
* **Vue 3 Reactivity System**: Built entirely on native ES6 `Proxy` objects to intercept getters/setters for state tracking.
* **Spring Framework (Java)**: Uses Dynamic Proxies to manage `@Transactional` database boundaries and `@Cacheable` annotations.



