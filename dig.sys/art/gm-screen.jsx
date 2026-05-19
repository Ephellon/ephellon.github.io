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
        <span className="mono" style={{ fontSize: 7, letterSpacing: "0.14em" }}>RESULT</span>
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
      <span className="mono" style={{ fontSize: 7.5, color: "var(--ink-dim)", letterSpacing: "0.08em", lineHeight: 1.3 }}>{g}</span>
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
          fontSize: 7.5, letterSpacing: "0.12em",
          color: m.r.startsWith("no") ? "var(--ink-dim)" : "var(--accent)",
          whiteSpace: "nowrap",
        }}>{m.r}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: "1px 5px", marginTop: 1 }}>
        {m.a && <><span className="mono" style={{ fontSize: 8, color: "var(--ink)" }}>10+</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.a}</span></>}
        {m.b && <><span className="mono" style={{ fontSize: 8, color: m.r.startsWith("no") ? "var(--ink-dim)" : "var(--glitter)" }}>{m.r.startsWith("no") ? "·" : "7–9"}</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.b}</span></>}
        {m.c && <><span className="mono" style={{ fontSize: 8, color: "var(--accent)" }}>6−</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink-mid)", lineHeight: 1.3 }}>{m.c}</span></>}
      </div>
    </div>
  );
}

// — panel I ————————————————————————————————————————————————————————

function PanelOne() {
  return (
    <div className="page" style={{
      width: 816, height: 1056, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid var(--border)",
    }}>
      <GMSPanelHeader no="I" eyebrow="GM SCREEN · INSIDE 01 / 04" title={<>THE DICE<br/>&amp; THE PCs</>} />

      <div className="body" style={{ fontSize: 11.5, color: "var(--ink-mid)", marginBottom: 10 }}>
        Every move: roll <b style={{ color: "var(--ink)" }}>2d6 + stat</b>. The dice tell you which row.
        Stats range <span className="mono" style={{ color: "var(--ink)" }}>−1 to +2</span> at creation.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
        <GMSResultRow result="10+" tone="ink"     title="STRONG HIT"           body="The fiction goes your way." />
        <GMSResultRow result="7–9" tone="glitter" title="MIXED HIT"            body="You get part of it. There's a cost." />
        <GMSResultRow result="6−"  tone="accent"  title="MISS · MARK XP"       body="GM makes a move. Mark XP." />
      </div>

      <div className="fld" style={{ marginBottom: 6 }}>STATS · STANDARD ARRAY +2 / +1 / +1 / 0 / −1</div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {GMS_STATS.map(([k, g]) => <GMSStatChip key={k} k={k} g={g} />)}
      </div>

      <div className="fld" style={{ marginBottom: 4 }}>BASIC MOVES</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {GMS_MOVES.map(m => <GMSMove key={m.n} m={m} />)}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 01 / 04</span>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>NO MOVE · NO ROLL</span>
      </div>
    </div>
  );
}

// — panel II ———————————————————————————————————————————————————————

