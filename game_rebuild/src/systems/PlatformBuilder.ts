import type { PlatformCluster } from '../data/regions/prologue';

const TILESET_KEY = 'prologue-tileset';
const PLATFORM_DEPTH = 2;
const PLATFORM_TILE_SCALE = 0.28;

export interface PlatformHandle {
  destroy(): void;
}

export class PlatformBuilder {
  constructor(private scene: Phaser.Scene) {}

  build(cluster: PlatformCluster): PlatformHandle {
    const sprites: Phaser.GameObjects.Image[] = [];
    const ox = cluster.origin.x;
    const oy = cluster.origin.y;

    for (const tile of cluster.tiles) {
      const sprite = this.scene.add
        .image(ox + tile.dx, oy + tile.dy, TILESET_KEY, tile.frame)
        .setOrigin(0.5, 0.5)
        .setDepth(PLATFORM_DEPTH)
        .setScale(PLATFORM_TILE_SCALE);
      sprites.push(sprite);
    }

    return {
      destroy: () => {
        for (const sprite of sprites) sprite.destroy();
      },
    };
  }

  buildAll(clusters: readonly PlatformCluster[]): PlatformHandle {
    const handles = clusters.map((cluster) => this.build(cluster));
    return {
      destroy: () => {
        for (const handle of handles) handle.destroy();
      },
    };
  }
}
