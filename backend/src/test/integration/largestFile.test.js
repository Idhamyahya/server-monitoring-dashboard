import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import express from "express";

import { createLargestFilesRoutes } from "../../routes/largestFileRoutes.js";
test("GET /api/monitor/largest-files harus mengembalikan file terbesar", async () => {
  const mockLargestFilesService = async () => [
    {
      size: "175G",
      path: "/",
    },
    {
      size: "134G",
      path: "/var/lib/mysql",
    },
  ];

  const app = express();

  app.use(
    "/api/monitor/largestFiles",
    createLargestFilesRoutes(mockLargestFilesService),
  );

  const response = await request(app).get("/api/monitor/largestFiles");

  assert.strictEqual(response.statusCode, 200);

  assert.deepStrictEqual(response.body, {
    success: true,
    data: [
      {
        size: "175G",
        path: "/",
      },
      {
        size: "134G",
        path: "/var/lib/mysql",
      },
    ],
  });
});

test("GET /api/monitor/largest-files harus mengembalikan 500 jika service gagal", async () => {
  const mockLargestFilesService = async () => {
    throw new Error("SSH failed");
  };

  const app = express();

  app.use(
    "/api/monitor/largestFiles",
    createLargestFilesRoutes(mockLargestFilesService),
  );

  const response = await request(app).get("/api/monitor/largestFiles");

  assert.strictEqual(response.statusCode, 500);

  assert.deepStrictEqual(response.body, {
    success: false,
    message: "Gagal mengambil file terbesar",
  });
});
