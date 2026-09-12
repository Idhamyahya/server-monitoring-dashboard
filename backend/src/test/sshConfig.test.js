import test from "node:test";
import assert from "node:assert";

test("SSH configuration harus memiliki port default 22", () => {
  const port = Number(process.env.VPS_PORT || 22);

  assert.strictEqual(port, 22);
});
