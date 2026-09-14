import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import { createJavaMonitorRoutes } from "./routes/javaMonitoringRoutes.js";
import { getJavaProcesses } from "./services/javaMonitorService.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/monitor/java", createJavaMonitorRoutes(getJavaProcesses));

export default app;
