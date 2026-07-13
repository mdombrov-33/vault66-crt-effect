import { computeCrt, type CRTStyle } from "../core/compute";
import type { CRTOptions } from "../core/options";
import styles from "../style.css?inline";

/**
 * `<crt-effect>` Web Component.
 *
 * Framework-agnostic: works in plain HTML, Astro, Vue, Svelte, Solid — anywhere
 * that renders DOM. It uses Shadow DOM with an adopted stylesheet, so it is
 * fully self-contained: no separate CSS import is needed. Your content is
 * projected through a <slot> and keeps its own page styles.
 *
 * ```html
 * <crt-effect preset="fallout" fill>
 *   <h1>Welcome to the Wasteland</h1>
 * </crt-effect>
 * ```
 */

export const CRT_EFFECT_TAG = "crt-effect";

// Options split by how their attribute value is parsed.
const BOOL_ATTRS = [
  "enabled",
  "fill",
  "enable-scanlines",
  "enable-sweep",
  "enable-glow",
  "enable-edge-glow",
  "enable-flicker",
  "enable-glitch",
  "glitch-chromatic",
  "enable-vignette",
  "enable-curvature",
  "enable-glare",
  "enable-noise",
  "tint-text",
];
const NUM_ATTRS = [
  "sweep-duration",
  "sweep-thickness",
  "scanline-opacity",
  "scanline-thickness",
  "scanline-gap",
  "edge-glow-size",
  "vignette-intensity",
  "curvature-intensity",
  "glare-intensity",
  "noise-opacity",
];
const STR_ATTRS = [
  "preset",
  "theme",
  "sweep-style",
  "scanline-orientation",
  "scanline-color",
  "glow-color",
  "edge-glow-color",
  "text-color",
  "sweep-color",
];
// Accept either a keyword ("low"/"medium"/"high") or a number.
const LEVEL_ATTRS = [
  "flicker-intensity",
  "flicker-speed",
  "glitch-intensity",
  "glitch-speed",
];

const ALL_ATTRS = [...BOOL_ATTRS, ...NUM_ATTRS, ...STR_ATTRS, ...LEVEL_ATTRS];

const toCamel = (s: string): string =>
  s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

const toKebab = (s: string): string =>
  s.startsWith("--") ? s : s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

const serializeStyle = (style: CRTStyle): string =>
  Object.entries(style)
    .map(([key, value]) => `${toKebab(key)}:${value}`)
    .join(";");

// Give the host a sensible default box; the shared stylesheet only knows about
// the inner .crt-effect-wrapper classes.
const HOST_CSS = ":host{display:block}:host([hidden]){display:none}\n";

export class CRTEffectElement extends HTMLElement {
  static get observedAttributes(): string[] {
    return ALL_ATTRS;
  }

  private root: ShadowRoot;
  private mount: HTMLDivElement;
  private connected = false;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const css = HOST_CSS + styles;
    if (
      typeof CSSStyleSheet !== "undefined" &&
      "replaceSync" in CSSStyleSheet.prototype &&
      "adoptedStyleSheets" in this.root
    ) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      this.root.adoptedStyleSheets = [sheet];
    } else {
      const styleEl = document.createElement("style");
      styleEl.textContent = css;
      this.root.appendChild(styleEl);
    }

    // Rebuilding this node's innerHTML never touches the stylesheet above.
    this.mount = document.createElement("div");
    this.mount.style.display = "contents";
    this.root.appendChild(this.mount);
  }

  connectedCallback(): void {
    this.connected = true;
    this.render();
  }

  attributeChangedCallback(): void {
    if (this.connected) this.render();
  }

  private readOptions(): CRTOptions {
    const options: Record<string, unknown> = {};

    for (const attr of BOOL_ATTRS) {
      if (this.hasAttribute(attr)) {
        options[toCamel(attr)] = this.getAttribute(attr) !== "false";
      }
    }
    for (const attr of NUM_ATTRS) {
      if (this.hasAttribute(attr)) {
        const n = parseFloat(this.getAttribute(attr) ?? "");
        if (!Number.isNaN(n)) options[toCamel(attr)] = n;
      }
    }
    for (const attr of STR_ATTRS) {
      if (this.hasAttribute(attr)) {
        options[toCamel(attr)] = this.getAttribute(attr);
      }
    }
    for (const attr of LEVEL_ATTRS) {
      if (this.hasAttribute(attr)) {
        const raw = this.getAttribute(attr) ?? "";
        const n = Number(raw);
        options[toCamel(attr)] = raw !== "" && !Number.isNaN(n) ? n : raw;
      }
    }

    return options as CRTOptions;
  }

  private render(): void {
    const { enabled, wrapper, inner, overlays } = computeCrt(this.readOptions());

    // Master toggle off: just project the content, no effect.
    if (!enabled) {
      this.mount.innerHTML = "<slot></slot>";
      return;
    }

    const innerStyle = inner.style
      ? ` style="${serializeStyle(inner.style)}"`
      : "";
    const overlayHtml = overlays
      .map((overlay) => `<div class="${overlay}"></div>`)
      .join("");

    this.mount.innerHTML =
      `<div class="${wrapper.className}" style="${serializeStyle(wrapper.style)}">` +
      `<div class="${inner.className}"${innerStyle}><slot></slot></div>` +
      overlayHtml +
      `</div>`;
  }
}

/** Register `<crt-effect>` (idempotent). Called automatically on import. */
export function defineCrtEffect(tag: string = CRT_EFFECT_TAG): void {
  if (typeof customElements !== "undefined" && !customElements.get(tag)) {
    customElements.define(tag, CRTEffectElement);
  }
}

defineCrtEffect();

export default CRTEffectElement;
