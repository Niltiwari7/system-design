### Dependency Inversion principle

### Understand the principle

The Dependency inversion principle says:
> 1. High-level modules should not depend directly on low level modules. Both should depend on abstractions.
> 2. Abstractions should not depend on implementation details. Implementations should conform to abstractions.

Let's simplify those terms:
- High-level module: The class that coordinates the main business operation.
- Low-level module: The class that performs a specific technical task.
- Abstraction: A contract, usually an interface, describing what an object can do.

Imagine an ordering system. OrderService coordinates placing an order, while MySQLDatabase handles the technical detail of storing it.

We want the ordering logic to depend on a storage contract rather than being tightly connected to MySQL.

### Identify the problem
Consider this design:
```ts

class MySQLDatabase {
  save(data: string): void {
    console.log(`Saving to MySQL: ${data}`);
  }
}

class OrderService {
  private database = new MySQLDatabase();

  placeOrder(): void {
    this.database.save("Order #101");
  }
}

const service = new OrderService();
service.placeOrder();
```

This code works, but OrderService creates a specific database implementation internally.

If we switch to PostgreSQL or want to use a fake database during testing, we must modify the service or redesign how it creates its dependency.

The business operation is tightly connected to a technical implementation.

### Refactor using DIP

Introduce a storage interface and make both classes depend on that contract.


```ts

interface OrderStorage {
  save(data: string): void;
}

class MySQLDatabase implements OrderStorage {
  save(data: string): void {
    console.log(`Saving to MySQL: ${data}`);
  }
}

class PostgreSQLDatabase implements OrderStorage {
  save(data: string): void {
    console.log(`Saving to PostgreSQL: ${data}`);
  }
}

class OrderService {
  constructor(private storage: OrderStorage) {}

  placeOrder(): void {
    this.storage.save("Order #101");
  }
}

const mysqlService = new OrderService(new MySQLDatabase());
mysqlService.placeOrder();

const postgresService = new OrderService(new PostgreSQLDatabase());
postgresService.placeOrder();

```

### coding exercise
Let's apply DIP to a notification system.

Here's the problematic design:

```ts
class EmailSender {
  send(message: string): void {
    console.log(`Email: ${message}`);
  }
}

class AlertService {
  private sender = new EmailSender();

  sendAlert(message: string): void {
    this.sender.send(message);
  }
}
```

Your requirements:
1. Create an AlertSender interface with send(message: string): void.
2. Make EmailSender implement AlertSender.
3. Create an SMSSender class that also implements AlertSender.
4. Update AlertService to receive an AlertSender through its constructor.
5. Demonstrate sending an alert through both email and SMS without changing AlertService.

```ts
interface AlertSender {
  send(message: string): void;
}

class EmailSender implements AlertSender {
  send(message: string): void {
    console.log(`Email: ${message}`);
  }
}

class SMSSender implements AlertSender {
  send(message: string): void {
    console.log(`SMS: ${message}`);
  }
}

class AlertService {
  constructor(private sender: AlertSender) {}

  sendAlert(message: string): void {
    this.sender.send(message);
  }
}

// Send via Email
const emailService = new AlertService(new EmailSender());
emailService.sendAlert("Server is down!");

// Send via SMS
const smsService = new AlertService(new SMSSender());
smsService.sendAlert("Server is down!");
```