// tsc preserves the source's bundler-style imports. Published declarations must
// also resolve under node16/nodenext, in both the import and require branches.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

function declarationFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return declarationFiles(path);
    return entry.name.endsWith(".d.ts") ? [path] : [];
  });
}

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const declarations = new Map(
  declarationFiles(dist).map((file) => [file, readFileSync(file, "utf8")]),
);

function prepare(file, source, extension) {
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const edits = [];

  function rewriteSpecifier(literal) {
    const specifier = literal.text;
    if (!/^\.{1,2}(\/|$)/.test(specifier)) return;

    const path = resolve(dirname(file), specifier);
    const target = [
      path.replace(/\.js$/, "") + ".d.ts",
      join(path, "index.d.ts"),
    ].find((candidate) => declarations.has(candidate));
    if (!target) {
      throw new Error(`Cannot resolve declaration import ${specifier} in ${file}`);
    }

    let replacement = relative(dirname(file), target)
      .replaceAll("\\", "/")
      .replace(/\.d\.ts$/, extension);
    if (!replacement.startsWith(".")) replacement = "./" + replacement;
    edits.push({
      start: literal.getStart(ast) + 1,
      end: literal.getEnd() - 1,
      replacement,
    });
  }

  function visit(node) {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      const literal = node.moduleSpecifier;
      if (literal && ts.isStringLiteral(literal)) {
        // Vite emits the stylesheet separately. It has no place in the type graph.
        if (ts.isImportDeclaration(node) && !node.importClause && /\.css$/.test(literal.text)) {
          const end = node.getEnd();
          edits.push({
            start: node.getStart(ast),
            end: end + (source.slice(end).match(/^\r?\n/)?.[0].length ?? 0),
            replacement: "",
          });
        } else {
          rewriteSpecifier(literal);
        }
      }
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) {
      // Inferred declarations can contain paths such as Vue's import("..").
      const literal = node.argument.literal;
      if (ts.isStringLiteral(literal)) rewriteSpecifier(literal);
    }
    ts.forEachChild(node, visit);
  }

  visit(ast);
  // Edit only import paths, preserving the rest of tsc's declaration output.
  for (const { start, end, replacement } of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, start) + replacement + source.slice(end);
  }
  return source;
}

for (const [file, source] of declarations) {
  writeFileSync(file, prepare(file, source, ".js"));
  // .cjs specifiers resolve to .d.cts, keeping CJS imports in the CJS type graph.
  writeFileSync(file.replace(/\.d\.ts$/, ".d.cts"), prepare(file, source, ".cjs"));
}
