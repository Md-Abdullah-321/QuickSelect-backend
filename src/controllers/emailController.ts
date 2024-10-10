/**
 * Title: Email Controller
 * Description: Handle Email controller for API.
 * Author: Md Abdullah
 * Date: 10/10/2024
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { isEmailDateInRange } from "../helper/compareDate.js";
import { getEmails } from "../helpers/getEmails.js";
import { IMAPConfigTypes } from "../Types/IMAPTypes.js";
import { errorResponse, successResponse } from "./responseController.js";
dotenv.config();
const prisma = new PrismaClient();

//01. Get All Emails
export const handleGetAllEmails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await (req as any).user;
    const imapConfig = await prisma.iMAP.findFirst({
      where: {
        userId: user.id,
      },
    });

    const config: IMAPConfigTypes = {
      imap: {
        user: (imapConfig as any).imapUser,
        password: (imapConfig as any).imapPassword,
        host: (imapConfig as any).host,
        port: Number((imapConfig as any).port),
        tls: Boolean((imapConfig as any).tls),
        tlsOptions: {
          rejectUnauthorized: false,
        },
        authTimeout: Number(process.env.AUTH_TIMEOUT),
      },
    };

    // Fetch emails from the IMAP server
    const emails = await getEmails(config, ["INBOX"], "ALL");

    const formattedEmails: any = [];
    emails.forEach((email: any) => {
      const name = email.from[0].split("<")[0];
      const from = email.from[0].split("<")[1].slice(0, -1);
      formattedEmails.push({
        sender: name,
        from,
        to: email.to[0],
        subject: email.subject[0],
        date: email.date[0],
      });
    });

    // Respond with the fetched emails
    return successResponse(res, {
      statusCode: 200,
      message: "Emails fetched successfully",
      payload: formattedEmails,
    });
  } catch (error) {
    next(error);
  }
};

//02. Get Email By Date

export const handleGetEmailByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fromDate, toDate } = req.body;
    if (!fromDate || !toDate) {
      return errorResponse(res, {
        statusCode: 400,
        message: "From and To dates are required!",
      });
    }
    const user = await (req as any).user;
    const imapConfig = await prisma.iMAP.findFirst({
      where: {
        userId: user.id,
      },
    });

    const config: IMAPConfigTypes = {
      imap: {
        user: (imapConfig as any).imapUser,
        password: (imapConfig as any).imapPassword,
        host: (imapConfig as any).host,
        port: Number((imapConfig as any).port),
        tls: Boolean((imapConfig as any).tls),
        tlsOptions: {
          rejectUnauthorized: false,
        },
        authTimeout: Number(process.env.AUTH_TIMEOUT),
      },
    };

    // Fetch emails from the IMAP server
    const emails = await getEmails(config, ["INBOX"], "ALL");

    const formattedEmails: any = [];
    emails.forEach((email: any) => {
      const name = email.from[0].split("<")[0];
      const from = email.from[0].split("<")[1].slice(0, -1);
      if (isEmailDateInRange(email.date[0], fromDate, toDate)) {
        formattedEmails.push({
          sender: name,
          from,
          to: email.to[0],
          subject: email.subject[0],
          date: email.date[0],
        });
      }
    });

    // Respond with the fetched emails
    return successResponse(res, {
      statusCode: 200,
      message: "Emails fetched successfully",
      payload: formattedEmails,
    });
  } catch (error) {
    next(error);
  }
};
