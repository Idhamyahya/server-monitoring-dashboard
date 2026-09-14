import { getJavaProcesses } from "../services/javaMonitorService.js";

export function createJavaMonitorController(javaService = getJavaProcesses) {
  return async function getJavaProcessesController(req, res) {
    try {
      const process = await javaService();
      res.status(200).json({
        success: true,
        data: process,
      });
    } catch (error) {
      console.error("Gagal mengambil proses java : ", error.message);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil proses java",
      });
    }
  };
}
export const getJavaProcessesController = createJavaMonitorController();
