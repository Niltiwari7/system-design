### Understand the principle

The single responsibility Principle says:

> A class should have one reason to change.

This does not mean a class can have only one method. It means the methods should serve one cohesive responsibility.

### Identify the violation
Consider this class
```ts
class Invoice {
  calculateTotal(price: number, tax: number): number {
      return price + tax;
  }

  printInvoice(): void {
    console.log("Printing invoice...");
  }

  saveToDatabase(): void {
    console.log("Saving Invoice...")
  }
}
```

The code compiles and works. But the class handles three distinct responsibility.

# Method Responsibilities

| Method            | Responsibility             |
|-------------------|----------------------------|
| `calculateTotal()` | Business calculation       |
| `printInvoice()`   | Printing or presentation   |
| `saveToDatabase()` | Data persistence           |

If the tax calculation changes, we modify the calculation logic. If the database changes, we modify persistence logic. These are different reasons for change.

### Refactor the design

Separate the responsibility into focused classes.

```ts
class Invoice {
  calculateTotal(price: number , tax: number): number {
    return price + tax;
  }
}

class InvoicePrinter {
  print(): void {
    console.log("Printing the invoice");
  }
}

class InvoiceRepository {
  save(): void {
    console.log("Saving invoice...");
  }
}
```
Now each class has a clearer purpose:
- `Invoice` calculates the total.
- `InvoicePrinter` handles printing.
- `InvoiceRepository` handles persistence.
We don't need interfaces or design patterns for this simple refactoring. Adding them now would create unnecessary complexity.


### Coding exercise
Refactor the following problematic class using SRP.
```ts
class User {
  constructor(public name: string, public email: string) {}

  saveToDatabase(): void {
    console.log("User saved.");
  }

  sendWelcomeEmail(): void {
    console.log(`Welcome email sent to ${this.email}`);
  }
}
```

Your requirements:
1. Keep User responsible for representing user data.
2. Create UserRepository to handle database persistence.
3. Create WelcomeEmailService to handle welcome emails.
4. Create a user and demonstrate saving the user and sending the email.

```ts

class User {
  constructor(public name: string, public email: string) {}
}

class UserRepository {
  saveToDatabase(): void {
    console.log("User saved.");
  }
}

class WelcomeEmailService {
  sendWelcomeEmail(email: string): void {
    console.log(`Welcome email sent to ${email}`);
  }
}

const user = new User("Asha", "asha@example.com");

const repository = new UserRepository();
repository.saveToDatabase();

const emailService = new WelcomeEmailService();
emailService.sendWelcomeEmail(user.email);




