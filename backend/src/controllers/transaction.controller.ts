import { Request, Response } from "express"
import { sendResponse } from "../library/utils.library"
import Joi from "joi"
import CODES from "../constants/request.constants"
import Transaction from "../models/transaction.model"
import { checkPendingCharge, debit, submitOtp } from "../library/paystack.library"
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
        const creditPrice = 0.5
        const totalPrice = number * creditPrice
        const data = {
            amount: totalPrice,
            type: "debit",
            user: req.user.id,
            description: `${number} credit(s) purchased for ${req.user.firstName} ${req.user.otherNames}`,
            reason: "buy credits",
            extra: {
                purpose: "credits",
                number,
                amount: `GHS ${totalPrice}`
            }
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

        const successes = ["success","send_otp","pay_offline"]
        console.log(status)
        if (!successes.includes(status)) {
            newTransaction.status = "failed"
        }

        await newTransaction.save()

        switch (status) {
            case "success":
            case "pay_offline":
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
        const { otp, id } = value
        const foundTransaction = await Transaction.findById(id)
        const { reference }:any = foundTransaction

        if(!foundTransaction){
            sendResponse(res, {
                message: "No transaction found",
                status: "failed"
            }, BAD_REQUEST)
            return
        }

        if(foundTransaction.status !== "pending"){
            sendResponse(res, {
                message: "Transaction already processed",
                status: "failed",
                data: {
                    transaction: {
                        id: foundTransaction._id,
                        status: foundTransaction.status
                    }
                }
            }, BAD_REQUEST)
            return
        }

        const response = await submitOtp(otp, reference).catch((e:any)=>{
            foundTransaction.status = "failed"
            foundTransaction.save()
            throw new Error(e.message)
        })

        const { status, reference:responseRef } = response.data

        foundTransaction.reference = responseRef
        foundTransaction.paymentStage = status

        const successes = ["success"]
        if (!successes.includes(status)) {
            foundTransaction.status = "failed"
        }

        await foundTransaction.save()

        switch (status) {
            case "success":
                sendResponse(res,{
                    message:"OTP submitted successfully, status is Pending",
                    status: "success",
                    data: {
                        transaction: {
                            id: foundTransaction._id,
                            status: foundTransaction.status,
                            amount: foundTransaction.amount
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
                            id: foundTransaction._id,
                            status: foundTransaction.status,
                            amount: foundTransaction.amount
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

export async function checkTransactionStatus(req: Request, res: Response){
    
    const tag = "[transaction.controller.ts][checkTransactionStatus]"
    const schema = Joi.object({
        id: Joi.custom(objectId).required(),
    })

    const {error, value} = schema.validate(req.params)
    if (error) {
        return res.status(403).json({
            message: error.details[0].message,
            status: "failed"
        })
    }

    const { id } = value

    try{
        const foundTransaction:any = await Transaction.findById(id)
        if (!foundTransaction){
            sendResponse(res, {
                status: "failed",
                message: "Transaction not found",
            },BAD_REQUEST)
            return
        }
        
        if(foundTransaction.status === "pending"){
            const { data } = await checkPendingCharge(foundTransaction.reference).catch((e:any)=>{
                throw new Error("Something went wrong")
            })

            const finals = ["success","failed"]

            if(finals.includes(data.status)){
                foundTransaction.status = data.status
                await foundTransaction.save()
            }else{
                console.log(`${tag} [${foundTransaction._id}] Status from paystack: ${data.status}`)
            }
        }

        sendResponse(res,{
            status: "success",
            message: "transaction check completed",
            data: foundTransaction
        })
        return
    }catch(e:any){
        console.log(`${tag} ${e.message}`)
        sendResponse(res,{
            status: "error",
            message: e.message,
        })
    }
}