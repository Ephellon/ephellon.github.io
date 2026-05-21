// art/crew.jsx — crew sheet. 1440 × 2940.
// Hero is the labeled class photo; below it, the twelve archetype pairs.

const PB_SLUGS = ['tinkerer','roughneck','voice','faithful','wired','vet','clean','believer','outsider','grifter','touched','reader'];

const ARCHETYPES = [
  {
    n: "01", arch: "ARTIFICER", pb: "THE TINKERER", m: "ADAM", f: "AMANDA",
    canon: null,
    role: "the friend whose hands you trust because they've fixed things for you",
    body: "Practical, hands-on, problem-solvers. Quiet competence — they'd rather build than talk. Patient with broken things; less patient with people who break their patience. Grease under the nails. Same engines for years.",
    voice: "Few words. Longer pauses than most. Often says \"give me a minute\" when handed a problem.",
    look: "Coveralls or work-shirts, scuffed boots. Tool clipped to belt. Hands always visible — they tell the character's story.",
    fn: "Vehicle repairs, gear-fixing, lock-picking through brute force or finesse. The crew member who comes back with \"I can make that work.\"",
    icons: "Wrench · oil-stained rag · tool roll",
  },
  {
    n: "02", arch: "BARBARIAN", pb: "THE ROUGHNECK", m: "BENSON", f: "BRIANNA",
    canon: null,
    role: "the friend you call when you can't get out of the bar fight by talking",
    body: "Direct, physical, emotional in the open. Strong is a discipline they've cultivated. Loyal in a way that's almost tribal. Slow to anger, decisive when it lands. Built from work, not the gym. Doesn't perform toughness.",
    voice: "Loud when comfortable, quiet when not. Curses without thinking. Uses \"we\" and \"us\" more than \"I\" and \"me.\"",
    look: "Tank tops or t-shirts, work boots. Tattoos and small scars visible. A built-but-not-toned body — strength from labor, not vanity.",
    fn: "When a problem needs to be carried, broken, or stood against, they handle it. Pairs with strategic archetypes — they execute the heavy parts of someone else's plan.",
    icons: "Tape on knuckles · beat-up duffel · hand-rolled cigarette",
  },
  {
    n: "03", arch: "BARD", pb: "THE VOICE", m: "BYRON", f: "BETH",
    canon: "BETH",
    role: "the friend who could make this work as a career, if circumstances allowed",
    body: "Bright, warm, performative in a way that's mostly genuine. Knows how to be the version of herself a given room needs. Real underneath; the performance is a tool, not a mask. Reads people for what they want to hear and gives it to them.",
    voice: "Honey-thick when she's on, casual and observant when she's off. Two registers, both deliberate.",
    look: "Carefully chosen wardrobe — looks effortless, isn't. Stage face and real face, switched at will.",
    fn: "Fronts the tour-agent scheme (Ep 8). Talks the crew through fights. Brings food to morning-after gatherings. The crew's diplomat — and the brightest light, which burns hardest.",
    icons: "Phone-as-camera · lipstick · a brand-friendly smile",
  },
  {
    n: "04", arch: "CLERIC", pb: "THE FAITHFUL", m: "CHRISTIAN", f: "CARLA",
    canon: "CARLA",
    role: "the friend whose job means she sees the version of this story that hasn't happened to you yet",
    body: "Plainspoken, clinic-tired, has seen too much and doesn't perform it. Quiet competence, not heroism. Believes in harm reduction because she's watched abstinence fail. Sees the dealers because they sell on the corner by her clinic.",
    voice: "Quiet, flat, exhausted-but-not-bitter. \"I've seen him selling near the clinic\" — states facts, lets people decide.",
    look: "Clinic scrubs (pale blue), often still in them when she shows up to gatherings. Comfortable shoes. Clipboard or clinic ID badge.",
    fn: "Names Ted in Ep 6. The bridge between Alex's world and the consequence-world. The crew's moral conscience without ever moralizing — her presence is the question the crew is failing to ask.",
    icons: "Scrubs · clinic ID badge · clipboard",
  },
  {
    n: "05", arch: "DRUID · TECHNO-NERD", pb: "THE WIRED", m: "DAVE", f: "DIANA",
    canon: "DIANA",
    role: "the friend you DM at 3 AM who responds immediately, because she was already up",
    body: "Quiet, focused, present through her devices. Not antisocial — always doing three things at once and one of them is on a screen. Reads the room through what people post, what's on their phones. Mistakes are rare; when she makes one, she trusted the wrong source.",
    voice: "Speaks while looking at her screen. Sentences in fragments — she's thinking about three things at once.",
    look: "Tablet or device always in hand. Hoodie, joggers, headphones around her neck. Earth tones — the only nature-link in the Druid-as-techno render.",
    fn: "Builds the fake landing pages for the tour-agent scheme. Monitors scanners. Runs background checks before the crew walks in. The crew's eyes outside the room.",
    icons: "Tablet · headphones · open laptop",
  },
  {
    n: "06", arch: "FIGHTER", pb: "THE VET", m: "FRANK", f: "FIONA",
    canon: null,
    role: "the friend who has been training for a fight that may or may not ever come",
    body: "Disciplined the way Barbarians aren't. Trained. Reads fights before they happen. Slight chip-on-shoulder energy — knows they're tough and won't apologize. Where Benson/Brianna break things, Frank/Fiona break them with purpose.",
    voice: "Clipped, observant. Asks setup questions before committing. \"Where are their hands?\" before \"What's the play?\"",
    look: "Tank tops, sweatpants, taped knuckles or wrist wraps. Gym bag nearby. Athletic but functional, not cut.",
    fn: "Combat capability with strategic thinking. Often the crew member who handles direct confrontation without escalating past what was needed. Pairs naturally with the cerebral archetypes.",
    icons: "Heavy bag · hand wraps · mouthguard in a pocket",
  },
  {
    n: "07", arch: "MONK", pb: "THE CLEAN", m: "MIKE", f: "MIKAELA",
    canon: null,
    role: "the friend you forget is in the room until they speak, and then everyone listens",
    body: "Quiet self-control in a working-class register. May or may not have actual martial-arts training; what matters is the practiced calm. Watches first. Speaks once. Loyal but not demonstrative. Presence that calms a room without anyone naming why.",
    voice: "Speaks rarely. When they do, complete sentences without filler. Pauses before responding to direct questions.",
    look: "Simple t-shirts, comfortable pants, well-worn sneakers. No watch. Hair short or pulled back simply.",
    fn: "De-escalation and observation. The crew member who reads a room and acts last. Often arrives at decisions independently and reveals them only at the moment of execution.",
    icons: "Single notebook · plain water bottle · no phone visible",
  },
  {
    n: "08", arch: "PALADIN", pb: "THE BELIEVER", m: "PHILIP", f: "PRIM",
    canon: null,
    role: "the friend who would be a cop if life had gone slightly differently",
    body: "Rules-oriented. Believes in fairness, in commitments kept, in showing up on time. Reads as ROTC or veteran — military-bearing without necessarily being military. Tension with the crew's illegal work is always present — they're doing this because it's Alex.",
    voice: "Direct, complete sentences, dislikes ambiguity. Will literally ask \"Is that legal?\" knowing the answer. Calls people by their full first name.",
    look: "Button-up shirts or polos, dark jeans, clean shoes. Hair neat. The most put-together of the crew.",
    fn: "Moral counterweight inside the crew. The dissenting voice. Stays anyway, because loyalty. Their breaking point — if they hit it — is a major late-act beat.",
    icons: "A military-style coin or pin · unlit cigarette they never smoke",
  },
  {
    n: "09", arch: "RANGER", pb: "THE OUTSIDER", m: "RICK", f: "ROSE",
    canon: null,
    role: "the friend who showed up to your wedding in boots and a flannel and looked the most comfortable in the room",
    body: "Patient. Quiet. Knows the woods around Blueville, the back roads, the spots where deer cross. Spends time alone by choice. Trusts animals more than people but doesn't perform it. Tracks the world through small details others miss.",
    voice: "Soft-spoken. Speaks slowly. Uses spatial language — \"northeast of the lake,\" \"past the second turn.\" Gets quieter under stress, not louder.",
    look: "Flannel shirts, cargo pants, scuffed hiking boots. Small worn backpack. Hair shoulder-length or pulled back.",
    fn: "Reconnaissance, navigation, escape routes. If the crew needs to disappear for days, Rick or Rose knows where to go. Strong candidate for the role of \"person who gets Alex out of town\" in a Pyrrhic-save ending.",
    icons: "Compass · pocket knife · folded map",
  },
  {
    n: "10", arch: "ROGUE", pb: "THE GRIFTER", m: "ROB", f: "RONI",
    canon: "RONI",
    role: "the friend who already cased the place before you got there",
    body: "Procedural, practical, low-drama. Asks the right questions in the right order — exactly how many vials, did they see the labels, did they say where they were from. Has done minor crime since teenagerhood; this is just the highest-stakes one. Loyal through long association, not sentiment.",
    voice: "Short, declarative. No filler. Confirms with single words. \"Right.\" \"Got it.\" \"Where?\"",
    look: "Practical wardrobe — fitted dark clothes, soft-soled shoes, hair tied back. A scout's posture.",
    fn: "Mechanical engine of the crew. Scouting, theft, watch duty. Reads people the way Becky reads Alex. Often proposes the plan and executes it. Calmest when things go sideways.",
    icons: "Folding knife · small backpack · soft-soled shoes",
  },
  {
    n: "11", arch: "SORCERER", pb: "THE TOUCHED", m: "SAM", f: "SARAH",
    canon: "SAM",
    role: "the friend you forgot was in the room until they recontextualize everything",
    body: "Intuitive, observant, quiet. Watches before speaking, then doesn't speak. Notices things other people miss because they're not trying to fit in. The crew's silent witness. Has opinions but rarely volunteers them; when asked directly, gives precise, specific answers. Loves Alex without needing to say so.",
    voice: "Brief. Often silent. When they do speak, the room listens because Sam doesn't waste words.",
    look: "Quiet wardrobe — earth tones, layers, soft fabrics. Hair in their face, often.",
    fn: "Stays behind during the gig (Ep 8) — \"someone needs to hold down the home base.\" Connective tissue when others are away. Late-act, may be the one who notices what everyone else missed.",
    icons: "Small notebook · thermos · a book they don't fully read",
    note: "Prose canon: Sam-NB (they/them). Portrait canon: Sam-M. Players may choose Sam-M, Sam-NB, or Sarah-F.",
  },
  {
    n: "12", arch: "WIZARD", pb: "THE READER", m: "WILLIAM", f: "WHITNEY",
    canon: null,
    role: "the friend who reads the contract before they sign it and tells you what to push back on",
    body: "Curious by default. Already read about the thing before it came up. Different from Diana: interested in systems and history — laws, processes, how institutions work — where Diana is interested in data and access. The crew member who knows the actual statute being violated.",
    voice: "Speaks in qualified statements. Uses \"actually\" and \"technically\" and means them. Will correct misinformation patiently.",
    look: "Sweater or cardigan over a t-shirt, glasses (one or both). A worn paperback always somewhere on their person.",
    fn: "Research, planning, exposition. Explains how a system works so the crew can find the gap. Pairs with Diana on tech — Wizard handles the analog side: paperwork, public records, archive-digging.",
    icons: "Stack of paperbacks · thrifted briefcase · ballpoint pens",
  },
];

