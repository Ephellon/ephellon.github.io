// art/episodes.jsx — episode reader panel for the GM Screen.

const EPISODES = [
  { num: '01',  title: "Alex",                         file: "episodes/01 - Alex.md" },
  { num: '02',  title: "Home",                         file: "episodes/02 - Home.md" },
  { num: '03',  title: "Two Grand",                    file: "episodes/03 - Two Grand.md" },
  { num: '04a', title: "Smoke Shop · Becky's",         file: "episodes/04a - Smoke Shop (Becky's).md" },
  { num: '04b', title: "Smoke Shop · Downtown",        file: "episodes/04b - Smoke Shop (Downtown).md" },
  { num: '04c', title: "Smoke Shop · A Smoke Session", file: "episodes/04c - Smoke Shop (A Smoke Session).md" },
  { num: '05',  title: "Down Payment",                 file: "episodes/05 - Down Payment.md" },
  { num: '06',  title: "Customers",                    file: "episodes/06 - Customers.md" },
  { num: '07',  title: "Ten Thousand",                 file: "episodes/07 - Ten Thousand.md" },
  { num: '08',  title: "Hometown",                     file: "episodes/08 - Hometown.md" },
  { num: '09a', title: "Wade · Coordinated",           file: "episodes/09a - Wade (Coordinated).md" },
  { num: '09b', title: "Wade · Friction",              file: "episodes/09b - Wade (Friction).md" },
  { num: '09c', title: "Wade · Collapse",              file: "episodes/09c - Wade (Collapse).md" },
];

function EpisodeReader() {
  const [idx, setIdx]       = React.useState(0);
  const [html, setHtml]     = React.useState('');
  const [loading, setLoad]  = React.useState(true);
  const [toast, setToast]   = React.useState(false);
  const [menu, setMenu]     = React.useState(false);
  const bodyRef             = React.useRef(null);
  const toastTimer          = React.useRef(null);

  const ep   = EPISODES[idx];
  const hasPrev = idx > 0;
  const hasNext = idx < EPISODES.length - 1;

  React.useEffect(() => {
    setLoad(true);
    fetch(ep.file)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(text => {
        setHtml(typeof marked !== 'undefined' ? marked.parse(text) : `<pre>${text}</pre>`);
        setLoad(false);
        if (bodyRef.current) bodyRef.current.scrollTop = 0;
      })
      .catch(() => {
        setHtml('<p style="color:#555;font-family:monospace">Episode file not found.</p>');
        setLoad(false);
      });
  }, [idx]);

  const navigate = (i) => {
    const target = EPISODES[i];
    if (!target) return;
    setIdx(i);
    setMenu(false);
    clearTimeout(toastTimer.current);
    if (/[a-z]$/i.test(target.num)) {
      setToast(true);
      toastTimer.current = setTimeout(() => setToast(false), 8000);
    } else {
      setToast(false);
    }
  };

  const btn = (disabled) => ({
    background: 'transparent',
    border: `1px solid ${disabled ? '#1e1e1e' : '#3a3a3a'}`,
    color: disabled ? '#2a2a2a' : '#666',
    fontFamily: 'var(--ff-mono)',
    fontSize: 9,
    letterSpacing: '0.16em',
    padding: '5px 12px',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000', position: 'relative', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #1a1a1a', flexShrink: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 8, color: '#3a3a3a', letterSpacing: '0.2em' }}>
            EPISODE {idx + 1} / {EPISODES.length}
          </div>
          <div style={{ fontFamily: 'var(--ff-display)', fontSize: 15, color: '#ffff00', letterSpacing: '0.1em', marginTop: 3, lineHeight: 1.1 }}>
            {ep.num.toUpperCase()} — {ep.title.toUpperCase()}
          </div>
        </div>
        <button
          onClick={() => setMenu(o => !o)}
          style={{ ...btn(false), borderColor: menu ? '#777' : '#2a2a2a', color: menu ? '#ddd' : '#444', flexShrink: 0, fontSize: 10, padding: '4px 10px' }}
        >LIST ▾</button>
      </div>

      {/* ── Episode list menu ─────────────────────────────────────── */}
      {menu && (
        <div style={{ position: 'absolute', top: 54, right: 0, background: '#060606', border: '1px solid #222', zIndex: 60, minWidth: 230, maxHeight: 320, overflowY: 'auto' }}>
          {EPISODES.map((e, i) => (
            <div key={e.num} onClick={() => navigate(i)} style={{ padding: '8px 14px', display: 'flex', gap: 10, cursor: 'pointer', background: i === idx ? '#0e0e0e' : 'transparent', borderBottom: '1px solid #0e0e0e' }}>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, color: '#3a3a3a', minWidth: 32 }}>{e.num}</span>
              <span style={{ fontSize: 12, color: i === idx ? '#ffff00' : '#777' }}>{e.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div
        ref={bodyRef}
        className="episode-body"
        style={{ flex: 1, overflowY: 'auto', padding: '18px 22px 24px', fontSize: 13.5, lineHeight: 1.7, color: '#ffffff' }}
        dangerouslySetInnerHTML={{ __html: loading
          ? '<p style="color:#333;font-family:monospace;letter-spacing:0.14em;font-size:11px">LOADING…</p>'
          : html
        }}
      />

      {/* ── Branching toast ────────────────────────────────────────── */}
      {toast && (
        <div style={{ position: 'absolute', bottom: 56, left: 10, right: 10, border: '1px solid #88ff88', color: '#88ff88', padding: '10px 14px', fontFamily: 'var(--ff-mono)', fontSize: 10, letterSpacing: '0.1em', lineHeight: 1.45, background: 'rgba(0,5,0,0.97)', zIndex: 30 }}>
          ▸ BRANCHING EPISODE — PAUSE. LET THE TABLE DECIDE WHICH PATH TO TAKE BEFORE READING.
        </div>
      )}

      {/* ── Navigation ─────────────────────────────────────────────── */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <button onClick={() => navigate(idx - 1)} disabled={!hasPrev} style={btn(!hasPrev)}>← PREV</button>
        <span style={{ fontFamily: 'var(--ff-mono)', fontSize: 9, color: '#2a2a2a' }}>{idx + 1} / {EPISODES.length}</span>
        {/* right margin reserves space for the floating dice widget */}
        <div style={{ marginRight: 178 }}>
          <button onClick={() => navigate(idx + 1)} disabled={!hasNext} style={btn(!hasNext)}>NEXT →</button>
        </div>
      </div>
    </div>
  );
}

window.EpisodeReader = EpisodeReader;
