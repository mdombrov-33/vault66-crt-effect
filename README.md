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
| `flickerIntensity`    | `"low" \| "medium" \| "high"`              | `"medium"`                  | Controls flicker animation speed and intensity                                                                               |
| `glitchMode`          | `boolean`                                  | `false`                     | Enables shaking/interference glitch animation                                                                                |
| `glitchIntensity`     | `"low" \| "medium" \| "high"`              | `"medium"`                  | Controls glitch animation speed and intensity                                                                                |
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

- Use the `preset` prop for instant authentic CRT looks, or start from scratch with individual props
- Use the `theme` prop to quickly switch between predefined scanline color palettes: `"green"`, `"amber"`, or `"blue"`
- For full control over scanline color, set `theme="custom"` and provide your own `scanlineColor` as any valid CSS color string
- Adjust the opacity and orientation of the scanlines with `scanlineOpacity` and `scanlineOrientation`
- Toggle scanlines on or off with `enableScanlines`
- Adjust the speed and thickness of the vertical sweep line animation using `sweepDuration` (in seconds) and `sweepThickness` (in pixels)
- Choose between sharp or soft sweep styles with `sweepStyle` (`"classic"` or `"soft"`)
- Control glow intensity and colors via `enableGlow`, `glowColor`, `enableEdgeGlow`, `edgeGlowColor`, and `edgeGlowSize`
- Add subtle flicker for realism with `enableFlicker`, and adjust its speed and intensity with `flickerIntensity` (`"low"`, `"medium"`, or `"high"`)
- Enable retro glitch effects with `glitchMode`, and control glitch speed and intensity with `glitchIntensity` (`"low"`, `"medium"`, or `"high"`)
- Enable or disable the entire CRT effect with the `enabled` prop

## Reduced Motion Support

If your system has “Reduce Motion” enabled, the CRT effect will automatically disable animations like sweep, flicker, and glitch to avoid causing discomfort. Static effects like scanlines and glow will remain visible. No extra setup needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
