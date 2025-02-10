import eventEmitter from '../config/events.config';
import { sendTherapistAppliedEmail } from '../emails/therapist-applied.email';
import { uploadFile } from '../library/digitalocean.library';

eventEmitter.on('sendTherapistApplied', async (data:any) => {
    await sendTherapistAppliedEmail(data.recipients)
});


eventEmitter.on('uploadResume', async (data:any) => {
    console.log("upload resume called in therapist.events.ts")
    await uploadFile(data.file)
})