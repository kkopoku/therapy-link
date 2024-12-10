const baseEndpoint = process.env.NEXT_PUBLIC_API_URL


export async function getCreditsPrice(token:string, amount:number):Promise<any>{
    try{
        const response = await fetch(`${baseEndpoint}/credit/price`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                amount
            })
        })

        let { data } = await response.json()

        if(!response.ok) {
            console.log(data)
            throw new Error ("Something went wrong")
        }

        return data
    }catch(e:any){
        console.log(e)
        throw new Error ("Something went wrong")
    }
}


export async function buyCredits(token:string, amount:number):Promise<any>{
    try{
        const response = await fetch(`${baseEndpoint}/credit/buy`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                number:amount
            })
        })
        let jsonResponse = await response.json()
        if(!response.ok) {
            console.log(jsonResponse)
            throw new Error ("Something went wrong")
        }
        return jsonResponse
    }catch(e:any){
        console.log(e)
        throw new Error ("Something went wrong")
    }
}


export async function submitOTP(token:string, transactionId:string, otp:string){
    try{
        const response = await fetch(`${baseEndpoint}/credit/otp`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id:transactionId,
                otp
            })
        })
        let jsonResponse = await response.json()
        if(!response.ok) {
            console.log(jsonResponse)
            throw new Error ("Something went wrong")
        }
        return jsonResponse
    }catch(e:any){
        console.log(e)
        throw new Error ("Something went wrong")
    }
}