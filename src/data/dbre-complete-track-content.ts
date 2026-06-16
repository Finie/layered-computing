import type { AppLayerTopic } from "@/types/tutorial";

export const dbreCompleteTrackTopics: AppLayerTopic[] = [
  {
    id: "dbre-sql-relational-foundations",
    title: "DBRE Foundations: SQL, Relational Design, and Normalization",
    overview:
      "A database reliability engineer cannot tune, secure, or recover a database they do not understand logically. This page fills the missing prerequisite layer: relations, keys, constraints, normalization, SQL execution shape, and the difference between a correct schema and a convenient schema.",
    sections: [
      {
        heading: "The Relational Model: The Contract Before the Engine",
        content: [
          {
            type: "p",
            text: "A relational database stores facts as relations: sets of rows with named attributes. The schema is not decoration. It is the contract that says which facts may exist, which facts must be unique, which facts depend on other facts, and which states are impossible.",
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Logical Design",
                points: [
                  "Entity: a thing with identity, such as customer, account, invoice, payment, or ledger transaction.",
                  "Primary key: stable identity for one row.",
                  "Foreign key: an explicit dependency between facts.",
                  "Unique constraint: prevents duplicate business facts.",
                  "Check constraint: prevents impossible values before application code sees them.",
                ],
              },
              {
                heading: "Operational Consequence",
                points: [
                  "Bad keys make indexes and replication heavier.",
                  "Missing constraints allow silent corruption.",
                  "Over-normalized schemas can make reads expensive.",
                  "Under-normalized schemas duplicate facts and make writes inconsistent.",
                  "Schema mistakes are expensive because data outlives code.",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "SQL - normalized transactional schema",
            text: `CREATE TABLE customers (
  id bigserial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE accounts (
  id bigserial PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers(id),
  currency char(3) NOT NULL CHECK (currency ~ '^[A-Z]{3}$'),
  status text NOT NULL CHECK (status IN ('open', 'frozen', 'closed')),
  UNIQUE (customer_id, currency)
);

CREATE TABLE payments (
  id bigserial PRIMARY KEY,
  account_id bigint NOT NULL REFERENCES accounts(id),
  idempotency_key text NOT NULL UNIQUE,
  amount_cents bigint NOT NULL CHECK (amount_cents > 0),
  status text NOT NULL CHECK (status IN ('pending', 'posted', 'failed')),
  created_at timestamptz NOT NULL DEFAULT now()
);`,
          },
        ],
      },
      {
        heading: "Normalization: Remove Update Anomalies",
        content: [
          {
            type: "p",
            text: "Normalization is not academic tidiness. It prevents one fact from being stored in multiple places where it can drift. A database engineer should recognize insert anomalies, update anomalies, and delete anomalies because they become production data-quality incidents.",
          },
          {
            type: "grid",
            cards: [
              {
                title: "1NF",
                body: "Rows have atomic values, not repeated groups hidden in strings or arrays when the values need relational behavior.",
              },
              {
                title: "2NF",
                body: "Non-key columns depend on the whole key, not only part of a composite key.",
              },
              {
                title: "3NF",
                body: "Non-key columns depend on the key, not on other non-key columns.",
              },
              {
                title: "Denormalization",
                body: "A deliberate read optimization, not a default. It requires a synchronization strategy, tests, and repair tooling.",
              },
            ],
          },
          {
            type: "callout",
            label: "DBRE Rule",
            text: "A schema is production code. Review it for correctness, migration safety, index impact, lock impact, backup impact, and rollback strategy.",
          },
        ],
      },
      {
        heading: "Lab and Interview Prompts",
        content: [
          {
            type: "ul",
            items: [
              "Lab: design customers, accounts, transfers, and ledger tables with keys, constraints, and indexes.",
              "Lab: intentionally remove a unique constraint and show the duplicate-data incident it permits.",
              "Lab: denormalize account balance into an accounts table, then write a reconciliation query that detects drift from ledger entries.",
              "Interview: explain 3NF using a production incident, not a textbook definition.",
              "Interview: choose a primary key for a high-write payments table and defend the operational tradeoffs.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-postgres-storage-mvcc-vacuum",
    title: "PostgreSQL Internals: Storage, MVCC, VACUUM, and Bloat",
    overview:
      "This page expands PostgreSQL from a process diagram into the storage mechanics a DBRE needs: heap pages, tuple versions, snapshots, HOT updates, visibility maps, free space maps, autovacuum, bloat, and why long transactions can quietly damage a system.",
    sections: [
      {
        heading: "Heap Pages and Tuple Visibility",
        content: [
          {
            type: "diagram",
            caption: "PostgreSQL heap page and MVCC tuple lifecycle",
            text: `table file
  |
  +-- 8 KB page
        |
        +-- page header
        +-- line pointers
        +-- tuple version A: xmin=101 xmax=120
        +-- tuple version B: xmin=120 xmax=null
        +-- free space

UPDATE does not simply overwrite a row.
It creates a newer tuple version and marks the old version obsolete
for transactions whose snapshot can see the change.`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "xmin / xmax",
                body: "Transaction IDs stored on tuple versions. They tell a snapshot whether a tuple is visible, deleted, or too new.",
              },
              {
                title: "Visibility Map",
                body: "Tracks pages whose tuples are all visible. It enables index-only scans and helps vacuum skip work.",
              },
              {
                title: "Free Space Map",
                body: "Tracks pages with available space so inserts can reuse room instead of extending the table.",
              },
              {
                title: "HOT Update",
                body: "Heap-only tuple update can avoid touching indexes when indexed columns do not change and the page has space.",
              },
            ],
          },
        ],
      },
      {
        heading: "VACUUM and Autovacuum",
        content: [
          {
            type: "p",
            text: "VACUUM removes row versions that no active transaction can still see. It does not usually shrink the table file; it marks space reusable. Autovacuum is the background safety system that prevents bloat and transaction ID wraparound, but default thresholds are not always right for hot tables.",
          },
          {
            type: "code",
            lang: "SQL - bloat and autovacuum investigation",
            text: `SELECT
  relname,
  n_live_tup,
  n_dead_tup,
  last_autovacuum,
  autovacuum_count,
  vacuum_count
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 20;

SELECT
  pid,
  state,
  now() - xact_start AS transaction_age,
  query
FROM pg_stat_activity
WHERE xact_start IS NOT NULL
ORDER BY transaction_age DESC;

ALTER TABLE payments SET (
  autovacuum_vacuum_scale_factor = 0.02,
  autovacuum_analyze_scale_factor = 0.01,
  autovacuum_vacuum_cost_limit = 2000
);`,
          },
          {
            type: "callout",
            label: "Production Failure Pattern",
            text: "An idle-in-transaction session can keep old tuple versions visible. VACUUM cannot remove them. Dead tuples accumulate, indexes bloat, cache hit ratio falls, query latency rises, and disk fills even though traffic did not change.",
          },
        ],
      },
      {
        heading: "Labs and Interview Prompts",
        content: [
          {
            type: "ul",
            items: [
              "Lab: create a table, update the same rows repeatedly, measure `n_dead_tup`, run VACUUM, and compare table size.",
              "Lab: hold a long transaction open, generate dead tuples in another session, and explain why cleanup is blocked.",
              "Lab: create an index-only scan, then observe how visibility map state changes after updates and vacuum.",
              "Interview: explain why PostgreSQL needs VACUUM but MySQL InnoDB uses undo purge.",
              "Interview: explain HOT updates and when they stop applying.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-postgres-wal-replication-backup",
    title: "PostgreSQL WAL, Replication, Backups, and PITR",
    overview:
      "This page turns WAL and backup vocabulary into an operational path: archive WAL, take base backups, restore to a timestamp, understand timelines, configure replication slots carefully, and know what can go wrong.",
    sections: [
      {
        heading: "WAL, Checkpoints, and Recovery",
        content: [
          {
            type: "diagram",
            caption: "WAL, checkpoint, and PITR timeline",
            text: `time ->

base backup starts ----- base backup ends
        |                         |
        +-- WAL segment 0001 -----+-- WAL 0002 -- WAL 0003 -- WAL 0004
                                                       ^
                                                       restore target

Restore = unpack base backup, then replay WAL until the target time/LSN.
A new timeline is created after recovery or promotion.`,
          },
          {
            type: "code",
            lang: "postgresql.conf - WAL archiving shape",
            text: `wal_level = replica
archive_mode = on
archive_command = 'test ! -f /backups/wal/%f && cp %p /backups/wal/%f'
max_wal_senders = 10
max_replication_slots = 10
hot_standby = on
checkpoint_timeout = '15min'
max_wal_size = '8GB'`,
          },
          {
            type: "callout",
            label: "Checkpoint Tradeoff",
            text: "Frequent checkpoints reduce crash recovery time but increase write pressure. Infrequent checkpoints reduce checkpoint churn but increase recovery work. A DBRE watches checkpoint duration, buffers written, WAL generation, and disk latency together.",
          },
        ],
      },
      {
        heading: "Physical and Logical Replication",
        content: [
          {
            type: "compare",
            cols: [
              {
                heading: "Physical Streaming",
                points: [
                  "Byte-level WAL stream from primary to standby.",
                  "Best for HA and read replicas.",
                  "Standby is a physical copy of the cluster.",
                  "Promotion creates a new writable primary and timeline.",
                ],
              },
              {
                heading: "Logical Replication",
                points: [
                  "Row-level changes by publication and subscription.",
                  "Best for selected tables, migrations, and version-crossing flows.",
                  "Requires replica identity for updates/deletes.",
                  "More flexible but not a complete HA replacement.",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "SQL - logical replication skeleton",
            text: `-- publisher
CREATE PUBLICATION app_pub FOR TABLE customers, accounts, payments;

-- subscriber
CREATE SUBSCRIPTION app_sub
CONNECTION 'host=primary dbname=bank user=repl password=secret'
PUBLICATION app_pub;

SELECT subname, subenabled FROM pg_subscription;
SELECT * FROM pg_stat_subscription;`,
          },
        ],
      },
      {
        heading: "Backups and Restore Drills",
        content: [
          {
            type: "code",
            lang: "Bash - restore drill checklist",
            text: `# 1. Restore to isolated host, never over the only copy.
systemctl stop postgresql
rm -rf /var/lib/postgresql/16/main/*
pgbackrest --stanza=main restore --delta
systemctl start postgresql

# 2. Validate.
psql -c "SELECT pg_is_in_recovery();"
psql -c "SELECT count(*) FROM payments;"
psql -c "SELECT sum(amount_cents) FROM ledger_entries GROUP BY transaction_id HAVING sum(amount_cents) <> 0;"

# 3. Record RTO and RPO evidence.
date
pgbackrest info`,
          },
          {
            type: "ul",
            items: [
              "Lab: take a base backup, insert rows, delete rows accidentally, restore to a timestamp before the delete.",
              "Lab: create a physical replica, measure WAL replay lag, and intentionally pause replay.",
              "Lab: create a logical subscription and test schema-change behavior.",
              "Interview: explain why a backup without a restore test is not a backup strategy.",
              "Interview: explain how replication slots can fill disk.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-ha-patroni-pgbouncer",
    title: "High Availability Lab: Patroni, etcd, PgBouncer, and Failover",
    overview:
      "This page fills the HA gap with concrete cluster behavior. It explains what Patroni automates, what etcd/Consul decide, what PgBouncer protects, and what operators must verify during failover.",
    sections: [
      {
        heading: "Topology and Control Plane",
        content: [
          {
            type: "diagram",
            caption: "PostgreSQL HA topology",
            text: `clients
  |
  v
PgBouncer / HAProxy / service endpoint
  |
  +--> current primary
  |       |
  |       +-- streams WAL --> replica 1
  |       +-- streams WAL --> replica 2
  |
Patroni on every database node
  |
  v
etcd/Consul quorum stores leader lock and cluster state`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Patroni",
                body: "Monitors PostgreSQL, manages leader lock, edits replication config, promotes replicas, and exposes health endpoints for routing.",
              },
              {
                title: "etcd / Consul",
                body: "Provides quorum-backed agreement. If the cluster cannot safely agree who is leader, writes must stop rather than risk split brain.",
              },
              {
                title: "PgBouncer",
                body: "Limits connection pressure and smooths application reconnect behavior. Pool mode changes transaction semantics.",
              },
              {
                title: "Fencing",
                body: "Prevents an old primary from accepting writes after a new primary is promoted. Without fencing, split brain can corrupt data.",
              },
            ],
          },
        ],
      },
      {
        heading: "PgBouncer Pool Modes",
        content: [
          {
            type: "compare",
            cols: [
              {
                heading: "Session Pooling",
                points: [
                  "Client owns a server connection for the whole session.",
                  "Safest compatibility with session state.",
                  "Less efficient under many mostly-idle clients.",
                ],
              },
              {
                heading: "Transaction Pooling",
                points: [
                  "Server connection is returned after each transaction.",
                  "High efficiency for web workloads.",
                  "Breaks assumptions around session variables, temp tables, prepared statements, and advisory locks unless handled carefully.",
                ],
              },
            ],
          },
          {
            type: "code",
            lang: "ini - PgBouncer configuration shape",
            text: `[databases]
bank = host=postgres-primary port=5432 dbname=bank

[pgbouncer]
listen_addr = 0.0.0.0
listen_port = 6432
auth_type = scram-sha-256
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 2000
default_pool_size = 50
reserve_pool_size = 10
server_reset_query = DISCARD ALL`,
          },
        ],
      },
      {
        heading: "Failover Drill",
        content: [
          {
            type: "ul",
            items: [
              "Lab: deploy 3 PostgreSQL containers, 3 Patroni agents, and 3 etcd nodes.",
              "Lab: kill the primary process and observe promotion time, client error rate, and data loss.",
              "Lab: isolate the old primary network and verify it cannot keep accepting writes.",
              "Lab: run `pg_rewind` or rebuild the old primary as a replica after failover.",
              "Lab: compare synchronous and asynchronous replication for RPO and write latency.",
              "Interview: explain split brain and how quorum plus fencing reduces risk.",
              "Interview: explain why a load balancer health check must distinguish primary from replica.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-mysql-mariadb-operations",
    title: "MySQL and MariaDB Operations: InnoDB, Replication, Backups, and Galera",
    overview:
      "This page expands MySQL/MariaDB from a short comparison into operational knowledge: InnoDB internals, locks, binlogs, GTID replication, backup tools, Galera behavior, and the places where PostgreSQL assumptions fail.",
    sections: [
      {
        heading: "InnoDB Architecture",
        content: [
          {
            type: "diagram",
            caption: "InnoDB write and recovery structures",
            text: `client transaction
  |
  v
InnoDB buffer pool
  |
  +-- clustered index pages
  +-- secondary index pages
  +-- dirty pages
  |
  +-- redo log: crash recovery
  +-- undo log: rollback and MVCC reads
  +-- doublewrite buffer: torn-page protection
  +-- change buffer: deferred secondary-index maintenance`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Clustered Primary Key",
                body: "Table data is stored in primary-key order. A bad primary key makes every secondary index and range query worse.",
              },
              {
                title: "Undo and Purge",
                body: "Undo records support rollback and consistent reads. Purge removes old versions once no transaction needs them.",
              },
              {
                title: "Next-Key Locks",
                body: "InnoDB can lock index records and gaps to prevent phantoms under REPEATABLE READ.",
              },
              {
                title: "Doublewrite Buffer",
                body: "Protects against partial page writes by writing pages through a safe area before final location.",
              },
            ],
          },
        ],
      },
      {
        heading: "Replication and Backups",
        content: [
          {
            type: "code",
            lang: "SQL - MySQL GTID and replication diagnostics",
            text: `SHOW VARIABLES LIKE 'gtid_mode';
SHOW VARIABLES LIKE 'log_bin';
SHOW REPLICA STATUS\\G

SELECT
  CHANNEL_NAME,
  SERVICE_STATE,
  LAST_ERROR_NUMBER,
  LAST_ERROR_MESSAGE
FROM performance_schema.replication_connection_status;

EXPLAIN FORMAT=JSON
SELECT *
FROM payments
WHERE tenant_id = 42
ORDER BY created_at DESC
LIMIT 50;`,
          },
          {
            type: "compare",
            cols: [
              {
                heading: "Backup Options",
                points: [
                  "mysqldump: logical, portable, slow for large databases.",
                  "mysqlpump: parallel logical dump option.",
                  "xtrabackup/mariabackup: hot physical backups for large InnoDB datasets.",
                  "Binlogs: required for point-in-time restore after a base backup.",
                ],
              },
              {
                heading: "Replication Options",
                points: [
                  "Asynchronous: simplest, possible data loss on failover.",
                  "Semi-synchronous: waits for at least one replica acknowledgement.",
                  "GTID: simplifies failover and replica positioning.",
                  "Galera: synchronous multi-primary with certification conflicts and quorum requirements.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Labs and Interview Prompts",
        content: [
          {
            type: "ul",
            items: [
              "Lab: create an InnoDB table with a random UUID primary key and compare page/index behavior with an ordered key.",
              "Lab: reproduce a gap-lock wait under REPEATABLE READ.",
              "Lab: set up MySQL primary/replica with GTID and break replication with a conflicting write.",
              "Lab: take a physical backup with xtrabackup or mariabackup and restore with binlog replay.",
              "Lab: simulate Galera node loss and explain quorum behavior.",
              "Interview: explain redo log vs binlog vs undo log.",
              "Interview: explain why MySQL's default REPEATABLE READ surprises PostgreSQL engineers.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-security-vault-audit",
    title: "Database Security: TLS, Roles, RLS, Vault, Auditing, and Rotation",
    overview:
      "This page expands database security from principles into deployable controls: network boundaries, TLS, authentication policy, least privilege, RLS, audit trails, Vault-issued credentials, credential rotation, and secure backups.",
    sections: [
      {
        heading: "Connection Security and Authentication",
        content: [
          {
            type: "code",
            lang: "pg_hba.conf - strict connection policy",
            text: `# type  database  user        address          auth-method
local   all       postgres                    peer
hostssl bank      app_writer  10.20.0.0/16     scram-sha-256
hostssl bank      app_readonly 10.20.0.0/16     scram-sha-256
hostssl replication repl      10.20.1.0/24     scram-sha-256
host    all       all         0.0.0.0/0        reject`,
          },
          {
            type: "code",
            lang: "postgresql.conf - TLS shape",
            text: `ssl = on
ssl_cert_file = '/etc/postgresql/server.crt'
ssl_key_file = '/etc/postgresql/server.key'
password_encryption = 'scram-sha-256'
log_connections = on
log_disconnections = on`,
          },
        ],
      },
      {
        heading: "Secrets and Rotation",
        content: [
          {
            type: "diagram",
            caption: "Vault-issued dynamic database credentials",
            text: `application
  |
  +-- authenticates to Vault using workload identity
        |
        v
      Vault database secrets engine
        |
        +-- creates short-lived PostgreSQL role
        +-- returns username/password with TTL
        +-- revokes role automatically at expiry`,
          },
          {
            type: "code",
            lang: "Bash - Vault database secrets shape",
            text: `vault secrets enable database

vault write database/config/postgres \
  plugin_name=postgresql-database-plugin \
  allowed_roles=app-writer \
  connection_url='postgresql://{{username}}:{{password}}@postgres:5432/bank?sslmode=require' \
  username='vault_admin' \
  password='admin_password'

vault write database/roles/app-writer \
  db_name=postgres \
  creation_statements="CREATE ROLE {{name}} WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT app_writer TO {{name}};" \
  default_ttl="1h" \
  max_ttl="24h"`,
          },
        ],
      },
      {
        heading: "Auditing and Secure Backups",
        content: [
          {
            type: "ul",
            items: [
              "Enable database audit logging for authentication failures, DDL, privilege changes, and sensitive table access.",
              "Ship logs to immutable storage outside database administrator write access.",
              "Encrypt backups with keys managed separately from the database host.",
              "Restrict restore permissions because restore access is data access.",
              "Run quarterly credential-rotation and backup-restore drills.",
              "Interview: explain why least privilege limits SQL injection blast radius.",
              "Interview: explain how you rotate app credentials without downtime.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-performance-workshop",
    title: "Performance Workshop: Query Plans, Indexes, Locks, and Load",
    overview:
      "This page turns performance advice into repeatable diagnosis. Learners practice reading plans, finding bad estimates, fixing indexes, identifying lock waits, sizing pools, and proving improvements with measurements.",
    sections: [
      {
        heading: "Read the Plan Like Evidence",
        content: [
          {
            type: "code",
            lang: "SQL - query plan workflow",
            text: `EXPLAIN (ANALYZE, BUFFERS, WAL, VERBOSE)
SELECT p.id, p.status, c.email
FROM payments p
JOIN customers c ON c.id = p.customer_id
WHERE p.tenant_id = 42
  AND p.created_at >= now() - interval '7 days'
ORDER BY p.created_at DESC
LIMIT 100;

-- Checklist:
-- 1. Which node consumes most actual time?
-- 2. Are estimated rows close to actual rows?
-- 3. Did it read from shared buffers or disk?
-- 4. Did sort/hash spill to disk?
-- 5. Did the chosen index match equality + range + order?`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Bad Estimate",
                body: "If estimated rows differ massively from actual rows, update statistics or add extended statistics for correlated columns.",
              },
              {
                title: "Sort Spill",
                body: "If temp files appear, tune query shape or work_mem carefully. Remember work_mem is per operation.",
              },
              {
                title: "N+1 Pattern",
                body: "If one HTTP request emits hundreds of similar queries, fix application access pattern before adding indexes.",
              },
              {
                title: "Connection Storm",
                body: "If clients exceed database concurrency, add PgBouncer and size pools to CPU, IO, and query latency reality.",
              },
            ],
          },
        ],
      },
      {
        heading: "Load and Lock Labs",
        content: [
          {
            type: "code",
            lang: "Bash - load and observation commands",
            text: `pgbench -i -s 20 "postgres://app:app_password@localhost:5432/bank"
pgbench -c 50 -j 8 -T 120 "postgres://app:app_password@localhost:5432/bank"

psql -c "SELECT * FROM pg_stat_database WHERE datname = 'bank';"
psql -c "SELECT * FROM pg_stat_bgwriter;"
psql -c "SELECT wait_event_type, wait_event, count(*) FROM pg_stat_activity GROUP BY 1,2 ORDER BY 3 DESC;"`,
          },
          {
            type: "ul",
            items: [
              "Lab: run a slow query without an index, capture plan, add correct composite index, capture new plan.",
              "Lab: force sort spill with low work_mem and observe temp file metrics.",
              "Lab: create lock contention with concurrent updates and identify blockers.",
              "Lab: overload connections, add PgBouncer, and compare error rate.",
              "Interview: explain nested loop, hash join, and merge join using table sizes and indexes.",
              "Interview: explain why adding an index can hurt writes.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-observability-incident-response",
    title: "Observability and Incident Response: Metrics, Logs, Alerts, Runbooks",
    overview:
      "This page adds production observability detail: what to measure, how to alert, what dashboards need to show, how to define SLOs, and how to respond to slow database, replica lag, disk full, backup failure, and primary-down incidents.",
    sections: [
      {
        heading: "Metrics, SLOs, and Alerts",
        content: [
          {
            type: "code",
            lang: "YAML - Prometheus alert examples",
            text: `groups:
  - name: postgres-dbre
    rules:
      - alert: PostgreSQLReplicaLagHigh
        expr: pg_replication_lag_seconds > 30
        for: 5m
        labels:
          severity: page
        annotations:
          summary: "Replica lag above 30 seconds"

      - alert: PostgreSQLDiskWillFillSoon
        expr: predict_linear(node_filesystem_avail_bytes{mountpoint="/var/lib/postgresql"}[6h], 4 * 3600) < 0
        for: 15m
        labels:
          severity: page

      - alert: PostgreSQLBackupTooOld
        expr: time() - postgres_last_successful_backup_timestamp > 90000
        for: 10m
        labels:
          severity: ticket`,
          },
          {
            type: "grid",
            cards: [
              {
                title: "Availability SLI",
                body: "Percent of database requests that complete successfully inside the expected latency budget.",
              },
              {
                title: "Latency SLI",
                body: "p50, p95, p99 query and transaction latency by service, route, and query fingerprint.",
              },
              {
                title: "Durability SLI",
                body: "Age of latest successful restore-tested backup and WAL archive delay.",
              },
              {
                title: "Freshness SLI",
                body: "Replica replay lag and logical subscription lag for read paths that tolerate staleness.",
              },
            ],
          },
        ],
      },
      {
        heading: "Runbooks and Postmortems",
        content: [
          {
            type: "diagram",
            caption: "Primary down runbook",
            text: `Primary down
  |
  +-- confirm: process, host, network, disk, Patroni state
  +-- freeze unsafe writes if leadership is ambiguous
  +-- check latest replica replay LSN and data-loss risk
  +-- promote safest replica through HA manager
  +-- redirect traffic and watch errors/latency
  +-- fence or rebuild old primary
  +-- record RTO, RPO, timeline, and follow-up fixes`,
          },
          {
            type: "ul",
            items: [
              "Lab: build a Grafana dashboard for connections, QPS, latency, locks, deadlocks, WAL, checkpoints, disk, and backup age.",
              "Lab: simulate replica lag and verify alert timing.",
              "Lab: fill disk with retained WAL and follow a safe response runbook.",
              "Lab: write a postmortem for a failed migration that locked a hot table.",
              "Interview: describe your first 10 minutes when the database is slow.",
              "Interview: explain which alerts should page and which should create tickets.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-automation-kubernetes-cloud",
    title: "Automation, Kubernetes, and Cloud Databases",
    overview:
      "This page turns operations into repeatable infrastructure: scripts, cron/systemd, Docker labs, Kubernetes StatefulSets and operators, Helm, RDS/Cloud SQL/Azure managed databases, private networking, IAM, KMS, and migration planning.",
    sections: [
      {
        heading: "Automation Assets the Repo Should Contain",
        content: [
          {
            type: "code",
            lang: "systemd - backup timer shape",
            text: `[Unit]
Description=PostgreSQL backup

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup-postgres.sh

# backup-postgres.timer
[Timer]
OnCalendar=*:0/30
Persistent=true

[Install]
WantedBy=timers.target`,
          },
          {
            type: "code",
            lang: "Bash - safe backup script skeleton",
            text: `#!/usr/bin/env bash
set -euo pipefail

log() { printf '%s %s\\n' "$(date --iso-8601=seconds)" "$*"; }

log "starting backup"
pgbackrest --stanza=main check
pgbackrest --stanza=main backup --type=diff
pgbackrest --stanza=main info
log "backup complete"`,
          },
        ],
      },
      {
        heading: "Kubernetes Reality",
        content: [
          {
            type: "code",
            lang: "YAML - StatefulSet storage shape",
            text: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 100Gi`,
          },
          {
            type: "callout",
            label: "Operator Rule",
            text: "A Kubernetes operator is not a substitute for database knowledge. It encodes operational workflows, but the team still owns backups, restores, failover correctness, storage behavior, and data loss risk.",
          },
        ],
      },
      {
        heading: "Managed Cloud Databases",
        content: [
          {
            type: "compare",
            cols: [
              {
                heading: "RDS / Cloud SQL / Azure Database",
                points: [
                  "Configure private networking, not public database exposure.",
                  "Enable automated backups and test PITR restores.",
                  "Use KMS/customer-managed encryption when required.",
                  "Use IAM auth where it fits the platform and client stack.",
                  "Understand failover behavior and maintenance windows.",
                ],
              },
              {
                heading: "Migration Plan",
                points: [
                  "Assess extensions, collation, versions, parameters, and object compatibility.",
                  "Replicate data using native replication, logical replication, or migration service.",
                  "Validate counts, checksums, critical queries, and application smoke tests.",
                  "Define rollback before cutover.",
                  "Monitor lag, locks, CPU, IO, and error budget during backfill.",
                ],
              },
            ],
          },
          {
            type: "ul",
            items: [
              "Lab: provision a managed PostgreSQL instance with private networking and restore a snapshot.",
              "Lab: migrate local PostgreSQL to managed PostgreSQL using logical replication.",
              "Lab: compare managed failover timing with self-managed Patroni failover.",
              "Interview: when would you self-host instead of using RDS or Cloud SQL?",
              "Interview: explain the security group, subnet, IAM, and KMS boundaries for a managed database.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-fintech-capstone",
    title: "Fintech Capstone: Ledger, Idempotency, Outbox, Reconciliation",
    overview:
      "This capstone makes the mission-critical section concrete. The learner builds a wallet ledger that preserves money, handles retries, publishes events safely, reconciles against external reports, and survives restore/failover drills.",
    sections: [
      {
        heading: "Capstone Architecture",
        content: [
          {
            type: "diagram",
            caption: "Transactional outbox and reconciliation architecture",
            text: `API request with idempotency key
  |
  v
PostgreSQL transaction
  |
  +-- insert ledger transaction
  +-- insert balanced ledger entries
  +-- insert outbox event
  |
  v
outbox relay publishes to Kafka/RabbitMQ
  |
  v
consumers update read models and notifications

nightly reconciliation compares:
internal ledger <-> payment processor report <-> bank settlement file`,
          },
          {
            type: "code",
            lang: "SQL - enforce balanced ledger with deferred trigger shape",
            text: `CREATE TABLE ledger_transactions (
  id bigserial PRIMARY KEY,
  idempotency_key text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE ledger_entries (
  id bigserial PRIMARY KEY,
  transaction_id bigint NOT NULL REFERENCES ledger_transactions(id),
  account_id bigint NOT NULL,
  amount_cents bigint NOT NULL CHECK (amount_cents <> 0)
);

CREATE TABLE outbox_events (
  id bigserial PRIMARY KEY,
  aggregate_type text NOT NULL,
  aggregate_id bigint NOT NULL,
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  published_at timestamptz
);

-- Capstone requirement:
-- add a deferred constraint trigger that rejects any transaction
-- whose ledger_entries sum is not exactly zero.`,
          },
        ],
      },
      {
        heading: "Required Failure Scenarios",
        content: [
          {
            type: "ul",
            items: [
              "Duplicate payment request after client timeout returns the original result, not a second charge.",
              "Outbox relay crashes after publishing but before marking event published; consumer remains idempotent.",
              "Payment processor sends duplicate webhook; database constraints prevent double posting.",
              "Replica is lagging; balance reads that require freshness route to primary.",
              "Accidental delete is recovered with PITR and reconciliation verifies no money was created or destroyed.",
              "Primary fails during posting; failover preserves committed ledger entries within stated RPO.",
            ],
          },
        ],
      },
      {
        heading: "Interview and Review Rubric",
        content: [
          {
            type: "ul",
            items: [
              "Can the learner explain why double-entry accounting catches imbalance?",
              "Can the learner explain idempotency keys and uniqueness under concurrency?",
              "Can the learner explain why outbox is safer than publishing after commit in application code?",
              "Can the learner restore to a point in time and prove ledger invariants still hold?",
              "Can the learner explain exactly-once as an end-to-end illusion usually built from at-least-once delivery plus idempotency?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "dbre-interview-readiness",
    title: "Database Engineer Interview Readiness",
    overview:
      "This page converts the curriculum into interview preparation. It groups the questions a learner must answer clearly before claiming readiness for PostgreSQL, MySQL, HA, security, performance, observability, cloud, Kubernetes, and fintech DBRE roles.",
    sections: [
      {
        heading: "Core Interview Question Bank",
        content: [
          {
            type: "compare",
            cols: [
              {
                heading: "PostgreSQL",
                points: [
                  "Explain MVCC, tuple versions, VACUUM, and bloat.",
                  "Explain WAL, checkpoints, crash recovery, and PITR.",
                  "Diagnose idle-in-transaction causing bloat.",
                  "Explain replication slots and how they fill disk.",
                  "Read a slow query plan and choose an index.",
                ],
              },
              {
                heading: "Reliability",
                points: [
                  "Design PostgreSQL HA with Patroni, etcd, PgBouncer, backups, and monitoring.",
                  "Explain failover vs switchover and RPO vs RTO.",
                  "Handle primary down, replica lag, disk full, and failed backups.",
                  "Explain split brain and fencing.",
                  "Explain how to verify a restore.",
                ],
              },
            ],
          },
          {
            type: "compare",
            cols: [
              {
                heading: "MySQL / MariaDB",
                points: [
                  "Explain InnoDB clustered indexes, redo, undo, binlog, and purge.",
                  "Explain GTID replication and binlog formats.",
                  "Diagnose replication breakage.",
                  "Explain Galera certification conflicts and quorum.",
                  "Compare PostgreSQL and MySQL isolation behavior.",
                ],
              },
              {
                heading: "Security / Cloud / Fintech",
                points: [
                  "Design least-privilege database roles.",
                  "Rotate credentials with Vault.",
                  "Secure backups and audit sensitive access.",
                  "Deploy a managed cloud database privately.",
                  "Design an idempotent double-entry ledger.",
                ],
              },
            ],
          },
        ],
      },
      {
        heading: "Production Readiness Checklist",
        content: [
          {
            type: "ul",
            items: [
              "Can run local PostgreSQL and MySQL labs from scratch.",
              "Can reproduce, diagnose, and fix slow queries.",
              "Can perform backup and restore without notes.",
              "Can explain every alert on the database dashboard.",
              "Can safely promote a replica and rebuild the old primary.",
              "Can explain security boundaries from app to database to backups.",
              "Can defend managed vs self-hosted tradeoffs.",
              "Can build the fintech capstone and survive duplicate/retry/failover scenarios.",
            ],
          },
        ],
      },
    ],
  },
];
