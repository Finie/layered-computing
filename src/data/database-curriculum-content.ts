import type { AppLayerTopic } from "@/types/tutorial";

export const databaseSystemsTopic: AppLayerTopic = {
  id: "al-systems",
  title: "The Full System: When One Machine Is Not Enough",
  overview:
    "This section turns the full-system layer into a database engineering curriculum. The learner starts with one process writing rows to disk, then follows the pressure that creates transactions, WAL, MVCC, query planning, replication, failover, backups, security, observability, and operational automation. The target outcome is practical readiness for PostgreSQL, MySQL/MariaDB, and database reliability work on mission-critical transactional systems.",
  sections: [
    {
      heading: "Course Map: From One Table to a Production Database Platform",
      content: [
        {
          type: "p",
          text: "A database engineer is not only a person who writes SQL. The job is to keep durable, correct, secure, observable data systems alive while application traffic, hardware failures, bad deployments, security threats, and human mistakes keep happening. The curriculum therefore moves from internal mechanics to operations: first understand what the engine is protecting, then learn how to run it under failure.",
        },
        {
          type: "grid",
          cards: [
            {
              title: "Foundations",
              body: "Storage engines, pages, rows, buffer pools, WAL, checkpoints, transactions, ACID, isolation, MVCC, locks, indexes, query planning, bloat, vacuum, partitioning, and connection management.",
            },
            {
              title: "Engine Deep Dives",
              body: "PostgreSQL process architecture, shared buffers, WAL writer, checkpointer, autovacuum, replication slots, physical/logical replication, PITR, and pg_stat views. MySQL/MariaDB covers InnoDB, redo/undo/binlog, EXPLAIN, replication, and Galera basics.",
            },
            {
              title: "Reliability",
              body: "Primary/replica design, synchronous versus asynchronous replication, lag, split brain, leader election, quorum, failover, switchover, RPO/RTO, Patroni, etcd/Consul, PgBouncer, backups, restores, and disaster drills.",
            },
            {
              title: "Production Practice",
              body: "Security, least privilege, TLS, secrets management, performance tuning, observability, incident response, Linux operations, Bash/Python automation, Docker Compose labs, Kubernetes StatefulSets, cloud databases, and fintech consistency patterns.",
            },
          ],
        },
        {
          type: "diagram",
          caption: "The database engineer's mental model",
          text: `Application request
      |
      v
Connection pool / PgBouncer
      |
      v
SQL parser -> planner -> executor
      |
      +--> buffer pool / shared buffers -> data pages on disk
      |
      +--> WAL / redo log -> durable crash recovery
      |
      +--> locks + MVCC -> concurrent transactions
      |
      +--> replication stream -> standby / backup / analytics

The job is to understand every arrow well enough to debug it at 3 AM.`,
        },
        {
          type: "tags",
          items: [
            "PostgreSQL",
            "MySQL/MariaDB",
            "WAL",
            "MVCC",
            "replication",
            "failover",
            "security",
            "observability",
            "automation",
            "fintech systems",
          ],
        },
      ],
    },
    {
      heading: "Database Engine Foundations: What the Engine Actually Does",
      content: [
        {
          type: "p",
          text: "A database engine is a program that accepts declarative requests, chooses an execution strategy, coordinates concurrent readers and writers, updates memory and disk safely, and leaves enough recovery information behind that a crash cannot corrupt committed data. The hard part is not storing bytes. The hard part is preserving invariants while many clients read and write at the same time.",
        },
        {
          type: "compare",
          cols: [
            {
              heading: "Storage Layer",
              points: [
                "Tables and indexes are stored as fixed-size pages or blocks, commonly 8 KB in PostgreSQL and 16 KB pages in InnoDB.",
                "Rows or tuples live inside pages. Updates may create new row versions instead of overwriting the old value in place.",
                "The buffer pool or shared buffers cache frequently used pages in RAM so every query does not hit disk.",
                "Dirty pages are memory pages changed by transactions but not yet flushed back to the table file.",
              ],
            },
            {
              heading: "Transaction Layer",
              points: [
                "WAL or redo logging records the intended change before the data page is written, allowing crash recovery.",
                "Checkpoints bound recovery time by ensuring older dirty pages are safely flushed.",
                "Locks protect physical or logical conflicts; MVCC lets readers avoid blocking writers in many cases.",
                "Isolation levels define which concurrent effects a transaction is allowed to observe.",
              ],
            },
          ],
        },
        {
          type: "diagram",
          caption: "Write path inside a transactional engine",
          text: `UPDATE accounts SET balance = balance - 100 WHERE id = 7;

1. Parse SQL and validate permissions.
2. Plan access path: index lookup on accounts_pkey.
3. Pin needed page in shared buffers / buffer pool.
4. Acquire row lock.
5. Create new tuple/version or modify InnoDB clustered record.
6. Append change to WAL/redo log.
7. Commit waits until WAL/redo is durable.
8. Dirty data page can be flushed later by checkpointer/background writer.

Commit durability depends on the log, not immediate table-file flush.`,
        },
        {
          type: "code",
          lang: "SQL - ACID and isolation lab",
          text: `-- Terminal A
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
SELECT pg_sleep(20);
COMMIT;

-- Terminal B, while A is sleeping
BEGIN ISOLATION LEVEL READ COMMITTED;
SELECT balance FROM accounts WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 1; -- waits for A's row lock
COMMIT;

-- Questions:
-- 1. Which statement blocks?
-- 2. What does Terminal B read before Terminal A commits?
-- 3. How would REPEATABLE READ change repeated SELECT behavior?`,
        },
      ],
    },
    {
      heading: "Transactions, MVCC, Locks, and Deadlocks",
      content: [
        {
          type: "p",
          text: "Transactions exist because application logic often needs several writes to become visible as one indivisible fact. MVCC exists because readers and writers would otherwise block each other constantly. Locks still exist because some conflicts are real: two transactions cannot both decrement the same inventory row as if they were alone.",
        },
        {
          type: "grid",
          cards: [
            {
              title: "Atomicity",
              body: "All writes in the transaction commit together or roll back together. A funds transfer cannot debit one account and fail before crediting the other.",
            },
            {
              title: "Consistency",
              body: "Constraints, foreign keys, checks, and application invariants must remain true after commit. Consistency is partly engine enforcement and partly schema design.",
            },
            {
              title: "Isolation",
              body: "Concurrent transactions behave as if they are separated to some defined degree: READ COMMITTED, REPEATABLE READ, SERIALIZABLE, and engine-specific variants.",
            },
            {
              title: "Durability",
              body: "Once commit returns, the engine has made enough log data durable that committed work can be recovered after crash.",
            },
          ],
        },
        {
          type: "compare",
          cols: [
            {
              heading: "MVCC View",
              points: [
                "A row can have multiple versions with transaction visibility metadata.",
                "Readers choose the version visible to their snapshot.",
                "Old versions must be cleaned later, which is why VACUUM and purge processes matter.",
                "Long-running transactions keep old versions alive and can cause bloat or undo pressure.",
              ],
            },
            {
              heading: "Lock View",
              points: [
                "Row locks protect conflicting writes to the same logical row.",
                "Table locks protect schema changes and operations that affect whole relations.",
                "Deadlocks happen when transactions wait on each other in a cycle.",
                "The engine detects the cycle, aborts one transaction, and the application must retry safely.",
              ],
            },
          ],
        },
        {
          type: "code",
          lang: "SQL - Deadlock reproduction",
          text: `-- Terminal A
BEGIN;
UPDATE accounts SET balance = balance - 10 WHERE id = 1;
-- wait, then:
UPDATE accounts SET balance = balance + 10 WHERE id = 2;

-- Terminal B
BEGIN;
UPDATE accounts SET balance = balance - 10 WHERE id = 2;
-- wait, then:
UPDATE accounts SET balance = balance + 10 WHERE id = 1;

-- One transaction will be aborted with a deadlock error.
-- Production rule: update rows in a consistent order, keep transactions short,
-- and make retry logic idempotent.`,
        },
      ],
    },
    {
      heading: "Indexes, B-Trees, Query Planning, and EXPLAIN",
      content: [
        {
          type: "p",
          text: "An index is a second data structure maintained beside the table so the engine can avoid scanning every row. The tradeoff is exact: indexes make reads faster for matching access patterns, but every insert, update, delete, vacuum, backup, and cache budget now has more work to do.",
        },
        {
          type: "grid",
          cards: [
            {
              title: "B-Tree Index",
              body: "General-purpose ordered index. Supports equality, range scans, ORDER BY, prefix use of composite indexes, and most primary key lookups.",
            },
            {
              title: "Hash Index",
              body: "Optimized for equality only. Less flexible than B-tree. Useful conceptually because it shows the difference between lookup and ordering.",
            },
            {
              title: "Composite Index",
              body: "Index on multiple columns. Column order matters: (tenant_id, created_at) helps tenant-scoped recent queries; the reverse helps different access patterns.",
            },
            {
              title: "Covering Index",
              body: "An index that contains all columns needed for a query, allowing an index-only scan when visibility rules allow it.",
            },
          ],
        },
        {
          type: "code",
          lang: "SQL - Index design and query plans",
          text: `CREATE TABLE payments (
  id bigserial PRIMARY KEY,
  tenant_id bigint NOT NULL,
  customer_id bigint NOT NULL,
  status text NOT NULL,
  amount_cents bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX payments_tenant_created_idx
  ON payments (tenant_id, created_at DESC)
  INCLUDE (status, amount_cents);

EXPLAIN (ANALYZE, BUFFERS)
SELECT id, status, amount_cents
FROM payments
WHERE tenant_id = 42
ORDER BY created_at DESC
LIMIT 50;

-- Read the plan for:
-- actual time, rows, loops, index scan vs sequential scan,
-- shared hit/read blocks, sort method, and rows removed by filter.`,
        },
        {
          type: "callout",
          label: "Planner Principle",
          text: "The planner does not ask which index exists in isolation. It estimates total cost: table size, selectivity, correlation, statistics, random page reads, sort cost, join strategy, and memory. A missing index is common, but stale statistics, bad cardinality estimates, and low work memory can be the true cause.",
        },
      ],
    },
    {
      heading: "PostgreSQL Deep Dive: Processes, Memory, WAL, and Statistics",
      content: [
        {
          type: "p",
          text: "PostgreSQL is a multi-process database. The postmaster accepts connections and starts backend processes. Background workers handle durability, cleanup, replication, and maintenance. A database engineer must recognize these components because production symptoms often point directly at one of them.",
        },
        {
          type: "diagram",
          caption: "PostgreSQL architecture",
          text: `postmaster
  |
  +-- backend process per client connection
  +-- checkpointer
  +-- background writer
  +-- WAL writer
  +-- autovacuum launcher -> autovacuum workers
  +-- logical/physical replication workers

shared memory
  |
  +-- shared_buffers
  +-- WAL buffers
  +-- lock tables

per-operation memory
  |
  +-- work_mem for sorts, hashes, joins
  +-- maintenance_work_mem for vacuum, index build, maintenance`,
        },
        {
          type: "compare",
          cols: [
            {
              heading: "Operational Views",
              points: [
                "pg_stat_activity: active queries, wait events, blocked sessions, idle-in-transaction sessions.",
                "pg_stat_statements: query fingerprints, total time, mean time, calls, rows, shared blocks.",
                "pg_locks: lock modes, granted versus waiting locks, blocking relationships.",
                "pg_stat_replication: standby state, WAL positions, send/write/flush/replay lag.",
              ],
            },
            {
              heading: "Reliability Features",
              points: [
                "Replication slots retain WAL required by standbys or logical consumers.",
                "Physical streaming replication copies WAL byte-for-byte to a standby.",
                "Logical replication sends row-level changes by publication/subscription.",
                "Point-in-time recovery restores a base backup and replays WAL until a target time.",
              ],
            },
          ],
        },
        {
          type: "code",
          lang: "SQL - PostgreSQL diagnostic starter kit",
          text: `-- Who is active or stuck?
SELECT pid, usename, state, wait_event_type, wait_event, now() - query_start AS age, query
FROM pg_stat_activity
WHERE state <> 'idle'
ORDER BY age DESC;

-- What queries cost the most total time?
SELECT calls, total_exec_time, mean_exec_time, rows, query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Is replication lagging?
SELECT application_name, state, sync_state,
       pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS bytes_lag
FROM pg_stat_replication;

-- Which tables need vacuum attention?
SELECT relname, n_dead_tup, n_live_tup, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 20;`,
        },
      ],
    },
    {
      heading: "MySQL and MariaDB Foundations: InnoDB, Logs, and Replication",
      content: [
        {
          type: "p",
          text: "MySQL and MariaDB are not just PostgreSQL with different syntax. InnoDB stores table data in clustered primary-key order, uses undo logs for consistent reads and rollback, redo logs for crash recovery, and the binary log for replication and point-in-time restore workflows. Understanding which log serves which purpose prevents many operational mistakes.",
        },
        {
          type: "compare",
          cols: [
            {
              heading: "InnoDB Internals",
              points: [
                "Clustered index: the primary key is the table storage order; secondary indexes point back to primary keys.",
                "Buffer pool caches data and index pages. Buffer pool hit ratio and dirty page flushing matter under write load.",
                "Redo log makes committed page changes recoverable after crash.",
                "Undo log allows rollback and MVCC consistent reads.",
              ],
            },
            {
              heading: "MySQL/MariaDB Operations",
              points: [
                "Binary log records logical changes for replication and recovery.",
                "EXPLAIN shows access type, possible keys, chosen key, rows estimate, and extra operations.",
                "Replication can be asynchronous, semi-synchronous, GTID-based, or Galera-style multi-primary depending on platform.",
                "Transaction isolation defaults differ from PostgreSQL, and gap locks can surprise engineers under REPEATABLE READ.",
              ],
            },
          ],
        },
        {
          type: "code",
          lang: "SQL - MySQL EXPLAIN and isolation",
          text: `EXPLAIN FORMAT=JSON
SELECT id, status, amount_cents
FROM payments
WHERE tenant_id = 42
ORDER BY created_at DESC
LIMIT 50;

SELECT @@transaction_isolation;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT * FROM inventory WHERE sku = 'ABC-123' FOR UPDATE;
UPDATE inventory SET quantity = quantity - 1 WHERE sku = 'ABC-123';
COMMIT;`,
        },
        {
          type: "callout",
          label: "PostgreSQL vs MySQL Difference That Matters",
          text: "PostgreSQL heap tables store rows separately from indexes, so secondary indexes point to tuple locations and MVCC cleanup creates vacuum pressure. InnoDB clusters the table by primary key, so primary-key choice affects physical locality and every secondary index. The same schema can age very differently across engines.",
        },
      ],
    },
    {
      heading: "Core Labs: Docker Compose for PostgreSQL, MySQL, and Observability",
      content: [
        {
          type: "p",
          text: "A production curriculum needs labs that can fail locally. The learner should repeatedly create databases, break them, observe them, restore them, and explain what happened. Docker Compose is enough for foundations because it exposes networking, volumes, environment variables, logs, and service dependencies without hiding the engine.",
        },
        {
          type: "code",
          lang: "YAML - Docker Compose lab",
          text: `services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: bank
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app_password
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql

  mysql:
    image: mysql:8
    environment:
      MYSQL_DATABASE: bank
      MYSQL_USER: app
      MYSQL_PASSWORD: app_password
      MYSQL_ROOT_PASSWORD: root_password
    ports:
      - "3306:3306"
    volumes:
      - mysqldata:/var/lib/mysql

volumes:
  pgdata:
  mysqldata:`,
        },
        {
          type: "code",
          lang: "Bash - lab workflow",
          text: `docker compose up -d
docker compose logs -f postgres
psql "postgres://app:app_password@localhost:5432/bank"
mysql -h 127.0.0.1 -P 3306 -u app -papp_password bank

# Observe disk-backed state.
docker compose down
docker compose up -d

# Destroy state deliberately, then rebuild from migrations/backups.
docker compose down -v`,
        },
      ],
    },
  ],
};

