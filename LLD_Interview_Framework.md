## LLD Interview framework

Most important pattern:

```
R → A → E → R → C → B → P → F
```

> Requirements -> Actors -> Entities -> Responsibility -> Connections -> Behavior -> Patterns -> Flow


### 1. Requirement

Ask one question in this section:
> What does the system need to do?

Let take one example parking lot

```
System should:
✓ Allow vehicles to enter
✓ Assign parking spots
✓ Generate ticket
✓ Calculate parking fee
✓ Process payment
✓ Release spot when vehicle exits
```

Now you will get from this question functional requirement:

```
Functional Requirements
-----------------------
1. Vehicle can enter
2. Vehicle gets a spot
3. Ticket is generated
4. Vehicle can exit
5. Fee is calculated
6. Payment is processed
7. Spot becomes available
```

for writing this section ask clarifying question from the interview


### 2. Actor

For this section ask question

> Who interacts with the system ?

For parking lot:

```
        Parking System
        /            \
       ↓              ↓
   Driver           Operator
```

Driver : 
```
Enter
Park
Pay
Exit
```

Operator: 

```
Configure floors
Configure spots
Monitor parking lot
```

### 3. Entities

In this section
> What nouns exist in the problem?

Take the requirement
> "A vehicle enters a parking lot, get a parking spot and receives a ticket"

Underline the nouns:

```
vehicle
parking lot
parking spot
ticket
```

Potential Entities:

```
Vehicle
ParkingLot
ParkingSpot
Ticket
```

Another requirement
> The users pays using UPR or Card

Nouns:
```
User
Payment
UPI
Card
```

Potential entities
```
Payment
PaymentMethod
UPIPayment
CardPayment
```

### 4. Responsibilities
> What should each class be responsible for?

```
Vehicle
→ represents a vehicle

ParkingSpot
→ represents a parking location

Ticket
→ represents a parking session

ParkingLot
→ manages floors and overall parking operations

PaymentService
→ handles payment

PricingStrategy
→ calculates parking fee
```

### Connections
> How are these objects related?

This is where you use:

```
IS-A
HAS-A
USES-A
```

IS-A

Inheritance.

```
Car IS-A vehicle.
Bike IS-A vehicle.
Truck IS-A vehicle.
```

```ts
class Car extends Vehicles{}
```

HAS-A
Composition/aggregation

```
ParkingLot HAS-A floors
Floor HAS-A ParkingSpots
ParkingSpot HAS-A Vehicle
```

means:

```
ParkingLot
    |
    └── Floors
          |
          └── ParkingSpots
```

USES-A

```
ParkingService
      |
      └── uses PricingStrategy
```

### 6. Behavior

> What does the system actually do?

for parking lot

**Entry**
```
Vehicle
   ↓
EntryGate
   ↓
ParkingLot
   ↓
Find available spot
   ↓
Assign spot
   ↓
Create Ticket
```

**Exit**
```
Vehicle
   ↓
ExitGate
   ↓
Find Ticket
   ↓
Calculate Price
   ↓
Payment
   ↓
Release Spot
```

### 7. Patterns

> Is there a problem here that one of my patterson solves?

for example:

**Multiple pricing algorithms?**
```
Hourly
Weekend
Premium
Dynamic
```

-> Strategy
```
PricingStrategy
```

**Multiple Payment method?**
```
UPI
Card
Cash
```
-> Strategy/interface-based Polymorphism may fit.

**Different vehicle types?**
```
Car
Bike
Truck
```
Maybe inheritance.

### 8. Flow
Finally, demonstrate the system.

**Pick 2-3 important use cases.**

For parking lot:
```
Use Case 1
Vehicle enters

Use Case 2
Vehicle exits

Use Case 3
Parking lot becomes full
```
