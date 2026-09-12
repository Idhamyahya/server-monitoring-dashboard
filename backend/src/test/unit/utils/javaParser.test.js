import assert from "node:assert";
import test from "node:test";
import { parseJavaProcess } from "../../../utils/javaParser.js";

test("parser Java harus mengubah output process menjadi object", () => {
  const output =
    "root 1234 2.1 4.2 123456 345678 ? Sl Sep10 10:20 java -jar app.jar";

  const result = parseJavaProcess(output);

  assert.deepStrictEqual(result, [
    {
      user: "root",
      pid: 1234,
      cpu: "2.1",
      memory: "4.2",
      command: "java -jar app.jar",
    },
  ]);
});
test("parser Java harus mengembalikan array kosong jika tidak ada process", () => {
  const result = parseJavaProcess("");

  assert.deepStrictEqual(result, []);
});
