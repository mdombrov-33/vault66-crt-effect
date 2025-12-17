# vault66-crt-effect

![npm](https://img.shields.io/npm/v/vault66-crt-effect?style=flat-square)
![npm downloads](https://img.shields.io/npm/dw/vault66-crt-effect?style=flat-square)
![npm total downloads](https://img.shields.io/npm/dt/vault66-crt-effect?style=flat-square)

Give your React app that vintage TV feel with authentic CRT effects - flickering scanlines, sweeping light bars, glowing edges, and all the retro charm you need.

> **Originally crafted for [Vault 66](https://github.com/mdombrov-33/vault-66-store), a Fallout-themed e-commerce project,** this library is now a standalone package so you can effortlessly add authentic retro CRT effects to your own apps.

---

![CRT Effect Demo](./crt.gif)

## Live Demo

Try the CRT effect live in this interactive [CodeSandbox demo](https://codesandbox.io/p/sandbox/brave-scott-lgp564)  
Experiment with scanlines, sweep, glow, flicker, and orientation in real time.

## Installation

```bash
npm install vault66-crt-effect
# or
yarn add vault66-crt-effect
```

## Quick Start

Use a preset for instant retro vibes:

```jsx
import React from 'react';
import CRTEffect from 'vault66-crt-effect';
import "vault66-crt-effect/dist/vault66-crt-effect.css";

function App() {
  return (
    <CRTEffect preset="fallout">
      <div style={{ padding: '20px', fontSize: '24px' }}>
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

| Prop                  | Type                                       | Default                     | Purpose                                                                                                                      |
| --------------------- | ------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `preset`              | `"fallout" \| "dos" \| "cyberpunk" \| "arcade" \| "commodore64" \| "apple2" \| "vt100" \| "minimal"` | `undefined` | Apply a complete preset configuration. Individual props can override preset values. See [Presets](#presets) section below. |
| `enabled`             | `boolean`                                  | `true`                      | Enables or disables the entire CRT effect                                                                                    |
| `sweepDuration`       | `number`                                   | `10`                        | Duration in seconds for the vertical sweep line animation                                                                    |
| `sweepThickness`      | `number`                                   | `10`                        | Height (thickness in pixels) of the sweep line                                                                               |
| `sweepStyle`          | `"classic" \| "soft"`                      | `"classic"`                 | Style of the vertical sweep line: `"classic"` is a sharp black line, `"soft"` is a blurred shadow effect                     |
| `scanlineOpacity`     | `number` (0 to 1)                          | `0.2`                       | Opacity of the scanlines                                                                                                     |
| `scanlineThickness`   | `number`                                   | `2`                         | Thickness of each scanline in pixels                                                                                         |
| `scanlineGap`         | `number`                                   | `3`                         | Gap between scanlines in pixels                                                                                              |
| `scanlineColor`       | `string`                                   | `"rgba(91, 179, 135, 0.2)"` | Custom RGBA/RGB scanline color (used only if `theme` is `"custom"`)                                                          |
| `enableScanlines`     | `boolean`                                  | `true`                      | Shows or hides the scanlines overlay                                                                                         |
| `scanlineOrientation` | `"horizontal" \| "vertical"`               | `"horizontal"`              | Orientation of the scanlines: `"horizontal"` renders lines from top to bottom, `"vertical"` renders lines from left to right |
| `enableSweep`         | `boolean`                                  | `true`                      | Shows or hides the vertical sweep line animation                                                                             |
| `theme`               | `"green" \| "amber" \| "blue" \| "custom"` | `"green"`                   | Predefined scanline color themes (overrides `scanlineColor` unless `custom` is used)                                         |
| `enableGlow`          | `boolean`                                  | `false`                     | Enables outer glow effect around the container                                                                               |
| `glowColor`           | `string`                                   | `"rgba(0, 255, 128, 0.3)"`  | Color of the outer glow                                                                                                      |
| `enableEdgeGlow`      | `boolean`                                  | `false`                     | Enables inset glow effect around edges                                                                                       |
| `edgeGlowColor`       | `string`                                   | `"rgba(0, 255, 128, 0.2)"`  | Color of the inset edge glow                                                                                                 |
| `edgeGlowSize`        | `number`                                   | `30`                        | Size in pixels of the inset edge glow (box-shadow inset size)                                                                |
| `enableFlicker`       | `boolean`                                  | `false`                     | Enables subtle flicker animation for CRT realism                                                                             |
| `flickerIntensity`    | `"low" \| "medium" \| "high" \| number`    | `0.08`                      | Flicker depth: preset string or custom number (0-1) where 0=no flicker, 1=max brightness variance                           |
| `flickerSpeed`        | `"low" \| "medium" \| "high" \| number`    | `0.8`                       | Flicker animation speed: preset string or custom number in seconds. Lower values = faster flicker                            |
| `enableGlitch`        | `boolean`                                  | `false`                     | Enables shaking/interference glitch animation                                                                                |
| `glitchIntensity`     | `"low" \| "medium" \| "high" \| number`    | `0.6`                       | Glitch distance: preset string or custom number (0-1) where 0=no movement, 1=max shake amount                                |
| `glitchSpeed`         | `"low" \| "medium" \| "high" \| number`    | `0.6`                       | Glitch animation speed: preset string or custom number in seconds. Lower values = faster glitch                              |
| `enableVignette`      | `boolean`                                  | `false`                     | Enables a subtle edge-darkening vignette overlay                                                                             |
| `vignetteIntensity`   | `number` (0 to 1)                          | `0.4`                       | Controls vignette darkness at the edges                                                                                      |
| `children`            | `React.ReactNode`                          | —                           | Content to render inside the CRT effect container                                                                            |

## Presets

Choose from 8 authentic CRT monitor presets for instant retro aesthetics:

### `preset="fallout"`
Classic Vault-Tec terminal from the Fallout universe. Green phosphor display with medium scanlines, noticeable sweep line, subtle edge glow, and gentle flicker. Perfect for post-apocalyptic interfaces and retro terminal UIs.

### `preset="dos"`
Authentic DOS/Hercules monitor aesthetic. Warm orange phosphor (like classic IBM PC monitors), clean scanlines, no sweep or glow for that professional 80s computing look. Great for vintage command-line interfaces.

### `preset="cyberpunk"`
Neon-drenched future aesthetic. Purple/magenta phosphor with heavy outer and edge glow, fast sweep, medium flicker, and subtle glitch effects. Ideal for sci-fi, hacker, or futuristic neon interfaces.

### `preset="arcade"`
Retro arcade cabinet monitor. Bright saturated green, thick scanlines, fast sweep (4 seconds), strong glow effects, and medium flicker. Brings that coin-op gaming nostalgia to your app.

### `preset="commodore64"`
Iconic 8-bit home computer display. Light purple-blue phosphor (periwinkle), chunky scanlines, medium sweep, subtle flicker. Perfect for 80s computer and retro gaming aesthetics.

### `preset="apple2"`
Vintage Apple II computer terminal. Bright green phosphor display, tight scanlines, clean appearance with no sweep or glow. Great for authentic vintage computing interfaces.

### `preset="vt100"`
Professional DEC VT100 terminal. Pale greenish-white phosphor, minimal scanlines, no sweep or glow for a clean, professional look. Ideal for Unix terminals and serious retro computing applications.

### `preset="minimal"`
Barely-there CRT effect for modern UIs. Subtle scanlines and light vignette only, no sweep, glow, or flicker. Perfect when you want just a hint of retro charm without overwhelming your contemporary design.

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

## Reduced Motion Support

If your system has “Reduce Motion” enabled, the CRT effect will automatically disable animations like sweep, flicker, and glitch to avoid causing discomfort. Static effects like scanlines and glow will remain visible. No extra setup needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
