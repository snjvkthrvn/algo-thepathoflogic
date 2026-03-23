/**
 * NPC configurations for the Prologue region.
 */

import { NPCType } from '../types';
import type { NPCConfig } from '../types';

import {
  professorNodeDialogue,
  professorNodePostPuzzle,
  runeKeeperDialogue,
  runeKeeperPostPuzzle,
  consoleKeeperDialogue,
  consoleKeeperPostPuzzle,
} from '../dialogue/prologue_dialogue';

export const PROLOGUE_NPCS: NPCConfig[] = [
  {
    id: 'professor_node',
    name: 'Professor Node',
    type: NPCType.MENTOR,
    spriteKey: 'npc-professor',
    defaultPosition: { x: 640, y: 400 },
    dialogue: professorNodeDialogue,
    postPuzzleDialogue: professorNodePostPuzzle,
    questRelated: true,
  },
  {
    id: 'rune_keeper',
    name: 'Rune Keeper',
    type: NPCType.GUIDE,
    spriteKey: 'npc-rune-keeper',
    defaultPosition: { x: 900, y: 280 },
    dialogue: runeKeeperDialogue,
    postPuzzleDialogue: runeKeeperPostPuzzle,
    questRelated: true,
  },
  {
    id: 'console_keeper',
    name: 'Console Keeper',
    type: NPCType.GUIDE,
    spriteKey: 'npc-console-keeper',
    defaultPosition: { x: 900, y: 520 },
    dialogue: consoleKeeperDialogue,
    postPuzzleDialogue: consoleKeeperPostPuzzle,
    questRelated: true,
  },
];
