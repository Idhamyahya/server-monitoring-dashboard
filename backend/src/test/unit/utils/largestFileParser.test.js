import test from "node:test";
import assert from "node:assert";
import { parseLargestFiles } from "../../../utils/largestFilesParser.js";

test("parser largest files harus mengubah output menjadi object array", () => {
  const output = `
    175G    /
    134G    /var/lib/mysql
    134G    /var/lib
    `;

  const result = parseLargestFiles(output);

  assert.deepStrictEqual(result, [
    {
      size: "175G",
      path: "/",
    },
    {
      size: "134G",
      path: "/var/lib/mysql",
    },
    {
      size: "134G",
      path: "/var/lib",
    },
  ]);
});

test("test parser harus mengembalikan nilai array kosong jika input kosong", () => {
  const result = parseLargestFiles(" ");
  assert.deepStrictEqual(result, []);
});

test("test parser largest files harus mengembalikan path yang memiliki spasi", () => {
  const output = `119G    /var/lib/mysql/ais`;
  const result = parseLargestFiles(output);
  assert.deepStrictEqual(result, [
    {
      size: "119G",
      path: "/var/lib/mysql/ais",
    },
  ]);
});
