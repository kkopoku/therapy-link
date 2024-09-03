import jwt from 'jsonwebtoken'
import User from "../models/user.model"
import Joi from "joi"
import { sendResponse } from "../library/utils.library"
import { Response, NextFunction } from "express"


export default async function authorize(req:any, res:Response, next:NextFunction){

    const logtag = "[authorization.ts][authorize]"
    const schema = Joi.object({
        authorization: Joi.string().required(),
    }).unknown(true)

    const {error, value} = schema.validate(req.headers)
    if (error){
        return sendResponse(res, {
            message: error.details[0].message,
            status: "failed"
        }, 403)
    }

    const { authorization } = value

    if(!authorization.startsWith("Bearer")) return sendResponse(res,{
        message: "Unauthorized",
        status: "failed"
    },401)

    const token = authorization.split(" ")[1]
    const secret = process.env.JWT_SECRET as string

    try{
        const payload:any = jwt.verify(token, secret)
        if(!payload) return sendResponse(res,{
            message: "Unauthorized",
            status: "failed"
        },401)

        const user = await User.findById(payload.id);

        if(!user){
            return sendResponse(res,{
                message: "Unauthorized",
                status: "failed"
            },401) 
        }
        else{
            req.user = {
                id: user._id,
                firstName: user.firstName,
                otherNames: user.otherNames,
                email: user.email,
                type: user.userType
            }
            next()
        }
    }catch(error:any){
        console.log(`${logtag} Error: ${error}`)
        return sendResponse(res,{
            message: `${error.message}`,
            status: "failed"
        },401) 
    }
}


export function adminAuth(req:any, res:Response, next:NextFunction){
    if (req.user.type !== "Administrator"){
        return sendResponse(res, {
            message: "Unauthorized request",
            status: "failed"
        }, 401)
    }
    next()
}