function HeatStep({ n, k, g, idx, active, dimmed, onClick }) {
  const isMax = idx === 5;
  const isHigh = idx === 4;
  const isMid = idx === 2 || idx === 3;
  const bg = active ? (isMax ? "var(--accent)" : "var(--surface-2)") : isMax ? "var(--accent)" : "var(--surface)";
  const fg = isMax ? "var(--accent-on)" : "var(--ink)";
  const border = active ? "var(--ink)" :
                 isMax  ? "var(--accent)" :
                 isHigh ? "var(--accent)" :
                 isMid  ? "var(--accent-mid)" :
                 "var(--border-strong)";
  return (
    <div
      onClick={onClick}
      style={{
        background: bg, color: fg,
        border: `2px solid ${active ? "var(--ink)" : border}`,
        outline: active ? "2px solid var(--ink-mid)" : "none",
        padding: "6px 7px 5px",
        display: "flex", flexDirection: "column", gap: 1,
        minHeight: 56,
        opacity: dimmed ? 0.35 : 1,
        cursor: "pointer",
        transition: "opacity 0.15s, border 0.1s",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--ff-display)", fontSize: 10, letterSpacing: "0.04em", opacity: 0.7 }}>{n}</span>
        {active
          ? <span className="mono" style={{ fontSize: 7, letterSpacing: "0.12em", color: "var(--ink)" }}>NOW</span>
          : isMax && <span className="mono" style={{ fontSize: 7, letterSpacing: "0.12em", opacity: 0.6 }}>END</span>}
      </div>
      <span className="headline" style={{ fontSize: 13, lineHeight: 1, color: fg }}>{k}</span>
      <span className="mono" style={{ fontSize: 7.5, opacity: 0.72, lineHeight: 1.25 }}>{g}</span>
    </div>
  );
}

function HarmStep({ label, gloss, end }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "10px 60px 1fr",
      gap: 6, alignItems: "center",
      padding: "3px 6px",
      background: end ? "var(--accent)" : "var(--surface-2)",
      color: end ? "var(--accent-on)" : "var(--ink)",
    }}>
      <span style={{
        width: 8, height: 8, border: "1px solid currentColor",
        background: end ? "var(--accent-on)" : "transparent",
      }} />
      <span className="mono" style={{ fontSize: 8.5, letterSpacing: "0.08em" }}>{label}</span>
      <span className="body" style={{ fontSize: 9.5, lineHeight: 1.3 }}>{gloss}</span>
    </div>
  );
}

