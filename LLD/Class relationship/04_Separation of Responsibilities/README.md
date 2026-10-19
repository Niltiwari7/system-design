### Separation of Responsibility

### What problem are we solving?
Imagining we are bailing a library application. A `Library` class is responsible for managing books.

Now Imaging that the same class also
- Saves books to a database.
- Sends email notification to members.
- Prints reports.
- Manages book inventory.

The class is doing too many unrelated jobs. if the email system changes, we may need to modify the same class that manages books.

This a design problem.

Separation of responsibilities means giving each class a clear job and moving unrelated work into separate classes.

### Problematic design

```ts
class Library {
  private books: string[] = [];

  addBook(title : string): void {
    this.books.push(title);
    console.log(`Book added: ${title}`);
  }

  saveToDatabase(): void {
    console.log("Saving books to database...")
  }

  sendEmail(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}
```

This code works, but `Library` manages books , database, and email sending.

The problem is not that the calls has several methods. The problem is that it owns responsibility that can change for different reasons.

### Improve the design

```ts

class Library {
  private books: string[] = [];

  addBook(title: string): void {
    this.books.push(title);
    console.log(`Book added: ${title}`);
  }
}

class BookRepository {
  save(): void {
    console.log("Saving books to database...");
  }
}

class EmailService {
  send(message: string): void {
    console.log(`Sending email: ${message}`);
  }
}
```

### Coding exercise
Here is the problematic design:
```ts
class Order {
  calculateTotal(): number {
    return 1000;
  }

  saveToDatabase(): void {
    console.log("Order saved.");
  }

  sendConfirmationEmail(): void {
    console.log("Confirmation email sent.");
  }
}
```

Your task is to refactor it into three classes:
1. Order — calculates the total.
2. OrderRepository — saves the order.
3. EmailService — sends the confirmation email.

```ts
class Order {
  calculate(): number {
    return 1000;
  }
 }

 class OrderRepository {
  saveToDatabase(): void {
    console.log("Order saved.");
  }
 }

 class EmailService {
  sendConfirmationEmail() : void {
    console.log("Confirmation email sent.")
  }
 }

 // It is good to separate the responsibility if we need to add in email service functionality then we are chaining the order one and it is violating the second principle of solid principle open for extend, close for edging.
 ```