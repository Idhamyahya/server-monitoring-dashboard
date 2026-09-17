import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import { createJavaMonitorRoutes } from "./routes/javaMonitoringRoutes.js";
import { getJavaProcesses } from "./services/javaMonitorService.js";
import { createPythonMonitorRoutes } from "./routes/pythonMonitorRoutes.js";
import { getPythonProcesses } from "./services/pyhtonMonitorService.js";
import { createDiskMonitorRoutes } from "./routes/diskMonitorRoutes.js";
import { getDiskProcesses } from "./services/diskMonitorService.js";
import { createLargestFilesRoutes } from "./routes/largestFileRoutes.js";
import { getLargestFile } from "./services/largestFilesService.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/monitor/java", createJavaMonitorRoutes(getJavaProcesses));
app.use("/api/monitor/python", createPythonMonitorRoutes(getPythonProcesses));
app.use("/api/monitor/disk", createDiskMonitorRoutes(getDiskProcesses));
app.use("/api/monitor/largestFile", createLargestFilesRoutes(getLargestFile));

export default app;
