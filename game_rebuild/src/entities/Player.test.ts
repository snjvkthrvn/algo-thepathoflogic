import { describe, expect, it, vi } from 'vitest';
import { PLAYER_SPEED } from '../config/constants';
import { Player } from './Player';

vi.mock('phaser', () => ({
  default: {
    Input: {
      Keyboard: {
        KeyCodes: {
          W: 87,
          A: 65,
          S: 83,
          D: 68,
        },
      },
    },
  },
}));

type FakeKey = {
  isDown: boolean;
  timeDown: number;
};

type FakeBody = {
  velocity: { x: number; y: number };
  setSize: () => void;
  setOffset: () => void;
  setCollideWorldBounds: () => void;
  setVelocity: (x: number, y: number) => void;
  reset: () => void;
};

type FakeDisplayObject = {
  x: number;
  y: number;
  setStrokeStyle: () => FakeDisplayObject;
  setPosition: (x: number, y: number) => FakeDisplayObject;
};

type FakeSprite = {
  x: number;
  y: number;
  body: FakeBody;
  anims: { play: (key: string, ignoreIfPlaying?: boolean) => void };
  setDepth: () => FakeSprite;
  setScale: () => FakeSprite;
  setFlipX: () => FakeSprite;
  setPosition: (x: number, y: number) => FakeSprite;
  destroy: () => void;
};

type FakeContainer = {
  x: number;
  y: number;
  body: FakeBody;
  add: (_child: unknown) => FakeContainer;
  setPosition: (x: number, y: number) => FakeContainer;
  destroy: () => void;
};

function createKey(): FakeKey {
  return { isDown: false, timeDown: 0 };
}

function createDisplayObject(y = 0): FakeDisplayObject {
  const object = {
    x: 0,
    y,
    setStrokeStyle: () => object,
    setPosition: (x: number, nextY: number) => {
      object.x = x;
      object.y = nextY;
      return object;
    },
  };

  return object;
}

function createPlayer() {
  const keys = {
    left: createKey(),
    right: createKey(),
    up: createKey(),
    down: createKey(),
    W: createKey(),
    A: createKey(),
    S: createKey(),
    D: createKey(),
  };

  const velocity = { x: 0, y: 0 };
  const body: FakeBody = {
    velocity,
    setSize: () => undefined,
    setOffset: () => undefined,
    setCollideWorldBounds: () => undefined,
    setVelocity: (x: number, y: number) => {
      velocity.x = x;
      velocity.y = y;
    },
    reset: () => undefined,
  };

  const createContainer = (x: number, y: number): FakeContainer => {
    const container: FakeContainer = {
      x,
      y,
      body,
      add: () => container,
      setPosition: (nextX: number, nextY: number) => {
        container.x = nextX;
        container.y = nextY;
        return container;
      },
      destroy: () => undefined,
    };

    return container;
  };
  const spriteCalls: Array<{ x: number; y: number; key: string; frame: number }> = [];
  const animationPlays: string[] = [];
  const createSprite = (x: number, y: number, key: string, frame: number): FakeSprite => {
    spriteCalls.push({ x, y, key, frame });
    const sprite: FakeSprite = {
      x,
      y,
      body,
      anims: {
        play: (animationKey: string) => {
          animationPlays.push(animationKey);
        },
      },
      setDepth: () => sprite,
      setScale: () => sprite,
      setFlipX: () => sprite,
      setPosition: (nextX: number, nextY: number) => {
        sprite.x = nextX;
        sprite.y = nextY;
        return sprite;
      },
      destroy: () => undefined,
    };
    return sprite;
  };

  const scene = {
    add: {
      container: createContainer,
      sprite: createSprite,
      ellipse: () => createDisplayObject(),
      rectangle: (_x: number, y: number) => createDisplayObject(y),
    },
    anims: {
      exists: () => false,
      create: () => undefined,
      generateFrameNumbers: (_key: string, range: { start: number; end: number }) =>
        Array.from({ length: range.end - range.start + 1 }, (_, index) => ({
          key: 'prologue-mc',
          frame: range.start + index,
        })),
    },
    physics: {
      world: {
        enable: () => undefined,
      },
    },
    input: {
      keyboard: {
        createCursorKeys: () => ({
          left: keys.left,
          right: keys.right,
          up: keys.up,
          down: keys.down,
        }),
        addKey: (keyCode: number) => {
          const keyMap: Record<number, FakeKey> = {
            87: keys.W,
            65: keys.A,
            83: keys.S,
            68: keys.D,
          };
          return keyMap[keyCode];
        },
      },
    },
    tweens: {
      add: () => ({ stop: () => undefined }),
    },
  };

  const player = new Player(scene as never, 100, 100);

  return { animationPlays, body, keys, player, spriteCalls };
}

describe('Player', () => {
  it('creates the player from the prologue mc spritesheet', () => {
    const { animationPlays, spriteCalls } = createPlayer();

    expect(spriteCalls).toEqual([{ x: 100, y: 100, key: 'prologue-mc', frame: 0 }]);
    expect(animationPlays).toContain('mc-idle-down');
  });

  it('uses the newest horizontal input when opposite directions overlap', () => {
    const { body, keys, player } = createPlayer();

    keys.left.isDown = true;
    keys.left.timeDown = 10;
    keys.right.isDown = true;
    keys.right.timeDown = 20;

    player.update();

    expect(body.velocity.x).toBe(PLAYER_SPEED);
    expect(body.velocity.y).toBe(0);
    expect(player.getFacingDirection()).toBe('right');
  });
});
