// art/gm-screen.jsx — four landscape panels. Total 3264 × 1056.

function useLS(key, def) {
  const [v, sv] = React.useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : def; }
    catch { return def; }
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
// Reconciled with v0.1 system canon:
//   stats: Charm · Grit · Slick · Heart · Cool
//   moves: the eight basic moves
//   tracks: Debt · Heat · Harm · Using
// New Panel IV: scheme table + GM agenda + hard moves + session-end.

const GMS_STATS = [
  ["CHARM", "performance · pitch · glamour · the face"],
  ["GRIT",  "endurance · refusing to fold · the body"],
  ["SLICK", "finesse · deception · the angle"],
  ["HEART", "read · attune · know"],
  ["COOL",  "composure under pressure"],
];

const GMS_MOVES = [
  { n: "MOVE PRODUCT",   r: "+SLICK / +CHARM",
    a: "Clean. Take the cash.",
    b: "Pick: heat up · less than agreed · trail left.",
    c: "Ted heard. Probably worse." },
  { n: "RUN A SCHEME",   r: "+ stat (declared)",
    a: "Full yield. No new heat.",
    b: "Partial yield no heat · or full yield with heat.",
    c: "Falls apart. Heat and consequences." },
  { n: "HOLD THE LINE",  r: "+GRIT / +COOL",
    a: "You hold. No new harm.",
    b: "Pick: 1 harm · lose ground · break a promise.",
    c: "You don't hold." },
  { n: "READ A PERSON",  r: "+HEART",
    a: "Ask 3. They answer truthfully.",
    b: "Ask 1.",
    c: "They read you back." },
  { n: "TALK FAST",      r: "+CHARM",
    a: "They buy it.",
    b: "They buy it; cost · collateral · or buys time only.",
    c: "They don't buy it." },
  { n: "USE WHAT YOU KNOW", r: "+SLICK / +HEART",
    a: "You know. Ask how it helps; act.",
    b: "You know enough. Ask one question.",
    c: "You thought you knew." },
  { n: "TAKE A HIT",     r: "no roll",
    a: "GM sets severity. Mark Body per source.",
    b: "1- · 2- · 3-body · dying.",
    c: "" },
  { n: "USE GLITTER",    r: "no roll",
    a: "Take −1 Wear. Mark the Using track.",
    b: "No save against the dose. Only the after.",
    c: "" },
];

const GMS_READ_QS = [
  "What do you want from this conversation?",
  "What are you afraid of?",
  "What are you hiding?",
  "Who do you answer to?",
  "What's the lie you tell yourself?",
];

const GMS_HEAT_STEPS = [
  { n: 1, k: "COLD",     g: "ops normal" },
  { n: 2, k: "WARM",     g: "wrong questions" },
  { n: 3, k: "HOT",      g: "cops aware" },
  { n: 4, k: "BURNING",  g: "someone gets pinched" },
  { n: 5, k: "EXPOSED",  g: "arrest · ambush · robbery" },
  { n: 6, k: "BROKEN",   g: "survival to climax" },
];

const GMS_SCHEMES = [
  { n: "PETTY THEFT",       stat: "+SLICK",            yield: "$20–$200",      heat: "HIGH",  body: "Pockets, registers, sleight. Cheap money. Loud trail." },
  { n: "CAR WASH",          stat: "+CHARM",            yield: "$50–$150",      heat: "—",     body: "Wash-n-Go. Slow, clean, conspicuously visible." },
  { n: "TOUR-AGENT GIG",    stat: "+CHARM / +HEART",   yield: "$300–$1,500",   heat: "LOW",   body: "Becky and Beth front it. The big con. Diana builds the page." },
  { n: "WAREHOUSE SHIFT",   stat: "+GRIT",             yield: "$50–$200 / shift", heat: "—",  body: "Honest work. East-warehouse-adjacent. Steve's shop." },
];

const GMS_AGENDA = [
  "Make Alex specific. Not symbolic.",
  "Let the world shout. The people don't.",
  "Price every 7–9 properly.",
  "Name consequences before the roll.",
  "Believe the PCs can save her.",
  "Know they probably won't.",
];

const GMS_HARD = [
  "Glitter shows up in someone's hand.",
  "Jaw-man has a name today. It's the wrong one.",
  "The Silverado is parked where it shouldn't be.",
  "Mom asks for the rent and doesn't pretend it's a loan.",
  "A door Alex closed last session opens again.",
  "Ted is exactly where he wasn't supposed to be.",
];

