import Transaction from "../models/transaction.model";
export async function fulfilTransaction(reference:string, paymentStage:string|null = null){

    const tag = "[transaction.library.ts][fulfilTransaction]"

    try{
        const transaction:any = await Transaction.find({reference})
        if(!transaction) {
            console.log(`${tag} Transaction not found with reference: ${reference}`)
            return
        }
        const { _id:id, status } = transaction.status
        console.log(`${tag}[${id}] Changing status from ${status} to success`)
        transaction.status = "success"
        transaction.paymentStage = paymentStage ?? "made payment"
        await transaction.save()
        console.log(`${tag}[${id}] status changed to success`)
    }catch(e:any){
        console.log(`${tag} ${e.message}`)
    }

}