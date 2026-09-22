## Template Method Design pattern

> Template method defines the overall algorithm once, while allowing subclass to customize specific steps.

### 1. What problem does it solve?
Suppose you have two data import processes:
```
CSV Import
JSON Import
```

Both follow the same overall process:

```
1. Read file
2. Parse data
3. Validate data
4. Save data
```

But the implementation of some steps differs.

A naive approach might be:
```ts
if (type === "csv") {
    readCSV();
    parseCSV();
    validate();
    save();
}

if (type === "json") {
    readJSON();
    parseJSON();
    validate();
    save();
}
```

### 2. What does the structure look like?
```
              AbstractClass
                   │
          templateMethod()
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
      step1       step2       step3
       │           │
      fixed      customizable
                   │
          ┌────────┴────────┐
          ↓                 ↓
      ConcreteA          ConcreteB
```

### 3. TypeScript implementation

### Step 1 - Abstract class

```ts
abstract class DataImporter {
  // Template Method
  importData(): void {
    this.readData();
    this.parseData();
    this.validateData();
    this.saveData();
  }

  protected abstract readData():void;
  protected abstract parseData(): void;
  protected validateData(): void {
    console.log("Validating data...")
  }

  protected saveData(): void {
    console.log("Saving data...")
  }
}
```

Look carefully at:`importData()`

It defines the complete algorithm:
```
read
 ↓
parse
 ↓
validate
 ↓
save
```

### 4. Concrete implementation

### CSV Importer
```ts
class CSVImporter extends DataImporter {
  protected readData() : void {
    console.log("Reading CSV file");
  }
  protected parseData(): void {
    console.log("Parsing CSV data");
  }
}
```

### JSON Importer

```ts
class JSONImporter extends DataImporter {
  protected readData(): void {
    console.log("Reading JSON file");
  }

  protected parseData(): void {
    console.log("Parsing JSON data");
  }
}
```

Now:
```ts
const csvImporter = new CSVImporter();
csvImporter.importData();
```

OUTPUT:
```
Reading CSV file
Parsing CSV data
Validating data...
Saving data...
```

### 5. Why it is called "Template Method"?
Because the parent provided a template/recipe.

### 6. When should I use template method?
1. Multiple classes follow the same algorithm
2. You want to enforce a specific sequence
3. You have duplicated workflows

### 7. When should I NOT use it?
1. No common algorithm
2. Behavior needs runtime switching
