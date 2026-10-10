### 1. Interview problem

> Design a vending machine.
> The machine should allow users to select a product insert money purchase the product and receive change. The machine should handle different products pieces and payment amounts


### 2. Requirement
User should be able to:

```
1. View products
2. Select products
3. Insert money
4. Purchase product
5. Receive product
6. Receive change
7. Cancel transaction
```

Machine should:
```
- Track available products
- Track product quality
- Track inserted money
- Validate purchase
- Return change
- Prevent purchases when product is unavailable.
```

### 3. The first important question
Think about the physical machine.

A vending machine has:

```
┌──────────────────────────────┐
│        VENDING MACHINE       │
│                              │
│  Coke       ₹40     [5]      │
│  Pepsi      ₹40     [3]      │
│  Chips      ₹20     [10]     │
│                              │
│      [Select Product]        │
│                              │
│      [Insert Money]          │
│                              │
│      [Cancel]                │
└──────────────────────────────┘
```

What objects do we need?

Let's use our compressed framework.

### 4. Entities
Important nouns:
```
A vending machine
Product
ProductSlot
Money
Transaction
```

Potentially:
```
Payment
Inventory
```

Let's refine them.

### 5. Product vs ProductSlot
This is similar to:

```
Book vs BookCopy
```

A product describes what is begin sold:
```
Coke
₹40
```

A slot represents where/how many products are available:

```
Slot A1
Product = Coke
Quantity = 5
```

so:
```
Product
   ↑
   |
ProductSlot
```

### Product
```ts
class Product {
  constructor(
    public id : string,
    public name: string,
    public price: number
  ) {}
}

```

### ProductSlot
```ts
class ProductSlot {
  constructor(
    public code : string,
    public product : Product,
    private quantity: number
  ){}

  isAvailable():boolean {
    return this.quantity > 0;
  }

  removeOne(): void {
    if(!this.isAvailable()){
      throw new Error("Product is out of stock")
    }
    this.quantity--;
  }

  getQuantity(): number {
     return this.quantity;
  }
}

```

### 6. Transaction
We need to track the current purchase.

Suppose
```
User selects coke
Coke costs 40

User inserts:
20
20
10
Total cost = 50
change = 10
```

Something needs to remember:
```
selected product
inserted amount
```

That can be a transaction.

```ts
class Transaction {
  private insertedAmount = 0;

  constructor(
    public product : Product
  ){}

  addMoney(amount: number) : void {
    if(amount <= 0) {
      throw new Error("Invalid amount");
    }
    this.insertedAmount+=amount;
  }

  getInsertedAmount():number{
    return this.insertedAmount;
  }

  getRemainingAmount():number {
    return Math.max(0,this.product.price - this.insertedAmount)
  }

  getChange():number{
    return Math.max(0,this,insertedAmount - this.product.price);
  }
}
```

### 8. Now we have a problem

Imagine the machine is in different situations:

```
Machine is waiting.
Machine is accepting money
Machine has selected a product
Machine is dispensing
Machine is returning change
```

And different operations are valid in different situations.

For example:

#### Idle
```
selectProduct() -> allowed
insertMoney() -> maybe not allowed
dispense()  -> not allowed
```

#### Product selected
```
insertMoney() -> allowed
cancel()  -> allowed
```

#### Dispensing
```
insertMoney() -> NOT allowed
selectProduct() -> NOT allowed
```

if we put all this inside:

```ts
class VendingMachine{
  if(state === ...){
    ...
  }
  if(state===...){
    ...
  }
}
```

This is a perfect situation of the state pattern.

### 8. State pattern
We already learned:
> State = behavior changes based on current state.
so:
```
                    VendingMachine
                          |
                          ↓
                       State
                          |
             ┌────────────┼────────────┐
             ↓            ↓            ↓
           Idle       ProductSelected  Dispensing
```

Define:
```ts
interface VendingMachineState{
  selectProduct(
    machine: VendingMachine,
    code: string
  ): void;

  insertMoney(
    machine: VendingMachine,
    amount:number
  ): void;

  dispense(
    machine: VendingMachine,
  ): void;

  cancel(
    machine: VendingMachine
  ): void
}
```

Each state decides what operations are valid.

