import type React from "react";
import { computeCrt, type CRTOptions } from "../core";

export interface CRTEffectProps extends CRTOptions {
  /** Content to render inside the CRT effect. */
  children: React.ReactNode;
}

/**
 * React wrapper around the CRT core. All the effect logic lives in
 * `computeCrt`; this component just renders what it returns.
 */
const CRTEffect = ({ children, ...options }: CRTEffectProps) => {
  const { enabled, wrapper, inner, overlays } = computeCrt(options);

  // Master toggle off: render content untouched.
  if (!enabled) return <>{children}</>;

  return (
    <div className={wrapper.className} style={wrapper.style as React.CSSProperties}>
      <div
        className={inner.className}
        style={inner.style as React.CSSProperties | undefined}
      >
        {children}
      </div>
      {overlays.map((overlay) => (
        <div key={overlay} className={overlay} />
      ))}
    </div>
  );
};

export default CRTEffect;
