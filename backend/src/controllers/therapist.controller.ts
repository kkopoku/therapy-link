import { Request, Response } from "express"
import Therapist from "../models/therapist.model"
import { sendResponse } from "../library/utils.library"

export async function getTherapists (req: Request, res: Response){
    const therapists = await Therapist.find({}).populate("")
    // sendResponse
}