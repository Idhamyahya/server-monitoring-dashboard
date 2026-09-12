// import "dotenv/config";
// import fs from "fs";
// import { Client } from "ssh2";
// // console.log("HOST:", process.env.VPS_HOST);
// // console.log("USERNAME:", process.env.VPS_USER);
// // console.log("KEY PATH:", process.env.VPS_PRIVATE_KEY_PATH);

// const privateKey = fs.readFileSync(process.env.VPS_PRIVATE_KEY_PATH);

// const conn = new Client();

// conn.on("ready", () => {
//   console.log("SSH BERHASIL!");

//   conn.exec("ps aux | grep java", (err, stream) => {
//     if (err) {
//       console.error(err);
//       return;
//     }

//     stream.on("data", (data) => {
//       console.log(data.toString());
//     });

//     stream.on("close", () => {
//       conn.end();
//     });
//   });
// });

// conn.on("error", (err) => {
//   console.error("SSH ERROR:", err);
// });

// conn.connect({
//   host: process.env.VPS_HOST,
//   port: Number(process.env.VPS_PORT),
//   username: process.env.VPS_USER,
//   privateKey,
// });
import "dotenv/config";

import { executeCommand } from "../services/sshService.js";

try {
  const result = await executeCommand("hostname");

  console.log("SSH berhasil");
  console.log("Hostname:", result);

  const uptime = await executeCommand("uptime");
  console.log("uptime");
  console.log(uptime);
} catch (error) {
  console.error("SSH gagal");
  console.error(error.message);
}
