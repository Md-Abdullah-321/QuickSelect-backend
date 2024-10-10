/**
 * Title:
 * Description:
 * Author: Md Abdullah
 * Date: 22/08/2024
 */

import "dotenv/config";
import nodemailer, { Transporter } from "nodemailer";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

export const sendEmail = (
  name: string,
  host: string,
  port: number,
  password: string,
  email: string,
  subject: string,
  text: string
): Promise<EmailResponse> => {
  const mailOptions: MailOptions = {
    from: name,
    to: email,
    subject: subject,
    html: text,
  };

  const transporter: Transporter = nodemailer.createTransport({
    name: name,
    host: host,
    port,
    secure: true,
    auth: {
      user: name,
      pass: password,
    },
    socketTimeout: parseInt(process.env.SOCKET_TIMEOUT as string),
    connectionTimeout: parseInt(process.env.CONNECTION_TIMEOUT as string),
    logger: true,
    debug: true,
  });

  return new Promise<EmailResponse>((resolve) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred:", error);
        resolve({
          success: false,
          message: "Failed to send email",
        });
      } else {
        console.log("Email sent:", info.response);
        resolve({
          success: true,
          message: "Email sent successfully",
        });
      }
    });
  });
};
