# ETL (Extract, Transform, Load) — Reference & Notes

## 1. Core Concept & Analogy

**ETL** is the automated pipeline process that takes raw data from multiple sources, cleans it up, and saves it into a central system for analytics and reporting.

> 🍳 **Cooking Analogy:**
> * **Extract:** Gathering raw ingredients from different grocery stores.
> * **Transform:** Washing, chopping, and measuring the ingredients so they are ready.
> * **Load:** Serving the finished dish on a clean plate.
> 
> 

---

## 2. Step-by-Step Breakdown

```
[ Data Sources ] ---> [ Extract ] ---> [ Transform ] ---> [ Load ] ---> [ Data Warehouse ]
 (App DB, APIs)       (Fetch Data)     (Clean & Format)   (Save Data)       (Snowflake)

```

### 📥 Phase 1: Extract (Gathering Data)

Pulling data out of source systems without disrupting daily app performance.

* **Common Sources:** Relational databases (PostgreSQL, MySQL), third-party APIs (Stripe, Salesforce), log files, CSVs.
* **Extraction Methods:**
* **Full Extraction:** Pulls *all* data from the source every time (used for small datasets).
* **Incremental Extraction:** Pulls *only* data that changed since the last run (using timestamp tracking like `updated_at`).



### 🧹 Phase 2: Transform (Cleaning & Formatting)

The most critical step. Converting raw, messy data into consistent, high-quality data.

* **Cleaning:** Removing duplicate records, filling or removing missing/null values, handling corrupt text.
* **Standardizing:** Aligning date formats (`YYYY-MM-DD`), converting currencies to a standard unit (e.g., USD), standardizing capitalization.
* **Filtering:** Dropping irrelevant rows (e.g., test accounts or deleted users).
* **Joining:** Combining related tables (e.g., merging `users` with `orders`).
* **Aggregating:** Summarizing detailed rows into totals (e.g., calculating daily total revenue per region).

### 📤 Phase 3: Load (Saving the Data)

Writing the transformed, clean data into the final target system.

* **Target Destinations:** Data Warehouses (Snowflake, Google BigQuery, Amazon Redshift) or Data Marts.
* **Loading Methods:**
* **Append:** Adding new records to the bottom of the table.
* **Upsert (Update + Insert):** Updating existing records if they changed, inserting them if they are new.



---

## 3. ETL vs. ELT (Quick Comparison)

| Feature | **ETL** (Traditional) | **ELT** (Modern Cloud) |
| --- | --- | --- |
| **Order** | Extract → **Transform** → Load | Extract → Load → **Transform** |
| **Where Processing Happens** | On a separate staging engine | Directly inside the Data Warehouse |
| **Best Used For** | Legacy systems, strict privacy/compliance requirements | Modern Cloud Warehouses (Snowflake, BigQuery) |
| **Main Advantage** | Warehouse only stores clean data | Super fast ingestion; raw data is preserved for future needs |

---

## 4. Real-World Scenario: E-Commerce Store

1. **Extract:** Every night at midnight, pull raw order logs from the transactional database and clickstream logs from Google Analytics.
2. **Transform:**
* Filter out test transactions.
* Convert price values from Euros and Yen to USD.
* Group transactions by `customer_id` to compute `total_lifetime_value`.


3. **Load:** Write the clean table `customer_360_analytics` into the cloud warehouse so the business intelligence team can build revenue reports.

---

## 5. Popular ETL Tools Cheat Sheet

* **Workflow Orchestration (Scheduling & Monitoring):** Apache Airflow, Prefect, Dagster.
* **Data Transformation Engines:** dbt (data build tool), Apache Spark.
* **Cloud Managed Services:** AWS Glue, Azure Data Factory, Google Cloud Dataflow.
* **No-Code / Low-Code ETL:** Fivetran, Airbyte, Talend.