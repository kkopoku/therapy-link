import eventEmitter from '../config/events.config';
import { sendTherapistAppliedEmail } from '../emails/therapist-applied.email';

eventEmitter.on('sendTherapistApplied', async () => {
    const logtag = '[email.events.ts][sendEmail]';
    await sendTherapistAppliedEmail()
});