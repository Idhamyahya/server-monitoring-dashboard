import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import express from "express";

import { createJavaMonitorRoutes } from "../../routes/javaMonitoringRoutes.js";

test("GET /api/monitor/java harus mengembalikan data Java", async () => {
  const mockJavaService = async () => [
    {
      user: "root",
      pid: 1234,
      cpu: "2.1",
      memory: "4.2",
      command: "java -jar app.jar",
    },
  ];

  const app = express();

  app.use("/api/monitor/java", createJavaMonitorRoutes(mockJavaService));

  const response = await request(app).get("/api/monitor/java");

  assert.strictEqual(response.statusCode, 200);

  assert.deepStrictEqual(response.body, {
    success: true,
    data: [
      {
        user: "root",
        pid: 1234,
        cpu: "2.1",
        memory: "4.2",
        command: "java -jar app.jar",
      },
    ],
  });
});
test("GET /api/monitor/java harus mengembalikan 500 jika service gagal", async () => {
  const mockJavaService = async () => {
    throw new Error("SSH failed");
  };

  const app = express();

  app.use("/api/monitor/java", createJavaMonitorRoutes(mockJavaService));

  const response = await request(app).get("/api/monitor/java");

  assert.strictEqual(response.statusCode, 500);

  assert.deepStrictEqual(response.body, {
    success: false,
    message: "Gagal mengambil proses java",
  });
});
