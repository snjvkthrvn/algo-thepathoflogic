# Algorithmia: World Design Document

## Overview

Every element of Algorithmia maps to a real-world computing concept. This document defines the world's geography, physics, ecology, and culture through that lens.

---

## Geography: The Architecture of Algorithmia

Algorithmia's physical layout mirrors computer architecture. The world is not random -- it is *structured*, and that structure has meaning.

### The Core (Parallel: CPU)

The center of the world. A massive, ancient structure -- part citadel, part natural formation -- where all of Algorithmia's fundamental processes were once coordinated. 

**Before The Execution:** The Core was alive with activity. The Architect's presence was felt here. Decisions about the world's state were made, delegated, and enacted from this place. It was the seat of governance, not through politics, but through pure logic.

**Now:** Silent. The Core still stands but produces no output. Its gates are sealed. The processes that once flowed from it now run on residual momentum -- inertia keeping the world spinning, but with no guiding intelligence. Occasionally, a faint pulse emanates from deep within, suggesting something still runs inside.

**Real-world parallel:** A CPU that is technically powered on but has no active processes. The system clock still ticks. The hardware isn't broken. But nothing is being executed.

**Visuals:** Towering crystalline architecture with geometric precision. Pathways that branch and merge like circuit traces. A faint, rhythmic hum -- the world's heartbeat. Everything is symmetrical, ordered, deliberate. But dust (corrupted data) gathers in corners.

---

### Active Lands (Parallel: RAM)

The inhabited regions of Algorithmia. These are the "loaded" parts of the world -- currently in use, populated, alive. Each region exists because the system allocated space for it.

**Key property:** Active Lands can be **swapped**. When a region is no longer being actively used or observed, it enters a dormant state (parallel: paged out to disk). When it's needed again, it reloads -- but not always perfectly. Details shift. People forget small things. This is normal and the inhabitants don't notice, like how we don't notice RAM being managed by the OS.

**The crisis:** The swapping mechanism is becoming aggressive. Regions are being unloaded too quickly and reloaded with errors. People are losing more with each cycle. Some regions have been swapped so many times they're barely coherent -- places where architecture contradicts itself, where the same NPC exists in two states simultaneously.

**Real-world parallel:** RAM under memory pressure. Thrashing -- the system spending more time swapping than doing useful work. Memory corruption from failing hardware.

---

### The Deep Archives (Parallel: Hard Drive / Persistent Storage)

Vast underground repositories stretching beneath all of Algorithmia. This is where permanent memory is stored -- history, knowledge, the fundamental rules of the world. Accessing the Archives is slow (you must physically travel there) but what you find endures.

**Key property:** The Archives are **write-once** under normal conditions. Once something is recorded, it persists. This is both their strength and their limitation -- outdated, incorrect, or dangerous information persists alongside truth. There is no "delete" in the Archives, only "mark as deprecated."

**The crisis:** Some sections of the Archives are becoming unreadable -- the equivalent of disk sectors going bad. The history of The Execution is mostly stored in these corrupted sections. Coincidence? The player will wonder.

**Real-world parallel:** A hard drive with bad sectors. Data rot. The challenge of legacy data in old file formats that nothing can read anymore.

**Visuals:** Cavernous spaces filled with crystalline tablets, glowing etchings on walls, rivers of luminous text. Narrow passages between towering shelves of stone. Sections that are dark and unreadable -- the text faded to nothing, the crystals gone opaque.

---

### Threshold Gates (Parallel: I/O Ports)

The connections between regions, and between Algorithmia and the unknown beyond. Every transition between major areas happens through a Threshold Gate -- a structured boundary with protocols and rules.

**Key property:** Gates have **protocols** (parallel: communication protocols like TCP/IP). To pass through, you must satisfy the gate's conditions. Some gates require specific knowledge. Some require specific items (keys/tokens). Some require solving the gate's challenge to prove you're a valid traveler and not corrupted data.

**The crisis:** Some gates have become one-way (read-only). Others have lost their protocols entirely and allow anything through -- including corruption. A few have sealed permanently, isolating regions from each other.

**The player's significance:** The player can pass through gates that should be sealed. They carry some kind of universal access -- a privilege level that the system doesn't understand.

**Real-world parallel:** Network ports, firewalls, authentication tokens. A user with root/admin access in a system that shouldn't have any admins.

---

