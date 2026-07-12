<script setup lang="ts">
import CRTEffect from "../../src/vue";
import type { PresetName } from "../../src/core";
import "../../src/style.css";

const presets: PresetName[] = [
  "fallout",
  "dos",
  "cyberpunk",
  "arcade",
  "commodore64",
  "apple2",
  "vt100",
  "minimal",
];
</script>

<template>
  <div class="page">
    <h1>vault66-crt-effect · Vue</h1>

    <h2>fill</h2>
    <div class="row">
      <div class="frame">
        <p class="label">default (sizes to content)</p>
        <CRTEffect preset="fallout">
          <div class="content">sizes to content</div>
        </CRTEffect>
      </div>
      <div class="frame">
        <p class="label">fill</p>
        <CRTEffect preset="fallout" fill>
          <div class="content contentFill">fills the parent</div>
        </CRTEffect>
      </div>
    </div>

    <h2>presets</h2>
    <div class="grid">
      <CRTEffect v-for="preset in presets" :key="preset" :preset="preset">
        <div class="preset">
          <strong>{{ preset }}</strong>
        </div>
      </CRTEffect>
    </div>
  </div>
</template>

<style>
.page {
  padding: 32px;
  background: #181818;
  min-height: 100vh;
  color: #e8e8e8;
  font-family: system-ui, sans-serif;
}
h1 {
  font-weight: 600;
}
h2 {
  margin-top: 40px;
  color: #8bd3a8;
}
.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.frame {
  flex: 1;
  min-width: 240px;
  height: 220px;
  border: 1px dashed #555;
}
.label {
  margin: 4px 8px;
  color: #888;
  font-size: 13px;
}
.content {
  background: #0a1a0f;
  color: #5bb387;
  padding: 16px;
}
.contentFill {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}
.preset {
  background: #000;
  color: #fff;
  padding: 24px;
  min-height: 120px;
  display: flex;
  align-items: flex-end;
}
</style>
