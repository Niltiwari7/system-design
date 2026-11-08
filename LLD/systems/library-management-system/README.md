### 1. Problem statement
Design a system that allows a library to maintain its book catalog and physical inventory, register members, issue books, and accept returned books

The design should be extensible enough to support future features such as reservations, overdue fines and multiple library branches overengineering the first version.

### 2. Requirements

#### Functional Requirements

1. Add/remove the books.
2. Register member 
3. search books
4. Borrow and return books
5. Reserve unavailable books.
6. Calculate overdue fines.

#### Non-functional requirements
- Consistent: A physical copy must not be issued to two members simultaneously
- Mailability: Catalog management, membership and lending should have distinct responsibilities.
- Extensibility: Borrowing limits and loan durations should be configurable.
- Testability: Business rules should be testable without a real DB or email service.
- Reliability: Failed borrowing operations must not have inventory and loan records inconsistent

### 3. Core Entities

| Entity      | Responsibility                           |
|------------|-------------------------------------------|
| Library    | Coordinates library operations            |
| Book       | Stores book information                   |
| BookCopy   | Represents an individual physical copy    |
| Member     | Represents a library member               |
| Librarian  | Manages library operations                |
| Loan       | Tracks borrowing and returning of books   |
| Reservation| Tracks book reservations                  |
| Fine       | Represents overdue penalties              |
