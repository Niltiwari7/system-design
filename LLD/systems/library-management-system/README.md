### 1. Problem statement
Design a system that allows a library to maintain its book catalog and physical inventory, register members, issue books, and accept returned books

The design should be extensible enough to support future features such as reservations, overdue fines and multiple library branches overengineering the first version.

### 2. Requirements

#### Functional Requirements
| ID   | Requirement                                                                 |
|------|-----------------------------------------------------------------------------|
| FR-1 | Add and search books by title, author, ISBN, or other metadata.           |
| FR-2 | Maintain multiple physical copies of the same book title.                 |
| FR-3 | Register library members.                                                  |
| FR-4 | Allow eligible members to borrow available copies.                        |
| FR-5 | Allow members to return borrowed copies.                                   |
| FR-6 | Track active loans and borrowing history.                                  |

#### Non-functional requirements
- Consistent: A physical copy must not be issued to two members simultaneously
- Mailability: Catalog management, membership and lending should have distinct responsibilities.
- Extensibility: Borrowing limits and loan durations should be configurable.
- Testability: Business rules should be testable without a real DB or email service.
- Reliability: Failed borrowing operations must not have inventory and loan records inconsistent

### 3. Scope and  assumptions
For the first version, assume:
One library branch.
Each physical copy has a unique identifier.
A member may borrow multiple books, subject to a limit.
Only available copies can be borrowed.
A loan records its issue date and due date.
Returning a book closes the active loan and makes the copy available again.
Storage is abstracted behind interfaces; a real database can be added later.


Out of scope initially: reservations, fines, payment processing, notifications, multiple branches, and authentication infrastructure.


### 4. Core Entities

`Book` - catalog metadata
Represent a title, such as clean code. stores ISBN , title, authors, and plication details. It does not represent one physical copy.

`BookCopy` - Physical inventory
Represents one actual copy, with its own ID, status, and association with a catalog title.

`Member` - Borrower
Stores member identity and status. Borrowing eligibility is checked by the lending workflow.

`Loan` - Borrowing transaction
Records the member, the specif copy, issue date, due date and return date. It provides the history of borrowing.

`LoanService` - Business workflow
Coordinates borrowing and returning. Checks eligibility, finds an available copy, creates or closes loans, and applies business rules.

`Repositories` - Data access
`BookRepository`, `BookCopyRepository`, `MemberRepository` and `LoanRepository` abstract how entities are stored and retrieved.