const BACKGROUND_PAIR = {
  m: "KIM", f: "MIA",
  body: "Two faces in the class photo without an archetype slot — present in the visual canon, unwritten in the prose canon. Held as background until a session needs them. If the GM wants a thirteenth or fourteenth seat at a long-running table, this is where it comes from.",
  status: "NO CLASS · UNWRITTEN",
};

function CrewHeader() {
  return (
    <div style={{
      background: "var(--surface-inv)",
      color: "var(--surface)",
      padding: "20px 44px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: "4px solid var(--accent)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, lineHeight: 1.1 }}>
        <div className="brand-mark" style={{ width: 52, height: 52, flexShrink: 0 }} aria-label="dig.sys"/>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.55 }}>
            DIGITAL SISSY · SHEET 07 / 07 · REFERENCE
          </span>
          <span className="headline" style={{ fontSize: 38, color: "var(--surface)", letterSpacing: "0.005em" }}>
            THE CREW · TWELVE PLAYBOOKS
          </span>
        </div>
      </div>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4,
      }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.55 }}>
          BLUEVILLE · AL · WORKING CLASS · 20s
        </span>
        <span style={{
          fontFamily: "var(--ff-display)", fontSize: 18,
          border: "1.5px solid var(--surface)", padding: "3px 12px",
          letterSpacing: "0.1em", color: "var(--surface)",
        }}>FIVE OF TWELVE RENDERED</span>
      </div>
    </div>
  );
}

