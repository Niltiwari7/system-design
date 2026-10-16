### Inheritance
Imagine a bank offers two types of accounts;
- SavingAccount - earns interest.
- CurrentAccount - supports business transaction

Both accounts have an account holder and a balance. Instead of writing the same code twice, we can put the common behavior in a parent class called `BankAccount`

![alt text](image.png)

The parent class contains shared behavior.  The child classes inherit that behavior and can add their own features.

### How do we write inheritance?
```ts
class BankAccount {
  construct (
    owner : string,
    protected: number
  ) {}

  get Balance() : number {
    return this.balance;
  }
}

class SavingAccount extends BankAccount {
  constructor(owner: string, balance:number){
    super(owner, balance)
  }

  addInterest(): void {
    this.balance+=100;
  }
}

const account = new SavingAccount("Nilesh", 2000);
console.log(account.owner)  // Nilesh
console.log(account.getBalance()) // 2000
account.addInterest();
console.log(account.getBalance())
```

### Coding exercise
Create a parent class Vehicle and a child class Car.
Requirements:
1. Vehicle has a public brand: string.
2. Vehicle has a method start() that prints "Vehicle started".
3. Car extends Vehicle.
4. The Car constructor accepts a brand and initializes the parent using super(brand).
5. Create new Car("Toyota"), print its brand, and call start().

```ts
class Vehicle {
  brand: string;
  constructor(brand: string) {}

  start(): void {
     console.log("Vehicle started")
  }
}

class Car extends Vehicle {
  constructor(brand : string) {
    super(brand)
  } 
}

const car = new Car("Toyota");
console.log(car.brand);
car.start();
```