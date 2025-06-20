import React from "react";
import ReactDOM from "react-dom/client";
import { CRTEffect } from "../../dist/crt-effect.es.js";
import "./styles/crt.css";

function App() {
  return (
    <CRTEffect
      enabled={true}
      sweepDuration={10}
      sweepThickness={10}
      scanlineOpacity={0.3}
      theme="blue"
      enableScanlines={false}
      enableSweep={false}
      enableGlow={true}
      glowColor="rgba(0, 132, 255, 0.625)"
      enableEdgeGlow={true}
      edgeGlowColor="rgba(30, 128, 92, 0.908)"
      enableFlicker={true}
      edgeGlowSize={100}
    >
      <div
        style={{
          padding: "20px",
          fontSize: "24px",
          height: "100vh",
          backgroundColor: "black",
        }}
      >
        Hello CRT Effect from example app!
      </div>
    </CRTEffect>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
