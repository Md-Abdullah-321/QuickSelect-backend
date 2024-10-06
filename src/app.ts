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
