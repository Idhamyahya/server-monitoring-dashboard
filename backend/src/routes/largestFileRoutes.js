import express from "express";
import { createLargestFileController } from "../controllers/largestFileController.js";

export function createLargestFilesRoutes(largestFileService) {
  const router = express.Router();
  const controller = createLargestFileController(largestFileService);
  router.get("/", controller);

  return router;
}
