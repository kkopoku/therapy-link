import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library"
import OTP from "../models/otp.model"
import Joi from "joi"
import Client from "../models/client.model"


export async function verifyOTP(req: Request, res: Response) {

    const schema = Joi.object({
        id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.query)

    if (error) {
        sendResponse(res, { message: error.details[0].message, status: "failed" }, 400);
        return 
    }

    const { id } = value;

    try{
        const foundOTP = await OTP.findOneAndUpdate(
            // { otp:id, used: false },
            { otp:id },
            { used: true },
            { new: true }
        )

        if(!foundOTP){
            sendResponse(res,{
                message: "OTP not found or expired",
                status: "failed"
            },404)
            return
        }

        const user:any = await Client.findOne(foundOTP.owner)
        user.emailVerified = true
        await user.save()

        sendResponse(res, { message: "OTP verified successfully", status: "success" });
        return;
    }catch(error:any){
        console.error(error);
        sendResponse(res, { message: "Internal Server Error", status: "error" }, 500);
        return;
    }
    
}