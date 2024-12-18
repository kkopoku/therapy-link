import Client from "../models/client.model";
import Transaction from "../models/transaction.model";
import { io } from "../server";
export async function fulfilTransaction(reference:string, paymentStage:string|null = null){

    let tag = "[transaction.library.ts][fulfilTransaction]"

    try{
        const transaction = await Transaction.findOne({reference})
        if(!transaction) {
            console.log(`${tag} Transaction not found with reference: ${reference}`)
            return
        }
        const { _id:id, status } = transaction
        tag = tag+`[${id}]`
        const finals = ["success", "failed"]

        if(finals.includes(status)){
            console.log(`${tag} Transaction in final state already`)
            return
        }

        const client:any = await Client.findById(transaction.user)
        if(client) {
            client.credits = client.credits + transaction.extra.number
            await client.save()
        }

        console.log(`${tag}[${id}] Changing status from ${status} to success`)
        transaction.status = "success"
        transaction.paymentStage = paymentStage ?? "made payment"
        await transaction.save()
        const { socketId } = transaction.extra
        io.to(socketId).emit("transactionUpdated", transaction)

        console.log(`${tag}[${id}] status changed to success`)
    }catch(e:any){
        console.log(`${tag} ${e.message}`)
    }

}


export async function addSocketID(transactionId:string, socketId:string):Promise<void> {
    const logtag = `[transaction.library.ts][addSocketID][${transactionId}]`
    console.log(`${logtag} Adding socket id to transaction ...`)
    try{
        const transaction = await Transaction.findById(transactionId)
        if (transaction) {
            transaction.extra = { ...transaction.extra, socketId };
            console.log(JSON.stringify(transaction.extra))
            await transaction.save()
            console.log(`${logtag} Socket ID attached to transaction`)
        }else{
            console.log(`${logtag} No transaction found`)
        }
    }catch(e:any){
        console.log(`${logtag} Something went wrong. Error: ${e}`)
    }
}