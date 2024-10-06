/**
 * Title: IMAP Types
 * Description: Types for IMAP
 * Author: Md Abdullah
 * Date: 06/10/2024
 */

export interface IMAPConfigTypes {
  imap: {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
    tlsOptions: {
      rejectUnauthorized: boolean;
    };
    authTimeout: number;
  };
}
