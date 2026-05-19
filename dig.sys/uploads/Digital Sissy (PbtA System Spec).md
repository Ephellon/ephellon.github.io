---
title: Digital Sissy
subtitle: PbtA System Spec (Core)
stamps:
    - v0.1
    - DRAFT
    - SCOPE-CORE
tags:
    - notes
    - system
    - mechanics
    - canon
---

# Digital Sissy — PbtA System Spec (Core)

The mechanical spine. Scope is **core only**: stats, basic moves, the four tracks (debt, heat, harm, using), and structural rules for Alex/Becky. Playbooks (12 archetype translations), scheme detail beyond the generic move, and end-of-session XP triggers per archetype are deferred to v0.2.

---

## Status

- **Framework:** Powered by the Apocalypse, 2d6 + stat resolution
- **Inspirations:** *Apocalypse World* (core engine), *Monsterhearts* (split-harm tracks, Strings/Bonds register), *The Sprawl* (heat as collective pressure)
- **Tone target:** Fargo / early Breaking Bad / True Detective S1 — mechanics serve attrition, not heroics
- **Party size:** 3–5 PCs

---

## Core Resolution

Roll **2d6 + stat** whenever a move triggers.

- **10+** — full success. The fiction goes your way.
- **7–9** — partial success. You get part of what you want, but it costs.
- **6–** — miss. The GM makes a move. Mark XP.

Rolls only happen when a move triggers. No move, no roll — the fiction just continues. If a player describes an action that doesn't fit a move, the GM either says "yes" or asks a question and lets it play out.

---

## Stats

Every PC has five stats. Distribution at character creation is set by playbook (v0.2), but the standard array is **+2 / +1 / +1 / 0 / -1**.

**Charm** — performance, pitch, glamour. The face you put on. Tour-agent hustle, talking past a doorman, projecting whatever a buyer wants to see. Charm is the mask, not the heart underneath.

**Grit** — endurance, persistence, refusing to fold. Warehouse shift, one more day, holding the bag when it's heavy. Grit is the body that doesn't quit even when the mind has.

**Slick** — physical finesse, deception, the angle. Lifting a wallet, slipping a tail, threading a needle with three people watching. Slick is the move you make when the truth wouldn't help you.

**Heart** — read people, attunement, knowing. What someone needs. What they're hiding from themselves. Who they're about to become. Heart is the stat that sees clearly when seeing clearly hurts.

**Cool** — composure under pressure. Looking Jaw-man in the eye. Not flinching when Ted draws. Cool is what's left when everything else has already broken.

---

## Basic Moves

Every PC has these. Playbooks add more.

### Move Product

When you sell, broker, or deliver glitter, roll **+Slick** (if you're moving it quiet) or **+Charm** (if you're working the buyer):

- **10+** — clean transaction. Take the cash.
- **7–9** — pick one: heat ticks up; you take less than agreed; you leave something behind (a witness, a trail, a debt).
- **6–** — GM's move. Probably Ted heard. Probably worse.

### Run a Scheme

When you commit to a hustle — declare the scheme. The GM tells you the stat and what's on the line. Roll:

- **10+** — the scheme lands. Take the full yield. No new heat.
- **7–9** — pick one: partial yield with no heat; full yield with heat.
- **6–** — the scheme falls apart. GM's move; expect heat and consequences.

Standard scheme table (v0.1 — expand with player invention):

| Scheme | Stat | Yield range | Heat |
|---|---|---|---|
| Petty theft | +Slick | $20–$200 | High |
| Car wash | +Charm | $50–$150 | None |
| Tour-agent gig | +Charm or +Heart | $300–$1500 | Low |
| Warehouse shift | +Grit | $50–$200 per shift | None |

Online sex work is canonically vetoed by Becky and is not on the table. Players can invent new schemes; GM assigns stat and yield from the fiction.

### Hold the Line

When you endure pressure — a beating you can't dodge, withdrawal shakes, the weight of one more day, a confession you don't owe — roll **+Grit** (physical) or **+Cool** (mental):

- **10+** — you hold. No new harm. The pressure passes or you find your footing.
- **7–9** — you hold, but pick one: take 1 harm (Body or Wear, fitting the pressure); lose ground (a relationship, an opportunity, time); break a promise.
- **6–** — you don't hold. GM's move.

### Read a Person

When you study someone — their face, their hands, the gap between what they say and what they mean — roll **+Heart**:

- **10+** — ask 3 from the list. They answer truthfully, to what they know.
- **7–9** — ask 1.
- **6–** — they read you back. GM's move.

