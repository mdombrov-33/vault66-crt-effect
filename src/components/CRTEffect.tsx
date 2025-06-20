import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  sweepDuration?: number; // Speed of the sweep line animation in seconds
  sweepThickness?: number; // Height (thickness) of the sweep line in px
  scanlineOpacity?: number; // Opacity of the scanlines (0 to 1)
  scanlineColor?: string; // Custom RGBA or RGB color string (used if theme = 'custom')
  enableScanlines?: boolean; // Show or hide scanlines overlay
  enableSweep?: boolean; // Show or hide sweep line animation
  theme?: "green" | "amber" | "blue" | "custom"; // Color theme for scanlines
  enableGlow?: boolean; // Enable glow effect around the container
  glowColor?: string; // Glow color if enabled (CSS color string)
  enableEdgeGlow?: boolean;
  edgeGlowColor?: string;
  edgeGlowSize?: number;
  children: React.ReactNode;
}

const CRTEffect = ({
  enabled = true,
  sweepDuration = 10,
  sweepThickness = 10,
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
    enableSweep && "sweep-on",
    enableEdgeGlow && "edge-glow-on",
  ]
    .filter(Boolean)
    .join(" ");

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
        } as React.CSSProperties
      }
    >
      <div
        className="crt-inner"
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
