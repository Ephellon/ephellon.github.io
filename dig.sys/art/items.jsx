// art/items.jsx — print-and-cut handout cards (Glitter, Bills, Laser).

function ItemCard({ no, kind, label, name, tag, accent, body, stats, footer, art }) {
  // Print-ready card — always renders on PURE WHITE so it prints clean
  // regardless of which theme the canvas is in.
  const PAPER = "#ffffff";
  const INK   = "#0d1422";
  const INK_MID = "rgba(13,20,34,0.66)";
  const INK_DIM = "rgba(13,20,34,0.46)";
  const INK_FAINT = "rgba(13,20,34,0.24)";
  const BORDER = "rgba(13,20,34,0.16)";
  const BORDER_STRONG = "rgba(13,20,34,0.32)";

  // accent = "glitter" | "ink" | "accent"
  const headBg =
    accent === "glitter" ? "var(--glitter)" :
    accent === "accent"  ? "var(--accent)"  :
    "#f3f5f8";
  const headFg =
    accent === "glitter" ? "#07111a" :
    accent === "accent"  ? "#ffffff" :
    INK;
  return (
    <div style={{
      width: 360, height: 540,
      background: PAPER,
      color: INK,
      border: `1px solid ${BORDER_STRONG}`,
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
      boxShadow: "0 14px 28px -16px rgba(0,0,0,0.45)",
    }}>
      {/* perforation hint */}
      <div style={{
        position: "absolute", top: -1, left: 0, right: 0, height: 6,
        backgroundImage: `repeating-linear-gradient(90deg, ${BORDER_STRONG} 0 6px, transparent 6px 12px)`,
      }} />

      {/* header strip */}
      <div style={{
        background: headBg, color: headFg,
        padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1px solid ${BORDER_STRONG}`,
      }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", opacity: 0.85 }}>{kind}</span>
          <span style={{ fontFamily: "var(--ff-display)", fontSize: 22, letterSpacing: "0.04em", color: headFg }}>{label}</span>
        </div>
        <span style={{
          fontFamily: "var(--ff-display)", fontSize: 16,
          border: `1.5px solid ${headFg}`,
          padding: "2px 7px", letterSpacing: "0.08em",
          color: headFg,
        }}>{no}</span>
      </div>

      {/* art slot — image fills the slot edge-to-edge */}
      <div style={{
        height: 200, position: "relative",
        borderBottom: `1px solid ${BORDER}`,
        background: PAPER,
        backgroundImage: `url('${art}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}/>

      {/* body */}
      <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="headline" style={{ fontSize: 22, lineHeight: 0.95, color: INK }}>{name}</span>
          <span className="mono" style={{ fontSize: 9, color: INK_DIM, letterSpacing: "0.14em" }}>{tag}</span>
        </div>

        <div className="body" style={{ fontSize: 12, color: INK_MID }}>{body}</div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          {stats.map(([k, v]) => (
            <div key={k} style={{
              display: "grid", gridTemplateColumns: "70px 1fr",
              gap: 8, paddingTop: 4, borderTop: `1px dashed ${INK_FAINT}`,
            }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: INK_DIM }}>{k}</span>
              <span className="body" style={{ fontSize: 11, color: INK }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* footer — keep contrast clean for print */}
      <div style={{
        background: INK, color: PAPER,
        padding: "8px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
      }}>
        <span className="mono" style={{ fontSize: 9, letterSpacing: "0.2em" }}>{footer}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--accent)" }}>
            DIG · SYS
          </span>
          <div className="brand-mark" style={{ width: 18, height: 18 }} aria-label=""/>
        </div>
      </div>
    </div>
  );
}

// Glitter vial — iconic art (drawn on white card, dark linework hardcoded)
function GlitterArt() {
  const INK = "#0d1422";
  return (
    <div style={{ position: "relative", width: 200, height: 140 }}>
      <div style={{
        position: "absolute", left: 80, top: 10, width: 40, height: 110,
        background: "linear-gradient(180deg, rgba(42,168,255,0.18) 0%, rgba(42,168,255,0.6) 55%, rgba(42,168,255,0.88) 100%)",
        border: `1.5px solid ${INK}`,
        borderRadius: "6px 6px 14px 14px",
        boxShadow: "inset 6px 0 0 rgba(255,255,255,0.2)",
      }}>
        {/* dropper top */}
        <div style={{
          position: "absolute", top: -16, left: -2, width: 44, height: 18,
          background: INK, borderRadius: "3px 3px 0 0",
          border: `1.5px solid ${INK}`,
        }} />
        <div style={{
          position: "absolute", top: -22, left: 14, width: 12, height: 8,
          background: "var(--accent)",
        }} />
      </div>
      <span className="glitter-star" style={{ position: "absolute", top: 14, left: 22, width: 14, height: 14 }}/>
      <span className="glitter-star" style={{ position: "absolute", top: 60, left: 30, width: 9, height: 9 }}/>
      <span className="glitter-star" style={{ position: "absolute", top: 100, left: 50, width: 11, height: 11 }}/>
      <span className="glitter-star" style={{ position: "absolute", top: 22, right: 14, width: 10, height: 10 }}/>
      <span className="glitter-star" style={{ position: "absolute", top: 86, right: 30, width: 13, height: 13 }}/>
      <span className="glitter-star" style={{ position: "absolute", top: 120, right: 60, width: 7, height: 7 }}/>
    </div>
  );
}

// Bills — yellow is allowed as the in-world product color, just not our chrome.
function BillsArt() {
  const INK = "#0d1422";
  return (
    <div style={{ position: "relative", width: 220, height: 130 }}>
      <div style={{
        position: "absolute", left: 40, top: 35, width: 140, height: 60,
        background: "#f0c84a",
        border: `1.5px solid ${INK}`,
        borderRadius: 6,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          position: "absolute", left: "50%", top: -6, transform: "translateX(-50%)",
          width: 14, height: 72,
          background: "var(--accent)",
          border: `1.5px solid ${INK}`,
        }} />
        <div style={{ position: "absolute", left: 10, top: 10, right: 10, bottom: 10, border: "1px dashed rgba(0,0,0,0.4)" }} />
        <span style={{ fontFamily: "var(--ff-display)", fontSize: 22, letterSpacing: "0.04em", color: INK }}>
          $ $ $ $
        </span>
      </div>
      <div style={{
        position: "absolute", left: 12, top: 86, width: 60, height: 26,
        background: "#f0c84a",
        border: `1.5px solid ${INK}`,
        transform: "rotate(-12deg)",
      }} />
    </div>
  );
}

// Laser
function LaserArt() {
  const INK = "#0d1422";
  return (
    <div style={{ position: "relative", width: 240, height: 130 }}>
      <svg width={240} height={130} viewBox="0 0 240 130">
        <rect x="40" y="45" width="140" height="38" fill="#2a2f34" stroke={INK} strokeWidth="2" />
        <rect x="100" y="50" width="36" height="28" fill="var(--glitter)" stroke={INK} strokeWidth="2" />
        <rect x="106" y="56" width="24" height="16" fill="rgba(255,255,255,0.75)" />
        <path d="M62 83 L 90 83 L 80 122 L 56 122 Z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="miter" />
        <circle cx="86" cy="92" r="9" fill="none" stroke={INK} strokeWidth="2.5" />
        <rect x="180" y="55" width="40" height="18" fill="#2a2f34" stroke={INK} strokeWidth="2" />
        <rect x="216" y="58" width="6" height="12" fill="var(--accent)" />
        <circle cx="232" cy="64" r="2" fill="var(--accent)" />
        <circle cx="240" cy="64" r="1.5" fill="var(--accent)" opacity="0.7" />
      </svg>
    </div>
  );
}

function ItemsArtboard() {
  return (
    <div className="page" style={{
      width: "100%", height: "100%",
      padding: "44px 36px",
      display: "flex", flexDirection: "column", gap: 22,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <span className="fld">SHEET · ICONIC ELEMENTS · HANDOUT PACK</span>
          <div className="headline" style={{ fontSize: 44, marginTop: 4 }}>
            THE THINGS THEY CARRY
          </div>
          <div className="body" style={{ fontSize: 13, color: "var(--ink-mid)", marginTop: 4, maxWidth: 580 }}>
            Three print-and-cut cards. Front face is final art (illustrative slot below); reverse is rules-facing.
          </div>
        </div>
        <span className="slug outline">v0.4 · DRAFT</span>
      </div>
      <hr className="rule accent" />

      <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "flex-start", flex: 1 }}>
        <ItemCard
          no="I"
          kind="CONTROLLED · CONSUMABLE"
          label="GLITTER"
          name="ONE VIAL"
          tag="0.5 ML · ONE EYE · ONE DOSE"
          accent="glitter"
          art="art/items/glitter.png"
          body="Eye-drop dose. Twenty minutes of warmth. Blue stars in your peripheral vision the user can see and you can't."
          stats={[
            ["WHILE UP", "+1 to PUSH BACK. Cannot lie convincingly."],
            ["COMING DOWN", "Mark a Crash. −1 to anything until you're alone."],
            ["12 HRS LATER", "Craving. −1 vs. the source until you dose or sleep it off."],
            ["STREET", "$40 with a face Jaw-man knows. $80 without."],
          ]}
          footer="HANDOUT · I"
        />

        <ItemCard
          no="II"
          kind="CASH · LEVERAGE"
          label="THE ROLL"
          name="A BANDED ROLL"
          tag="$200 — $2,000 · A WEEK OF RENT, MAYBE"
          accent="ink"
          art="art/items/cash.png"
          body="A rubber-banded roll of bills. The roll is always one of three things: rent, a dose, or someone else's leverage on you."
          stats={[
            ["SPEND IT", "Resolve the surface problem. Mark a Debt."],
            ["FLASH IT", "+1 forward to PUSH BACK. Now somebody saw it."],
            ["HIDE IT", "It's gone by sunrise unless you ROLL +SHARP."],
            ["WHOSE?", "GM names who knows you have it. Always somebody."],
          ]}
          footer="HANDOUT · II"
        />

        <ItemCard
          no="III"
          kind="WEAPON · BOUTIQUE"
          label="LASER"
          name="COMPACT SIDEARM"
          tag="ONE OR TWO IN THE WHOLE TOWN"
          accent="accent"
          art="art/items/pistol.png"
          body="Not military. Boutique. The kind of thing somebody bought to feel like the kind of person who buys this. Visible energy chamber, matte finish."
          stats={[
            ["DRAW IT", "Everyone in the scene re-rolls intent. Nothing is casual now."],
            ["FIRE IT", "Hard move. Mark a Mark. The town remembers you for it."],
            ["JAMMED", "On a 6− with it, it stays unfired and tells on you."],
            ["WHO HAS ONE", "One PC at most. Jaw-man's people, never. Becky, maybe."],
          ]}
          footer="HANDOUT · III"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>
          PRINT AT 100% · CUT ON DASHED LINE · DO NOT LAMINATE
        </span>
        <span className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>
          REVERSE: BLANK · WRITE YOUR PC'S NAME
        </span>
      </div>
    </div>
  );
}

window.ItemsArtboard = ItemsArtboard;
