import type { DialogueTree } from '../types';

export interface GlitchLine {
  text: string;
  duration: number;
}

export const prologueGlitchIntroDialogue: DialogueTree = {
  startNodeId: 'g_intro_1',
  nodes: [
    {
      id: 'g_intro_1',
      speaker: 'Glitch',
      text: 'Ha! You did the tile thing too? Took me FOREVER. I just tried every tile until I got lucky.',
      nextNodeId: 'g_intro_2',
    },
    {
      id: 'g_intro_2',
      speaker: 'Glitch',
      text: "Wait - you got a SHARD? Already? I've been at this for... how long have I been at this?",
      nextNodeId: 'g_intro_3',
    },
    {
      id: 'g_intro_3',
      speaker: 'Glitch',
      text: "Whatever. I'm heading to those console things next. Bet I beat you there.",
      nextNodeId: 'g_intro_4',
    },
    {
      id: 'g_intro_4',
      speaker: 'Glitch',
      text: 'I MEANT to do that!',
      actions: [{ type: 'set_flag', value: 'glitch_intro_done' }],
    },
  ],
};

export const P0_2_GLITCH_AMBIENT_LINES = [
  'Nope. Nope. Come ON. Nope. WHY WILL YOU NOT FIT?!',
  'There are only three slots. Why does this feel impossible?!',
];

export const GLITCH_DIALOGUE: Record<number, GlitchLine[]> = {
  1: [
    {
      text: 'Ha! You did the tile thing too? Took me FOREVER. I just tried every tile until I got lucky.',
      duration: 2800,
    },
    {
      text: "Wait - you got a SHARD? Already? I've been at this for... how long have I been at this?",
      duration: 3000,
    },
    {
      text: "Whatever. I'm heading to those console things next. Bet I beat you there.",
      duration: 2600,
    },
  ],
  2: [
    { text: 'You again? You actually finished the Arrays?', duration: 2200 },
    { text: '...I had to try 847 combinations. You did it in - how many?', duration: 2800 },
    { text: "Not that it matters. Speed isn't everything.", duration: 2000 },
    { text: '...right?', duration: 1400 },
  ],
  3: [
    { text: 'Your Bit looks different. It\'s grown.', duration: 2000 },
    { text: 'Mine never does that. I keep starting over.', duration: 2400 },
    { text: "How do you get it to - nevermind. I figured it out myself anyway.", duration: 2800 },
    { text: "(They didn't figure it out.)", duration: 1600 },
  ],
};

export const GLITCH_EXIT_LINES: string[] = [
  "Don't follow me.",
  "I'm not impressed.",
  'See you never.',
  'Whatever.',
];
