/**
 * Title: Auth routers
 * Description: Handle Auth routers for API.
 * Author: Md Abdullah
 * Date: 09/10/2024
 */

import express from "express";
import {
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
} from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/signup", handleRegisterUser);
authRouter.post("/signin", handleLoginUser);
authRouter.get("/signout", handleLogoutUser);

export default authRouter;
