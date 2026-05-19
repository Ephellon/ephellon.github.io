// art/canvas-app.jsx — wires Tweaks + DesignCanvas + artboards.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#ff4444",
  "typeWeight": "regular"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#ff4444", // canonical Digital Sissy red
  "#d12d2d", // deeper, more oxblood
  "#ff7a00", // ember-orange alt
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme === "light" ? "light" : "dark");
    r.style.setProperty("--accent", t.accent || "#ff4444");
    const w = t.typeWeight === "heavy" ? "800" : t.typeWeight === "light" ? "500" : "700";
    r.style.setProperty("--headline-weight", w);
  }, [t.theme, t.accent, t.typeWeight]);

  return (
    <DesignCanvas>
      <DCNav title="Digital Sissy" />
      <DCSection id="brand" title="Brand · Identity" subtitle="Logo held — client-supplied">
        <DCArtboard id="logo" label="01 · Logo · pending" width={1200} height={640}>
          <LogoArtboard />
        </DCArtboard>
        <DCArtboard id="cover" label="02 · Rulebook cover · 8.5×11" width={816} height={1056}>
          <CoverArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="web" title="Web · Static Hub" subtitle="Lore + downloadable resources">
        <DCArtboard id="landing" label="03 · Lore & Resources hub · 1440 wide" width={1440} height={2700}>
          <LandingArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="table" title="At The Table" subtitle="GM screen, handouts, safety">
        <DCArtboard id="gm" label="04 · GM Screen · 4 panels" width={3264} height={1056}>
          <GMScreenArtboard />
        </DCArtboard>
        <DCArtboard id="items" label="05 · Iconic handouts · print-and-cut" width={1240} height={780}>
          <ItemsArtboard />
        </DCArtboard>
        <DCArtboard id="zero" label="06 · Session Zero · 8.5×11" width={816} height={1056}>
          <SessionZeroArtboard />
        </DCArtboard>
        <DCArtboard id="crew" label="07 · Crew Sheet · 12 archetype pairs" width={1440} height={2940}>
          <CrewArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="system" title="System · Core" subtitle="PbtA spine + playbooks">
        <DCArtboard id="system-spine" label="08 · System Spine · legal portrait" width={816} height={1500}>
          <SystemArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="playbooks" title="Playbooks · 12 Character Sheets" subtitle="Letter-extended portrait, one per archetype">
        <DCArtboard id="pb-tinkerer"  label="09 · The Tinkerer · Artificer"           width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.tinkerer} /></DCArtboard>
        <DCArtboard id="pb-roughneck" label="10 · The Roughneck · Barbarian"          width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.roughneck} /></DCArtboard>
        <DCArtboard id="pb-voice"     label="11 · The Voice · Bard"                   width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.voice} /></DCArtboard>
        <DCArtboard id="pb-faithful"  label="12 · The Faithful · Cleric"              width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.faithful} /></DCArtboard>
        <DCArtboard id="pb-wired"     label="13 · The Wired · Druid · Techno-Nerd"    width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.wired} /></DCArtboard>
        <DCArtboard id="pb-vet"       label="14 · The Vet · Fighter"                  width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.vet} /></DCArtboard>
        <DCArtboard id="pb-clean"     label="15 · The Clean · Monk"                   width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.clean} /></DCArtboard>
        <DCArtboard id="pb-believer"  label="16 · The Believer · Paladin"             width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.believer} /></DCArtboard>
        <DCArtboard id="pb-outsider"  label="17 · The Outsider · Ranger"              width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.outsider} /></DCArtboard>
        <DCArtboard id="pb-grifter"   label="18 · The Grifter · Rogue"                width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.grifter} /></DCArtboard>
        <DCArtboard id="pb-touched"   label="19 · The Touched · Sorcerer"             width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.touched} /></DCArtboard>
        <DCArtboard id="pb-reader"    label="20 · The Reader · Wizard"                width={816} height={1200}><PlaybookSheet pb={PLAYBOOKS.reader} /></DCArtboard>
      </DCSection>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio
          label="Surface"
          value={t.theme}
          options={[
            { value: "dark",  label: "Onyx" },
            { value: "light", label: "Alice" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />

        <TweakSection label="Accent" />
        <TweakColor
          label="Accent color"
          value={t.accent}
          options={ACCENT_OPTIONS}
          onChange={(v) => setTweak("accent", v)}
        />

        <TweakSection label="Type" />
        <TweakRadio
          label="Display weight"
          value={t.typeWeight}
          options={["light", "regular", "heavy"]}
          onChange={(v) => setTweak("typeWeight", v)}
        />

        <TweakSection label="About" />
        <div style={{ fontSize: 11, color: "rgba(41,38,27,0.6)", lineHeight: 1.45 }}>
          Six artboards for <b>Digital Sissy</b>. Onyx by default; Alice for daylight printouts.
          Logo is parked — drop yours into the brand artboard slots when ready.
        </div>
      </TweaksPanel>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
