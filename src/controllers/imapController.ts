/**
 * Title: Query controller
 * Description: Handle Query controller for API.
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "./responseController.js";
dotenv.config();
const prisma = new PrismaClient();

//01. Setup IMAP Config
export const handlePostIMAPConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hostingUser, password, host, port } = req.body;
    const user = (req as any).user;

    if (!hostingUser || !password || !host || !port) {
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

    if (!user || !user.id) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: User information is missing.",
      });
    }

    const isSetupConfig = await prisma.iMAP.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (isSetupConfig) {
      return errorResponse(res, {
        statusCode: 404,
        message: "IMAP configuration already setup.",
      });
    }

    const imapConfig = await prisma.iMAP.create({
      data: {
        imapUser: hostingUser,
        imapPassword: password,
        host,
        port,
        tls: true,
        authTimeout: parseInt(process.env.AUTH_TIMEOUT as string),
        userId: user.id,
      },
    });
    return successResponse(res, {
      statusCode: 200,
      message: "IMAP configuration setup successfully",
      payload: imapConfig,
    });
  } catch (error) {
    next(error);
  }
};

// 02. Get IMAP Config

export const handleGetIMAPConfig = async (
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

    const imapConfig = await prisma.iMAP.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!imapConfig) {
      return errorResponse(res, {
        statusCode: 404,
        message: "IMAP configuration not found.",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "IMAP configuration retrieved successfully",
      payload: imapConfig,
    });
  } catch (error) {
    next(error);
  }
};

//03. Update IMAP Config

export const handleUpdateIMAPConfig = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { hostingUser, password, host, port } = req.body;
    const user = (req as any).user;

    if (!hostingUser || !password || !host || !port) {
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

    if (!user || !user.id) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized: User information is missing.",
      });
    }
    const imapConfig = await prisma.iMAP.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!imapConfig) {
      return errorResponse(res, {
        statusCode: 404,
        message: "IMAP configuration not found.",
      });
    }

    // Update the existing IMAP configuration using its id
    const updatedIMAPConfig = await prisma.iMAP.update({
      where: {
        id: imapConfig.id,
      },
      data: {
        imapUser: hostingUser,
        imapPassword: password,
        host,
        port,
        tls: true,
        authTimeout: parseInt(process.env.AUTH_TIMEOUT as string),
      },
    });

    return successResponse(res, {
      statusCode: 200,
      message: "IMAP configuration updated successfully",
      payload: updatedIMAPConfig,
    });
  } catch (error) {
    next(error);
  }
};

// 04. Delete IMAP Config

export const handleDeleteIMAPConfig = async (
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

    const imapConfig = await prisma.iMAP.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!imapConfig) {
      return errorResponse(res, {
        statusCode: 404,
        message: "IMAP configuration not found.",
      });
    }

    // Delete the existing IMAP configuration using its id
    await prisma.iMAP.delete({
      where: {
        id: imapConfig.id,
      },
    });

    return successResponse(res, {
      statusCode: 200,
      message: "IMAP configuration deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
