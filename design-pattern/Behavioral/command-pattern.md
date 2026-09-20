## Command Design Pattern

> Command = wrap an action inside an object so you can store it, pass it around, queue it, undo it, or execute it later.

### 1. What problem does it solve?

Imagine you have a text editor:

```
Editor
├── copy()
├── paste()
├── delete()
├── undo()
└── save()
```

And your UI has:
```
Button
Keyboard shortcut
Menu item
```

All of them need to execute operations.

Without command, you might write:
```ts
button.onClick(() => editor.copy());

menuItem.onClick(() => editor.copy());

keyboardShortcut.onPress(() => editor.copy())
```

Now imagine you want:
- undo
- redo
- command history
- delayed execution
- logging
- macros
- queues

It becomes complicated.


### Command solved this by turning the request into an object
```
                 Command
                    │
          ┌─────────┼─────────┐
          ↓         ↓         ↓
      CopyCommand PasteCommand DeleteCommand
          │
          ↓
       Receiver
        Editor
```

Now the UI does not need to know how the operation works.

It just says:

```ts
command.execute();
```


### 2. What does the structure look like?
There are usually four important pieces.
```
Invoker
   │
   │ execute()
   ▼
Command
   │
   ▼
ConcreteCommand
   │
   │ calls
   ▼
Receiver
```

#### 1. Command
Defines:
```ts
execute()
```

#### 2. Concrete Command
Represents a specific action.

```
CopyCommand
DeleteCommand
SaveCommand
```

#### 3. Receiver
Actually performs the work.

```
TextEditor
```

#### 4. Invoker
Triggers the command.
```
Button
Remote
Menu
Scheduler
Queue
```

### 3. TypeScript implementation

#### step 1- Receiver
The receiver contains the actual business logic.
```ts
class TV {
    turnOn(): void {
        console.log("TV is ON");
    }

    turnOff(): void {
        console.log("TV is OFF");
    }
}
```

The TV knows how to turn itself on/off.

### 4. Command Interface
```ts
interface Command {
  execute() : void;
}
```

Every command must provide:

```ts
execute()
```

### 5. Concrete command
```ts
class TurnOnCommand implements Command {

    constructor(
        private tv: TV
    ) {}

    execute(): void {
        this.tv.turnOn();
    }
}
```

### 6. Invoker

```ts
class RemoteControl {
  private command? : Command;

  setCommand(command: Command) : void {
    this.command = command;
  }

  pressButton(): void {
    this.command?.execute();
  }
}
```

The remote doesn't know:
```
Is this a TV?
Is this a speaker?
Is this a light?
```

It only knows:

```ts
command.execute()
```

### 7. Using it

```ts
const tv = new TV();

const turnOn = new TurnOnCommand(tv);
const turnOff = new TurnOffCommand(tv);

const remote = new RemoteControl();

remote.setCommand(turnOn);
remote.pressButton();
```

### 8. When should I use Command?
1. Undo/Redo
2. Queue operations
3. Login operations

### 9. When should I not use it?

1. Simple direct operation.
2. No need to store/ defer/ undo the action.
3. Too many tiny commands

### 10. 5-point cheat sheet

| Question               | Command                                         |
| ---------------------- | ----------------------------------------------- |
| **1. Problem?**        | Need to treat an operation/request as an object |
| **2. Structure?**      | Invoker → Command → Receiver                    |
| **3. Use when?**       | Undo/redo, queues, logging, scheduling, macros  |
| **4. Don't use when?** | Simple direct method calls are enough           |
| **5. Core idea?**      | **Encapsulate a request as an object**          |


