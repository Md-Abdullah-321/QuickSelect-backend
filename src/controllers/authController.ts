/**
 * Title: Auth Controller
 * Description: Handle Auth controller for API.
 * Author: Md Abdullah
 * Date: 09/10/2024
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "./responseController.js";
const prisma = new PrismaClient();
dotenv.config();

// 01. Register User:
export const handleRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    if (!name || !email || !phoneNumber || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required!",
      });
    }

    const existUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });

    if (existUser) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User already exists!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      },
    });
    return successResponse(res, {
      statusCode: 201,
      message: "User created successfully!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

// 02. Login User:
export const handleLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All fields are required!",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found!",
      });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User logged in successfully!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

//03. Logout User:
export const handleLogoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("accessToken");
    return successResponse(res, {
      statusCode: 200,
      message: "User logged out successfully!",
    });
  } catch (error) {
    next(error);
  }
};
