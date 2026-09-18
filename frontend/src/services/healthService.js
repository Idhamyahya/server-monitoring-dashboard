import { get } from "./apiClient.js";

export async function getHealth() {
  return get("/health");
}
