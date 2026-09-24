## Mediator Design Pattern

> Instead of objects talking directly to each other, let them talk through a mediator.

Imagine an air traffic controller:

```
Plane A ──┐
Plane B ──┼──> Air Traffic Controller ──> Plane A/B/C
Plane C ──┘
```

Without Mediator:
```
A ─────> B
│ \      │
│  \     ↓
↓   ───> C
D <──────┘
```

Lots of relationships → high coupling.

With Mediator:
```
A ──┐
B ──┼──> Mediator
C ──┤
D ──┘
```

### 1. What problem does it solve?
Suppose you're building a chat room.

Without Mediator:
```
User A ──> User B
       ──> User C
       ──> User D

User B ──> User A
       ──> User C
       ──> User D
```

Every user needs to know about every other user.

If you have N users, communication relationships can become complicated.

Instead:
```
User A ──┐
User B ──┤
User C ──┼──> ChatRoom
User D ──┘
```

Now:
```
User A
   |
   | sendMessage()
   ↓
ChatRoom
   |
   ├──> User B
   ├──> User C
   └──> User D
```
The ChatRoom is the Mediator.

### 2. Structure
The basic structure is:
```
             Mediator
                 ↑
        ┌────────┴────────┐
        │                 │
   ConcreteMediator       │
        │                 │
        ↓                 │
   coordinates            │
        │                 │
   ┌────┴────┐            │
   ↓         ↓            │
Colleague A  Colleague B ─┘
```

### 3. TypeScript Example
Let's build a simple chat system.

### Step 1: Mediator interface
```ts
interface ChatMediator {
    sendMessage(message: string, sender: User): void;
    addUser(user: User): void;
}
```

### Step 2: Colleague
Users are the objects that communicate through the mediator.
```ts
class User {
    constructor(
        private name: string,
        private chatRoom: ChatMediator
    ) {}

    send(message: string) {
        this.chatRoom.sendMessage(message, this);
    }

    receive(message: string) {
        console.log(`${this.name} received: ${message}`);
    }

    getName() {
        return this.name;
    }
}
```
1
Notice something important:

User doesn't know about other users.

It only knows: `ChatMediator`

### Step 3: Concrete Mediator
```ts
class ChatRoom implements ChatMediator {
    private users: User[] = [];

    addUser(user: User) {
        this.users.push(user);
    }

    sendMessage(message: string, sender: User) {
        for (const user of this.users) {
            if (user !== sender) {
                user.receive(message);
            }
        }
    }
}
```
The ChatRoom handles the communication logic.

### Step 4: Usage
```ts
const chatRoom = new ChatRoom();

const alice = new User("Alice", chatRoom);
const bob = new User("Bob", chatRoom);
const charlie = new User("Charlie", chatRoom);

chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);

alice.send("Hello everyone!");
```


### 4. When should I use Mediator?
1. Many objects communicate with each other
2. Objects are becoming tightly coupled

### 5. When NOT to use it

1. Don't introduce Mediator just because objects communicate.

### 5-point cheat sheet
| Question            | Mediator                                     |
| ------------------- | -------------------------------------------- |
| **Problem?**        | Too many direct interactions between objects |
| **Structure?**      | Objects communicate through a mediator       |
| **Use when?**       | Complex object-to-object communication       |
| **Don't use when?** | Communication is already simple              |
| **Memory trick**    | **Mediator = COORDINATE**                    |