function PanelTwo({ heat, setHeat, notes, setNotes }) {
  return (
    <div className="page" style={{
      width: 816, height: 1056, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
      borderRight: "1px solid var(--border)",
    }}>
      <GMSPanelHeader no="II" eyebrow="GM SCREEN · INSIDE 02 / 04" title={<>THE FOUR<br/>TRACKS</>} />

      {/* Debt */}
      <div className="fld" style={{ marginBottom: 4 }}>DEBT · CAMPAIGN CLOCK · 30 DAYS</div>
      <div style={{
        border: "1.5px solid var(--accent)",
        padding: "9px 12px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 10, marginBottom: 6,
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="mono" style={{ fontSize: 7.5, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>STARTING</span>
          <span className="headline" style={{ fontSize: 26, color: "var(--accent)", lineHeight: 1 }}>$10,000</span>
        </div>
        <span className="mono" style={{ fontSize: 12, color: "var(--ink-dim)" }}>→</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span className="mono" style={{ fontSize: 7.5, letterSpacing: "0.14em", color: "var(--ink-dim)" }}>BEFORE DAY 30</span>
          <span className="headline" style={{ fontSize: 26, lineHeight: 1 }}>$0</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
        <div style={{ padding: "4px 8px", background: "var(--surface-2)", borderLeft: "3px solid var(--accent)" }}>
          <span className="mono" style={{ fontSize: 8, color: "var(--accent)", letterSpacing: "0.12em" }}>DEBT &gt; $0 @ DAY 30</span>
          <div className="body" style={{ fontSize: 9.5, color: "var(--ink-mid)" }}>Alex dies. Campaign ends.</div>
        </div>
        <div style={{ padding: "4px 8px", background: "var(--surface-2)", borderLeft: "3px solid var(--ink-soft)" }}>
          <span className="mono" style={{ fontSize: 8, color: "var(--ink)", letterSpacing: "0.12em" }}>DEBT = $0 BEFORE 30</span>
          <div className="body" style={{ fontSize: 9.5, color: "var(--ink-mid)" }}>Pyrrhic save. Cost: everything else.</div>
        </div>
      </div>

      {/* Heat */}
      <div className="fld" style={{ marginBottom: 4 }}>HEAT · PARTY-SHARED · 6 SEGMENTS</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 3, marginBottom: 4 }}>
        {GMS_HEAT_STEPS.map((s, i) => (
          <HeatStep key={s.n} {...s} idx={i}
            active={heat === i + 1}
            dimmed={heat > 0 && heat < i + 1}
            onClick={() => setHeat(heat === i + 1 ? i : i + 1)}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 14 }}>
        <span className="body" style={{ fontSize: 9, color: "var(--ink-mid)" }}>
          <b style={{ color: "var(--ink)" }}>UP:</b> exposure misses · noisy theft · GM moves.
        </span>
        <span className="body" style={{ fontSize: 9, color: "var(--ink-mid)" }}>
          <b style={{ color: "var(--ink)" }}>DOWN:</b> lying low · pay off · sacrifice.
        </span>
      </div>

      {/* Harm */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <div className="fld" style={{ marginBottom: 4 }}>HARM · BODY · PER PC</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <HarmStep label="1-BODY" gloss="fictional only" />
            <HarmStep label="2-BODY" gloss="−1 to physical" />
            <HarmStep label="3-BODY" gloss="−2 · can't initiate" />
            <HarmStep label="DYING"  gloss="out unless intervened" end />
          </div>
        </div>
        <div>
          <div className="fld" style={{ marginBottom: 4 }}>HARM · WEAR · PER PC</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <HarmStep label="1-WEAR"   gloss="fictional only" />
            <HarmStep label="2-WEAR"   gloss="−1 to social" />
            <HarmStep label="3-WEAR"   gloss="−2 · can't initiate" />
            <HarmStep label="BREAKING" gloss="removed unless intervened" end />
          </div>
        </div>
      </div>

      {/* Using */}
      <div className="fld" style={{ marginBottom: 4 }}>USING · GLITTER TRACK · PER PC · ONE PER DOSE</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
        {[
          ["CLEAN",  "no effect"],
          ["USING",  "dose/session or +1 Wear"],
          ["HOOKED", "dose mid-session or −1 Cool"],
          ["LOST",   "you're Steve · GM narrates"],
        ].map(([k, g], i) => {
          const isLast = i === 3;
          return (
            <div key={k} style={{
              border: `1px solid ${isLast ? "var(--glitter)" : "var(--border-strong)"}`,
              background: isLast ? "var(--glitter)" : "var(--surface)",
              color: isLast ? "#07111a" : "var(--ink)",
              padding: "5px 7px",
              display: "flex", flexDirection: "column", gap: 1,
              minHeight: 44,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="headline" style={{ fontSize: 12, lineHeight: 1, color: isLast ? "#07111a" : "var(--ink)" }}>{k}</span>
                {i > 0 && <span className="glitter-star" style={{ width: 7, height: 7, opacity: isLast ? 0.9 : 0.55 }} />}
              </div>
              <span className="body" style={{ fontSize: 8.5, color: isLast ? "#07111a" : "var(--ink-mid)", lineHeight: 1.3 }}>{g}</span>
            </div>
          );
        })}
      </div>

      {/* Session Notes */}
      <div className="fld" style={{ marginTop: 14, marginBottom: 4 }}>SESSION NOTES</div>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Running notes for this session…"
        style={{
          flex: 1,
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
          minHeight: 80,
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 02 / 04</span>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>THE ARC TRENDS TOWARD BROKEN</span>
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
          <div className="plate-cap" style={{ fontSize: 8 }}>{name}</div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="headline" style={{ fontSize: 16, lineHeight: 1 }}>{name}</span>
          <span className="fld" style={{ fontSize: 8 }}>{age}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: "1px 6px", marginTop: 1 }}>
          <span className="fld" style={{ fontSize: 8 }}>WANT</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink)" }}>{want}</span>
          <span className="fld" style={{ fontSize: 8 }}>LEVER</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink)" }}>{lever}</span>
          <span className="fld" style={{ fontSize: 8 }}>TELL</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink-mid)", fontStyle: "italic" }}>{tell}</span>
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
      <GMSPanelHeader no="III" eyebrow="GM SCREEN · INSIDE 03 / 04" title={<>WHO'S<br/>IN THE ROOM</>} />

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
            <div className="subhead" style={{ fontSize: 10 }}>{t}</div>
            <div className="body" style={{ fontSize: 10, color: "var(--ink-mid)" }}>{b}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 03 / 04</span>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>EVERY NPC IS HER MIRROR</span>
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
      <span className="mono" style={{ fontSize: 9.5, color: "var(--accent)", letterSpacing: "0.1em" }}>{s.stat}</span>
      <span className="mono" style={{ fontSize: 10, color: "var(--ink)" }}>{s.yield}</span>
      <span className="mono" style={{
        fontSize: 8.5, letterSpacing: "0.14em",
        color: isNoHeat ? "var(--ink-dim)" : isHighHeat ? "var(--accent)" : "var(--ink)",
        border: "1px solid " + (isNoHeat ? "var(--ink-faint)" : isHighHeat ? "var(--accent)" : "var(--ink-faint)"),
        padding: "2px 5px",
        textAlign: "center",
      }}>HEAT · {s.heat}</span>
      <span className="body" style={{ fontSize: 10.5, color: "var(--ink-mid)", lineHeight: 1.3 }}>{s.body}</span>
    </div>
  );
}

function PanelFour({ done, toggleDone }) {
  return (
    <div className="page" style={{
      width: 816, height: 1056, padding: "26px 28px", boxSizing: "border-box",
      display: "flex", flexDirection: "column",
    }}>
      <GMSPanelHeader no="IV" eyebrow="GM SCREEN · INSIDE 04 / 04" title={<>SCHEMES<br/>&amp; GM CRAFT</>} />

      {/* schemes */}
      <div className="fld" style={{ marginBottom: 4 }}>STANDARD SCHEMES · DECLARE STAT &amp; YIELD FROM FICTION</div>
      <div style={{ marginBottom: 14 }}>
        {GMS_SCHEMES.map(s => <SchemeRow key={s.n} s={s} />)}
        <div style={{
          marginTop: 6, padding: "6px 10px",
          background: "var(--surface-2)", borderLeft: "3px solid var(--accent)",
        }}>
          <span className="mono" style={{ fontSize: 9, color: "var(--accent)", letterSpacing: "0.14em" }}>VETO</span>
          <span className="body" style={{ fontSize: 10, color: "var(--ink-mid)", marginLeft: 8 }}>
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
        <span className="body" style={{ fontSize: 10, color: "var(--ink-mid)", lineHeight: 1.4 }}>
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
          <div key={l} className="body" style={{ fontSize: 10.5, color: "var(--ink-mid)", display: "flex", gap: 6 }}>
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
          <div key={l} className="body" style={{ fontSize: 10, color: "var(--ink-mid)", display: "flex", gap: 5 }}>
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
              <span className="body" style={{ fontSize: 10, color: "var(--ink-mid)", lineHeight: 1.3 }}>{s.b}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", paddingTop: 10 }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>PANEL 04 / 04</span>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>FARGO DOESN'T HAVE A CUSHION</span>
      </div>
    </div>
  );
}

function GMScreenArtboard() {
  const [gm, setGm] = useLS('dig.sys.gm', { heat: 0, done: {}, notes: '' });

  const setHeat  = (h) => setGm(s => ({ ...s, heat: h }));
  const toggleDone = (k) => setGm(s => ({ ...s, done: { ...s.done, [k]: !s.done[k] } }));
  const setNotes = (n) => setGm(s => ({ ...s, notes: n }));

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <PanelOne />
      <PanelTwo heat={gm.heat} setHeat={setHeat} notes={gm.notes} setNotes={setNotes} />
      <PanelThree />
      <PanelFour done={gm.done} toggleDone={toggleDone} />
    </div>
  );
}

window.GMScreenArtboard = GMScreenArtboard;