### Sanctuaries (Parallel: Cache Memory)

Small, protected spaces scattered throughout Algorithmia. They store frequently accessed knowledge and provide rapid access to crucial information. Sanctuaries are where travelers rest, where sages keep their most important teachings, and where the world's essential truths are preserved in accessible form.

**Key property:** Sanctuaries are **fast but limited**. They can only hold so much. When new knowledge needs to be cached, old knowledge is evicted. The Keepers who maintain Sanctuaries must constantly decide what's important enough to keep.

**The crisis:** Some Sanctuaries have become "stale" -- they hold outdated information that no longer matches reality, but the update mechanism is broken. Travelers who rely on Sanctuary knowledge sometimes act on false truths.

**Real-world parallel:** CPU cache with stale data. Cache invalidation problems (famously one of the two hardest problems in computer science).

---

### The Wilds (Parallel: Heap Memory)

The frontier of Algorithmia -- a vast, unstructured territory where things are created and abandoned without the order found in the Active Lands. The Wilds are where raw materials exist, where new things are allocated into existence, and where abandoned things slowly decompose.

**Key property:** The Wilds have **no inherent structure**. Unlike the Active Lands (which are organized like arrays -- sequential, indexed, predictable), the Wilds are a sprawl. Finding anything requires knowing exactly where to look, or searching extensively. Things exist here that don't exist anywhere else -- experimental constructs, abandoned projects, half-finished creations.

**The crisis:** The Wilds are **fragmenting**. Usable space is broken into smaller and smaller pieces, separated by unusable gaps of corruption. New things can barely be created because there's no contiguous space left. The world is running out of room to grow.

**Real-world parallel:** Heap fragmentation. Memory allocation failures. The difference between having "enough total memory" and having enough *contiguous* memory.

**Visuals:** A landscape that shifts between lush creation and stark abandonment. Towers half-built next to crumbling ruins. Fields of raw material (unallocated space) shrinking between walls of debris. Beautiful but chaotic.

---

### Recursion Spires (Parallel: The Call Stack)

Towering structures -- both natural and constructed -- where entering means going **deeper**. Each level of a Spire is a self-contained space. To return, you must ascend back through every level you descended. There are no shortcuts.

**Key property:** Spires have a **depth limit** (parallel: stack size). Go too deep and the Spire becomes unstable. The deepest recorded descent ended in catastrophe -- the Spire collapsed, destroying everything within (parallel: stack overflow). The inhabitants of Algorithmia have a healthy fear of going too deep.

**The crisis:** Some Spires have become **infinite** -- descending endlessly with no base case. Anyone who enters becomes trapped in eternal descent (parallel: infinite recursion). The Pattern has sealed these Spires, but the seals are weakening.

**Real-world parallel:** The call stack, stack frames, stack overflow, infinite recursion.

---

### The Echoes (Parallel: Threads / Parallel Processes)

Perhaps the most unsettling aspect of Algorithmia. Echoes are parallel instances of events, places, or people that run simultaneously. In the Golden Cycles, Echoes were a feature -- a way for the world to handle multiple tasks at once. A farmer could exist in two fields, a scholar could research two topics, a guard could watch two gates.

**Now:** Echoes have become desynchronized. The same person's Echoes may have divergent memories, conflicting beliefs, or contradictory experiences. When Echoes encounter each other, the results are disorienting -- reality stutters as the world tries to reconcile two truths.

**The player's Echoes:** The player may have Echoes from before The Execution. Encountering them is a key narrative event.

**Real-world parallel:** Race conditions, thread synchronization issues, concurrent modification, deadlocks.

---

### Null Zones (Parallel: Null / Unallocated Memory)

Areas where nothing exists. Not empty space -- **nothing**. Null Zones are the absence of definition. They are not dark or cold because those are properties, and Null Zones have no properties.

**Key property:** Null Zones are expanding. Each garbage collection cycle, each aggressive swap, each fragment of the Wilds that becomes unusable -- it all feeds the Null. The Null doesn't consume. It simply *is* where things are no longer.

**The crisis:** Null Zones are appearing inside Active Lands. A room might have a corner that simply doesn't exist. A path might end not at a wall but at... nothing. The inhabitants have learned to avoid these spaces, but they're growing.

**Real-world parallel:** Null pointer dereference, segmentation faults, use-after-free errors. The concept of null in programming -- a reference to nothing.