Questions:

- What do you want from this conversation?
- What are you afraid of?
- What are you hiding?
- Who do you answer to?
- What's the lie you tell yourself?

### Talk Fast

When you sell a story under pressure — deception, distraction, redirection — roll **+Charm**:

- **10+** — they buy it.
- **7–9** — they buy it, pick one: it costs you something (cash, a relationship, a future scene); they want collateral; it only buys time.
- **6–** — they don't buy it. GM's move.

### Use What You Know

When you bring your background or expertise to bear — your playbook's domain, your trade, what you grew up around — roll **+Slick** (technical knowledge) or **+Heart** (human knowledge):

- **10+** — you know. Ask the GM how this helps and act on it.
- **7–9** — you know enough. Ask the GM one question.
- **6–** — you thought you knew. GM's move.

### Take a Hit

When violence finds you — a fist, a knife, a fall, a moment that doesn't ask permission — mark Body harm per the source. No roll. The GM sets severity from fiction (1-body for a punch, 2-body for a serious beating, 3-body for a weapon used right, dying for a weapon used the way Ted uses one).

### Use Glitter

When you dose, take **-1 Wear** and mark the using track. No roll.

---

## The Tracks

Four tracks run under the system: one campaign-shared (debt), one party-shared (heat), and two per-PC (harm, using).

### Debt — the campaign clock

Starts at **$10,000**. Ticks down only as the crew delivers cash to Jaw-man.

Runs against a **one-month timer** — 30 in-fiction days. At session end, the GM declares how many days passed (typically 2–3 for a focused session, 1 for a single intense night, up to a week for a montage session).

The two end states:

- **Month ends with debt > $0** → Alex dies. Campaign ends.
- **Debt reaches $0 before month ends** → Pyrrhic save. The save is canon; the cost is everything else the crew gave up to get there.

The debt is what they call it, but it's a hostage clock with a dollar sign.

### Heat — the pressure track

A 6-segment track, party-shared. Each segment shifts what the fiction allows:

1. **Cold** — operations normal. Default state.
2. **Warm** — Ted's circling. Jaw-man's noticing. NPCs start asking the wrong questions.
3. **Hot** — cops aware. A setup is being arranged. Trusted contacts go quiet.
4. **Burning** — confrontation imminent. Someone gets pinched, robbed, or beaten before session end.
5. **Exposed** — full breach. Arrest, ambush, robbery. The operation takes structural damage.
6. **Broken** — the operation is gone. The remaining sessions run in survival mode toward the climax.

Heat ticks **up** on misses involving exposure, on theft schemes succeeding noisily, on certain GM moves. Heat ticks **down** on lying low (a full session of no schemes), on paying someone off (interacts with debt), on a sacrificed relationship.

Heat resets are rare. The arc is structural — the campaign trends toward Broken whether the crew earns it or not.

### Harm — per-PC, split track

Two ladders per PC, four steps each.

**Body** — physical damage:

1. **1-body** — fictional only. Bruises, cuts, bad day.
2. **2-body** — -1 to physical moves (Run a Scheme physically, Take a Hit, Move Product on foot).
3. **3-body** — -2 to physical moves; cannot initiate physical action without help.
4. **dying** — out unless intervened. Without intervention before session end, the character dies. Permanent.

**Wear** — emotional / attritional damage:

