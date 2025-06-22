# vault66-crt-effect

A customizable React component that adds nostalgic CRT-style visual effects — including scanlines, sweep animation, edge glow, and flicker — to any React app.

> **Originally developed as part of [Vault 66](https://github.com/mdombrov-33/vault-66-store),** a Fallout-themed e-commerce project. This library is extracted as a standalone package so you can easily add authentic retro CRT effects to your own projects.

---

![CRT Effect Demo](./crt.gif)

## Installation

```bash
npm install vault66-crt-effect
# or
yarn add vault66-crt-effect
```

## Usage

```bash
import React from 'react';
import CRTEffect from 'vault66-crt-effect';
import "vault66-crt-effect/dist/vault66-crt-effect.css";

function App() {
  return (
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
      <div style={{ padding: '20px', fontSize: '24px' }}>
        Hello CRT Effect!
      </div>
    </CRTEffect>
  );
}

export default App;
```

## Props

| Prop              | Type                                       | Default                     | Purpose                                                                                                  |
| ----------------- | ------------------------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `enabled`         | `boolean`                                  | `true`                      | Enables or disables the entire CRT effect                                                                |
| `sweepDuration`   | `number`                                   | `10`                        | Duration in seconds for the vertical sweep line animation                                                |
| `sweepThickness`  | `number`                                   | `10`                        | Height (thickness in pixels) of the sweep line                                                           |
| `sweepStyle`      | `"classic" \| "soft"`                      | `"classic"`                 | Style of the vertical sweep line: `"classic"` is a sharp black line, `"soft"` is a blurred shadow effect |
| `scanlineOpacity` | `number` (0 to 1)                          | `0.2`                       | Opacity of the horizontal scanlines                                                                      |
| `scanlineColor`   | `string`                                   | `"rgba(91, 179, 135, 0.2)"` | Custom RGBA/RGB scanline color (used only if `theme` is `"custom"`)                                      |
| `enableScanlines` | `boolean`                                  | `true`                      | Shows or hides the horizontal scanlines overlay                                                          |
| `enableSweep`     | `boolean`                                  | `true`                      | Shows or hides the vertical sweep line animation                                                         |
| `theme`           | `"green" \| "amber" \| "blue" \| "custom"` | `"green"`                   | Predefined scanline color themes (overrides `scanlineColor` unless `custom` is used)                     |
| `enableGlow`      | `boolean`                                  | `false`                     | Enables outer glow effect around the container                                                           |
| `glowColor`       | `string`                                   | `"rgba(0, 255, 128, 0.3)"`  | Color of the outer glow                                                                                  |
| `enableEdgeGlow`  | `boolean`                                  | `false`                     | Enables inset glow effect around edges                                                                   |
| `edgeGlowColor`   | `string`                                   | `"rgba(0, 255, 128, 0.2)"`  | Color of the inset edge glow                                                                             |
| `edgeGlowSize`    | `number`                                   | `30`                        | Size in pixels of the inset edge glow (box-shadow inset size)                                            |
| `enableFlicker`   | `boolean`                                  | `false`                     | Enables subtle flicker animation for CRT realism                                                         |
| `children`        | `React.ReactNode`                          | —                           | Content to render inside the CRT effect container                                                        |

## Customization

- Use the `theme` prop to quickly switch between predefined scanline color palettes: `"green"`, `"amber"`, or `"blue"`
- For full control over scanline color, set `theme="custom"` and provide your own `scanlineColor` as any valid CSS color string
- Adjust the speed of the sweep animation using `sweepDuration` (in seconds)
- Control glow intensity and colors via `enableGlow`, `glowColor`, `enableEdgeGlow`, `edgeGlowColor`, and `edgeGlowSize`
- Add subtle flicker for realism with `enableFlicker`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
