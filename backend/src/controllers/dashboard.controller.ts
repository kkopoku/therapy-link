import { Request, Response } from "express"
import Session from "../models/session.model"
import { sendResponse } from "../library/utils.library"
import User from "../models/user.model"


export async function getDashboardInfo(req: Request, res: Response){
    const tag = "[dashboard.controller.ts][getDashboardInfo]"
    const user = req.user
    let sessions = []
    let userInfo:any = {}

    try{
        switch (user.type) {
            case "Therapist":
                sessions = await Session.find({therapist: user.id}).limit(10).lean()
                userInfo = await User.findById(user.id)
                break
            case "Administrator":
                sessions = await Session.find({}).limit(10).lean()
                userInfo = await User.findById(user.id)
                break
            case "Client":
                sessions = await Session.find({client: user.id}).limit(10).lean()
                userInfo = await User.findById(user.id).populate("therapist")
                break
            default:
                console.log(`${tag} Unusual user type: ${user.type}`)
                return sendResponse(res,{message:"Unauthorized", status: "failed"},401)
        }
        return sendResponse(res, {
            message:"User dashboard data fetched successfully", 
            status: "success", 
            data: {
                user: userInfo,
                sessions
            }
        })
    }catch(error:any){
        console.log(`${tag} Error: ${error}`)
        return sendResponse(res,{message:"Internal Server Error",status: "error"},500)
    }

}