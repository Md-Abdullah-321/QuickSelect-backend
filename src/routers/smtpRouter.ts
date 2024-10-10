/**
 * Title: SMTP routers
 * Description: handle SMTP routers for API.
 * Author: Md Abdullah
 * Date: 10/10/2024
 */

import express from "express";
import {
  handleDeleteSMTPConfig,
  handleGetSMTPConfig,
  handlePostSMTPConfig,
  handleUpdateSMTPConfig,
} from "../controllers/smtpController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const smtpRouter = express.Router();

smtpRouter.post("/setup", isLoggedIn, handlePostSMTPConfig);
smtpRouter.put("/update", isLoggedIn, handleUpdateSMTPConfig);
smtpRouter.get("/", isLoggedIn, handleGetSMTPConfig);
smtpRouter.delete("/", isLoggedIn, handleDeleteSMTPConfig);

export default smtpRouter;
