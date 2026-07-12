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
        {/* v2.2.0 NEW: fill prop */}
        <h2 style={{ color: "#5bb387", borderBottom: "1px solid #333" }}>
          v2.2.0 new — fill prop
        </h2>

        {/* FILL - default (content-sized) vs fill (stretches to parent) */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            fill — both live in a 300px-tall parent with a dashed border
          </h3>
          <div style={{ display: "flex", gap: "20px" }}>
            {/* WITHOUT fill: wrapper hugs the small content, leaving the parent empty */}
            <div
              style={{
                flex: 1,
                height: "300px",
                border: "1px dashed #555",
              }}
            >
              <p style={{ color: "#666", margin: "0 0 6px" }}>
                without fill (sizes to content)
              </p>
              <CRTEffect preset="fallout">
                <div
                  style={{
                    backgroundColor: "#0a1a0f",
                    padding: "20px",
                    color: "#5bb387",
                  }}
                >
                  short content — wrapper only covers this
                </div>
              </CRTEffect>
            </div>

            {/* WITH fill: wrapper stretches to fill the whole 300px parent */}
            <div
              style={{
                flex: 1,
                height: "300px",
                border: "1px dashed #555",
              }}
            >
              <p style={{ color: "#666", margin: "0 0 6px" }}>
                fill (stretches to parent)
              </p>
              <CRTEffect preset="fallout" fill>
                <div
                  style={{
                    backgroundColor: "#0a1a0f",
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#5bb387",
                  }}
                >
                  fills the entire parent
                </div>
              </CRTEffect>
            </div>
          </div>
        </div>

        {/* v2.1.0 NEW EFFECTS */}
        <h2 style={{ color: "#5bb387", borderBottom: "1px solid #333" }}>
          v2.1.0 new effects
        </h2>

        {/* CURVATURE - intensity comparison */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            enableCurvature — intensity 0 vs 0.5 vs 1
          </h3>
          <div style={{ display: "flex", gap: "20px" }}>
            {[0, 0.5, 1].map((v) => (
              <div key={v} style={{ flex: 1 }}>
                <p style={{ color: "#666", margin: "0 0 6px" }}>
                  curvatureIntensity={v}
                </p>
                <CRTEffect
                  preset="fallout"
                  enableScanlines={false}
                  enableSweep={false}
                  enableFlicker={false}
                  enableEdgeGlow={false}
                  enableVignette={false}
                  enableCurvature={v > 0}
                  curvatureIntensity={v}
                >
                  <div
                    style={{
                      backgroundColor: "#0a1a0f",
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#5bb387",
                    }}
                  >
                    {v}
                  </div>
                </CRTEffect>
              </div>
            ))}
          </div>
        </div>

        {/* GLARE - intensity comparison */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            enableGlare — intensity 0 vs 0.15 vs 0.4
          </h3>
          <div style={{ display: "flex", gap: "20px" }}>
            {[0, 0.15, 0.4].map((v) => (
              <div key={v} style={{ flex: 1 }}>
                <p style={{ color: "#666", margin: "0 0 6px" }}>
                  glareIntensity={v}
                </p>
                <CRTEffect
                  preset="vt100"
                  enableSweep={false}
                  enableGlare={v > 0}
                  glareIntensity={v}
                >
                  <div
                    style={{
                      backgroundColor: "#000",
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#dcffeb",
                    }}
                  >
                    {v}
                  </div>
                </CRTEffect>
              </div>
            ))}
          </div>
        </div>

        {/* NOISE - intensity comparison */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            enableNoise — opacity 0 vs 0.2 vs 0.5
          </h3>
          <div style={{ display: "flex", gap: "20px" }}>
            {[0, 0.2, 0.5].map((v) => (
              <div key={v} style={{ flex: 1 }}>
                <p style={{ color: "#666", margin: "0 0 6px" }}>
                  noiseOpacity={v}
                </p>
                <CRTEffect
                  preset="arcade"
                  enableSweep={false}
                  enableFlicker={false}
                  enableNoise={v > 0}
                  noiseOpacity={v}
                >
                  <div
                    style={{
                      backgroundColor: "#000",
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#0f0",
                    }}
                  >
                    {v}
                  </div>
                </CRTEffect>
              </div>
            ))}
          </div>
        </div>

        {/* CHROMATIC GLITCH */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            glitchChromatic (enableGlitch required)
          </h3>
          <CRTEffect
            preset="cyberpunk"
            enableGlitch
            glitchChromatic
            glitchIntensity={0.8}
            glitchSpeed={0.4}
          >
            <div
              style={{
                backgroundColor: "#000",
                padding: "60px",
                color: "#fff",
              }}
            >
              <p>CHROMATIC GLITCH</p>
              <p>Red/cyan channel split on every glitch</p>
            </div>
          </CRTEffect>
        </div>

        {/* ALL COMBINED */}
        <div>
          <h3 style={{ color: "#888", marginBottom: "10px" }}>
            all four combined
          </h3>
          <CRTEffect
            preset="fallout"
            enableCurvature
            enableGlare
            enableNoise
            enableGlitch
            glitchChromatic
          >
            <div
              style={{
                backgroundColor: "#000",
                padding: "60px",
                color: "#5bb387",
              }}
            >
              <p>EVERYTHING ON</p>
              <p>Curvature + glare + noise + chromatic glitch</p>
            </div>
          </CRTEffect>
        </div>

        <h2
          style={{
            color: "#888",
            borderBottom: "1px solid #333",
            marginTop: "40px",
          }}
        >
          existing presets
        </h2>

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
            preset="cyberpunk" + PUMPED UP FLICKER & GLITCH
          </h3>
          <CRTEffect preset="cyberpunk">
            <div
              style={{
                backgroundColor: "#000",
                padding: "40px",
                color: "#fff",
              }}
            >
              <p>CYBERPUNK PRESET</p>
              <p>Purple/magenta neon with HEAVY flicker and glitch!</p>
              <p>
                flickerIntensity={0.25} flickerSpeed={0.4}
              </p>
              <p>
                glitchIntensity={0.9} glitchSpeed={0.3}
              </p>
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
