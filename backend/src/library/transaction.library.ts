import Client from "../models/client.model";
import Transaction from "../models/transaction.model";
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
        console.log(`${tag}[${id}] status changed to success`)
    }catch(e:any){
        console.log(`${tag} ${e.message}`)
    }

}