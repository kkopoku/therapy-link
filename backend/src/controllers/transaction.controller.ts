import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library"
import Joi from "joi"
import CODES from "../constants/request.constants"
import Transaction from "../models/transaction.model"
import { debit, submitOtp } from "../library/paystack.library"
import Client from "../models/client.model"
import { objectId } from "../library/joi.library"


const { SUCCESS, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = CODES

export async function buyCredits(req: Request, res: Response){
    let logtag = "[transaction.controller.ts][buyCredits]"

    if(req.user.type !== "Client"){
        sendResponse(res, {
            status: "failed",
            message: "You must be a client to buy Credits"
        }, UNAUTHORIZED)
        return
    }

    const schema = Joi.object({
        number: Joi.number().required()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(403).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { number } = value

    try{
        const creditPrice = 150
        const data = {
            amount: number * creditPrice,
            type: "debit",
            user: req.user.id,
            description: `${number} credit(s) purchased for ${req.user.firstName} ${req.user.otherNames}`,
            reason: "buy credits"
        }
        const newTransaction = await Transaction.create(data)

        const {email, momoNumber, momoNetwork}:any = await Client.findById(req.user.id).lean()
        const { amount } = data
        const debitResponse = await debit({amount, email, msisdn:momoNumber, provider:momoNetwork}).catch((e:any)=>{
            newTransaction.status = "failed"
            newTransaction.save()
            throw new Error(e.message)
        })

        const { status, reference } = debitResponse.data

        newTransaction.reference = reference
        newTransaction.paymentStage = status

        const successes = ["success","send_otp"]
        if (!successes.includes(status)) {
            newTransaction.status = "failed"
        }

        await newTransaction.save()

        console.log(newTransaction)

        switch (status) {
            case "success":
                sendResponse(res,{
                    message:"Transaction created successfully, enter pin in prompt/ check your pending approvals to approve the debit",
                    status: "success",
                    data: {
                        transaction: {
                            id: newTransaction._id,
                            status: newTransaction.status,
                            amount: newTransaction.amount
                        }
                    }
                },SUCCESS)
                break;
            case "send_otp":
                sendResponse(res,{
                    message:"Transaction created successfully, OTP is required. Call the OTP Credit API to fulfil the debit",
                    status: "success",
                    data: {
                        transaction: {
                            id: newTransaction._id,
                            status: newTransaction.status,
                            amount: newTransaction.amount
                        }
                    }
                },SUCCESS)
                break;
            default:
                sendResponse(res,{
                    message:"Transaction failed. Please try again.",
                    status: "failed",
                    data: {
                        transaction: {
                            id: newTransaction._id,
                            status: newTransaction.status,
                            amount: newTransaction.amount
                        }
                    }
                },INTERNAL_SERVER_ERROR)
                break;
        }
    }catch(e:any){
        if(e?.response?.data){
            console.log(`${logtag} ${JSON.stringify(e.response.data)}`)
            sendResponse(res,{
                message: "Something went wrong",
                status: "error"
            },INTERNAL_SERVER_ERROR)
        }else{
            console.log(`${logtag} ${e}`)
            sendResponse(res,{
                message: "Something went wrong",
                status: "error"
            },INTERNAL_SERVER_ERROR)
        }
    }
}


export async function submitBuyCreditOtp(req: Request, res: Response){
    let logtag = "[transaction.controller.ts][submitTransactionOtp]"

    const schema = Joi.object({
        otp: Joi.string().required(),
        id: Joi.custom(objectId).required()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        return res.status(403).json({
            message: error.details[0].message,
            status: "failed"
        })
    }
 
    try{
        const { otp, reference } = value
        const foundTransaction = await Transaction.findOne({reference})

        if(!foundTransaction){
            sendResponse(res, {
                message: "No transaction found",
                status: "failed"
            }, BAD_REQUEST)
            return
        }

        if(foundTransaction.status === "success"){
            sendResponse(res, {
                message: "Transaction already processed successfully",
                status: "failed"
            }, BAD_REQUEST)
            return
        }

        const response = await submitOtp(otp, reference)
        console.log(JSON.stringify(response))

        // const { status, message } = response.data

        sendResponse(res, {
            message:"OTP submitted successfully, status is Pending",
            status: "success"
        }, SUCCESS)


    }catch(e:any){
        if(e?.response?.data){
            console.log(`${logtag} ${JSON.stringify(e.response.data)}`)
            sendResponse(res,{
                message: "Something went wrong",
                status: "error"
            },INTERNAL_SERVER_ERROR)
        }else{
            console.log(`${logtag} ${e}`)
            sendResponse(res,{
                message: "Something went wrong",
                status: "error"
            },INTERNAL_SERVER_ERROR)
        }
    }

}