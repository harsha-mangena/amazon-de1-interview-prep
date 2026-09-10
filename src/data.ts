export type Task = {
  id: string;
  title: string;
  hint: string;
};

export type Lp = {
  id: string;
  tag: "Priority" | "Cover";
  title: string;
  story: string;
};

export type Week = {
  id: string;
  title: string;
  items: Task[];
};

export type ResourceCategory =
  | "Official Amazon"
  | "Interview guides"
  | "SQL practice"
  | "Python"
  | "Data modeling"
  | "AWS & pipelines"
  | "Leadership Principles";

export type Resource = {
  title: string;
  url: string;
  note: string;
  category: ResourceCategory;
};

export const PROCESS = [
  ["Recruiter screen", "30 min", "Resume, why Amazon, compensation, light LP fit"],
  ["Online assessment (some teams)", "60–120 min", "Timed SQL: joins, aggregations, window functions; sometimes Python"],
  ["Technical phone screen", "60–75 min", "Live SQL + Python/ETL + 1–2 LP stories"],
  ["Final loop", "4–5 × 45–60 min", "SQL, coding, modeling, pipeline design, Bar Raiser"],
  ["Debrief", "Internal", "Hire / no-hire with Bar Raiser in the room"],
] as const;

export const SQL_TASKS: Task[] = [
  { id: "sql-1", title: "Joins, GROUP BY, HAVING, subqueries, CTEs", hint: "Core query building blocks" },
  { id: "sql-2", title: "Window functions: ROW_NUMBER, RANK, LAG/LEAD, running totals", hint: "Highest-frequency SQL topic" },
  { id: "sql-3", title: "Dedup, Top-N, first-day retention, MoM/YoY", hint: "Classic Amazon patterns" },
  { id: "sql-4", title: "Nulls, duplicates, late data, most-recent-wins", hint: "Production correctness" },
  { id: "sql-5", title: "Tuning: indexes, partition pruning, explain plans", hint: "Why a Redshift scan of billions of rows is slow" },
];

export const PYTHON_TASKS: Task[] = [
  { id: "py-1", title: "Dicts, sets, lists, nested JSON flatten", hint: "Parse before you optimize" },
  { id: "py-2", title: "Dedup preserving order, merge intervals, frequency counts", hint: "Medium, data-shaped problems" },
  { id: "py-3", title: "File parsing, grouping, aggregations", hint: "Pandas only if asked" },
  { id: "py-4", title: "Graphs / BFS / DFS / cycle detection", hint: "More common than hard DP" },
  { id: "py-5", title: "Talk, then code, then edge cases out loud", hint: "Communication is scored" },
];

export const MODEL_TASKS: Task[] = [
  { id: "md-1", title: "OLTP vs OLAP, 3NF vs denormalization", hint: "Choose for the workload" },
  { id: "md-2", title: "Star vs snowflake, facts vs dimensions, grain", hint: "Sketch one schema a day" },
  { id: "md-3", title: "SCD Type 1 vs Type 2", hint: "Address-change is a classic" },
  { id: "md-4", title: "Batch vs streaming, idempotency, late data, backfills", hint: "Always state SLA and cost" },
  { id: "md-5", title: "AWS map: S3 → Glue/EMR → Redshift/Athena + Kinesis", hint: "Defend every box" },
];

export const LPS: Lp[] = [
  { id: "lp-1", tag: "Priority", title: "Customer Obsession", story: "You changed a pipeline or report because a stakeholder was blocked." },
  { id: "lp-2", tag: "Priority", title: "Ownership", story: "You fixed something outside your job and owned the outcome." },
  { id: "lp-3", tag: "Priority", title: "Dive Deep", story: "You used data to find a root cause others missed." },
  { id: "lp-4", tag: "Priority", title: "Deliver Results", story: "You shipped under a deadline despite blockers." },
  { id: "lp-5", tag: "Priority", title: "Insist on the Highest Standards", story: "You refused to ship bad data and put a permanent fix in." },
  { id: "lp-6", tag: "Priority", title: "Bias for Action", story: "You moved with incomplete info, then measured." },
  { id: "lp-7", tag: "Priority", title: "Invent and Simplify", story: "You replaced a messy process with a simpler one." },
  { id: "lp-8", tag: "Priority", title: "Have Backbone; Disagree and Commit", story: "You challenged a design, then committed once decided." },
  { id: "lp-9", tag: "Priority", title: "Earn Trust", story: "You were vocally self-critical and repaired a relationship." },
  { id: "lp-10", tag: "Priority", title: "Learn and Be Curious", story: "You taught yourself a tool and applied it." },
  { id: "lp-11", tag: "Cover", title: "Are Right, A Lot", story: "Judgment under ambiguity; you sought data, not opinions." },
  { id: "lp-12", tag: "Cover", title: "Think Big", story: "You proposed a larger data product, not a one-off query." },
  { id: "lp-13", tag: "Cover", title: "Frugality", story: "You cut cost or unused compute without hurting SLA." },
  { id: "lp-14", tag: "Cover", title: "Hire and Develop the Best", story: "Mentoring, reviewing, raising the bar on a teammate." },
  { id: "lp-15", tag: "Cover", title: "Strive to be Earth's Best Employer", story: "You improved how the team works, not just the pipeline." },
  { id: "lp-16", tag: "Cover", title: "Success and Scale Bring Broad Responsibility", story: "You considered downstream impact beyond your team." },
];

