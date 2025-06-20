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
      scanlineOpacity={0.2}
      enableScanlines={true}
    >
      <div style={{ padding: "20px", fontSize: "24px" }}>
        Hello CRT Effect from example app!
      </div>
    </CRTEffect>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
