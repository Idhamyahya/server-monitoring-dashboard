import test from "node:test";
import assert from "node:assert/strict";

test("health API harus mengembalikan status OK", async () => {
  const response = await fetch("http://localhost:3000/api/health");

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.success, true);
  assert.equal(body.message, "Backend monitoring berjalan");
});
