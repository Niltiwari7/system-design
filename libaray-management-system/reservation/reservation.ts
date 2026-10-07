import Member from "../member/member";
import Book from "../book/book";
import ReservationStatus from "../enums/reservationStatus";

// Tracks a member's intent to borrow a book when a copy becomes available
class Reservation {
  public status: ReservationStatus = ReservationStatus.ACTIVE;

  constructor(
    public readonly id: string,
    public readonly member: Member,
    public readonly book: Book,
    public readonly reservedAt: Date = new Date(),
  ) {}

  fulfil(): void {
    this.status = ReservationStatus.FULFILLED;
  }

  cancel(): void {
    this.status = ReservationStatus.CANCELLED;
  }

  isActive(): boolean {
    return this.status === ReservationStatus.ACTIVE;
  }
}

export default Reservation;
