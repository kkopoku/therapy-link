import User from "../models/user.model"
import mongoose from "mongoose"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import Joi from "joi"

async function createUser(req: Request, res: Response) {
    
    const userTypes = ["Administrator", "Therapist", "Client"]
    enum UserType {
        Administrator = "Administrator",
        Client = "Client",
        Therapist = "Therapist"
    }
      
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
        const foundUser = await User.findOne({ email }).lean().exec()
        if(foundUser){
            return res.status(409).json({
                message: "User already exists",
                status: "failed"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
        email,
        password: hashedPassword,
        })

    if (user)
      return res
        .status(200)
        .json({ user, message: "You have successfully created your account" })
    }catch(error){
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

export { createUser }