// art/playbooks.jsx — 12 interactive playbook character sheets.
// State persisted to localStorage under dig.sys.pb.<slug>.

const STAT_KEYS = ["CHARM", "GRIT", "SLICK", "HEART", "COOL"];

const PLAYBOOKS = {
  tinkerer: {
    no: "01",
    title: "THE TINKERER",
    source: "ARTIFICER",
    pitch: "Auto-shop type. Lives in his garage. Makes broken things work because nobody's coming to fix them — not the landlord, not the city, not the manufacturer who sold the thing in the first place. Has a Plex server he built himself and is irrationally proud of it.",
    look: "Oil-stained hands he can't fully wash. Cargo pants, three pens in one pocket. Reads tools the way other people read faces. Hat optional but probable.",
    stats: { CHARM: -1, GRIT: 1, SLICK: 2, HEART: 1, COOL: 0 },
    starting: [
      { name: "JURY-RIG", sig: true, roll: "+SLICK",
        body: "When you spend at least a scene alone with a busted thing, roll +Slick.",
        a: "Make it work for the rest of the session.",
        b: "It works once when you need it, then breaks worse.",
        c: "It breaks worse without working." },
      { name: "SALVAGE", roll: "no roll",
        body: "When you spend time pulling apart broken hardware, recover one useful component without spending cash. State its purpose; the GM honors it within reason." },
      { name: "THE WORKSHOP", roll: "fictional",
        body: "Your garage is yours. Anyone you bring there in a scene of presence heals 1 Wear. The GM may threaten it but not casually take it." },
    ],
    advance: [
      { name: "SCHEMATIC SIGHT", roll: "+SLICK",
        body: "Study a machine or system. 10+ the GM tells you how it could be turned against itself. 7–9 you see the obvious vulnerability." },
      { name: "FIELD MODIFY", roll: "1/session",
        body: "Give a piece of gear a temporary new function for one scene. State the function; the GM honors it if the fiction can stretch." },
      { name: "THE RIG", roll: "—",
        body: "Your personal device has three custom functions you describe; they work as you say. If lost, rebuild over one session." },
      { name: "RUN IT HOT", roll: "+SLICK",
        body: "Push a machine past spec. 10+ it does the extra thing and survives. 7–9 it does the thing and breaks. 6− breaks before doing the thing, costs." },
    ],
    gear: [
      "Multitool, well-worn",
      "Tablet, lifted or salvaged, runs three OSes",
      "Cargo pants with too many pockets",
      "Soldering iron, 2050s spec (wireless, runs hot)",
      "A busted phone full of harvested parts",
    ],
    bond: "You fixed something of Alex's once that mattered to her. Describe what, and what she still owes you for it (cash, silence, a favor, knowledge).",
    xp: "Mark XP when you fix something irreplaceable to someone.",
  },

  roughneck: {
    no: "02",
    title: "THE ROUGHNECK",
    source: "BARBARIAN",
    pitch: "Felt everything as a physical fact since middle school. Hits before words because words never worked at home. Knows three bouncers by name. Got kicked off the football team for one fight too many; never quite recovered the social position.",
    look: "Heavy frame whether muscled or just thick. Knuckles permanently red. Wears the same jacket year-round. Stands like someone who's already calculated which way to swing.",
    stats: { CHARM: -1, GRIT: 2, SLICK: 0, HEART: 1, COOL: 1 },
    starting: [
      { name: "TAKE IT FOR THEM", sig: true, roll: "no roll",
        body: "When you put yourself between violence and another character, mark the harm on whichever of your tracks (Body or Wear) the GM picks — the one that hurts worse for you right now." },
      { name: "POUND FOR POUND", roll: "—",
        body: "When you initiate violence first in an exchange, every harm in that exchange comes in at one ladder rung lower. Runs out when you stop initiating." },
      { name: "THE OLD CROWD", roll: "1/session",
        body: "You know other Roughnecks across Blueville. Summon one to the scene. They show up. They want something." },
    ],
    advance: [
      { name: "THE HELMET", roll: "1/session",
        body: "Like Jaw-man, you took a hit to the head once. When you remember the moment, mark Body harm and gain +1 Cool until session end." },
      { name: "BRUISER", roll: "—",
        body: "Your fists count as armed for harm purposes. People remember the last fight before they pick the next one." },
      { name: "READ THE BODY", roll: "—",
        body: "When you watch someone for a moment, the GM tells you one thing about what they've been through physically." },
      { name: "WON'T DROP", roll: "1/session",
        body: "When you would mark dying on the Body track, mark 3-body twice instead. Useless for the scene but not dying." },
    ],
    gear: [
      "Old varsity jacket (Blueville High, two seasons)",
      "Folding knife",
      "Flask",
      "Brass knuckles or equivalent (quarters in a sock)",
      "A key to somewhere you shouldn't have a key to",
    ],
    bond: "You hit somebody for Alex once. Describe when, who, and whether either of you ever spoke about it after.",
    xp: "Mark XP when you take harm meant for someone you cared about.",
  },

  voice: {
    no: "03",
    title: "THE VOICE",
    source: "BARD",
    pitch: "Karaoke regular who almost had a YouTube moment in high school. Streams to 80 followers, half of them bots. Knows every song at every bar in Blueville and the right time to call each one. Can make a smoke session feel like a party even when nobody's having fun.",
    look: "Dressed slightly above the room. Voice already a little gravelly from use. Touches their throat when they're nervous. Always knows where the light is.",
    stats: { CHARM: 2, GRIT: -1, SLICK: 1, HEART: 1, COOL: 0 },
    starting: [
      { name: "WORK THE ROOM", sig: true, roll: "+CHARM",
        body: "When you perform for three or more, roll +Charm.",
        a: "Everyone present takes −1 forward to oppose you for the scene.",
        b: "Choose two of the room.",
        c: "You become the center of unwanted attention." },
      { name: "THE GIG", roll: "1/session",
        body: "Declare a gig — karaoke, party, wedding, livestream, open mic. Establish the venue. While there, +1 to Charm rolls." },
      { name: "PITCH PERFECT", roll: "+CHARM",
        body: "When you echo someone's words back in their tone and rhythm — 10+ they go along with the implied. 7–9 they go along but notice. 6− they recognize the tactic." },
    ],
    advance: [
      { name: "FOLLOWERS", roll: "1/session",
        body: "Name your small online audience. Leverage them for an information request, a favor, or a piece of public attention. They don't show up in person." },
      { name: "THE HOOK", roll: "—",
        body: "Slip an earworm into a conversation; the target uses it back to you in the same scene. Use that moment for +1 forward to a social move." },
      { name: "COVER SONG", roll: "+CHARM",
        body: "Take on someone's identity briefly in front of someone who knows them. 10+ full pass. 7–9 pass with a tell. 6− they know." },
      { name: "STAGE MOM ENERGY", roll: "—",
        body: "When you publicly advocate hard for another PC in a scene, that PC takes +1 forward to their next move." },
    ],
    gear: [
      "Phone with a real microphone setup attached",
      "A change of clothes for the venue",
      "Drink ticket book or equivalent (always has a way in)",
      "Earpiece, tiny, half-modded",
      "A signed setlist from the one show that mattered",
    ],
    bond: "You and Alex used to sing together (or you sang and she watched, or she sang and you watched). Describe the song and the night.",
    xp: "Mark XP when you perform publicly in a way that mattered to a scene's outcome.",
  },

  faithful: {
    no: "04",
    title: "THE FAITHFUL",
    source: "CLERIC",
    pitch: "Pentecostal grandma's grandkid. Hospice aide or church pantry volunteer or both. Shows up when nobody else does. Gives away what she can't spare. Knows the right hymn for the right moment but doesn't always sing it.",
    look: "Tired-eyed. Sensible shoes. Dressed plainly. Hands that have washed a lot of dishes and held a lot of other hands. Carries something small that smells faintly of something — coffee, soap, lavender, somebody's perfume.",
    stats: { CHARM: 1, GRIT: 1, SLICK: -1, HEART: 2, COOL: 0 },
    starting: [
      { name: "TEND", sig: true, roll: "no roll",
        body: "When you stay with someone in their hurt for a full scene, they heal 1 harm (Body or Wear, their pick), and you take 1 Wear." },
      { name: "WITNESS BEARING", roll: "—",
        body: "When you tell the truth at cost to yourself, mark 1 XP immediately and gain +1 forward on your next Charm roll." },
      { name: "THE PANTRY", roll: "1/session",
        body: "You keep a small store of food, supplies, or cash you intend to give away. Give 1 unit of help to anyone — heal 1 Wear, shelter for a night, hide for a scene." },
    ],
    advance: [
      { name: "LAYING ON HANDS", roll: "—",
        body: "When you Tend, heal 2 harm instead of 1. You take 2 Wear instead of 1." },
      { name: "THE CONGREGATION", roll: "1/session",
        body: "Name your church, mutual-aid group, or community network. Call on them — alibi, search party, prayer chain that produces leads, a meal for ten." },
      { name: "VIGIL", roll: "—",
        body: "When you sit with someone in the dying state, they cannot reach dead until you leave the room. Take 1 Wear at the start of each scene of vigil." },
      { name: "FORGIVENESS", roll: "—",
        body: "When you forgive someone genuinely and they know it, reset your bond to base. They reduce a track of your choice by 1 step." },
    ],
    gear: [
      "A Bible or equivalent, well-used",
      "A casserole dish (always full or being returned)",
      "Small bills, kept folded",
      "Phone full of birthdays and prescription schedules",
      "A blanket washed a thousand times",
    ],
    bond: "You knew Alex's mom (Cindy) before Alex was born, or you knew Alex before her mom got mean. Describe the version of her family you remember.",
    xp: "Mark XP when you give something away that you couldn't spare.",
  },

  wired: {
    no: "05",
    title: "THE WIRED",
    source: "DRUID · TECHNO-NERD",
    pitch: "Talks to networks the way some people talk to dogs. Server-room kid grown up. Doesn't disconnect even when she sleeps. Notices when the WiFi is wrong before anyone else does. Lives behind three monitors and a habit of speaking to her devices by name.",
    look: "Pale from the screens. Wired earpiece always in. Backpack with three battery packs visible. Phone in hand even mid-conversation. Eyes flick to notifications she alone can see.",
    stats: { CHARM: 0, GRIT: -1, SLICK: 1, HEART: 2, COOL: 1 },
    starting: [
      { name: "COMMUNE", sig: true, roll: "+HEART",
        body: "Spend time alone with a connected device, roll +Heart.",
        a: "Ask 2: who was here · what they wanted · who they spoke to · what they hid · where they went.",
        b: "Ask 1.",
        c: "The system pushes back — the GM tells you what notices you." },
      { name: "ALWAYS ONLINE", roll: "+HEART",
        body: "Given a scene of access, find any digital information. 10+ clean. 7–9 trip an alarm. 6− you find a counterfeit and don't know it." },
      { name: "DISTRIBUTED", roll: "—",
        body: "You have backups everywhere. If a device of yours is taken, destroyed, or compromised, you can recover its contents within one session from a different node." },
    ],
    advance: [
      { name: "PUSH", roll: "1/session",
        body: "Push a connected device to do something it shouldn't — open a door it controls, log a fake entry, ping a target's location. The GM says what it can stretch to." },
      { name: "WRAITH", roll: "—",
        body: "When you would be tracked digitally, you aren't. State why your trail goes cold; the fiction accommodates." },
      { name: "PET", roll: "—",
        body: "Name a personal device with minor agency — a drone, a modded phone, a bot. It obeys within reason and has its own small character." },
      { name: "HIVEMIND", roll: "—",
        body: "When you tap into a network of devices in an area (a building, a block, a venue), ask the GM 1 question about anyone present." },
    ],
    gear: [
      "Phone (modded, custom OS)",
      "Tablet (also modded)",
      "Battery banks, plural",
      "A drone or similar, small enough to carry",
      "A device only you understand",
    ],
    bond: "You set Alex up with something digital once — a phone, an account, a connection. You know what it's named on. Describe what.",
    xp: "Mark XP when you used technology to know something no one else could.",
  },

  vet: {
    no: "06",
    title: "THE VET",
    source: "FIGHTER",
    pitch: "Discharged early, or honorably, or somewhere in between. Knows how to hurt people because someone taught them, which is different from the Roughneck. The discipline outlasted the uniform. Works odd jobs and watches the door.",
    look: "Holds posture even when relaxed. Eyes scan the exits when they walk in. Hair shorter than fashion. Hands quiet. Doesn't startle.",
    stats: { CHARM: -1, GRIT: 1, SLICK: 1, HEART: 0, COOL: 2 },
    starting: [
      { name: "READ THE FIGHT", sig: true, roll: "+COOL",
        body: "When violence is about to start, roll +Cool.",
        a: "Name the outcome before the first blow lands; the GM honors it within reason.",
        b: "You see one move ahead.",
        c: "You freeze for the first beat." },
      { name: "FIRST MOVE", roll: "+COOL",
        body: "Act first in a violent exchange. 10+ choose two: hit · avoid being hit · reposition · disarm. 7–9 choose one." },
      { name: "THE DRILL", roll: "1/session",
        body: "You have a routine that calms you — push-ups, breath count, weapons check. Clear 1 Wear." },
    ],
    advance: [
      { name: "OLD WOUND", roll: "—",
        body: "Your old injury aches before violence. Gain +1 forward on Cool for the encounter. The injury sometimes lies." },
      { name: "SUPPRESS", roll: "—",
        body: "Make someone keep their head down. 10+ they don't act until the scene shifts. 7–9 they don't act until you give them an opening or look away." },
      { name: "THE BUDDY", roll: "1/session",
        body: "Name another vet you know in Blueville. They show up for one ask. They're more reluctant each time." },
      { name: "TRAINED EYE", roll: "—",
        body: "When you assess a violent situation, the GM tells you the weak link — the person, the object, the angle that's going to break first." },
    ],
    gear: [
      "A sidearm (laser or conventional)",
      "A folding knife you've sharpened too many times",
      "A vehicle that runs (truck, motorcycle, beater sedan)",
      "A bag with three days of clothes always packed",
      "A challenge coin or equivalent token",
    ],
    bond: "You watched Alex grow up at a distance, or you came back from somewhere and she was suddenly an adult. Describe what changed about her between the times you saw her.",
    xp: "Mark XP when you saw the violence coming and acted on it.",
  },

  clean: {
    no: "07",
    title: "THE CLEAN",
    source: "MONK",
    pitch: "Six months sober. Twelve months. Eighteen days again. Knows how easy the slip is, knows the shape of the pull, knows which words the people who love them stopped saying. Sponsors others to keep their own discipline taut.",
    look: "Lean. Carries less than they used to. Wears one good outfit and washes it. Coffee always in hand. Speaks more carefully than people expect, with longer pauses than feel comfortable.",
    stats: { CHARM: -1, GRIT: 1, SLICK: 0, HEART: 1, COOL: 2 },
    starting: [
      { name: "SPONSOR", sig: true, roll: "no roll",
        body: "When you carry someone through their withdrawal, breaking, or worst moment in a full scene of presence, reduce their Using or Wear track by 1 step. You take 1 Wear and gain +1 forward on your next Hold the Line." },
      { name: "THE STEP", roll: "1/scene",
        body: "When you're tempted to use, dose, fight, lie, or cheat and you don't, mark XP." },
      { name: "ONE DAY AT A TIME", roll: "—",
        body: "At session start, declare today's intention in one sentence. If you uphold it through the session, gain +1 forward on Cool to the first roll of next session." },
    ],
    advance: [
      { name: "THE MEETING", roll: "1/session",
        body: "Name a recovery meeting in Blueville. Access it for support, anonymity, or word-of-mouth information." },
      { name: "SIT WITH IT", roll: "1/scene",
        body: "When you experience a hard emotion fully without acting on it, mark XP and clear 1 Wear." },
      { name: "CENTER", roll: "1/session",
        body: "Before a roll, take a breath. Reroll one die." },
      { name: "HIGHER POWER", roll: "1/session",
        body: "Name what you turned your life over to. Invoke it for guidance; the GM gives you a one-word answer." },
    ],
    gear: [
      "A coffee thermos (refilled, never emptied)",
      "A token, chip, or note marking time",
      "A small phonebook of sponsees and sponsors",
      "A bag of supplies for somebody else's worst night",
      "Reading material that helps",
    ],
    bond: "You knew Alex when one of you was using and the other wasn't. Describe which way it was, and whether the other one knew at the time.",
    xp: "Mark XP when you resisted the pull.",
  },

  believer: {
    no: "08",
    title: "THE BELIEVER",
    source: "PALADIN",
    pitch: "Has a code. The code is the code. Could be religious, political, personal, learned-the-hard-way — anchored to one principle and not negotiating. Sometimes wrong about what's right. Never wrong about whether to act on it.",
    look: "Stands straight without trying. Eyes that don't drift in arguments. Wears a single symbol of the principle, somewhere obvious — a cross, a tattoo, a pin, a phrase on a shirt. Speaks plainly. Doesn't joke much.",
    stats: { CHARM: 2, GRIT: 1, SLICK: -1, HEART: 0, COOL: 1 },
    starting: [
      { name: "WITNESS", sig: true, roll: "+CHARM",
        body: "When you publicly stand on your code in front of someone who has to reckon with it, roll +Charm.",
        a: "They reckon — either join you or move out of your way.",
        b: "They reckon, but you've made an enemy.",
        c: "They laugh." },
      { name: "THE CODE", roll: "—",
        body: "Write down your one principle in one sentence. When you act on it at cost, mark XP. When you violate it, the GM marks one step on your Using or Wear track." },
      { name: "UNFLINCHING", roll: "—",
        body: "When you would be intimidated, cowed, or talked down by force of presence, you aren't. The fiction reflects this; no −forward from intimidation." },
    ],
    advance: [
      { name: "THE WORD", roll: "—",
        body: "When you make a vow aloud and someone hears it, you cannot break it without consequence. While it holds, gain +1 to acts in service of it." },
      { name: "SMITE", roll: "—",
        body: "When you publicly name someone as your enemy and they hear it, the bond to them drops to its lowest. They take −1 forward against you as long as your conviction holds." },
      { name: "THE ACOLYTE", roll: "—",
        body: "Gain a younger character who follows you. NPC, GM-voiced, looks up to you. They will follow you into trouble." },
      { name: "LAY DOWN THE LAW", roll: "+CHARM",
        body: "Publicly call out someone for breaking your code in front of a room. 10+ the room sides with you for the scene. 7–9 half the room sides with you." },
    ],
    gear: [
      "The symbol of the principle (cross, pin, tattoo, badge, photo)",
      "A book of the principle",
      "A vehicle that's a little too clean",
      "A list of names — owe, owed, broke the code",
      "A weapon you've never drawn but carry anyway",
    ],
    bond: "You tried to save Alex once before any of this started. Describe how, and whether she ever knew you were trying.",
    xp: "Mark XP when you stood on the code at cost to yourself.",
  },

  outsider: {
    no: "09",
    title: "THE OUTSIDER",
    source: "RANGER",
    pitch: "Lives on the edge of Blueville, half off-grid. Knows the back roads, the marsh, the abandoned subdivisions the hurricanes hollowed out. Social skills atrophied while survival skills sharpened. Comfortable alone in the heat.",
    look: "Tan that goes deep. Wears layers even in summer. Boots, always. Carries less in town than they do out of town. Eyes adjust slowly when they come indoors.",
    stats: { CHARM: 0, GRIT: 1, SLICK: 2, HEART: -1, COOL: 1 },
    starting: [
      { name: "THE BACK WAY", sig: true, roll: "+SLICK",
        body: "When you need to move people or product through Blueville unseen, roll +Slick.",
        a: "Clean route.",
        b: "Clean but you owe someone.",
        c: "Wrong turn — there's somebody you don't want to see." },
      { name: "BUSHCRAFT", roll: "—",
        body: "Survive overnight in the marsh, woods, or abandoned property. State your camp; you and anyone with you reduce 1 Wear instead of taking it overnight." },
      { name: "PRE-EMPT", roll: "+SLICK",
        body: "Spot trouble before others do. 10+ registers ~30 seconds early — warn the party or act first. 7–9 you have time for one move." },
    ],
    advance: [
      { name: "THE HIDE", roll: "—",
        body: "Establish a place no one else knows about — a shack, stash spot, half-flooded house. Shelters 1–3 indefinitely until found." },
      { name: "TALK TO ANIMALS", roll: "—",
        body: "(Mostly dogs.) You read animals like people. The GM answers your questions about animal presence and direction." },
      { name: "STALKER", roll: "—",
        body: "When you follow someone unseen, you stay unseen until you choose otherwise. Crossing into populated areas may require a roll." },
      { name: "THE BOAT", roll: "—",
        body: "You have access to a small boat — flatbottom, kayak, whatever. The climate-stressed coastline gets more useful by the year." },
    ],
    gear: [
      "Boots, broken in",
      "A knife you've used on more than food",
      "A canvas bag with rope, tarp, water, lighter",
      "A vehicle that handles unpaved",
      "Something from the marsh — a feather, a tooth, a piece of shell",
    ],
    bond: "You spent time alone with Alex once, somewhere outside town. Describe the place and what neither of you said.",
    xp: "Mark XP when you used your territory to protect or hide someone.",
  },

  grifter: {
    no: "10",
    title: "THE GRIFTER",
    source: "ROGUE",
    pitch: "Learned to lift because she had to, then learned to like it. Tells small lies to stay sharp. Played her first long con on a teacher in seventh grade and never quite stopped. The Slick stat embodied.",
    look: "Dresses one notch up from her surroundings — looks like she belongs slightly above whatever room she's in. Reads what people want and reflects it back. Quick smile, quicker exit.",
    stats: { CHARM: 1, GRIT: -1, SLICK: 2, HEART: 0, COOL: 1 },
    starting: [
      { name: "SET THE MARK", sig: true, roll: "+SLICK",
        body: "When you spend a scene building a false story with someone, roll +Slick.",
        a: "They believe it deeply; call on it later for +1 forward to deceive them.",
        b: "They believe it shallow; one chance to use it.",
        c: "They're playing you back." },
      { name: "POCKETS", roll: "—",
        body: "When someone underestimates you in a scene, lift something small off them or near them without rolling. The GM tells you what's available." },
      { name: "THE SWITCH", roll: "1/session",
        body: "Declare that you already swapped one item for another in a previous scene. Establish the swap retroactively; the GM tells you the cost if any." },
    ],
    advance: [
      { name: "DOUBLETALK", roll: "—",
        body: "When you talk to two people in one scene who don't talk to each other, tell each a different version. Both believe their version for the scene." },
      { name: "THE MARK PAYS TWICE", roll: "—",
        body: "When you've grifted someone successfully, grift them again for half the work — one roll, simpler stakes." },
      { name: "DISAPPEARING ACT", roll: "1/session",
        body: "You weren't there. The GM and other players accept this; rewind one beat. Useful but burns trust if overused." },
      { name: "READING HANDS", roll: "—",
        body: "You spot tells. In any social scene, the GM names one thing the target is hiding." },
    ],
    gear: [
      "A wallet that isn't yours",
      "A second wallet that is yours",
      "Three IDs, at least one real",
      "A phone with three contact lists",
      "A jacket with concealed pockets",
    ],
    bond: "You ran a con with Alex once, or you used Alex without her knowing it. Describe which, and whether she ever found out.",
    xp: "Mark XP when you got away with it.",
  },

  touched: {
    no: "11",
    title: "THE TOUCHED",
    source: "SORCERER",
    pitch: "Hunches that pan out. Dreams that warn. The seer-aunt's grandkid. Unmodded, unexplained, Southern Gothic intuition — the kind everybody in town pretends not to take seriously and then asks you about in private.",
    look: "Carries an absence in their attention; half-listening to something nobody else is hearing. Dresses casually but always wears one specific item — a pendant, a ring, a scarf, a particular jacket — that they don't take off. Eyes that don't quite focus on you the whole time you're talking.",
    stats: { CHARM: 1, GRIT: -1, SLICK: 0, HEART: 2, COOL: 1 },
    starting: [
      { name: "THE FLASH", sig: true, roll: "1/session",
        body: "Declare you saw this coming. Reveal one detail about the current scene that wasn't established. The GM honors it if it doesn't break canon." },
      { name: "KNACK", roll: "1/session",
        body: "Name your specific knack at character creation (rain, who's pregnant, when something's about to break, when somebody's lying). Declare the knack triggered." },
      { name: "THE PULL", roll: "—",
        body: "When you feel pulled toward something or someone without explanation, follow it. Gain +1 forward on the next move in the scene where it pulled you." },
    ],
    advance: [
      { name: "VISION", roll: "1/session",
        body: "Describe a short scene from a possible future. The GM honors it if it fits canon trajectory; otherwise says how it gets reshaped before it happens." },
      { name: "THE COLD SPOT", roll: "—",
        body: "Name a location and ask the GM if anything bad is going to happen there; the GM tells you yes, no, or \"soon.\"" },
      { name: "NAMES", roll: "—",
        body: "When you say someone's name in a way they hear it, gain +1 forward to all moves toward them for the scene." },
      { name: "THE OTHER SIDE", roll: "—",
        body: "When you sit with someone dying or breaking, perceive what's pulling at them — regret, who they want to see, what they would say if they could." },
    ],
    gear: [
      "The item you don't take off",
      "A journal of dreams (not always written in)",
      "A worn deck of cards or set of stones",
      "A pendant or photo of whichever relative had the gift before you",
      "A phone with one specific person's number for grounding",
    ],
    bond: "You saw something about Alex before it happened — a dream, a feeling, a flash. Describe what you saw, and whether you ever told her.",
    xp: "Mark XP when you saw it coming.",
  },

  reader: {
    no: "12",
    title: "THE READER",
    source: "WIZARD",
    pitch: "Knows the system. Legal, financial, technical, bureaucratic — the rules nobody else read. Lawyer's kid who didn't make law school. Paralegal. Tax-prep clerk. The person who reads the fine print and remembers it.",
    look: "Glasses or contacts. Dressed slightly more formally than the room requires. Carries a bag. Reads constantly — phone, tablet, paperwork, even at meals. Speaks in clauses.",
    stats: { CHARM: 0, GRIT: -1, SLICK: 1, HEART: 1, COOL: 2 },
    starting: [
      { name: "READ THE SYSTEM", sig: true, roll: "+COOL",
        body: "When you study a bureaucracy, operation, or organization, roll +Cool.",
        a: "Ask 3: who has the real power · where's the weak point · what's the unspoken rule · who's about to break it.",
        b: "Ask 1." },
      { name: "THE LOOPHOLE", roll: "+SLICK",
        body: "Propose a legal, financial, or procedural way around a problem. 10+ it works and it's clean. 7–9 it works but somebody notices. 6− backfires." },
      { name: "THE FILE", roll: "1/session",
        body: "You keep records nobody else has. Produce a document, screenshot, or printed record that supports a claim. The record is real." },
    ],
    advance: [
      { name: "SUBPOENA", roll: "—",
        body: "When you formally demand information from someone embedded in an institution, they either give it to you or admit they're hiding it." },
      { name: "PRECEDENT", roll: "—",
        body: "When you cite a similar past situation that resolved well for someone like you, gain +1 forward to act on it." },
      { name: "THE CONNECTION", roll: "1/session",
        body: "Name someone embedded in a system — a cop, a lawyer, a banker, a clerk, a notary. They take your calls." },
      { name: "AUDIT", roll: "—",
        body: "When you go through someone's records (legal, financial, digital), you find one thing they didn't want found." },
    ],
    gear: [
      "A laptop, well-organized",
      "A binder or accordion folder of records",
      "A pen that costs more than it should",
      "Two phones — personal and the one for clients",
      "A business card from a job that doesn't quite exist anymore",
    ],
    bond: "You handled something for Alex's family once — a form, a court date, a tax mess, an insurance claim. Describe what, and what it cost you to handle it.",
    xp: "Mark XP when you used the rules against the people who wrote them.",
  },
};

