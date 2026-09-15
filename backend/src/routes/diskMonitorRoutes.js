import { createDiskMonitorController } from "../controllers/diskController.js";
import express from "express";

export function createDiskMonitorRoutes(diskService) {
  const router = express.Router();
  const controller = createDiskMonitorController(diskService);

  router.get("/", controller);

  return router;
}
