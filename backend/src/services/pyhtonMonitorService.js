import { executeCommand } from "./sshService.js";
import { parsePythonProcesses } from "../utils/pythonParser.js";
import { serverCommands } from "../commands/serverCommands.js";
export async function getPythonProcesses(commandExecutetor = executeCommand) {
  const output = await commandExecutetor(serverCommands.python);
  return parsePythonProcesses(output);
}
