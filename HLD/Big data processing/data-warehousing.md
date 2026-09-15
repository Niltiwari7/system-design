## Data warehousing

### 1. What problem does a Data warehouse solve?

Imaging you have an e-commerce application.
your production database contains:

```text
Users
Orders
Products
Payments
Reviews
```

Now your CEO asks:

> What was our revenue last quarter?
> which products are growing fastest?
> what is the average order value by country?
> HOw many users purchased something after seeing an advertisement.

You could run SQL queries on your production database.
But that is a **bad idea at scale**.

Why?
Because your production database is busy doing:
```text
User → Browse products
User → Add to cart
User → Place order
User → Make payment
```

At the same time, your analytics query might be:
```sql
SELECT
    country,
    SUM(order_amount),
    AVG(order_amount)
FROM orders
JOIN users ...
JOIN products ...
GROUP BY country;
```

That query could scan billions of rows.

Now your users start experiencing:

```text
Slow API
   ↓
Slow DB queries
   ↓
Checkout becomes slow
   ↓
Users complain
```

#### Solution:

Separate operational workload from analytical workload.

```text
                 ┌─────────────────────┐
Users ──────────►│ Production Database │
                 │     PostgreSQL      │
                 └──────────┬──────────┘
                            │
                            │ ETL / ELT
                            ▼
                 ┌─────────────────────┐
                 │   Data Warehouse    │
                 │ Snowflake / BigQuery│
                 │ Redshift / etc.     │
                 └──────────┬──────────┘
                            │
                            ▼
                    Analytics / BI
                    Dashboards
                    Reports
```

That's the core idea.

> **Data warehouse= a system optimized for analyzing large amount of historical data.**


### 2. OLTP vs OLAP

OLTP(Online Transaction processing)
This is your application database.

Examples

```text
PostgreSQL
MySQL
MongoDB
```

Used for:

```text
Create order
Update payment
Update user profile
Insert transaction
```

Characteristics:

```text
Small queries
Frequent writes
Low latency
Current data
Transaction consistency
```

**OLAP (Online Analytical PRocessing)**
This is your analytical system.


examples:

```text
BigQuery
Snowflake
Amazon Redshift
ClickHouse
Databricks
```
User for:

```text
Revenue analysis
Customer behavior
Business reports
Dashboards
Trend analysis
Machine learning datasets
```

Characteristics:

```text
Large queries
Large scans
Aggregations
Historical data
Mostly reads
```

### 3. How does data get into a Data warehouse?

Suppose your production uses:
```text
PostgreSQL
```
You want its data inside:
```
BigQuery
```
You need a data pipeline.

There are two major approaches:

1. ETL
```
Extract
   ↓
Transform
   ↓
Load
```

2. ELT : This is the modern way of data transportation.

```text
Extract
   ↓
Load
   ↓
Transform
```

### 4. Typical Data warehouse architecture

```text
                    APPLICATIONS
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
      PostgreSQL       MongoDB        APIs
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Data Ingestion │
                 │               │
                 │ Kafka / CDC   │
                 │ Batch Jobs    │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Data Lake     │
                 │ Raw Data      │
                 │ S3 / GCS      │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Data Warehouse│
                 │               │
                 │ BigQuery      │
                 │ Snowflake     │
                 │ Redshift      │
                 └───────┬───────┘
                         │
                ┌────────┴────────┐
                ▼                 ▼
             BI Tools           ML
          Dashboards         Analytics
```