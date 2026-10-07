import Member from "../member/member";

// Strategy pattern: different rules for different member types
interface BorrowingPolicy {
  canBorrow(member: Member, currentBorrowedCount: number): boolean;
  getLoanDays(member: Member): number;
}

export default BorrowingPolicy;
