/**
 * Title: SMTP Types
 * Description: Types for SMTP
 * Author: Md Abdullah
 * Date: 10/10/2024
 */

export interface SMTPConfigTypes {
  host: string;
  user: string;
  password: string;
  port: number;
  tls?: boolean;
}
