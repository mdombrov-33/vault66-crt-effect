import { presets } from "./presets";
import type { CRTOptions } from "./options";

/**
 * A style bag keyed by CSS property (camelCase) or CSS custom property (`--x`).
 * Every wrapper consumes this: React casts it to CSSProperties, Vue passes it
 * to `h(..., { style })`, and the Web Component serializes it to a style string.
 */
export type CRTStyle = Record<string, string | number>;

/** Overlay layers rendered as sibling divs after the content. */
export type OverlayClass =
  | "crt-curvature"
  | "crt-noise"
  | "crt-glare"
  | "crt-edge-glow"
  | "crt-vignette";

export interface CRTComputed {
  /** When false, wrappers should render the raw content with no effect at all. */
  enabled: boolean;
  wrapper: { className: string; style: CRTStyle };
  inner: { className: string; style?: CRTStyle };
  overlays: OverlayClass[];
}

const defaults = {
  enabled: true,
  sweepDuration: 10,
  sweepThickness: 10,
  sweepStyle: "classic" as const,
  scanlineOpacity: 0.2,
  scanlineColor: "rgba(91, 179, 135, 0.2)",
  scanlineThickness: 2,
  scanlineGap: 3,
  enableScanlines: true,
  enableSweep: true,
  theme: "green" as const,
  enableGlow: false,
  glowColor: "rgba(0, 255, 128, 0.3)",
  enableEdgeGlow: false,
  edgeGlowColor: "rgba(0, 255, 128, 0.2)",
  edgeGlowSize: 30,
  enableFlicker: false,
  scanlineOrientation: "horizontal" as const,
  glitchIntensity: 1.0,
  glitchSpeed: 0.6,
  flickerIntensity: 0.08,
  flickerSpeed: 0.8,
  enableGlitch: false,
  enableVignette: false,
  vignetteIntensity: 0.4,
  enableCurvature: false,
  curvatureIntensity: 0.5,
  enableGlare: false,
  glareIntensity: 0.18,
  enableNoise: false,
  noiseOpacity: 0.15,
  glitchChromatic: false,
  tintText: false,
  textColor: undefined as string | undefined,
  sweepColor: undefined as string | undefined,
  fill: false,
};

//* Drop keys whose value is `undefined` so absent Vue/Web-Component props don't
//* override preset or default values during the merge below.
function defined<T extends object>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const key in obj) {
    const value = (obj as Record<string, unknown>)[key];
    if (value !== undefined) out[key] = value;
  }
  return out as Partial<T>;
}

//* Extract RGB channels from hex or rgb/rgba colors. Alpha is intentionally
//* dropped because scanlineOpacity controls the overlay's final opacity.
function extractRGB(color: string): string {
  const value = color.trim();
  const hexMatch = value.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);

  if (hexMatch) {
    const hex = hexMatch[1];
    const rgbHex = hex.length <= 4
      ? hex.slice(0, 3).split("").map((channel) => channel + channel)
      : [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];
    return rgbHex.map((channel) => Number.parseInt(channel, 16)).join(", ");
  }

  const rgbMatch = value.match(/^rgba?\((.*)\)$/i);
  if (rgbMatch) {
    const channels = rgbMatch[1]
      .split("/")[0]
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .slice(0, 3);
    if (channels.length === 3 && channels.every((channel) => /^\d*\.?\d+%?$/.test(channel))) {
      return channels.join(", ");
    }
  }

  return "91, 179, 135";
}

const scanlineColorRGBMap: Record<string, string> = {
  green: "91, 179, 135", // Classic CRT green
  amber: "255, 200, 100", // Vintage amber monitor
  blue: "100, 200, 255", // Retro blue terminal
};

//* Resolve a "low"/"medium"/"high" preset to a value, or pass through a number.
function resolveIntensity(
  value: "low" | "medium" | "high" | number,
  levels: Record<"low" | "medium" | "high", number>,
): number {
  return typeof value === "number" ? value : levels[value];
}

//* Same, but speeds are returned as a CSS seconds string.
function resolveSpeed(
  value: "low" | "medium" | "high" | number,
  levels: Record<"low" | "medium" | "high", string>,
): string {
  return typeof value === "number" ? `${value}s` : levels[value];
}

/**
 * Turn a set of CRT options into the class names, inline styles, and overlay
 * list that every framework wrapper renders. This is the single source of
 * truth for how the effect maps onto markup.
 */