// — localStorage ——————————————————————————————————————————————————

function useLS(key, def) {
  const [v, sv] = React.useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s !== null ? JSON.parse(s) : def;
    } catch { return def; }
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

const PB_STATE_DEFAULT = {
  name: '', pronouns: '', player: '', xp: 0,
  advances: [false, false, false, false],
  gear: [false, false, false, false, false],
  bond: '',
};

// — atoms ——————————————————————————————————————————————————————————

function StatBox({ k, v }) {
  const isPeak = v === 2;
  const isDump = v === -1;
  const sign = v > 0 ? "+" + v : String(v);
  return (
    <div style={{
      flex: 1,
      border: "1.5px solid " + (isPeak ? "var(--accent)" : "var(--border-strong)"),
      background: isPeak ? "var(--accent)" : "var(--surface)",
      color: isPeak ? "var(--accent-on)" : "var(--ink)",
      padding: "8px 6px 6px",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
    }}>
      <span className="mono" style={{
        fontSize: 11, letterSpacing: "0.16em",
        color: isPeak ? "var(--accent-on)" : "var(--ink-mid)",
      }}>{k}</span>
      <span className="headline" style={{
        fontSize: 30, lineHeight: 1,
        color: isPeak ? "var(--accent-on)" : (isDump ? "var(--ink-dim)" : "var(--ink)"),
      }}>{sign}</span>
    </div>
  );
}

