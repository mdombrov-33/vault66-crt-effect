import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  sweepDuration?: number; // Speed
  sweepThickness?: number; // How tall the sweep line is
  scanlineOpacity?: number; // Opacity of horizontal scanlines
  children: React.ReactNode;
}

const CRTEffect = ({
  enabled = true,
  sweepDuration = 7,
  sweepThickness = 80,
  scanlineOpacity = 0.2,
  children,
}: CRTEffectProps) => {
  if (!enabled) {
    return <>{children}</>;
  }
  return (
    <div
      className="crt-effect-wrapper"
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
