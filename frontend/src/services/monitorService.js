import { get } from "./apiClient.js";

export async function getJavaProcess() {
  return get("/monitor/java");
}

export async function getPythonProcess() {
  return get("/monitor/python");
}