const GMS_SESSION_END = [
  { k: "DAYS",   b: "Declare days elapsed (1–7). Tick against the 30-day clock." },
  { k: "HEAT",   b: "Resolve pending heat moves. Tick up or down." },
  { k: "DEBT",   b: "Cash delivered to Jaw-man this session ticks debt down." },
  { k: "XP",     b: "Missed roll · acted on a bond · archetype-fitting risk · per-playbook trigger." },
  { k: "BOOKS",  b: "Playbook end-of-session moves trigger. 5 XP → advance." },
];

// — atoms ——————————————————————————————————————————————————————————

function GMSPanelHeader({ no, title, eyebrow }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="brand-mark" style={{ width: 22, height: 22 }} aria-label="dig.sys"/>
          <span className="fld">{eyebrow}</span>
        </div>
        <span className="numtag">{no}</span>
      </div>
      <div className="headline" style={{ fontSize: 38, lineHeight: 0.92 }}>{title}</div>
      <hr className="rule accent" style={{ marginTop: 6 }} />
    </div>
  );
}

function GMSResultRow({ result, tone, title, body }) {
  const bg =
    tone === "accent" ? "var(--accent)"   :
    tone === "glitter" ? "var(--glitter)" :
    "var(--surface-2)";
  const fg =
    tone === "accent"  ? "var(--accent-on)" :
    tone === "glitter" ? "#07111a"          :
    "var(--ink)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 10, alignItems: "stretch" }}>
      <div style={{
        background: bg, color: fg,
        padding: "8px 8px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 1,
        border: tone === "ink" ? "1px solid var(--border-strong)" : "none",
      }}>
        <span className="headline" style={{ fontSize: 22, lineHeight: 1, color: fg }}>{result}</span>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em" }}>RESULT</span>
      </div>
      <div className="card" style={{
        padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2,
      }}>
        <div className="subhead" style={{ fontSize: 12 }}>{title}</div>
        <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.3 }}>{body}</div>
      </div>
    </div>
  );
}

function GMSStatChip({ k, g }) {
  return (
    <div style={{
      flex: 1,
      border: "1px solid var(--border-strong)",
      padding: "5px 8px",
      display: "flex", flexDirection: "column", gap: 1,
    }}>
      <span className="headline" style={{ fontSize: 14, lineHeight: 1 }}>{k}</span>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.08em", lineHeight: 1.3 }}>{g}</span>
    </div>
  );
}

function GMSMove({ m }) {
  return (
    <div style={{
      padding: "6px 0",
      borderBottom: "1px dashed var(--ink-faint)",
      display: "flex", flexDirection: "column", gap: 2,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <span className="headline" style={{ fontSize: 14, lineHeight: 1 }}>{m.n}</span>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: "0.12em",
          color: m.r.startsWith("no") ? "var(--ink-dim)" : "var(--accent)",
          whiteSpace: "nowrap",
        }}>{m.r}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: "1px 5px", marginTop: 1 }}>
        {m.a && <><span className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>10+</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.a}</span></>}
        {m.b && <><span className="mono" style={{ fontSize: 11, color: m.r.startsWith("no") ? "var(--ink-dim)" : "var(--glitter)" }}>{m.r.startsWith("no") ? "·" : "7–9"}</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.b}</span></>}
        {m.c && <><span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>6−</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.3 }}>{m.c}</span></>}
      </div>
    </div>
  );
}

// ── System spine (merged from system page) ───────────────────────

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

const STATS = [
  { k: "CHARM", g: "performance · pitch · glamour",      d: "the face you put on" },
  { k: "GRIT",  g: "endurance · refusing to fold",       d: "the body that doesn't quit" },
  { k: "SLICK", g: "finesse · deception · the angle",    d: "the move when the truth wouldn't help" },
  { k: "HEART", g: "read · attune · know",               d: "seeing clearly when it hurts" },
  { k: "COOL",  g: "composure under pressure",           d: "what's left when everything else broke" },
];

