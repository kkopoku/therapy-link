const baseEndPoint = `${process.env.NEXT_PUBLIC_API_URL}`


export async function getCredits(token:string, setLoading:Function, setCredits:Function) {
    setLoading(true)
    await fetch(`${baseEndPoint}/client/credits`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
    })
    .then(response => {
        setCredits(response.data.credits)
    })
    .finally(setLoading(false))
    .catch((e)=>console.log(e))
}


export async function bookSession(token:string, startDate:string, duration:string){
    const endpoint = `${baseEndPoint}/session/create`
    const body = {
        startDate,
        duration
    }
    try{
        const response = await fetch(endpoint,{
            method:"POST",
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const data = await response.json();
        if (!response.ok) {
            console.log(`Status: ${response.status} Response: ${JSON.stringify(data)}`)
            if (response.status == 400)
                throw new Error(data.message);
            else
                throw new Error(`Something went wrong please try again`);
        }
        return data;
    }catch(e:any){
        console.error("Fetch failed:", e);
        throw e;
    }
}