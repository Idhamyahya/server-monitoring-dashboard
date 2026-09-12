import { Client } from "ssh2";
import fs from "node:fs/promises";

import sshConfig from "../config/ssh.js";

export async function createSSHClient() {
  const privateKey = await fs.readFile(sshConfig.privateKeyPath, "utf8");

  return {
    client: new Client(),
    privateKey,
  };
}
