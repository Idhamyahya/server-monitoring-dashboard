import { getDiskProcesses } from "../services/diskMonitorService.js";

export function createDiskMonitorController(diskService = getDiskProcesses) {
  return async function getDiskController(req, res) {
    try {
      const disk = await diskService();
      res.status(200).json({
        success: true,
        data: disk,
      });
    } catch (error) {
      console.error("Gagal mengambil penggunaan disk", error.message);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil penggunaan disk",
      });
    }
  };
}
export const getDiskController = createDiskMonitorController();
