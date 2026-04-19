import { describe, expect, it } from 'vitest';
import { InteractableObject } from './InteractableObject';

describe('InteractableObject', () => {
  it('renders sprite-backed gates and swaps frames by visual state', () => {
    const spriteCalls: Array<{ x: number; y: number; key: string; frame: number }> = [];
    const frames: number[] = [];
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
            setDepth: () => sprite,
            setScale: () => sprite,
            setFrame: (nextFrame: number) => {
              frames.push(nextFrame);
              return sprite;
            },
            destroy: () => undefined,
          };
          return sprite;
        },
        graphics: () => ({
          setPosition() {
            return this;
          },
          setDepth() {
            return this;
          },
          setAlpha() {
            return this;
          },
          fillStyle: () => undefined,
          fillCircle: () => undefined,
          destroy: () => undefined,
        }),
      },
      physics: { world: { enable: () => undefined } },
      tweens: { add: () => undefined },
    };

    const gate = new InteractableObject(scene as never, {
      id: 'boss_gate',
      type: 'gate',
      x: 1830,
      y: 395,
      spriteKey: 'prologue-gates',
      frameByState: { locked: 4, unlocked: 6 },
      initialState: 'locked',
    });
    gate.setVisualState('unlocked');

    expect(spriteCalls).toEqual([{ x: 1830, y: 395, key: 'prologue-gates', frame: 4 }]);
    expect(frames).toEqual([6]);
  });
});
