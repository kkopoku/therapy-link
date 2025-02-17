const baseEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/therapist`

export async function getTherapists(session:any, setTherapists:Function, setLoading:Function){
    if(session){
        try{
            await fetch(baseEndPoint,{
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.token}`
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then((jsonResponse:any)=>{
                setTherapists(jsonResponse.data)
            }).finally(()=>setLoading(false))
            .catch(error=>console.log(error))
        }catch(e:any){
            console.log(`Error: ${e}`)
        }
    }
}
