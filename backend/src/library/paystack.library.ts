import { ref } from "joi";

interface DebitProps{
    amount: number;
    email: string;
    msisdn: string;
    provider: "vod"|"mtn"|"atl"
}
export async function debit({amount, email, msisdn, provider}:DebitProps){
    const data = {
        amount: amount * 100,
        email,
        currency: "GHS",
        mobile_money: {
          phone: msisdn,
          provider,
        },
      };
    const response = await fetch(`${process.env.PS_URL}/charge`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${process.env.PS_KEY}`,
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}


export async function submitOtp(otp:string, reference:string){
    const data =  {
        otp,
        reference
    }
    const response = await fetch(`${process.env.PS_URL}/charge/submit_otp`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${process.env.PS_KEY}`,
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}