function MoveBlock({ m, signature }) {
  return (
    <div style={{
      padding: "9px 12px 9px",
      background: signature ? "var(--surface-2)" : "var(--surface)",
      borderLeft: signature ? "3px solid var(--accent)" : "1px solid var(--border)",
      borderTop: signature ? "none" : "1px solid var(--border)",
      borderRight: signature ? "none" : "1px solid var(--border)",
      borderBottom: signature ? "none" : "1px solid var(--border)",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          {signature && (
            <span className="mono" style={{
              fontSize: 11, letterSpacing: "0.18em",
              background: "var(--accent)", color: "var(--accent-on)",
              padding: "2px 5px 1px",
            }}>SIG</span>
          )}
          <span className="headline" style={{ fontSize: 15, lineHeight: 1 }}>{m.name}</span>
        </div>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: "0.14em",
          color: m.roll && m.roll.startsWith("+") ? "var(--accent)" : "var(--ink-dim)",
          border: "1px solid " + (m.roll && m.roll.startsWith("+") ? "var(--accent)" : "var(--ink-faint)"),
          padding: "1px 5px", whiteSpace: "nowrap",
        }}>{m.roll}</span>
      </div>
      <div className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.4 }}>
        {m.body}
      </div>
      {(m.a || m.b || m.c) && (
        <div style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: "1px 6px", marginTop: 1 }}>
          {m.a && <><span className="mono" style={{ fontSize: 11, color: "var(--ink)" }}>10+</span>
            <span className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.a}</span></>}
          {m.b && <><span className="mono" style={{ fontSize: 11, color: "var(--glitter)" }}>7–9</span>
            <span className="body" style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.3 }}>{m.b}</span></>}
          {m.c && <><span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>6−</span>
            <span className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.3 }}>{m.c}</span></>}
        </div>
      )}
    </div>
  );
}