**Visuals:** Not darkness. Not void. A visual representation of *undefined* -- perhaps a shimmer, a static, a place where the eye slides off and the mind refuses to focus. Unsettling precisely because it's not dramatic -- it's simply absent.

---

### The Lattice (Parallel: The System Bus / Network)

The invisible infrastructure connecting all parts of Algorithmia. The Lattice carries signals, transfers data, and enables communication between regions. You can't see it, but it's the reason a message sent in one region reaches another, the reason Threshold Gates know who's approaching, the reason the Pattern can monitor everything.

**Before The Execution:** The Lattice carried the Architect's directives. It was the nervous system of the world.

**Now:** The Lattice carries only automated signals. No new directives. Just echoes of old commands repeating endlessly.

**The crisis:** The Lattice is **congested**. Old signals that should have been cleared still circulate. New signals compete with decades of accumulated noise. Communication between regions is slow and unreliable. Sometimes a message arrives before it was sent. Sometimes it never arrives. Sometimes it arrives altered.

**Real-world parallel:** Network congestion, packet loss, out-of-order delivery, bandwidth saturation, legacy systems still broadcasting on deprecated protocols.

---

## The Day/Night Cycle (Parallel: Clock Cycles)

Algorithmia's time is measured in **Cycles**, not days. A full Cycle has two phases:

- **Process Phase (Day):** When the world's systems are active. NPCs perform their routines. Systems update. The Pattern patrols. The world hums with activity.
- **Idle Phase (Night):** When activity slows. Systems enter low-power mode. The Pattern's vigilance decreases. Things that hide during Process Phase emerge. Secrets are easier to find.

**Real-world parallel:** CPU clock cycles, active vs. idle states, background processes running during off-peak hours.

---

## Weather and Environment (Parallel: System Health)

Algorithmia's "weather" reflects the health of the local system:

| Weather | System Parallel | Meaning |
|---|---|---|
| Clear, calm | System running normally | All processes healthy |
| Fog / haze | High memory usage | Resources are strained, clarity is reduced |
| Flickering light | Processing errors | The local area is experiencing computation errors |
| Static storms | Data corruption | Active corruption spreading through the region |
| The Silence | System hang / deadlock | Everything stops. Nothing moves. The world is frozen. Terrifying. |
| Fragmented rain | Packet loss / data fragmentation | Information literally falling apart in transit |

---

## Currency and Economy (Parallel: Resource Allocation)

The currency of Algorithmia is **Cycles** -- units of processing time. Everything costs time to do. This isn't metaphorical; when you "spend" a Cycle, you are literally allocating the world's limited processing resources.

**The crisis:** Cycles are becoming scarce because the Pattern consumes an ever-increasing share of the world's resources for its maintenance routines. There's less time for living, creating, growing. The economy is being strangled by overhead.

**Real-world parallel:** CPU time as a resource, resource starvation, the overhead of garbage collection and maintenance processes consuming resources that should go to useful work. Cloud computing costs -- you pay for compute time.

---

## Flora and Fauna (Parallel: Programs and Processes)

Living things in Algorithmia are **processes** -- programs that have been running long enough to develop behavior and, in some cases, awareness.

- **Plants:** Background processes. They run quietly, consuming minimal resources, producing outputs (oxygen/food parallel: system utilities, logging, monitoring).
- **Animals:** Daemon processes. More complex, more mobile, running specific tasks. Predators are aggressive processes. Prey are lightweight processes.
- **Intelligent beings:** User-space applications. Complex programs with interfaces, states, and purposes.
- **The Architect:** The root user / system administrator. Gone now.

**Real-world parallel:** The Unix process model. Everything is a process. Some are vital system processes, some are user applications, some are orphaned processes still running with no parent.

---

## Language and Communication (Parallel: Protocols and Encoding)

Inhabitants communicate through structured protocols. Different regions may use different "dialects" (parallel: different data formats / encoding schemes). A traveler must understand the local protocol to communicate effectively.

Written language in Algorithmia looks like encoded data made beautiful -- flowing script that, to the initiated, reveals its logical structure. The player gradually learns to "read" the world's underlying logic, seeing meaning where others see only pattern.

**Real-world parallel:** ASCII, Unicode, JSON, XML, binary encoding. The idea that all communication is structured data, and understanding the structure is understanding the message.
