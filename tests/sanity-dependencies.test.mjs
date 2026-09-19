import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// Exercise the APIs used by CLI packages whose vulnerable pins we override.
test("Sanity CLI TypeIDs retain UUID generation and round-trip compatibility", () => {
  const { typeid, TypeID } = require("typeid-js");
  const ids = new Set();
  for (let i = 0; i < 100; i++) {
    const id = typeid("test");
    assert.equal(TypeID.fromUUID("test", id.toUUID()).toString(), id.toString());
    assert.equal(TypeID.fromString(id.toString()).toUUID(), id.toUUID());
    ids.add(id.toString());
  }
  assert.equal(ids.size, 100);
});

test("framework detection dependencies still parse YAML and TOML", () => {
  const scoped = createRequire(require.resolve("@vercel/frameworks/package.json"));
  assert.equal(scoped("js-yaml").safeLoad("framework: nextjs").framework, "nextjs");
  assert.equal(scoped("smol-toml").parse('framework = "nextjs"').framework, "nextjs");
});

test("module federation dependency can create and read ZIP archives", () => {
  const scoped = createRequire(require.resolve("@module-federation/dts-plugin/package.json"));
  const Zip = scoped("adm-zip");
  const archive = new Zip();
  archive.addFile("types/index.d.ts", Buffer.from("export type Example = string;"));
  assert.equal(new Zip(archive.toBuffer()).readAsText("types/index.d.ts"), "export type Example = string;");
});
