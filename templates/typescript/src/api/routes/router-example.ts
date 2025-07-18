import { Router } from "express";
import * as exampleController from "../controllers/controller-example";

const router = Router();

router.get("/", exampleController.exampleFunction);

export default router;
