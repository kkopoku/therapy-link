import User from "../models/user.model"
import { Request, Response } from "express"
import Joi from "joi"
import { createUser } from "../library/user.library"
import { sendResponse } from "../library/utils.library"
import eventEmitter from "../config/events.config"
import crypto from "crypto"
import Answer from "../models/answer.model"


enum UserType {
    Administrator = "Administrator",
    Client = "Client",
    Therapist = "Therapist"
}


export async function registerUser(req: Request, res: Response) {
    const tag = "[auth.controller.ts][registerUser]"
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



export async function therapistRegister(req: Request, res: Response) {
    const tag = "[therapist.controller.ts][therapistRegister]";

    console.log(`${tag} Therapist application request received: ${JSON.stringify(req.body)}`)

    if (!req.file) {
        return res.status(400).json({ status: "error", message: "No resume uploaded" });
    }
    eventEmitter.emit("uploadResume", {file:req.file});

    // attach random password
    req.body.password = crypto.randomBytes(8).toString("base64").slice(0,8);
    req.body.type = "Therapist";

    const schema = Joi.object({
        firstName: Joi.string().required(),
        otherNames: Joi.string(),
        email: Joi.string().email().required(),
        qualifications: Joi.string(),
        specialties: Joi.string(),
        bio: Joi.string(),
        password: Joi.string().required(),
        type: Joi.string().required(),
        answers: Joi.string(),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ status: "error", message: error.details[0].message });
    }

    const { email, answers } = value;

    try{
        const foundUser = await User.findOne({ email }).lean().exec()
        if(foundUser){
            sendResponse(res,{
                message: "User already exists",
                status: "failed"
            },400);
            return;
        }

        let createdTherapist = await createUser(value);

        const jsonAnswers = JSON.parse(answers)

        for (const id in jsonAnswers){
            const sAnswer = Array.isArray(jsonAnswers[id]) ? jsonAnswers[id].join("") : jsonAnswers[id]
            await Answer.create({ questionId: id, answer: sAnswer, owner: createdTherapist._id})
        }

        eventEmitter.emit("sendTherapistApplied", {recipients:email});

        if (!createdTherapist){
            sendResponse(res,{
                message: "Failed to create therapist",
                status: "failed"
            }, 500)
            return;
        }
        sendResponse(res, {
            message: "Therapist request submitted successfully",
            status: "success",
            data: createdTherapist
        }, 201)
    }catch(error:any){
        console.log(`${tag} Error: `, error);
        sendResponse(res, {
            message: "Something went wrong",
            status: "error"
        }, 500)
        return;
    }
    
    
}