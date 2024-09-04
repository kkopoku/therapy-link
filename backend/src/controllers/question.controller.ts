import Question from "../models/answer.model";
import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library";


export async function createQuestion(req: Request, res: Response){
    const tag = "[question.controller.ts][createQuestion]"


}

export async function getQuestions(req: Request, res: Response){
    const tag = "[question.controller.ts][getQuestions]"
    const userType = req.user.type
    try{
        let questions = {}
        switch(userType){
            case "Therapist":
                questions = await Question.find({for: "Therapist"})
                break
            case "Client":
                questions = await Question.find({for: "Client"})
                break
            case "Administrator":
                questions = await Question.find({})
                break
            default:
                console.log(`${tag} Unusual user type: ${userType}`)
                return sendResponse(res,{message:"Unauthorized", status: "failed"},401)
        }
    }catch(error:any){
        const tag = "[question.controller.ts][getQuestions]"
        console.log(`${tag} Error: ${error}`)
    }
}