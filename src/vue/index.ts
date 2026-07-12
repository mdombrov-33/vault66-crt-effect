import { defineComponent, h, type PropType } from "vue";
import { computeCrt, type CRTOptions } from "../core";

type Level = "low" | "medium" | "high" | number;

/**
 * Every prop defaults to `undefined` (never `false`/`0`) so that options the
 * user doesn't set fall through to the preset and built-in defaults. Vue would
 * otherwise coerce absent Boolean props to `false` and override the preset.
 */
const CRTEffect = defineComponent({
  name: "CRTEffect",
  props: {
    preset: { type: String as PropType<CRTOptions["preset"]>, default: undefined },
    enabled: { type: Boolean, default: undefined },
    fill: { type: Boolean, default: undefined },
    theme: {
      type: String as PropType<CRTOptions["theme"]>,
      default: undefined,
    },
    sweepDuration: { type: Number, default: undefined },
    sweepThickness: { type: Number, default: undefined },
    sweepStyle: {
      type: String as PropType<CRTOptions["sweepStyle"]>,
      default: undefined,
    },
    scanlineOpacity: { type: Number, default: undefined },
    scanlineColor: { type: String, default: undefined },
    scanlineThickness: { type: Number, default: undefined },
    scanlineGap: { type: Number, default: undefined },
    scanlineOrientation: {
      type: String as PropType<CRTOptions["scanlineOrientation"]>,
      default: undefined,
    },
    enableScanlines: { type: Boolean, default: undefined },
    enableSweep: { type: Boolean, default: undefined },
    enableGlow: { type: Boolean, default: undefined },
    glowColor: { type: String, default: undefined },
    enableEdgeGlow: { type: Boolean, default: undefined },
    edgeGlowColor: { type: String, default: undefined },
    edgeGlowSize: { type: Number, default: undefined },
    enableFlicker: { type: Boolean, default: undefined },
    flickerIntensity: {
      type: [String, Number] as PropType<Level>,
      default: undefined,
    },
    flickerSpeed: {
      type: [String, Number] as PropType<Level>,
      default: undefined,
    },
    enableGlitch: { type: Boolean, default: undefined },
    glitchIntensity: {
      type: [String, Number] as PropType<Level>,
      default: undefined,
    },
    glitchSpeed: {
      type: [String, Number] as PropType<Level>,
      default: undefined,
    },
    glitchChromatic: { type: Boolean, default: undefined },
    enableVignette: { type: Boolean, default: undefined },
    vignetteIntensity: { type: Number, default: undefined },
    enableCurvature: { type: Boolean, default: undefined },
    curvatureIntensity: { type: Number, default: undefined },
    enableGlare: { type: Boolean, default: undefined },
    glareIntensity: { type: Number, default: undefined },
    enableNoise: { type: Boolean, default: undefined },
    noiseOpacity: { type: Number, default: undefined },
    tintText: { type: Boolean, default: undefined },
    textColor: { type: String, default: undefined },
    sweepColor: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const { enabled, wrapper, inner, overlays } = computeCrt(
        props as CRTOptions,
      );

      // Master toggle off: render slot content untouched.
      if (!enabled) return slots.default?.();

      return h("div", { class: wrapper.className, style: wrapper.style }, [
        h("div", { class: inner.className, style: inner.style }, slots.default?.()),
        ...overlays.map((overlay) => h("div", { class: overlay })),
      ]);
    };
  },
});

export default CRTEffect;
export { CRTEffect };
