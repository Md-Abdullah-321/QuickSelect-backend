/**
 * Title: Is Logged In
 * Description: Check if user is logged in or not
 * Author: Md Abdullah
 * Date: 10/10/2024
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../controllers/responseController.js";
const prisma = new PrismaClient();
dotenv.config();

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Please login first!",
      });
    }

    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY!);

    if (!decoded) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Please login first!",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: (decoded as any).userId,
      },
    });

    (req as any).user = user;

    next();
  } catch (error) {
    next(error);
  }
};