const MOVES = [
  { n: "MOVE PRODUCT",      r: "+SLICK / +CHARM",
    t: "sell, broker, deliver glitter",
    a: "Clean. Take the cash.",
    b: "Pick one: heat ticks · less than agreed · trail left behind.",
    c: "Ted heard. Probably worse." },
  { n: "RUN A SCHEME",      r: "+stat from fiction",
    t: "commit to a hustle — declare it",
    a: "Full yield. No new heat.",
    b: "Pick one: partial yield no heat · full yield with heat.",
    c: "Scheme falls apart. Heat. Consequences." },
  { n: "HOLD THE LINE",     r: "+GRIT / +COOL",
    t: "endure pressure you can't dodge",
    a: "You hold. No new harm.",
    b: "Pick one: 1 harm · lose ground · break a promise.",
    c: "You don't hold." },
  { n: "READ A PERSON",     r: "+HEART",
    t: "study the face, the gap between word and meaning",
    a: "Ask 3. They answer truthfully.",
    b: "Ask 1.",
    c: "They read you back." },
  { n: "TALK FAST",         r: "+CHARM",
    t: "sell a story under pressure",
    a: "They buy it.",
    b: "They buy it; pick one: it costs · collateral · only buys time.",
    c: "They don't buy it." },
  { n: "USE WHAT YOU KNOW", r: "+SLICK / +HEART",
    t: "bring your background to bear",
    a: "You know. Ask how it helps and act on it.",
    b: "You know enough. Ask one question.",
    c: "You thought you knew." },
  { n: "TAKE A HIT",        r: "no roll",
    t: "violence finds you",
    a: "GM sets severity from fiction.",
    b: "1-body · 2-body · 3-body · dying — by source.",
    c: "Mark the Body track per source." },
  { n: "USE GLITTER",       r: "no roll",
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
const USING_LABELS     = ['CLEAN', 'USING', 'HOOKED', 'LOST'];

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

function SectionTag({ no, label, kicker }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span className="fld">§ {no}</span>
        <span className="headline" style={{ fontSize: 18, letterSpacing: "0.01em" }}>{label}</span>
      </div>
      {kicker && <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>{kicker}</span>}
    </div>
  );
}

function ResultRow({ tag, tone, title, body }) {
  const bg = tone === "accent" ? "var(--accent)" : tone === "glitter" ? "var(--glitter)" : "var(--surface-2)";
  const fg = tone === "accent" ? "var(--accent-on)" : tone === "glitter" ? "#07111a" : "var(--ink)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "62px 1fr", gap: 10, alignItems: "stretch" }}>
      <div style={{ background: bg, color: fg, padding: "4px 6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: tone === "ink" ? "1px solid var(--border-strong)" : "none" }}>
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
    <div className="card" style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 2, borderTop: "2px solid var(--accent)", minHeight: 78 }}>
      <span className="headline" style={{ fontSize: 17, lineHeight: 1 }}>{k}</span>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.12em" }}>+2 TO −1</span>
      <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginTop: 2, lineHeight: 1.35 }}>{g}</span>
      <span className="body" style={{ fontSize: 11, color: "var(--ink-dim)", lineHeight: 1.3, marginTop: "auto", fontStyle: "italic" }}>{d}</span>
    </div>
  );
}

function MoveCard({ m }) {
  const noRoll = m.r.startsWith("no roll");
  return (
    <div className="card" style={{ padding: "9px 11px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
        <span className="headline" style={{ fontSize: 13, lineHeight: 1 }}>{m.n}</span>
        <span className="mono" style={{ fontSize: 11, color: noRoll ? "var(--ink-dim)" : "var(--accent)", letterSpacing: "0.12em", border: "1px solid " + (noRoll ? "var(--ink-faint)" : "var(--accent)"), padding: "1px 5px", whiteSpace: "nowrap" }}>{m.r}</span>
      </div>
      <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", fontStyle: "italic" }}>{m.t}</div>
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

function HarmBar({ value, labels, onChange, accentFull }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {labels.map((label, i) => {
          const filled = i < value;
          const isCurrent = i === value - 1;
          const isMax = i === labels.length - 1;
          const fillColor = isMax && filled ? (accentFull || "var(--accent)") : filled ? "var(--accent-mid)" : "transparent";
          return (
            <div key={i} onClick={() => onChange(value === i + 1 ? i : i + 1)} title={label} style={{ flex: 1, height: 14, background: fillColor, border: `1px solid ${isCurrent ? "var(--accent)" : filled ? "var(--accent-mid)" : "var(--border-strong)"}`, cursor: "pointer", transition: "background 0.1s" }} />
          );
        })}
      </div>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: value === labels.length ? (accentFull || "var(--accent)") : value > 0 ? "var(--ink-mid)" : "var(--ink-dim)" }}>
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
            <div key={i} onClick={() => onChange(isActive ? 0 : i)} title={label} style={{ flex: 1, height: 14, background: isActive ? (isLost ? "var(--glitter)" : "var(--surface-inv)") : "transparent", border: `1px solid ${isActive ? (isLost ? "var(--glitter)" : "var(--ink-soft)") : "var(--border-strong)"}`, cursor: "pointer", transition: "background 0.1s" }} />
          );
        })}
      </div>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: value >= 2 ? "var(--glitter)" : value > 0 ? "var(--ink-mid)" : "var(--ink-dim)" }}>
        {USING_LABELS[value]}
      </span>
    </div>
  );
}

