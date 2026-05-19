// art/cover.jsx — rulebook cover, letter portrait (816 × 1056). Onyx register.

function CoverArtboard() {
  return (
    <div className="page" style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      {/* Alex's portrait fills the right half */}
      <div
        className="portrait"
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0,
          width: "62%",
          backgroundImage: "url('art/portraits/alex.png')",
        }}
      >
        {/* gradient to bleed portrait into the dark left column */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, var(--bg) 0%, rgba(10,11,13,0.85) 8%, transparent 32%, transparent 100%)",
        }}/>
        {/* bottom fade so footer reads */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: 200,
          background: "linear-gradient(180deg, transparent 0%, var(--bg) 95%)",
        }}/>
      </div>

      {/* left column — text */}
      <div style={{
        position: "relative", zIndex: 2,
        padding: "44px 36px 28px",
        display: "flex", flexDirection: "column",
        flex: 1, gap: 22,
      }}>
        {/* eyebrow */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span className="fld">A POWERED-BY-THE-APOCALYPSE TRAGEDY · 3–5 SESSIONS</span>
          <span className="slug outline" style={{ fontSize: 11 }}>v0.4 · DRAFT</span>
        </div>

        {/* brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="brand-mark" style={{ width: 52, height: 52 }} aria-label="dig.sys"/>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.22em" }}>
              DIG · SYS
            </span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>
              CORE BOOK · 01
            </span>
          </div>
        </div>

        <div style={{ marginTop: 8, maxWidth: 380 }}>
          <div className="headline" style={{ fontSize: 96, lineHeight: 0.86 }}>
            DIGITAL
          </div>
          <div className="headline" style={{ fontSize: 96, lineHeight: 0.86, color: "var(--accent)" }}>
            SISSY
          </div>
        </div>

        <div className="body" style={{ fontSize: 17, lineHeight: 1.32, maxWidth: 360, color: "var(--ink-soft)", textWrap: "balance" }}>
          A young woman is going down the wrong path on the Gulf Coast.
          You are the ones who love her. You will probably fail.
        </div>

        {/* spec strip */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          <hr className="rule strong" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 6, columnGap: 12 }}>
            {[
              ["SYSTEM",   "Powered by the Apocalypse", "#system"],
              ["SESSIONS", "Three to five",             "#zero"],
              ["PLAYERS",  "GM + 2–4",                 "#crew"],
              ["TONE",     "Grounded · particular · sad", "#landing"],
              ["NEEDED",   "2d6 · pencils · honesty",  "#zero"],
              ["RATING",   "Adults · content-warned",   "#zero"],
            ].map(([k, v, href]) => (
              <React.Fragment key={k}>
                <a href={href} className="fld" style={{ textDecoration: "none", color: "inherit" }}>{k}</a>
                <span className="body" style={{ fontSize: 12, color: "var(--ink)" }}>{v}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* portrait caption — small mono tag bottom-right */}
      <div style={{
        position: "absolute", right: 24, bottom: 24, zIndex: 2,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ width: 6, height: 6, background: "var(--accent)" }}/>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>
          ALEX · BLUEVILLE, AL · 2050s
        </span>
      </div>

      {/* bottom band */}
      <div style={{
        position: "relative", zIndex: 2,
        borderTop: "1px solid var(--border)",
        padding: "12px 36px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--ink-dim)" }}>
          BOOK 01 · CORE
        </span>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--ink-dim)" }}>
          EPHELLON · DIGITAL-SISSY
        </span>
      </div>
    </div>
  );
}

window.CoverArtboard = CoverArtboard;
