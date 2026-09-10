import { useMemo, useState } from "react";
import {
  ALL_TASK_IDS,
  LPS,
  MODEL_TASKS,
  PROCESS,
  PYTHON_TASKS,
  RESOURCES,
  SQL_TASKS,
  WEEKS,
  type ResourceCategory,
  type Task,
} from "./data";
import { loadState, saveState } from "./storage";

const CATEGORIES: ResourceCategory[] = [
  "Official Amazon",
  "Interview guides",
  "SQL practice",
  "Python",
  "Data modeling",
  "AWS & pipelines",
  "Leadership Principles",
];

function TaskList({
  tasks,
  checked,
  onToggle,
}: {
  tasks: Task[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="tasks">
      {tasks.map((task) => (
        <label className="task" key={task.id}>
          <input
            type="checkbox"
            checked={Boolean(checked[task.id])}
            onChange={() => onToggle(task.id)}
          />
          <span>
            {task.title}
            <small>{task.hint}</small>
          </span>
        </label>
      ))}
    </div>
  );
}

export default function App() {
  const initial = loadState();
  const [checked, setChecked] = useState<Record<string, boolean>>(initial.checked);
  const [notes, setNotes] = useState(initial.notes);
  const [copied, setCopied] = useState(false);
  const [resourceFilter, setResourceFilter] = useState<ResourceCategory | "All">("All");

  const persist = (nextChecked: Record<string, boolean>, nextNotes: string) => {
    saveState({ checked: nextChecked, notes: nextNotes });
  };

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    persist(next, notes);
  };

  const done = ALL_TASK_IDS.filter((id) => checked[id]).length;
  const pct = Math.round((done / ALL_TASK_IDS.length) * 100);

  const sectionPct = (ids: string[]) =>
    Math.round((ids.filter((id) => checked[id]).length / ids.length) * 100);

  const bars = useMemo(
    () => [
      { label: "SQL", value: sectionPct(SQL_TASKS.map((t) => t.id)) },
      { label: "Python", value: sectionPct(PYTHON_TASKS.map((t) => t.id)) },
      { label: "Modeling", value: sectionPct(MODEL_TASKS.map((t) => t.id)) },
      { label: "LPs", value: sectionPct(LPS.map((t) => t.id)) },
      { label: "Plan", value: sectionPct(WEEKS.flatMap((w) => w.items.map((i) => i.id))) },
    ],
    [checked],
  );

  const visibleResources =
    resourceFilter === "All"
      ? RESOURCES
      : RESOURCES.filter((item) => item.category === resourceFilter);

  return (
    <>
      <header>
        <div className="nav">
          <div className="brand">
            <div className="mark">DE</div>
            Amazon DE-1 Prep
          </div>
          <nav>
            <a href="#process">Process</a>
            <a href="#technical">Technical</a>
            <a href="#lps">Leadership</a>
            <a href="#plan">Plan</a>
            <a href="#resources">Resources</a>
          </nav>
          <div className="pct">{pct}%</div>
        </div>
        <div className="progress-wrap">
          <div
            className="progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Overall prep progress"
          >
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="progress-meta">
            {done} / {ALL_TASK_IDS.length} checklist items
          </p>
        </div>
      </header>

      <main>
        <section className="hero">
          <div>
            <h1>End-to-end prep for Amazon Data Engineer I</h1>
            <p className="lede">
              DE-1 is typically L4. The loop weights SQL, Python, data modeling, pipeline
              design, and Leadership Principles. Check items as you finish them — progress
              saves in this browser.
            </p>
            <div className="chips">
              <span className="chip">SQL first</span>
              <span className="chip">Python, data-shaped</span>
              <span className="chip">Star schemas + SCD2</span>
              <span className="chip">Batch vs streaming</span>
              <span className="chip">Bar Raiser LPs</span>
            </div>
          </div>
          <div className="stat-grid">
            {bars.map((bar) => (
              <div className="stat-card" key={bar.label}>
                <div className="stat-head">
                  <span>{bar.label}</span>
                  <b>{bar.value}%</b>
                </div>
                <div className="mini-track">
                  <div className="mini-fill" style={{ width: `${bar.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <h2 id="process">Interview process</h2>
        <p className="section-note">
          Clarify volume, latency, consumers, and SLA before writing SQL or drawing boxes.
        </p>
        <table>
          <thead>
            <tr>
              <th>Stage</th>
              <th>Time</th>
              <th>What they test</th>
            </tr>
          </thead>
          <tbody>
            {PROCESS.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 id="technical">Technical checklist</h2>
        <p className="section-note">
          DE-1 is not a SWE loop. Interviewers want production data judgment you can defend.
        </p>
        <div className="grid-3">
          <article className="card">
            <h3>SQL — daily</h3>
            <TaskList tasks={SQL_TASKS} checked={checked} onToggle={toggle} />
          </article>
          <article className="card">
            <h3>Python — data-shaped</h3>
            <TaskList tasks={PYTHON_TASKS} checked={checked} onToggle={toggle} />
          </article>
          <article className="card">
            <h3>Modeling + pipelines</h3>
            <TaskList tasks={MODEL_TASKS} checked={checked} onToggle={toggle} />
          </article>
        </div>

        <h2 id="lps">Leadership Principles</h2>
        <p className="section-note">
          Write 8 stories of 2–3 minutes. Map each to 2–3 LPs. Bar Raisers go 3–5 follow-ups
          deep on metrics.
        </p>
        <div className="lp-grid">
          {LPS.map((lp) => (
            <label className="lp" key={lp.id}>
              <span className="tag">{lp.tag}</span>
              <h3>{lp.title}</h3>
              <p>{lp.story}</p>
              <span className="check-row">
                <input
                  type="checkbox"
                  checked={Boolean(checked[lp.id])}
                  onChange={() => toggle(lp.id)}
                />
                Story drafted
              </span>
            </label>
          ))}
        </div>

        <h2 id="plan">4-week plan</h2>
        <p className="section-note">If the loop is sooner, compress weeks 1–2 into one and keep mocks.</p>
        {WEEKS.map((week) => (
          <article className="card week" key={week.id}>
            <div className="week-head">
              <h3>{week.title}</h3>
              <span>
                {week.items.filter((item) => checked[item.id]).length}/{week.items.length}
              </span>
            </div>
            <TaskList tasks={week.items} checked={checked} onToggle={toggle} />
          </article>
        ))}

        <h2 id="resources">Resources</h2>
        <p className="section-note">
          Official Amazon pages first, then drills and AWS docs. Links open in a new tab.
        </p>
        <div className="toolbar">
          <button
            type="button"
            className={resourceFilter === "All" ? "" : "secondary"}
            onClick={() => setResourceFilter("All")}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category}
              className={resourceFilter === category ? "" : "secondary"}
              onClick={() => setResourceFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="resource-list">
          {visibleResources.map((resource) => (
            <a
              className="resource"
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="res-cat">{resource.category}</span>
              <strong>{resource.title}</strong>
              <span className="res-note">{resource.note}</span>
              <span className="res-url">{resource.url.replace("https://", "")}</span>
            </a>
          ))}
        </div>

        <h2 id="stories">STAR story bank</h2>
        <p className="section-note">
          Keep results numeric: latency, cost, freshness, defect rate, tickets closed.
        </p>
        <div className="toolbar">
          <button
            type="button"
            onClick={async () => {
              const text = `Amazon DE-1 prep: ${done}/${ALL_TASK_IDS.length} items (${pct}%). Updated ${new Date().toLocaleString()}`;
              await navigator.clipboard.writeText(text);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1200);
            }}
          >
            {copied ? "Copied" : "Copy progress"}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              if (!window.confirm("Reset all checkboxes? Story notes stay unless you clear them.")) return;
              setChecked({});
              persist({}, notes);
            }}
          >
            Reset checkboxes
          </button>
        </div>
        <article className="card">
          <h3>Draft stories here</h3>
          <textarea
            value={notes}
            onChange={(event) => {
              setNotes(event.target.value);
              persist(checked, event.target.value);
            }}
            placeholder={"Story 1 — Customer Obsession / Dive Deep:\nS: ...\nT: ...\nA: ...\nR: ..."}
          />
        </article>

        <footer>
          Built for Amazon Data Engineer I (DE-1 / L4). Day-of rule: clarify constraints, think
          out loud, ship one working answer, then optimize. In design, start with the consumer
          and work backward.
        </footer>
      </main>
    </>
  );
}
