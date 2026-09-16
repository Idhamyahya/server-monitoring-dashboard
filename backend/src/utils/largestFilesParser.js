export function parseLargestFiles(output) {
  if (!output || !output.trim()) {
    return [];
  }
  const lines = output.trim().split("\n").filter(Boolean);
  return lines.map((line) => {
    const parts = line.trim().split(/\s+/);
    const size = parts[0];
    const path = parts.slice(1).join(" ");

    return { size, path };
  });
}
