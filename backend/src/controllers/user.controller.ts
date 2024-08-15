import User from "../models/user.model"
import { Request, Response } from "express"
import Joi from "joi"
import { createUser } from "../library/user.library"

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
            return res.status(409).json({
                message: "User already exists",
                status: "failed"
            })
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
        password: Joi.string().min(8).required(),
        type: Joi.string().valid(...Object.values(UserType)).required(),
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
        // const foundUser = await User.findOne({ email }).lean().exec()
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
            .json({ foundUser, token, message: "You logged in successfully" })

    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}