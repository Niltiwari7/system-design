import Member from "../member/member";
import MemberType from "../enums/memberType";
import BorrowingPolicy from "./borrowPolicy";

class DefaultBorrowingPolicy implements BorrowingPolicy {
  // FIX: was `)` instead of `}` — class body cannot be closed with a parenthesis
  canBorrow(member: Member, currentBorrowedCount: number): boolean {
    const limit = member.memberType === MemberType.STUDENT ? 5 : 10;
    return currentBorrowedCount < limit;
  }

  getLoanDays(member: Member): number {
    return member.memberType === MemberType.STUDENT ? 14 : 30;
  }
}

export default DefaultBorrowingPolicy;
