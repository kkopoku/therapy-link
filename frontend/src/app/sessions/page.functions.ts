import toast from "react-hot-toast"
import { useSession } from "next-auth/react"

// constants here
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


export async function createSession(){
  console.log("dummy create session")
}


// export async function getCustomerDetails
// (
//     session: any, 
//     setFirstName: Function, 
//     setEmail: Function, 
//     setSecondaryPhone: Function, 
//     setPrimaryPhone: Function, 
//     setOtherNames: Function, 
//     apiUrl: string,
//     setLoading: Function
// ) {
//     if(session){
//         const endpoint = `${apiUrl}/user/${session?.user.id}`;
//         let response: any = {};
//         await fetch(endpoint, {
//             method: "GET",
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(response => response.json())
//         .then((jsonResponse) => {
//             response = jsonResponse.data;
//         });

//         setFirstName(response.firstName);
//         setEmail(response.email);
//         setSecondaryPhone(response.secondaryPhone);
//         setPrimaryPhone(response.primaryPhone);
//         setOtherNames(response.otherNames);
//         setLoading(false)
//     }
// }