class LineItem {
  private productName: string;
  private quantity: number
  private unitPrice: number;

  constructor(productName: string, quantity: number, unitPrice: number) {
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  getSubtotal(): number {
    return this.quantity * this.unitPrice;
  }

  getProductName(): string {
    return this.productName;
  }

  describe() : void {
    console.log(`${this.productName} x ${this.quantity} @ $${this.unitPrice.toFixed(2)} each, Subtotal: $${this.getSubtotal().toFixed(2)}`);
  }
}


class Order {
  private lineItems: LineItem[] = [];
  private orderId: string;

  constructor(orderId: string) {
    this.orderId = orderId;
    this.lineItems = []
  }

  addItem (product: string, quantity: number, unitPrice:number) : void {
    this.lineItems.push(new LineItem(product, quantity, unitPrice));
  }

  removeItem(product : string): void {
    this.lineItems = this.lineItems.filter(item => item.getProductName() !== product);
  }

  getTotal(): number {
    return this.lineItems.reduce((total, item) => total + item.getSubtotal(), 0);
  }
  printReceipt(): void {
    console.log(`Order ID: ${this.orderId}`);
    this.lineItems.forEach(item => item.describe());
    console.log(`Total: $${this.getTotal().toFixed(2)}`);
  }
}


function main() : void {
  const order = new Order("ORD-1001")
  order.addItem("Laptop", 1, 999.99);
  order.addItem("Mouse", 2, 25.50);
  order.addItem("Keyboard", 1, 49.99);
  order.printReceipt();

  // when order is garbage collected, all line items go with it. No lineitem exists outside of the order. This is composition.
}

main();