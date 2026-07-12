# vault66-crt-effect

![npm](https://img.shields.io/npm/v/vault66-crt-effect?style=flat-square)
![npm downloads](https://img.shields.io/npm/dw/vault66-crt-effect?style=flat-square)
![npm total downloads](https://img.shields.io/npm/dt/vault66-crt-effect?style=flat-square)

Authentic CRT effects for React — scanlines, sweep lines, glow, flicker, glitch, screen curvature, and more. Wrap any content for an instant vintage-monitor look.

---

![CRT Effect Demo](./crt.gif)

## Live Demo

Try the CRT effect live in this interactive [CodeSandbox demo](https://codesandbox.io/p/sandbox/brave-scott-lgp564).
Experiment with scanlines, sweep, glow, flicker, and orientation in real time.

## Installation

```bash
npm install vault66-crt-effect
pnpm add vault66-crt-effect
yarn add vault66-crt-effect
bun add vault66-crt-effect
```

## Quick Start

Use a preset for instant retro vibes:

```jsx
import React from "react";
import CRTEffect from "vault66-crt-effect";
import "vault66-crt-effect/dist/vault66-crt-effect.css";

function App() {
  return (
    <CRTEffect preset="fallout">
      <div style={{ padding: "20px", fontSize: "24px" }}>
        Welcome to the Wasteland!
      </div>
    </CRTEffect>
  );
}

export default App;
```

Or customize everything manually:

```jsx
<CRTEffect
  enabled={true}
  sweepDuration={10}
  sweepThickness={10}
  scanlineOpacity={0.3}
  theme="blue"
  enableScanlines={true}
  enableSweep={true}
  enableGlow={true}
  glowColor="rgba(0, 132, 255, 0.3)"
  enableEdgeGlow={true}
  edgeGlowColor="rgba(30, 128, 92, 0.9)"
  edgeGlowSize={100}
  enableFlicker={true}
>
  <div>Your content here</div>
</CRTEffect>
```

## Props

| Prop                  | Type                                                                                                 | Default                     | Purpose                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preset`              | `"fallout" \| "dos" \| "cyberpunk" \| "arcade" \| "commodore64" \| "apple2" \| "vt100" \| "minimal"` | `undefined`                 | Apply a complete preset configuration. Individual props can override preset values. See [Presets](#presets) section below                         |
| `enabled`             | `boolean`                                                                                            | `true`                      | Enables or disables the entire CRT effect                                                                                                         |
| `sweepDuration`       | `number`                                                                                             | `10`                        | Duration in seconds for the vertical sweep line animation                                                                                         |
| `sweepThickness`      | `number`                                                                                             | `10`                        | Height (thickness in pixels) of the sweep line                                                                                                    |
| `sweepStyle`          | `"classic" \| "soft"`                                                                                | `"classic"`                 | Style of the vertical sweep line: `"classic"` is a sharp black line, `"soft"` is a blurred shadow effect                                          |
| `scanlineOpacity`     | `number` (0 to 1)                                                                                    | `0.2`                       | Opacity of the scanlines                                                                                                                          |
| `scanlineThickness`   | `number`                                                                                             | `2`                         | Thickness of each scanline in pixels                                                                                                              |
| `scanlineGap`         | `number`                                                                                             | `3`                         | Gap between scanlines in pixels                                                                                                                   |
| `scanlineColor`       | `string`                                                                                             | `"rgba(91, 179, 135, 0.2)"` | Custom RGBA/RGB scanline color (used only if `theme` is `"custom"`)                                                                               |
| `enableScanlines`     | `boolean`                                                                                            | `true`                      | Shows or hides the scanlines overlay                                                                                                              |
| `scanlineOrientation` | `"horizontal" \| "vertical"`                                                                         | `"horizontal"`              | Orientation of the scanlines: `"horizontal"` renders lines from top to bottom, `"vertical"` renders lines from left to right                      |
| `enableSweep`         | `boolean`                                                                                            | `true`                      | Shows or hides the vertical sweep line animation                                                                                                  |
| `theme`               | `"green" \| "amber" \| "blue" \| "custom"`                                                           | `"green"`                   | Predefined scanline color themes (overrides `scanlineColor` unless `custom` is used)                                                              |
| `enableGlow`          | `boolean`                                                                                            | `false`                     | Enables outer glow effect around the container                                                                                                    |
| `glowColor`           | `string`                                                                                             | `"rgba(0, 255, 128, 0.3)"`  | Color of the outer glow                                                                                                                           |
| `enableEdgeGlow`      | `boolean`                                                                                            | `false`                     | Enables inset glow effect around edges                                                                                                            |
| `edgeGlowColor`       | `string`                                                                                             | `"rgba(0, 255, 128, 0.2)"`  | Color of the inset edge glow                                                                                                                      |
| `edgeGlowSize`        | `number`                                                                                             | `30`                        | Size in pixels of the inset edge glow (box-shadow inset size)                                                                                     |
| `enableFlicker`       | `boolean`                                                                                            | `false`                     | Enables subtle flicker animation for CRT realism                                                                                                  |
| `flickerIntensity`    | `"low" \| "medium" \| "high" \| number`                                                              | `0.08`                      | Flicker depth: preset string or custom number (0-1) where 0=no flicker, 1=max brightness variance                                                 |
| `flickerSpeed`        | `"low" \| "medium" \| "high" \| number`                                                              | `0.8`                       | Flicker animation speed: preset string or custom number in seconds. Lower values = faster flicker                                                 |
| `enableGlitch`        | `boolean`                                                                                            | `false`                     | Enables shaking/interference glitch animation                                                                                                     |
| `glitchIntensity`     | `"low" \| "medium" \| "high" \| number`                                                              | `0.6`                       | Glitch distance: preset string or custom number (0-1) where 0=no movement, 1=max shake amount                                                     |
| `glitchSpeed`         | `"low" \| "medium" \| "high" \| number`                                                              | `0.6`                       | Glitch animation speed: preset string or custom number in seconds. Lower values = faster glitch                                                   |
| `enableVignette`      | `boolean`                                                                                            | `false`                     | Enables a subtle edge-darkening vignette overlay                                                                                                  |
| `vignetteIntensity`   | `number` (0 to 1)                                                                                    | `0.4`                       | Controls vignette darkness at the edges                                                                                                           |
| `enableCurvature`     | `boolean`                                                                                            | `false`                     | Enables a curved-glass overlay: a soft corner highlight plus darkened, rounded screen edges                                                       |
| `curvatureIntensity`  | `number` (0 to 1)                                                                                    | `0.5`                       | Strength of the curved-glass edge darkening                                                                                                       |
| `enableGlare`         | `boolean`                                                                                            | `false`                     | Enables a broad, soft diagonal glass-reflection sheen across the screen                                                                           |
| `glareIntensity`      | `number` (0 to 1)                                                                                    | `0.18`                      | Brightness of the glare/reflection sheen                                                                                                          |
| `enableNoise`         | `boolean`                                                                                            | `false`                     | Enables an animated RF static/snow overlay generated from SVG fractal noise                                                                       |
| `noiseOpacity`        | `number` (0 to 1)                                                                                    | `0.15`                      | Opacity of the static/snow overlay                                                                                                                |
| `glitchChromatic`     | `boolean`                                                                                            | `false`                     | Adds animated red/cyan chromatic aberration to the glitch (requires `enableGlitch`)                                                               |
| `fill`                | `boolean`                                                                                            | `false`                     | Stretches the effect to fill its parent's full width and height instead of sizing to its content. See [Full-Screen Layouts](#full-screen-layouts) |
| `children`            | `React.ReactNode`                                                                                    | —                           | Content to render inside the CRT effect container                                                                                                 |

## Presets

Eight ready-made monitor looks. Use one as-is, or as a starting point and override individual props.

| Preset        | Look                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| `fallout`     | Green Vault-Tec phosphor terminal — medium scanlines, sweep, subtle edge glow, gentle flicker |
| `dos`         | Amber IBM/Hercules monitor — clean scanlines, no sweep or glow                                |
| `cyberpunk`   | Purple/magenta neon — heavy outer + edge glow, fast sweep, flicker, glitch                    |
| `arcade`      | Bright saturated green — thick scanlines, fast sweep, strong glow                             |
| `commodore64` | Periwinkle 8-bit home computer — chunky scanlines, subtle flicker                             |
| `apple2`      | Green Apple II — tight scanlines, clean (no sweep or glow)                                    |
| `vt100`       | Pale green DEC terminal — minimal scanlines, no sweep or glow                                 |
| `minimal`     | Barely-there — subtle scanlines + light vignette only                                         |

**Using Presets:**

```jsx
// Use a preset as-is
<CRTEffect preset="arcade">
  <YourContent />
</CRTEffect>

// Override specific preset values
<CRTEffect preset="fallout" sweepDuration={5} enableFlicker={false}>
  <YourContent />
</CRTEffect>
```

## Customization

Start with a preset and override specific values, or build from scratch with individual props. See the [Props](#props) table above for the complete list of available options.

**Quick customization patterns:**

```jsx
// Start with a preset, tweak a few values
<CRTEffect preset="fallout" sweepDuration={5} enableFlicker={false}>
  <YourContent />
</CRTEffect>

// Custom scanline colors and orientation
<CRTEffect theme="custom" scanlineColor="rgba(255, 100, 0, 0.3)" scanlineOrientation="vertical">
  <YourContent />
</CRTEffect>

// Fine-tune flicker and glitch with numeric precision
<CRTEffect
  enableFlicker
  flickerIntensity={0.05}  // Subtle brightness variance (0-1)
  flickerSpeed={2}         // Slow flicker (seconds)
  enableGlitch
  glitchIntensity={0.3}    // Gentle shake (0-1)
  glitchSpeed={1.5}        // Medium speed (seconds)
>
  <YourContent />
</CRTEffect>

// Or use preset strings for quick adjustments
<CRTEffect enableFlicker flickerIntensity="low" enableGlitch glitchIntensity="high">
  <YourContent />
</CRTEffect>
```

## Full-Screen Layouts

By default the CRT wrapper **sizes to its content** — great for cards, panels, and inline blocks. When you instead want the effect to cover a whole region or the full viewport, add `fill` so the wrapper stretches to fill its parent (and its content stretches with it):

```jsx
// Parent needs a real height — here, the full viewport
<div style={{ width: "100vw", height: "100vh" }}>
  <CRTEffect preset="fallout" fill>
    <YourApp />
  </CRTEffect>
</div>
```

> `fill` fills the **parent**, so the parent must have a resolved height (`100vh`, a fixed `px`, or `100%` inherited down a chain).

## Reduced Motion Support

If your system has “Reduce Motion” enabled, the CRT effect will automatically disable animations like sweep, flicker, and glitch to avoid causing discomfort. Static effects like scanlines and glow will remain visible. No extra setup needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