function AdvanceBlock({ m, checked, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        padding: "7px 10px",
        border: "1px solid var(--border)",
        background: checked ? "var(--surface-2)" : "transparent",
        display: "flex", flexDirection: "column", gap: 2,
        cursor: "pointer",
        transition: "background 0.12s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 6 }}>
        <span className="headline" style={{ fontSize: 12, lineHeight: 1 }}>
          <span style={{
            color: checked ? "var(--accent)" : "var(--ink-faint)",
            marginRight: 6, fontSize: 11,
          }}>{checked ? '●' : '○'}</span>
          {m.name}
        </span>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: "0.1em",
          color: m.roll && m.roll.startsWith("+") ? "var(--accent)" : "var(--ink-dim)",
          whiteSpace: "nowrap",
        }}>{m.roll}</span>
      </div>
      <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.35 }}>
        {m.body}
      </div>
    </div>
  );
}

function XpRow({ xp, setXp }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {[1,2,3,4,5].map(i => (
        <span
          key={i}
          onClick={() => setXp(xp === i ? i - 1 : i)}
          title={`XP ${i}`}
          style={{
            width: 18, height: 18, borderRadius: 999,
            border: "1.5px solid var(--ink)",
            background: i <= xp ? "var(--ink)" : "transparent",
            display: "inline-block",
            cursor: "pointer",
            transition: "background 0.1s",
          }}
        />
      ))}
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-mid)", letterSpacing: "0.14em" }}>
        @ 5 → ADVANCE
      </span>
    </div>
  );
}

