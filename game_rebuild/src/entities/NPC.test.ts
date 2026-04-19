import { describe, expect, it } from 'vitest';
import { NPCType, type NPCConfig } from '../data/types';
import { NPC } from './NPC';

const baseConfig: NPCConfig = {
  id: 'professor_node',
  name: 'Professor Node',
  type: NPCType.MENTOR,
  spriteKey: 'prologue-node',
  idleFrames: [0, 1, 2, 3],
  talkFrames: [4, 5, 6, 7],
  defaultPosition: { x: 900, y: 395 },
  dialogue: { startNodeId: 'start', nodes: [{ id: 'start', speaker: 'Professor Node', text: 'Hello' }] },
};

describe('NPC', () => {
  it('renders configured prologue NPCs from their spritesheet', () => {
    const spriteCalls: Array<{ x: number; y: number; key: string; frame: number }> = [];
    const scene = {
      add: {
        sprite: (x: number, y: number, key: string, frame: number) => {
          spriteCalls.push({ x, y, key, frame });
          const sprite = {
            x,
            y,
            body: {
              setSize: () => undefined,
              setOffset: () => undefined,
              setImmovable: () => undefined,
            },
            anims: { play: () => undefined },
            setDepth: () => sprite,
            setScale: () => sprite,
            destroy: () => undefined,
          };
          return sprite;
        },
        graphics: () => ({
          setAlpha() {
            return this;
          },
          setDepth() {
            return this;
          },
          setPosition() {
            return this;
          },
          clear: () => undefined,
          fillStyle: () => undefined,
          fillCircle: () => undefined,
          destroy: () => undefined,
        }),
        text: () => ({
          setOrigin() {
            return this;
          },
          setDepth() {
            return this;
          },
          setVisible: () => undefined,
          destroy: () => undefined,
        }),
      },
      anims: {
        exists: () => false,
        create: () => undefined,
      },
      physics: {
        world: {
          enable: () => undefined,
        },
      },
      tweens: {
        add: () => undefined,
      },
    };

    new NPC(scene as never, baseConfig);

    expect(spriteCalls).toEqual([{ x: 900, y: 395, key: 'prologue-node', frame: 0 }]);
  });
});
