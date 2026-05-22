// art/system.jsx — system spine. Interactive campaign tracker. Sheet 08.

const STATS = [
  { k: "CHARM", g: "performance · pitch · glamour",      d: "the face you put on" },
  { k: "GRIT",  g: "endurance · refusing to fold",       d: "the body that doesn't quit" },
  { k: "SLICK", g: "finesse · deception · the angle",    d: "the move when the truth wouldn't help" },
  { k: "HEART", g: "read · attune · know",               d: "seeing clearly when it hurts" },
  { k: "COOL",  g: "composure under pressure",           d: "what's left when everything else broke" },
];

const MOVES = [
  { n: "MOVE PRODUCT",   r: "+SLICK / +CHARM",
    t: "sell, broker, deliver glitter",
    a: "Clean. Take the cash.",
    b: "Pick one: heat ticks · less than agreed · trail left behind.",
    c: "Ted heard. Probably worse." },
  { n: "RUN A SCHEME",   r: "+stat from fiction",
    t: "commit to a hustle — declare it",
    a: "Full yield. No new heat.",
    b: "Pick one: partial yield no heat · full yield with heat.",
    c: "Scheme falls apart. Heat. Consequences." },
  { n: "HOLD THE LINE",  r: "+GRIT / +COOL",
    t: "endure pressure you can't dodge",
    a: "You hold. No new harm.",
    b: "Pick one: 1 harm · lose ground · break a promise.",
    c: "You don't hold." },
  { n: "READ A PERSON",  r: "+HEART",
    t: "study the face, the gap between word and meaning",
    a: "Ask 3. They answer truthfully.",
    b: "Ask 1.",
    c: "They read you back." },
  { n: "TALK FAST",      r: "+CHARM",
    t: "sell a story under pressure",
    a: "They buy it.",
    b: "They buy it; pick one: it costs · collateral · only buys time.",
    c: "They don't buy it." },
  { n: "USE WHAT YOU KNOW", r: "+SLICK / +HEART",
    t: "bring your background to bear",
    a: "You know. Ask how it helps and act on it.",
    b: "You know enough. Ask one question.",
    c: "You thought you knew." },
  { n: "TAKE A HIT",     r: "no roll",
    t: "violence finds you",
    a: "GM sets severity from fiction.",
    b: "1-body · 2-body · 3-body · dying — by source.",
    c: "Mark the Body track per source." },
  { n: "USE GLITTER",    r: "no roll",
    t: "you dose",
    a: "Take −1 Wear.",
    b: "Mark the Using track.",
    c: "No save against the dose. Only the after." },
];

const READ_QUESTIONS = [
  "What do you want from this conversation?",
  "What are you afraid of?",
  "What are you hiding?",
  "Who do you answer to?",
  "What's the lie you tell yourself?",
];

const HEAT_STEPS = [
  { n: 1, k: "COLD",     g: "operations normal" },
  { n: 2, k: "WARM",     g: "ted's circling · wrong questions" },
  { n: 3, k: "HOT",      g: "cops aware · contacts quiet" },
  { n: 4, k: "BURNING",  g: "someone gets pinched before session end" },
  { n: 5, k: "EXPOSED",  g: "arrest · ambush · robbery" },
  { n: 6, k: "BROKEN",   g: "operation gone · survival to climax" },
];

const HARM_BODY_LABELS = ['1-BODY', '2-BODY', '3-BODY', 'DYING'];
const HARM_WEAR_LABELS = ['1-WEAR', '2-WEAR', '3-WEAR', 'BREAKING'];
const USING_LABELS = ['CLEAN', 'USING', 'HOOKED', 'LOST'];

const SESSION_DEFAULT = {
  debt: 10000,
  day: 1,
  heat: 1,
  pcs: [
    { name: '', body: 0, wear: 0, using: 0 },
    { name: '', body: 0, wear: 0, using: 0 },
    { name: '', body: 0, wear: 0, using: 0 },
    { name: '', body: 0, wear: 0, using: 0 },
    { name: '', body: 0, wear: 0, using: 0 },
    { name: '', body: 0, wear: 0, using: 0 },
  ],
};

