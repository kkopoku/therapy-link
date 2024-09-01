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
        return sendResponse(res, 201, {
            data: createdSession,
            status: "success",
            message: "session successfully created"
        })
    } catch (error: any) {
        console.log(`${logtag} Error: ${error}`)
        return sendResponse(res, 500, {
            data: null,
            status: "error",
            message: error.message
        })
    }
}