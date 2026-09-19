## Observer Design Pattern

The core idea is:

> When one object's state changes, automatically notify all objects that are interested in that change.

Think about YouTube subscriptions:

```text
            YouTube Channel
                  │
             state changes
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
     User A     User B     User C
        │         │         │
      notify    notify    notify
```

### 1. What problem does it solve?
Imagine you have a WeatherStation.
whenever temperature changes, you want to update:

- Mobile app
- TV display
- Web dashboard
- Alert system

A naive implementation might be:

```ts
class WeatherStation {
  updateTemperature(temp: number) {
    mobileApp.update(temp);
    tvDisplay.update(temp);
    dashboard.update(temp);
    alertSystem.update(temp);
  }
}
```

This creates tight coupling.

now imagine adding:
```text
EmailAlert
SlackAlert
SmartWatch
```

You have to modify `WeatherStation`.

#### Observer solves this
Instead:
```text
                    Subject
                WeatherStation
                     │
                notify()
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
   Observer A     Observer B    Observer C
    Mobile          TV          Dashboard
```

### 2. What does the structure look like?

There are two major components.

#### Subject
The object whose state changes.
```text
WeatherStation
```

#### Observer
Objects interested in changes.

```text
MobileDisplay
TVDisplay
Dashboard
```

structure:

```text
                    Subject
                       │
              ┌────────┴────────┐
              │                 │
          attach()           detach()
              │
              ↓
          observers[]
              │
        ┌─────┼─────┐
        ↓     ↓     ↓
       A      B     C
       │      │     │
       └──────┴─────┘
              │
           update()
```

### 3. TypeScript Implementation

#### Step 1- Observer interface

```ts
interface Observer {
  update(temperature : number) : void;
}
```

### 4. Concrete Observers

#### Mobile Display
```ts
class MobileDisplay implements Observer {
  update(temperature : number ) : void {
    console.log(`Mobile Temperature is ${temperature}`)
  }
}
```

#### TV Display
```ts
class TVDisplay implements Observer {
  update (temperature : number ) {
    console.log(`TV: Temperature is ${temperature}`)
  }
}
```


#### Dashboard

```ts
class Dashboard implements Observer {
  update(temperature : number ) : void {
    console.log(`Dashboard: Temperature is ${temperature}`)
  }
}
```

### 5. Subject
Let define the Subject interface.

```ts
interface Subject {
  attach(observer: Observer) : void;
  detach(observer:Observer):void;
  notify():void;
}
```

### 6. Concrete Subject
```ts
class WeatherStation implements Subject {

    private observers: Observer[] = [];
    private temperature = 0;

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(
            item => item !== observer
        );
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this.temperature);
        }
    }

    setTemperature(temperature: number): void {
        this.temperature = temperature;
        this.notify();
    }
}
```

### 7. When should I use Observer?
1. One object has many interested consumers
2. Observer is closely related to event systems.
3. Pub/Sub-style notifications


### 8. When should I not use Observer ?
1. Only one consumer.
2. You need guaranteed synchronous business logic

### 9. 5-point cheat sheet

| Question               | Observer                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| **1. Problem?**        | Many objects need to react to another object's state change               |
| **2. Structure?**      | Subject → multiple Observers                                              |
| **3. Use when?**       | Events, subscriptions, state-change notifications                         |
| **4. Don't use when?** | Few consumers, simple direct calls, or overly complex notification chains |
| **5. Core idea?**      | **One-to-many notification**                                              |
