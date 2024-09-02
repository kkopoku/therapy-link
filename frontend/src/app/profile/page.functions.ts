import toast from "react-hot-toast"

export async function getCustomerDetails
(
    session: any, 
    setFirstName: Function, 
    setEmail: Function, 
    setSecondaryPhone: Function, 
    setPrimaryPhone: Function, 
    setOtherNames: Function, 
    apiUrl: string
) {
    if(session){
        const endpoint = `${apiUrl}/user/${session?.user.id}`;
        let response: any = {};
        await fetch(endpoint, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then((jsonResponse) => {
            response = jsonResponse.data;
        });

        setFirstName(response.firstName);
        setEmail(response.email);
        setSecondaryPhone(response.secondaryPhone);
        setPrimaryPhone(response.primaryPhone);
        setOtherNames(response.otherNames);
    }
}


export function updateUserDetails(){

}


export function createProfile(){
    console.log("create session");
}

export function triggerToast(){
    toast.success("test")
}
