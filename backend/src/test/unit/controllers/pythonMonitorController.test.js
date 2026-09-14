import test from "node:test";
import assert from "node:assert";
import { createPyhtonMonitorController } from "../../../controllers/pyhtonMonitorController.js";

test("controller pyhton harus mengembalikan data proses", async () => {
  const mockPythonService = async () => ({
    user: "root",
    pid: 1671,
    cpu: "0.0",
    memory: "0.2",
    command: "/usr/bin/pyth",
  });
  const controller = createPyhtonMonitorController(mockPythonService);
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
    data: {
      user: "root",
      pid: 1671,
      cpu: "0.0",
      memory: "0.2",
      command: "/usr/bin/pyth",
    },
  });
});

test("controller Python harus mengembalikan status 500 jika service gagal", async () => {
  const mockPythonService = async () => {
    throw new Error("SSH connection failed");
  };

  const controller = createPyhtonMonitorController(mockPythonService);

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
    message: "Gagal mengambil proses python",
  });
});
