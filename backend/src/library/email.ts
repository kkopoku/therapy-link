import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger } from "../config/logger.config";

dotenv.config({ path: "../.env" });


export async function sendEmail(
  recipients: string,
  html: string,
  subject: string
) {

  const tag = "[email.ts][sendEmail]";
  logger.info(`${tag} logging the email:`, process.env.EMAIL_USERNAME)

  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: recipients,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`${tag} Message sent: %s`, info.messageId);
  } catch (error) {
    logger.error(`${tag} Error sending email:`, error);
  }
}
