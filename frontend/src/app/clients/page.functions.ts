const endpoint = process.env.NEXT_PUBLIC_API_URL

export async function getClients(session:any, setRecords:Function, setLoading:Function){
    if(session){
        const url = `${endpoint}/user/clients`;
        console.log(session.user.token)
        await fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.token}`
            },
        })
        .then(response => response.json())
        .then((jsonResponse) => {
            setRecords(jsonResponse.data)
            setLoading(false)
        }).catch(error=>console.log(error))
    }
}