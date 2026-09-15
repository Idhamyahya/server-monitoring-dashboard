import { executeCommand } from "./sshService.js";
import { serverCommands } from "../commands/serverCommands.js";
import { parseDiskUsage } from "../utils/diskParser.js";

export async function getDiskProcesses(commandExecutor = executeCommand) {
  const output = await commandExecutor(serverCommands.disk);

  return parseDiskUsage(output);
}
