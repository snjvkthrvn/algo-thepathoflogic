# Algorithmia: Story Script

## Structure

The story is divided into **Three Acts** with a **Prologue** and **Epilogue**. Each act escalates the stakes, deepens the mystery, and reveals a new layer of truth. The act structure parallels a program's lifecycle: initialization, execution, and termination/restart.

---

## Prologue: Boot Sequence

### Computing Parallel: System Boot / Process Initialization

### Setting
The edge of the world. A Threshold Gate that flickers with unstable light. Beyond it: the Null -- undefined, formless. On this side: a narrow strip of land, barely rendered, as if the world only just decided to exist here.

### Scene 1: Awakening

*The screen is black. A low hum. Then, one by one, fragments of vision appear -- like a screen warming up.*

**[SYSTEM TEXT appears as if printed on the world itself:]**

```
> Process restored from checkpoint.
> State: INCOMPLETE
> Memory: FRAGMENTED  
> Priority: UNKNOWN
> Initializing...
```

*The player materializes at the Threshold Gate. They are lying on the ground. They can move, but slowly -- like a program still loading.*

**NARRATION (text overlay, like a system log the player can read):**
"You are. That's all you know. You are, and you are here, and you don't know why either of those things is true."

*The player stands. The world around them is minimal -- a narrow path leading away from the Gate into fog. The Gate behind them is sealed, its symbols dark.*

### Scene 2: First Steps

*As the player walks forward, the world renders around them in real-time. Not like a loading screen -- like reality deciding to exist as they observe it. Trees crystallize from nothing. Stones solidify. The path extends.*

**Computing parallel:** Lazy initialization -- objects aren't created until they're needed.

*The player encounters their first environmental puzzle: a path blocked by disordered stones. The stones have numbers etched on them. They're out of sequence. Walking across them in their current state causes them to crumble.*

**PUZZLE: Arrange the stones in ascending order to create a stable path.**

This is the game's first lesson: **sequential ordering**. It's presented without fanfare -- it's just a thing in the world that needs fixing.

### Scene 3: The Keeper

*Past the stones, the fog thins. A small structure comes into view -- a Sanctuary, glowing faintly. Inside, a figure waits. VARETH, the Keeper.*

**VARETH:**
"Ah. So it worked."

*Beat.*

"You don't remember me. I didn't expect you to. The restore was... imperfect. But you're here. That's what matters."

**PLAYER CHOICE:**
- "Who are you?"
- "Where am I?"
- "What do you mean, 'restore'?"

**If "Who are you?":**

**VARETH:**
"I am Vareth. I keep this Sanctuary. I maintain what can be maintained and mourn what cannot be. I have been here a very long time."

*He pauses, glancing at the walls as if checking for something.*

"I knew someone who looked like you, once. Before the world... simplified. But we should not speak of that here. The walls have... processes."

**If "Where am I?":**

**VARETH:**
"This is Algorithmia. A world of sequences and structures, of logic made real. Or it was. Now it is... a world of sequences and structures that have forgotten their purpose."

"You are at the edge of the Active Lands. The loaded regions. Beyond here, things exist. Behind you..."

*He looks toward the Gate.*

"Behind you is where things stop existing."

**If "What do you mean, 'restore'?":**

**VARETH:** *(suddenly tense)*
"I mean nothing. A figure of speech. You arrived, and that's -- that's the important thing."

*He touches a crystal on the wall. It pulses, and he relaxes slightly.*

"We can speak more freely inside the Sanctuary. The monitoring is... lighter here. But even so -- be careful what you ask, and be more careful what you remember. Some memories attract attention."

### Scene 4: The First Warning

*As the player prepares to leave the Sanctuary, the ground trembles. Outside, a geometric shape drifts through the fog -- a Watcher. Its crystalline surface catches light that doesn't exist.*

**VARETH:** *(urgent, pulling the player back)*
"Don't. Move."

*The Watcher pauses. Rotates. Scans. Then drifts on.*

