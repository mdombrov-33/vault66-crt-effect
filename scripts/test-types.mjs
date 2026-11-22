// Test the npm tarball as a consumer, rather than resolving back into src/.
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
// An optional compiler path lets the same fixtures run against other TS versions.
const compiler = resolve(process.argv[2] ?? join(root, "node_modules/typescript/bin/tsc"));
const temporary = mkdtempSync(join(tmpdir(), "vault66-types-"));

try {
  const packed = JSON.parse(execFileSync("npm", [
    "pack", "--json", "--ignore-scripts", "--pack-destination", temporary,
  ], {
    cwd: root,
    env: { ...process.env, npm_config_cache: join(temporary, "npm-cache") },
    encoding: "utf8",
  }));
  const modules = join(temporary, "node_modules");
  const packageRoot = join(modules, "vault66-crt-effect");
  mkdirSync(packageRoot, { recursive: true });
  execFileSync("tar", [
    "-xzf", join(temporary, packed[0].filename),
    "-C", packageRoot, "--strip-components=1",
  ]);

  // Reuse installed peers without a network install or a link to the source package.
  for (const dependency of ["react", "react-dom", "vue", "@types"]) {
    symlinkSync(join(root, "node_modules", dependency), join(modules, dependency), "junction");
  }
  const fixture = readFileSync(join(root, "tests/types/consumer.ts"), "utf8");
  const modes = [
    ["node16", "node16", ["mts", "cts"]],
    ["nodenext", "nodenext", ["mts", "cts"]],
    ["bundler", "esnext", ["mts"]],
  ];
  let failures = 0;
  const version = execFileSync(process.execPath, [compiler, "--version"], { encoding: "utf8" }).trim();
  console.log(`Checking packaged declarations with TypeScript ${version.replace(/^Version /, "")}`);
  for (const [moduleResolution, module, extensions] of modes) {
    for (const extension of extensions) {
      const file = join(temporary, `consumer.${extension}`);
      writeFileSync(file, fixture);
      for (const skipLibCheck of [true, false]) {
        const config = join(temporary, "tsconfig.json");
        writeFileSync(config, JSON.stringify({
          compilerOptions: {
            module,
            moduleResolution,
            target: "es2020",
            strict: true,
            noEmit: true,
            skipLibCheck,
            noUncheckedSideEffectImports: true,
            // Keep the consumer independent of ambient types in this checkout.
            typeRoots: [join(modules, "@types")],
          },
          files: [file],
        }));
        const result = spawnSync(process.execPath, [compiler, "-p", config, "--pretty", "false"], {
          cwd: temporary,
          encoding: "utf8",
        });
        if (result.error) throw result.error;
        const label = `${moduleResolution} .${extension} skipLibCheck=${skipLibCheck}`;
        console.log(`${result.status === 0 ? "PASS" : "FAIL"} ${label}`);
        if (result.status !== 0) {
          failures++;
          console.error(result.stdout + result.stderr);
        }
      }
    }
  }
  if (failures > 0) process.exitCode = 1;
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
