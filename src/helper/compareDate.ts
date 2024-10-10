/**
 * Function to check if the email date is between fromDate and toDate.
 * @param {string} emailDate - The date of the email as a string (e.g., "Sun, 6 Oct 2024 21:58:44 +0600").
 * @param {string} fromDateStr - The start date as a string in "MM/DD/YYYY" format.
 * @param {string} toDateStr - The end date as a string in "MM/DD/YYYY" format.
 * @returns {boolean} - Returns true if the email date is between fromDate and toDate, otherwise false.
 */
export const isEmailDateInRange = (
  emailDate: string,
  fromDateStr: string,
  toDateStr: string
): boolean => {
  const parsedEmailDate = new Date(emailDate);

  const fromDate = new Date(fromDateStr);
  const toDate = new Date(toDateStr);

  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(23, 59, 59, 999);

  return parsedEmailDate >= fromDate && parsedEmailDate <= toDate;
};