1. **1-wear** — fictional only. Worn down.
2. **2-wear** — -1 to social and composure moves (Talk Fast, Hold the Line on Cool, Read a Person).
3. **3-wear** — -2; cannot initiate social action without prompting.
4. **breaking** — out. Withdrawal, breakdown, dissociation, flight. Without intervention before session end, the character is permanently removed from play (institutionalized, fled, gone — the body may live but the PC doesn't return).

Sources of Body harm: violence, falls, exposure, the usual.

Sources of Wear: sleeping rough, sustained fear under the debt clock, witnessing violence, breaking under threat, glitter withdrawal at Using or higher, certain scheme outcomes, GM moves.

Healing:

- Body heals through rest, time, or medical attention (costs cash → interacts with debt).
- Wear heals through rest, real connection (a scene that lands), or glitter (with the using cost).

### Using — per-PC, glitter track

Four steps, marked one segment per dose:

1. **Clean** — no effect.
2. **Using** — need a dose every session or take **+1 Wear** at session start.
3. **Hooked** — need a dose mid-session or take **-1 to Cool** until you dose.
4. **Lost** — you're Steve. The fiction takes over. The PC keeps playing, but they're on the path the canon already laid down for Cindy's boyfriend. The GM has standing permission to narrate their drift.

Reducing the track: a full session declared as getting clean. Requires intervention from at least one other PC (a scene of presence, not a roll). Take 2-wear immediately on the attempt; reduce the using track by one at session end. Failing the attempt — leaving the session early, accepting a dose, breaking under it — locks the track at its current step for the next two sessions before another attempt is possible.

---

## Special Cases — Alex, Becky, Bonds

### Alex

Alex is voiced by the GM. She is not a PC and has no sheet, no stats, no moves of her own. She acts on her own initiative in the fiction.

She has a single tracked state: **alive / dying / dead**. Severe fictional harm can push her toward dying. PCs can attempt to intervene through normal moves. **Alex dies → campaign ends** is hard canon.

### Becky

Becky is the narrator. The GM voices her throughout, including at the climax. She has no sheet and no mechanical surface. PCs interact with her through standard moves (Read, Talk Fast, etc.) directed at her as an NPC, but she has no stats and takes no rolls.

She has the same tracked state as Alex: **alive / dying / dead**. **Becky dies → campaign ends** is hard canon. Her survival at the climactic dispute is open per canon — the spec doesn't predetermine it.

### Bonds

Per-PC, per-other-PC. A bond starts at +1, +2, or +3 based on playbook (v0.2). Bonds shift in play.

When you **help** another PC, roll **+ your bond with them**. On 10+, give them +1 forward. On 7–9, +1 forward but you share the consequences. On a miss, GM's move.

When you **interfere** with another PC, roll **+ your bond with them**. On 10+, give them -2 forward. On 7–9, -1 forward; they choose how to retaliate.

Every PC starts with at least **+1 bond to Alex** (canon — loved-ones-as-mules). This bond can be drawn on for narrative leverage when interacting with her, even though Alex has no sheet.

---

## Session Structure

A session opens with the GM declaring **days elapsed** since last session. Default 2–3; range 1–7 by fictional pacing.

A session closes with end-of-session bookkeeping:

1. **Days advance** against the 30-day total. If the month ends mid-session, run the climax.
2. **Heat resolves** — any pending heat moves trigger.
3. **Debt updates** — cash delivered this session ticks the debt clock down.
4. **XP marks** per PC. Triggers (v0.1, expand in v0.2):
    - Missed a roll this session: mark XP.
    - Acted on a bond this session: mark XP.
    - Took a risk that fit your archetype: mark XP.
5. **Playbook end-of-session moves** trigger (v0.2).

When a PC has 5 XP, they advance — pick a playbook advancement (v0.2).

---

## Death

**Alex dies** → campaign ends. No undo.

**Becky dies** → campaign ends. No undo.

**PC dies** → permanent. The player can roll a new PC the following session if they want to keep playing; the new PC enters the fiction with a relationship to Alex already established (this is canon — loved-ones-as-mules — every entry vector is through Alex).

**PC breaks** (Wear at 4) without intervention → permanent removal. Same replacement rule.

There is no flashback option, no respawn, no "you live but you change" cushion. The register is Fargo. Fargo doesn't have a cushion.

---

## Quick Reference

**Resolution:** 2d6 + stat. 10+ full, 7–9 partial, 6– miss + XP.

**Stats:** Charm, Grit, Slick, Heart, Cool. Array +2/+1/+1/0/-1.

**Basic moves:** Move Product, Run a Scheme, Hold the Line, Read a Person, Talk Fast, Use What You Know, Take a Hit, Use Glitter.

**Tracks:** Debt ($10K / 30 days, campaign), Heat (6 steps, party), Harm (Body 4 / Wear 4, per-PC), Using (4 steps, per-PC).

**Campaign-end:** Alex dies, Becky dies, or month ends with debt unpaid.

**Save:** Debt = $0 before month ends. Pyrrhic.

---

## Open for v0.2

- 12 playbook translations (Artificer / Barbarian / Bard / Cleric / Druid / Fighter / Monk / Paladin / Ranger / Rogue / Sorcerer / Wizard → Gulf Coast working-class shapes)
- Playbook-specific moves
- Playbook starting bonds and stat distributions
- Playbook-specific end-of-session XP triggers
- Playbook advancement lists
- Expanded scheme table (player-invented entries get codified)
- GM moves list (project-specific custom moves beyond standard PbtA)
- Threat clocks for Jaw-man and Ted (separate from heat — these are character clocks)

---

*Living document. v0.1 establishes the spine; v0.2 fills in playbooks and GM apparatus. Major mechanical changes route through Architect → CEO sign-off.*