### 9. Vending Machine
The machine owns the current state.
```ts
class VendingMachine{
  private state: VendingMachineState;
  private slots: new Map<string,ProductSlot>();
  private transaction: Transaction;

  constructor() {
    this.state = new IdleState();
  }

  setState(state: VendingMachineState): void {
    this.state = state;
  }

  addSlot(slot: ProductSlot): void {
    this.slots.set(slot.code,slot);
  }

  getSlot(code:string): ProductSlot{
    const slot = this.slots.get(code)

    if(!slot) {
      throw new Error("Invalid product code");
    }

    return slot;
  }

  setTransaction(transaction: Transaction): void {
    this.transaction = transaction
  }

  getTransaction(): Transaction {
    if(!this.transaction) {
      throw new Error("No active transaction")
    }

    return this.transaction
  }

  selectProduct(code: string):void{
    this.state.selectProduct(this,code)
  }

  insertMoney(amount:number) : void {
    this.state.insertMoney(this,amount);
  }

  dispense(): void {
    this.state.dispense(this);
  }

  cancel(): void {
    this.state.cancel(this);
  }
}


```

The important idea:

```
VendingMachine
      |
      ↓
Current State
      |
      ↓
State decides what can happen
```

### 10. IdleState
```ts
class IdleState implements VendingMachineState {
    selectProduct(
        machine: VendingMachine,
        code: string
    ): void {

        const slot = machine.getSlot(code);

        if (!slot.isAvailable()) {
            throw new Error("Product is out of stock");
        }

        const transaction =
            new Transaction(slot.product);

        machine.setTransaction(transaction);

        machine.setState(
            new ProductSelectedState()
        );
    }

    insertMoney(): void {
        throw new Error("Select product first");
    }

    dispense(): void {
        throw new Error("Select product first");
    }

    cancel(): void {
        throw new Error("No active transaction");
    }
}
```

### 11. ProductSelectedState
```ts
class ProductSelectedState
    implements VendingMachineState {

    selectProduct(): void {
        throw new Error(
            "Product already selected"
        );
    }

    insertMoney(
        machine: VendingMachine,
        amount: number
    ): void {

        const transaction =
            machine.getTransaction();

        transaction.addMoney(amount);

        if (
            transaction.getInsertedAmount() >=
            transaction.product.price
        ) {
            machine.setState(
                new PaymentCompletedState()
            );
        }
    }

    dispense(): void {
        throw new Error(
            "Payment is not complete"
        );
    }

    cancel(
        machine: VendingMachine
    ): void {

        machine.setState(
            new IdleState()
        );

        // refund inserted money
    }
}
```

### 12. PaymentCompletedState
```ts
class PaymentCompletedState implments VendingMachineState {
  selectProduct(): void {
    throw new Error(
      "Transaction already completed"
    )
  }

  insertMoney(): void {
    throw new Error("Payment already completed")
  }

  dispense(machine: VendingMachine): void {
    const transaction = machine.getTransaction();
    console.log(`Dispensing ${transaction.product.name}`);
    machine.setState(
    new IdleState()
    )
  }
  cancel(): void {
    throw new Error(
      "Cannot cancel after payment"
    )
  }
}
```
### 13. But what about change
Suppose
```
Product = ₹40
Inserted = ₹50
Change = ₹10
```

We can isolate change calculation:

```ts
interface ChangeStrategy {
  calculateChange(
    inserted: number,
    price:number
  ):number[]
}
```
for example

```ts
class SimpleChangeStrategy implements ChangeStrategy {
  calculateChange(
    inserted:number,
    price:number
  ):number[] {
    let change = inserted - price
    const denomination = [
      100,
      50,
      20,
      10,
      5,
      2,
      1
    ]

    const result:number=[];
    for(const denomination of denominations) {
      while(change >= denomination) {
        result.push(denomination);
        change-=denomination;
      }
    }
    return result;
  }
}
```

### 14. Complete Design
```
                         VendingMachine
                               |
                               |
                             State
                               |
              ┌────────────────┼─────────────────┐
              ↓                ↓                 ↓
            Idle       ProductSelected    PaymentCompleted
                              
VendingMachine
      |
      ├── ProductSlot
      │       |
      │       └── Product
      │
      ├── Transaction
      │
      └── ChangeStrategy
               |
               └── SimpleChangeStrategy
```

### 15. Main workflow
Purchase flow
```
User
 ↓
selectProduct("A1")
 ↓
VendingMachine
 ↓
IdleState
 ↓
ProductSelectedState
 ↓
insertMoney(50)
 ↓
PaymentCompletedState
 ↓
dispense()
 ↓
ProductSlot.removeOne()
 ↓
Calculate change
 ↓
Return product + change
 ↓
IdleState
```



