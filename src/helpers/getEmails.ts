/**
 * Title: Get Email
 * Description: Get Email using IMAP
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

import imaps from "imap-simple";
import { IMAPConfigTypes } from "../Types/IMAPTypes";

// Helper function to fetch emails from a specific directory
const fetchEmailsFromFolder = async (
  connection: any,
  directory: string,
  criteria: string
) => {
  try {
    await connection.openBox(directory);

    const searchCriteria = [criteria];
    const fetchOptions = {
      bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
      struct: true,
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    return messages;
  } catch (err) {
    console.error(`Error fetching emails from ${directory}:`, err);
    return [];
  }
};

// Main function to get emails from multiple folders
export const getEmails = async (
  config: IMAPConfigTypes,
  directories: string[],
  criteria: string
) => {
  try {
    const connection = await imaps.connect(config);

    // Aggregate emails from all directories
    const allEmails: any[] = [];
    for (const directory of directories) {
      const emailsFromFolder = await fetchEmailsFromFolder(
        connection,
        directory,
        criteria
      );
      allEmails.push(...emailsFromFolder); // Add the emails from each directory
    }

    if (!allEmails.length) {
      console.log("No messages found in any folder.");
      return;
    }

    const body: any = [];
    allEmails.forEach((message: any) => {
      body.push(message.parts[0].body);
    });

    connection.end(); // Close the IMAP connection after fetching
    return body;
  } catch (err) {
    console.error("Error fetching emails:", err);
  }
};
