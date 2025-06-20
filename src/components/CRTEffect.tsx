import React from "react";

interface CRTEffectProps {
  enabled?: boolean;
  children: React.ReactNode;
}

const CRTEffect: React.FC<CRTEffectProps> = ({ enabled = true, children }) => {
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
