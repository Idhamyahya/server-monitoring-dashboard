export const parseJavaProcess = (output) => {
  if (!output || !output.trim()) {
    return [];
  }
  const lines = output.trim().split("\n").filter(Boolean);

  return lines.map((line) => {
    const parts = line.trim().split(/\s+/);

    const user = parts[0];
    const pid = Number(parts[1]);
    const cpu = parts[2];
    const memory = parts[3];

    const command = parts.slice(10).join(" ");
    return {
      user,
      pid,
      cpu,
      memory,
      command,
    };
  });
};
