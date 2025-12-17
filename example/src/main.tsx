import ReactDOM from "react-dom/client";
import CRTEffect from "../../src/components/CRTEffect";
import "../../src/vault66-crt-effect.css";

function App() {
  return (
    <div style={{ padding: "40px", backgroundColor: "#2a2a2a" }}>
      <h1 style={{ color: "#fff", textAlign: "center", marginBottom: "40px" }}>
        CRT Presets Test
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
        {/* FALLOUT */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="fallout"
          </h3>
          <CRTEffect preset="fallout">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>FALLOUT PRESET</p>
              <p>Green terminal theme with medium effects</p>
            </div>
          </CRTEffect>
        </div>

        {/* DOS */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>preset="dos"</h3>
          <CRTEffect preset="dos">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>DOS PRESET</p>
              <p>Orange Hercules monitor theme with soft sweep</p>
            </div>
          </CRTEffect>
        </div>

        {/* CYBERPUNK */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="cyberpunk"
          </h3>
          <CRTEffect preset="cyberpunk" edgeGlowSize={0.2} enableGlow={false}>
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>CYBERPUNK PRESET</p>
              <p>Purple/magenta neon with heavy glow and glitch</p>
            </div>
          </CRTEffect>
        </div>

        {/* ARCADE */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="arcade"
          </h3>
          <CRTEffect preset="arcade">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>ARCADE PRESET</p>
              <p>Bright green with thick scanlines and fast sweep</p>
            </div>
          </CRTEffect>
        </div>

        {/* COMMODORE 64 */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="commodore64"
          </h3>
          <CRTEffect preset="commodore64">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>COMMODORE 64 PRESET</p>
              <p>Blue 8-bit computer aesthetic with chunky scanlines</p>
            </div>
          </CRTEffect>
        </div>

        {/* APPLE II */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="apple2"
          </h3>
          <CRTEffect preset="apple2">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>APPLE II PRESET</p>
              <p>Green vintage computer with tight scanlines</p>
            </div>
          </CRTEffect>
        </div>

        {/* VT100 */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="vt100"
          </h3>
          <CRTEffect preset="vt100">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>VT100 PRESET</p>
              <p>Pale greenish-white DEC terminal with minimal effects</p>
            </div>
          </CRTEffect>
        </div>

        {/* MINIMAL */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            preset="minimal"
          </h3>
          <CRTEffect preset="minimal">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>MINIMAL PRESET</p>
              <p>Barely-there effect for modern UIs</p>
            </div>
          </CRTEffect>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
