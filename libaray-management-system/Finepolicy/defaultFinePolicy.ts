import BorrowRecord from "../boorowRecord/borrowrecord";
import FinePolicy from "./finepolicy";

class DefaultFinePolicy implements FinePolicy {
  private readonly finePerDay = 10;

  calculate(record: BorrowRecord): number {
    if (!record.isOverdue()) {
      return 0;
    }

    const endDate = record.returnedAt ?? new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    // FIX: was `overdueDats` (typo) — corrected to `overdueDays`
    const overdueDays = Math.ceil(
      (endDate.getTime() - record.dueDate.getTime()) / msPerDay,
    );

    return overdueDays * this.finePerDay;
  }
}

export default DefaultFinePolicy;
