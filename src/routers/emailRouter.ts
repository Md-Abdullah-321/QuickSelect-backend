/**
 * Title: Email routers
 * Description: Handle Email routers for API.
 * Author: Md Abdullah
 * Date: 10/10/2024
 */

import express from "express";
import {
  handleGetAllEmails,
  handleGetEmailByDate,
} from "../controllers/emailController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const emailRouter = express.Router();

emailRouter.get("/search", isLoggedIn, handleGetEmailByDate);
emailRouter.get("/", isLoggedIn, handleGetAllEmails);

export default emailRouter;
