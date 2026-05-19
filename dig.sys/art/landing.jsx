// art/landing.jsx — static lore + resources hub. No marketing. Just the world,
// the cast, and links to the documents.

function LandingNav() {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 48px",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="brand-mark" style={{ width: 36, height: 36 }} aria-label="dig.sys"/>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", color: "var(--ink-mid)" }}>
          DIGITAL · <span style={{ color: "var(--accent)" }}>SISSY</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {[
          ["Premise",   "premise"],
          ["Cast",      "cast"],
          ["Blueville",  "world"],
          ["Glitter",   "glitter"],
          ["Resources", "resources"],
          ["Safety",    "safety"],
        ].map(([l, id]) => (
          <a key={l} className="subhead"
            href="#"
            onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontSize: 12, color: "var(--ink-mid)", textDecoration: "none", letterSpacing: "0.1em", cursor: "pointer" }}
          >{l}</a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{
      padding: "72px 48px 56px",
      display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center",
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <span className="fld">A POWERED-BY-THE-APOCALYPSE TRAGEDY · 3–5 SESSIONS</span>
        <div className="headline" style={{ fontSize: 92, lineHeight: 0.86 }}>
          A YEAR ON THE
          <br />
          <span style={{ color: "var(--accent)" }}>WRONG PATH.</span>
        </div>
        <div className="body" style={{ fontSize: 18, lineHeight: 1.4, maxWidth: 560, color: "var(--ink-soft)" }}>
          <b style={{ color: "var(--ink)" }}>Digital Sissy</b> is a tabletop game about a
          twenty-something woman named Alex, the bad year she's having on the Gulf Coast,
          and the people in her life who might pull her back. This page is the world she
          lives in and the documents you'll need to play it.
        </div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em", marginTop: 4 }}>
          BLUEVILLE · ALABAMA · 2050s · CLIMATE-STRESSED COASTAL
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div className="portrait" style={{
          aspectRatio: "3 / 4", width: "100%",
          backgroundImage: "url('art/portraits/alex.png')",
        }}/>
        <div style={{
          position: "absolute", left: 12, bottom: 12,
          background: "var(--bg)", padding: "6px 10px",
          border: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 6, height: 6, background: "var(--accent)" }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.2em" }}>ALEX</span>
        </div>
      </div>
    </section>
  );
}

function Premise() {
  return (
    <section id="premise" style={{
      padding: "56px 48px", borderTop: "1px solid var(--border)",
    }}>
      <SectionHead num="01" label="Premise" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 20 }}>
        <div>
          <div className="headline" style={{ fontSize: 40, lineHeight: 0.96 }}>
            ALEX IS GOING UNDER. THE PCs ARE EVERYONE WHO COULD STILL CATCH HER.
          </div>
        </div>
        <div className="body" style={{ fontSize: 15, color: "var(--ink-soft)", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0 }}>
            Alex is a fixed NPC. The campaign is the year she has left — a sister, a friend, an ex,
            a boss, a neighbor. Whoever the PCs are, they know her name. The game's job is to make
            that name cost something.
          </p>
          <p style={{ margin: 0 }}>
            The world she lives in shouts. The people inside it don't. Branded consumption keeps
            yelling at people who are getting eaten alive by it; the camera stays on the people.
          </p>
          <p style={{ margin: 0, color: "var(--ink-mid)" }}>
            Three to five sessions, PbtA core, 2d6 + stat. The ending is not promised.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ num, label, kicker }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span className="numtag">§ {num}</span>
        <span className="headline" style={{ fontSize: 28, letterSpacing: "0.02em" }}>{label}</span>
      </div>
      {kicker && (
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>{kicker}</span>
      )}
    </div>
  );
}