function PCTracker({ pcs, setSess }) {
  const updatePC = (i, field, val) => setSess(s => ({ ...s, pcs: s.pcs.map((pc, j) => j === i ? { ...pc, [field]: val } : pc) }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {pcs.map((pc, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr 1fr 1fr", gap: 10, alignItems: "end", padding: "9px 10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>PC {i + 1}</span>
            <input value={pc.name} onChange={e => updatePC(i, 'name', e.target.value)} placeholder="Name" style={{ background: "transparent", border: "none", borderBottom: "1px solid var(--border-strong)", color: "var(--ink)", fontFamily: "var(--ff-display)", fontSize: 13, letterSpacing: "0.06em", padding: "2px 0", outline: "none", width: "100%" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>BODY HARM</span>
            <HarmBar value={pc.body} labels={HARM_BODY_LABELS} onChange={v => updatePC(i, 'body', v)} accentFull="var(--accent)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>WEAR HARM</span>
            <HarmBar value={pc.wear} labels={HARM_WEAR_LABELS} onChange={v => updatePC(i, 'wear', v)} accentFull="var(--glitter)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span className="fld" style={{ fontSize: 11 }}>USING</span>
            <UsingBar value={pc.using} onChange={v => updatePC(i, 'using', v)} />
          </div>
        </div>
      ))}
    </div>
  );
}

function DebtTrack({ debt, day, setSess }) {
  const pct = Math.max(0, Math.round((1 - debt / 10000) * 100));
  const dayWarn = day >= 25;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="subhead" style={{ fontSize: 11 }}>DEBT · CAMPAIGN CLOCK</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>SHARED</span>
      </div>
      <div style={{ border: "1.5px solid var(--accent)", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>DEBT REMAINING</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, debt: Math.min(10000, s.debt + 500) }))}>▲</button>
            <span className="headline" style={{ fontSize: 22, color: "var(--accent)", lineHeight: 1, minWidth: 88, textAlign: "center" }}>${debt.toLocaleString()}</span>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, debt: Math.max(0, s.debt - 500) }))}>▼</button>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em" }}>{pct}% PAID — STEP $500</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>DAY</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, day: Math.max(1, s.day - 1) }))}>−</button>
            <span className="headline" style={{ fontSize: 26, lineHeight: 1, minWidth: 38, textAlign: "center", color: dayWarn ? "var(--accent)" : "var(--ink)" }}>{day}</span>
            <button style={BTN} onClick={() => setSess(s => ({ ...s, day: Math.min(30, s.day + 1) }))}>+</button>
          </div>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: dayWarn ? "var(--accent)" : "var(--ink-dim)" }}>/ 30 DAYS</span>
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
            <div key={n} onClick={() => setSess(s => ({ ...s, heat: s.heat === n && n > 1 ? n - 1 : n }))} title={`Set heat to ${n}`} style={{ background: bg, color: fg, border: `1.5px solid ${isCurrent ? "var(--accent)" : active ? "var(--accent-mid)" : "var(--border-strong)"}`, padding: "6px 6px 5px", display: "flex", flexDirection: "column", gap: 1, minHeight: 58, cursor: "pointer", opacity: active ? 1 : 0.45, transition: "opacity 0.12s, border-color 0.12s" }}>
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
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}><b style={{ color: "var(--ink)" }}>UP:</b> exposure misses · noisy theft · certain GM moves.</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}><b style={{ color: "var(--ink)" }}>DOWN:</b> lying low · pay someone off · sacrifice a relationship.</span>
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
            <div key={n} style={{ display: "grid", gridTemplateColumns: "12px 56px 1fr", gap: 8, alignItems: "center", padding: "3px 6px", background: isEnd ? "var(--accent)" : "var(--surface-2)", color: isEnd ? "var(--accent-on)" : "var(--ink)" }}>
              <span style={{ width: 10, height: 10, border: "1px solid currentColor", background: isEnd ? "var(--accent-on)" : "transparent" }} />
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em" }}>{label}</span>
              <span className="body" style={{ fontSize: 11, color: isEnd ? "var(--accent-on)" : "var(--ink-mid)", lineHeight: 1.3 }}>{effect}</span>
            </div>
          );
        })}
      </div>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.1em", marginTop: 2 }}>{end}</span>
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
            <div key={k} style={{ border: `1px solid ${isLast ? "var(--glitter)" : "var(--border-strong)"}`, background: isLast ? "var(--glitter)" : "var(--surface)", color: isLast ? "#07111a" : "var(--ink)", padding: "5px 7px", display: "flex", flexDirection: "column", gap: 1, minHeight: 48 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="headline" style={{ fontSize: 12, lineHeight: 1, color: isLast ? "#07111a" : "var(--ink)" }}>{k}</span>
                {!isClean && <span className="glitter-star" style={{ width: 8, height: 8, opacity: isLast ? 0.85 : 0.6 }} />}
              </div>
              <span className="body" style={{ fontSize: 11, color: isLast ? "#07111a" : "var(--ink-mid)", lineHeight: 1.3 }}>{e}</span>
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
      <div style={{ marginTop: 5, padding: "5px 9px", background: "var(--surface-2)", borderLeft: "3px solid var(--accent)", display: "flex", gap: 10, alignItems: "baseline" }}>
        <span className="fld" style={{ flex: "0 0 auto" }}>READ A PERSON · ASK</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{READ_QUESTIONS.join(" · ")}</span>
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
          <HarmLadder name="HARM · BODY" gloss="PHYSICAL" end="DYING → without intervention this session, dead. Permanent." steps={[[1,"1-BODY","fictional only"],[2,"2-BODY","−1 to physical"],[3,"3-BODY","−2 · can't initiate"],[4,"DYING","out unless intervened"]]} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <HarmLadder name="HARM · WEAR" gloss="ATTRITIONAL" end="BREAKING → without intervention this session, permanently removed." steps={[[1,"1-WEAR","fictional only"],[2,"2-WEAR","−1 to social/composure"],[3,"3-WEAR","−2 · can't initiate"],[4,"BREAKING","out unless intervened"]]} />
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
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>BODY · WEAR · USING · PER CHARACTER</span>
          <button onClick={() => setSess(SESSION_DEFAULT)} style={{ fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.12em", background: "transparent", border: "1px solid var(--border)", color: "var(--ink-dim)", padding: "3px 8px", cursor: "pointer" }}>RESET SESSION</button>
        </div>
      </div>
      <PCTracker pcs={sess.pcs} setSess={setSess} />
    </div>
  );
}

// — panel I ————————————————————————————————————————————————————————

function SystemPanel({ sess, setSess }) {
  return (
    <div className="page" style={{
      width: 816, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid var(--border)",
    }}>
      <GMSPanelHeader no="I" eyebrow="GM SCREEN · INSIDE 01 / 05" title={<>THE SYSTEM<br/>&amp; TRACKS</>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <S1_Resolution />
        <S2_Stats />
        <S3_Moves />
        <S4_Tracks sess={sess} setSess={setSess} />
        <S5_Special />
        <S6_PCTracker sess={sess} setSess={setSess} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, paddingTop: 8 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 01 / 05</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>NO MOVE · NO ROLL</span>
      </div>
    </div>
  );
}

// — panel II ———————————————————————————————————————————————————————

function PanelTwo({ notes, setNotes }) {
  return (
    <div className="page" style={{
      width: 816, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid var(--border)",
    }}>
      <GMSPanelHeader no="II" eyebrow="GM SCREEN · INSIDE 02 / 05" title={<>SESSION<br/>NOTES</>} />
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Running notes for this session…"
        style={{
          resize: "none",
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: 0,
          color: "var(--ink)",
          fontFamily: "var(--ff-mono)",
          fontSize: 11,
          lineHeight: 1.55,
          padding: "8px 10px",
          outline: "none",
          width: "100%",
          boxSizing: "border-box",
          minHeight: 300,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 02 / 05</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>THE ARC TRENDS TOWARD BROKEN</span>
      </div>
    </div>
  );
}

// — panel III ——————————————————————————————————————————————————————

function NPCCard({ name, age, want, lever, tell, img }) {
  return (
    <div className="card" style={{
      display: "grid", gridTemplateColumns: "72px 1fr", gap: 9, padding: 8,
    }}>
      {img ? (
        <div className="portrait" style={{ width: 72, height: 88, backgroundImage: `url('${img}')` }}/>
      ) : (
        <div className="plate" style={{ width: 72, height: 88 }}>
          <div className="plate-cap" style={{ fontSize: 11 }}>{name}</div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="headline" style={{ fontSize: 16, lineHeight: 1 }}>{name}</span>
          <span className="fld" style={{ fontSize: 11 }}>{age}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: "1px 6px", marginTop: 1 }}>
          <span className="fld" style={{ fontSize: 11 }}>WANT</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink)" }}>{want}</span>
          <span className="fld" style={{ fontSize: 11 }}>LEVER</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink)" }}>{lever}</span>
          <span className="fld" style={{ fontSize: 11 }}>TELL</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", fontStyle: "italic" }}>{tell}</span>
        </div>
      </div>
    </div>
  );
}

function PanelThree() {
  return (
    <div className="page" style={{
      width: 816, height: 1056, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid var(--border)",
    }}>
      <GMSPanelHeader no="III" eyebrow="GM SCREEN · INSIDE 03 / 05" title={<>WHO'S<br/>IN THE ROOM</>} />

      <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginBottom: 10 }}>
        Each NPC: <b>one want</b> they'd hurt for, <b>one lever</b> the PCs could pull, <b>one tell</b> they don't know they have.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <NPCCard name="ALEX" age="20s" img="art/portraits/alex.png"
          want="Becky to be the friend she pretends to be."
          lever="The dog tag from her dad."
          tell="Hand goes to the pendant when she's about to lie." />
        <NPCCard name="BECKY" age="20s" img="art/portraits/becky.png"
          want="Alex close, without having to be different to keep her."
          lever="The version of herself she could still become."
          tell="Funniest at the worst moments. Half-smirk drops when sober." />
        <NPCCard name="JACOB · JAW-MAN" age="30s" img="art/portraits/jaw-man.png"
          want="Out. But the trade above him won't let him."
          lever="The football season the helmet hit took from him."
          tell="Looks at you and stops talking — almost-says-it, doesn't." />
        <NPCCard name="TED" age="30s" img="art/portraits/ted.png"
          want="To be off this town's radar after Ep 6."
          lever="The faded blue wrist tattoo Becky might recognize."
          tell="Says 'stay safe' the way other people say 'have a nice day.'" />
        <NPCCard name="QUENTIN" age="60s+" img="art/portraits/quentin.png"
          want="To be allowed to know what he knows in peace."
          lever="Two generations of dealers he watched move through the back booth."
          tell="Doesn't nod at people he doesn't recognize, even in his shop." />
        <NPCCard name="CINDY · ALEX'S MOM" age="40s" img="art/portraits/cindy.png"
          want="To not have made the wrong choice — without learning she did."
          lever="The 20-year-old volleyball t-shirt and the yearbook photo."
          tell="Voice goes thin. Walks away from arguments." />
        <NPCCard name="STEVE · CINDY'S BF" age="40s" img="art/portraits/steve.png"
          want="Never to be asked."
          lever="The $2k he took and never confessed to."
          tell="Mumbles. Avoids eye contact. Could exonerate Alex with a sentence and didn't." />
        <NPCCard name="MARCUS" age="20s"
          want="To be remembered for the catch in '32."
          lever="The varsity jacket. Tell him to take it off; he won't."
          tell="Starts every story with 'back in school…'" />
      </div>

      <div className="fld" style={{ marginTop: 12, marginBottom: 5 }}>ICONIC FIXTURES</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {[
          ["THE SILVERADO", "Jaw-man's. Too clean for this part of town."],
          ["THE SMOKE SHOP", "Q's. Red awning, blue OPEN sign, faded signage."],
          ["WASH-N-GO", "Gravel lot. Where deals happen at 11pm."],
        ].map(([t, b]) => (
          <div key={t} className="card" style={{ padding: "7px 9px", borderLeft: "3px solid var(--accent)" }}>
            <div className="subhead" style={{ fontSize: 11 }}>{t}</div>
            <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{b}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 03 / 05</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>EVERY NPC IS HER MIRROR</span>
      </div>
    </div>
  );
}

// — panel IV (new) ————————————————————————————————————————————————

function SchemeRow({ s }) {
  const isNoHeat = s.heat === "—";
  const isHighHeat = s.heat === "HIGH";
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "150px 90px 110px 70px 1fr",
      gap: 8, alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px dashed var(--ink-faint)",
    }}>
      <span className="headline" style={{ fontSize: 14, lineHeight: 1 }}>{s.n}</span>
      <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em" }}>{s.stat}</span>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>{s.yield}</span>
      <span className="mono" style={{
        fontSize: 11, letterSpacing: "0.14em",
        color: isNoHeat ? "var(--ink-dim)" : isHighHeat ? "var(--accent)" : "var(--ink)",
        border: "1px solid " + (isNoHeat ? "var(--ink-faint)" : isHighHeat ? "var(--accent)" : "var(--ink-faint)"),
        padding: "2px 5px",
        textAlign: "center",
      }}>HEAT · {s.heat}</span>
      <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.3 }}>{s.body}</span>
    </div>
  );
}

