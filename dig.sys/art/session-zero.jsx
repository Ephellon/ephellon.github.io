// art/session-zero.jsx — letter portrait 816 × 1056. Interactive with localStorage.

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

const TOPICS = [
  { id: "drug_use",      label: "Drug use, on-screen",        hint: "Glitter is core to the setting — pick how detailed" },
  { id: "withdrawal",    label: "Withdrawal / craving" },
  { id: "violence",      label: "Physical violence" },
  { id: "coercion",      label: "Coercion / threats" },
  { id: "sex_coercion",  label: "Sexual coercion",            hint: "Implied vs. explicit vs. not at all" },
  { id: "self_harm",     label: "Self-harm" },
  { id: "overdose",      label: "Overdose / death" },
  { id: "parents",       label: "Parents failing children" },
  { id: "slurs",         label: "Slurs / racism" },
  { id: "homophobia",    label: "Homophobia / transphobia" },
  { id: "sex_work",      label: "Sex work" },
  { id: "animal_harm",   label: "Animal harm",                hint: "There is one optional dog in the script" },
];

const SZ_DEFAULT = {
  topics: {},
  gm_name: '', gm_date: '',
  p1_name: '', p1_date: '',
  p2_name: '', p2_date: '',
  p3_name: '', p3_date: '',
};

const CHIPS = [
  { key: "OK",   border: "var(--ink-faint)",     color: "var(--ink-mid)",    bgSel: "var(--surface-2)" },
  { key: "VEIL", border: "var(--border-strong)", color: "var(--ink)",        bgSel: "var(--surface-2)" },
  { key: "LINE", border: "var(--accent)",        color: "var(--accent)",     bgSel: "var(--accent)" },
];

function CheckRow({ label, hint, value, onChange }) {
  const isSet = !!value;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "auto 1fr auto auto auto",
      gap: 12, alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px dashed var(--ink-faint)",
    }}>
      <span style={{
        width: 16, height: 16, border: "1.5px solid var(--ink)", borderRadius: 2,
        display: "inline-block", flexShrink: 0,
        background: isSet ? "var(--ink)" : "transparent",
        transition: "background 0.15s",
      }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className="body" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{label}</span>
        {hint && <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.12em" }}>{hint}</span>}
      </div>
      {CHIPS.map(({ key, border, color, bgSel }) => {
        const sel = value === key;
        const isLine = key === "LINE";
        return (
          <span
            key={key}
            onClick={() => onChange(sel ? null : key)}
            style={{
              fontFamily: "var(--ff-mono)", fontSize: 11, letterSpacing: "0.16em",
              padding: "4px 8px",
              border: `1px solid ${border}`,
              color: sel && isLine ? "var(--accent-on)" : color,
              background: sel ? bgSel : "transparent",
              cursor: "pointer",
              userSelect: "none",
              transition: "background 0.12s",
            }}
          >{sel ? "●" : "○"} {key}</span>
        );
      })}
    </div>
  );
}

function SigField({ label, nameVal, dateVal, onName, onDate }) {
  const inp = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--ink)",
    color: "var(--ink)",
    fontFamily: "var(--ff-body)",
    fontSize: 13,
    width: "100%",
    outline: "none",
    padding: "2px 0",
    height: 28,
    boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <input
          type="text"
          value={nameVal}
          onChange={(e) => onName(e.target.value)}
          placeholder="—"
          style={{ ...inp, flex: 1 }}
        />
        <input
          type="text"
          value={dateVal}
          onChange={(e) => onDate(e.target.value)}
          placeholder="DATE"
          style={{ ...inp, width: 72, flex: "0 0 72px", fontSize: 11 }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>{label}</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>DATE</span>
      </div>
    </div>
  );
}

