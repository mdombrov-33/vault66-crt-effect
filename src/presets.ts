/**
 * CRT Effect Presets
 *
 * Each preset provides a complete configuration for achieving
 * specific vintage monitor/terminal aesthetics.
 */

export interface PresetConfig {
  theme?: "green" | "amber" | "blue" | "custom";
  enabled?: boolean;
  sweepDuration?: number;
  sweepThickness?: number;
  sweepStyle?: "classic" | "soft";
  scanlineOpacity?: number;
  scanlineThickness?: number;
  scanlineGap?: number;
  scanlineOrientation?: "horizontal" | "vertical";
  enableScanlines?: boolean;
  enableSweep?: boolean;
  enableGlow?: boolean;
  enableEdgeGlow?: boolean;
  enableFlicker?: boolean;
  enableVignette?: boolean;
  glitchMode?: boolean;
  glowColor?: string;
  edgeGlowColor?: string;
  edgeGlowSize?: number;
  flickerIntensity?: "low" | "medium" | "high";
  glitchIntensity?: "low" | "medium" | "high";
  vignetteIntensity?: number;
  scanlineColor?: string;
}

export type PresetName =
  | "fallout"
  | "dos"
  | "cyberpunk"
  | "commodore64"
  | "apple2"
  | "arcade"
  | "vt100"
  | "minimal";

export const presets: Record<PresetName, PresetConfig> = {
  /**
   * FALLOUT
   */
  fallout: {
    theme: "green",
    enableScanlines: true,
    scanlineOpacity: 0.25,
    scanlineThickness: 2,
    scanlineGap: 3,
    enableSweep: true,
    sweepDuration: 12,
    sweepThickness: 10,
    sweepStyle: "classic",
    enableGlow: false,
    enableEdgeGlow: true,
    edgeGlowColor: "rgba(91, 179, 135, 0.5)",
    edgeGlowSize: 40,
    enableFlicker: true,
    flickerIntensity: "low",
    enableVignette: true,
    vignetteIntensity: 0.3,
    glitchMode: false,
  },

  /**
   * DOS - Classic DOS/Hercules monitor
   */
  dos: {
    theme: "custom",
    scanlineColor: "rgba(255, 100, 0, 0.3)",
    enableScanlines: true,
    scanlineOpacity: 0.2,
    scanlineThickness: 2,
    scanlineGap: 4,
    enableSweep: false,
    enableGlow: false,
    enableEdgeGlow: false,
    enableFlicker: false,
    enableVignette: true,
    vignetteIntensity: 0.25,
    glitchMode: false,
  },

  /**
   * CYBERPUNK
   */
  cyberpunk: {
    theme: "custom",
    scanlineColor: "rgba(255, 0, 255, 0.3)",
    enableScanlines: true,
    scanlineOpacity: 0.35,
    scanlineThickness: 2,
    scanlineGap: 2,
    enableSweep: true,
    sweepDuration: 5,
    sweepThickness: 15,
    sweepStyle: "classic",
    enableGlow: true,
    glowColor: "rgba(255, 0, 200, 0.5)",
    enableEdgeGlow: true,
    edgeGlowColor: "rgba(200, 0, 255, 0.6)",
    edgeGlowSize: 50,
    enableFlicker: true,
    flickerIntensity: "medium",
    enableVignette: true,
    vignetteIntensity: 0.4,
    glitchMode: true,
    glitchIntensity: "low",
  },

  /**
   * COMMODORE 64 - 8-bit computer
   */
  commodore64: {
    theme: "custom",
    scanlineColor: "rgba(160, 160, 255, 0.35)",
    enableScanlines: true,
    scanlineOpacity: 0.35,
    scanlineThickness: 3,
    scanlineGap: 2,
    enableSweep: true,
    sweepDuration: 10,
    sweepThickness: 12,
    sweepStyle: "classic",
    enableGlow: false,
    enableEdgeGlow: false,
    enableFlicker: true,
    flickerIntensity: "low",
    enableVignette: true,
    vignetteIntensity: 0.35,
    glitchMode: false,
  },

  /**
   * APPLE II - Vintage Apple computer terminal
   */
  apple2: {
    theme: "custom",
    scanlineColor: "rgba(120, 220, 80, 0.3)",
    enableScanlines: true,
    scanlineOpacity: 0.3,
    scanlineThickness: 1,
    scanlineGap: 2,
    enableSweep: false,
    enableGlow: false,
    enableEdgeGlow: false,
    enableFlicker: false,
    enableVignette: true,
    vignetteIntensity: 0.2,
    glitchMode: false,
  },

  /**
   * ARCADE - Retro arcade cabinet monitor
   */
  arcade: {
    theme: "custom",
    scanlineColor: "rgba(0, 255, 100, 0.4)",
    enableScanlines: true,
    scanlineOpacity: 0.4,
    scanlineThickness: 3,
    scanlineGap: 3,
    enableSweep: true,
    sweepDuration: 4,
    sweepThickness: 15,
    sweepStyle: "classic",
    enableGlow: true,
    glowColor: "rgba(0, 255, 100, 0.5)",
    enableEdgeGlow: true,
    edgeGlowColor: "rgba(0, 255, 100, 0.6)",
    edgeGlowSize: 45,
    enableFlicker: true,
    flickerIntensity: "medium",
    enableVignette: true,
    vignetteIntensity: 0.45,
    glitchMode: false,
  },

  /**
   * VT100 - Classic DEC terminal
   */
  vt100: {
    theme: "custom",
    scanlineColor: "rgba(220, 255, 235, 0.2)",
    enableScanlines: true,
    scanlineOpacity: 0.15,
    scanlineThickness: 2,
    scanlineGap: 4,
    enableSweep: false,
    enableGlow: false,
    enableEdgeGlow: false,
    enableFlicker: false,
    enableVignette: true,
    vignetteIntensity: 0.15,
    glitchMode: false,
  },

  /**
   * MINIMAL - Subtle CRT effect
   */
  minimal: {
    theme: "green",
    enableScanlines: true,
    scanlineOpacity: 0.1,
    scanlineThickness: 1,
    scanlineGap: 4,
    enableSweep: false,
    enableGlow: false,
    enableEdgeGlow: false,
    enableFlicker: false,
    enableVignette: true,
    vignetteIntensity: 0.2,
    glitchMode: false,
  },
};
