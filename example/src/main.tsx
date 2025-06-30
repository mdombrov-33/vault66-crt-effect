import React from "react";
import ReactDOM from "react-dom/client";
import CRTEffect from "../../dist/crt-effect.es.js";
import "../../src/vault66-crt-effect.css";

function App() {
  return (
    <CRTEffect
      enabled={true}
      sweepDuration={10}
      sweepThickness={60}
      scanlineOpacity={0.3}
      theme="custom"
      enableScanlines={true}
      enableSweep={true}
      enableGlow={false}
      glitchIntensity="low"
      glowColor="rgba(172, 83, 145, 0.3)"
      scanlineOrientation="vertical"
      glitchMode={true}
      enableEdgeGlow={true}
      edgeGlowColor="rgba(4, 12, 9, 0.9)"
      scanlineColor="rgba(32, 34, 27, 0.637)"
      edgeGlowSize={50}
      enableFlicker={false}
      sweepStyle="soft"
    >
      <div style={{ padding: "20px", fontSize: "24px" }}>Hello CRT Effect!</div>
    </CRTEffect>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
