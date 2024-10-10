/**
 * Title: SMTP Controller
 * Description: Handle SMTP controller for API.
 * Author: Md Abdullah
 * Date: 10/10/2024
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "./responseController.js";
dotenv.config();
const prisma = new PrismaClient();

//01. Post SMTP Config:
export const handlePostSMTPConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { host, port, email, password } = req.body;
    const user = (req as any).user;

    if (!user || !user.id) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: User information is missing.",
      });
    }

    if (!host || !port || !email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required!",
      });
    }

    if (isNaN(Number(port))) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Port must be a valid number.",
      });
    }

    const isExistSMTP = await prisma.sMTP.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (isExistSMTP) {
      return errorResponse(res, {
        statusCode: 400,
        message: "SMTP configuration already exists.",
      });
    }

    // Create a new SMTP configuration
    const smtp = await prisma.sMTP.create({
      data: {
        host,
        port,
        email,
        password,
        userId: user.id,
      },
    });

    return successResponse(res, {
      statusCode: 200,
      message: "SMTP configuration created successfully.",
      payload: smtp,
    });
  } catch (error) {
    next(error);
  }
};

//02. Get SMTP Config:
export const handleGetSMTPConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.id) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: User information is missing.",
      });
    }

    const smtp = await prisma.sMTP.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!smtp) {
      return errorResponse(res, {
        statusCode: 404,
        message: "SMTP configuration not found.",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "SMTP configuration retrieved successfully.",
      payload: smtp,
    });
  } catch (error) {
    next(error);
  }
};

//03. Update SMTP Config:
export const handleUpdateSMTPConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { host, port, email, password } = req.body;
    const user = (req as any).user;

    if (!user || !user.id) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: User information is missing.",
      });
    }

    if (!host || !port || !email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required!",
      });
    }

    if (isNaN(Number(port))) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Port must be a valid number.",
      });
    }

    const smtp = await prisma.sMTP.update({
      where: {
        userId: user.id,
      },
      data: {
        host,
        port,
        email,
        password,
      },
    });

    return successResponse(res, {
      statusCode: 200,
      message: "SMTP configuration updated successfully.",
      payload: smtp,
    });
  } catch (error) {
    next(error);
  }
};

//04. Delete SMTP Config:
export const handleDeleteSMTPConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;

    if (!user || !user.id) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: User information is missing.",
      });
    }

    const smtp = await prisma.sMTP.delete({
      where: {
        userId: user.id,
      },
    });

    return successResponse(res, {
      statusCode: 200,
      message: "SMTP configuration deleted successfully.",
      payload: smtp,
    });
  } catch (error) {
    next(error);
  }
};
