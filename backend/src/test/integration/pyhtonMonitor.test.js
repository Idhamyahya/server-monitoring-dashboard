import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import express from "express";

import { createPythonMonitorRoutes } from "../../routes/pythonMonitorRoutes.js";
test("GET /api/monitor/python harus mengembalikan data Python", async () => {
  const mockPythonService = async () => [
    {
      user: "root",
      pid: 1671,
      cpu: "0.0",
      memory: "0.2",
      command: "/usr/bin/pyth",
    },
  ];

  const app = express();

  app.use("/api/monitor/python", createPythonMonitorRoutes(mockPythonService));

  const response = await request(app).get("/api/monitor/python");

  assert.strictEqual(response.statusCode, 200);

  assert.deepStrictEqual(response.body, {
    success: true,
    data: [
      {
        user: "root",
        pid: 1671,
        cpu: "0.0",
        memory: "0.2",
        command: "/usr/bin/pyth",
      },
    ],
  });
});

test("GET /api/monitor/python harus mengembalikan 500 jika service gagal", async () => {
  const mockPythonService = async () => {
    throw new Error("SSH failed");
  };

  const app = express();

  app.use("/api/monitor/python", createPythonMonitorRoutes(mockPythonService));

  const response = await request(app).get("/api/monitor/python");

  assert.strictEqual(response.statusCode, 500);

  assert.deepStrictEqual(response.body, {
    success: false,
    message: "Gagal mengambil proses python",
  });
});
