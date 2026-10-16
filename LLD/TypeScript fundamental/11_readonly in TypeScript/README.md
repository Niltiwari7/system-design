### Read Only in Typescript
### 1. What does `readonly` mean?
In TypeScript, `readonly` lets us create a property that can be assigned during initialization but can not be reassigned later.

```ts
class Employee {
  readonly employeeId: number;

  constructor(employeeId : number) {
    this.employeeId = employeeId;
  }
}

const employee = new Employee(101);
console.log(employee.employeeId) // 101
// Error: Cannot assign to a readonly property.
// employee.employeeId = 202;
```

The constructor sets employeeId to 101. After initialization, Typescript prevents from assigning a different value to that property.

### Where is `readonly` useful in LLD?
For example, a bank account might have an account number that should not change after creation.

```ts
class BankAccount {
  readonly accountNumber : string;
  private _balance: number;

  constructor(accountNumber : string, balance: number ) {
    this.accountNumber = accountNumber;
    this._balance = balance;
  }

  get balance(): number {
    return this._balance
  }

  deposit(amount: number) : void {
    if (amount <= 0) {
      throw new Error("Deposit must be greater than zero")
    }

    this._balance+=amount;
  }
}

count account = new BankAccount("ACC101", 2000);

console.log(account.accountNumber);
account.deposit(400);
console.log(account.balance) // 2400

// Error: accountNumber is readonly
// account.accountNumber = "ACC202"

```

### Coding exercise
Create an Employee class with these requirements:
1. employeeId must be a readonly number.
2. name must be a string.
3. The constructor initializes both properties.
4. Create an employee with ID 101 and name "Nilesh".
5. Print both properties.
```ts
class Employee {
  readonly employeeId: number;
  name : string;

  constructor(employeeId: number , name: string) {
    this.employeeId = employeeId;
    this.name  = name;
  }
}

const employee = new Employee(101, "Nilesh");
console.log(employee.employeeId);
console.log(employee.name);
// Error : employeeId is readonly
// employee.employeeId = 202
```

**LLD interview tip:** Use `readonly` for values that should remain fixed after an object is created , such as an accountId or employeeId.