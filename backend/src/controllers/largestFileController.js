import { getLargestFile } from "../services/largestFilesService.js";

export function createLargestFileController(
  largestFileService = getLargestFile,
) {
  return async function getLargestFileController(req, res) {
    try {
      const file = await largestFileService();
      res.status(200).json({
        success: true,
        data: file,
      });
    } catch (error) {
      console.error("Gagal mengambil file terbesar", error.message);
      res.status(500).json({
        success: false,
        message: "Gagal mengambil file terbesar",
      });
    }
  };
}
export const getLargestFilesController = createLargestFileController();
