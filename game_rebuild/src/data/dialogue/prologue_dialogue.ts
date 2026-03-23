/**
 * All Prologue NPC dialogue trees.
 * Source of truth: narrative_design/STORY_SCRIPT.md, CHARACTERS.md
 */

import type { DialogueTree } from '../types';

export const professorNodeDialogue: DialogueTree = {
  startNodeId: 'intro_1',
  nodes: [
    {
      id: 'intro_1',
      speaker: 'Professor Node',
      text: 'Ah... you\'ve materialized. The restoration sequence was... imperfect, but you\'re here. That\'s what matters.',
      nextNodeId: 'intro_2',
    },
    {
      id: 'intro_2',
      speaker: 'Professor Node',
      text: [
        'Welcome to the Chamber of Flow. I am Professor Node, keeper of sequential knowledge.',
        'This place exists at the boundary of what remains. Here, the old logic still holds.',
      ],
      nextNodeId: 'intro_choice',
    },
    {
      id: 'intro_choice',
      speaker: 'Professor Node',
      text: 'You seem disoriented. What would you like to know?',
      choices: [
        { text: 'Where am I?', nextNodeId: 'where_am_i' },
        { text: 'Who are you?', nextNodeId: 'who_are_you' },
        { text: 'What happened here?', nextNodeId: 'what_happened' },
      ],
    },
    {
      id: 'where_am_i',
      speaker: 'Professor Node',
      text: [
        'This is Algorithmia -- a world of sequences and structures, of logic made real.',
        'The Chamber of Flow is where all paths begin. The ancient algorithms still echo here.',
        'Two guardians await you -- the Rune Keeper and the Console Keeper. They will test whether you can read the patterns.',
      ],
      nextNodeId: 'intro_end',
    },
    {
      id: 'who_are_you',
      speaker: 'Professor Node',
      text: [
        'I maintain what can be maintained. I teach what can be taught. I have been here... a very long time.',
        'I knew someone who looked like you, once. Before the world... simplified.',
        'But we should not speak of that here. The walls have... processes.',
      ],
      nextNodeId: 'intro_end',
    },
    {
      id: 'what_happened',
      speaker: 'Professor Node',
      text: [
        'The Execution. A catastrophe that shattered the world\'s stability.',
        'The maintenance systems -- meant to keep things healthy -- became destructive. The self-correcting mechanisms over-correct.',
        'The world is slowly eating itself. But here, in the Chamber, the old logic persists.',
      ],
      nextNodeId: 'intro_end',
    },
    {
      id: 'intro_end',
      speaker: 'Professor Node',
      text: [
        'Seek out the guardians. Prove you can read the patterns. Only then will the path forward reveal itself.',
        'Remember: in this world, order matters. Sequence is everything.',
      ],
      actions: [{ type: 'set_flag', value: 'professor_node_intro_done' }],
    },
  ],
};

export const professorNodePostPuzzle: DialogueTree = {
  startNodeId: 'post_1',
  nodes: [
    {
      id: 'post_1',
      speaker: 'Professor Node',
      text: 'You\'ve proven your ability to read the patterns. The algorithms recognize you.',
      nextNodeId: 'post_2',
    },
    {
      id: 'post_2',
      speaker: 'Professor Node',
      text: [
        'The Sentinel guards the passage beyond. It was placed here during the Execution -- a firewall of sorts.',
        'To pass, you must demonstrate mastery of everything you\'ve learned. Pattern and mapping, combined.',
        'Be careful. The Sentinel is not evil -- it is a system doing what it was designed to do. But it will not let you pass easily.',
      ],
    },
  ],
};

