import test from "node:test";
import assert from "node:assert";

import { createJavaMonitorController } from "../../../controllers/javaMonitorController.js";

test("controller java harus mengembalikan data process", async () => {
  const mockServices = async () => [
    {
      user: "root",
      pid: 1234,
      cpu: "2.1",
      memory: "4.2",
      command: "java -jar app.jar",
    },
  ];

  const controller = createJavaMonitorController(mockServices);
  const req = {};
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
  await controller(req, res);
  assert.strictEqual(res.statusCode, 200);
  assert.deepStrictEqual(res.body, {
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

test("controller Java harus mengembalikan status 500 jika service gagal", async () => {
  const mockJavaService = async () => {
    throw new Error("SSH connection failed");
  };

  const controller = createJavaMonitorController(mockJavaService);
  const req = {};
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
  await controller(req, res);
  assert.strictEqual(res.statusCode, 500);
  assert.deepStrictEqual(res.body, {
    success: false,
    message: "Gagal mengambil proses java",
  });
});
