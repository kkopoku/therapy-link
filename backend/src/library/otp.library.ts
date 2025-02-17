import OTP from "../models/otp.model";
import crypto from "crypto"


export const createOTP = async (purpose:string, owner:string) => {
    const tag = "[otp.library.ts][createOTP]"
    console.log(`${tag} creating otp ...`)
    try{
        const otp =  crypto.randomBytes(8).toString("base64").slice(0, 8);
        const password = new OTP({
            otp,
            purpose,
            owner,
        });
    
        console.log(`${tag} otp created successfully`)
        await password.save();
        return otp
    }catch(e:any){
        console.log(e);
        throw new Error("Failed to create OTP");
    }
}