const CAST = [
  {
    name: "ALEX",
    full: "Alexandria",
    tag: "PROTAGONIST · FIXED NPC",
    role: "the center of the gravitational collapse",
    img: "art/portraits/alex.png",
    look: "20s · short messy brown hair · light grey eyes · faded band tee · dog tag on a cord",
    voice: "Soft, even in arguments. Sentences trail off rather than land. Brief when confident; briefer when overwhelmed.",
    personality: "Naive in a specific way — not stupid, but unable to recognize a manipulation until it's already in motion. Loyal to a fault. Trusts Becky absolutely; trusts adults less. Quiet stubbornness under the softness. Carries her absent father's metal taste as identity — the loudest thing about her. Online handle Xph0n3__punkX is her armor.",
    fn: "Every other character orbits her. Her death is the canonical climax; her survival is the Pyrrhic save. What happens to her is the spine of the story.",
  },
  {
    name: "BECKY",
    full: "",
    tag: "NARRATOR · GM CHARACTER",
    role: "the friend who loves her and ruins her",
    img: "art/portraits/becky.png",
    look: "20s · bleach-blonde with roots · green eyes · acrylics · 'Babygirl' necklace · permanent half-smirk",
    voice: "Casual cadence, fragments, dry observations. Calls Alex 'Al'. Curses with rhythm, not emphasis. Funniest at the worst moments.",
    personality: "Street-smart in the way that's actually shallow — knows the corners of Blueville, doesn't know the world. Performatively unbothered. Has loved Alex and ruined her in parallel since middle school; both parts are real. Knows herself well enough to be unsettled, not well enough to change.",
    fn: "Witness. The story is told through her eyes. Survives by default — the campaign ends if she dies. In the canonical tragic ending, she's present at Alex's death but doesn't die there. She lives carrying it.",
  },
  {
    name: "JACOB",
    full: "Jaw-man",
    tag: "ANTAGONIST · NAMED NPC",
    role: "the kingpin who is also tired",
    img: "art/portraits/jaw-man.png",
    look: "30s · dark fitted polo · matte black watch · scarred knuckles · jaw shifted by an old helmet hit · black Silverado",
    voice: "Plainspoken, brief, never theatrical. Says exactly what needs to be said and stops. Almost-says-things and doesn't.",
    personality: "Carrying it. Not psychopathic — exhausted. Football star until the helmet accident broke his jaw and his lifeline. Painkillers became the trade became the empire. Answers to people above him whose names he doesn't give. Not the villain because he likes being the villain.",
    fn: "Catalyst and mirror. Down payment hooks Alex; the $10K ultimatum starts the clock. He is the future she's running toward — what this trade does to people, in the long view.",
  },
  {
    name: "TED",
    full: "",
    tag: "ANTAGONIST · NAMED NPC",
    role: "the hand that does the things",
    img: "art/portraits/ted.png",
    look: "30s · thrift-store windbreaker · forgettable everything · small faded blue ink blotch on the right wrist · the kind of face you'd swear you know from a gas station",
    voice: "Flat affect. Says 'stay safe' after robbing her — banalities. Looks like a guy finishing a chore. The lack of menace IS the menace.",
    personality: "Forgettable specifically. Always around in high school, never anyone's friend or enemy. Bottom-feeder, mean when desperate. Not strategic, not stupid — small, in the way that makes him dangerous because he has nothing to lose and no plan to protect. Operates on the edges of Jaw-man's territory.",
    fn: "Robs Alex in Ep 6 — steals the Glitter, sets the $10K deadline that drives the campaign clock. Kills her at the canonical climax. Not the architect of her death — the instrument. The system's personalized face when it finally reaches her. Recognition without relationship.",
  },
  {
    name: "QUENTIN",
    full: "Q",
    tag: "ALLY · NAMED NPC",
    role: "the man who has seen it all and tells you none of it",
    img: "art/portraits/quentin.png",
    look: "60s+ · weathered, carved-out-of-driftwood · behind the counter with a rag or a newspaper",
    voice: "Short sentences. Often doesn't speak. Nods at people he recognizes; doesn't nod at people he doesn't, even if they're in the room.",
    personality: "Knows everything that happens in his zip code, says nothing about any of it. Has watched two or three generations of dealers move through his back booth. Doesn't moralize. Soft-eyed in a way that has nothing to do with being soft. Small kindnesses, never the big ones.",
    fn: "Hub. The Smoke Shop is the central convergence point for all three branches; Q runs it. His non-reaction is itself information. Candidate for one late-act break in the pattern — or for letting the climax happen.",
  },
  {
    name: "CINDY",
    full: "Alex's mom",
    tag: "FAMILY NPC",
    role: "the woman who was prom queen and got stuck",
    img: "art/portraits/cindy.png",
    look: "40s · oversized 20-year-old volleyball t-shirt · sweatpants or denim shorts · hair pulled back without care",
    voice: "Voice goes thin rather than loud. Doesn't shout. Walks away from arguments. 'I can't do this anymore' — exhausted ultimatum, not enraged confrontation.",
    personality: "Tired in the kind of way sleep doesn't fix. Chose Steve over Alex when forced to choose, and doesn't know she made the wrong choice. Sympathetic, failing, not a villain. Loves Alex but cannot afford to. Practices small cruelties without recognizing them.",
    fn: "The eviction is the inciting incident — she accuses Alex of theft Alex didn't commit. (Steve did.) She does not learn the truth, canonically. Becomes peripheral after Ep 3; her absence from Alex's late life is part of the tragedy.",
  },
  {
    name: "STEVE",
    full: "Cindy's boyfriend",
    tag: "FAMILY-ADJACENT NPC · THE CANONICAL USER",
    role: "the hidden engine of the inciting incident",
    img: "art/portraits/steve.png",
    look: "40s · stained undershirt · warehouse-job build · Glitter-rimmed eyes · always in the recliner",
    voice: "Doesn't speak when he should. Mumbles when he does. Avoids eye contact.",
    personality: "Peaked in high school harder than Cindy did. Coward, in the specific way of men who know they're cowards. Aware of his failures, unwilling to face them. Becomes Alex's best customer post-Ep 5 — the man who got her kicked out is now buying drugs from her. Sheepish about it. The arrangement is a small private violence neither names.",
    fn: "He stole the $2k. The truth never surfaces to Cindy. The system Alex got pulled into is not even built on a real crime — she lost everything over a lie the man at home told. His silence in Ep 3 is his canonical character beat: could exonerate her with a sentence, doesn't.",
  },
];

