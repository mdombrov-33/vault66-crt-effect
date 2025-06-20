import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  sweepDuration?: number; // Duration of the CRT sweep effect
  sweepThickness?: number; // How tall the sweep line is
  children: React.ReactNode;
}

const CRTEffect = ({
  enabled = true,
  sweepDuration = 7,
  sweepThickness = 80,
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
        } as React.CSSProperties
      }
    >
      {children}
      {/* CRT VISUALS HERE */}
    </div>
  );
};

export default CRTEffect;