export const WEEKS: Week[] = [
  {
    id: "w1",
    title: "Week 1 — Foundations",
    items: [
      { id: "w1-1", title: "Read all 16 LPs and draft 8 STAR stories", hint: "Map each story to 2–3 LPs" },
      { id: "w1-2", title: "SQL: 3 problems/day, windows and CTEs first", hint: "LeetCode SQL 50 + DataLemur" },
      { id: "w1-3", title: "Python: 1 medium data problem/day", hint: "Hash maps, parsing, grouping" },
      { id: "w1-4", title: "One star-schema sketch: orders + customers + products", hint: "Write grain and keys" },
    ],
  },
  {
    id: "w2",
    title: "Week 2 — Amazon patterns",
    items: [
      { id: "w2-1", title: "SQL: 4 problems/day including dedup, retention, MoM", hint: "Time yourself at 20 minutes" },
      { id: "w2-2", title: "One pipeline design/day: batch ETL, then streaming clickstream", hint: "Start from the consumer" },
      { id: "w2-3", title: "SCD Type 2 + partition/sort-key decisions", hint: "Redshift + Glue job layout" },
      { id: "w2-4", title: "AWS map + record 3 LP answers; cut rambling", hint: "2–3 minutes each" },
    ],
  },
  {
    id: "w3",
    title: "Week 3 — Pressure",
    items: [
      { id: "w3-1", title: "Timed 45-min SQL + 45-min Python", hint: "No docs, talk out loud" },
      { id: "w3-2", title: "Two full data-design mocks: inventory and sales warehouse", hint: "Volume, SLA, cost, backfill" },
      { id: "w3-3", title: "Query-tuning story: how you investigated a slow query", hint: "Explain plan → fix → metric" },
      { id: "w3-4", title: "Tighten LP results with numbers", hint: "Latency, cost, freshness, defects" },
    ],
  },
  {
    id: "w4",
    title: "Week 4 — Loop simulation",
    items: [
      { id: "w4-1", title: "One 4-round mock in one sitting", hint: "SQL, coding, design, behavioral" },
      { id: "w4-2", title: "Refine the weakest story", hint: "Bar Raiser depth" },
      { id: "w4-3", title: "Resume walkthrough of 2–3 projects with metrics", hint: "Your specific role vs the team" },
      { id: "w4-4", title: "Sleep, logistics, and 3 questions for interviewers", hint: "Ask about the team's data products" },
    ],
  },
];

