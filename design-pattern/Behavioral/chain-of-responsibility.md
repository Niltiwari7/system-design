## Chain of responsibility

> Pass a request through a chain of handlers until one handler handles it or the chain is exhausted.

Think of customer support:
```
Customer Request
      ↓
Level 1 Support
      ↓
Level 2 Support
      ↓
Manager
      ↓
Director
```

### 1. What problem does it solve?
Imagine you have an API request that needs several checks.
```
Request
  ↓
Authentication
  ↓
Authorization
  ↓
Validation
  ↓
Rate Limit
  ↓
Business Logic
```

A naive implementation might be:

```ts
function processRequest(request: Request) {

    if (!isAuthenticated(request)) {
        return "Unauthorized";
    }

    if (!hasPermission(request)) {
        return "Forbidden";
    }

    if (!isValid(request)) {
        return "Invalid request";
    }

    if (isRateLimited(request)) {
        return "Too many requests";
    }

    return processBusinessLogic(request);
}
```

As more rules are added. this function becomes large.

You could instead create:

```
Request
   ↓
AuthHandler
   ↓
AuthorizationHandler
   ↓
ValidationHandler
   ↓
RateLimitHandler
   ↓
BusinessHandler
```

### 2. What does the structure look like?
The basic structure is:

```
              Request
                 │
                 ▼
            Handler A
                 │
             can't handle
                 │
                 ▼
            Handler B
                 │
             can't handle
                 │
                 ▼
            Handler C
                 │
              handles
                 │
                 ▼
                END
```

Each handler contains a reference to the next handler:
```
Handler
 ├── handle()
 └── nextHandler
 ```

So: 
```
A → B → C → D
```

### 3. TypeScript implementation

Let's create a support-ticket example.
Suppose we have:

```
Low priority → Junior Support
Medium priority → Senior Support
High priority → Manager
```

### Step 1-Request
```ts
interface SupportRequest {
  level : number;
  message : string;
}
```

### 4. Handler interface
```ts
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: SupportRequest): void;
}
```

### 5. Base Handler
Instead of repeating chain logic in every Handler, create a base class.
```ts
abstract class BaseHandler implements Handler {

    private nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: SupportRequest): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
}
```

### 6. Concrete handlers

#### Junior support
```ts
class JuniorSupport extends BaseHandler {

    handle(request: SupportRequest): void {

        if (request.level === 1) {
            console.log(
                `Junior support handled: ${request.message}`
            );
            return;
        }

        super.handle(request);
    }
}
```

#### Senior Support
```ts
class SeniorSupport extends BaseHandler {

    handle(request: SupportRequest): void {

        if (request.level === 2) {
            console.log(
                `Senior support handled: ${request.message}`
            );
            return;
        }

        super.handle(request);
    }
}
```

#### Manager
```ts
class Manager extends BaseHandler {

    handle(request: SupportRequest): void {

        if (request.level === 3) {
            console.log(
                `Manager handled: ${request.message}`
            );
            return;
        }

        super.handle(request);
    }
}
```

### 7. Build the chain
```ts
const junior = new JuniorSupport();
const senior = new SeniorSupport();
const manager = new Manager();
```

Connect them:
```ts
junior
    .setNext(senior)
    .setNext(manager);
```

Now:
```
Junior
   ↓
Senior
   ↓
Manager
```

### 8. When should I use it ?
1. Multiple handlers can process the same request.
2. You don't want the sender to know the receiver
3. Processing naturally forms a pipeline


### 10. When should I NOT use it?
1. Exactly one known handler.
2. Every handler must always execute.
3. Chain becomes too unpredictable.

### 5-point cheat sheet

| Question               | Chain of Responsibility                               |
| ---------------------- | ----------------------------------------------------- |
| **1. Problem?**        | Multiple objects may handle a request                 |
| **2. Structure?**      | Handler → next Handler → next Handler                 |
| **3. Use when?**       | Request pipelines, middleware, validation, escalation |
| **4. Don't use when?** | One known handler or direct call is enough            |
| **5. Core idea?**      | **Pass a request through a chain of handlers**        |
