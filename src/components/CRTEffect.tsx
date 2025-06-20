import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  sweepDuration?: number; // Speed
  sweepThickness?: number; // How tall the sweep line is
  scanlineOpacity?: number; // Opacity of horizontal scanlines
  enableScanlines?: boolean; // Whether to show scanlines
  enableSweep?: boolean; // Whether to show the sweep effect
  children: React.ReactNode;
}

const CRTEffect = ({
  enabled = true,
  sweepDuration = 10,
  sweepThickness = 10,
  scanlineOpacity = 0.2,
  enableScanlines = true,
  enableSweep = true,
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

  return (
    <div
      className={classNames}
      style={
        {
          position: "relative",
          ["--sweep-duration"]: `${sweepDuration}s`,
          ["--sweep-thickness"]: `${sweepThickness}px`,
          ["--scanline-opacity"]: scanlineOpacity,
        } as React.CSSProperties
      }
    >
      {children}
      {/* CRT VISUALS HERE */}
    </div>
  );
};

export default CRTEffect;