function useLS(key, def) {
  const [v, sv] = React.useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? JSON.parse(s) : def;
    } catch { return def; }
  });
  const timer = React.useRef(null);
  const latest = React.useRef(undefined);
  const set = React.useCallback((next) => {
    sv(prev => {
      const val = typeof next === 'function' ? next(prev) : next;
      latest.current = val;
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        try { localStorage.setItem(key, JSON.stringify(latest.current)); } catch {}
      }, 300);
      return val;
    });
  }, [key]);
  return [v, set];
}

const BTN = {
  background: 'var(--surface-2)',
  border: '1px solid var(--border-strong)',
  color: 'var(--ink)',
  cursor: 'pointer',
  fontFamily: 'var(--ff-mono)',
  fontSize: 12,
  lineHeight: 1,
  padding: '3px 7px',
  userSelect: 'none',
};

// — small atoms ——————————————————————————————————————————————————

function SectionTag({ no, label, kicker }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12,
      marginBottom: 6,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span className="fld">§ {no}</span>
        <span className="headline" style={{ fontSize: 18, letterSpacing: "0.01em" }}>{label}</span>
      </div>
      {kicker && (
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
          {kicker}
        </span>
      )}
    </div>
  );
}

function ResultRow({ tag, tone, title, body }) {
  const bg =
    tone === "accent"  ? "var(--accent)"   :
    tone === "glitter" ? "var(--glitter)"  :
    "var(--surface-2)";
  const fg =
    tone === "accent"  ? "var(--accent-on)" :
    tone === "glitter" ? "#07111a"          :
    "var(--ink)";
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "62px 1fr",
      gap: 10, alignItems: "stretch",
    }}>
      <div style={{
        background: bg, color: fg,
        padding: "4px 6px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        border: tone === "ink" ? "1px solid var(--border-strong)" : "none",
      }}>
        <span className="headline" style={{ fontSize: 18, lineHeight: 1, color: fg }}>{tag}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "4px 0" }}>
        <span className="subhead" style={{ fontSize: 11 }}>{title}</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{body}</span>
      </div>
    </div>
  );
}

function StatCard({ k, g, d }) {
  return (
    <div className="card" style={{
      padding: "8px 10px",
      display: "flex", flexDirection: "column", gap: 2,
      borderTop: "2px solid var(--accent)",
      minHeight: 78,
    }}>
      <span className="headline" style={{ fontSize: 17, lineHeight: 1 }}>{k}</span>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.12em" }}>
        +{Math.max(-1, 3)} TO −1
      </span>
      <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2, lineHeight: 1.35 }}>{g}</span>
      <span className="body" style={{ fontSize: 11, color: "var(--ink-dim)", lineHeight: 1.3, marginTop: "auto", fontStyle: "italic" }}>
        {d}
      </span>
    </div>
  );
}

function MoveCard({ m }) {
  const noRoll = m.r.startsWith("no roll");
  return (
    <div className="card" style={{
      padding: "9px 11px 8px",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
        <span className="headline" style={{ fontSize: 13, lineHeight: 1 }}>{m.n}</span>
        <span className="mono" style={{
          fontSize: 11,
          color: noRoll ? "var(--ink-dim)" : "var(--accent)",
          letterSpacing: "0.12em",
          border: "1px solid " + (noRoll ? "var(--ink-faint)" : "var(--accent)"),
          padding: "1px 5px",
          whiteSpace: "nowrap",
        }}>
          {m.r}
        </span>
      </div>
      <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", fontStyle: "italic" }}>
        {m.t}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: "2px 6px", marginTop: 2 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink)", letterSpacing: "0.06em" }}>10+</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.a}</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--glitter)", letterSpacing: "0.06em" }}>7–9</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.b}</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.06em" }}>6−</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.3 }}>{m.c}</span>
      </div>
    </div>
  );
}

// — interactive tracks ——————————————————————————————————————————

