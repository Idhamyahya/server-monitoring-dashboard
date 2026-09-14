import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import { createJavaMonitorRoutes } from "./routes/javaMonitoringRoutes.js";
import { getJavaProcesses } from "./services/javaMonitorService.js";
import { createPythonMonitorRoutes } from "./routes/pythonMonitorRoutes.js";
import { getPythonProcesses } from "./services/pyhtonMonitorService.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/monitor/java", createJavaMonitorRoutes(getJavaProcesses));
app.use("/api/monitor/python", createPythonMonitorRoutes(getPythonProcesses));

export default app;
