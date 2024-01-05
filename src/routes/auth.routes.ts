import { Router } from "express";

import AuthController from "../controllers/auth.controller";

const authManager = new AuthController();

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const user = await authManager.register(req.body);
    res.status(200).json({
      success: true,
      error: null,
      data: user,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const user = await authManager.login(req.body);
    res.status(200).json({
      success: true,
      error: null,
      data: user,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

export default authRouter;
