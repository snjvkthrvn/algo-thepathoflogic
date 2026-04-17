/**
 * Asset manifest for optional authored assets.
 * Empty arrays are valid while the playable build still relies on procedural fallbacks.
 */

export interface AssetEntry {
  key: string;
  path: string;
  frameWidth?: number;
  frameHeight?: number;
}

export const SPRITE_ASSETS: AssetEntry[] = [
  // Register authored sprite sheets here when they replace procedural fallbacks.
];

export const IMAGE_ASSETS: AssetEntry[] = [
  // Register authored images and tilesets here when available.
];

export const TILEMAP_ASSETS: AssetEntry[] = [
  // Register authored tilemaps here when the procedural region layout is replaced.
];

export const AUDIO_ASSETS: AssetEntry[] = [
  // Register authored music and SFX here when they replace procedural audio fallback.
];
