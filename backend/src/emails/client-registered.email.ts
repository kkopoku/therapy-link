import { sendEmail } from "../library/email";
import dotenv from "dotenv";


dotenv.config({ path: "../.env" });

export async function sendClientRegisteredEmail(recipient: string, otp:string) {
  const tag = "[client.email.ts][sendClientRegisteredEmail]";
  console.log(`${tag} Sending email to: ${recipient}`);

  const subject = "Welcome to Therapy Link Center – Verify Your Account";
  const verificationLink = `${process.env.NEXT_CLIENT_URL}/verify-account/${otp}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2C3E50;">Welcome to Therapy Link Center!</h2>
      <p>Thank you for registering with Therapy Link Center. We're excited to help you connect with the right therapist.</p>
      <p>To complete your registration, please verify your account by clicking the button below:</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${verificationLink}" 
           style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">
          Verify My Account
        </a>
      </div>
      <p>If you did not sign up for Therapy Link Center, please ignore this email.</p>
      <p>Best regards,</p>
      <p><strong>Therapy Link Center Team</strong></p>
    </div>
  `;

  await sendEmail(recipient, html, subject);
}