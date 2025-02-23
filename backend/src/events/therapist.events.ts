import eventEmitter from '../config/events.config';
import { sendTherapistAppliedEmail } from '../emails/therapist-applied.email';
import { uploadFile } from '../library/digitalocean.library';
import { sendNewTherapistNotificationEmail } from '../emails/new-therapist.email';
import { logger } from '../config/logger.config';

const tag = "[therapist.events.ts]"
eventEmitter.on('sendTherapistApplied', async (data:any) => {
    await sendTherapistAppliedEmail(data.recipients, data.therapistName)
});


eventEmitter.on("sendNewTherapistNotification", async (data:any) => {
    await sendNewTherapistNotificationEmail(data.recipients)
})


eventEmitter.on('uploadResume', async (data:any) => {
    logger.info(`${tag} [uploadResume] event called, processing upload resume`)
    await uploadFile(data.file)
})