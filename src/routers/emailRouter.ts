/**
 * Title: Query routers
 * Description: Handle query routers for API.
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

import express from "express";
import { handleGetEmails } from "../controllers/emailController.js";

const emailRouter = express.Router();

// Define the route and attach the handler
emailRouter.post("/", handleGetEmails);

export default emailRouter;
