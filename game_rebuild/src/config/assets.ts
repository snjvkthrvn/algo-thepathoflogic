export interface AssetEntry {
  key: string;
  path: string;
  frameWidth?: number;
  frameHeight?: number;
}

const BASE = 'assets/prologue';

export const SPRITE_ASSETS: AssetEntry[] = [
  { key: 'prologue-tileset', path: `${BASE}/tileset/sheet.png`, frameWidth: 469, frameHeight: 384 },
  { key: 'prologue-mc', path: `${BASE}/mc/sheet.png`, frameWidth: 469, frameHeight: 512 },
  { key: 'prologue-mc-extra', path: `${BASE}/mcmore/sheet.png`, frameWidth: 469, frameHeight: 512 },
  { key: 'prologue-node', path: `${BASE}/node/sheet.png`, frameWidth: 352, frameHeight: 384 },
  { key: 'prologue-rune-keeper', path: `${BASE}/rune-keeper/sheet.png`, frameWidth: 704, frameHeight: 768 },
  { key: 'prologue-console-keeper', path: `${BASE}/console-keeper/sheet.png`, frameWidth: 704, frameHeight: 768 },
  { key: 'prologue-gates', path: `${BASE}/gates/sheet.png`, frameWidth: 704, frameHeight: 768 },
  { key: 'prologue-p01-tiles', path: `${BASE}/p01-tiles/sheet.png`, frameWidth: 704, frameHeight: 512 },
  { key: 'prologue-atmosphere', path: `${BASE}/atmosphere/sheet.png`, frameWidth: 312, frameHeight: 384 },
];

const compositeImage = (sub: string, name: string): AssetEntry => ({
  key: `prologue-${sub}-${name}`,
  path: `${BASE}/${sub}/${name}.png`,
});

export const IMAGE_ASSETS: AssetEntry[] = [
  compositeImage('portal', 'locked'),
  compositeImage('portal', 'active_0'),
  compositeImage('portal', 'swirl_0'),
  compositeImage('portal', 'swirl_1'),
  compositeImage('portal', 'swirl_2'),
  compositeImage('portal', 'swirl_3'),
  compositeImage('ui', 'dialogue_box'),
  compositeImage('ui', 'portrait_inactive'),
  compositeImage('ui', 'portrait_active'),
  compositeImage('ui', 'prompt'),
  compositeImage('moretiles', 'bridge_straight_h'),
  compositeImage('moretiles', 'bridge_straight_v'),
  compositeImage('moretiles', 'bridge_corner_ne'),
  compositeImage('moretiles', 'bridge_corner_nw'),
  compositeImage('moretiles', 'bridge_tee'),
  compositeImage('moretiles', 'arena_hub'),
  compositeImage('moretiles', 'crystal_small'),
  compositeImage('moretiles', 'crystal_large'),
  compositeImage('p02-tiles', 'shard_red_0'),
  compositeImage('p02-tiles', 'shard_red_1'),
  compositeImage('p02-tiles', 'shard_red_2'),
  compositeImage('p02-tiles', 'shard_red_3'),
  compositeImage('p02-tiles', 'shard_blue_0'),
  compositeImage('p02-tiles', 'shard_blue_1'),
  compositeImage('p02-tiles', 'shard_blue_2'),
  compositeImage('p02-tiles', 'shard_blue_3'),
  compositeImage('p02-tiles', 'shard_green_0'),
  compositeImage('p02-tiles', 'shard_green_1'),
  compositeImage('p02-tiles', 'shard_green_2'),
  compositeImage('p02-tiles', 'shard_green_3'),
  compositeImage('p02-tiles', 'console_red'),
  compositeImage('p02-tiles', 'console_blue'),
  compositeImage('p02-tiles', 'console_green'),
  compositeImage('p02-tiles', 'console_red_active'),
  compositeImage('p02-tiles', 'console_blue_active'),
  compositeImage('p02-tiles', 'console_green_active'),
  compositeImage('prologue-boss', 'phase1_whole'),
  compositeImage('prologue-boss', 'phase2_shard_0'),
  compositeImage('prologue-boss', 'phase2_shard_1'),
  compositeImage('prologue-boss', 'phase2_shard_2'),
  compositeImage('prologue-boss', 'phase2_shard_3'),
  compositeImage('prologue-boss', 'phase2_shard_4'),
  compositeImage('prologue-boss', 'phase2_shard_5'),
  compositeImage('prologue-boss', 'phase3_frame_0'),
  compositeImage('prologue-boss', 'phase3_frame_1'),
  compositeImage('prologue-boss', 'phase3_frame_2'),
  compositeImage('prologue-boss', 'phase3_frame_3'),
];

export const TILEMAP_ASSETS: AssetEntry[] = [];

export const AUDIO_ASSETS: AssetEntry[] = [];
