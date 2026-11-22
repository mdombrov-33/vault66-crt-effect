import CRTEffect, {
  presets,
  type CRTEffectProps,
  type PresetName,
} from "vault66-crt-effect";
import {
  computeCrt,
  presets as corePresets,
  type CRTOptions,
} from "vault66-crt-effect/core";
import VueEffect from "vault66-crt-effect/vue";
import {
  CRTEffectElement,
  defineCrtEffect,
} from "vault66-crt-effect/element";

const options: CRTOptions = { preset: "fallout", enabled: true };
const props: CRTEffectProps = { ...options, children: null };
const enabled: boolean = computeCrt(options).enabled;
const opacity: number | undefined = presets.fallout.scanlineOpacity;
const element: HTMLElement = new CRTEffectElement();
defineCrtEffect("test-crt-effect");

type VueProps = InstanceType<typeof VueEffect>["$props"];
const vueProps: VueProps = { preset: "fallout" };

// These must produce errors, including when skipLibCheck hides declaration errors.
// An unresolved export that becomes `any` leaves an unused @ts-expect-error.
// @ts-expect-error presets is an object, not a symbol
export const invalidPresets: symbol = presets;
// @ts-expect-error the React component is a function, not a symbol
export const invalidReact: symbol = CRTEffect;
// @ts-expect-error computeCrt is a function, not a symbol
export const invalidCompute: symbol = computeCrt;
// @ts-expect-error the core presets must retain their type too
export const invalidCorePresets: symbol = corePresets;
// @ts-expect-error nested preset properties must retain their types
export const invalidTheme: number = presets.fallout.theme;
// @ts-expect-error unknown presets are rejected
export const invalidName: PresetName = "unknown";
// @ts-expect-error React props retain their inherited option types
export const invalidProps: CRTEffectProps = { children: null, preset: "unknown" };
// @ts-expect-error computeCrt must validate its options
computeCrt({ preset: "unknown" });
// @ts-expect-error computeCrt must retain its return type
export const invalidResult: string = computeCrt().enabled;
// @ts-expect-error Vue props retain their inherited option types
export const invalidVueProps: VueProps = { preset: "unknown" };
// @ts-expect-error the custom element must retain its class type
export const invalidElement: symbol = CRTEffectElement;

export { props, enabled, opacity, element, vueProps };