function DebtTrack({ debt, day, setSess }) {
  const pct = Math.max(0, Math.round((1 - debt / 10000) * 100));
  const dayWarn = day >= 25;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="subhead" style={{ fontSize: 11 }}>DEBT · CAMPAIGN CLOCK</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>SHARED</span>
      </div>
      <div style={{
        border: "1.5px solid var(--accent)",
        padding: "10px 12px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 12,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>DEBT REMAINING</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, debt: Math.min(10000, s.debt + 500) }))}>▲</button>
            <span className="headline" style={{ fontSize: 22, color: "var(--accent)", lineHeight: 1, minWidth: 88, textAlign: "center" }}>
              ${debt.toLocaleString()}
            </span>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, debt: Math.max(0, s.debt - 500) }))}>▼</button>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em" }}>
            {pct}% PAID — STEP $500
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>DAY</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, day: Math.max(1, s.day - 1) }))}>−</button>
            <span className="headline" style={{ fontSize: 26, lineHeight: 1, minWidth: 38, textAlign: "center",
              color: dayWarn ? "var(--accent)" : "var(--ink)" }}>
              {day}
            </span>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, day: Math.min(30, s.day + 1) }))}>+</button>
          </div>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em",
            color: dayWarn ? "var(--accent)" : "var(--ink-dim)" }}>/ 30 DAYS</span>
        </div>
      </div>
      <div style={{ height: 4, background: "var(--surface-2)" }}>
        <div style={{ height: "100%", width: pct + "%", background: "var(--accent)", transition: "width 0.2s" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        <div style={{ padding: "5px 8px", background: "var(--surface-2)", borderLeft: "3px solid var(--accent)" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.12em" }}>DEBT &gt; $0 @ DAY 30</span>
          <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>Alex dies. Campaign ends.</div>
        </div>
        <div style={{ padding: "5px 8px", background: "var(--surface-2)", borderLeft: "3px solid var(--ink-soft)" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink)", letterSpacing: "0.12em" }}>DEBT = $0 BEFORE 30</span>
          <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>Pyrrhic save. Cost is everything else.</div>
        </div>
      </div>
    </div>
  );
}

function HeatTrack({ heat, setSess }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="subhead" style={{ fontSize: 11 }}>HEAT · PRESSURE TRACK</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>PARTY-SHARED</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
        {HEAT_STEPS.map(({ n, k, g }) => {
          const active = n <= heat;
          const isCurrent = n === heat;
          const isMax = n === 6;
          const bg = active ? (isMax ? "var(--accent)" : "var(--surface-2)") : "var(--surface)";
          const fg = isMax && active ? "var(--accent-on)" : "var(--ink)";
          return (
            <div
              key={n}
              onClick={() => setSess(s => ({ ...s, heat: s.heat === n && n > 1 ? n - 1 : n }))}
              title={`Set heat to ${n}`}
              style={{
                background: bg, color: fg,
                border: `1.5px solid ${isCurrent ? "var(--accent)" : active ? "var(--accent-mid)" : "var(--border-strong)"}`,
                padding: "6px 6px 5px",
                display: "flex", flexDirection: "column", gap: 1,
                minHeight: 58,
                cursor: "pointer",
                opacity: active ? 1 : 0.45,
                transition: "opacity 0.12s, border-color 0.12s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--ff-display)", fontSize: 11, letterSpacing: "0.04em", color: fg, opacity: 0.7 }}>{n}</span>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", opacity: 0.6 }}>{isMax ? "END" : ""}</span>
              </div>
              <span className="headline" style={{ fontSize: 13, lineHeight: 1, color: fg }}>{k}</span>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.04em", opacity: 0.72, lineHeight: 1.25 }}>{g}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>
          <b style={{ color: "var(--ink)" }}>UP:</b> exposure misses · noisy theft · certain GM moves.
        </span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>
          <b style={{ color: "var(--ink)" }}>DOWN:</b> lying low · pay someone off · sacrifice a relationship.
        </span>
      </div>
    </div>
  );
}

function HarmLadder({ name, steps, end, gloss }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="subhead" style={{ fontSize: 11 }}>{name}</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.12em" }}>{gloss}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {steps.map(([n, label, effect], i) => {
          const isEnd = i === steps.length - 1;
          return (
            <div key={n} style={{
              display: "grid", gridTemplateColumns: "12px 56px 1fr",
              gap: 8, alignItems: "center",
              padding: "3px 6px",
              background: isEnd ? "var(--accent)" : "var(--surface-2)",
              color: isEnd ? "var(--accent-on)" : "var(--ink)",
            }}>
              <span style={{
                width: 10, height: 10, border: "1px solid currentColor",
                background: isEnd ? "var(--accent-on)" : "transparent",
              }} />
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em" }}>{label}</span>
              <span className="body" style={{ fontSize: 11, color: isEnd ? "var(--accent-on)" : "var(--ink-mid)", lineHeight: 1.3 }}>
                {effect}
              </span>
            </div>
          );
        })}
      </div>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em", marginTop: 2 }}>
        {end}
      </span>
    </div>
  );
}

function UsingTrack() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="subhead" style={{ fontSize: 11 }}>USING · GLITTER TRACK</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.12em" }}>PER PC · ONE PER DOSE</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
        {[
          ["CLEAN",  "no effect"],
          ["USING",  "dose/session or +1 Wear at session start"],
          ["HOOKED", "dose mid-session or −1 Cool until you dose"],
          ["LOST",   "you're Steve · GM narrates the drift"],
        ].map(([k, e], i) => {
          const isLast = i === 3;
          const isClean = i === 0;
          return (
            <div key={k} style={{
              border: `1px solid ${isLast ? "var(--glitter)" : "var(--border-strong)"}`,
              background: isLast ? "var(--glitter)" : "var(--surface)",
              color: isLast ? "#07111a" : "var(--ink)",
              padding: "5px 7px",
              display: "flex", flexDirection: "column", gap: 1,
              minHeight: 48,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="headline" style={{ fontSize: 12, lineHeight: 1, color: isLast ? "#07111a" : "var(--ink)" }}>{k}</span>
                {!isClean && <span className="glitter-star" style={{ width: 8, height: 8, opacity: isLast ? 0.85 : 0.6 }} />}
              </div>
              <span className="body" style={{ fontSize: 11, color: isLast ? "#07111a" : "var(--ink-mid)", lineHeight: 1.3 }}>
                {e}
              </span>
            </div>
          );
        })}
      </div>
      <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.35, marginTop: 2 }}>
        <b style={{ color: "var(--ink)" }}>Getting clean:</b> declare a session of it · need another PC's presence · take 2 Wear · reduce 1 step at session end · failing locks the track 2 sessions.
      </span>
    </div>
  );
}

