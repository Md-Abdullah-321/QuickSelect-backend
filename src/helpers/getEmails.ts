/**
 * Title: Get Email
 * Description: Get Email using IMAP
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

import { IMAPConfigTypes } from "../Types/IMAPTypes";

import imaps from "imap-simple";

export const getEmails = async (
  config: IMAPConfigTypes,
  directory: string,
  criteria: string
) => {
  try {
    const connection = await imaps.connect(config);
    await connection.openBox(directory);

    const searchCriteria = [criteria];
    const fetchOptions = {
      bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
      struct: true,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (!messages.length) {
      console.log("No messages found.");
      return;
    }

    const body: any = [];
    messages.forEach((message: any) => {
      body.push(message.parts[0].body);
    });

    return body;
  } catch (err) {
    console.error("Error fetching emails:", err);
  }
};