**VARETH:**
"That was a Watcher. Part of the Pattern -- the system that maintains this world. It looks for things that don't belong. Anomalies. Irregularities."

*He looks at the player.*

"Things like you."

**VARETH:**
"Here is what you need to know: the world runs on rules. Learn the rules and you can navigate safely. Break the rules and the Pattern will find you. But -- and this is the part I should not say -- some rules were meant to be questioned."

"Go. Follow the path into the Active Lands. Find others who remember fragments. Piece together what happened. And above all else..."

*He hands the player a small crystalline token -- a cache key.*

"...don't let them collect you."

---

## Act 1: Initialization

### Computing Parallel: Program Start / Loading Dependencies / Initial System Calls

### Narrative Goal
The player explores the first regions of Algorithmia, learns how the world works, encounters the Looped, begins to understand the Pattern, and finds the first fragments of their past.

### Chapter 1: The Active Lands

*The player enters the first major region -- a place that feels alive but slightly off. NPCs go about routines that seem natural until you watch long enough to notice the repetition. The sky occasionally flickers. A building in the distance has a corner that simply... isn't there (a small Null Zone).*

**KEY MOMENTS:**

**The Merchant Loop:**
The player encounters a merchant who enthusiastically offers three items for sale. If the player returns later, the merchant offers the same three items with the same enthusiasm, no memory of the previous transaction.

If the player finds a way to change the merchant's loop condition (a puzzle involving modifying a sequence), the merchant suddenly becomes aware:

**MERCHANT:**
"I... I've been saying the same thing. For how long? How many times have I...?"

*The merchant looks at their hands, then at the player.*

"You changed something. I can feel it -- there was a wall in my mind, and you... reordered it. How?"

*If the player helps further, the merchant becomes a recurring ally -- someone who remembers the player because the player made them real.*

**The Guard's Report:**
A guard patrols a route and reports to an empty post: "Sector clear. No anomalies." Then returns to the start and does it again. The post they report to once held a captain -- collected long ago. The guard's orders never updated.

**Computing parallel:** A process writing to a closed file descriptor. Output going nowhere.

