import Book from "./book/book";
import BookCopy from "./book/bookCopy";
import Member from "./member/member";
import Library from "./Library/libary";
import DefaultBorrowingPolicy from "./borrowingPolicy/defaultBorrowingPolicy";
import DefaultFinePolicy from "./Finepolicy/defaultFinePolicy";
import UpiPayment from "./Payment/upi";
import MemberType from "./enums/memberType";

// ─── Bootstrap ───────────────────────────────────────────────────────────────

const borrowingPolicy = new DefaultBorrowingPolicy();
const finePolicy = new DefaultFinePolicy();
const library = new Library(borrowingPolicy, finePolicy);

// ─── Add books & copies ───────────────────────────────────────────────────────

const cleanCode = new Book("978-0132350884", "Clean Code", "Robert C. Martin");
const ddia = new Book("978-1449373320", "Designing Data-Intensive Applications", "Martin Kleppmann");

library.addBook(cleanCode);
library.addBook(ddia);

library.addBookCopy(new BookCopy("CC-001", cleanCode));
library.addBookCopy(new BookCopy("CC-002", cleanCode));
library.addBookCopy(new BookCopy("DDIA-001", ddia));

// ─── Register members ─────────────────────────────────────────────────────────

const alice = new Member("M001", "Alice", MemberType.STUDENT);
const bob = new Member("M002", "Bob", MemberType.FACULTY);

library.registerMember(alice);
library.registerMember(bob);

// ─── Search ───────────────────────────────────────────────────────────────────

console.log("\n=== Search by title: 'clean' ===");
const results = library.searchByTitle("clean");
results.forEach((b) => console.log(`  Found: ${b.title} by ${b.author}`));

// ─── Borrow ───────────────────────────────────────────────────────────────────

console.log("\n=== Alice borrows Clean Code ===");
const record1 = library.borrowBook(alice, "978-0132350884");
console.log(`  Record: ${record1.id}, due: ${record1.dueDate.toDateString()}`);

console.log("\n=== Bob borrows Clean Code (second copy) ===");
const record2 = library.borrowBook(bob, "978-0132350884");
console.log(`  Record: ${record2.id}, due: ${record2.dueDate.toDateString()}`);

// ─── Reserve ─────────────────────────────────────────────────────────────────

console.log("\n=== Alice reserves DDIA (all copies taken hypothetically) ===");
const res = library.reserveBook(alice, "978-1449373320");
console.log(`  Reservation ${res.id} is ${res.status}`);

// ─── Return (on time) ────────────────────────────────────────────────────────

console.log("\n=== Alice returns Clean Code ===");
const { fine: fine1 } = library.returnBook(record1.id);
console.log(`  Fine: ₹${fine1}`);

// ─── Simulate overdue return ──────────────────────────────────────────────────

console.log("\n=== Bob returns Clean Code (simulated 3 days overdue) ===");
// Backdate the due date to simulate overdue
(record2 as any).dueDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
const { fine: fine2 } = library.returnBook(record2.id);
console.log(`  Fine: ₹${fine2}`);

if (fine2 > 0) {
  console.log("\n=== Bob pays the fine via UPI ===");
  library.payFine(record2.id, new UpiPayment());
}
