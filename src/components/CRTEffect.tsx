import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  sweepDuration?: number; // Speed of the sweep line animation in seconds
  sweepThickness?: number; // Height (thickness) of the sweep line in px
  sweepStyle?: "classic" | "soft"; // Style of the sweep line
  scanlineOpacity?: number; // Opacity of the scanlines (0 to 1)
  scanlineColor?: string; // Custom RGBA or RGB color string (used if theme = 'custom')
  enableScanlines?: boolean; // Show or hide scanlines overlay
  enableSweep?: boolean; // Show or hide sweep line animation
  theme?: "green" | "amber" | "blue" | "custom"; // Color theme for scanlines
  enableGlow?: boolean; // Enable glow effect around the container
  glowColor?: string; // Glow color if enabled (CSS color string)
  enableEdgeGlow?: boolean; // Enable edge glow effect around the container
  edgeGlowColor?: string; // Edge glow color if enabled (CSS color string)
  edgeGlowSize?: number; // Size of the edge glow in pixels
  enableFlicker?: boolean; // Enable flicker effect on the CRT
  flickerIntensity?: "low" | "medium" | "high"; // Intensity of the flicker effect
  scanlineOrientation?: "horizontal" | "vertical"; // Orientation of scanlines
  glitchMode?: boolean; // Enable glitch effect on the CRT
  glitchIntensity?: "low" | "medium" | "high"; // Intensity of the glitch effect
  children: React.ReactNode;
}

const CRTEffect = ({
  enabled = true,
  sweepDuration = 10,
  sweepThickness = 10,
  sweepStyle = "classic",
  scanlineOpacity = 0.2,
  scanlineColor = "rgba(91, 179, 135, 0.2)", // fallback if custom
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
  children,
}: CRTEffectProps) => {
  if (!enabled) {
    return <>{children}</>;
  }

  // Helper function to extract RGB components only (exclude alpha)
  const extractRGB = (color: string): string => {
    const match = color.match(/rgba?\(\s*([\d\s.,]+)\)/);
    if (!match) return "91, 179, 135"; // fallback RGB
    const parts = match[1].split(",").map((p) => p.trim());
    return parts.slice(0, 3).join(", ");
  };

  // Map predefined themes to RGB strings (no alpha)
  const scanlineColorRGBMap: Record<string, string> = {
    green: "91, 179, 135",
    amber: "255, 200, 100",
    blue: "100, 200, 255",
  };

  // Determine RGB color string for scanlines (no alpha)
  const resolvedScanlineColorRGB =
    theme !== "custom"
      ? scanlineColorRGBMap[theme] ?? scanlineColorRGBMap.green
      : extractRGB(scanlineColor);

  // Compose class names based on enabled effects
  const classNames = [
    "crt-effect-wrapper",
    enableScanlines && "scanlines-on",
    enableSweep && (sweepStyle === "classic" ? "sweep-on" : "sweep-soft"),
    enableEdgeGlow && "edge-glow-on",
    enableFlicker && "flicker-on",
  ]
    .filter(Boolean)
    .join(" ");

  const glitchSpeedMap = {
    low: "1s",
    medium: "0.6s",
    high: "0.3s",
  };

  const flickerSpeedMap = {
    low: "1.5s",
    medium: "0.8s",
    high: "0.4s",
  };

  return (
    <div
      className={classNames}
      style={
        {
          position: "relative",
          ["--sweep-duration"]: `${sweepDuration}s`,
          ["--sweep-thickness"]: `${sweepThickness}px`,
          ["--scanline-opacity"]: scanlineOpacity,
          ["--scanline-color-rgb"]: resolvedScanlineColorRGB,
          ["--glow-color"]: glowColor,
          ["--edge-glow-color"]: edgeGlowColor,
          ["--edge-glow-size"]: `${edgeGlowSize}px`,
          ["--scanline-gradient-direction"]:
            scanlineOrientation === "horizontal" ? "to bottom" : "to right",
          ["--glitch-speed"]: glitchSpeedMap[glitchIntensity ?? "medium"],
          ["--flicker-speed"]: flickerSpeedMap[flickerIntensity ?? "medium"],
        } as React.CSSProperties
      }
    >
      <div
        className={["crt-inner", glitchMode ? "glitch-on" : ""].join(" ")}
        style={{
          boxShadow: enableGlow
            ? `0 0 6px var(--glow-color), 0 0 12px var(--glow-color), 0 0 20px var(--glow-color)`
            : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CRTEffect;
