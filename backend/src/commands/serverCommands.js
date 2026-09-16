export const serverCommands = {
  java: "ps aux | grep '[j]ava'",
  python: "ps aux | grep '[p]ython'",
  hostname: "hostname",
  memory: "free -h",
  disk: "df -h /",
  uptime: "uptime",
  largestFiles: `du -ah / \
--exclude=/proc \
--exclude=/sys \
--exclude=/dev \
--exclude=/run \
2>/dev/null | sort -hr | head -n 10`,
};
