import ReactDOM from "react-dom/client";
import CRTEffect from "../../src/react";
import type { PresetName } from "../../src/core";
import "../../src/style.css";
import "./demo.css";

const PRESETS: PresetName[] = [
  "fallout",
  "dos",
  "cyberpunk",
  "arcade",
  "commodore64",
  "apple2",
  "vt100",
  "minimal",
];

function App() {
  return (
    <div className="page">
      <h1>vault66-crt-effect · React</h1>

      <h2>fill</h2>
      <div className="row">
        {[false, true].map((fill) => (
          <div className="frame" key={String(fill)}>
            <p className="label">
              {fill ? "fill" : "default (sizes to content)"}
            </p>
            <CRTEffect preset="fallout" fill={fill}>
              <div className={fill ? "content contentFill" : "content"}>
                {fill ? "fills the parent" : "sizes to content"}
              </div>
            </CRTEffect>
          </div>
        ))}
      </div>

      <h2>presets</h2>
      <div className="grid">
        {PRESETS.map((preset) => (
          <CRTEffect key={preset} preset={preset}>
            <div className="preset">
              <strong>{preset}</strong>
            </div>
          </CRTEffect>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
