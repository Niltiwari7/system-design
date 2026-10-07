import PaymentMethod from "./paymentmethod";

class UpiPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} via UPI.`);
  }
}

export default UpiPayment;