// — PC Tracker ——————————————————————————————————————————————————

function HarmBar({ value, labels, onChange, accentFull }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {labels.map((label, i) => {
          const filled = i < value;
          const isCurrent = i === value - 1;
          const isMax = i === labels.length - 1;
          const fillColor = isMax && filled
            ? (accentFull || "var(--accent)")
            : filled ? "var(--accent-mid)" : "transparent";
          return (
            <div
              key={i}
              onClick={() => onChange(value === i + 1 ? i : i + 1)}
              title={label}
              style={{
                flex: 1, height: 14,
                background: fillColor,
                border: `1px solid ${isCurrent ? "var(--accent)" : filled ? "var(--accent-mid)" : "var(--border-strong)"}`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
            />
          );
        })}
      </div>
      <span className="mono" style={{
        fontSize: 11, letterSpacing: "0.08em",
        color: value === labels.length ? (accentFull || "var(--accent)") : value > 0 ? "var(--ink-mid)" : "var(--ink-dim)",
      }}>
        {value > 0 ? labels[value - 1] : "—"}
      </span>
    </div>
  );
}

function UsingBar({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {USING_LABELS.map((label, i) => {
          const isActive = value === i;
          const isLost = i === 3;
          return (
            <div
              key={i}
              onClick={() => onChange(isActive ? 0 : i)}
              title={label}
              style={{
                flex: 1, height: 14,
                background: isActive ? (isLost ? "var(--glitter)" : "var(--surface-inv)") : "transparent",
                border: `1px solid ${isActive ? (isLost ? "var(--glitter)" : "var(--ink-soft)") : "var(--border-strong)"}`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
            />
          );
        })}
      </div>
      <span className="mono" style={{
        fontSize: 11, letterSpacing: "0.08em",
        color: value >= 2 ? "var(--glitter)" : value > 0 ? "var(--ink-mid)" : "var(--ink-dim)",
      }}>
        {USING_LABELS[value]}
      </span>
    </div>
  );
}

function PCTracker({ pcs, setSess }) {
  const updatePC = (i, field, val) => {
    setSess(s => ({
      ...s,
      pcs: s.pcs.map((pc, j) => j === i ? { ...pc, [field]: val } : pc),
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {pcs.map((pc, i) => (
        <div key={i} style={{
          display: "grid",
          gridTemplateColumns: "130px 1fr 1fr 1fr",
          gap: 10, alignItems: "end",
          padding: "9px 10px",
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>PC {i + 1}</span>
            <input
              value={pc.name}
              onChange={e => updatePC(i, 'name', e.target.value)}
              placeholder="Name"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--border-strong)",
                color: "var(--ink)",
                fontFamily: "var(--ff-display)",
                fontSize: 13, letterSpacing: "0.06em",
                padding: "2px 0",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>BODY HARM</span>
            <HarmBar
              value={pc.body}
              labels={HARM_BODY_LABELS}
              onChange={v => updatePC(i, 'body', v)}
              accentFull="var(--accent)"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>WEAR HARM</span>
            <HarmBar
              value={pc.wear}
              labels={HARM_WEAR_LABELS}
              onChange={v => updatePC(i, 'wear', v)}
              accentFull="var(--glitter)"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>USING</span>
            <UsingBar
              value={pc.using}
              onChange={v => updatePC(i, 'using', v)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// — sections ——————————————————————————————————————————————————

function S1_Resolution() {
  return (
    <div>
      <SectionTag no="01" label="RESOLUTION" kicker="2d6 + STAT · NO MOVE, NO ROLL" />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <ResultRow tag="10+"  tone="ink"     title="STRONG HIT"   body="The fiction goes your way." />
        <ResultRow tag="7–9"  tone="glitter" title="MIXED HIT"    body="You get part of it. There's a cost." />
        <ResultRow tag="6−"   tone="accent"  title="MISS · XP"    body="GM makes a move. Mark XP." />
      </div>
    </div>
  );
}

function S2_Stats() {
  return (
    <div>
      <SectionTag no="02" label="STATS" kicker="STANDARD ARRAY +2 / +1 / +1 / 0 / −1" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
        {STATS.map(s => <StatCard key={s.k} {...s} />)}
      </div>
    </div>
  );
}

function S3_Moves() {
  return (
    <div>
      <SectionTag no="03" label="BASIC MOVES" kicker="EVERY PC HAS THESE · PLAYBOOKS ADD MORE" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
        {MOVES.map(m => <MoveCard key={m.n} m={m} />)}
      </div>
      <div style={{
        marginTop: 5,
        padding: "5px 9px",
        background: "var(--surface-2)",
        borderLeft: "3px solid var(--accent)",
        display: "flex", gap: 10, alignItems: "baseline",
      }}>
        <span className="fld" style={{ flex: "0 0 auto" }}>READ A PERSON · ASK</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>
          {READ_QUESTIONS.join(" · ")}
        </span>
      </div>
    </div>
  );
}

function S4_Tracks({ sess, setSess }) {
  return (
    <div>
      <SectionTag no="04" label="THE FOUR TRACKS" kicker="DEBT · HEAT · HARM · USING" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
        <DebtTrack debt={sess.debt} day={sess.day} setSess={setSess} />
        <HeatTrack heat={sess.heat} setSess={setSess} />
        <div style={{ display: "flex", gap: 8 }}>
          <HarmLadder
            name="HARM · BODY"
            gloss="PHYSICAL"
            end="DYING → without intervention this session, dead. Permanent."
            steps={[
              [1, "1-BODY",  "fictional only"],
              [2, "2-BODY",  "−1 to physical"],
              [3, "3-BODY",  "−2 · can't initiate"],
              [4, "DYING",   "out unless intervened"],
            ]}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <HarmLadder
            name="HARM · WEAR"
            gloss="ATTRITIONAL"
            end="BREAKING → without intervention this session, permanently removed."
            steps={[
              [1, "1-WEAR",   "fictional only"],
              [2, "2-WEAR",   "−1 to social/composure"],
              [3, "3-WEAR",   "−2 · can't initiate"],
              [4, "BREAKING", "out unless intervened"],
            ]}
          />
        </div>
      </div>
      <div style={{ marginTop: 8 }}>
        <UsingTrack />
      </div>
    </div>
  );
}

function S5_Special() {
  return (
    <div>
      <SectionTag no="05" label="ALEX · BECKY · BONDS" kicker="CANON-LOAD-BEARING" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        <div className="card" style={{ padding: "7px 9px", borderTop: "2px solid var(--accent)" }}>
          <span className="headline" style={{ fontSize: 13 }}>ALEX</span>
          <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2, lineHeight: 1.35 }}>
            GM voices her. No sheet, no stats, no moves. Tracked state: <b>alive / dying / dead</b>.
            <b style={{ color: "var(--accent)" }}> Alex dies → campaign ends.</b>
          </div>
        </div>
        <div className="card" style={{ padding: "7px 9px", borderTop: "2px solid var(--accent)" }}>
          <span className="headline" style={{ fontSize: 13 }}>BECKY</span>
          <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2, lineHeight: 1.35 }}>
            GM-voiced narrator. PCs interact through standard moves; she rolls none.
            <b style={{ color: "var(--accent)" }}> Becky dies → campaign ends.</b>
          </div>
        </div>
        <div className="card" style={{ padding: "7px 9px", borderTop: "2px solid var(--ink-soft)" }}>
          <span className="headline" style={{ fontSize: 13 }}>BONDS</span>
          <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2, lineHeight: 1.35 }}>
            Per pair. Help: roll +bond, 10+ give +1, 7–9 share consequences.
            Every PC starts <b>+1 to Alex</b> (canon).
          </div>
        </div>
      </div>
    </div>
  );
}

function S6_PCTracker({ sess, setSess }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span className="fld">§ 06</span>
          <span className="headline" style={{ fontSize: 18, letterSpacing: "0.01em" }}>PC TRACKER</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
            BODY · WEAR · USING · PER CHARACTER
          </span>
          <button
            onClick={() => setSess(SESSION_DEFAULT)}
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 11, letterSpacing: "0.12em",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--ink-dim)",
              padding: "3px 8px",
              cursor: "pointer",
            }}
          >
            RESET SESSION
          </button>
        </div>
      </div>
      <PCTracker pcs={sess.pcs} setSess={setSess} />
    </div>
  );
}

// — top-level ————————————————————————————————————————————————————

function SystemHeader() {
  return (
    <div style={{
      background: "var(--surface-inv)",
      color: "var(--surface)",
      padding: "14px 32px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: "4px solid var(--accent)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, lineHeight: 1.1 }}>
        <div className="brand-mark" style={{ width: 42, height: 42, flexShrink: 0 }} aria-label="dig.sys"/>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.55 }}>
            DIGITAL SISSY · SHEET 08 · CORE · LEGAL 8.5×14
          </span>
          <span className="headline" style={{ fontSize: 28, color: "var(--surface)" }}>
            SYSTEM SPINE · ONE-PAGE REFERENCE
          </span>
        </div>
      </div>
      <span style={{
        fontFamily: "var(--ff-display)", fontSize: 16,
        border: "1.5px solid var(--surface)", padding: "3px 10px",
        letterSpacing: "0.1em", color: "var(--surface)",
      }}>PbtA · 2d6 + STAT</span>
    </div>
  );
}

function SystemFooter() {
  return (
    <div style={{
      background: "var(--surface-inv)", color: "var(--surface)",
      padding: "8px 32px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderTop: "4px solid var(--accent)",
      opacity: 0.95,
    }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
        DIGITAL · <span style={{ color: "var(--accent)" }}>SISSY</span> · SYSTEM SPINE · v0.2
      </span>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
        DEBT $10K · 30 DAYS · ALEX DIES OR DEBT CLEARS
      </span>
    </div>
  );
}

function SystemArtboard() {
  const [sess, setSess] = useLS('dig.sys.session', SESSION_DEFAULT);

  return (
    <div className="page" style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
      <SystemHeader />
      <div style={{ padding: "14px 32px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        <S1_Resolution />
        <S2_Stats />
        <S3_Moves />
        <S4_Tracks sess={sess} setSess={setSess} />
        <S5_Special />
        <S6_PCTracker sess={sess} setSess={setSess} />
      </div>
      <SystemFooter />
    </div>
  );
}

window.SystemArtboard = SystemArtboard;
