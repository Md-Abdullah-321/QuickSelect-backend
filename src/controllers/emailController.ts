/**
 * Title: Query controller
 * Description: Handle Query controller for API.
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

import { NextFunction, Request, Response } from "express";
import { getEmails } from "../helpers/getEmails.js";
import { IMAPConfigTypes } from "../Types/IMAPTypes.js";
import { errorResponse, successResponse } from "./responseController.js";

export const handleGetEmails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, password, host, port, tls, authTimeout } = req.body;

    if (!user || !password || !host || !port || !authTimeout) {
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

    if (typeof tls !== "boolean") {
      return errorResponse(res, {
        statusCode: 400,
        message: "TLS must be a boolean value.",
      });
    }

    const config: IMAPConfigTypes = {
      imap: {
        user,
        password,
        host,
        port: Number(port),
        tls: Boolean(tls),
        tlsOptions: {
          rejectUnauthorized: false,
        },
        authTimeout: Number(authTimeout),
      },
    };

    // Fetch emails from the IMAP server
    const emails = await getEmails(config, "INBOX", "ALL");

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
      message: "Success",
      payload: formattedEmails,
    });
  } catch (error) {
    next(error);
  }
};
