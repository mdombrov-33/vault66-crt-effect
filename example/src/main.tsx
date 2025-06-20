import React from "react";
import ReactDOM from "react-dom/client";
import { CRTEffect } from "../../dist/crt-effect.es.js";

function App() {
  return (
    <CRTEffect enabled={true}>
      <div style={{ padding: "20px", fontSize: "24px" }}>
        Hello CRT Effect from example app!
      </div>
    </CRTEffect>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
