import Session from "../models/session.model"
import Joi from "joi"
import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library"
import Client from "../models/client.model"
import Therapist from "../models/therapist.model"
import { objectId } from "../library/joi.library"

export async function createSession(req: Request, res: Response) {
    let logtag = "[session.controller.ts][createSession]"

    // validate request body
    const schema = Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        duration: Joi.number().required(),
        therapist: Joi.string().custom(objectId).required(),
        client: Joi.string().custom(objectId).required(),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(403).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    try {
        // check user and client
        let foundClient = await Client.findById(value.clientId).lean().exec()
        console.log(foundClient)
        if (!foundClient)
            throw new Error("Client not found")

        let foundTherapist = await Therapist.findById(value.therapist).lean().exec()
        if (!foundTherapist)
            throw new Error("Therapist not found")

        let createdSession = await Session.create(value)
        return sendResponse(res, {
            data: createdSession,
            status: "success",
            message: "session successfully created"
        },201)
    } catch (error: any) {
        console.log(`${logtag} Error: ${error}`)
        return sendResponse(res, {
            data: null,
            status: "error",
            message: error.message
        },500)
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
                foundSessions = await Session.find({clientId: user.id}).lean()
                break
            default:
                console.log(`${tag} Unusual user type detected: ${userType}`)
                return sendResponse(res,{message:"Invalid user type", status:"failed"}, 400)
        }

        if(!foundSessions){
            return sendResponse(res,{
                message:"No session records found",
                status: "failed"
            },404)
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


export async function getSessionDetails(req: Request, res: Response ){
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
        }, 404)
    }
    return sendResponse(res, {
        message: "Session fetched successfully",
        data: foundSession,
        status: "success"
    })
}