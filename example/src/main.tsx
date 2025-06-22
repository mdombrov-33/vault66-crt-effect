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
      scanlineOpacity={0.7}
      theme="blue"
      enableScanlines={true}
      enableSweep={true}
      enableGlow={true}
      glowColor="rgba(173, 77, 45, 0.299)" // Custom glow color
      sweepStyle="soft"
    >
      <div style={{ padding: "20px", fontSize: "24px" }}>
        Hello CRT Effect from example app!
      </div>
    </CRTEffect>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
