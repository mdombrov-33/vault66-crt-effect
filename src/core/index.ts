/**
 * Framework-agnostic CRT core.
 *
 * Contains everything that isn't React/Vue/DOM specific: the presets, the
 * options type, and `computeCrt` — which maps options onto class names,
 * inline styles, and overlay layers. Build your own wrapper for any framework
 * by rendering what `computeCrt` returns and importing the stylesheet.
 */
export { computeCrt } from "./compute";
export type { CRTComputed, CRTStyle, OverlayClass } from "./compute";
export type { CRTOptions } from "./options";
export { presets } from "./presets";
export type { PresetConfig, PresetName } from "./presets";
