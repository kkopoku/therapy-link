"use client"

import toast from "react-hot-toast"

const baseEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/session`

export function testToast(){
    toast.success("Tested Toast")
}


export async function getSessions(session:any, setSessions:Function, setLoading:Function){
    if(session){
        try{
            await fetch(baseEndPoint,{
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.token}`
                }
            }).then(response => response.json())
            .then((jsonResponse:any)=>{
                setSessions(jsonResponse.data)
            }).finally(()=>setLoading(false))
            .catch(error=>console.log(error))
        }catch(e:any){
            console.log(`Error: ${e}`)
        }
    }
}


export async function getSessionDetails(session:any, sessionId:string, setSessionDetails:Function, setLoading:Function){
    if(session){
        setLoading(true)
        await fetch(`${baseEndPoint}/${sessionId}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            }
        }).then(response => response.json())
        .then(jsonResponse => setSessionDetails(jsonResponse.data))
        .finally(setLoading(false))
        .catch((e)=>console.log(e))
    }
}


export async function createSession(){
  console.log("dummy create session")
}

export function handleRecordClick(){

}