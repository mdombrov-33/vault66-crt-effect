# vault66-crt-effect

![npm](https://img.shields.io/npm/v/vault66-crt-effect?style=flat-square)
![npm downloads](https://img.shields.io/npm/dw/vault66-crt-effect?style=flat-square)
![npm total downloads](https://img.shields.io/npm/dt/vault66-crt-effect?style=flat-square)

A CRT screen effect you wrap around any content: scanlines, sweep line, glow, flicker, glitch, screen curvature, glare, and static. Ships for **React**, **Vue**, and as a framework-agnostic **Web Component** (so it also works in Angular, plain HTML, Astro, Svelte, or anything else that runs in a browser).

---

![CRT Effect Demo](./crt.gif)

## Live Demo

Play with the effect in this interactive [CodeSandbox](https://codesandbox.io/p/sandbox/brave-scott-lgp564) — toggle scanlines, sweep, glow, flicker, and orientation in real time.

## Installation

```bash
npm install vault66-crt-effect
pnpm add vault66-crt-effect
yarn add vault66-crt-effect
bun add vault66-crt-effect
```

## Use it with your framework

Same effect, same props everywhere — only the import and the syntax change. Presets get you a full look in one line; every individual prop is listed in [Props](#props).

### React

```jsx
import CRTEffect from "vault66-crt-effect";
import "vault66-crt-effect/style.css";

export default function App() {
  return (
    <CRTEffect preset="fallout">
      <div style={{ padding: 20, fontSize: 24 }}>Welcome to the Wasteland!</div>
    </CRTEffect>
  );
}
```

### Vue

```vue
<script setup>
import CRTEffect from "vault66-crt-effect/vue";
import "vault66-crt-effect/style.css";
</script>

<template>
  <CRTEffect preset="fallout">
    <div style="padding: 20px; font-size: 24px">Welcome to the Wasteland!</div>
  </CRTEffect>
</template>
```

### Web Component

Import once to register the `<crt-effect>` element, then use it anywhere — no CSS import needed, the component carries its own styles in a shadow root. Props become attributes: booleans are bare (`fill`), everything else is kebab-case (`sweep-duration="5"`).

```html
<script type="module">
  import "vault66-crt-effect/element";
</script>

<crt-effect preset="fallout">
  <div style="padding: 20px; font-size: 24px">Welcome to the Wasteland!</div>
</crt-effect>
```

**Angular** uses the same element — just add `CUSTOM_ELEMENTS_SCHEMA` to your component/module so the compiler accepts the custom tag (otherwise you'll hit `NG8001`), and `import "vault66-crt-effect/element"` once:

```ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "vault66-crt-effect/element";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<crt-effect preset="fallout">…</crt-effect>`,
})
export class AppComponent {}
```

## Props

Every prop works the same across React, Vue, and the Web Component. Start from a `preset` and override whatever you want, or set props from scratch.

| Prop                  | Type                                                                                                 | Default                     | Purpose                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preset`              | `"fallout" \| "dos" \| "cyberpunk" \| "arcade" \| "commodore64" \| "apple2" \| "vt100" \| "minimal"` | `undefined`                 | Apply a complete preset configuration. Individual props can override preset values. See [Presets](#presets) below                                 |
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
| `fill`                | `boolean`                                                                                            | `false`                     | Stretches the effect to fill its parent's full width and height instead of sizing to its content. See [Full-screen layouts](#full-screen-layouts) |
| `children`            | content                                                                                              | —                           | Content rendered inside the effect: React children, the Vue default slot, or slotted DOM in the Web Component                                     |

In the Web Component, prop names are kebab-case attributes: `enableGlow` → `enable-glow`, `sweepDuration` → `sweep-duration="5"`, and booleans are set by presence (`fill`, `enable-flicker`).

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

Start from a preset and change a few values, or build the whole look from individual props. A few common patterns (React syntax; the props are identical in Vue and the Web Component):

```jsx
// Custom scanline color and orientation
<CRTEffect theme="custom" scanlineColor="rgba(255, 100, 0, 0.3)" scanlineOrientation="vertical">
  <YourContent />
</CRTEffect>

// Fine-tune flicker and glitch with numbers
<CRTEffect
  enableFlicker
  flickerIntensity={0.05}  // subtle brightness variance (0-1)
  flickerSpeed={2}         // slow flicker (seconds)
  enableGlitch
  glitchIntensity={0.3}    // gentle shake (0-1)
  glitchSpeed={1.5}        // medium speed (seconds)
>
  <YourContent />
</CRTEffect>

// Or use the "low" / "medium" / "high" shortcuts
<CRTEffect enableFlicker flickerIntensity="low" enableGlitch glitchIntensity="high">
  <YourContent />
</CRTEffect>
```

## Full-screen layouts

By default the wrapper **sizes to its content** — good for cards, panels, and inline blocks. When you want the effect to cover a whole region or the full viewport, add `fill` so the wrapper stretches to its parent (and the content stretches with it):

```jsx
// The parent needs a real height — here, the full viewport
<div style={{ width: "100vw", height: "100vh" }}>
  <CRTEffect preset="fallout" fill>
    <YourApp />
  </CRTEffect>
</div>
```

> `fill` fills the **parent**, so the parent must have a resolved height (`100vh`, a fixed `px`, or `100%` inherited down the chain).

## Building your own integration

If your framework isn't React or Vue and you'd rather not use the Web Component, the core is exported separately. `computeCrt(options)` takes the same props and hands back everything needed to render the effect onto your own markup — no framework attached. It's exactly what the React and Vue wrappers are built on.

It returns four things:

```js
const { enabled, wrapper, inner, overlays } = computeCrt({ preset: "fallout" });
```

- **`enabled`** — `false` when the effect is turned off; render your content untouched.
- **`wrapper`** — `{ className, style }` for the outer element.
- **`inner`** — `{ className, style }` for the element that holds your content.
- **`overlays`** — an array of class names, one per overlay layer.

The markup contract is: a **wrapper** element containing an **inner** element (your content goes in there), followed by one empty **overlay** div per entry in `overlays`:

```html
<div class="{wrapper.className}" style="{wrapper.style}">
  <div class="{inner.className}" style="{inner.style}">…your content…</div>
  <!-- one sibling div per overlay class -->
  <div class="crt-vignette"></div>
</div>
```

One catch when applying the styles by hand: the `style` bag contains both normal CSS properties (`filter`, `flexDirection`) and CSS custom properties (`--scanline-color-rgb`). Custom properties have to be set with `setProperty`, not by assigning to `el.style`. Here's a complete vanilla-DOM renderer that handles it:

```js
import { computeCrt } from "vault66-crt-effect/core";
import "vault66-crt-effect/style.css";

function applyStyle(el, style) {
  for (const [key, value] of Object.entries(style)) {
    if (key.startsWith("--")) el.style.setProperty(key, String(value));
    else el.style[key] = value;
  }
}

// Wrap any element in the CRT effect and return the new root element.
function crt(content, options) {
  const { enabled, wrapper, inner, overlays } = computeCrt(options);
  if (!enabled) return content; // effect off — hand content back as-is

  const root = document.createElement("div");
  root.className = wrapper.className;
  applyStyle(root, wrapper.style);

  const innerEl = document.createElement("div");
  innerEl.className = inner.className;
  if (inner.style) applyStyle(innerEl, inner.style);
  innerEl.append(content);
  root.append(innerEl);

  for (const cls of overlays) {
    const layer = document.createElement("div");
    layer.className = cls;
    root.append(layer);
  }
  return root;
}

const screen = crt(myContent, { preset: "fallout" });
document.body.append(screen);
```

## Reduced motion

If the system has "Reduce Motion" enabled, animated layers (sweep, flicker, glitch, static) turn themselves off automatically, while layers like scanlines and glow stay visible. Nothing to configure.

## License

MIT — see [LICENSE](LICENSE) for details.
