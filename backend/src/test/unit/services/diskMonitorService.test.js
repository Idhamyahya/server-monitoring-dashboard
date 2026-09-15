import test from "node:test";
import assert from "node:assert";

import { getDiskProcesses } from "../../../services/diskMonitorService.js";

test("service disk harus mengembill dan memproses penggunaan disk", async () => {
  const mockCommandExecutor = async (command) => {
    assert.strictEqual(command, "df -h /");

    return `Filesystem      Size  Used Avail Use% Mounted on
  /dev/sda1       200G  168G   33G  84% /`;
  };
  const result = await getDiskProcesses(mockCommandExecutor);
  assert.deepStrictEqual(
    result,

    {
      filesystem: "/dev/sda1",
      size: "200G",
      used: "168G",
      available: "33G",
      usePercent: 84,
      mountedon: "/",
    },
  );
});

test("service disk harus mengembalikan null jika output kosong", async () => {
  const mockCommandExecutor = async () => "";
  const result = await getDiskProcesses(mockCommandExecutor);
  assert.strictEqual(result, null);
});