// — the sheet itself ————————————————————————————————————————————————

function PlaybookSheet({ pb, slug }) {
  const [st, setSt] = useLS('dig.sys.pb.' + slug, PB_STATE_DEFAULT);
  const patch = (p) => setSt(s => ({ ...s, ...p }));

  const headerInput = (field, placeholder, width) => ({
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--surface)',
    color: 'var(--surface)',
    fontFamily: 'var(--ff-display)',
    fontSize: 12,
    letterSpacing: '0.06em',
    padding: '2px 0',
    outline: 'none',
    width,
    placeholder,
  });

  return (
    <div className="page" style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>

      {/* header */}
      <div style={{
        background: "var(--surface-inv)", color: "var(--surface)",
        padding: "14px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: "4px solid var(--accent)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="brand-mark" style={{ width: 44, height: 44, flexShrink: 0 }} aria-label="dig.sys"/>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em", opacity: 0.55 }}>
              DIGITAL SISSY · PLAYBOOK {pb.no} / 12
            </span>
            <span className="headline" style={{ fontSize: 32, lineHeight: 0.95, color: "var(--surface)" }}>
              {pb.title}
            </span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.18em", opacity: 0.65 }}>
              SOURCE · {pb.source}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <span className="fld" style={{ color: "rgba(235,236,238,0.7)" }}>NAME</span>
          <input
            value={st.name}
            onChange={e => patch({ name: e.target.value })}
            placeholder="Character name"
            style={headerInput('name', 'Character name', 220)}
          />
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="fld" style={{ color: "rgba(235,236,238,0.7)" }}>PRONOUNS</span>
              <input
                value={st.pronouns}
                onChange={e => patch({ pronouns: e.target.value })}
                placeholder="they/them"
                style={headerInput('pronouns', 'they/them', 90)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="fld" style={{ color: "rgba(235,236,238,0.7)" }}>PLAYER</span>
              <input
                value={st.player}
                onChange={e => patch({ player: e.target.value })}
                placeholder="Player name"
                style={headerInput('player', 'Player name', 116)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ padding: "16px 30px 14px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* pitch + look */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18 }}>
          <div>
            <span className="fld">§ PITCH</span>
            <div className="body" style={{ fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.45, marginTop: 4 }}>
              {pb.pitch}
            </div>
          </div>
          <div>
            <span className="fld">§ LOOK</span>
            <div className="body" style={{ fontSize: 11.5, color: "var(--ink-soft)", lineHeight: 1.45, marginTop: 4 }}>
              {pb.look}
            </div>
          </div>
        </div>

        {/* stats */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span className="fld">§ STATS · STANDARD ARRAY +2 / +1 / +1 / 0 / −1</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
              PEAK · {Object.entries(pb.stats).find(([k, v]) => v === 2)[0]}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {STAT_KEYS.map(k => <StatBox key={k} k={k} v={pb.stats[k]} />)}
          </div>
        </div>

        {/* starting moves */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span className="fld">§ STARTING MOVES · YOU HAVE THESE FROM SESSION ONE</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
              SIG · {pb.starting[0].name}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {pb.starting.map((m, i) => (
              <MoveBlock key={m.name} m={m} signature={i === 0} />
            ))}
          </div>
        </div>

        {/* advancement moves */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span className="fld">§ ADVANCEMENT MOVES · PICK ONE WHEN YOU ADVANCE</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", letterSpacing: "0.14em" }}>
              CLICK TO CHECK
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {pb.advance.map((m, i) => (
              <AdvanceBlock
                key={m.name} m={m}
                checked={st.advances[i] || false}
                onToggle={() => patch({ advances: st.advances.map((v, j) => j === i ? !v : v) })}
              />
            ))}
          </div>
        </div>

        {/* gear + bond + XP */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 16 }}>
          <div>
            <span className="fld">§ GEAR · CLICK TO TRACK</span>
            <ul style={{ margin: "5px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {pb.gear.map((g, i) => (
                <li
                  key={i}
                  onClick={() => patch({ gear: st.gear.map((v, j) => j === i ? !v : v) })}
                  style={{ display: "flex", gap: 8, alignItems: "baseline", cursor: "pointer" }}
                >
                  <span style={{
                    width: 11, height: 11,
                    border: "1.5px solid var(--ink)",
                    background: (st.gear[i] || false) ? "var(--ink)" : "transparent",
                    flexShrink: 0,
                    display: "inline-block", position: "relative", top: 1,
                    transition: "background 0.1s",
                  }} />
                  <span className="body" style={{
                    fontSize: 11, lineHeight: 1.4,
                    color: (st.gear[i] || false) ? "var(--ink-dim)" : "var(--ink-soft)",
                    textDecoration: (st.gear[i] || false) ? "line-through" : "none",
                  }}>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="fld">§ BOND TO ALEX · +1 STARTING</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>
                  CANON · LOVED-ONES-AS-MULES
                </span>
              </div>
              <div className="body" style={{ fontSize: 11, color: "var(--ink-mid)", lineHeight: 1.4, marginTop: 4, fontStyle: "italic" }}>
                {pb.bond}
              </div>
              <textarea
                value={st.bond}
                onChange={e => patch({ bond: e.target.value })}
                placeholder="Session notes on your bond..."
                style={{
                  marginTop: 6,
                  width: "100%",
                  minHeight: 38,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--ink-soft)",
                  fontFamily: "var(--ff-body)",
                  fontSize: 11,
                  lineHeight: 1.45,
                  padding: "4px 6px",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span className="fld">§ XP TRIGGER · ON TOP OF BASE</span>
                <XpRow xp={st.xp} setXp={v => patch({ xp: v })} />
              </div>
              <div className="body" style={{ fontSize: 11, color: "var(--ink)", lineHeight: 1.4, marginTop: 4 }}>
                {pb.xp}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* footer */}
      <div style={{
        background: "var(--surface-inv)", color: "var(--surface)",
        padding: "8px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "4px solid var(--accent)", opacity: 0.95,
      }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
          DIGITAL · <span style={{ color: "var(--accent)" }}>SISSY</span> · PLAYBOOK {pb.no} · {pb.title}
        </span>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.22em" }}>
          UNPICKED VARIANTS BECOME NPCs · CANON
        </span>
      </div>
    </div>
  );
}

window.PLAYBOOKS = PLAYBOOKS;
window.PlaybookSheet = PlaybookSheet;
