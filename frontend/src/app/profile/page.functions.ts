import toast from "react-hot-toast"

export async function getCustomerDetails
(
    session: any, 
    setFirstName: Function, 
    setEmail: Function, 
    setSecondaryPhone: Function, 
    setPrimaryPhone: Function, 
    setOtherNames: Function, 
    apiUrl: string,
    setLoading: Function
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
        setLoading(false)
    }
}


export function updateUserDetails(e:any,firstName:string|null, otherNames:string|null, email: string|null, secondaryPhone: string|null, primaryPhone:string|null){
// export function updateUserDetails(e:any){
    e.preventDefault();
    toast.success("submitted")
}

export function changePassword(e:any, password:string|null|null, confirmPassword:string|null){
    e.preventDefault();
    if (password !== confirmPassword)
        toast.error("password mismatch")
    else
        toast.success("password changed")

}




export function createProfile(){
    console.log("create session");
}

export function triggerToast(){
    toast.success("test")
}
