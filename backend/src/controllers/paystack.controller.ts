import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library";
import CODES from "../constants/request.constants";
import { fulfilTransaction } from "../library/transaction.library";

const { SUCCESS } = CODES

export async function handleCallbacks(req: Request, res: Response){

    const tag = "[paystack.controller.ts][handleCallbacks]"
    const { event, data } = req.body
    const { reference } = data

    console.log(`${tag} Request Body: ${JSON.stringify(req.body)}`)

    switch (event){
        case "charge.success":
            await fulfilTransaction(reference)  // TODO: dispatch as a job
            break;
        default:
            console.log(`Event ${event}`)
            console.log(`Data ${data}`)
            break;
    }

    sendResponse(res, {
        status: "success",
        message: "Callback acknowledged"
    }, SUCCESS)

}