export const databaseReliabilityTopic: AppLayerTopic = {
  id: "al-advanced",
  title: "Distributed Scale and Engineering Thinking",
  overview:
    "This section continues the database engineering path from one reliable engine to a platform that survives machine failure, bad deploys, traffic spikes, security events, and regional outages. It focuses on high availability, performance engineering, observability, automation, cloud operations, and fintech-grade consistency.",
  sections: [
    {
      heading: "High Availability: Why One Database Server Is Not Enough",
      content: [
        {
          type: "p",
          text: "A single database server can be powerful, but it is still one failure domain. Hardware dies, disks fill, kernels panic, upgrades require restarts, networks partition, and humans run the wrong command. High availability is the discipline of deciding which failures must not become user-visible outages and designing the database topology, automation, and procedures accordingly.",
        },
        {
          type: "diagram",
          caption: "Primary/replica architecture",
          text: `Application writes
      |
      v
   Primary  -- WAL/binlog stream --> Replica A
      |                              Replica B
      |
      +-- backup agent archives WAL/binlogs to object storage

Reads may go to replicas when stale data is acceptable.
Writes go to the primary unless using a specialized multi-primary system.`,
        },
        {
          type: "compare",
          cols: [
            {
              heading: "Availability Concepts",
              points: [
                "Failover promotes a replica when the primary is unhealthy.",
                "Switchover is planned promotion during maintenance when the old primary is healthy.",
                "RPO is how much data loss the business can tolerate.",
                "RTO is how long recovery may take before the business is harmed.",
                "Replication lag is the time or byte distance between primary commit and replica replay.",
              ],
            },
            {
              heading: "Failure Risks",
              points: [
                "Asynchronous replication can lose recently committed writes during failover.",
                "Synchronous replication reduces data loss but can reduce write availability.",
                "Split brain happens when two nodes accept writes as primary.",
                "Quorum and leader election prevent unsafe promotion during ambiguous network failures.",
                "Replication slots can retain too much WAL if consumers stop reading.",
              ],
            },
          ],
        },
        {
          type: "grid",
          cards: [
            {
              title: "Patroni",
              body: "PostgreSQL HA manager that uses a distributed configuration store such as etcd or Consul for leader election, health checks, and controlled failover.",
            },
            {
              title: "etcd / Consul",
              body: "Consensus-backed stores used to agree on cluster state. The database nodes should not guess who is leader; they consult a quorum-based authority.",
            },
            {
              title: "PgBouncer",
              body: "Connection pooler that protects PostgreSQL from too many client connections and can simplify application reconnection during failover.",
            },
            {
              title: "Galera",
              body: "Synchronous multi-primary clustering for MySQL/MariaDB-family systems. It improves availability for some workloads but introduces certification conflicts and operational constraints.",
            },
          ],
        },
      ],
    },
    {
      heading: "Backups, Restores, and Point-in-Time Recovery",
      content: [
        {
          type: "p",
          text: "A backup that has not been restored is an untested hope. Database reliability work treats restore drills as production features: scheduled, measured, logged, and reviewed. The core pattern is base backup plus continuous WAL or binary-log archiving, which allows recovery to a chosen time before a bad migration, accidental delete, or corruption event.",
        },
        {
          type: "code",
          lang: "Bash - pgBackRest shape",
          text: `# Full backup
pgbackrest --stanza=main backup --type=full

# Differential backup
pgbackrest --stanza=main backup --type=diff

# Restore to a timestamp before an accidental delete
systemctl stop postgresql
pgbackrest --stanza=main restore \
  --type=time \
  --target="2026-06-16 10:25:00+03"
systemctl start postgresql`,
        },
        {
          type: "ul",
          items: [
            "Secure backup storage: encrypted object storage, restricted IAM, separate account or project, retention lock where required.",
            "Restore validation: boot a restored instance, run consistency checks, compare row counts and checksums, verify application smoke tests.",
            "RPO validation: measure WAL archive delay, replication delay, and backup schedule gaps.",
            "RTO validation: time the full restore path, not just the backup command.",
            "Runbook requirement: the newest engineer on call should be able to execute the documented restore procedure under supervision.",
          ],
        },
      ],
    },
    {
      heading: "Database Security: Least Privilege, TLS, Auditing, and Secrets",
      content: [
        {
          type: "p",
          text: "Database security begins with a simple assumption: the database contains the most valuable data in the system. The goal is to reduce who can connect, what they can do after connecting, what they can read, how credentials rotate, how access is audited, and how compromise is contained.",
        },
        {
          type: "code",
          lang: "SQL - PostgreSQL least privilege and row-level security",
          text: `CREATE ROLE app_readonly LOGIN PASSWORD 'replace_me';
CREATE ROLE app_writer LOGIN PASSWORD 'replace_me';

REVOKE ALL ON DATABASE bank FROM PUBLIC;
GRANT CONNECT ON DATABASE bank TO app_readonly, app_writer;
GRANT USAGE ON SCHEMA public TO app_readonly, app_writer;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
GRANT SELECT, INSERT, UPDATE ON payments TO app_writer;

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON payments
USING (tenant_id = current_setting('app.tenant_id')::bigint);

-- Application sets this after authenticating the tenant.
SET app.tenant_id = '42';`,
        },
        {
          type: "grid",
          cards: [
            {
              title: "Authentication",
              body: "Prefer certificate, IAM, Vault-issued, or rotated credentials over long-lived shared passwords. Disable default accounts and network paths that are not needed.",
            },
            {
              title: "Authorization",
              body: "Separate migration, read-only, write, analytics, and admin roles. The app should not connect as owner or superuser.",
            },
            {
              title: "Encryption",
              body: "Use TLS in transit and platform or disk encryption at rest. Treat backups with the same encryption and access rules as production data.",
            },
            {
              title: "Auditing",
              body: "Log authentication events, schema changes, privilege changes, suspicious queries, and access to sensitive tables. Send logs to a system users cannot edit.",
            },
          ],
        },
        {
          type: "callout",
          label: "SQL Injection From the Database Perspective",
          text: "SQL injection is not only an application bug. It is also a privilege design test. If the web role can drop tables, read every tenant, or access secrets, one injection becomes total compromise. Parameterized queries prevent injection; least privilege limits blast radius if a query boundary fails.",
        },
      ],
    },
    {
      heading: "Performance Engineering: Diagnose Before Tuning",
      content: [
        {
          type: "p",
          text: "A slow database symptom is not a diagnosis. The root cause may be query shape, missing indexes, stale statistics, lock contention, connection pool exhaustion, CPU saturation, memory pressure, disk I/O latency, autovacuum falling behind, replication lag, or an application N+1 pattern. The engineer's job is to narrow the search with evidence.",
        },
        {
          type: "diagram",
          caption: "Slow database troubleshooting tree",
          text: `Database is slow
  |
  +-- Are connections exhausted? -> inspect pool, max_connections, PgBouncer
  +-- Are queries waiting? -> pg_stat_activity wait_event, pg_locks
  +-- Is one query dominant? -> pg_stat_statements / slow query log
  +-- Is the plan bad? -> EXPLAIN ANALYZE, stats, index selectivity
  +-- Is CPU high? -> joins, sorts, parallelism, function calls
  +-- Is memory spilling? -> temp files, work_mem, hash/sort spills
  +-- Is disk saturated? -> read latency, checkpoints, vacuum, WAL volume
  +-- Is replica stale? -> replication lag, apply delay, long queries on standby`,
        },
        {
          type: "compare",
          cols: [
            {
              heading: "Query Plan Skills",
              points: [
                "Recognize sequential scan, index scan, bitmap scan, nested loop, hash join, merge join, sort, aggregate, and materialize nodes.",
                "Compare estimated rows to actual rows. Large differences often mean bad statistics or correlated predicates.",
                "Use composite indexes that match equality filters first, then range/order columns.",
                "Avoid N+1 query patterns by batching, joining, or preloading intentionally.",
              ],
            },
            {
              heading: "Tuning Skills",
              points: [
                "Tune connection pools to actual concurrency, not maximum possible connections.",
                "Use cache hit ratio as a clue, not a final verdict.",
                "Adjust work memory carefully because it is per operation, not one global pool.",
                "Tune vacuum/autovacuum per hot table when dead tuples grow faster than cleanup.",
                "Separate read scaling from write scaling; replicas help reads, not primary write contention.",
              ],
            },
          ],
        },
        {
          type: "code",
          lang: "SQL - Lock and blocking investigation",
          text: `SELECT
  blocked.pid AS blocked_pid,
  blocked.query AS blocked_query,
  blocker.pid AS blocker_pid,
  blocker.query AS blocker_query,
  now() - blocker.query_start AS blocker_age
FROM pg_stat_activity blocked
JOIN pg_locks blocked_locks ON blocked_locks.pid = blocked.pid
JOIN pg_locks blocker_locks
  ON blocker_locks.locktype = blocked_locks.locktype
 AND blocker_locks.database IS NOT DISTINCT FROM blocked_locks.database
 AND blocker_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
 AND blocker_locks.page IS NOT DISTINCT FROM blocked_locks.page
 AND blocker_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
 AND blocker_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
JOIN pg_stat_activity blocker ON blocker.pid = blocker_locks.pid
WHERE NOT blocked_locks.granted
  AND blocker_locks.granted;`,
        },
      ],
    },
    {
      heading: "Observability and Incident Response",
      content: [
        {
          type: "p",
          text: "Production database engineering is evidence-driven. Metrics tell you shape and direction. Logs tell you discrete events. Traces connect application requests to database calls. Alerts decide when a human must wake up. Runbooks decide what that human does first.",
        },
        {
          type: "grid",
          cards: [
            {
              title: "Metrics",
              body: "Connections, QPS, transaction rate, p95/p99 query latency, lock waits, deadlocks, cache hit ratio, temp files, WAL generation, checkpoint duration, replication lag, disk usage, IOPS, CPU, memory, backup age.",
            },
            {
              title: "Logs",
              body: "Slow queries, lock waits, autovacuum activity, checkpoints, authentication failures, role changes, DDL, replication disconnects, backup and restore events.",
            },
            {
              title: "Dashboards",
              body: "Grafana panels backed by Prometheus exporters for PostgreSQL/MySQL, host metrics, container metrics, disk, network, and cloud database metrics.",
            },
            {
              title: "Runbooks",
              body: "Step-by-step procedures for slow database, replica lagging, primary down, disk filling, backup failed, connection storm, deadlock spike, and suspected credential exposure.",
            },
          ],
        },
        {
          type: "diagram",
          caption: "Replica lag troubleshooting tree",
          text: `Replica is lagging
  |
  +-- Is WAL/binlog arriving? -> network, slot, sender status
  +-- Is apply slow? -> long query on standby, disk I/O, CPU, locks
  +-- Is primary generating too much log? -> bulk load, index build, migration
  +-- Is disk near full? -> retained WAL/binlogs, archive failure
  +-- Is lag acceptable for this read path? -> route critical reads to primary
  +-- Was failover considered? -> compare RPO/RTO and data-loss risk`,
        },
        {
          type: "callout",
          label: "Postmortem Standard",
          text: "A good postmortem names the user impact, timeline, detection gap, root causes, contributing factors, what worked, what failed, and owners for prevention work. It does not stop at 'human error'. Human error is a signal that the system allowed an unsafe action to be too easy.",
        },
      ],
    },
    {
      heading: "Automation, Linux Operations, and Kubernetes Reality",
      content: [
        {
          type: "p",
          text: "Database engineers live close to the operating system. They inspect processes, file descriptors, disks, memory, network sockets, systemd units, cron jobs, logs, kernel limits, and container storage. Automation should make safe operations repeatable, not hide the underlying machinery.",
        },
        {
          type: "code",
          lang: "Bash - operational checks",
          text: `df -h
du -sh /var/lib/postgresql/* | sort -h
free -m
vmstat 1
iostat -xz 1
ss -tanp | grep 5432
journalctl -u postgresql --since "1 hour ago"
systemctl status postgresql
crontab -l`,
        },
        {
          type: "code",
          lang: "Python - simple PostgreSQL health check",
          text: `import os
import psycopg

dsn = os.environ["DATABASE_URL"]

with psycopg.connect(dsn, connect_timeout=3) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT now(), pg_is_in_recovery()")
        now, is_replica = cur.fetchone()
        print({"time": now.isoformat(), "replica": is_replica})`,
        },
        {
          type: "compare",
          cols: [
            {
              heading: "Kubernetes Primitives",
              points: [
                "StatefulSets give stable identity and ordered startup.",
                "PersistentVolumes hold database files beyond pod lifetime.",
                "ConfigMaps carry non-secret configuration.",
                "Secrets carry credentials but still require encryption and rotation discipline.",
                "Helm packages repeatable installation, values, and upgrades.",
              ],
            },
            {
              heading: "Why Databases on Kubernetes Are Difficult",
              points: [
                "Storage latency and failure semantics matter more than scheduling convenience.",
                "Failover must coordinate with database correctness, not only pod health.",
                "Backups, restores, upgrades, and split-brain prevention require operator-level logic.",
                "Operators can help, but the team still owns data loss, restore drills, and incident response.",
              ],
            },
          ],
        },
      ],
    },
    {
      heading: "Cloud and Platform Engineering",
      content: [
        {
          type: "p",
          text: "Managed databases reduce operational workload but do not eliminate database engineering. RDS, Aurora, Azure Database, and Google Cloud SQL still require schema design, query tuning, backup validation, networking controls, IAM, encryption, monitoring, migration planning, and cost management.",
        },
        {
          type: "grid",
          cards: [
            {
              title: "Managed vs Self-Hosted",
              body: "Managed wins on patching, backups, failover automation, and integration. Self-hosted wins when you need deep control, uncommon extensions, custom storage, or nonstandard HA behavior.",
            },
            {
              title: "Cloud HA",
              body: "Multi-AZ deployment, read replicas, automated backups, point-in-time recovery, maintenance windows, parameter groups, and tested promotion procedures.",
            },
            {
              title: "Cloud Security",
              body: "Private networking, security groups/firewalls, IAM database authentication where available, KMS encryption, audit logs, and secret rotation.",
            },
            {
              title: "Migration Strategy",
              body: "Assess compatibility, build replication path, dual-write only when necessary, validate checksums, rehearse rollback, define cutover window, and monitor saturation during backfill.",
            },
          ],
        },
      ],
    },
    {
      heading: "Fintech and Mission-Critical Transactional Systems",
      content: [
        {
          type: "p",
          text: "Financial systems make database correctness visible. You cannot hide lost updates, duplicate payments, inconsistent balances, missing audit trails, or untraceable manual changes. The database design must support reconciliation, idempotency, immutable history, and controlled recovery.",
        },
        {
          type: "code",
          lang: "SQL - double-entry ledger skeleton",
          text: `CREATE TABLE ledger_transactions (
  id bigserial PRIMARY KEY,
  idempotency_key text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  description text NOT NULL
);

CREATE TABLE ledger_entries (
  id bigserial PRIMARY KEY,
  transaction_id bigint NOT NULL REFERENCES ledger_transactions(id),
  account_id bigint NOT NULL,
  amount_cents bigint NOT NULL CHECK (amount_cents <> 0)
);

-- Invariant: entries for each transaction must sum to zero.
-- Enforce with transaction-level application logic plus database constraints/triggers
-- where appropriate. Never update ledger entries in place; append corrections.`,
        },
        {
          type: "grid",
          cards: [
            {
              title: "Idempotency",
              body: "Every payment command carries a unique key. If the client retries after timeout, the server returns the original result instead of charging twice.",
            },
            {
              title: "Outbox Pattern",
              body: "Write business row and outgoing event in the same database transaction. A relay publishes the event to Kafka or RabbitMQ after commit.",
            },
            {
              title: "At-Least-Once Reality",
              body: "Queues usually deliver at least once. Consumers must be idempotent because duplicates are normal failure recovery, not rare bugs.",
            },
            {
              title: "Reconciliation",
              body: "Compare internal ledger, payment processor reports, bank files, and customer-visible balances. Differences become tracked exceptions, not silent manual edits.",
            },
          ],
        },
        {
          type: "compare",
          cols: [
            {
              heading: "Patterns",
              points: [
                "Saga pattern coordinates multi-service workflows with compensating actions instead of one distributed transaction.",
                "Event-driven architecture moves facts through Kafka, RabbitMQ, or similar brokers.",
                "Redis can support locks, rate limits, queues, and caches, but authoritative money state belongs in the transactional database.",
                "Audit trails are product features in regulated systems, not optional logs.",
              ],
            },
            {
              heading: "Interview Exercises",
              points: [
                "Design a wallet transfer that cannot create or destroy money.",
                "Explain how you recover from accidentally deleting customer rows at 10:24.",
                "Diagnose a query that changed from 20 ms to 12 seconds after table growth.",
                "Design failover for PostgreSQL with a 30-second RTO and near-zero RPO.",
                "Explain why exactly-once processing is usually implemented as idempotent at-least-once processing.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
