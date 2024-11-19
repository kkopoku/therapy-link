interface DebitProps{
    amount: number;
    email: string;
    msisdn: string;
    provider: "vod"|"mtn"|"atl"
}
export async function debit({amount, email, msisdn, provider}:DebitProps){
    const logtag = "[paystack.library.ts][debit]"
    const data = {
        amount: amount * 100,
        email,
        currency: "GHS",
        mobile_money: {
          phone: msisdn,
          provider,
        },
      };

    try{
        console.log(`${process.env.PS_URL}/charge`)
        const response = await fetch(`${process.env.PS_URL}/charge`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${process.env.PS_KEY}`,
            },
            body: JSON.stringify(data)
        });    

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`${logtag} Failed with status ${response.status}: ${errorText}`);
            throw new Error("Failed to charge");
        }

        return await response.json();
    }catch(e:any){
        if(e?.response){
            console.log(`${logtag} ${JSON.stringify(e.response.data)}`)
            throw new Error("Something went wrong")
        }else{
            console.log(`${logtag} ${e}`)
            throw new Error("Something went wrong")
        }
    }
}


export async function submitOtp(otp:string, reference:string){
    const logtag = "[paystack.library.ts][submitOtp]"

    const data =  {
        otp,
        reference
    }

    try{
        const response = await fetch(`${process.env.PS_URL}/charge/submit_otp`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${process.env.PS_KEY}`,
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`${logtag} Failed with status ${response.status}: ${errorText}`);
            throw new Error("Failed to submit OTP");
        }
    
        return await response.json()
    }catch(e:any){
        if(e?.response){
            console.log(`${logtag} ${JSON.stringify(e.response.data)}`)
            throw new Error("Something went wrong")
        }else{
            console.log(`${logtag} ${e}`)
            throw new Error("Something went wrong")
        }
    }
}



export async function checkPendingCharge(reference:string){

    const logtag = "[paystack.library.ts][checkPendingCharge]"

    try{
        const response = await fetch(`${process.env.PS_URL}/charge/${reference}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${process.env.PS_KEY}`,
            }
        })

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`${logtag} Failed with status ${response.status}: ${errorText}`);
            throw new Error("Failed to submit OTP");
        }
    
        return await response.json()
    }catch(e:any){
        if(e?.response?.data){
            console.log(`${logtag} ${JSON.stringify(e.response.data)}`)
            throw new Error("Something went wrong")
        }else{
            console.log(`${logtag} ${e}`)
            throw new Error("Something went wrong")
        }
    }

}