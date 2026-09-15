import test from "node:test";
import assert from "node:assert";

import { createDiskMonitorController } from "../../../controllers/diskController.js";
test("controller disk harus mengembalikan data penggunaan disk", async () => {
  const mockDiskService = async () => ({
    filesystem: "/dev/sda1",
    size: "200G",
    used: "168G",
    available: "33G",
    usePercent: 84,
    mountedon: "/",
  });

  const controller = createDiskMonitorController(mockDiskService);

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
      filesystem: "/dev/sda1",
      size: "200G",
      used: "168G",
      available: "33G",
      usePercent: 84,
      mountedon: "/",
    },
  });
});

test("controller disk harus mengembalikan status 500 jika service gagal", async () => {
  const mockDiskService = async () => {
    throw new Error("SSH connection failed");
  };

  const controller = createDiskMonitorController(mockDiskService);

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
    message: "Gagal mengambil penggunaan disk",
  });
});
