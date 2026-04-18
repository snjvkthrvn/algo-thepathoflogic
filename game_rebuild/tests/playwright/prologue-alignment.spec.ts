import { test, expect } from '@playwright/test';

const startPrologue = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await page.waitForFunction(() => {
    const game = (window as any).__PHASER_GAME__;
    const requiredTextures = [
      'prologue-tileset',
      'prologue-mc',
      'prologue-node',
      'prologue-rune-keeper',
      'prologue-console-keeper',
      'prologue-gates',
      'prologue-atmosphere',
    ];
    return (
      !!game?.scene?.isActive('MenuScene') &&
      requiredTextures.every((key) => game.textures.exists(key))
    );
  });
  await page.evaluate(() => {
    const game: any = (window as any).__PHASER_GAME__;
    game.scene.stop('BootScene');
    game.scene.stop('MenuScene');
    game.scene.start('PrologueScene');
  });
  await page.waitForFunction(() =>
    (window as any).__PHASER_GAME__?.scene?.isActive('PrologueScene'),
  );
  await page.waitForTimeout(800);
};

test.describe('Prologue region alignment', () => {
  test.beforeEach(async ({ page }) => {
    await startPrologue(page);
  });

  test('loads all expected texture keys with no 404s', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (response) => {
      if (response.url().includes('/assets/prologue/') && response.status() >= 400) {
        failed.push(response.url());
      }
    });

    await startPrologue(page);
    expect(failed).toEqual([]);

    const keys = await page.evaluate(() =>
      Object.keys((window as any).__PHASER_GAME__.textures.list).filter((key: string) =>
        key.startsWith('prologue-'),
      ),
    );
    for (const expected of [
      'prologue-tileset',
      'prologue-mc',
      'prologue-node',
      'prologue-rune-keeper',
      'prologue-console-keeper',
      'prologue-gates',
      'prologue-atmosphere',
    ]) {
      expect(keys, expected).toContain(expected);
    }
  });

  test('cluster origins match spec', async ({ page }) => {
    const clusters = await page.evaluate(async () => {
      const mod = await import('/src/data/regions/prologue.ts');
      return mod.PROLOGUE_CLUSTERS.map((cluster: any) => ({
        id: cluster.id,
        x: cluster.origin.x,
        y: cluster.origin.y,
      }));
    });

    const find = (id: string) => clusters.find((cluster: any) => cluster.id === id)!;
    expect(find('spawn').x).toBe(320);
    expect(find('hub').x).toBe(900);
    expect(find('hub').y).toBe(395);
    expect(Math.abs(find('north_branch').y - 395)).toBe(Math.abs(find('south_branch').y - 395));
  });

  test('captures baseline screenshots at 4 camera positions', async ({ page }) => {
    for (const x of [0, 600, 1200, 1800]) {
      await page.evaluate((cameraX) => {
        const scene = (window as any).__PHASER_GAME__.scene.getScene('PrologueScene');
        const camera = scene.cameras.main;
        camera.stopFollow();
        camera.scrollX = cameraX;
      }, x);
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `tests/playwright/__snapshots__/camera-${x}.png`,
      });
    }
  });

  test('console has no error-level logs', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });

    await startPrologue(page);
    expect(errors).toEqual([]);
  });
});
