import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  children: React.ReactNode;
}

const CRTEffect = ({ enabled = true, children }: CRTEffectProps) => {
  if (!enabled) {
    return <>{children}</>;
  }
  return (
    <div className="crt-effect-wrapper" style={{ position: "relative" }}>
      {children}
      {/* CRT VISUALS HERE */}
    </div>
  );
};

export default CRTEffect;
