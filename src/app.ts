/**
 * Title: app.js
 * Description: Create server and return index to run it.
 * Author: Md Abdullah
 * Date: 03/10/2024
 */

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { errorResponse } from "./controllers/responseController.js";
import authRouter from "./routers/authRouter.js";
import emailRouter from "./routers/emailRouter.js";
import imapRouter from "./routers/imapRouter.js";
import smtpRouter from "./routers/smtpRouter.js";
const app = express();

//Handle Global Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Test API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to QuickSelect!",
  });
});

//Add All Routers
app.use("/api/email", emailRouter);
app.use("/api/imap", imapRouter);
app.use("/api/auth", authRouter);
app.use("/api/smtp", smtpRouter);

//Handle Global Middleware
const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorResponse(res, {
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error!",
  });

  return;
};
app.use(errorHandler);

export default app;
