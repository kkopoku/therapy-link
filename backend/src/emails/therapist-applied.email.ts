import { sendEmail } from "../library/email";


export async function sendTherapistAppliedEmail(recipients:string){
    const tag = "[therapist.email.ts][sendTherapistAppliedEmail]"
    console.log(`${tag} Sending email to: ${recipients}`);
    const html = `
        <h1>New Therapist Application</h1>
        <p>A new therapist has applied to your account.</p>
    `
    const subject = 'New Therapist Application'

    await sendEmail(recipients, html, subject)
}