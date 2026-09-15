export function parseDiskUsage(output) {
  if (!output || typeof output !== "string" || !output.trim()) {
    return null;
  }

  const lines = output.trim().split("\n").filter(Boolean);

  if (lines.length < 2) {
    return null;
  }

  const parts = lines[1].trim().split(/\s+/);

  if (parts.length < 6) {
    return null;
  }

  const filesystem = parts[0];
  const size = parts[1];
  const used = parts[2];
  const available = parts[3];
  const usePercent = Number(parts[4].replace("%", ""));
  const mountedon = parts.slice(5).join(" ");

  return {
    filesystem,
    size,
    used,
    available,
    usePercent,
    mountedon,
  };
}
