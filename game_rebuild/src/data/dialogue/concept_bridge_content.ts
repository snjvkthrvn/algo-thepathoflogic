/**
 * Pre-written Concept Bridge content for each puzzle.
 * Source of truth for the educational layer.
 */

export interface ConceptBridgeContent {
  puzzleId: string;
  sections: {
    storyRecap: string[];
    patternReveal: { title: string; explanation: string[] };
    pseudocode: { code: string; explanation: string };
    miniForge: { question: string; options: string[]; correctIndex: number; explanation: string };
    codexEntryId: string;
  };
}

export const CONCEPT_BRIDGE_DATA: Record<string, ConceptBridgeContent> = {
  p0_1: {
    puzzleId: 'p0_1',
    sections: {
      storyRecap: [
        'You followed the ancient rune patterns, tracing paths that the first Sequencers laid down.',
        'Each rune glowed in order, and you reproduced the sequence exactly -- proving you understand that order matters.',
        'This is the foundation of all algorithms: processing elements one at a time, in sequence.',
      ],
      patternReveal: {
        title: 'Sequential Processing (Iteration)',
        explanation: [
          'What you just did is called SEQUENTIAL PROCESSING -- going through a list of items one by one, in order.',
          'In programming, this is called ITERATION. A "for loop" visits each element of an array exactly once.',
          'Arrays are the simplest data structure: items stored in a line, accessed by their position (index).',
          'The order you followed (1st, 2nd, 3rd...) is exactly how a computer reads through an array.',
        ],
      },
      pseudocode: {
        code: `function followPattern(runes):
    for each rune in sequence:
        observe(rune)        // Watch which tile glows
        memorize(rune.index) // Remember its position

    for each memorized position:
        step_on(position)    // Reproduce the sequence
        if wrong:
            restart()        // Try again from beginning`,
        explanation: 'This loop processes each rune in order -- just like iterating through an array. The "for each" structure visits every element exactly once.',
      },
      miniForge: {
        question: 'What is the output of this code?\n\narr = [10, 20, 30, 40]\nfor i in range(len(arr)):\n    print(arr[i])',
        options: ['40 30 20 10', '10 20 30 40', '10 40', 'Error'],
        correctIndex: 1,
        explanation: 'The loop iterates through indices 0, 1, 2, 3 in order, printing each element sequentially: 10, 20, 30, 40.',
      },
      codexEntryId: 'sequential_processing',
    },
  },

  p0_2: {
    puzzleId: 'p0_2',
    sections: {
      storyRecap: [
        'You matched each flow shard to its console, restoring connections the Execution had severed.',
        'Each shard had unique properties -- shape, pattern, color -- and each console needed exactly one match.',
        'You didn\'t need to search every combination. You looked at the key, and knew where it belonged.',
      ],
      patternReveal: {
        title: 'Key-Value Mapping (Hash Maps)',
        explanation: [
          'What you just did is called KEY-VALUE MAPPING -- using a unique identifier (the key) to find its match (the value) instantly.',
          'In programming, this data structure is called a HASH MAP (or dictionary, or object).',
          'Instead of searching through every item (slow!), you jump directly to the right answer using the key.',
          'Hash maps are one of the most powerful tools in computer science -- they make lookups instant.',
        ],
      },
      pseudocode: {
        code: `consoleMap = {
    "circle-solid-red": console_1,
    "triangle-striped-blue": console_2,
    "square-dotted-green": console_3
}

function placeShard(shard):
    key = shard.shape + shard.pattern + shard.color
    target = consoleMap[key]  // Instant lookup!
    place(shard, target)`,
        explanation: 'The hash map stores each console indexed by its shard properties. Looking up where a shard goes is instant -- O(1) time complexity.',
      },
      miniForge: {
        question: 'You have a dictionary: d = {"apple": 1, "banana": 2, "cherry": 3}\nWhat does d["banana"] return?',
        options: ['1', '2', '3', '"banana"'],
        correctIndex: 1,
        explanation: '"banana" is the key, and 2 is its value. Hash map lookups use the key to instantly retrieve the associated value.',
      },
      codexEntryId: 'key_value_mapping',
    },
  },

  boss_sentinel: {
    puzzleId: 'boss_sentinel',
    sections: {
      storyRecap: [
        'The Sentinel tested everything you\'d learned -- patterns and mappings, chaos and order.',
        'In Phase 1, you proved you could read and reproduce sequences under pressure.',
        'In Phase 2, you matched fragments to sockets while dodging energy orbs.',
        'In Phase 3, you combined both skills simultaneously -- the true test of mastery.',
      ],
      patternReveal: {
        title: 'Combined Algorithms & Authentication',
        explanation: [
          'The Sentinel was an authentication challenge -- proving you have the right to pass.',
          'Real security systems combine multiple verification methods: something you know (the pattern), something you have (the shard).',
          'In programming, this is like passing multiple checks before gaining access to a resource.',
          'The escalating difficulty mirrors how security systems increase verification for higher-privilege operations.',
        ],
      },
      pseudocode: {
        code: `function authenticate(user):
    // Step 1: Verify pattern knowledge
    if not verifySequence(user.input, expected):
        return DENIED

    // Step 2: Verify key possession
    if not verifyMapping(user.shards, sockets):
        return DENIED

    // Step 3: Combined verification
    if not verifyCombined(user):
        return DENIED

    return AUTHORIZED  // Access granted!`,
        explanation: 'Multi-factor authentication checks multiple conditions before granting access. Each phase of the boss fight was one factor in this authentication process.',
      },
      miniForge: {
        question: 'A function checks 3 conditions. If any fails, access is denied. What is this pattern called?',
        options: ['Recursion', 'Multi-factor authentication', 'Sorting', 'Caching'],
        correctIndex: 1,
        explanation: 'Multi-factor authentication requires passing ALL checks to gain access. Failing any single check results in denial -- just like the Sentinel\'s phases.',
      },
      codexEntryId: 'pattern_recognition',
    },
  },
};
