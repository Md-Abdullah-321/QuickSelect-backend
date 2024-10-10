/**
 * Title: Query routers
 * Description: Handle query routers for API.
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

import express from "express";
import {
  handleDeleteIMAPConfig,
  handleGetIMAPConfig,
  handlePostIMAPConfig,
  handleUpdateIMAPConfig,
} from "../controllers/imapController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const imapRouter = express.Router();

// Define the route and attach the handler

// 01. Setup IMAP Config
imapRouter.post("/setup", isLoggedIn, handlePostIMAPConfig);
imapRouter.put("/update", isLoggedIn, handleUpdateIMAPConfig);
imapRouter.delete("/", isLoggedIn, handleDeleteIMAPConfig);
imapRouter.get("/", isLoggedIn, handleGetIMAPConfig);

export default imapRouter;
