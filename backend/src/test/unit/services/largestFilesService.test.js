import test from "node:test";
import assert from "node:assert";
import { getLargestFile } from "../../../services/largestFilesService.js";

test("service largest files harus mengambil dan memparse file terbesar", async () => {
  const mockCommandExecutor = async (command) => {
    assert.ok(command.includes("du -ah /"));
    assert.ok(command.includes("head -n 10"));
    return `
      175G /
      134G /var/lib/mysql
      134G /var/lib
    `;
  };
  const result = await getLargestFile(mockCommandExecutor);
  assert.deepStrictEqual(result, [
    {
      size: "175G",
      path: "/",
    },
    {
      size: "134G",
      path: "/var/lib/mysql",
    },
    {
      size: "134G",
      path: "/var/lib",
    },
  ]);
});

test("service largest files harus mengembalikan array kosong jika tidak ada output", async () => {
  const mockCommandExecutor = async () => "";
  const result = await getLargestFile(mockCommandExecutor);

  assert.deepStrictEqual(result, []);
});