export const RESOURCES: Resource[] = [
  { category: "Official Amazon", title: "Interview preparation for data roles", url: "https://amazon.jobs/content/en/how-we-hire/university/data", note: "Amazon's own DE/data interview brief: SQL, ETL, modeling, behavioral mix." },
  { category: "Official Amazon", title: "Leadership Principles", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles", note: "The 16 LPs used in hiring, reviews, and promotions." },
  { category: "Official Amazon", title: "How Amazon hires", url: "https://www.amazon.jobs/content/en/how-we-hire", note: "Loop structure, Bar Raiser, and what interviewers score." },
  { category: "Official Amazon", title: "Interview tips / STAR", url: "https://www.amazon.jobs/content/en/how-we-hire/university", note: "STAR format and university/early-career interview coaching." },
  { category: "Leadership Principles", title: "IGotAnOffer LP question bank", url: "https://igotanoffer.com/en/advice/amazon-leadership-principles", note: "Sample behavioral questions mapped to each principle." },
  { category: "Leadership Principles", title: "Exponent LP interview guide", url: "https://www.tryexponent.com/blog/amazon-leadership-principles-interview", note: "How Bar Raisers probe stories 3–5 follow-ups deep." },
  { category: "Interview guides", title: "Exponent — Amazon Data Engineer", url: "https://www.tryexponent.com/guides/amazon-data-engineer-interview", note: "Process, SQL/Python/design samples, LP overlap." },
  { category: "Interview guides", title: "IGotAnOffer — Amazon Data Engineer", url: "https://igotanoffer.com/blogs/tech/amazon-data-engineer-interview", note: "Round-by-round DE loop and question types." },
  { category: "Interview guides", title: "Interview Query — Amazon DE", url: "https://www.interviewquery.com/guides/amazon-data-engineer", note: "Reported SQL, Python, modeling, and pipeline prompts." },
  { category: "SQL practice", title: "LeetCode SQL 50", url: "https://leetcode.com/studyplan/top-sql-50/", note: "Free study plan: joins, aggregations, windows." },
  { category: "SQL practice", title: "DataLemur SQL", url: "https://datalemur.com/questions?category=SQL", note: "Interview-style SQL, including company-tagged prompts." },
  { category: "SQL practice", title: "StrataScratch", url: "https://www.stratascratch.com/", note: "Real company SQL questions, including Amazon-tagged sets." },
  { category: "SQL practice", title: "Mode SQL tutorial", url: "https://mode.com/sql-tutorial/", note: "Clean mental model for joins, windows, and analytics SQL." },
  { category: "SQL practice", title: "HackerRank SQL", url: "https://www.hackerrank.com/domains/sql", note: "Timed drills if you want extra volume." },
  { category: "Python", title: "Python data structures tutorial", url: "https://docs.python.org/3/tutorial/datastructures.html", note: "Lists, dicts, sets, comprehensions — interview baseline." },
  { category: "Python", title: "LeetCode problem set", url: "https://leetcode.com/problemset/", note: "Filter Medium + hash map / string / array / graph." },
  { category: "Data modeling", title: "Kimball dimensional modeling techniques", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", note: "Facts, dimensions, grain, SCD — the language Amazon DEs use." },
  { category: "Data modeling", title: "Star schema guidance (Microsoft)", url: "https://learn.microsoft.com/en-us/power-bi/guidance/star-schema", note: "Practical star-schema rules and anti-patterns." },
  { category: "AWS & pipelines", title: "Amazon S3 user guide", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", note: "Landing zone, partitioning prefixes, lifecycle." },
  { category: "AWS & pipelines", title: "AWS Glue", url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html", note: "ETL jobs, crawlers, Data Catalog, bookmarks." },
  { category: "AWS & pipelines", title: "Amazon Redshift", url: "https://docs.aws.amazon.com/redshift/latest/dg/welcome.html", note: "Dist/sort keys, WLM, vacuum, explain plans." },
  { category: "AWS & pipelines", title: "Amazon Athena", url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html", note: "Query S3 in place; partition projection." },
  { category: "AWS & pipelines", title: "Amazon EMR", url: "https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html", note: "Spark/Hive on large batch transforms." },
  { category: "AWS & pipelines", title: "Amazon Kinesis Data Streams", url: "https://docs.aws.amazon.com/streams/latest/dev/introduction.html", note: "Streaming ingest, shards, consumer lag." },
  { category: "AWS & pipelines", title: "AWS Lambda", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", note: "Event-driven glue between S3, Kinesis, and APIs." },
  { category: "AWS & pipelines", title: "Amazon DynamoDB", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", note: "When a warehouse is the wrong store." },
  { category: "AWS & pipelines", title: "AWS Well-Architected", url: "https://aws.amazon.com/architecture/well-architected/", note: "Reliability, cost, and operational excellence trade-offs." },
  { category: "AWS & pipelines", title: "Medallion architecture (Databricks)", url: "https://www.databricks.com/glossary/medallion-architecture", note: "Bronze/silver/gold layering you can map to S3 + Glue + Redshift." },
];

export const ALL_TASK_IDS: string[] = [
  ...SQL_TASKS.map((task) => task.id),
  ...PYTHON_TASKS.map((task) => task.id),
  ...MODEL_TASKS.map((task) => task.id),
  ...LPS.map((lp) => lp.id),
  ...WEEKS.flatMap((week) => week.items.map((item) => item.id)),
];
