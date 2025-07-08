

import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", (req, res) => {
  authController.registerUser(req, res);
});

router.post("/login", (req, res) => {
  authController.loginUser(req, res);
});

export default router;
