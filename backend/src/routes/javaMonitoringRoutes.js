import express from "express";
import { createJavaMonitorController } from "../controllers/javaMonitorController.js";

export function createJavaMonitorRoutes(javaService) {
  const router = express.Router();
  const controller = createJavaMonitorController(javaService);

  router.get("/", controller);

  return router;
}
