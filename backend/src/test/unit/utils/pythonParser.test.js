import test from "node:test";
import assert from "node:assert";

import { parsePythonProcesses } from "../../../utils/pythonParser.js";

test("parse python harus mengubah output proses menjadi object", () => {
  const output =
    "root        1671  0.0  0.2 285032 40228 ?        Ssl  Feb09   0:02 /usr/bin/pyth   ";
  const result = parsePythonProcesses(output);

  assert.deepStrictEqual(result, [
    {
      user: "root",
      pid: 1671,
      cpu: "0.0",
      memory: "0.2",
      command: "/usr/bin/pyth",
    },
  ]);
});

test("Parser harus mengembalikan array kosong jika tidak ada proses", () => {
  const result = parsePythonProcesses();
  assert.deepStrictEqual(result, []);
});
