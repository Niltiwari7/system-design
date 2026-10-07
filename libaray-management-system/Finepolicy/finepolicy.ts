import BorrowRecord from "../boorowRecord/borrowrecord";

// FIX: was `BorrowingRecord` — the correct class name is `BorrowRecord`
interface FinePolicy {
  calculate(record: BorrowRecord): number;
}

export default FinePolicy;
