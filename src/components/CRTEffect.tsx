import React from "react";
import { presets } from "../presets";
import type { PresetName } from "../presets";

//! CRT EFFECT COMPONENT PROPS
interface CRTEffectProps {
  //* Preset configuration
  preset?: PresetName; // Apply a predefined preset (can be overridden by individual props)
  //* Master toggle
  enabled?: boolean; // Master toggle for all effects
  //* Sweep line configuration
  sweepDuration?: number; // Speed of the sweep line animation in seconds
  sweepThickness?: number; // Height (thickness) of the sweep line in px
  sweepStyle?: "classic" | "soft"; // Style of the sweep line
  //* Scanlines configuration
  scanlineOpacity?: number; // Opacity of the scanlines (0 to 1)
  scanlineColor?: string; // Custom RGBA or RGB color string (used if theme = 'custom')
  scanlineThickness?: number; // Thickness of each scanline in pixels
  scanlineGap?: number; // Gap between scanlines in pixels
  scanlineOrientation?: "horizontal" | "vertical"; // Orientation of scanlines
  //* Effect toggles
  enableScanlines?: boolean; // Show or hide scanlines overlay
  enableSweep?: boolean; // Show or hide sweep line animation
  enableGlow?: boolean; // Enable outer glow effect around the container
  enableEdgeGlow?: boolean; // Enable inner edge glow effect around the container
  enableFlicker?: boolean; // Enable flicker effect on the CRT
  enableVignette?: boolean; // Enable vignette overlay
  enableGlitch?: boolean; // Enable glitch effect on the CRT
  enableCurvature?: boolean; // Enable curved-glass overlay (corner highlight + darkened rounded edges)
  enableGlare?: boolean; // Enable diagonal glass-reflection sheen across the screen
  enableNoise?: boolean; // Enable animated RF static/snow overlay
  glitchChromatic?: boolean; // Add red/cyan chromatic aberration to the glitch (requires enableGlitch)
  //* Color and theming
  theme?: "green" | "amber" | "blue" | "custom"; // Color theme for scanlines
  glowColor?: string; // Outer glow color if enabled (CSS color string)
  edgeGlowColor?: string; // Inner edge glow color if enabled (CSS color string)
  edgeGlowSize?: number; // Size of the inner edge glow in pixels
  //* Animation intensity and speed
  flickerIntensity?: "low" | "medium" | "high" | number; // Flicker depth: string for preset speed, or number (0-1) for opacity variance
  flickerSpeed?: "low" | "medium" | "high" | number; // Flicker animation speed: preset string or number in seconds
  glitchIntensity?: "low" | "medium" | "high" | number; // Glitch distance: string for preset speed, or number (0-1) for shake amount
  glitchSpeed?: "low" | "medium" | "high" | number; // Glitch animation speed: preset string or number in seconds
  vignetteIntensity?: number; // 0 to 1, darkness at edges
  curvatureIntensity?: number; // 0 to 1, strength of the curved-glass edge darkening
  glareIntensity?: number; // 0 to 1, brightness of the glass-reflection sheen
  noiseOpacity?: number; // 0 to 1, opacity of the static/snow overlay
  //* Layout
  fill?: boolean; // Stretch the wrapper to fill its parent's width & height (for full-screen / full-bleed layouts)
  //* Content
  children: React.ReactNode; // Content to render inside CRT effect
}

