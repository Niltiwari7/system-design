## Schema migration

> Schema migration is the process of changing the structure of your database while keeping the application running correctly.

### 1. What is the schema?
A database schema describes the structure of the data.

### 2. Simple migration

Initially:

```
users
----------------
id
name
email
```
We want:

```
users
----------------
id
first_name
last_name
email
```

A migration might be:

```sql
ALTER TABLE users
ADD COLUMN first_name VARCHAR(100);

ALTER TABLE users
ADD COLUMN last_name VARCHAR(100);
```

That is easy when you have no production traffic.
But production is different.

### 3. The real problem
Suppose the application currently has:

```
v1
```

and it expects:
```
users.name
```

we are deploying:
```
v2
```

Which expects:
```
users.first_name
users.last_name
```

During deployment we might have:

```
v1   v1   v2   v2
 \    \    |    /
      Database
```

So the database must support both versions at the same time.

### 4. Why normal migrations can be dangerous
Imaging we do this

```sql
ALTER TABLE users
DROP COLUMN name;

ALTER TABLE users
ADD COLUMN first_name VARCHAR(100);
```

Now : 
```
v1 → expects name
v2 → expects first_name
```

But:
```
name ❌
```

There fore:

```
v1 → 💥
```

And because our rolling deployment has not finished:

```
v1 is still serving users.
```

This causes production failure.


### 5. The most important pattern

#### step1 - Expand
First add the new schema without removing the old schema.

Migration:
```sql
ALTER TABLE users
ADD COLUMN first_name VARCHAR(100);

ALTER TABLE users
ADD COLUMN last_name VARCHAR(100);
```

Now both version can theoretically work.

```
v1 → name

v2 → first_name + last_name
```

#### step 2. Migrate the data
Now we need to populate the new fields.

Suppose:
```
name = "Nilesh Tiwari"
```

we migrate:

```
first_name = "Nilesh"
last_name  = "Tiwari"
```

Conceptually

```
Old Data
   ↓
Migration / Backfill
   ↓
New Data
```

For a small table we might run a SQL update.

for a huge production table we usually should not update millions of row in one giant transaction.

Instead:

```
1,000 rows
   ↓
1,000 rows
   ↓
1,000 rows
   ↓
...
```

Processes it in batches.

#### Step-3 Deploy new application
Now deploy v2.

```
v1   v1   v2   v2
 │    │    │    │
 └────┴────┴────┘
        DB
```

Database:
```
name
first_name
last_name
```

v1 can still use:

```
name
```

v2 can use:

```
first_name
last_name
```

Therefore the schema remains compatible.

#### Step 4: Stop using old column

Once we are confirmed:
```
v1 = no longer running
```

and all application instances use v2:


```
v2 v2 v2 v2
```

we can remove the old field:

```
ALTER TABLE users
DROP COLUMN name;
```

Now:

```
users
----------------
id
first_name
last_name
email
```
That is the contract phase.

### 6. Complete flow

```
              OLD SCHEMA
                  │
                  ▼
          ┌───────────────┐
          │    EXPAND     │
          │ Add new cols  │
          └───────┬───────┘
                  │
                  ▼
        OLD + NEW SCHEMA
                  │
                  ▼
          ┌───────────────┐
          │    MIGRATE    │
          │ Backfill data │
          └───────┬───────┘
                  │
                  ▼
          Deploy new app
                  │
          ┌───────┴───────┐
          │               │
         v1              v2
          │               │
          └───────┬───────┘
                  ▼
          New app = stable
                  │
                  ▼
          ┌───────────────┐
          │   CONTRACT    │
          │ Remove old   │
          └───────────────┘
```
