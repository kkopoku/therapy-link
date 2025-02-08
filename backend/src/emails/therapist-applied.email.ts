import { sendEmail } from "../library/email";


export async function sendTherapistAppliedEmail(){
    const tag = "[therapist.email.ts][sendTherapistAppliedEmail]"
    const recipient = 'recipient@example.com'
    const html = `
        <h1>New Therapist Application</h1>
        <p>A new therapist has applied to your account.</p>
    `
    const subject = 'New Therapist Application'

    await sendEmail(recipient, html, subject)
}