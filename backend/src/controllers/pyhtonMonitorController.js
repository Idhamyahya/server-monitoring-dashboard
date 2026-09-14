import { getPythonProcesses } from "../services/pyhtonMonitorService.js";

export function createPyhtonMonitorController(
  pythonService = getPythonProcesses,
) {
  return async function getPythonProcessesController(req, res) {
    try {
      const process = await pythonService();
      res.status(200).json({
        success: true,
        data: process,
      });
    } catch (error) {
      console.error("Gagal mengambil prose python", error.message);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil proses python",
      });
    }
  };
}
export const getPyhtonProcessesController = createPyhtonMonitorController();
