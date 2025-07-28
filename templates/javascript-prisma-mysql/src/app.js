import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import compression from "compression";

import { apiLimiter, corsRules } from "./configs/security.js";
import { morganMiddleware, winstonLogger } from "./configs/logging.js";
import exampleRouter from "./api/routes/router-example.js";

config();

const app = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(corsRules);
app.use(apiLimiter);
app.use(morganMiddleware);

// ROUTES
app.use("/api/v1/example", exampleRouter);

app.listen(port, () => {
  winstonLogger.info(
    `Server running on port ${port} in ${process.env.NODE_ENV} mode`
  );
});
