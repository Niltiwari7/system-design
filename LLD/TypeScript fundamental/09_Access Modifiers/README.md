### Access Modifiers

Access modifiers control where a class's properties and methods can be accessed.

### 1. Understand them with a real world example
Imagine a bank account
- `public` - Every one can access it
- `private` - Only the same class can access it.
- `Protected` - The same class and its child class can access it.

### 2. `public`: Accessible from outside
In typescript, class properties and methods are public by default.

```ts
class BankAccount {
  public owner: string;
  constructor(owner : string) {
    this.owner = owner;
  }
}

const account  = new BankAccount("Nilesh")
console.log(account.owner)
```

### 3. `private`: Restricted to the same class
```ts
class BankAccount {
  private balance: number;
  constructor(balance: number) {
    this.balance = balance;
  }

  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(1000);

console.log(account.getBalance());
```

The class can access its own balance. Outside code can use `getBalance()` because that method is public


### 4. `protected`: Available to child classes
A child class is a class build from another class. 

```ts
class BankAccount {
  protected balance: number;

  constructor(balance : number ) {
    this.balance = balance;
  }
}

class SavingAccount extends BankAccount {
  showBalance(): number {
    return this.balance;
  }
}

const savings = new SavingAccount(2000);

console.log(savings.showBalance());
```

## Access Modifiers Comparison

| Modifier  | Same class | Child class | Outside code |
|-----------|------------|-------------|--------------|
| public    | Yes        | Yes         | Yes          |
| private   | Yes        | No          | No           |
| protected | Yes        | Yes         | No           |


### Coding Exercise 1

Complete the class below.
Requirements:
1. Make owner public.
2. Make balance private.
3. Make getBalance() public.
4. Create an account for "Nilesh" with a balance of 5000.
5. Print the owner and balance using the appropriate properties and methods.

```ts
class BankAccount {
  owner : string; // since default access modifier is public that's why not need to declare public
  private balance: number;

  constructor(owner: string, balance: number) {
    this.owner = owner;
    this.balance = balance;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account: BankAccount = new BankAccount("Nilesh", 1200);
console.log(account.owner);
console.log(account.getBalance())
```
