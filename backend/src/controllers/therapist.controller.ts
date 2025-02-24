import { Request, Response } from "express"
import Therapist from "../models/therapist.model"
import { sendResponse } from "../library/utils.library"
import Joi from "joi"
import { objectId, msisdn } from "../library/joi.library"
import { logger } from "../config/logger.config"
import Answer from "../models/answer.model"

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
                logger.info(`${tag} Unusual user type detected: ${userType}`)
                return sendResponse(res,{message:"Unauthorized", status:"failed"}, 401)
        }
        sendResponse(res,{message:"Therapist Details fetched successfully", status: "success", data: foundTherapists})
    }catch(error:any){
        logger.info(`${tag} Error: ${error}`)
        return sendResponse(res,{
            message:"Internal Server Error",
            status: "error"
        },500)
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
        logger.info(error)
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    try{
        logger.info(value)
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
        logger.info(error)
        sendResponse(res, {data: null, message: "Internal Server Error", status: "failed"})
    }
}


export async function getSingleTherapist(req: Request, res: Response){
    const tag = "[therapist.controller][getSingleTherapist]"

    const schema = Joi.object({
        id: Joi.string().custom(objectId).required(),
    })

    const { error, value } = schema.validate(req.params)

    if (error){
        logger.info(`${tag} ${error}`)
        return res.status(400).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { id } = value;

    try{
        const foundTherapist:any = await Therapist.findById(id).lean().exec()
        if(!foundTherapist){
            return sendResponse(res, {
                data: null,
                status: "failed",
                message: "Therapist not found"
            },404)
        }

        const answers = await Answer.find({owner: id}).populate({path:"question", select:"question category"})
        if(answers.length>0){
            foundTherapist.answers = answers
        }

        sendResponse(res, {
            data: foundTherapist,
            status: "success",
            message: "Therapist fetched successfully"
        })
    }catch(error:any){
        logger.info(`${tag} Error: ${error}`)
        sendResponse(res, {data: null, message: "Internal Server Error", status: "failed"})
    }
}