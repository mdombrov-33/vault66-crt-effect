import ReactDOM from "react-dom/client";
import CRTEffect from "../../dist/crt-effect.es.js";
import "../../src/vault66-crt-effect.css";

function App() {
  return (
    <CRTEffect
      enabled={true}
      theme="custom"
      scanlineColor="rgba(8, 46, 8, 0.4)"
      scanlineOpacity={1}
      scanlineOrientation="vertical"
      scanlineGap={5}
      scanlineThickness={1}
      enableScanlines={true}
      enableSweep={false}
      enableGlow={false}
      enableEdgeGlow={false}
      enableFlicker={false}
      glitchMode={false}
    >
      <div
        style={{
          backgroundColor: "#222",
          width: "600px",
          height: "300px",
          margin: "0 auto",
          color: "lime",
          fontSize: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        Vertical Scanline Test
      </div>
    </CRTEffect>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
