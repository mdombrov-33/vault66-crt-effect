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
  enableGlitch?: boolean;
  enableCurvature?: boolean;
  enableGlare?: boolean;
  enableNoise?: boolean;
  glitchChromatic?: boolean;
  curvatureIntensity?: number;
  glareIntensity?: number;
  noiseOpacity?: number;
  glowColor?: string;
  edgeGlowColor?: string;
  edgeGlowSize?: number;
  flickerIntensity?: "low" | "medium" | "high" | number;
  flickerSpeed?: "low" | "medium" | "high" | number;
  glitchIntensity?: "low" | "medium" | "high" | number;
  glitchSpeed?: "low" | "medium" | "high" | number;
  vignetteIntensity?: number;
  /** Custom hex, RGB, or RGBA scanline color used with the custom theme. */
  scanlineColor?: string;
  /** Recolor the wrapped content to a phosphor tint (derived from `theme`). */
  tintText?: boolean;
  /** Override the phosphor tint color used when `tintText` is on. Any CSS color. */
  textColor?: string;
  /** Give the sweep line a bright, colored glow instead of the dark refresh bar. */
  sweepColor?: string;
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
    tintText: true,
    enableScanlines: true,
    scanlineOpacity: 0.25,
    scanlineThickness: 2,
    scanlineGap: 3,
    enableSweep: true,
    sweepDuration: 12,
    sweepThickness: 6,
    sweepStyle: "classic",
    sweepColor: "rgba(91, 179, 135, 0.5)",
    enableGlow: false,
    enableEdgeGlow: true,
    edgeGlowColor: "rgba(91, 179, 135, 0.5)",
    edgeGlowSize: 40,
    enableFlicker: true,
    flickerIntensity: 0.05,
    flickerSpeed: 1.5,
    enableVignette: true,
    vignetteIntensity: 0.3,
    enableGlitch: false,
    enableCurvature: true,
    curvatureIntensity: 0.6,
    enableNoise: true,
    noiseOpacity: 0.2,
  },

  /**
   * DOS - Classic DOS/Hercules monitor
   */
  dos: {
    theme: "custom",
    scanlineColor: "rgba(255, 100, 0, 0.3)",
    tintText: true,
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
    enableGlitch: false,
    enableCurvature: true,
    curvatureIntensity: 0.55,
  },

  /**
   * CYBERPUNK
   */
  cyberpunk: {
    theme: "custom",
    scanlineColor: "rgba(255, 0, 255, 0.3)",
    tintText: true,
    enableScanlines: true,
    scanlineOpacity: 0.35,
    scanlineThickness: 2,
    scanlineGap: 2,
    enableSweep: true,
    sweepDuration: 5,
    sweepThickness: 8,
    sweepStyle: "classic",
    sweepColor: "rgba(255, 0, 200, 0.5)",
    enableGlow: true,
    glowColor: "rgba(255, 0, 200, 0.5)",
    enableEdgeGlow: true,
    edgeGlowColor: "rgba(200, 0, 255, 0.6)",
    edgeGlowSize: 50,
    enableFlicker: true,
    flickerIntensity: 0.08,
    flickerSpeed: 0.8,
    enableVignette: true,
    vignetteIntensity: 0.4,
    enableGlitch: true,
    glitchIntensity: 0.3,
    glitchSpeed: 1.0,
    glitchChromatic: true,
    enableCurvature: true,
    curvatureIntensity: 0.7,
    enableGlare: true,
    glareIntensity: 0.25,
    enableNoise: true,
    noiseOpacity: 0.18,
  },

  /**
   * COMMODORE 64 - 8-bit computer
   */
  commodore64: {
    theme: "custom",
    scanlineColor: "rgba(160, 160, 255, 0.35)",
    tintText: true,
    enableScanlines: true,
    scanlineOpacity: 0.35,
    scanlineThickness: 3,
    scanlineGap: 2,
    enableSweep: true,
    sweepDuration: 10,
    sweepThickness: 6,
    sweepStyle: "classic",
    sweepColor: "rgba(160, 160, 255, 0.5)",
    enableGlow: false,
    enableEdgeGlow: false,
    enableFlicker: true,
    flickerIntensity: 0.05,
    flickerSpeed: 1.5,
    enableVignette: true,
    vignetteIntensity: 0.35,
    enableGlitch: false,
    enableCurvature: true,
    curvatureIntensity: 0.6,
    enableNoise: true,
    noiseOpacity: 0.15,
  },

  /**
   * APPLE II - Vintage Apple computer terminal
   */
  apple2: {
    theme: "custom",
    scanlineColor: "rgba(120, 220, 80, 0.3)",
    tintText: true,
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
    enableGlitch: false,
    enableCurvature: true,
    curvatureIntensity: 0.55,
  },

  /**
   * ARCADE - Retro arcade cabinet monitor
   */
  arcade: {
    theme: "custom",
    scanlineColor: "rgba(0, 255, 100, 0.4)",
    tintText: true,
    enableScanlines: true,
    scanlineOpacity: 0.4,
    scanlineThickness: 3,
    scanlineGap: 3,
    enableSweep: true,
    sweepDuration: 4,
    sweepThickness: 8,
    sweepStyle: "classic",
    sweepColor: "rgba(0, 255, 100, 0.5)",
    enableGlow: true,
    glowColor: "rgba(0, 255, 100, 0.5)",
    enableEdgeGlow: true,
    edgeGlowColor: "rgba(0, 255, 100, 0.6)",
    edgeGlowSize: 45,
    enableFlicker: true,
    flickerIntensity: 0.08,
    flickerSpeed: 0.8,
    enableVignette: true,
    vignetteIntensity: 0.45,
    enableGlitch: false,
    enableCurvature: true,
    curvatureIntensity: 0.7,
    enableGlare: true,
    glareIntensity: 0.3,
  },

  /**
   * VT100 - Classic DEC terminal
   */
  vt100: {
    theme: "custom",
    scanlineColor: "rgba(220, 255, 235, 0.2)",
    tintText: true,
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
    enableGlitch: false,
    enableCurvature: true,
    curvatureIntensity: 0.45,
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
    enableGlitch: false,
  },
};
