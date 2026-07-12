// tsc emits ESM-flavored `.d.ts` declarations (the package is `"type": "module"`).
// The CommonJS `require` export condition needs CommonJS-flavored declarations, or
// node16/nodenext CJS consumers get false TS1479 "cannot require an ES module" errors.
// The declaration *content* is identical, so we just copy each `.d.ts` to `.d.cts`.
import { readdirSync, copyFileSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".d.ts")) {
      copyFileSync(full, full.replace(/\.d\.ts$/, ".d.cts"));
    }
  }
}

walk("dist");
