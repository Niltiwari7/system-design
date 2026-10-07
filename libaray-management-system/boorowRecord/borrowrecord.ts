import Member from "../member/member";
import BookCopy from "../book/bookCopy";

class BorrowRecord {
  public returnedAt?: Date;

  constructor(
    public readonly id: string,
    public readonly member: Member,
    public readonly bookCopy: BookCopy,
    public readonly borrowedAt: Date,
    public readonly dueDate: Date,
  ) {}

  returnBook(): void {
    if (this.returnedAt) {
      throw new Error("Book has already been returned.");
    }
    this.returnedAt = new Date();
  }

  isOverdue(): boolean {
    const checkDate = this.returnedAt ?? new Date();
    return checkDate > this.dueDate;
  }

  isReturned(): boolean {
    return this.returnedAt !== undefined;
  }
}

export default BorrowRecord;