function CrewIntro() {
  return (
    <div style={{
      padding: "28px 44px 16px",
      display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 36, alignItems: "flex-end",
    }}>
      <div>
        <span className="fld">§ 01 · WHO THESE PEOPLE ARE</span>
        <div className="headline" style={{ fontSize: 30, lineHeight: 0.98, marginTop: 6 }}>
          THE FRIENDS ALEX GREW UP ALONGSIDE. <br/>
          <span style={{ color: "var(--accent)" }}>NONE OF THEM HAVE LEGAL MEANS TO FANCY GEAR.</span>
        </div>
      </div>
      <div className="body" style={{ fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.5 }}>
        Twelve playbooks — D&amp;D archetypes translated to Gulf Coast working-class jobs.
        Each has an M/F pair; the unselected variant typically becomes an NPC. Five canon
        so far — <b>Beth</b>, <b>Carla</b>, <b>Diana</b>, <b>Roni</b>, <b>Sam</b>. The other
        seven exist only in the class photo until a table picks them up.
      </div>
    </div>
  );
}

function ClassPhoto() {
  return (
    <div style={{ padding: "8px 44px 22px" }}>
      <div style={{
        position: "relative",
        border: "1px solid var(--border-strong)",
        background: "#1a1612",
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
      }}>
        <img
          src="art/crew/crew-labeled.png"
          alt="Class photo of the twelve archetype pairs (labeled)"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
        <div style={{
          position: "absolute", left: 12, top: 12,
          background: "var(--bg)", border: "1px solid var(--border)",
          padding: "6px 10px", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ width: 6, height: 6, background: "var(--accent)" }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.2em" }}>
            CLASS PHOTO
          </span>
        </div>
        <div style={{
          position: "absolute", right: 12, bottom: 12,
          background: "var(--bg)", border: "1px solid var(--border)",
          padding: "6px 10px",
        }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.2em" }}>
            BACK LOT · BEHIND THE EAST WAREHOUSE · OVERCAST · 26 PEOPLE
          </span>
        </div>
      </div>
      <div style={{
        marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline",
      }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>
          24 ARCHETYPE SLOTS · 2 NO-CLASS · ALL HOLDING THEIR OWN
        </span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>
          ROW 1 ▸ STANDING · ROW 2 ▸ BENCH · ROW 3 ▸ GROUND
        </span>
      </div>
    </div>
  );
}

function ArchetypeCard({ a }) {
  return (
    <div className="card" style={{
      padding: "16px 18px 14px",
      display: "flex", flexDirection: "column", gap: 10,
      position: "relative",
    }}>
      {/* head row: number + playbook title + canon flag */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: 0 }}>
          <span style={{
            fontFamily: "var(--ff-display)", fontSize: 18,
            color: "var(--accent)",
            border: "1.5px solid var(--accent)",
            padding: "2px 8px", letterSpacing: "0.04em", lineHeight: 1,
            marginTop: 2,
          }}>{a.n}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
            <span className="headline" style={{ fontSize: 22, letterSpacing: "0.01em", lineHeight: 1 }}>{a.pb}</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
              SOURCE · {a.arch}
            </span>
          </div>
        </div>
        {a.canon ? (
          <span className="slug" style={{ fontSize: 11, padding: "3px 7px" }}>CANON · {a.canon}</span>
        ) : (
          <span className="slug muted" style={{ fontSize: 11, padding: "3px 7px" }}>UNWRITTEN</span>
        )}
      </div>

      {/* pair line */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 0, color: "var(--ink-soft)" }}>
        <span className="subhead" style={{
          fontSize: 16, color: a.canon === a.m ? "var(--accent)" : "var(--ink)",
        }}>{a.m}</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", padding: "0 8px" }}>·</span>
        <span className="subhead" style={{
          fontSize: 16, color: a.canon === a.f ? "var(--accent)" : "var(--ink)",
        }}>{a.f}</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em", marginLeft: "auto" }}>
          M / F
        </span>
      </div>

      <div className="subhead" style={{ fontSize: 11, color: "var(--accent)", lineHeight: 1.3 }}>
        {a.role}
      </div>

      <hr className="rule hair" />

      <div className="body" style={{ fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
        {a.body}
      </div>

      <div style={{
        padding: "8px 10px",
        background: "var(--surface-2)",
        borderLeft: "3px solid var(--accent)",
        display: "flex", flexDirection: "column", gap: 3,
      }}>
        <span className="fld" style={{ color: "var(--accent)" }}>STORY FUNCTION</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.45 }}>{a.fn}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "3px 12px", marginTop: "auto" }}>
        <span className="fld">VOICE</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{a.voice}</span>
        <span className="fld">LOOK</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{a.look}</span>
        <span className="fld">ICONOG.</span>
        <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)" }}>{a.icons}</span>
      </div>

      {a.note && (
        <div style={{
          marginTop: 2, padding: "6px 8px",
          border: "1px dashed var(--ink-faint)",
        }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.12em" }}>
            NOTE · {a.note}
          </span>
        </div>
      )}

      {/* playbook link */}
      <a
        href={'#pb/' + PB_SLUGS[parseInt(a.n, 10) - 1]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
          padding: "5px 8px",
          background: "var(--accent)",
          color: "var(--accent-on)",
          textDecoration: "none",
          fontFamily: "var(--ff-display)",
          fontSize: 11,
          letterSpacing: "0.14em",
        }}
      >
        <span>OPEN PLAYBOOK SHEET</span>
        <span>→</span>
      </a>
    </div>
  );
}

