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

export const SPRITE_ASSETS: AssetEntry[] = [
  // Player sprites will be generated procedurally for now
  // { key: 'player-idle', path: 'assets/sprites/player/idle.png', frameWidth: 32, frameHeight: 48 },
];

export const IMAGE_ASSETS: AssetEntry[] = [
  // { key: 'prologue-tileset', path: 'assets/tilesets/prologue/tileset.png' },
];

export const TILEMAP_ASSETS: AssetEntry[] = [
  // { key: 'prologue-map', path: 'assets/maps/prologue.json' },
];

export const AUDIO_ASSETS: AssetEntry[] = [
  // { key: 'prologue-bgm', path: 'assets/audio/music/prologue.mp3' },
  // { key: 'sfx-correct', path: 'assets/audio/sfx/correct.wav' },
  // { key: 'sfx-wrong', path: 'assets/audio/sfx/wrong.wav' },
];
