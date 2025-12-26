import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import "dotenv/config";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import notFoundHandler from "../src/middlewares/notFoundHandler.js";
import errorHandler from "../src/middlewares/errorHandler.js";
import userRoutes from "../src/routes/userRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
global.__template = `${__dirname}/mail/templates`;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/", authRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