function SessionZeroArtboard() {
  const [sz, setSz] = useLS('dig.sys.sz', SZ_DEFAULT);

  const setTopic = (id, val) => setSz(s => ({ ...s, topics: { ...s.topics, [id]: val } }));
  const setSig = (field, val) => setSz(s => ({ ...s, [field]: val }));

  const left  = TOPICS.slice(0, 6);
  const right = TOPICS.slice(6);

  return (
    <div className="page" style={{
      width: "100%", height: "auto",
      display: "flex", flexDirection: "column",
    }}>
      {/* header */}
      <div style={{
        background: "var(--surface-inv)",
        color: "var(--surface)",
        padding: "16px 36px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "4px solid var(--accent)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, lineHeight: 1.1 }}>
          <div className="brand-mark" style={{ width: 44, height: 44, flexShrink: 0 }} aria-label="dig.sys"/>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.55 }}>
              DIGITAL SISSY · SHEET 06 / 06
            </span>
            <span className="headline" style={{ fontSize: 30, color: "var(--surface)" }}>
              SESSION ZERO · SAFETY SHEET
            </span>
          </div>
        </div>
        <span style={{
          fontFamily: "var(--ff-display)", fontSize: 18,
          border: "1.5px solid var(--surface)", padding: "3px 10px",
          letterSpacing: "0.1em", color: "var(--surface)",
        }}>SIGN BEFORE PLAY</span>
      </div>

      {/* body */}
      <div style={{ flex: 1, padding: "26px 36px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
        {/* premise */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 22, alignItems: "flex-start" }}>
          <div>
            <span className="fld">§ 01 · WHAT THIS IS</span>
            <div className="headline" style={{ fontSize: 26, marginTop: 4, lineHeight: 0.98 }}>
              WE'RE GOING TO WATCH SOMEONE GO UNDER.
              WE ARE GOING TO TRY TO STOP IT.
            </div>
            <div className="body" style={{ fontSize: 12.5, color: "var(--ink-mid)", marginTop: 10 }}>
              Alex is twenty-something. Gulf Coast. Bad year. There's a drug called <b style={{ color: "var(--glitter)" }}>Glitter</b> and a
              man called <b>Jaw-man</b> and a sister-shaped figure called <b>Becky</b>, and the PCs are the
              people who can still hear Alex's name in their head without flinching. We will play three
              to five sessions and then we will be done. Maybe she'll be okay. Probably not. The game is
              what the table does in the meantime.
            </div>
          </div>
          <div className="card" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
            <span className="fld">TONE WE WANT</span>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11.5, color: "var(--ink-mid)", lineHeight: 1.35 }}>
              <li>Grounded. Specific. Sad.</li>
              <li>The world shouts; people don't.</li>
              <li>Working-class. Particular.</li>
            </ul>
            <span className="fld" style={{ marginTop: 6 }}>TONE WE AVOID</span>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11.5, color: "var(--ink-mid)", lineHeight: 1.35 }}>
              <li>Cool. Stylized misery.</li>
              <li>Cyberpunk gloss.</li>
              <li>Junkie-as-aesthetic.</li>
            </ul>
          </div>
        </div>

        {/* content topics */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span className="fld">§ 02 · LINES & VEILS</span>
              <div className="headline" style={{ fontSize: 22, marginTop: 2 }}>
                FOR EACH TOPIC: OK ON-SCREEN, VEIL (OFFSCREEN), OR LINE (DON'T).
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--ink-dim)" }}>EVERYONE FILLS THIS OUT</span>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--ink-dim)" }}>·</span>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--accent)" }}>STRICTEST WINS</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 28px", marginTop: 8 }}>
            <div>
              {left.map(t => (
                <CheckRow
                  key={t.id}
                  label={t.label}
                  hint={t.hint}
                  value={sz.topics[t.id] || null}
                  onChange={(val) => setTopic(t.id, val)}
                />
              ))}
            </div>
            <div>
              {right.map(t => (
                <CheckRow
                  key={t.id}
                  label={t.label}
                  hint={t.hint}
                  value={sz.topics[t.id] || null}
                  onChange={(val) => setTopic(t.id, val)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* tools */}
        <div>
          <span className="fld">§ 03 · TOOLS WE USE</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 6 }}>
            {[
              ["X · CARD", "Tap, type, or say it. Scene rewinds. No discussion required."],
              ["OPEN DOOR", "Step out of any scene. No reason owed."],
              ["PAUSE", "Stop the clock. Talk as players, not characters."],
              ["DEBRIEF", "Five minutes at the end. How are you, the person."],
            ].map(([t, b]) => (
              <div key={t} className="card" style={{
                padding: "10px 12px",
                borderTop: "3px solid var(--accent)",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                <span className="headline" style={{ fontSize: 17 }}>{t}</span>
                <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GM promise */}
        <div style={{
          background: "var(--accent)", color: "var(--accent-on)",
          padding: "14px 18px",
          display: "flex", gap: 20, alignItems: "center",
        }}>
          <span className="headline" style={{ fontSize: 36, flex: "0 0 auto", color: "var(--accent-on)" }}>✕</span>
          <div>
            <div className="subhead" style={{ fontSize: 11, color: "var(--accent-on)" }}>THE GM PROMISE</div>
            <div className="body" style={{ fontSize: 13.5, fontWeight: 500, marginTop: 2, color: "var(--accent-on)" }}>
              I will honor every line without asking why. I will veil what you veil. I will check in.
              I will end early if we need to. Alex is the protagonist — none of you are.
            </div>
          </div>
        </div>

        {/* signatures */}
        <div>
          <span className="fld">§ 04 · SIGNATURES</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 6 }}>
            <SigField label="GM"     nameVal={sz.gm_name} dateVal={sz.gm_date} onName={v => setSig('gm_name', v)} onDate={v => setSig('gm_date', v)} />
            <SigField label="PLAYER" nameVal={sz.p1_name} dateVal={sz.p1_date} onName={v => setSig('p1_name', v)} onDate={v => setSig('p1_date', v)} />
            <SigField label="PLAYER" nameVal={sz.p2_name} dateVal={sz.p2_date} onName={v => setSig('p2_name', v)} onDate={v => setSig('p2_date', v)} />
            <SigField label="PLAYER" nameVal={sz.p3_name} dateVal={sz.p3_date} onName={v => setSig('p3_name', v)} onDate={v => setSig('p3_date', v)} />
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{
        background: "var(--surface-inv)", color: "var(--surface)",
        padding: "10px 36px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "4px solid var(--accent)",
        opacity: 0.95,
      }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
          DIGITAL · <span style={{ color: "var(--accent)" }}>SISSY</span> · SESSION ZERO · v0.4
        </span>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
          KEEP THIS SHEET · REVISIT BETWEEN SESSIONS
        </span>
      </div>
    </div>
  );
}

window.SessionZeroArtboard = SessionZeroArtboard;
