import { config } from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";

config();

const domain = process.env.DOMAIN;

export const corsRules = cors({
  origin: domain,
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
});

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "Too many requests from this IP, please try again after 1 minute",
});
