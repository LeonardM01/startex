import { Router } from "express";
import * as exampleController from "../controllers/controller-example.js";

const router = Router();

// Basic example route
router.get("/", exampleController.exampleFunction);

// User routes
router.get("/users", exampleController.getUsers);
router.post("/users", exampleController.createUser);
router.get("/users/:id", exampleController.getUserById);

export default router;