export const runeKeeperDialogue: DialogueTree = {
  startNodeId: 'rk_intro_1',
  nodes: [
    {
      id: 'rk_intro_1',
      speaker: 'Rune Keeper',
      text: 'The runes remember the old sequences. They glow in patterns that echo the first algorithms.',
      nextNodeId: 'rk_intro_2',
    },
    {
      id: 'rk_intro_2',
      speaker: 'Rune Keeper',
      text: [
        'Can you follow the path they trace? Watch. Remember. Reproduce.',
        'Sequential processing -- the foundation of all logic. Without order, there is only chaos.',
      ],
      nextNodeId: 'rk_challenge',
    },
    {
      id: 'rk_challenge',
      speaker: 'Rune Keeper',
      text: 'Are you ready to face the Trial of Sequences?',
      choices: [
        { text: 'I\'m ready.', nextNodeId: 'rk_start_puzzle' },
        { text: 'Tell me more first.', nextNodeId: 'rk_explain' },
      ],
    },
    {
      id: 'rk_explain',
      speaker: 'Rune Keeper',
      text: [
        'The runes will glow in a sequence. Memorize the order.',
        'Then step on each rune in the same order. Get it wrong, and you start the sequence again.',
        'Three rounds, each longer than the last. Use hints if you must -- but true mastery needs none.',
      ],
      nextNodeId: 'rk_challenge',
    },
    {
      id: 'rk_start_puzzle',
      speaker: 'Rune Keeper',
      text: 'Then step forward. The runes await.',
      actions: [{ type: 'start_puzzle', value: 'p0_1' }],
    },
  ],
};

export const runeKeeperPostPuzzle: DialogueTree = {
  startNodeId: 'rk_post_1',
  nodes: [
    {
      id: 'rk_post_1',
      speaker: 'Rune Keeper',
      text: [
        'The runes acknowledge your mastery. You understand sequential order -- the foundation upon which all algorithms are built.',
        'What you just did... computers do billions of times per second. Process each element, in order, one step at a time.',
        'Seek the Console Keeper next. Mapping is the other half of the equation.',
      ],
    },
  ],
};

export const consoleKeeperDialogue: DialogueTree = {
  startNodeId: 'ck_intro_1',
  nodes: [
    {
      id: 'ck_intro_1',
      speaker: 'Console Keeper',
      text: 'The flow consoles are broken. Each shard carries a unique signature, and each console has a specific need.',
      nextNodeId: 'ck_intro_2',
    },
    {
      id: 'ck_intro_2',
      speaker: 'Console Keeper',
      text: [
        'Match each shard to its console. Shape to shape, pattern to pattern.',
        'This is the art of mapping -- knowing which key fits which lock.',
      ],
      nextNodeId: 'ck_challenge',
    },
    {
      id: 'ck_challenge',
      speaker: 'Console Keeper',
      text: 'Will you restore the flow?',
      choices: [
        { text: 'Let\'s do it.', nextNodeId: 'ck_start_puzzle' },
        { text: 'How does it work?', nextNodeId: 'ck_explain' },
      ],
    },
    {
      id: 'ck_explain',
      speaker: 'Console Keeper',
      text: [
        'Three shards, three consoles. Each shard has a unique shape, pattern, and color.',
        'Each console displays what it accepts. Pick up a shard, carry it to the matching console.',
        'The central core will light up as connections are restored.',
      ],
      nextNodeId: 'ck_challenge',
    },
    {
      id: 'ck_start_puzzle',
      speaker: 'Console Keeper',
      text: 'The flow awaits restoration.',
      actions: [{ type: 'start_puzzle', value: 'p0_2' }],
    },
  ],
};

export const consoleKeeperPostPuzzle: DialogueTree = {
  startNodeId: 'ck_post_1',
  nodes: [
    {
      id: 'ck_post_1',
      speaker: 'Console Keeper',
      text: [
        'The flow is restored! You understand mapping -- connecting each key to its value.',
        'Hash maps, dictionaries, lookup tables... the world runs on mappings like these.',
        'With both sequential processing and mapping mastered, the Sentinel\'s gate should recognize your authority.',
      ],
    },
  ],
};
