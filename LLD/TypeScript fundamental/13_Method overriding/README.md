### Method Overriding


### 1. What is method overriding?
Imagine a parent class `Vehicle` has a method that prints:
`Vehicle started`
But a car should print:
`Car engine started`

Instead of creating a completely new method with a different name, the child class can provides its own implementation of the parent's method. This is called overriding.

### 2. Typescript implementation
```ts
class Vehicle {
  start(): void {
    console.log("Vehicle started")
  }
}

class Car extends Vehicle {
  // Override the parent class
  start(): void {
    console.log("Car engine started");
  }
}

const vehicle = new Vehicle()
const car = new Car()

vehicle.start() // Vehicle started
car.start() // Car engine started
```

Notice what happened:
- Vehicle define `start()`.
- Car also defines `start()`, the `Car` version runs.
- When we call `car.start()` the `Car` version runs.

### 3. What if we want to reuse the parent method
Sometimes we want to keep the parent's behavior and add something extra.
We can use `super.start()`.

```ts

class Vehicle {
  start(): void {
    console.log("Vehicle started");
  }
}

class Car extends Vehicle {
  start(): void {
    super.start();
    console.log("Car engine started");
  }
}

const car = new Car();
car.start();
```

Output:
```
Vehicle started
Car engine started
```

### Coding Exercise
Create these classes:
- Animal has a method makeSound() that prints "Animal makes a sound".
- Dog extends Animal and overrides makeSound() to print "Dog barks".
- Create an Animal object and a Dog object.
- Call makeSound() on both objects.
```ts
class Animal {
  makeSound(): void {
    // Print: Animal makes a sound
    console.log("Animal makes a sound")
  }
}

class Dog extends Animal {
  // Override makeSound() here
  makeSound(): void {
    console.log("Dog barks")
  }
}

const animal = new Animal();
const dog = new Dog();

animal.makeSound();
dog.makeSound();
```

Remember the difference
- Inheritance: reuse behavior from a parent class.
- Overriding: customize inherited behavior in a child class.
- `super.method()`: explicitly call the parent's version of a method.