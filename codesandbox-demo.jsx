import React, { useState } from "react";
import CRTEffect from "vault66-crt-effect";
import "vault66-crt-effect/dist/vault66-crt-effect.css";

const presetInfo = {
  fallout: { name: "FALLOUT", color: "#5bb387", desc: "Vault-Tec Terminal" },
  dos: { name: "DOS", color: "#ff6400", desc: "Hercules Monitor" },
  cyberpunk: { name: "CYBERPUNK", color: "#ff00ff", desc: "Neon Future" },
  arcade: { name: "ARCADE", color: "#00ff64", desc: "Coin-Op Cabinet" },
  commodore64: { name: "C64", color: "#a0a0ff", desc: "8-Bit Computer" },
  apple2: { name: "APPLE ][", color: "#78dc50", desc: "Vintage Computer" },
  vt100: { name: "VT100", color: "#dfffeb", desc: "DEC Terminal" },
  minimal: { name: "MINIMAL", color: "#999", desc: "Subtle Effect" },
};

export default function CRTShowcase() {
  const [preset, setPreset] = useState("fallout");
  const [showControls, setShowControls] = useState(false);

  const [enableFlicker, setEnableFlicker] = useState(null);
  const [flickerIntensity, setFlickerIntensity] = useState(null);
  const [flickerSpeed, setFlickerSpeed] = useState(null);
  const [enableGlitch, setEnableGlitch] = useState(null);
  const [glitchIntensity, setGlitchIntensity] = useState(null);
  const [glitchSpeed, setGlitchSpeed] = useState(null);
  const [scanlineOpacity, setScanlineOpacity] = useState(null);
  const [vignetteIntensity, setVignetteIntensity] = useState(null);

  const info = presetInfo[preset];

  const customProps = {};
  if (enableFlicker !== null) customProps.enableFlicker = enableFlicker;
  if (flickerIntensity !== null)
    customProps.flickerIntensity = flickerIntensity;
  if (flickerSpeed !== null) customProps.flickerSpeed = flickerSpeed;
  if (enableGlitch !== null) customProps.enableGlitch = enableGlitch;
  if (glitchIntensity !== null) customProps.glitchIntensity = glitchIntensity;
  if (glitchSpeed !== null) customProps.glitchSpeed = glitchSpeed;
  if (scanlineOpacity !== null) customProps.scanlineOpacity = scanlineOpacity;
  if (vignetteIntensity !== null)
    customProps.vignetteIntensity = vignetteIntensity;

  const resetCustom = () => {
    setEnableFlicker(null);
    setFlickerIntensity(null);
    setFlickerSpeed(null);
    setEnableGlitch(null);
    setGlitchIntensity(null);
    setGlitchSpeed(null);
    setScanlineOpacity(null);
    setVignetteIntensity(null);
  };

  return (
    <div style={{ margin: 0, padding: 0, overflow: "hidden" }}>
      <CRTEffect preset={preset} {...customProps}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "monospace",
            color: info.color,
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          {/* Preset Selector */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: "90vw",
              zIndex: 1000,
            }}
          >
            {Object.keys(presetInfo).map((p) => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                style={{
                  background: preset === p ? presetInfo[p].color : "#222",
                  color: preset === p ? "#000" : "#888",
                  border: `2px solid ${presetInfo[p].color}`,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  fontWeight: "bold",
                  transition: "all 0.2s",
                }}
              >
                {presetInfo[p].name}
              </button>
            ))}
          </div>

          {/* Controls Toggle - Small Gear Icon */}
          <button
            onClick={() => setShowControls(!showControls)}
            style={{
              position: "absolute",
              bottom: 60,
              right: 20,
              background: showControls ? "#0f0" : "#333",
              color: showControls ? "#000" : "#0f0",
              border: "2px solid #0f0",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "20px",
              fontWeight: "bold",
              zIndex: 1000,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={showControls ? "Hide controls" : "Show controls"}
          >
            ⚙
          </button>

          {/* Custom Controls Panel */}
          {showControls && (
            <div
              style={{
                position: "absolute",
                left: 20,
                top: 140,
                background: "rgba(0,0,0,0.9)",
                border: "2px solid #0f0",
                padding: "20px",
                maxWidth: "300px",
                fontSize: "12px",
                color: "#0f0",
                maxHeight: "calc(100vh - 180px)",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  marginBottom: "15px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                CUSTOM OVERRIDES
              </div>

              {/* Flicker Toggle */}
              <label style={{ display: "block", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={enableFlicker ?? false}
                  onChange={(e) => setEnableFlicker(e.target.checked)}
                  style={{ marginRight: "8px" }}
                />
                enableFlicker
              </label>

              {/* Flicker Intensity */}
              <label style={{ display: "block", marginBottom: "5px" }}>
                flickerIntensity: {flickerIntensity?.toFixed(2) ?? "preset"}
              </label>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={flickerIntensity ?? 0.08}
                onChange={(e) =>
                  setFlickerIntensity(parseFloat(e.target.value))
                }
                style={{ width: "100%", marginBottom: "15px" }}
              />

              {/* Flicker Speed */}
              <label style={{ display: "block", marginBottom: "5px" }}>
                flickerSpeed: {flickerSpeed?.toFixed(2) ?? "preset"}s
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={flickerSpeed ?? 0.8}
                onChange={(e) => setFlickerSpeed(parseFloat(e.target.value))}
                style={{ width: "100%", marginBottom: "15px" }}
              />

              {/* Glitch Toggle */}
              <label style={{ display: "block", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={enableGlitch ?? false}
                  onChange={(e) => setEnableGlitch(e.target.checked)}
                  style={{ marginRight: "8px" }}
                />
                enableGlitch
              </label>

              {/* Glitch Intensity */}
              <label style={{ display: "block", marginBottom: "5px" }}>
                glitchIntensity: {glitchIntensity?.toFixed(2) ?? "preset"}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={glitchIntensity ?? 0.6}
                onChange={(e) => setGlitchIntensity(parseFloat(e.target.value))}
                style={{ width: "100%", marginBottom: "15px" }}
              />

              {/* Glitch Speed */}
              <label style={{ display: "block", marginBottom: "5px" }}>
                glitchSpeed: {glitchSpeed?.toFixed(2) ?? "preset"}s
              </label>
              <input
                type="range"
                min="0.1"
                max="2"
                step="0.1"
                value={glitchSpeed ?? 0.6}
                onChange={(e) => setGlitchSpeed(parseFloat(e.target.value))}
                style={{ width: "100%", marginBottom: "15px" }}
              />

              {/* Scanline Opacity */}
              <label style={{ display: "block", marginBottom: "5px" }}>
                scanlineOpacity: {scanlineOpacity?.toFixed(2) ?? "preset"}
              </label>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={scanlineOpacity ?? 0.2}
                onChange={(e) => setScanlineOpacity(parseFloat(e.target.value))}
                style={{ width: "100%", marginBottom: "15px" }}
              />

              {/* Vignette Intensity */}
              <label style={{ display: "block", marginBottom: "5px" }}>
                vignetteIntensity: {vignetteIntensity?.toFixed(2) ?? "preset"}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={vignetteIntensity ?? 0.4}
                onChange={(e) =>
                  setVignetteIntensity(parseFloat(e.target.value))
                }
                style={{ width: "100%", marginBottom: "15px" }}
              />

              <button
                onClick={resetCustom}
                style={{
                  width: "100%",
                  background: "#222",
                  color: "#f00",
                  border: "1px solid #f00",
                  padding: "8px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                RESET TO PRESET
              </button>
            </div>
          )}

          {/* Main Content */}
          <div style={{ textAlign: "center", maxWidth: "800px" }}>
            <div
              style={{
                fontSize: "4rem",
                fontWeight: "bold",
                marginBottom: "20px",
                letterSpacing: "4px",
                textShadow: `0 0 20px ${info.color}`,
              }}
            >
              {info.name}
            </div>

            <div
              style={{
                fontSize: "1.5rem",
                marginBottom: "40px",
                opacity: 0.8,
              }}
            >
              {info.desc}
            </div>

            <div
              style={{
                border: `2px solid ${info.color}`,
                padding: "30px",
                backgroundColor: "rgba(0,0,0,0.5)",
                marginBottom: "30px",
              }}
            >
              <div style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
                <div>&gt; SYSTEM_STATUS .......... [ONLINE]</div>
                <div>&gt; PRESET ................ [{info.name}]</div>
                <div>&gt; SCANLINES ............. [ACTIVE]</div>
                <div>&gt; PHOSPHOR_COLOR ........ [{info.color}]</div>
                <div
                  style={{
                    marginTop: "20px",
                    fontSize: "0.9rem",
                    opacity: 0.7,
                  }}
                >
                  █ vault66-crt-effect v2.0.0
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "1rem",
                opacity: 0.6,
                letterSpacing: "2px",
              }}
            >
              ▁ ▂ ▃ ▄ ▅ ▆ ▇ REACT CRT COMPONENT ▇ ▆ ▅ ▄ ▃ ▂ ▁
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              fontSize: "0.85rem",
              opacity: 0.5,
              textAlign: "center",
            }}
          >
            npm install vault66-crt-effect
          </div>
        </div>
      </CRTEffect>
    </div>
  );
}
