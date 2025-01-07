import Administrator from "../models/administrator.model"
import Client from "../models/client.model"
import Therapist from "../models/therapist.model"


/**
 * @param {any} data request body parameters
 * 
 * @throws {Error}
 * @returns {Promise<any>}
 */
export async function createUser(data:any):Promise<any>{
    switch(data.type){
        case "Client":
            return await createClient(data)

        case "Therapist":
            return await createTherapist(data)
            
        case "Administrator":
            return await createAdministrator(data)
    }
}


async function createClient(data:any){
    try{
        const client = await Client.create({
            firstName: data.firstName,
            otherNames: data.otherNames,
            primaryPhone: data.primaryPhone,
            momoNetwork: data.momoNetwork,
            momoNumber: data.momoNumber,
            email: data.email,
            password: data.password,
            userType: "Client"
        })
        return client
    }catch(e){
        return false
    }
}


async function createTherapist(data:any){
    try{
        const therapist = await Therapist.create({
            firstName: data.firstName,
            otherNames: data.otherNames,
            primaryPhone: data.primaryPhone,
            momoNetwork: data.momoNetwork,
            momoNumber: data.momoNumber,
            email: data.email,
            bio: data.bio,
            password: data.password,
            userType: "Therapist",
            specialty: data.specialty,
            availability: data.availability
        })
        return therapist
    }catch(e){
        return false
    }
}


async function createAdministrator(data:any){
    try{
        const administrator = await Administrator.create({
            email: data.email,
            password: data.password,
            primaryPhone: data.primaryPhone,
            firstName: data.firstName,
            otherNames: data.otherNames,
            userType: "Administrator"
        })
        return administrator
    }catch(e){
        return false
    }
}
