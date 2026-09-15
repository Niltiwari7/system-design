### Bridge Design Pattern

**Mental Model**

> Bridge = Separate what you do from how you do it.

For example:

```text
Remote Control              Device
     │                         │
     ├── BasicRemote           ├── TV
     └── AdvancedRemote        └── Radio
            │
            └────── Bridge ──────┘
```

A `Remote` doesn't care whether  it's controlling a `TV` or `Radio`.

### 1. What Problem does it solve?
suppose we have :
```text
Remote
 ├── TVRemote
 ├── RadioRemote
 └── SpeakerRemote
```

And then we want different types of remotes:

```text
Basic
Advanced
Voice
```

You could end up with:

```text
BasicTVRemote
AdvancedTVRemote
VoiceTVRemote

BasicRadioRemote
AdvancedRadioRemote
VoiceRadioRemote

BasicSpeakerRemote
AdvancedSpeakerRemote
VoiceSpeakerRemote
```

This become a class explosion.

if you have:

- 3 remotes types 
- 4 device types

you potentially have : 12 classes

And adding another remote/device multiplies the combinations.

Instead:

```text
Remote hierarchy          Device hierarchy

Remote                    Device
 ├── BasicRemote           ├── TV
 └── AdvancedRemote        └── Radio
       │                         │
       └──────────┬──────────────┘
                  │
                Bridge
```
Now you can independently add:
```text
New Remote
New Device
```
without creating every combination.

### 2. What does the structure look like?

There are 4 important parts.
```text
        Abstraction
             │
       ┌─────┴─────┐
       │           │
 BasicRemote   AdvancedRemote
       │           │
       └─────┬─────┘
             │
          Bridge
             │
             ▼
      Implementation
             │
       ┌─────┴─────┐
       │           │
      TV         Radio
```

Lets' implement it in typescript.

#### step1 - Implementation interface.
```ts
interface Device {
  turnOn(): void;
  turnOff(): void:
  setVolume(volume:number):void;
}
```

#### step2- concrete implementations
```ts
class TV implements Device {
  turnOn():void {
    console.log("TV on ");
  }

  turnOff(): void {
    console.log("TV off");
  }

  setVolume(volume:number) : void {
    console.log("TV volume", volume);
  }
}
```
And

```ts
class Radio implements Device {
  turnOn(): void { 
    console.log("Radio on");
  }

  turnOff() : void {
    console.log("Radio off");
  }

  setVolume(volume:number):void {
      console.log("Radio volume", volume);
  }
}
```

#### step-3 Abstraction

```ts
abstract class Remote {
  constructor(protected device:Device){}

  turnOn():void {
    this.device.turnOn();
  }

  turnOff():void {
    this.device.turnOff();
  }

}
```

Notice the importanct part:
```ts
protected device:Device
```

The  `Remote` contains a `Device`.
That is our bridge.

### 3. When  should I use if ?

for example:

#### GUI
```text
Shape                    Renderer

Circle                   WindowsRenderer
Square                   WebRenderer
Triangle                 MobileRenderer
```

Instead of :
```text
WindowsCircle
WebCircle
MobileCircle

WindowsSquare
WebSquare
MobileSquare
```

Bridge:

```text
Shape ────────── Renderer
 │                   │
Circle           Windows
Square           Web
Triangle         Mobile
```

#### Payment System:

```text
Payment Type           Payment Provider

CreditCard             Stripe
UPI                    Razorpay
PayPal                 PayPal
```

we could bridge:

```text
Payment ───────── PaymentProvider
   │                    │
CreditCard           Stripe
UPI                   Razorpay
PayPal                PayPal
```

### 4. When should I not use it?
Don't use Bridge just because composition is available.

- There is only one dimension.
