import { executeCommand } from "./sshService.js";
import { serverCommands } from "../commands/serverCommands.js";
import { parseLargestFiles } from "../utils/largestFilesParser.js";

export async function getLargestFile(commandExecutor = executeCommand) {
  const output = await commandExecutor(serverCommands.largestFiles);

  return parseLargestFiles(output);
}
