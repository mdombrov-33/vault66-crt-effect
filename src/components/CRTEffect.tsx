import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  sweepDuration?: number; // Speed
  sweepThickness?: number; // How tall the sweep line is
  scanlineOpacity?: number; // Opacity of horizontal scanlines
  scanlineColor?: string; // Color of the scanlines
  enableScanlines?: boolean; // Whether to show scanlines
  enableSweep?: boolean; // Whether to show the sweep effect
  theme?: "green" | "amber" | "blue" | "custom";
  children: React.ReactNode;
}

const CRTEffect = ({
  enabled = true,
  sweepDuration = 10,
  sweepThickness = 10,
  scanlineOpacity = 0.2,
  scanlineColor = "rgba(91, 179, 135, 0.2)",
  enableScanlines = true,
  enableSweep = true,
  theme = "green",
  children,
}: CRTEffectProps) => {
  if (!enabled) {
    return <>{children}</>;
  }

  const classNames = [
    "crt-effect-wrapper",
    enableScanlines && "scanlines-on",
    enableSweep && "sweep-on",
  ]
    .filter(Boolean)
    .join(" ");

  let resolvedScanlineColor = scanlineColor;

  if (theme !== "custom") {
    switch (theme) {
      case "amber":
        resolvedScanlineColor = "rgba(255, 200, 100, 0.3)";
        break;
      case "blue":
        resolvedScanlineColor = "rgba(100, 200, 255, 0.3)";
        break;
      case "green":
      default:
        resolvedScanlineColor = "rgba(91, 179, 135, 0.3)";
        break;
    }
  }

  return (
    <div
      className={classNames}
      style={
        {
          position: "relative",
          ["--sweep-duration"]: `${sweepDuration}s`,
          ["--sweep-thickness"]: `${sweepThickness}px`,
          ["--scanline-opacity"]: scanlineOpacity,
          ["--scanline-color"]: resolvedScanlineColor,
        } as React.CSSProperties
      }
    >
      {children}
      {/* CRT VISUALS HERE */}
    </div>
  );
};

export default CRTEffect;