const MINORS = [
  {
    name: "DAD",
    tag: "PERIPHERAL · OFF-PAGE",
    body: "Alive but peripheral. Displaced by Steve years ago. Gave Alex the dog tag pendant and her metal taste; not present through this story. Whether he tried to be is canon-ambiguous.",
    fn: "Functionally, the pendant. Whenever Alex grips it, he is there. Whenever she lets it go, he is gone again.",
  },
  {
    name: "MARCUS",
    tag: "AMBIENT · BLUEVILLE",
    body: "20s. Becky knows him from school. Wears his five-years-out-of-date varsity jacket like it's load-bearing. Bro-y but harmless. Talks about high school games like they happened last week.",
    fn: "The project's living embodiment of the 'everyone peaks in high school' rule. Becky's canonical line: 'In Blueville, that jacket is a permanent residence.'",
  },
];

function CastCard({ c }) {
  return (
    <div className="card" style={{
      display: "grid", gridTemplateColumns: "190px 1fr", overflow: "hidden",
      minHeight: 380,
    }}>
      {c.img ? (
        <div className="portrait" style={{ backgroundImage: `url('${c.img}')` }}/>
      ) : (
        <div className="plate" style={{ minHeight: 380 }}>
          <div className="plate-cap">{c.name}</div>
        </div>
      )}
      <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0 }}>
              <span className="headline" style={{ fontSize: 26, lineHeight: 1 }}>{c.name}</span>
              {c.full && (
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
                  · {c.full.toUpperCase()}
                </span>
              )}
            </div>
            <span className="fld" style={{ textAlign: "right" }}>{c.tag}</span>
          </div>
          <div className="subhead" style={{ fontSize: 12, color: "var(--accent)", marginTop: 4 }}>
            {c.role}
          </div>
        </div>

        <hr className="rule hair" />

        <div className="body" style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          {c.personality}
        </div>

        <div style={{
          padding: "10px 12px",
          background: "var(--surface-2)",
          borderLeft: "3px solid var(--accent)",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          <span className="fld" style={{ color: "var(--accent)" }}>STORY FUNCTION</span>
          <span className="body" style={{ fontSize: 12, color: "var(--ink-mid)" }}>{c.fn}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", marginTop: "auto" }}>
          <span className="fld">LOOK</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{c.look}</span>
          <span className="fld">VOICE</span>
          <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{c.voice}</span>
        </div>
      </div>
    </div>
  );
}

