const API_URL = import.meta.env.VITE_API_URL;

export async function get(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Request gagal dengan status ${response.status}`);
  }
  return response.json();
}
