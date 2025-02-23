import Client from "../models/client.model"
import Therapist from "../models/therapist.model"
import Joi from "joi"
import { Response, Request } from "express"
import { objectId, msisdn } from "../library/joi.library"
import { sendResponse } from "../library/utils.library"
import CODES from "../constants/request.constants"

const { BAD_REQUEST, SUCCESS, INTERNAL_SERVER_ERROR } = CODES

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
                    .populate({
                        path:"therapist", 
                        select: "firstName otherNames email primaryPhone"
                    }).exec()
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

export async function getCredits(req: Request, res: Response){
    if(req.user.type !== "Client"){
        sendResponse(res,
            {
                message:"user must be a client",
                status: "failed"
            }, BAD_REQUEST)
        return
    }

    try{
        const client:any = await Client.findById(req.user.id)  
        if(client) sendResponse(res,{
            status: "success",
            message:"Client credits fetched successfully",
            data: {
                client: client.firstName,
                credits: client.credits
            }
        },SUCCESS)
    }catch(e:any){
        sendResponse(res,
            {
                message:"something went wrong, please try again",
                status: "error"
            }, INTERNAL_SERVER_ERROR)
        return
    }
}

export async function updateClient(req: Request, res: Response):Promise<any>{
    const schema = Joi.object({
        id: Joi.string().custom(objectId).required(),
        firstName: Joi.string(),
        otherNames:Joi.string(),
        email: Joi.string(),
        password: Joi.string().min(8),
        primaryPhone: Joi.string(),
        secondaryPhone: Joi.string(),
        momoNumber: Joi.string().custom(msisdn),
        momoNetwork: Joi.string().valid("MTN","Telecel","AirtelTigo"),
        therapist: Joi.custom(objectId)
    })

    const { error, value } = schema.validate(req.body)

    if (error){
        console.log(error)
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    if(value.therapist){
        const foundTherapist = await Therapist.findById(value.therapist)
        if (!foundTherapist) return sendResponse(res, {message:"Therapist not found", status:"failed"}, 400)
    }

    try{
        const updatedClient = await Client.findByIdAndUpdate(value.id, value, {new:true})
        if(!updatedClient){
            return sendResponse(res, {
                data: null,
                status: "failed",
                message: "Client not found"
            }, 400)
        }
    
        sendResponse(res, {
            data: updatedClient,
            status: "success",
            message: "user data updated successfully"
        })
    }catch(error:any){
        console.log(error)
        sendResponse(res, {data: null, message: "Internal Server Error", status: "failed"})
    }
    
}