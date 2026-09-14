import { executeCommand } from "./sshService.js";
import { parseJavaProcess } from "../utils/javaParser.js";
import { serverCommands } from "../commands/serverCommands.js";

export async function getJavaProcesses(commandExecutor = executeCommand) {
  const output = await commandExecutor(serverCommands.java);

  return parseJavaProcess(output);
}
