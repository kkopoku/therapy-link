

const baseEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/dashboard`

export async function getDashboardInfo(session:any, setRecords:Function, setLoading:Function){
    if(session){
        setLoading(true)
        await fetch(baseEndPoint, {
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
        .then(jsonResponse => setRecords(jsonResponse.data))
        .finally(setLoading(false))
        .catch((e)=>console.log(e))
    }
}