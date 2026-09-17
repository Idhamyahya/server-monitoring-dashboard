import test from "node:test";
import assert from "node:assert";

import { parseDiskUsage } from "../../../utils/diskParser.js";

test("parser disk harus mengubah output df menjadi object", () => {
  const output = `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       200G  168G   33G  84% /`;

  const result = parseDiskUsage(output);

  assert.deepStrictEqual(result, {
    filesystem: "/dev/sda1",
    size: "200G",
    used: "168G",
    available: "33G",
    usePercent: 84,
    mountedon: "/",
  });
});

test("test parser harus mengembalikan nilai null jika output kosong", () => {
  const result = parseDiskUsage("");

  assert.deepStrictEqual(result, null);
});

test("test parser harus mengembalikan null jika output tidak lengkap", () => {
  const output = `Filesystem      Size  Used
/dev/sda1       200G  168G`;

  const result = parseDiskUsage(output);

  assert.deepStrictEqual(result, null);
});
test("parser disk harus mengembalikan null jika output hanya whitespace", () => {
  const result = parseDiskUsage("   \n   ");

  assert.strictEqual(result, null);
});
