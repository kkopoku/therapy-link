import Client from "../models/client.model"
import Joi from "joi"
import { Response, Request } from "express"
import { objectId } from "../library/joi.library"
import { sendResponse } from "../library/utils.library"

export async function getClientDetails(req:Request, res:Response){
    const tag = "[client.controller][getClientDetails]"
    const schema = Joi.object({
        id: Joi.string().custom(objectId).required(),
    })

    const { error, value } = schema.validate(req.params)
    const userType = req.user.type

    if (error){
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    try{
        let foundClient = null
        switch(userType){
            case "Administrator":
                foundClient = await Client.findById(value.id)
                break
            case "Therapist":
                foundClient = await Client.findById(value.id)
                break
            default:
                console.log(`${tag} Unusual user type detected: ${userType}`)
                return sendResponse(res,{message:"Unauthorized", status:"failed"}, 401)
        }

        if(!foundClient) return sendResponse(res, {message:"No clients found", status: "failed"}, 404)
        sendResponse(res,{message:"Client Details fetched successfully", status: "success", data: foundClient})

    }catch(error:any){
        console.log(`${tag} Error: ${error}`)
        return sendResponse(res,{
            message:"Internal Server Error",
            status: "error"
        },500)
    }
}


export async function getClients(req:Request, res:Response){
    const tag = "[client.controller][getClients]"
    const userType = req.user.type
    try{
        let foundClients = []
        switch(userType){
            case "Administrator":
                console.log("came through here")
                foundClients = await Client.find({})
                    .populate({path:"therapist", select: "name email primaryPhone"}).lean().exec()
                break
            case "Therapist":
                foundClients = await Client.find({therapist: req.user.id}).lean().exec()
                break
            default:
                console.log(`${tag} Unusual user type detected: ${userType}`)
                return sendResponse(res,{message:"Unauthorized", status:"failed"}, 401)
        }
        sendResponse(res,{message:"Client Details fetched successfully", status: "success", data: foundClients})
    }catch(error:any){
        console.log(`${tag} Error: ${error}`)
        return sendResponse(res,{
            message:"Internal Server Error",
            status: "error"
        },500)
    }


}