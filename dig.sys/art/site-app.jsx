// art/site-app.jsx — hash-based site router. Replaces canvas-app.jsx.

const PB_SLUGS = ['tinkerer','roughneck','voice','faithful','wired','vet','clean','believer','outsider','grifter','touched','reader'];

const NAV_PAGES = [
  { hash: 'cover',   label: 'Cover' },
  { hash: 'landing', label: 'Hub' },
  { hash: 'gm',      label: 'GM Screen' },
  { hash: 'items',   label: 'Handouts' },
  { hash: 'zero',    label: 'Session Zero' },
  { hash: 'crew',    label: 'Crew' },
];

function getRoute() {
  return location.hash.replace(/^#\/?/, '') || 'cover';
}

// ScaledPage: scales fixed-width artboards to viewport using CSS zoom.
// Pass height for fixed-size artboards to clip overflow.
// Omit height for interactive/auto-height pages.
function ScaledPage({ width, height, children }) {
  const [vw, setVw] = React.useState(() => window.innerWidth);

  React.useEffect(() => {
    const h = () => setVw(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const scale = Math.min(1, vw / width);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <div style={{ width, zoom: scale }}>
        {children}
      </div>
    </div>
  );
}

function SiteNav({ route }) {
  const [pbOpen, setPbOpen] = React.useState(false);
  const [ddPos, setDdPos] = React.useState({ top: 48, left: 0 });
  const pbBtnRef = React.useRef(null);
  const isPb = route.startsWith('pb/');

  const openPb = () => {
    if (pbBtnRef.current) {
      const r = pbBtnRef.current.getBoundingClientRect();
      const ddWidth = 270;
      const left = r.right - ddWidth < 0 ? r.left : r.right - ddWidth;
      setDdPos({ top: r.bottom, left });
    }
    setPbOpen(o => !o);
  };

  const linkBase = {
    fontFamily: 'var(--ff-display)',
    fontSize: 11,
    letterSpacing: '0.12em',
    padding: '0 12px',
    height: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    cursor: 'pointer',
    background: 'transparent',
  };

  const linkStyle = (active) => ({
    ...linkBase,
    color: active ? 'var(--accent)' : 'var(--ink-mid)',
    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
  });

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 48,
      background: 'rgba(10,11,13,0.97)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      {/* Brand */}
      <a href="#cover" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 16px',
        borderRight: '1px solid var(--border)',
        flexShrink: 0,
        textDecoration: 'none',
      }}>
        <div className="brand-mark" style={{ width: 28, height: 28 }} aria-label="dig.sys" />
        <span style={{
          fontFamily: 'var(--ff-display)', fontSize: 13,
          letterSpacing: '0.12em', color: 'var(--accent)',
        }}>DIGITAL SISSY</span>
      </a>

      {/* Page links */}
      <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto', flex: 1 }}>
        {NAV_PAGES.map(p => (
          <a key={p.hash} href={'#' + p.hash} style={linkStyle(route === p.hash)}>
            {p.label}
          </a>
        ))}

        {/* Playbooks dropdown */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}>
          <button
            ref={pbBtnRef}
            onClick={openPb}
            style={{
              ...linkBase,
              border: 'none',
              borderBottom: isPb ? '2px solid var(--accent)' : '2px solid transparent',
              color: isPb ? 'var(--accent)' : 'var(--ink-mid)',
            }}
          >
            Playbooks ▾
          </button>
          {pbOpen && (
            <div
              onMouseLeave={() => setPbOpen(false)}
              style={{
                position: 'fixed', top: ddPos.top, left: ddPos.left,
                background: 'var(--bg)',
                border: '1px solid var(--border-strong)',
                zIndex: 9999,
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                minWidth: 270,
              }}
            >
              {PB_SLUGS.map((slug, i) => {
                const hash = 'pb/' + slug;
                const label = slug.charAt(0).toUpperCase() + slug.slice(1);
                const no = String(i + 9).padStart(2, '0');
                return (
                  <a
                    key={slug}
                    href={'#' + hash}
                    onClick={() => setPbOpen(false)}
                    style={{
                      fontFamily: 'var(--ff-display)',
                      fontSize: 11, letterSpacing: '0.1em',
                      padding: '8px 12px',
                      color: route === hash ? 'var(--accent)' : 'var(--ink-mid)',
                      background: route === hash ? 'var(--surface)' : 'transparent',
                      textDecoration: 'none',
                      display: 'flex', alignItems: 'center', gap: 8,
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ color: 'var(--ink-dim)', minWidth: 22, fontSize: 11 }}>{no}</span>
                    {label.toUpperCase()}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// ── Dice Roller ────────────────────────────────────────────────────
const PIP_COLORS = { 1: '#ff4444', 2: '#2aa8ff', 3: '#ffffff', 4: '#ff4444', 5: '#2aa8ff', 6: '#ffff00' };

const PIP_GRID = {
  1: [[1,1]],
  2: [[0,2],[2,0]],
  3: [[0,2],[1,1],[2,0]],
  4: [[0,0],[0,2],[2,0],[2,2]],
  5: [[0,0],[0,2],[1,1],[2,0],[2,2]],
  6: [[0,0],[0,2],[1,0],[1,2],[2,0],[2,2]],
};

function Die({ value }) {
  const color = PIP_COLORS[value];
  const filled = new Set((PIP_GRID[value] || []).map(([r,c]) => `${r},${c}`));
  const pipD = 10;
  return (
    <div style={{
      width: 64, height: 64,
      background: '#111',
      borderRadius: 10,
      padding: 8,
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gap: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    }}>
      {Array.from({ length: 9 }, (_, i) => {
        const r = Math.floor(i / 3), c = i % 3;
        const hasPip = filled.has(`${r},${c}`);
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {hasPip && (
              <div style={{
                width: pipD, height: pipD, borderRadius: '50%',
                background: color,
                boxShadow: color !== '#ffffff' ? `0 0 5px ${color}99` : 'none',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function DiceRoller() {
  const [dice, setDice] = React.useState([1, 1]);
  const [rolled, setRolled] = React.useState(false);
  const rolling = React.useRef(false);

  const roll = () => {
    if (rolling.current) return;
    rolling.current = true;
    setRolled(true);
    let n = 0;
    const id = setInterval(() => {
      setDice([Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]);
      if (++n >= 10) { clearInterval(id); rolling.current = false; }
    }, 55);
  };

  const total = dice[0] + dice[1];
  const result = !rolled    ? { label: '2d6', bg: '#f5f5f5', fg: '#888',    border: '#ddd' }
    : total >= 10 ? { label: '10+',  bg: '#f0f0f0', fg: '#111',    border: '#333' }
    : total >= 7  ? { label: '7–9',  bg: '#1a1200', fg: '#e8c042', border: '#e8c042' }
    :               { label: '6−',   bg: '#1a0000', fg: '#ff4444', border: '#ff4444' };

  return (
    <div
      onClick={roll}
      title="Click to roll 2d6"
      style={{
        position: 'fixed', right: 16, bottom: 16,
        zIndex: 500,
        background: '#ffffff',
        border: '1.5px solid #e0e0e0',
        padding: '14px 12px 10px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        cursor: 'pointer', userSelect: 'none',
        boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
      }}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <Die value={dice[0]} />
        <Die value={dice[1]} />
      </div>
      <div style={{
        width: '100%',
        background: result.bg,
        color: result.fg,
        border: `2px solid ${result.border}`,
        fontFamily: 'var(--ff-display)',
        fontSize: 20,
        textAlign: 'center',
        padding: '4px 0',
        letterSpacing: '0.08em',
        transition: 'color 0.1s, background 0.1s',
      }}>{result.label}</div>
      {rolled && (
        <span style={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 11, color: '#aaa',
          letterSpacing: '0.18em',
        }}>{dice[0]} + {dice[1]} = {total}</span>
      )}
      <span style={{
        fontFamily: 'var(--ff-mono)',
        fontSize: 11, color: '#bbb',
        letterSpacing: '0.16em',
      }}>CLICK · ROLL</span>
    </div>
  );
}

function SiteApp() {
  const [route, setRoute] = React.useState(getRoute);

  React.useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  function page() {
    if (route === 'cover')   return <ScaledPage width={816}  height={1056}><CoverArtboard /></ScaledPage>;
    if (route === 'landing') return <ScaledPage width={1440}><LandingArtboard /></ScaledPage>;
    if (route === 'gm') return (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ width: 816, flexShrink: 0, overflowX: 'hidden' }}>
          <GMScreenArtboard />
        </div>
        <div style={{ flex: 1, minWidth: 300, position: 'sticky', top: 48, height: 'calc(100vh - 48px)' }}>
          <EpisodeReader />
        </div>
      </div>
    );
    if (route === 'items')   return <ScaledPage width={1240} height={780}><ItemsArtboard /></ScaledPage>;
    if (route === 'zero')    return <ScaledPage width={816}><SessionZeroArtboard /></ScaledPage>;
    if (route === 'crew')    return <ScaledPage width={1440} height={2940}><CrewArtboard /></ScaledPage>;
    if (route.startsWith('pb/')) {
      const slug = route.slice(3);
      const pb = PLAYBOOKS[slug];
      if (pb) return (
        <ScaledPage width={816}>
          <PlaybookSheet key={slug} pb={pb} slug={slug} />
        </ScaledPage>
      );
    }
    return <ScaledPage width={816} height={1056}><CoverArtboard /></ScaledPage>;
  }

  const showDice = route === 'gm' || route.startsWith('pb/');

  return (
    <>
      <SiteNav route={route} />
      <div style={{ paddingTop: 48 }}>{page()}</div>
      {showDice && <DiceRoller />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SiteApp />);
