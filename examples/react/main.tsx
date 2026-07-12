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

      <h2>phosphor tint + colored sweep</h2>
      <div className="row">
        {/* off: content keeps its own colors, dark refresh bar */}
        <div className="frame tall">
          <p className="label">tintText off (default overlay)</p>
          <CRTEffect theme="green" enableSweep sweepThickness={6} fill>
            <Terminal />
          </CRTEffect>
        </div>

        {/* on: text goes phosphor-green, sweep glows green */}
        <div className="frame tall">
          <p className="label">tintText + sweepColor (green)</p>
          <CRTEffect
            theme="green"
            tintText
            sweepColor="rgba(91, 179, 135, 0.6)"
            enableSweep
            sweepThickness={2}
            enableFlicker
            fill
          >
            <Terminal />
          </CRTEffect>
        </div>
      </div>

      <div className="row">
        <div className="frame tall">
          <p className="label">theme="amber" + tintText</p>
          <CRTEffect
            theme="amber"
            tintText
            sweepColor="rgba(255, 200, 100, 0.6)"
            enableSweep
            sweepThickness={2}
            fill
          >
            <Terminal />
          </CRTEffect>
        </div>

        <div className="frame tall">
          <p className="label">theme="blue" + tintText</p>
          <CRTEffect
            theme="blue"
            tintText
            sweepColor="rgba(100, 200, 255, 0.6)"
            enableSweep
            sweepThickness={2}
            fill
          >
            <Terminal />
          </CRTEffect>
        </div>

        <div className="frame tall">
          <p className="label">custom textColor + sweepColor</p>
          <CRTEffect
            theme="custom"
            tintText
            textColor="#ff5edb"
            sweepColor="rgba(255, 0, 200, 0.6)"
            scanlineColor="rgba(255, 0, 200, 0.3)"
            enableSweep
            sweepThickness={2}
            fill
          >
            <Terminal />
          </CRTEffect>
        </div>
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

// A text-heavy block with NO explicit color, so `tintText` can recolor it.
function Terminal() {
  return (
    <div className="terminal">
      <div>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</div>
      <div>ENTER PASSWORD NOW</div>
      <div>&nbsp;</div>
      <div>&gt; 7ATTEMPT(S) LEFT: ■ ■ ■</div>
      <div>&gt; ACCESSING MAINFRAME...</div>
      <div>&gt; DECRYPTING NODE 0x1A4F</div>
      <div>&gt; _</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
