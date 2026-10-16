### Getters and Setters

### 1. Why do we need getters and setters?
Remember we made balance private so that outside code could not change it directly.

```ts
class BankAccount {
  private balance: number = 1000;
}

const account = new BankAccount();
//Error: balance is private
// console.log(account.balance)
```

But what if we want to read the balance safely or update if after checking some rules?
That's where getters and setters help

### 2. Getter - safely read a value
A getter lets us read a private property as if it were a normal property.
```ts
class BankAccount {
  private _balance: number = 1000;

  get balance(): number {
    return this._balance;
  }
}

const account = new BankAccount();
console.log(account.balance);
```
Notice this line:
```ts
account.balance
```

we don't use parentheses. A getter looks like a property, even though TypeScript runs its when we read it.

### 3. Setter - safely update a value
A setter lets up control what happens when someone assign a new value.

```ts
class BankAccount {
  private _balance : number = 1000;
  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if(amount < 0) {
      throw new Error("Balance can not be negative")
    }
    this._balance = amount;
  }
}

const account = new BankAccount()
account.balance = 1500 // setter runs
console.log(account.balance) // 1500

account.balance = -500 // throws an error
```

The important part is that setter validates the value before updating the private property.

Note: 
- `get` runs when we read a property.
- `set` runs when we assign a value.
- `_balance` is still private; balance is the public way to access it.

