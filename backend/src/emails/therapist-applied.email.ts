import { sendEmail } from "../library/email";

export async function sendTherapistAppliedEmail(recipients: string, therapistName:string) {
  const tag = "[therapist.email.ts][sendTherapistAppliedEmail]";
  console.log(`${tag} Sending email to: ${recipients}`);
  const html = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Therapist Application Received</title>
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
                    .footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Thank You for Your Application</h1>
                    <p>Dear ${therapistName},</p>
                    <p>We appreciate your interest in joining our platform. Your application has been received, and our team is currently reviewing your submission.</p>
                    <p>We will notify you as soon as a decision is made. If you have any questions in the meantime, feel free to reach out to us.</p>
                    <p>Best regards,</p>
                    <p><strong>Therapy Link Center</strong></p>
                    <p class="footer">This is an automated message. Please do not reply to this email.</p>
                </div>
            </body>
        </html>
    `;
  const subject = "New Therapist Application";

  await sendEmail(recipients, html, subject);
}
