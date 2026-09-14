import express from "express";
import { createPyhtonMonitorController } from "../controllers/pyhtonMonitorController.js";

export function createPythonMonitorRoutes(pythonService) {
  const router = express.Router();
  const controller = createPyhtonMonitorController(pythonService);

  router.get("/", controller);

  return router;
}
