// Strategy pattern: swap payment method without changing Library code
interface PaymentMethod {
  pay(amount: number): void;
}

export default PaymentMethod;
