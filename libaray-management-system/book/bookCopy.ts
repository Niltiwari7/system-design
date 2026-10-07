import Book from "./book";
import BookCopyStatus from "../enums/bookCopyStatus";

// Physical copy of a book — has its own availability state
class BookCopy {
  constructor(
    public readonly id: string,
    public readonly book: Book,
    private status: BookCopyStatus = BookCopyStatus.AVAILABLE,
  ) {}

  isAvailable(): boolean {
    return this.status === BookCopyStatus.AVAILABLE;
  }

  borrow(): void {
    if (!this.isAvailable()) {
      throw new Error(`BookCopy ${this.id} is not available for borrowing.`);
    }
    this.status = BookCopyStatus.BORROWED;
  }

  reserve(): void {
    if (!this.isAvailable()) {
      throw new Error(`BookCopy ${this.id} cannot be reserved.`);
    }
    this.status = BookCopyStatus.RESERVED;
  }

  release(): void {
    this.status = BookCopyStatus.AVAILABLE;
  }

  getStatus(): BookCopyStatus {
    return this.status;
  }
}

export default BookCopy;
