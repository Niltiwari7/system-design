import Book from "../book/book";
import BookCopy from "../book/bookCopy";
import Member from "../member/member";
import BorrowRecord from "../boorowRecord/borrowrecord";
import Reservation from "../reservation/reservation";
import BorrowingPolicy from "../borrowingPolicy/borrowPolicy";
import FinePolicy from "../Finepolicy/finepolicy";
import PaymentMethod from "../Payment/paymentmethod";

// Library is the central coordinator — it owns the core workflows
class Library {
  private books: Map<string, Book> = new Map();           // isbn → Book
  private copies: BookCopy[] = [];
  private members: Map<string, Member> = new Map();       // id → Member
  private borrowRecords: BorrowRecord[] = [];
  private reservations: Reservation[] = [];
  private nextRecordId = 1;
  private nextReservationId = 1;

  constructor(
    private readonly borrowingPolicy: BorrowingPolicy,
    private readonly finePolicy: FinePolicy,
  ) {}

  // ─── Librarian operations ────────────────────────────────────────────────

  addBook(book: Book): void {
    this.books.set(book.isbn, book);
  }

  addBookCopy(copy: BookCopy): void {
    this.copies.push(copy);
  }

  registerMember(member: Member): void {
    this.members.set(member.id, member);
  }

  // ─── Member operations ───────────────────────────────────────────────────

  searchByTitle(title: string): Book[] {
    return [...this.books.values()].filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase()),
    );
  }

  searchByAuthor(author: string): Book[] {
    return [...this.books.values()].filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase()),
    );
  }

  borrowBook(member: Member, isbn: string): BorrowRecord {
    const activeBorrows = this.getActiveBorrows(member);

    if (!this.borrowingPolicy.canBorrow(member, activeBorrows.length)) {
      throw new Error(
        `${member.name} has reached their borrowing limit.`,
      );
    }

    const copy = this.findAvailableCopy(isbn);
    if (!copy) {
      throw new Error(`No available copy for ISBN ${isbn}.`);
    }

    copy.borrow();

    const loanDays = this.borrowingPolicy.getLoanDays(member);
    const borrowedAt = new Date();
    const dueDate = new Date(borrowedAt);
    dueDate.setDate(dueDate.getDate() + loanDays);

    const record = new BorrowRecord(
      `BR-${this.nextRecordId++}`,
      member,
      copy,
      borrowedAt,
      dueDate,
    );
    this.borrowRecords.push(record);
    return record;
  }

  returnBook(recordId: string): { fine: number } {
    const record = this.findBorrowRecord(recordId);
    if (!record) {
      throw new Error(`Borrow record ${recordId} not found.`);
    }
    if (record.isReturned()) {
      throw new Error(`Record ${recordId} is already returned.`);
    }

    record.returnBook();
    record.bookCopy.release();

    // Fulfil the oldest active reservation for this book if any
    this.fulfillReservation(record.bookCopy.book.isbn);

    const fine = this.finePolicy.calculate(record);
    return { fine };
  }

  reserveBook(member: Member, isbn: string): Reservation {
    const book = this.books.get(isbn);
    if (!book) {
      throw new Error(`Book with ISBN ${isbn} not found.`);
    }

    const reservation = new Reservation(
      `RES-${this.nextReservationId++}`,
      member,
      book,
    );
    this.reservations.push(reservation);
    return reservation;
  }

  payFine(recordId: string, paymentMethod: PaymentMethod): void {
    const record = this.findBorrowRecord(recordId);
    if (!record) {
      throw new Error(`Borrow record ${recordId} not found.`);
    }

    const fine = this.finePolicy.calculate(record);
    if (fine === 0) {
      console.log("No fine to pay.");
      return;
    }
    paymentMethod.pay(fine);
  }

  // ─── Private helpers ─────────────────────────────────────────────────────

  private findAvailableCopy(isbn: string): BookCopy | undefined {
    return this.copies.find(
      (c) => c.book.isbn === isbn && c.isAvailable(),
    );
  }

  private getActiveBorrows(member: Member): BorrowRecord[] {
    return this.borrowRecords.filter(
      (r) => r.member.id === member.id && !r.isReturned(),
    );
  }

  private findBorrowRecord(recordId: string): BorrowRecord | undefined {
    return this.borrowRecords.find((r) => r.id === recordId);
  }

  private fulfillReservation(isbn: string): void {
    const reservation = this.reservations.find(
      (r) => r.book.isbn === isbn && r.isActive(),
    );
    if (reservation) {
      reservation.fulfil();
      console.log(
        `Reservation ${reservation.id} fulfilled for ${reservation.member.name}.`,
      );
    }
  }
}

export default Library;
