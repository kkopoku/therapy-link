import User from "../models/user.model"
import { Request, Response } from "express"
import Joi from "joi"
import { sendResponse } from "../library/utils.library"
import Client from "../models/client.model"
import Therapist from "../models/therapist.model"
import { objectId, msisdn } from "../library/joi.library"

export async function getUsers(req: any, res: Response) {
    try{
        const users = await User.find({},{password:0}).lean()
        sendResponse(res, { data: users, status: "success", message: "user fetched successfully" })
    }catch(error:any){
        console.log(error)
        sendResponse(res, {message: "Internal Server Error", status: "error"}, 500)
    }
}

export async function updateClient(req: Request, res: Response){
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
    })

    const { error, value } = schema.validate(req.body)

    if (error){
        console.log(error)
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    try{
        console.log(value)
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
            message: "test"
        })
    }catch(error:any){
        console.log(error)
        sendResponse(res, {data: null, message: "Internal Server Error", status: "failed"})
    }
    
}


export async function updateTherapist(req: Request, res: Response){
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
        bio: Joi.string()
    })

    const { error, value } = schema.validate(req.body)
    let id = value.id
    delete(value.id)

    if (error){
        console.log(error)
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    try{
        console.log(value)
        const updatedTherapist = await Therapist.findByIdAndUpdate(id, value, {new:true})
        if(!updatedTherapist){
            return sendResponse(res, {
                data: null,
                status: "failed",
                message: "Therapist not found"
            },404)
        }

        sendResponse(res, {
            data: updatedTherapist,
            status: "success",
            message: "test"
        })
    }catch(error:any){
        console.log(error)
        sendResponse(res, {data: null, message: "Internal Server Error", status: "failed"})
    }
}

export async function getUser(req: Request, res: Response){
    const logtag = "[user.controller][getUser]"
    const schema = Joi.object({
        id: Joi.string().custom(objectId).required(),
    })

    const { error, value } = schema.validate(req.params)

    if (error){
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    try{
        const foundUser = await User.findById(value.id).lean()
        if (!foundUser) return sendResponse(res, {
            message: "user not found",
            status: "failed"
        }, 404)
        else return sendResponse(res, {
            data: foundUser,
            message: "user fetched successfully",
            status: "success"
        })
    }catch(err){
        console.log(`${logtag} Error: ${error}`)
        sendResponse(res, {data: null, message: "Internal Server Error", status: "error"}, 500)
    }
}



export async function getClients(req: any, res: Response){
    const tag = "[user.controller.ts][getClients]"
    const { user } = req
    let foundClients = {}

    try{
        switch(user.type){
            case "Therapist":
                foundClients = await Client.find({therapistId: user.id}).lean()
                break
            case "Administrator":
                foundClients = await Client.find({}).lean()
                break
            default:
                console.log(`${tag} Unusual user type detected: ${user.type}`)
                return sendResponse(res,{message:"Invalid user type", status:"failed"}, 400)
        }

        if(!foundClients){
            return sendResponse(res,{
                message:"No client records found",
                status: "failed"
            },404)
        }
        return sendResponse(res, {
            message: "clients fetched successfully",
            data: foundClients,
            status: "success"
        })
    }catch(error:any){
        console.log(`${tag} Error: ${error}`)
        return sendResponse(res,{
            message:"Internal Server Error",
            status: "error"
        },500)
    }

}