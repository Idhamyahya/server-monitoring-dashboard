import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import express from "express";

import { createDiskMonitorRoutes } from "../../routes/diskMonitorRoutes.js";
test("GET /api/monitor/disk harus mengembalikan data disk", async () => {
  const mockDiskService = async () => ({
    filesystem: "/dev/sda1",
    size: "200G",
    used: "168G",
    available: "33G",
    usePercent: 84,
    mountedon: "/",
  });

  const app = express();

  app.use("/api/monitor/disk", createDiskMonitorRoutes(mockDiskService));

  const response = await request(app).get("/api/monitor/disk");

  assert.strictEqual(response.statusCode, 200);

  assert.deepStrictEqual(response.body, {
    success: true,
    data: {
      filesystem: "/dev/sda1",
      size: "200G",
      used: "168G",
      available: "33G",
      usePercent: 84,
      mountedon: "/",
    },
  });
});

test("GET /api/monitor/disk harus mengembalikan 500 jika service gagal", async () => {
  const mockDiskService = async () => {
    throw new Error("SSH failed");
  };

  const app = express();

  app.use("/api/monitor/disk", createDiskMonitorRoutes(mockDiskService));

  const response = await request(app).get("/api/monitor/disk");

  assert.strictEqual(response.statusCode, 500);

  assert.deepStrictEqual(response.body, {
    success: false,
    message: "Gagal mengambil penggunaan disk",
  });
});
