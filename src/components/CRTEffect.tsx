import React from "react";

//! CRT EFFECT COMPONENT PROPS
interface CRTEffectProps {
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
  glitchMode?: boolean; // Enable glitch effect on the CRT
  //* Color and theming
  theme?: "green" | "amber" | "blue" | "custom"; // Color theme for scanlines
  glowColor?: string; // Outer glow color if enabled (CSS color string)
  edgeGlowColor?: string; // Inner edge glow color if enabled (CSS color string)
  edgeGlowSize?: number; // Size of the inner edge glow in pixels
  //* Animation intensity
  flickerIntensity?: "low" | "medium" | "high"; // Intensity of the flicker effect
  glitchIntensity?: "low" | "medium" | "high"; // Intensity of the glitch effect
  vignetteIntensity?: number; // 0 to 1, darkness at edges
  //* Content
  children: React.ReactNode; // Content to render inside CRT effect
}

//! MAIN CRT EFFECT COMPONENT
const CRTEffect = ({
  // Default values for all props
  enabled = true,
  sweepDuration = 10,
  sweepThickness = 10,
  sweepStyle = "classic",
  scanlineOpacity = 0.2,
  scanlineColor = "rgba(91, 179, 135, 0.2)", // fallback if custom
  scanlineThickness = 2,
  scanlineGap = 3,
  enableScanlines = true,
  enableSweep = true,
  theme = "green",
  enableGlow = false,
  glowColor = "rgba(0, 255, 128, 0.3)",
  enableEdgeGlow = false,
  edgeGlowColor = "rgba(0, 255, 128, 0.2)",
  edgeGlowSize = 30,
  enableFlicker = false,
  scanlineOrientation = "horizontal",
  glitchIntensity = "medium",
  flickerIntensity = "medium",
  glitchMode = false,
  enableVignette = false,
  vignetteIntensity = 0.4,
  children,
}: CRTEffectProps) => {
  // Early return if effects are disabled - just render children
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
      ? scanlineColorRGBMap[theme] ?? scanlineColorRGBMap.green
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

  //! ANIMATION SPEED MAPPINGS

  //* Map intensity levels to CSS animation durations
  const glitchSpeedMap = {
    low: "1s", // Slow, subtle glitching
    medium: "0.6s", // Standard glitch speed
    high: "0.3s", // Fast, intense glitching
  };

  const flickerSpeedMap = {
    low: "1.5s", // Slow, gentle flicker
    medium: "0.8s", // Standard flicker speed
    high: "0.4s", // Fast, intense flicker
  };

  //! MAIN COMPONENT RENDER

  return (
    <div
      className={classNames}
      style={
        {
          position: "relative", // Enable positioning for pseudo-elements
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
          ["--glitch-speed"]: glitchSpeedMap[glitchIntensity ?? "medium"],
          ["--flicker-speed"]: flickerSpeedMap[flickerIntensity ?? "medium"],
          ["--vignette-intensity"]: vignetteIntensity,
        } as React.CSSProperties
      }
    >
      {/* Inner container for content - glitch effect applies here */}
      <div
        className={["crt-inner", glitchMode ? "glitch-on" : ""].join(" ")}
        style={{
          // Outer glow effect applied as box-shadow
          boxShadow: enableGlow
            ? `0 0 6px var(--glow-color), 0 0 12px var(--glow-color), 0 0 20px var(--glow-color)`
            : undefined,
        }}
      >
        {children}
      </div>
      {/* Vignette overlay - only rendered if enabled */}
      {enableVignette && <div className="crt-vignette" />}
    </div>
  );
};

export default CRTEffect;
