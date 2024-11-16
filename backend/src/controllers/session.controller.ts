import Session from "../models/session.model"
import Joi from "joi"
import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library"
import Client from "../models/client.model"
import { objectId } from "../library/joi.library"
import { addSeconds } from "date-fns"
import CODES from "../constants/request.constants"

const { CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = CODES

export async function createSession(req: Request, res: Response) {
    let logtag = "[session.controller.ts][createSession]"

    const schema = Joi.object({
        startDate: Joi.date().required(),
        duration: Joi.number().required(),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(403).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    if(req.user.type !== "Client"){
        return sendResponse(res, {
            data: null,
            status: "error",
            message: "User type not supported"
        },BAD_REQUEST)
    }

    try {
        let foundClient:any = await Client.findById(req.user.id).lean().exec()
        console.log(foundClient)

        if (!foundClient.therapist)
            throw new Error("No therapist is linked to this client")

        const {startDate, duration} = value
        const endDate = addSeconds(startDate, duration)

        // check for overlapping sessions on the therapist end
        const overlappingSession = await Session.findOne({
            therapist: foundClient.therapist,
            $or: [
                { 
                    startDate: { $lt: endDate }, 
                    endDate: { $gt: startDate } 
                }
            ]
        }).exec()

        if (overlappingSession) {
            return sendResponse(res, {
                data: null,
                status: "error",
                message: "Therapist already has a session within the selected time period"
            }, BAD_REQUEST)
        }
        
        let sessionData = {
            ...value,
            endDate,
            client: req.user.id,
            therapist: foundClient.therapist
        }

        const newSession = await Session.create(sessionData)

        return sendResponse(res, {
            data: newSession,
            status: "success",
            message: "session successfully created"
        },CREATED)

    } catch (error: any) {
        console.log(`${logtag} Error: ${error}`)
        return sendResponse(res, {
            data: null,
            status: "error",
            message: error.message
        },INTERNAL_SERVER_ERROR)
    }
}


export async function getSessions(req: any, res: Response){
    const tag = "[session.controller.ts][getSessions]"
    const user = req.user
    const userType = req.user.type
    try{
        let foundSessions ={}
        switch (userType){
            case "Therapist":
                foundSessions = await Session.find({therapist: user.id}).lean().exec()
                break
            case "Administrator":
                foundSessions = await Session.find({}).populate("therapist").lean().exec()
                break
            case "Client":
                foundSessions = await Session.find({client: user.id})
                .populate('therapist', 'firstname othernames email')
                .populate('client', 'firstname othernames email')
                .lean().exec()
                break
            default:
                console.log(`${tag} Unusual user type detected: ${userType}`)
                return sendResponse(res,{message:"Invalid user type", status:"failed"}, BAD_REQUEST)
        }

        if(!foundSessions){
            return sendResponse(res,{
                message:"No session records found",
                status: "failed"
            },NOT_FOUND)
        }

        return sendResponse(res, {
            message: "sessions fetched successfully",
            data: foundSessions,
            status: "success"
        })
    }catch(e:any){
        console.log(`${tag} Error: ${e}`)
        sendResponse(res, {
            message: "Internal Server Error",
            status: "error"
        }, 500)
    }
}


export async function getSessionDetails(req: Request, res: Response){
    const schema = Joi.object({
        id: Joi.custom(objectId).required(),
    })

    const {error, value} = schema.validate(req.params)
    if (error) {
        return res.status(403).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const foundSession = await Session.findById(value.id)
        .populate({path:"therapist", select:"firstName otherNames"})
        .populate({path:"client", select:"firstName otherNames"})
        .lean().exec()

    if (!foundSession){
        return sendResponse(res,{
            message: "Session not found",
            status:"failed",
        }, NOT_FOUND)
    }
    return sendResponse(res, {
        message: "Session fetched successfully",
        data: foundSession,
        status: "success"
    })
}