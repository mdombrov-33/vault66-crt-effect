import type { PresetConfig, PresetName } from "./presets";

/**
 * Framework-agnostic configuration for the CRT effect.
 *
 * This is every knob the effect exposes, minus any framework-specific
 * concern (like `children`/slots). React, Vue, and the Web Component all
 * accept these same options and hand them to `computeCrt`.
 */
export interface CRTOptions extends PresetConfig {
  /** Apply a complete preset. Individual options still override preset values. */
  preset?: PresetName;
  /**
   * Stretch the effect to fill its parent's full width and height instead of
   * sizing to its content. Use for full-screen / full-bleed layouts.
   */
  fill?: boolean;
}
