## Data Lakehouse

A Data Lakehouse combines ideas from Data Lakes and Data Warehouses.

The mental model is:

```text
              DATA LAKEHOUSE

          Cheap object storage
                  +
          Warehouse capabilities
```

Or:
```text
              Lakehouse
                  │
        ┌─────────┴─────────┐
        │                   │
   Data Lake             Warehouse
   properties            properties
        │                   │
   Raw data             SQL analytics
   Huge scale           Transactions
   Cheap storage        Schema
   ML data              Governance
```

> A Data Lakehouse is an architecture that stores data in low-cost data-lake storage while providing many of the management, reliability, and analytics capabilities traditionally associated with data warehouses.

### Lake house architecture

```text
             DATA SOURCES
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
   Application   Events     Logs
       │          │          │
       └──────────┼──────────┘
                  ↓
           Ingestion Layer
                  │
                  ↓
        ┌───────────────────┐
        │                   │
        │   Object Storage  │
        │                   │
        │   S3 / GCS / Blob │
        │                   │
        └───────────────────┘
                  │
           Table Format
       ┌──────────┼──────────┐
       ↓          ↓          ↓
     Bronze     Silver      Gold
       │          │          │
       └──────────┼──────────┘
                  ↓
        Query / Compute Engine
                  │
        ┌─────────┼─────────┐
        ↓         ↓         ↓
       BI        ML       Analytics
```

### Object storage

This is usually the foundation.

Examples:
```
AWS S3
Google Cloud Storage
Azure Data Lake Storage
```

Why object storage?
Because it provides:

- Massive scalability
- Cheap storage
- Durability

### Table format
This is one of the most important concepts.

A lakehouse doesn't simply throw random files into S3.

Instead, data is organized into tables using table formats such as:

- Apache Iceberg
- Delta Lake
- Apache Hudi


### Bronze → Silver → Gold

This is another concept frequently encountered in lakehouse architectures.

#### Bronze

Raw data.

```text
Kafka
 ↓
Bronze
```
```json
Example:

{
  "userId": 123,
  "event": "video_play",
  "timestamp": "...",
  "metadata": {...}
}
```

Minimal transformation.

#### Silver

Cleaned and standardized data.
```text
Bronze
   ↓
Cleaning
   ↓
Silver
```

For example:
```text
Remove duplicates
Validate fields
Normalize timestamps
Fix data types
```

#### Gold

Business-ready data.
```text
Silver
   ↓
Aggregation
   ↓
Gold
```


Example:
```text
daily_video_views

date       | video_id | views
-----------|----------|------
2026-09-15 | 123      | 45000
2026-09-15 | 456      | 21000
```
Then BI tools can query Gold.

### Advantage

```text
✓ Cheap scalable storage
✓ Handles huge datasets
✓ Raw + structured data
✓ Supports analytics
✓ Good for ML/data science
✓ Separation of storage and compute
✓ Historical data can be retained
```
### Challenges

```text
✗ More architectural complexity
✗ Data governance is harder
✗ Data quality can become a problem
✗ Requires specialized data engineering
✗ Query performance depends on organization/partitioning
✗ Multiple systems need to be operated
```