function PanelFour({ done, toggleDone }) {
  return (
    <div className="page" style={{
      width: 816, height: 1056, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
    }}>
      <GMSPanelHeader no="IV" eyebrow="GM SCREEN · INSIDE 04 / 05" title={<>SCHEMES<br/>&amp; GM CRAFT</>} />

      {/* schemes */}
      <div className="fld" style={{ marginBottom: 4 }}>STANDARD SCHEMES · DECLARE STAT &amp; YIELD FROM FICTION</div>
      <div style={{ marginBottom: 14 }}>
        {GMS_SCHEMES.map(s => <SchemeRow key={s.n} s={s} />)}
        <div style={{
          marginTop: 6, padding: "6px 10px",
          background: "var(--surface-2)", borderLeft: "3px solid var(--accent)",
        }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>VETO</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", marginLeft: 8 }}>
            Online sex work is off the table — canon, Becky's line. Players invent new schemes; assign stat &amp; yield from fiction.
          </span>
        </div>
      </div>

      {/* read questions inline */}
      <div className="fld" style={{ marginBottom: 4 }}>READ A PERSON · ASK</div>
      <div style={{
        marginBottom: 14,
        padding: "7px 10px",
        background: "var(--surface-2)",
      }}>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.4 }}>
          {GMS_READ_QS.join(" · ")}
        </span>
      </div>

      {/* GM agenda */}
      <div className="fld" style={{ marginBottom: 4 }}>GM AGENDA · ALWAYS BE</div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 14px",
        marginBottom: 14,
      }}>
        {GMS_AGENDA.map(l => (
          <div key={l} className="body" style={{ fontSize: 11, color: "var(--ink-mid)", display: "flex", gap: 6 }}>
            <span style={{ color: "var(--accent)", flex: "0 0 auto", fontWeight: 700 }}>▸</span>
            <span>{l}</span>
          </div>
        ))}
      </div>

      {/* Hard moves */}
      <div className="fld" style={{ marginBottom: 4 }}>HARD MOVES ON A 6− · MAKE ONE</div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 14px",
        marginBottom: 14,
      }}>
        {GMS_HARD.map(l => (
          <div key={l} className="body" style={{ fontSize: 11, color: "var(--ink-mid)", display: "flex", gap: 5 }}>
            <span style={{ color: "var(--accent)", flex: "0 0 auto" }}>·</span>
            <span>{l}</span>
          </div>
        ))}
      </div>

      {/* Session end checklist */}
      <div className="fld" style={{ marginBottom: 4 }}>SESSION END · IN ORDER · CLICK TO MARK</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {GMS_SESSION_END.map((s, i) => {
          const isDone = done && done[s.k];
          return (
            <div key={s.k}
              onClick={() => toggleDone(s.k)}
              style={{
                display: "grid", gridTemplateColumns: "26px 70px 1fr",
                gap: 10, alignItems: "baseline",
                opacity: isDone ? 0.45 : 1,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span style={{
                fontFamily: "var(--ff-display)", fontSize: 11,
                color: isDone ? "var(--ink-dim)" : "var(--accent)",
                border: `1px solid ${isDone ? "var(--ink-dim)" : "var(--accent)"}`,
                background: isDone ? "var(--surface-2)" : "transparent",
                padding: "1px 4px", textAlign: "center",
              }}>{isDone ? "✓" : `0${i + 1}`}</span>
              <span className="subhead" style={{ fontSize: 11, textDecoration: isDone ? "line-through" : "none" }}>{s.k}</span>
              <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.3 }}>{s.b}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 04 / 05</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>FARGO DOESN'T HAVE A CUSHION</span>
      </div>
    </div>
  );
}

// — panel V ————————————————————————————————————————————————————————

const GMS_TIPS = [
  {
    section: "PACING",
    items: [
      "Three-act structure per session: trouble arrives, trouble deepens, trouble lands.",
      "Sessions 1–2 establish. Session 3 is the turn. Sessions 4–10 are the fall.",
      "If nothing has happened in 20 minutes, make a hard move.",
      "Debt clock ticks once per session minimum — more if they stall.",
    ],
  },
  {
    section: "ALEX'S ARC",
    items: [
      "Alex is never a prop. She has her own beat at least once per session.",
      "Her Using track advances when she's in crisis — not on a schedule.",
      "Let a PC save her from something small. Let the big thing be harder.",
      "She asks for help in a way that makes it easy to say no.",
    ],
  },
  {
    section: "TABLE SAFETY",
    items: [
      "Check the safety sheet before every session. Veil = skip the detail. Line = skip the scene.",
      "If a player goes quiet, pull focus elsewhere first. Check in at the break.",
      "X-card doesn't need explanation. Rewind, don't justify.",
      "Debrief is mandatory. Five minutes. How are you, the person.",
    ],
  },
  {
    section: "TONE",
    items: [
      "Gulf Coast working-class. Specific language, specific places.",
      "Drug use is mundane, not cinematic. Show the routine, not the high.",
      "Violence has weight. Nobody shakes it off.",
      "The best moments are two people talking about something other than the real thing.",
    ],
  },
];

const GMS_FIRST_SESSION = [
  "Open on Alex — a small want, a small obstacle. Let PCs choose to help.",
  "Name three locations before the session ends. Make each smell like something.",
  "Introduce Jaw-man obliquely. A text. A car. Someone else's nervousness.",
  "End with the debt clock visible. $10,000. Say it out loud.",
];

const GMS_BETWEEN_SESSIONS = [
  "What did each PC do that fits their archetype? That's one XP trigger.",
  "What did each PC bond say was true? Was it tested?",
  "Did anyone miss a roll? That's XP. Did anyone roll a 10+? Note it.",
  "Where is Alex's Using track? Where is the debt clock? Adjust Heat.",
  "Pick one NPC who should have changed. How did they change?",
];

function PanelFive() {
  return (
    <div className="page" style={{
      width: 816, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid var(--border)",
    }}>
      <GMSPanelHeader no="V" eyebrow="GM SCREEN · GUIDANCE" title={<>TIPS &amp;<br/>GUIDANCE</>} />

      {/* Tips grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px", marginBottom: 16 }}>
        {GMS_TIPS.map(({ section, items }) => (
          <div key={section} style={{ marginBottom: 14 }}>
            <div className="fld" style={{ marginBottom: 5 }}>{section}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {items.map(item => (
                <div key={item} className="body" style={{ fontSize: 11, color: "var(--ink-mid)", display: "flex", gap: 6, lineHeight: 1.35 }}>
                  <span style={{ color: "var(--accent)", flex: "0 0 auto", fontWeight: 700 }}>▸</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* First session */}
      <div className="fld" style={{ marginBottom: 5 }}>FIRST SESSION CHECKLIST</div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 20px",
        marginBottom: 16,
        padding: "10px 12px",
        background: "var(--surface-2)",
        borderLeft: "3px solid var(--accent)",
      }}>
        {GMS_FIRST_SESSION.map((item, i) => (
          <div key={i} className="body" style={{ fontSize: 11, color: "var(--ink-mid)", display: "flex", gap: 8, lineHeight: 1.35 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--accent)", flex: "0 0 auto" }}>0{i + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Between sessions */}
      <div className="fld" style={{ marginBottom: 5 }}>BETWEEN SESSIONS · QUESTIONS TO ANSWER</div>
      <div style={{
        display: "flex", flexDirection: "column", gap: 5,
        padding: "10px 12px",
        background: "var(--surface-2)",
        borderLeft: "3px solid var(--ink-soft)",
      }}>
        {GMS_BETWEEN_SESSIONS.map((item, i) => (
          <div key={i} className="body" style={{ fontSize: 11, color: "var(--ink-mid)", display: "flex", gap: 8, lineHeight: 1.35 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", flex: "0 0 auto" }}>0{i + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Quick reminder strip */}
      <div style={{
        marginTop: 16,
        background: "var(--accent)", color: "var(--accent-on)",
        padding: "10px 14px",
        display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap",
      }}>
        {[
          ["FORWARD", "Every scene must push toward or away from saving Alex."],
          ["COST",    "Every 7–9 needs a real cost. If you can't name it, roll back."],
          ["NAME IT", "Jaw-man's delivery. Ted's car. Becky's text. Make it specific."],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 7, alignItems: "baseline", flex: "1 1 180px" }}>
            <span className="subhead" style={{ fontSize: 11, color: "var(--accent-on)", flexShrink: 0 }}>{k} ·</span>
            <span className="body" style={{ fontSize: 11, color: "var(--accent-on)", opacity: 0.85, lineHeight: 1.3 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 05 / 05</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>THE TABLE IS ALSO THE GAME</span>
      </div>
    </div>
  );
}

function GMScreenArtboard() {
  const [gm, setGm]     = useLS('dig.sys.gm', { done: {}, notes: '' });
  const [sess, setSess] = useLS('dig.sys.session', SESSION_DEFAULT);

  const toggleDone = (k) => setGm(s => ({ ...s, done: { ...s.done, [k]: !s.done[k] } }));
  const setNotes   = (n) => setGm(s => ({ ...s, notes: n }));

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <SystemPanel sess={sess} setSess={setSess} />
      <PanelTwo notes={gm.notes} setNotes={setNotes} />
      <PanelThree />
      <PanelFour done={gm.done} toggleDone={toggleDone} />
      <PanelFive />
    </div>
  );
}

window.GMScreenArtboard = GMScreenArtboard;
