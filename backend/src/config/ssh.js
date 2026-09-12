import "dotenv/config";

const sshConfig = {
  host: process.env.VPS_HOST,
  port: Number(process.env.VPS_PORT || 22),
  username: process.env.VPS_USER,
  privateKeyPath: process.env.VPS_PRIVATE_KEY_PATH,
};

export default sshConfig;