function ArchetypeGrid() {
  return (
    <div style={{ padding: "8px 44px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <span className="fld">§ 02 · THE TWELVE</span>
          <div className="headline" style={{ fontSize: 24, marginTop: 4 }}>
            PLAYBOOKS · PICK A SLOT
          </div>
        </div>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
          M/F SWAP — UNSELECTED VARIANT BECOMES AN NPC · SEE SHEETS 09–20
        </span>
      </div>

      <div style={{
        marginTop: 14,
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
      }}>
        {ARCHETYPES.map(a => <ArchetypeCard key={a.n} a={a} />)}
      </div>
    </div>
  );
}

function BackgroundPair() {
  return (
    <div style={{ padding: "8px 44px 22px" }}>
      <div style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 14,
        paddingBottom: 10, borderBottom: "1px solid var(--ink-hair)",
      }}>
        <div>
          <span className="fld">§ 03 · TWO MORE FACES</span>
          <div className="headline" style={{ fontSize: 22, marginTop: 4 }}>
            KIM & MIA · IN THE PHOTO, OUT OF THE BOOK
          </div>
        </div>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.18em" }}>
          {BACKGROUND_PAIR.status}
        </span>
      </div>

      <div style={{
        marginTop: 14,
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "start",
      }}>
        <div style={{
          display: "flex", flexDirection: "column", gap: 6,
          padding: "16px 22px",
          background: "var(--surface-2)",
          borderLeft: "3px solid var(--accent)",
          minWidth: 220,
        }}>
          <span className="fld">UNCLASSED</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="headline" style={{ fontSize: 28 }}>{BACKGROUND_PAIR.m}</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>&nbsp;/&nbsp;</span>
            <span className="headline" style={{ fontSize: 28 }}>{BACKGROUND_PAIR.f}</span>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.16em" }}>
            CANON: PORTRAIT ONLY
          </span>
        </div>
        <div className="body" style={{ fontSize: 12.5, color: "var(--ink-soft)", lineHeight: 1.5, maxWidth: 760 }}>
          {BACKGROUND_PAIR.body}
        </div>
      </div>
    </div>
  );
}

