import test from "node:test";
import assert from "node:assert";

import { getPythonProcesses } from "../../../services/pyhtonMonitorService.js";

test("service Python harus mengambil dan memparse process Python", async () => {
  const mockCommandExecutor = async (command) => {
    assert.strictEqual(command, "ps aux | grep '[p]ython'");

    return "root 1671  0.0  0.2 285032 40228 ?  Ssl  Feb09 0:02 /usr/bin/pyth   ";
  };

  const result = await getPythonProcesses(mockCommandExecutor);

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

test("service Python harus mengembalikan array kosong jika tidak ada process", async () => {
  const mockCommandExecutor = async () => "";

  const result = await getPythonProcesses(mockCommandExecutor);

  assert.deepStrictEqual(result, []);
});
