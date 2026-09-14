import test from "node:test";
import assert from "node:assert";

import { getJavaProcesses } from "../../../services/javaMonitorService.js";

test("service Java harus mengambil dan memparse process Java", async () => {
  const mockCommandExecutor = async (command) => {
    assert.strictEqual(command, "ps aux | grep '[j]ava'");

    return "root 1234 2.1 4.2 123456 345678 ? Sl Sep10 10:20 java -jar app.jar";
  };

  const result = await getJavaProcesses(mockCommandExecutor);

  assert.deepStrictEqual(result, [
    {
      user: "root",
      pid: 1234,
      cpu: "2.1",
      memory: "4.2",
      command: "java -jar app.jar",
    },
  ]);
});