function ThroughlineNote() {
  return (
    <div style={{
      background: "var(--accent)", color: "var(--accent-on)",
      padding: "16px 44px",
      display: "flex", gap: 22, alignItems: "center",
    }}>
      <span className="headline" style={{ fontSize: 40, flex: "0 0 auto", color: "var(--accent-on)", lineHeight: 0.9 }}>
        ⌖
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span className="subhead" style={{ fontSize: 11, color: "var(--accent-on)" }}>BRANDING THROUGHLINE</span>
        <span className="body" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--accent-on)", lineHeight: 1.4 }}>
          Everyone in this damned town peaked in high school. Dress the crew like they're trying to be someone
          they were three years ago — or someone they think they might have been, if things had gone
          differently. No designer clothing. No costumes. These are "the poors" in this world.
        </span>
      </div>
    </div>
  );
}

function CrewFooter() {
  return (
    <div style={{
      background: "var(--surface-inv)", color: "var(--surface)",
      padding: "12px 44px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      borderTop: "4px solid var(--accent)",
      opacity: 0.95,
    }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
        DIGITAL · <span style={{ color: "var(--accent)" }}>SISSY</span> · CREW SHEET · v0.4
      </span>
      <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
        CHARACTER SHEETS v0.3 · MAJOR NPCs ON SHEET 03 · PORTRAITS PENDING
      </span>
    </div>
  );
}

function CrewArtboard() {
  return (
    <div className="page" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <CrewHeader />
      <CrewIntro />
      <ClassPhoto />
      <ArchetypeGrid />
      <BackgroundPair />
      <ThroughlineNote />
      <CrewFooter />
    </div>
  );
}

window.CrewArtboard = CrewArtboard;
