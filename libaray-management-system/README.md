### Library management System

#### 1. Requirement

**Member can**

- Search books
- Borrow a book
- Return a book
- Reserve a book
- Pay fines

**Librarians can**
- Add books
- Add physical copies
- Remove books/ copies

**System supports**
- Multiple copies of a book 
- Different member types
- Borrowing limits
- Reservations
- Late Return fines
- Multiple payment methods


#### 2. Core entities
From those requirements

```
Library
 ├── Book
 │    └── BookCopy
 │
 ├── Member
 │
 ├── Librarian
 │
 ├── BorrowRecord
 │
 ├── Reservation
 │
 └── Fine
```

The most important modeling decision:

```
Book ≠ BookCopy
```

Example:
```
Clean Code
    │
    ├── Copy #101
    ├── Copy #102
    └── Copy #103
```

`Book` is the logical book.

`BookCopy` is the physical item.

This is a common interview concept.

#### 3. Responsibilities

| Class          | Responsibility                |
| -------------- | ----------------------------- |
| `Library`      | Coordinate library operations |
| `Book`         | Book metadata                 |
| `BookCopy`     | Physical copy + availability  |
| `Member`       | Member information            |
| `Librarian`    | Administrative operations     |
| `BorrowRecord` | Track borrowing               |
| `Reservation`  | Track reservation             |
| `Fine`         | Track/calculates fine         |


Then identifying things that vary.

```
Borrowing rules
        ↓
BorrowingPolicy

Fine calculation
        ↓
FinePolicy

Payment
        ↓
PaymentMethod
```

#### 4. Class Relationships
```
                         Library
                            |
          ┌─────────────────┼─────────────────┐
          ↓                 ↓                 ↓
        Books             Members         Librarians
          |
          ↓
         Book
          |
       has copies
          |
          ↓
      BookCopy
          |
          ↓
    BorrowRecord
          ↑
          |
       Member
```

And:
```
Member ─────── Reservation ───────> Book
```

For policies:
```
Member
  |
  └──> BorrowingPolicy

BorrowRecord
  |
  └──> FinePolicy

Fine
  |
  └──> PaymentMethod
```