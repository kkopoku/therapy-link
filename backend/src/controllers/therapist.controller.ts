import { Request, Response } from "express"
import Therapist from "../models/therapist.model"
import { sendResponse } from "../library/utils.library"

export async function getTherapists (req: Request, res: Response){
    const tag = "[therapist.controller][getTherapists]"
    const userType = req.user.type
    try{
        let foundTherapists = []
        switch(userType){
            case "Administrator":
                foundTherapists = await Therapist.find({}).lean().exec()
                break
            default:
                console.log(`${tag} Unusual user type detected: ${userType}`)
                return sendResponse(res,{message:"Unauthorized", status:"failed"}, 401)
        }
        sendResponse(res,{message:"Therapist Details fetched successfully", status: "success", data: foundTherapists})
    }catch(error:any){
        console.log(`${tag} Error: ${error}`)
        return sendResponse(res,{
            message:"Internal Server Error",
            status: "error"
        },500)
    }
}