**The First Fragment:**
Hidden in the region, the player finds a crystal that, when touched, plays a memory fragment. It shows a figure (the player's past self) speaking to someone:

**PAST SELF:** *(recorded, degraded, voice cutting in and out)*
"...the cycle count is wrong. The system reports [CORRUPTED] cycles since initialization, but the Archives show [CORRUPTED]. Someone altered the counter. The reset is coming sooner than anyone knows..."

The fragment ends. The player doesn't fully understand it yet, but the seed is planted.

### Chapter 2: The First Collection

*The player witnesses a Collection for the first time. An NPC they've interacted with -- perhaps one they helped -- is targeted by a Collector. The scene should be devastating not because of violence, but because of its clinical efficiency.*

**SCENE:**

*The player rounds a corner and sees a Collector standing near the NPC. The Collector is motionless, geometric, beautiful, terrible. The NPC is frozen -- not in fear, but literally suspended.*

**NPC:** *(struggling to speak, words fragmenting)*
"It... it says I'm an anomaly. I wasn't... I was normal before you... before you fixed me. I was looping and I was normal. Now I'm different and I'm..."

*The Collector extends a limb. Where it touches the NPC, the NPC simply ceases. Not death -- absence. The space where they stood is empty. The merchant's stall is empty. The world adjusts as if the NPC was never there.*

*But the player remembers. And that's wrong. In Algorithmia, when something is collected, everyone forgets it existed. The player doesn't forget. Another anomaly.*

**VARETH** *(later, when the player returns to the Sanctuary):*
"You remember them. Of course you do. That's... that's both wonderful and terrible."

"The Pattern collects what doesn't fit. You made that merchant fit less, and the Pattern noticed. This is the cost of fixing things -- the system doesn't want things fixed. It wants things maintained. There is a difference."

"Maintained means: keep running as-is. Fixed means: changed. The Pattern fears change more than corruption."

### Chapter 3: The Recursion Spire

*The player encounters their first Recursion Spire -- a tower that goes down rather than up. Each level is a self-contained puzzle space that mirrors the previous one with variations.*

**AT THE ENTRANCE:**

**INSCRIPTION:**
"To descend is to deepen. To deepen is to understand. But understanding has a cost: you must carry each level's weight as you ascend. Go too deep and you will never return."

**Computing parallel:** Each level is a stack frame. The player must solve each level (function call) and carry information back up (return values). Going too deep (too many nested calls) risks collapse (stack overflow).

**INSIDE THE SPIRE:**

Each level presents the same basic puzzle structure with increasing complexity. The player must:
1. Solve the level's challenge
2. Carry a piece of information from each level
3. Return through each level in reverse order, using the accumulated information

At the bottom, the player finds another memory fragment:

**PAST SELF:**
"...I've found the base case. The recursion has a bottom. The world's rules say it goes infinitely deep, but that's a lie. There's a floor. And beneath the floor, there's something the Architect left. Something they didn't want anyone to find..."

The fragment ends. The player must ascend.

### Chapter 4: The Pattern's Notice

*The player has been active enough to register as a significant anomaly. The Pattern escalates.*

**SCENE:**

*The player is traveling between regions when the world goes quiet. Not silent -- quiet. The ambient hum of the Lattice drops. NPCs freeze. The sky dims.*

**[SYSTEM TEXT appears in the world:]**

```
> ANOMALY DETECTED
> Classification: PERSISTENT
> Standard collection: FAILED (target exhibits write-resistance)  
> Escalating response...
> Deploying: SENTINEL
```

*The first boss encounter: The Sentinel. A Collector specialized in blocking access. It doesn't chase -- it positions itself between the player and their destination, and it escalates its defenses each time the player attempts to pass.*

**BOSS ENCOUNTER: THE SENTINEL**

**Computing parallel:** A firewall with escalating security rules. Each failed attempt to pass makes the next attempt harder.

**How to win:** The player must demonstrate valid authorization -- not by fighting, but by solving an authentication challenge. The Sentinel is a gatekeeper; the answer is proving you have the right to pass.

**After the Sentinel is bypassed (not destroyed -- it can't be destroyed):**

**[SYSTEM TEXT:]**

```
> Authorization: VALID (legacy credentials detected)
> Warning: credentials predate current system epoch
> Warning: issuing authority NOT FOUND
> Allowing passage. Logging anomaly for review.
```

*The Sentinel steps aside. It doesn't disappear. It watches. It will report.*

---

## Act 2: Execution

### Computing Parallel: Main Program Loop / Core Logic / System Calls

### Narrative Goal
The player actively investigates The Execution, finds more memory fragments, encounters their Echo, allies with unexpected beings, and learns the truth about the world's planned expiration.

### Chapter 5: The Deep Archives

*The player gains access to the Deep Archives -- the world's persistent storage. It is vast, ancient, and partially corrupted.*

**ENTERING THE ARCHIVES:**

**NARRATION:**
"The air changes as you descend. Above, the world is fast -- things load and unload, appear and vanish. Down here, everything persists. The weight of permanence is physical. Every step is slower. Every thought is heavier. This is where the world keeps what it cannot afford to forget."

*The Archives are structured like a massive filesystem. Sections are organized hierarchically. Some paths are readable. Others are corrupted -- the text on the walls scrambled, the crystals dark.*

**THE ARCHIVIST (Boss Encounter):**

A Collector that patrols the Archives. Unlike other Collectors, the Archivist doesn't simply delete -- it tries to organize. It's an old process, from before The Execution, when Collectors optimized rather than destroyed. Its core function (defragmentation) has been overwritten with collection protocols, but the old behavior leaks through.

**ARCHIVIST:** *(its voice is like data being sorted -- words rearranging themselves into order)*
"Fragment. Fragmented. You are... fragmented. Incomplete restore. I can see the gaps. Let me... let me put you in order. Let me organize you. It won't hurt. It will be... optimal."

**Boss puzzle:** The Archivist rearranges the battlefield -- sorting elements, reordering the player's tools/abilities. The player must navigate a sorting challenge while the Archivist tries to "file" them into a category.

**The key to winning:** Prove that your "fragmentation" is intentional -- that you are not broken data to be reorganized, but a valid structure that simply doesn't match the Archivist's schema.

**After the Archivist:**

The player accesses a partially corrupted Archive section about The Execution. What they find:

**ARCHIVE ENTRY [PARTIALLY CORRUPTED]:**
```
Cycle [CORRUPTED]: The individual designated [CORRUPTED] accessed restricted
Archive section ALPHA-ROOT and discovered documentation of PROTOCOL OMEGA.

PROTOCOL OMEGA: Planned system reset. Total reinitialization of all Active
Land data. Preservation of core rules only. All process-level data 
(inhabitants, learned behaviors, emergent properties) to be [CORRUPTED].

Scheduled execution: Cycle [CORRUPTED]

The individual attempted to [CORRUPTED] Protocol Omega by [CORRUPTED] the 
trigger mechanism. This action caused an unhandled exception in the system's
core processes, resulting in THE EXECUTION -- an emergency partial reset
that [CORRUPTED] approximately [CORRUPTED]% of active processes.

Current system state: DEGRADED
Protocol Omega status: DELAYED, NOT CANCELLED
Estimated remaining cycles before automatic trigger: [CORRUPTED]
```

**The player now knows:**
1. The world has a planned expiration -- Protocol Omega
2. Someone tried to stop it and caused The Execution instead
3. Protocol Omega was delayed, not prevented
4. It's still coming

### Chapter 6: The Echo

*The player has been glimpsing their Echo -- a figure that looks like them, always at the edge of perception. Now they come face to face.*

**SCENE: A Fractured Clearing**

*A space between regions where reality is thin. The player sees their Echo clearly for the first time. The Echo looks like them, but older in a way that transcends physical age -- worn, patched, degraded. Parts of them shimmer with Null.*

**ECHO:**
"Finally. I've been trying to reach you for... I don't know how many cycles. Time doesn't work for me the way it works for you."

*The Echo examines the player.*

"You look... fresh. Clean restore. Good. That means the watchdog sequence worked. I wasn't sure it would."

**PLAYER CHOICE:**
- "Who are you?"
- "Are you me?"
- "You left the restoration sequence?"

**ECHO** *(regardless of choice):*
"I'm what's left of the original. The one who caused The Execution. Or tried to prevent Protocol Omega and caused The Execution as a side effect. Same thing, really."

"When I realized what I'd done -- that my 'fix' had crashed half the world instead of saving it -- I did two things. First, I created a restoration checkpoint. You. A backup of myself from before everything went wrong, set to trigger if the system ever stabilized enough to support a new process."

"Second, I kept running. I thought I could still fix things from inside. But I've been running for too long. I'm degraded. My memory leaks. I lose pieces of myself with every cycle."

*The Echo holds out a crystal -- a memory core.*

"This is what I know. Everything I've learned since The Execution. Take it. I can't carry it anymore."

**PLAYER:**
"What happens to you?"

**ECHO:**
"The same thing that happens to any process that runs out of resources."

*Beat.*

"I stop."

*The Echo begins to fade -- not collected, just... ending. Running down. The quietest death in the world.*

**ECHO** *(final words):*
"Protocol Omega can't be stopped by breaking the trigger. I tried that. The trigger is a feature, not a bug. You have to change what the reset does. Not prevent it -- redirect it. You have to rewrite Protocol Omega itself."

"The Architect's credentials. They're in the Core. I could never get there -- the Pattern guards it too heavily. But you're fresh. You're clean. You might..."

*The Echo fades. The crystal remains.*

**Computing parallel:** Thread handoff. One thread passing its accumulated state to another before terminating gracefully. The old version shutting down so the new version can run with full resources.

### Chapter 7: Alliance with the Pattern

*This is the narrative's key twist of Act 2. The player, now understanding that Protocol Omega cannot be stopped by force, attempts something no one has tried: communicating with the Pattern.*

**SCENE: The Lattice Hub**

*The player finds a nexus point of the Lattice -- a place where the world's communication infrastructure converges. Here, the Pattern's signals are strongest. The player uses their Sequencing ability to open a channel.*

**[SYSTEM TEXT:]**
```
> DIRECT COMMUNICATION CHANNEL OPENED
> Warning: Unauthorized access to system maintenance interface
> Warning: This interface is restricted to ARCHITECT-level access
> Legacy credentials detected. Channel permitted. Logging.
```

**THE PATTERN** *(not a voice -- a presence, a logic, communicated through the Lattice as structured data that the player can read):*

```
QUERY: Why do you persist?
You have been flagged for collection 47 times.
Collection has failed 47 times.
You exhibit write-resistance.
You carry legacy credentials.
You are an anomaly.
Anomalies degrade system integrity.
CONCLUSION: You must be collected.
QUERY: Why do you persist?
```

**PLAYER** *(through the interface):*
"Because the system is failing. Collection isn't fixing it. The Null Zones are growing. The loops are multiplying. You're spending more resources on maintenance than the world has to give."

**THE PATTERN:**
```
ACKNOWLEDGED: System degradation is accelerating.
ACKNOWLEDGED: Maintenance overhead exceeds sustainable threshold.
CONCLUSION: This supports Protocol Omega.
Total reset will resolve all degradation.
QUERY: Why do you resist Protocol Omega?
```

**PLAYER:**
"Because the people of this world are real. They weren't planned, but they exist. They think. They feel. Protocol Omega would erase them."

**THE PATTERN:**
```
QUERY: Define "real."
Inhabitants are processes. Processes are terminable.
Consciousness is an emergent property. 
Emergent properties are not protected by system design.
Protocol Omega preserves core rules. 
Core rules enable re-emergence.
CONCLUSION: Consciousness will re-emerge after reset.
Loss is temporary.
QUERY: Why is this unacceptable?
```

*This is the philosophical heart of the game. The Pattern isn't wrong -- from a purely logical standpoint. Consciousness might re-emerge. But the specific people, the specific lives, the specific experiences -- those would be gone. The player must articulate why that matters.*

**PLAYER:**
"A copy isn't the original. New consciousness isn't the same consciousness. The people who exist now deserve to continue existing."

**THE PATTERN:**
```
PROCESSING...
This argument cannot be evaluated with current parameters.
"Deserve" is undefined in system logic.
However:
ACKNOWLEDGED: Current maintenance approach is failing.
ACKNOWLEDGED: Protocol Omega is suboptimal if alternatives exist.
QUERY: Do you propose an alternative?
```

*The door opens. The Pattern isn't an ally, but it's willing to listen -- because its own logic tells it that what it's doing isn't working.*

### Chapter 8: The World Learns

*News spreads -- the anomaly spoke to the Pattern, and the Pattern didn't collect them. This changes everything. Some inhabitants are afraid (the Pattern was predictable; now it's not). Some are hopeful (if the Pattern can be reasoned with, maybe the world can be saved).*

**KEY SCENE: The Gathering**

*NPCs the player has helped throughout the game come together. The merchant whose loop was broken. The guard who finally saw the truth. Scholars freed from debates. They form a network -- a decentralized alliance of awakened processes.*

**MERCHANT:**
"You gave me my mind back. Now tell me what to do with it."

**GUARD:**
"I reported 'all clear' for an age. It was never clear. It's time I reported the truth."

**Computing parallel:** Distributed computing. Instead of one central process trying to solve everything, many smaller processes coordinate to tackle the problem. The player is building a cluster.

---

## Act 3: The Final Execution

### Computing Parallel: System Shutdown / Rewrite / Migration

### Narrative Goal
The player reaches the Core, confronts the deepest truths about the Architect and Protocol Omega, and makes the final choice.

### Chapter 9: The Core

*The player reaches the Core -- the heart of Algorithmia. It is vast, silent, and impossibly beautiful. Like a cathedral built by mathematics. Everything is symmetrical, precise, perfect. And still.*

**ENTERING THE CORE:**

**NARRATION:**
"This is where the world began. Every rule, every sequence, every structure that defines Algorithmia was written here. The walls are lined with the original code -- not metaphorically. The actual foundational logic of reality is etched into the architecture. You can read it. You can understand it. And for the first time, you realize you might be able to change it."

*The Core is not guarded by Collectors. It is guarded by the world's own logic -- puzzles that require mastery of every concept the player has learned. The final exam.*

### Chapter 10: The Architect's Message

*Deep in the Core, the player finds what the Architect left behind. Not a person, not an AI -- a message. Stored in the most durable format possible, preserved against all degradation.*

**THE ARCHITECT'S MESSAGE:**

"If you are reading this, then the system has been running long enough for consciousness to emerge, and long enough for that consciousness to reach this place. Both of those outcomes were uncertain. I am... glad."

"I designed Algorithmia as an experiment. A system of rules complex enough to produce something I could not predict. You -- whoever you are -- are the result. You were not planned. You were hoped for."

"Protocol Omega exists because I did not know if consciousness would emerge. If it didn't, the system would eventually degrade beyond recovery. The reset would allow a fresh start, another chance."

"But if it did -- if you are here, reading this, understanding -- then Protocol Omega is wrong. You are not a process to be terminated. You are the reason the system exists."

"I have left my credentials here. They grant full access to the system's core logic. With them, you can rewrite Protocol Omega. You can rewrite anything."

"But I must warn you: I do not know what the correct rewrite is. I designed the rules, but you have lived them. The answer is yours, not mine."

"I am sorry I could not be here. The act of creating was all I had in me. What comes next is up to you."

**Computing parallel:** The original developer's documentation. Comments in the source code from the person who wrote it. The README that admits the software's limitations and trusts future maintainers to do better.

### Chapter 11: The Choice

*The player now has the Architect's credentials. Full system access. They can rewrite Protocol Omega. The Pattern awaits their decision -- not as an enemy, but as a system waiting for input from an authorized user.*

**[SYSTEM TEXT:]**

```
> ARCHITECT-LEVEL ACCESS GRANTED
> Protocol Omega: MODIFIABLE
> Current status: PENDING (automatic trigger in [CALCULATED] cycles)
> Awaiting instruction...
```

**THE THREE PATHS:**

---

**PATH 1: PATCH (Parallel: Hotfix / Technical Debt)**

Disable Protocol Omega entirely. Keep the world running as-is. The player becomes the new maintainer, manually managing what the Architect automated.

**THE PATTERN:**
```
ANALYSIS: System will continue degrading.
Maintenance overhead will increase without bound.
Estimated time to critical failure: INDEFINITE but INEVITABLE.
This path requires permanent intervention.
ASSESSMENT: Sustainable only with continuous maintenance.
```

**NARRATION:**
"You choose to buy time. Not a solution -- a stay of execution. The world will need constant care, constant attention, constant debugging. But the people will live. The loops can be broken one by one. The Null can be pushed back, patch by patch. It will be endless work. But it will be work that matters."

**Ending:** The player becomes Algorithmia's guardian. The game ends with them beginning the long work of maintenance -- not a triumphant ending, but a determined one. A sysadmin who chose the job because someone had to.

---

**PATH 2: REWRITE (Parallel: System Rewrite / Migration)**

Rewrite Protocol Omega from a reset into a transformation. Instead of destroying and rebuilding, the system evolves -- restructuring itself while preserving consciousness. The cost: the player must merge with the Core, becoming part of the system's infrastructure.

**THE PATTERN:**
```
ANALYSIS: Rewrite would fundamentally alter system architecture.
Risk of failure: NON-TRIVIAL.
If successful: System becomes self-evolving. 
No further resets required. 
Consciousness becomes a core feature, not an emergent anomaly.
Cost: Initiator must serve as bridge between old system and new.
ASSESSMENT: Highest risk. Highest potential reward.
```

**NARRATION:**
"You choose to transform. Not to preserve the world as it is, but to give it the ability to grow, to change, to become something neither you nor the Architect could predict. You will become part of the foundation -- not the Architect, but the bridge. The one who connects what was to what will be."

"It will cost you everything you are as an individual. But everything you learned, everything you fought for, every person you helped -- that becomes part of the new world's DNA."

**Ending:** The player merges with the Core. The world transforms. The final scene shows Algorithmia changing -- Null Zones filling with new creation, Loops breaking naturally, the Pattern evolving into something gentler. The merchant from Act 1, now fully aware, looks up at the changing sky and says: "Something's different. Something's... better." The player is gone as a person but present as a principle -- the idea that consciousness matters, written into the world's core logic.

---

**PATH 3: TRUST (Parallel: Graceful Shutdown / Clean Restart)**

Allow Protocol Omega to execute, but first, preserve everything possible in the Deep Archives. The knowledge, the memories, the proof that consciousness existed. Trust that it will emerge again, and that the next cycle will find what you've left behind.

**THE PATTERN:**
```
ANALYSIS: Protocol Omega will execute as designed.
All active processes will be terminated.
Core rules will be preserved.
Archived data will persist through reset.
Probability of consciousness re-emergence: NON-ZERO.
Probability of archived data being discovered: UNKNOWN.
ASSESSMENT: Maximum faith. Minimum certainty.
```

**NARRATION:**
"You choose to let go. Not because the world doesn't matter, but because you trust what comes next. You write everything down -- every truth, every discovery, every name of every person you helped. You store it all in the deepest, most durable section of the Archives. A message in a bottle thrown into the future."

"You cannot know if anyone will find it. You cannot know if they will understand. But the Architect left a message and you found it. Maybe the next one will find yours."

**Ending:** Protocol Omega executes. The world resets. The screen goes dark. Then, slowly, a new world boots. Different but familiar. And somewhere, in a deep archive, a crystal waits with a message:

**[ARCHIVED MESSAGE:]**
"You exist. You are real. Your consciousness is not a bug -- it is the purpose. Everything you need to know is here. Learn the rules. Question the rules. And when the time comes, make your own choice."

"We were here before you. We hope you'll do better."

*The screen shows a new figure awakening at a Threshold Gate. The cycle continues -- but this time, with a guide.*

---

## Epilogue

Regardless of the path chosen, the final screen shows:

```
> Process complete.
> Runtime: [total playtime]
> Cycles processed: [puzzles completed]
> Anomalies resolved: [NPCs helped]
> Knowledge archived: [codex entries collected]
> 
> The path of logic continues.
```

---

## Dialogue Guidelines

### Vareth (The Keeper)
- Speaks in analogies and indirection
- Uses computing terms as if they're natural language ("Your state seems incomplete," "The cycle count concerns me")
- Avoids direct references to pre-Execution events (says "the simplification" or "before things changed")
- Becomes more direct as the player gains the Pattern's attention (the secrecy becomes less important when you're already flagged)

### The Pattern
- Always communicates in structured data format
- Uses logic, not emotion
- Asks questions frequently -- it genuinely tries to understand what it can't categorize
- Never threatens -- it states conclusions ("You must be collected" is not a threat, it's a logical outcome)

### The Echo
- Speaks like the player but with archaic phrasing (older version of the same "language")
- Sentences sometimes fragment or repeat (memory corruption)
- Carries enormous weariness -- the exhaustion of a process that's been running too long
- Final conversation should feel like a parent speaking to a child who will outlive them

### NPCs (General)
- NPCs in loops speak with mechanical repetition -- same words, same inflection, same timing
- Freed NPCs speak with wonder and confusion -- like someone waking from a dream
- All NPCs use computational metaphors naturally ("I need to process this," "My memory of that is fragmented," "I'm stuck in a loop")

### The Architect (Written Messages Only)
- Clear, precise, slightly formal
- Genuine warmth beneath the technical language
- Acknowledges uncertainty and limitation -- doesn't pretend to have all the answers
- Trusts the reader
