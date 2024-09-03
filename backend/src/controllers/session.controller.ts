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
        therapistId: Joi.string().custom(objectId).required(),
        clientId: Joi.string().custom(objectId).required(),
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

        let foundTherapist = await Therapist.findById(value.therapistId).lean().exec()
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


export async function getSessions(req: Request, res: Response){
    const tag = "[session.controller.ts][getSessions]"
    try{
        const foundSessions = await Session.find({}).lean()
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

    const foundSession = await Session.findById(value.id).lean()
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