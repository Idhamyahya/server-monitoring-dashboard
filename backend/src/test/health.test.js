import test from "node:test";
import assert from "node:assert";
import request from "supertest";

import app from "../app.js";

test("GET /api/health harus mengembalikan status 200", async () => {
  const response = await request(app).get("/api/health");

  assert.strictEqual(response.statusCode, 200);
});

test("GET /api/health harus mengembalikan response yang benar", async () => {
  const response = await request(app).get("/api/health");

  assert.deepStrictEqual(response.body, {
    success: true,
    message: "Monitoring API is running",
  });
});
