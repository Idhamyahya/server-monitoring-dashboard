import test from "node:test";
import assert from "node:assert";
import { createLargestFileController } from "../../../controllers/largestFileController.js";

test("controller file largest harus mengembalikan data file terbesar", async () => {
  const mockCommandExecutor = async () => [
    {
      size: "175G",
      path: "/",
    },
    {
      size: "134G",
      path: "/var/lib/mysql",
    },
  ];
  const controller = createLargestFileController(mockCommandExecutor);

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

test("controller largest file harus mengembalikan status 500 jika service gagal", async () => {
  const mockLargestFileService = async () => {
    throw new error("SSH connection failed");
  };
  const controller = createLargestFileController(mockLargestFileService);

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
    message: "Gagal mengambil file terbesar",
  });
});