//! MAIN CRT EFFECT COMPONENT
const CRTEffect = (props: CRTEffectProps) => {
  const { preset, children, ...userProps } = props;

  const presetConfig = preset ? presets[preset] : {};

  // Merge: defaults < preset values < user-provided props
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
    fill: false,
  };

  const config = { ...defaults, ...presetConfig, ...userProps };

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
    fill,
  } = config;
  if (!enabled) {
    return <>{children}</>;
  }

  //! COLOR PROCESSING UTILITIES

  //* Helper function to extract RGB components only (exclude alpha)
  const extractRGB = (color: string): string => {
    const match = color.match(/rgba?\(\s*([\d\s.,]+)\)/);
    if (!match) return "91, 179, 135"; // fallback RGB
    const parts = match[1].split(",").map((p) => p.trim());
    return parts.slice(0, 3).join(", ");
  };

  //* Map predefined themes to RGB strings (no alpha)
  const scanlineColorRGBMap: Record<string, string> = {
    green: "91, 179, 135", // Classic CRT green
    amber: "255, 200, 100", // Vintage amber monitor
    blue: "100, 200, 255", // Retro blue terminal
  };

  //* Determine RGB color string for scanlines (no alpha)
  const resolvedScanlineColorRGB =
    theme !== "custom"
      ? (scanlineColorRGBMap[theme] ?? scanlineColorRGBMap.green)
      : extractRGB(scanlineColor);

  //! CSS CLASS NAME COMPOSITION

  //* Compose class names based on enabled effects
  const classNames = [
    "crt-effect-wrapper", // Base wrapper class
    enableScanlines && "scanlines-on", // Add scanlines if enabled
    enableSweep && (sweepStyle === "classic" ? "sweep-on" : "sweep-soft"), // Add sweep style
    enableEdgeGlow && "edge-glow-on", // Add edge glow if enabled
    enableFlicker && "flicker-on", // Add flicker if enabled
  ]
    .filter(Boolean) // Remove falsy values
    .join(" ");

  //! ANIMATION SPEED AND INTENSITY PROCESSING

  //* Resolve a "low"/"medium"/"high" preset to a value, or pass through a custom number
  const resolveIntensity = (
    value: "low" | "medium" | "high" | number,
    levels: Record<"low" | "medium" | "high", number>,
  ): number => (typeof value === "number" ? value : levels[value]);

  //* Same as above, but speeds are returned as a CSS seconds string
  const resolveSpeed = (
    value: "low" | "medium" | "high" | number,
    levels: Record<"low" | "medium" | "high", string>,
  ): string => (typeof value === "number" ? `${value}s` : levels[value]);

  const processedFlickerIntensity = resolveIntensity(flickerIntensity, {
    low: 0.05,
    medium: 0.08,
    high: 0.12,
  });

  const processedFlickerSpeed = resolveSpeed(flickerSpeed, {
    low: "1.5s",
    medium: "0.8s",
    high: "0.4s",
  });

  const processedGlitchIntensity = resolveIntensity(glitchIntensity, {
    low: 0.3,
    medium: 0.6,
    high: 0.9,
  });

  const processedGlitchSpeed = resolveSpeed(glitchSpeed, {
    low: "1s",
    medium: "0.6s",
    high: "0.3s",
  });

  //! MAIN COMPONENT RENDER

  return (
    <div
      className={classNames}
      style={
        {
          position: "relative", // Enable positioning for pseudo-elements
          overflow: "hidden", // Clip sweep and scanlines to container
          // When `fill` is set, stretch to the parent instead of sizing to content.
          // The inner .crt-inner is already 100%/100%, so flex-column lets content fill the height too.
          ...(fill
            ? {
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column" as const,
              }
            : {}),
          // CSS custom properties for dynamic styling
          ["--sweep-duration"]: `${sweepDuration}s`,
          ["--sweep-thickness"]: `${sweepThickness}px`,
          ["--scanline-opacity"]: scanlineOpacity,
          ["--scanline-color-rgb"]: resolvedScanlineColorRGB,
          ["--scanline-thickness"]: `${scanlineThickness}px`,
          ["--scanline-gap"]: `${scanlineGap}px`,
          ["--glow-color"]: glowColor,
          ["--edge-glow-color"]: edgeGlowColor,
          ["--edge-glow-size"]: `${edgeGlowSize}px`,
          // Convert orientation to CSS gradient direction
          ["--scanline-gradient-direction"]:
            scanlineOrientation === "horizontal" ? "to bottom" : "to right",
          ["--glitch-speed"]: processedGlitchSpeed,
          ["--glitch-intensity"]: processedGlitchIntensity,
          ["--flicker-speed"]: processedFlickerSpeed,
          ["--flicker-intensity"]: processedFlickerIntensity,
          ["--vignette-intensity"]: vignetteIntensity,
          ["--curvature-intensity"]: curvatureIntensity,
          ["--glare-intensity"]: glareIntensity,
          ["--noise-opacity"]: noiseOpacity,
          // Outer glow using filter (not clipped by overflow)
          filter: enableGlow
            ? `drop-shadow(0 0 6px var(--glow-color)) drop-shadow(0 0 12px var(--glow-color)) drop-shadow(0 0 20px var(--glow-color))`
            : undefined,
        } as React.CSSProperties
      }
    >
      {/* Inner container for content - glitch effect applies here */}
      <div
        className={[
          "crt-inner",
          enableGlitch ? "glitch-on" : "",
          enableGlitch && glitchChromatic ? "chromatic-on" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        // When `fill` is set, make the content layer a flex column so children
        // that use `flex: 1` or `height: 100%` actually stretch to fill the frame.
        style={
          fill
            ? ({ display: "flex", flexDirection: "column" } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </div>
      {/* Curved-glass overlay - only rendered if enabled */}
      {enableCurvature && <div className="crt-curvature" />}
      {/* Noise/static overlay - only rendered if enabled */}
      {enableNoise && <div className="crt-noise" />}
      {/* Glare/reflection overlay - only rendered if enabled */}
      {enableGlare && <div className="crt-glare" />}
      {/* Edge glow overlay - only rendered if enabled */}
      {enableEdgeGlow && <div className="crt-edge-glow" />}
      {/* Vignette overlay - only rendered if enabled */}
      {enableVignette && <div className="crt-vignette" />}
    </div>
  );
};

export default CRTEffect;
