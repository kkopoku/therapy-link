import User from "../models/user.model"
import { Request, Response } from "express"
import Joi from "joi"
import { createUser } from "../library/user.library"
import { sendResponse } from "../library/utils.library"
import Client from "../models/client.model"
import Therapist from "../models/therapist.model"
import Administrator from "../models/administrator.model"
import { objectId, msisdn } from "../library/joi.library"

enum UserType {
    Administrator = "Administrator",
    Client = "Client",
    Therapist = "Therapist"
}


export async function registerUser(req: Request, res: Response) {   
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        type: Joi.string().valid(...Object.values(UserType)).required(),
    }).unknown(true)

    const { error, value } = schema.validate(req.body)

    if (error){
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { email } = value
    try{
        const foundUser = await User.findOne({ email }).lean().exec()
        if(foundUser){
            return sendResponse(res,{
                message: "User already exists",
                status: "failed"
            },400)
        }

        const user = await createUser(req.body)

    if (user)
      return res
        .status(200)
        .json({ user, message: "You have successfully created your account" })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function login(req: Request, res: Response): Promise<void | {}> {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    const { error, value } = schema.validate(req.body)

    if (error){
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { email, password } = value
    try{
        const foundUser = await User.findOne({ email })
        if(!foundUser){
            return res.status(400).json({
                message: "Invalid credentials",
                status: "failed"
            })
        }


        const passwordCheck:boolean = await foundUser.comparePassword(password)
        if(!passwordCheck){
            return res.status(400).json({
                message: "Invalid credentials",
                status: "failed"
            })
        }

        const token = foundUser.createJWT()

        return res
            .status(200)
            .json({ user:foundUser, token, message: "You logged in successfully" })

    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function getUsers(req: Request, res: Response) {
    let user = {}
    switch (req.params.userType) {
        case "client":
            user = await Client.find({}).lean()
            sendResponse(res, { data: user, status: "success", message: "user fetched successfully" })
            break
        case "therapist":
            user = await Therapist.find({}).lean()
            sendResponse(res, { data: user, status: "success", message: "user fetched successfully" })
            break
        case "administrator":
            user = await Administrator.find({}).lean()
            sendResponse(res, { data: user, status: "success", message: "user fetched successfully" })
            break
        default:
            sendResponse(res, { data: user, status: "failed", message: "bad request" }, 400)
            break
    }
}



export async function updateClient(req: Request, res: Response){
    const schema = Joi.object({
        id: Joi.string().custom(objectId).required(),
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
            // data: null,
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