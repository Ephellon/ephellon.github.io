// art/logo.jsx — brand identity sheet. dig.sys mark + wordmark.

function LogoArtboard() {
  return (
    <div className="page" style={{
      width: "100%", height: "100%", padding: 48,
      display: "flex", flexDirection: "column", gap: 22,
    }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <span className="fld">SHEET · BRAND IDENTITY</span>
          <div className="headline" style={{ fontSize: 44, marginTop: 4 }}>
            DIG · <span style={{ color: "var(--accent)" }}>SYS</span>
          </div>
          <div className="body" style={{ fontSize: 13, color: "var(--ink-mid)", marginTop: 4, maxWidth: 580 }}>
            Spray-paint smiley. Black ink, red &amp; blue heart eyes, yellow tongue.
            Always reads on a light surface — treated as a sticker punched into every document.
            Wordmark held for secondary use.
          </div>
        </div>
        <span className="slug outline">v0.4 · DRAFT</span>
      </div>
      <hr className="rule accent" />

      {/* grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, flex: 1 }}>
        {/* PRIMARY ICON · on its native surface */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="headline" style={{ fontSize: 18 }}>PRIMARY · ICON</span>
            <span className="fld">01</span>
          </div>
          <div style={{
            flex: 1, minHeight: 240,
            background: "#f5f3ee",
            backgroundImage: "url('art/brand/logo.png')",
            backgroundSize: "70%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "1px solid var(--border)",
          }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
            CANONICAL · USE BY DEFAULT
          </span>
        </div>

        {/* ON DARK · as a sticker */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="headline" style={{ fontSize: 18 }}>ON ONYX</span>
            <span className="fld">02</span>
          </div>
          <div style={{
            flex: 1, minHeight: 240,
            background: "#0a0b0d",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--border)",
          }}>
            <div className="brand-mark" style={{ width: 180, height: 180 }} aria-label="dig.sys"/>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
            PUNCHED INTO A LIGHT DISC · MIN 28PX
          </span>
        </div>

        {/* ON LIGHT · flush */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="headline" style={{ fontSize: 18 }}>ON ALICE</span>
            <span className="fld">03</span>
          </div>
          <div style={{
            flex: 1, minHeight: 240,
            background: "#f0f8ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid var(--border)",
            backgroundImage: "url('art/brand/logo.png')",
            backgroundSize: "60%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
            FLUSH · NO DISC REQUIRED
          </span>
        </div>

        {/* WORDMARK · long */}
        <div className="card" style={{
          gridColumn: "span 2",
          padding: 20, display: "flex", flexDirection: "column", gap: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="headline" style={{ fontSize: 18 }}>WORDMARK · LATER USE</span>
            <span className="fld">04</span>
          </div>
          <div style={{
            flex: 1, minHeight: 180,
            background: "#f5f3ee",
            backgroundImage: "url('art/brand/logo-word.png')",
            backgroundSize: "65%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "1px solid var(--border)",
          }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
            HELD · NOT IN CURRENT DOCUMENTS
          </span>
        </div>

        {/* SIZING / CLEAR SPACE */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="headline" style={{ fontSize: 18 }}>SIZES</span>
            <span className="fld">05</span>
          </div>
          <div style={{
            flex: 1, minHeight: 180,
            background: "#f5f3ee", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-around", padding: 12,
          }}>
            <img src="art/brand/logo.png" alt="" style={{ width: 28, height: 28 }} />
            <img src="art/brand/logo.png" alt="" style={{ width: 48, height: 48 }} />
            <img src="art/brand/logo.png" alt="" style={{ width: 72, height: 72 }} />
            <img src="art/brand/logo.png" alt="" style={{ width: 110, height: 110 }} />
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
            28 · 48 · 72 · 110 · CLEAR SPACE = ¼ MARK
          </span>
        </div>
      </div>

      {/* usage notes */}
      <div className="card" style={{ padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
          DO NOT RECOLOR · DO NOT REPLACE THE HEARTS · DO NOT FLATTEN THE DRIPS
        </span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
          THE MARK IS SPRAY · THE PAGE IS QUIET
        </span>
      </div>
    </div>
  );
}

window.LogoArtboard = LogoArtboard;
