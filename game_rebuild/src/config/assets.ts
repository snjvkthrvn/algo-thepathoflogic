/**
 * Asset manifest - maps keys to file paths.
 * All game assets are registered here for BootScene preloading.
 */

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
  { key: 'prologue-atmosphere', path: `${BASE}/atmosphere/sheet.png`, frameWidth: 313, frameHeight: 384 },
];

const COMPOSITE_IMAGE = (sub: string, name: string): AssetEntry => ({
  key: `prologue-${sub}-${name}`,
  path: `${BASE}/${sub}/${name}.png`,
});

export const IMAGE_ASSETS: AssetEntry[] = [
  COMPOSITE_IMAGE('portal', 'locked'),
  COMPOSITE_IMAGE('portal', 'active_0'),
  COMPOSITE_IMAGE('portal', 'swirl_0'),
  COMPOSITE_IMAGE('portal', 'swirl_1'),
  COMPOSITE_IMAGE('portal', 'swirl_2'),
  COMPOSITE_IMAGE('portal', 'swirl_3'),
  COMPOSITE_IMAGE('ui', 'dialogue_box'),
  COMPOSITE_IMAGE('ui', 'portrait_inactive'),
  COMPOSITE_IMAGE('ui', 'portrait_active'),
  COMPOSITE_IMAGE('ui', 'prompt'),
  COMPOSITE_IMAGE('moretiles', 'bridge_straight_h'),
  COMPOSITE_IMAGE('moretiles', 'bridge_straight_v'),
  COMPOSITE_IMAGE('moretiles', 'bridge_corner_ne'),
  COMPOSITE_IMAGE('moretiles', 'bridge_corner_nw'),
];

export const TILEMAP_ASSETS: AssetEntry[] = [];

export const AUDIO_ASSETS: AssetEntry[] = [];