function Cast() {
  return (
    <section id="cast" style={{ padding: "56px 48px", borderTop: "1px solid var(--border)" }}>
      <SectionHead num="02" label="Cast" kicker="THE PEOPLE WHO KNOW HER NAME" />
      <div className="body" style={{ fontSize: 14, color: "var(--ink-mid)", maxWidth: 760, marginTop: 14 }}>
        Seven major NPCs in Alex's orbit. Antagonists, family, the man who runs the shop where
        all three story branches meet. The throughline: everyone of consequence peaked in high school.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 22 }}>
        {CAST.map(c => <CastCard key={c.name} c={c} />)}
      </div>

      <div style={{
        marginTop: 36,
        display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14,
        paddingBottom: 12, borderBottom: "1px solid var(--ink-hair)",
      }}>
        <span className="subhead" style={{ fontSize: 13 }}>ALSO NAMED · MINOR NPCs</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>
          AMBIENT · OFF-PAGE
        </span>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 16,
      }}>
        {MINORS.map(m => (
          <div key={m.name} className="card" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="headline" style={{ fontSize: 22 }}>{m.name}</span>
              <span className="fld">{m.tag}</span>
            </div>
            <div className="body" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{m.body}</div>
            <div style={{
              marginTop: 4, padding: "6px 10px",
              background: "var(--surface-2)",
              borderLeft: "3px solid var(--accent)",
            }}>
              <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{m.fn}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const CREW = [
  {
    name: "RONI", arch: "ROGUE", kind: "PC",
    role: "the friend who already cased the place",
    body: "Procedural, low-drama. Asks the right questions in the right order — exactly how many vials, did they see the labels, did they say where they were from. Done minor crime since she was a teenager; this is just the highest-stakes one.",
    voice: "Short. Declarative. Confirms with single words. 'Right.' 'Got it.' 'Where?'",
    swap: "Rob (M)",
  },
  {
    name: "DIANA", arch: "DRUID · TECH", kind: "PC",
    role: "the friend you DM at 3 AM who responds immediately",
    body: "Quiet, focused, present through her devices. Reads the room through what people post, what's on their phones. Builds the fake landing pages for the tour-agent scheme, monitors scanners, runs background checks before the crew walks in.",
    voice: "Speaks while looking at her screen. Sentences in fragments — she's thinking about three things at once.",
    swap: "Dave (M)",
  },
  {
    name: "BETH", arch: "BARD", kind: "PC",
    role: "the friend who could make this a career if circumstances allowed",
    body: "Bright, warm, performative in a way that's mostly genuine. Reads people for what they want to hear and gives it to them — not maliciously, just because she's good at it. Fronts the tour-agent scheme. Brings food to morning-after gatherings.",
    voice: "Honey-thick when she's on, casual and observant when she's off. Two registers, both deliberate.",
    swap: "Byron (M)",
  },
];

function CrewCard({ c }) {
  return (
    <div className="card" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10, minHeight: 240 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="headline" style={{ fontSize: 22 }}>{c.name}</span>
          <span className="fld">{c.arch}</span>
        </div>
        <span className={"slug " + (c.kind.startsWith("PC") ? "outline" : "muted")} style={{ fontSize: 11 }}>
          {c.kind}
        </span>
      </div>
      <div className="subhead" style={{ fontSize: 11.5, color: "var(--accent)" }}>{c.role}</div>
      <div className="body" style={{ fontSize: 12, color: "var(--ink-soft)" }}>{c.body}</div>
      <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 10px" }}>
        <span className="fld">VOICE</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{c.voice}</span>
        {c.swap !== "—" && (
          <>
            <span className="fld">M-SWAP</span>
            <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{c.swap}</span>
          </>
        )}
      </div>
    </div>
  );
}

function Crew() {
  return (
    <section id="crew" style={{ padding: "56px 48px", borderTop: "1px solid var(--border)" }}>
      <SectionHead num="03" label="The Crew" kicker="THE PEOPLE WHO COULD STILL CATCH HER" />
      <div className="body" style={{ fontSize: 14, color: "var(--ink-mid)", maxWidth: 760, marginTop: 14 }}>
        Three player-character slots — the friends Alex grew up alongside. Each archetype has a
        male-coded swap (Rob / Dave / Byron) for table preference.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 22 }}>
        {CREW.map(c => <CrewCard key={c.name} c={c} />)}
      </div>
    </section>
  );
}

const LOCATIONS = [
  [1,  "THE PRESIDENT'S FAMILY HOME", "Faded yellow banners. Up by the lake. A historical marker nobody from town stops to read anymore."],
  [2,  "PERKY'S DINER",        "Mom-and-pop. Red booths, broken jukebox. Where Alex still gets a free coffee, sometimes."],
  [3,  "MOTEL",                "Long-stay by the week. The kind of place you sleep through afternoons."],
  [4,  "CREDIT UNION",         "Where the cosigners get the calls."],
  [5,  "BANK",                 "Closed by 4. The drive-through pneumatic tube still works."],
  [6,  "MECHANIC SHOP",        "The Silverado gets serviced here. So does most of the rolling stock in town."],
  [7,  "SMOKE SHOP",           "Q's. Red awning, blue OPEN sign, faded yellow signage. Central hub. Start here on a given evening."],
  [8,  "GENTLEMAN'S CLUB",     "Blue Nile. Where some of Becky's older work happened. Where some of it still does."],
  [9,  "DEFUNCT BLOCKBUSTER",  "Sign hasn't come down in 25 years. Sometimes there's a kid in the lot."],
  [10, "SEMI-EDIBLE TACO SHOP","Open until 4 AM, against all explanations. Where the post-shift crowd ends up."],
  [11, "WASH-N-GO CAR WASH",   "Gravel lot. Rusted chain-link. Where deals happen at 11 PM. Where Becky's car is parked too often."],
  [12, "WEST ABANDONED WAREHOUSE", "Ted's territory, around the back."],
  [13, "EAST ABANDONED WAREHOUSE", "Jaw-man's people, when they need a room."],
  [14, "BECKY'S APARTMENT",    "Above the taco shop. The smell never leaves the carpet. Where most plans get hatched, badly."],
  [15, "ALEX'S MOM'S HOUSE",   "Cindy's. Stale-smelling, perpetually closed blinds. Forty years of a life lived in three rooms."],
  [16, "ALEX'S APARTMENT",     "Small, cluttered, second floor. The site of the robbery in Ep 6. The lock has been wrong since she moved in."],
];

function World() {
  return (
    <section id="world" style={{ padding: "56px 48px", borderTop: "1px solid var(--border)" }}>
      <SectionHead num="03" label="Blueville" kicker="POP. 100ish · PEAK 500 · GULF COAST · END OF THE LINE" />
      <div className="body" style={{ fontSize: 14, color: "var(--ink-mid)", maxWidth: 760, marginTop: 14 }}>
        Founded on fish, shrimp, and a prayer. Now vape pens and discount liquor. The president
        was born here and faded banners still say so. Sixteen marked locations on the map; about
        half of them carry the story.
      </div>

      {/* Map */}
      <div style={{
        marginTop: 22,
        border: "1px solid var(--border-strong)",
        background: "#1a1612",
        boxShadow: "var(--shadow-card)",
        position: "relative",
        overflow: "hidden",
      }}>
        <img
          src="art/locations/blueville-map.png"
          alt="Map of Blueville, Alabama"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
        <div style={{
          position: "absolute", left: 12, top: 12,
          background: "var(--bg)", border: "1px solid var(--border)",
          padding: "6px 10px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 6, height: 6, background: "var(--accent)" }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.2em" }}>
            MAP · v1 · ILLUSTRATED
          </span>
        </div>
      </div>

      {/* Numbered legend */}
      <div style={{ marginTop: 22 }}>
        <span className="fld">MAP KEY · 16 LOCATIONS</span>
        <div style={{
          marginTop: 12,
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px 24px",
        }}>
          {LOCATIONS.map(([n, title, body]) => (
            <div key={n} style={{
              display: "grid", gridTemplateColumns: "32px 1fr",
              gap: 12, padding: "8px 0",
              borderBottom: "1px dashed var(--ink-faint)",
            }}>
              <span style={{
                fontFamily: "var(--ff-display)", fontSize: 18, lineHeight: 1,
                color: "var(--accent)",
                border: "1.5px solid var(--accent)",
                width: 28, height: 28, borderRadius: 999,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                letterSpacing: 0,
              }}>{n}</span>
              <div>
                <div className="subhead" style={{ fontSize: 12 }}>{title}</div>
                <div className="body" style={{ fontSize: 12, color: "var(--ink-mid)", marginTop: 2 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* welcome blurb */}
      <div style={{
        marginTop: 22, padding: "18px 22px",
        background: "var(--surface-2)", borderLeft: "3px solid var(--accent)",
        display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center",
      }}>
        <span className="headline" style={{ fontSize: 28 }}>WELCOME TO BLUEVILLE.</span>
        <span className="body" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          Come for the history. Stay because you can't afford the gas.
        </span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>
          SIGN · HWY 90
        </span>
      </div>
    </section>
  );
}

function Glitter() {
  return (
    <section id="glitter" style={{ padding: "56px 48px", borderTop: "1px solid var(--border)" }}>
      <SectionHead num="04" label="Glitter" kicker="THE EYE-DROP DRUG" />
      <div style={{
        display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, marginTop: 22, alignItems: "start",
      }}>
        <div className="card" style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden" }}>
          <span className="slug glitter">GLITTER · DRUG</span>
          <div className="headline" style={{ fontSize: 36, lineHeight: 0.95 }}>
            ONE DROP. <br/>TWENTY MINUTES OF WARMTH. <br/><span style={{ color: "var(--glitter)" }}>BLUE STARS AT THE EDGE OF VISION.</span>
          </div>
          <div className="body" style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
            An eye-drop dose. Cheap. Everywhere. Twenty minutes of warm, then an hour of
            blue points at the corners of your sight that nobody else can see. Coming down
            costs everyone in the room. The craving comes back twelve hours later.
          </div>
          <div className="body" style={{ fontSize: 12.5, color: "var(--ink-mid)" }}>
            Glitter is the engine of the season. Becky has a tin of it in her purse. Jaw-man's
            people move it. Mom's boyfriend uses, quietly. Most of Blueville pretends not to know.
          </div>
          {/* a couple of motes */}
          <span className="glitter-star" style={{ position: "absolute", top: 18, right: 22, width: 14, height: 14 }}/>
          <span className="glitter-star" style={{ position: "absolute", top: 60, right: 60, width: 8, height: 8 }}/>
          <span className="glitter-star" style={{ position: "absolute", bottom: 30, right: 36, width: 10, height: 10 }}/>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["FIRST 20 MIN", "Cheap warmth. Everything looks worth it. +1 to PUSH BACK."],
            ["1 HOUR IN", "Blue stars in peripheral vision. Can't lie convincingly."],
            ["COMING DOWN", "Mark a Crash. −1 to anything in the room until they're alone."],
            ["12 HRS LATER", "Craving. Until they dose or sleep it off, all rolls vs. the source are −1."],
          ].map(([k, v], i) => (
            <div key={k} className="card" style={{ padding: "12px 14px", display: "flex", gap: 14, alignItems: "center" }}>
              <span className="numtag" style={{ minWidth: 32, textAlign: "center" }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="subhead" style={{ fontSize: 12 }}>{k}</div>
                <div className="body" style={{ fontSize: 12.5, color: "var(--ink-mid)" }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const RESOURCES = [
  ["Core Book", "PDF · 48 pages · letter + A4 · printer-grayscale included", "BOOK · 01"],
  ["GM Screen", "PDF · 3 landscape panels · 11×8.5", "BOOK · 02"],
  ["Handout Pack", "PDF · 12 cards · print-and-cut", "BOOK · 03"],
  ["Session Zero Sheet", "PDF · 1 page · lines & veils, x-card, debrief", "BOOK · 04"],
  ["VTT Pack", "ZIP · Roll20 + Foundry tokens and macros", "BOOK · 05"],
  ["Style Guide", "Markdown · visual canon for portrait art, locations, palette", "REF · 01"],
];

function Resources() {
  return (
    <section id="resources" style={{ padding: "56px 48px", borderTop: "1px solid var(--border)" }}>
      <SectionHead num="05" label="Resources · Coming Soon" kicker="EVERYTHING YOU NEED TO RUN IT" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 22 }}>
        {RESOURCES.map(([t, d, tag]) => (
          <a key={t} href={"/assets/" + t.toLowerCase().replace(/[\s/]+/g, "-")} className="card" style={{
            padding: "16px 20px",
            display: "grid", gridTemplateColumns: "44px 1fr auto", gap: 16, alignItems: "center",
            textDecoration: "none", color: "inherit",
          }}>
            <div style={{
              width: 44, height: 44,
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{
                fontFamily: "var(--ff-display)", fontSize: 18, letterSpacing: "0.04em",
                color: "var(--ink)",
              }}>↓</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span className="headline" style={{ fontSize: 22 }}>{t}</span>
                <span className="fld">{tag}</span>
              </div>
              <div className="body" style={{ fontSize: 12, color: "var(--ink-mid)", marginTop: 2, textDecoration: "line-through" }}>{d}</div>
            </div>
            <span style={{
              fontFamily: "var(--ff-display)", fontSize: 12, color: "var(--accent-dim)",
              border: "1px solid var(--accent-dim)", padding: "4px 10px", letterSpacing: "0.12em",
            }}>GET →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="safety" style={{
      padding: "56px 48px", borderTop: "1px solid var(--border)",
      background: "var(--surface)",
    }}>
      <SectionHead num="06" label="Safety" kicker="READ THIS BEFORE YOU PLAY" />
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40, marginTop: 22 }}>
        <div>
          <div className="headline" style={{ fontSize: 36, lineHeight: 0.96 }}>
            THIS IS A GAME ABOUT WATCHING SOMEONE YOU LOVE FALL.
          </div>
          <div className="body" style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 14, maxWidth: 560 }}>
            Addiction. Coercion. Class. A bad town in a bad decade. Set lines and veils at session
            zero. Honor them every time. If the table can't hold that, this isn't your game.
            Use the <a style={{ color: "var(--accent)" }}>Session Zero Sheet</a> in Resources.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["LINES & VEILS", "Lines are off. Veils happen offscreen."],
            ["X-CARD", "Tap it. The scene rewinds. We move on."],
            ["OPEN DOOR", "Step out of any scene without explaining."],
            ["DEBRIEF", "Five minutes at the end. How are you, the person."],
          ].map(([t, b]) => (
            <div key={t} style={{
              display: "flex", gap: 14, padding: "12px 14px",
              background: "var(--bg)", border: "1px solid var(--border)",
            }}>
              <span className="accent-bar"/>
              <div>
                <div className="headline" style={{ fontSize: 16 }}>{t}</div>
                <div className="body" style={{ fontSize: 12, color: "var(--ink-mid)" }}>{b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "26px 48px 48px", borderTop: "1px solid var(--border)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.22em" }}>
        DIGITAL · <span style={{ color: "var(--accent)" }}>SISSY</span> · v0.4 · DRAFT
      </span>
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.22em" }}>
        EPHELLON · BLUEVILLE LOCAL 14 · 2050
      </span>
    </footer>
  );
}

function LandingArtboard() {
  return (
    <div className="page" style={{ width: "100%" }}>
      <LandingNav />
      <Hero />
      <Premise />
      <Cast />
      <World />
      <Glitter />
      <Resources />
      <Safety />
      <Footer />
    </div>
  );
}

window.LandingArtboard = LandingArtboard;
