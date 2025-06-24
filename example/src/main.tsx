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
      enableGlow={true}
      glowColor="rgba(83, 148, 172, 0.3)"
      scanlineOrientation="vertical"
      enableEdgeGlow={true}
      edgeGlowColor="rgba(4, 12, 9, 0.9)"
      scanlineColor="rgba(114, 15, 206, 0.2)"
      edgeGlowSize={50}
      enableFlicker={true}
      sweepStyle="soft"
    >
      <div style={{ padding: "20px", fontSize: "24px" }}>Hello CRT Effect!</div>
    </CRTEffect>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