export function computeCrt(options: CRTOptions = {}): CRTComputed {
  const { preset, ...rest } = options;
  const presetConfig = preset ? presets[preset] : {};

  // Merge: defaults < preset values < user-provided options.
  const config = { ...defaults, ...defined(presetConfig), ...defined(rest) };

  const {
    enabled,
    sweepDuration,
    sweepThickness,
    sweepStyle,
    scanlineOpacity,
    scanlineColor,
    scanlineThickness,
    scanlineGap,
    enableScanlines,
    enableSweep,
    theme,
    enableGlow,
    glowColor,
    enableEdgeGlow,
    edgeGlowColor,
    edgeGlowSize,
    enableFlicker,
    scanlineOrientation,
    glitchIntensity,
    glitchSpeed,
    flickerIntensity,
    flickerSpeed,
    enableGlitch,
    enableVignette,
    vignetteIntensity,
    enableCurvature,
    curvatureIntensity,
    enableGlare,
    glareIntensity,
    enableNoise,
    noiseOpacity,
    glitchChromatic,
    tintText,
    textColor,
    sweepColor,
    fill,
  } = config;

  const scanlineColorRGB =
    theme !== "custom"
      ? (scanlineColorRGBMap[theme] ?? scanlineColorRGBMap.green)
      : extractRGB(scanlineColor);

  // Phosphor tint for the content: explicit override, else the theme color.
  const resolvedTextColor = textColor ?? `rgb(${scanlineColorRGB})`;

  const flickerIntensityValue = resolveIntensity(flickerIntensity, {
    low: 0.05,
    medium: 0.08,
    high: 0.12,
  });
  const flickerSpeedValue = resolveSpeed(flickerSpeed, {
    low: "1.5s",
    medium: "0.8s",
    high: "0.4s",
  });
  const glitchIntensityValue = resolveIntensity(glitchIntensity, {
    low: 0.3,
    medium: 0.6,
    high: 0.9,
  });
  const glitchSpeedValue = resolveSpeed(glitchSpeed, {
    low: "1s",
    medium: "0.6s",
    high: "0.3s",
  });

  const wrapperClassName = [
    "crt-effect-wrapper",
    enableScanlines && "scanlines-on",
    enableSweep && (sweepStyle === "classic" ? "sweep-on" : "sweep-soft"),
    enableSweep && sweepColor && "sweep-colored",
    enableEdgeGlow && "edge-glow-on",
    enableFlicker && "flicker-on",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapperStyle: CRTStyle = {
    position: "relative",
    overflow: "hidden",
    "--sweep-duration": `${sweepDuration}s`,
    "--sweep-thickness": `${sweepThickness}px`,
    "--scanline-opacity": scanlineOpacity,
    "--scanline-color-rgb": scanlineColorRGB,
    "--scanline-thickness": `${scanlineThickness}px`,
    "--scanline-gap": `${scanlineGap}px`,
    "--glow-color": glowColor,
    "--edge-glow-color": edgeGlowColor,
    "--edge-glow-size": `${edgeGlowSize}px`,
    "--scanline-gradient-direction":
      scanlineOrientation === "horizontal" ? "to bottom" : "to right",
    "--glitch-speed": glitchSpeedValue,
    "--glitch-intensity": glitchIntensityValue,
    "--flicker-speed": flickerSpeedValue,
    "--flicker-intensity": flickerIntensityValue,
    "--vignette-intensity": vignetteIntensity,
    "--curvature-intensity": curvatureIntensity,
    "--glare-intensity": glareIntensity,
    "--noise-opacity": noiseOpacity,
  };

  if (tintText) wrapperStyle["--crt-text-color"] = resolvedTextColor;
  if (sweepColor) wrapperStyle["--sweep-color"] = sweepColor;

  if (enableGlow) {
    // Outer glow via filter so it isn't clipped by the wrapper's overflow.
    wrapperStyle.filter =
      "drop-shadow(0 0 6px var(--glow-color)) drop-shadow(0 0 12px var(--glow-color)) drop-shadow(0 0 20px var(--glow-color))";
  }

  if (fill) {
    // Stretch to the parent, and lay content out as a flex column so children
    // using `flex: 1` or `height: 100%` fill the frame.
    wrapperStyle.width = "100%";
    wrapperStyle.height = "100%";
    wrapperStyle.display = "flex";
    wrapperStyle.flexDirection = "column";
  }

  const innerClassName = [
    "crt-inner",
    enableGlitch && "glitch-on",
    enableGlitch && glitchChromatic && "chromatic-on",
    tintText && "tint-text-on",
  ]
    .filter(Boolean)
    .join(" ");

  const overlays = (
    [
      enableCurvature && "crt-curvature",
      enableNoise && "crt-noise",
      enableGlare && "crt-glare",
      enableEdgeGlow && "crt-edge-glow",
      enableVignette && "crt-vignette",
    ] as const
  ).filter(Boolean) as OverlayClass[];

  return {
    enabled,
    wrapper: { className: wrapperClassName, style: wrapperStyle },
    inner: {
      className: innerClassName,
      style: fill ? { display: "flex", flexDirection: "column" } : undefined,
    },
    overlays,
  };
}
