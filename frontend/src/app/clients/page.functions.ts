import { Session } from "next-auth";

const endpoint = process.env.NEXT_PUBLIC_API_URL


export async function getClients(session:any, setRecords:Function, setLoading:Function){
    if(session){
        const url = `${endpoint}/client`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
        })
        .then((jsonResponse) => {
            console.log(JSON.stringify(getClients))
            setRecords(jsonResponse.data)
            setLoading(false)
        }).catch(error=>{console.log(error)})
    }
}


export async function getClientDetails(session:Session, clientId:string, setRecords:Function, setLoading:Function){
    if(session){
        const url = `${endpoint}/client/${clientId}`;
        await fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
        })
        .then((jsonResponse) => {
            setRecords(jsonResponse.data)
            setLoading(false)
        }).catch(error=>console.log(error))
    }
}