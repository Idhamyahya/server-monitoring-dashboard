import { Client } from "ssh2";
import fs from "node:fs/promises";

import sshConfig from "../config/ssh.js";

export async function executeCommand(command) {
  const privateKey = await fs.readFile(sshConfig.privateKeyPath, "utf8");

  return new Promise((resolve, reject) => {
    const client = new Client();

    client
      .on("ready", () => {
        client.exec(command, (error, stream) => {
          if (error) {
            client.end();
            reject(error);
            return;
          }

          let stdout = "";
          let stderr = "";

          stream.on("data", (data) => {
            stdout += data.toString();
          });

          stream.stderr.on("data", (data) => {
            stderr += data.toString();
          });

          stream.on("close", (code) => {
            client.end();

            if (code !== 0) {
              reject(new Error(stderr || `Command failed with code ${code}`));
              return;
            }

            resolve(stdout.trim());
          });
        });
      })
      .on("error", (error) => {
        reject(error);
      })
      .connect({
        host: sshConfig.host,
        port: sshConfig.port,
        username: sshConfig.username,
        privateKey,
      });
  });
}
