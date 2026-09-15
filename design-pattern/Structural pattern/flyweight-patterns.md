## Flyweight Design Pattern

### Mental Model

Think:
> **Flyweight=Don't create thousands of identical objects. Share the common parts**

Imagine a game with 1 million trees.

if every tree object stores:

```text
Tree
├── type = "Oak"
├── color = "Green"
├── texture = "oak.png"
├── x = 100
├── y = 200
└── size = 20
```

you might waste a huge amount of memory because many trees share the same 
- type 
- color
- texture

Only their position and size are different.

so flyweight says:

```text
              Shared data
             ┌─────────────┐
             │ Oak         │
             │ Green       │
             │ oak.png     │
             └──────┬──────┘
                    │
       ┌────────────┼────────────┐
       ↓            ↓            ↓
    Tree #1      Tree #2      Tree #3
    x=10,y=20    x=50,y=30    x=90,y=40
```


### 1. What problem does it solve?
The problem is 
> You have a huge number of similar objects consuming too much memory.

for example:
A document has:

```text
Hello world
```

Every char might have:
```text
Character
├── value
├── font
├── fontSize
├── color
├── bold
├── italic
└── position
```

Imagine a document with `1,000,000` chars.

if every char stores its own:

```text
font = Arial
fontSize = 14
color = black
```

you're duplicating a lot of data.

Instead:

```text
               FontStyle
              ┌──────────┐
              │ Arial    │
              │ 14px     │
              │ black    │
              └────┬─────┘
                   │
          ┌────────┼────────┐
          ↓        ↓        ↓
        'H'       'e'      'l'
        pos 0     pos 1    pos 2
```

The characters share the common formatting object.

### 2. What does the structure look like?

```text
              FlyweightFactory
                     │
                     │ get()
                     ↓
                Flyweight
                     │
          ┌──────────┼──────────┐
          ↓          ↓          ↓
       Shared      Shared     Shared
        data        data       data
```

### 3. Typescript example

#### step 1- Shared object

```ts
class TreeType {
  constructor(
    public name: string,
    public color: string,
    public texture: string
  ){}

  draw(x: number , y:number) : void {
    console.log(`Drawing ${this.name} at (${x}, ${y})`)
  }
}
```

This contains the intrinsic state:

```
name 
color
texture
```
These can be shared.

#### step2 - Flyweight factory

We don't want:
```ts
new TreeType("Oak","Green","oak.png");
new TreeType("Oak","Green","oak.png");
new TreeType("Oak","Green","oak.png");
```

Instead, maintain a cache.

```ts
class TreeFactory {
  private static treeTypes = new Map<string, TreeType>();

  static getTreeType(
    name: string,
    color: string,
    texture: string
  ): TreeType {
    const key = `${name}_${color}_${texture}`;

    if(!this.treeTypes.has(key)){
      this.treeTypes.set(key,new TreeType(name, color, texture))
    }
  }
  return this.treeTypes.get(key)
}
```

Now:
```ts
const oak1 = TreeFactory.getTreeType("Oak", "Green", "oak.png");
const oak2 = TreeFactory.getTreeType("Oak","Green"."oak.png");
```

But variables refer to the same object.

### 4. Where does the extrinsic state go?

The position should not be stored inside `TreeType`.

Instead:

```ts
class Tree {
    constructor(
        private x: number,
        private y: number,
        private type: TreeType
    ) {}

    draw(): void {
        this.type.draw(this.x, this.y);
    }
}
```

Now:

```ts
const oakType = TreeFactory.getTreeType(
    "Oak",
    "Green",
    "oak.png"
);

const tree1 = new Tree(10, 20, oakType);
const tree2 = new Tree(100, 200, oakType);
const tree3 = new Tree(500, 700, oakType);
```

Notice:

```text
                 SAME
                  │
                  ▼
              TreeType
          ┌──────────────┐
          │ Oak          │
          │ Green        │
          │ oak.png      │
          └──────┬───────┘
                 │
       ┌─────────┼─────────┐
       ↓         ↓         ↓
    Tree #1   Tree #2   Tree #3
    (10,20)   (100,200) (500,700)
```

### 5. When should I use it?
1. Huge numbers of object.
2. Many objects share the same data.
3. Memory is becoming a concern.

### 6. When should I not use it?
1. Small number of objects.
2. Objects don't share much data.
3. Shared state becomes difficult to manage.