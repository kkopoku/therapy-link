import { sendEmail } from "../library/email";
import { logger } from "../config/logger.config";
import dotenv from "dotenv";


dotenv.config({ path: "../.env" });

export async function sendNewTherapistNotificationEmail(recipients: string) {
  const tag = "[therapist.email.ts][sendNewTherapistNotificationEmail]";
  logger.info(`${tag} Sending email to: ${recipients}`);
  const subject = "New Therapist Application Received";
  const html = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>New Therapist Application Received</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #555;
                        line-height: 1.5;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 15px;
                        background-color: #007bff;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 10px;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>New Therapist Application</h1>
                    <p>Dear Admin,</p>
                    <p>A new therapist has submitted an application on the platform and is awaiting review.</p>
                    <p>Please log in to the admin dashboard to process the application.</p>
                    <a href="${process.env.NEXT_CLIENT_URL}/dashboard" class="button">Review Application</a>
                    <p>Best regards,</p>
                    <p><strong>Therapy Link Center Team</strong></p>
                    <p class="footer">This is an automated message. Please do not reply to this email.</p>
                </div>
            </body>
            </html>
    `;

  await sendEmail(recipients, html, subject);
}