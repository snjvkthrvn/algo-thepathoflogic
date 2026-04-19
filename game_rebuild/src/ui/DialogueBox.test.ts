import { describe, expect, it } from 'vitest';
import { DialogueBox } from './DialogueBox';

describe('DialogueBox', () => {
  it('uses the sliced prologue UI dialogue box image', () => {
    const imageCalls: Array<{ x: number; y: number; key: string }> = [];
    const scene = {
      cameras: { main: { width: 1280, height: 720 } },
      add: {
        container: () => ({
          setDepth() {
            return this;
          },
          setScrollFactor() {
            return this;
          },
          setVisible() {
            return this;
          },
          add: () => undefined,
          destroy: () => undefined,
          visible: false,
        }),
        image: (x: number, y: number, key: string) => {
          imageCalls.push({ x, y, key });
          return {
            setOrigin() {
              return this;
            },
            setDisplaySize() {
              return this;
            },
            setDepth() {
              return this;
            },
          };
        },
        graphics: () => ({
          fillStyle: () => undefined,
          fillRoundedRect: () => undefined,
          lineStyle: () => undefined,
          strokeRoundedRect: () => undefined,
        }),
        text: () => ({
          setOrigin() {
            return this;
          },
          setVisible: () => undefined,
        }),
      },
      tweens: { add: () => undefined },
    };

    new DialogueBox(scene as never);

    expect(imageCalls.some((call) => call.key === 'prologue-ui-dialogue_box')).toBe(true);
  });
});
