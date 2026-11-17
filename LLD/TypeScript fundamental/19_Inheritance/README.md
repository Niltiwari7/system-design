### 1. First Principle - Why was inheritance introduced?
#### 1.1 Imagine a real world problem
Suppose we are bailing an employee management system.
Our company has three types of employees:
- Developer
- Manager
- Designer

All employees have some common information:
- Name
- EmployeeId
- Email
- Department

But they also have different responsibilities.
For example:
| Employees | Responsibilities |
| --- | --- |
| Developer | Write code, review PRs |
| Manager | Manage team, conduct reviews |
| Designer | Create designs, maintain design systems |

Let's initially implement these as independent classes.
```ts
class Developer {
  name : string;
  employeeId : number ;
  email : string

  constructor(name : string, employeeId : number, email : string) {
    this.name = name;
    this.employeeId = employeeId;
    this.email = email;
  }

  login(): void {
    console.log(`${this.name} logged in`);
  }

  writeCode(): void {
    console.log(`${this.name} is writing code`);
  }
}
```

Now the manager class:
```ts
class Manager {
  name : string;
  employeeId : number;
  email : string;

  constructor(name : string, employeeId : number , email : string) {
    this.name = name ;
    this.employeeId = employeeId;
    this.email = email;
  }

  login() : void {
    console.log(`${this.name} logged in`);
  }

  manageTeam() : void {
    console.log(`${this.name} is managing the team`);
  }
}
```

And Designer:
```ts
class Designer {
  name : string;
  employeeId : number;
  email : string;

  constructor (name : string , employeeId : number, email : string) {
    this.name = name;
    this.employeeID = employeeId;
    this.email = email;
  }

  login(): void {
    console.log(`${this.name} logged in`)
  }

  createDesign(): void {
    console.log(`${this.name} is creating a design`);
  }
}

```
What is wrong with this implementation?
We have repeated:
- Three properties
- Three constructor
- Three login method

This is called duplication.
Imagine our company changes the login behavior. we now have to modify three classes.


#### 1.2 How does inheritance solve this?
Think about the relationship between these employees.
- A Developer is an Employee.
- A Manager is an Employee.
- A Designer is an Employee.
Therefore, we can create a common parent class called Employee.
The parent contains common properties and behavior. The child classes contain specialized behavior.
![alt text](image.png)

Now let's implement it.
```ts
class Employee {
  constructor(
    public name: string;
    public employeeId : number;
    public email : string
  ){}

  login(): void {
    console.log(`${this.name} logged in`);
  }
}

class Developer extends Employee {
  writeCode(): void {
    console.log(`${this.name} is writing code`)
  }
}

class Manager extends Employee {
  manageTeam(): void {
    console.log(`${this.name} is managing the team`);
  }
}

class Designer extends Employee {
  createDesign(): void {
    console.log(`${this.name} is creating a design`)
  }
}
```

Let's Create objects.
```ts
const developer = new Developer(
  "Nilesh",
  101,
  "nilesh@example.com"
)
developer.login();
developer.writeCode();

const manager = new Manager(
  "Rahul",
  102,
  "rahul@example.com"
)
manager.login();
manager.manageTeam();
```

#### 1.3 Three major benefits of inheritance
A. Code Reusability
B. Extensibility
C. Maintainability


### 2. Type of Inheritance
#### 2.1 Single Inheritance
One child class inherits from one parent class.
![alt text](image-1.png)
Example:
```ts
class Vehicle {
  start(): void {
    console.log("Vehicle started")
  }
}
class Car extends Vehicle {
  drive(): void {
    console.log("Car is driving")
  }
}

const car = new Car();
car.start();
car.drive();
```

#### 2.2 Multilevel inheritance
A class inherits from a class that itself inherits from another class.
![alt text](image-2.png)
Example:
```ts
class LivingBeing {
  breathe(): void {
    console.log("Breathing");
  }
}
class Animal extends LivingBeing {
  eat(): void {
    console.log("Eating");
  }
}

class Dog extends Animal {
  bark(): void {
    console.log("Barking");
  }
}

const dog = new Dog();
dog.breathe();
dog.eat();
dog.bark();
```
#### 2.3 Hierarchical Inheritance
Multiple child classes inherit from the same parent.

![alt text](image-3.png)

```ts
class Employee {
  login(): void {
    console.log("Employee logged in")
  }
}

class Developer extends Employee {
  code(): void {
    console.log("Writing code");
  }
}

class Manager extends Employee {
  manage(): void {
    console.log("Managing Team");
  }
}

class Designer extends Employee {
  design (): void {
    console.log("Creating designs")
  }
}
```

#### 2.4 Multiple inheritance
Multiple inheritance means a child class inherits from more than one parent class.
![alt text](image-4.png)
However, Typescript does not support multiple inheritance of classes.

```ts
class Camera {
  takePhoto(): void {}
}

class Phone {
  makeCall(): void {}
}

// Invalid TypeScript
// class SmartPhone extends Camera, Phone {}
```
How do we achieve a similar design?
Using interfaces:
```ts
interface Camera {
  takePhoto(): void;
}

interface Phone {
  makeCall(): void;
}

class SmartPhone implements Camera, Phone {
  takePhoto(): void {
    console.log("Taking photo");
  }

  makeCall(): void {
    console.log("Making call");
  }
}

const phone = new SmartPhone();

phone.takePhoto();
phone.makeCall();
```

#### 2.5 Hybrid inheritance
Hybrid inheritance combines two or more inheritance structures.
![alt text](image-5.png)
Here we have:
- Hierarchical inheritance: Person → Employee and Person → Customer.
- Multilevel inheritance: Person → Employee → Developer.

### 3. The most important inheritance concepts for SDE-2
#### 3.1 The "is-a" relationship
This is the foundation of inheritance.
For example:
- A car is a Vehicle.
- A dog is an animal.
- A developer is an employee.
- A manager is an employee.

These are valid relationships.
But consider:
- A Car is an Engine.
- A Laptop is a Processor.
- A House is a Room.
These relationships do not represent inheritance.

Why?
Because a car has an engine. A laptop has a processor. A house has rooms.
There are examples of composition or aggregation, not inheritance.

#### 3.2 Method overriding
Method overriding happens when a child class provides its own implementation of a method defined in its parent.
Think about a vehicle.
Different vehicles start differently.
- Car starts using an engine.
- ElectricCar starts using an electric motor.
- Bike stars using its engine.

We can represent this with methodoverirding

```ts
class Vehicle {
  start() : void {
    console.log("Vehicle is starting");
  }
}

class Car extends Vehicle {
  override start(): void {
    console.log("Car engine is starting");
  }
}

class BBike extends Vehicle {
  override start(): void {
    console.log("Bike engine is starting");
  }
}
```

Notice the `override` keyword.
Typescript supports it to explicitly indicate that you are overriding a parent method.

