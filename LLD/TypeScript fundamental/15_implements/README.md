### implements in Typescript

Imagine a company requires every employee to hae a name and a method to introduce themselves. An interface describes those requirements, and a class uses `implements` to promise it will follow them.

### Example 1
```ts
interface Printable {
  print(): void;
}

class Invoice implements Printable {
  print(): void {
    console.log("Printing invoice...")
  }
}

const invoice =  new Invoice()
invoice.print()
```
**Output:**
```
Printing invoice...
```

### Exercise 1
Create an interface named Vehicle with:
- A property brand of type string.
- A method start() that returns void.
Then create a class named Car that implements Vehicle. Its constructor should initialize brand, and its start() method should print "Car is starting".
Finally, create a Car object with brand "Toyota", print its brand, and call start().

```ts

interface Vehicle {
  brand: string;
  start(): void;
}

class Car implements Vehicle {
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  start(): void {
    console.log("Car is starting");
  }
}

const car = new Car("Toyota");

console.log(car.brand);
car.start();

```

**Output**
```
Toyota
Car is starting
```

### Implements vs extends

- `extends`: A `Car` is a type of Vehicle. It can inherit existing properties and methods from a parent class.

- `implements`: A `Car` promises to follow the requirements written in an interface, such as having a `start()` method.

### Exercise  2
- Create an interface Chargeable requiring charge(): void.
- Create a class Device with a turnOn(): void method that prints "Device is on".

- Create Phone that extends Device and implements Chargeable.

- Implement charge() so it prints "Phone is charging".

- Create a Phone object and call both methods.

```ts
interface Chargeable {
  // Declare charge()
  charge() : void;
}

class Device {
  // Add turnOn()
  turnOn(): void {
    console.log("device is on")
  }
}

class Phone extends Device implements Chargeable  {

  // Implement charge()
  charge() : void {
    console.log("Phone is charging")
  }
}

const phone = new Phone();
phone.turnOn();
phone.charge();
```