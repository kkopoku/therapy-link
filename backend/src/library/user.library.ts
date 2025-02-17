import Administrator from "../models/administrator.model"
import Client from "../models/client.model"
import Therapist from "../models/therapist.model"
import Joi from "joi"


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

    const myData = {
        firstName: data.firstName,
        otherNames: data.otherNames,
        primaryPhone: data.primaryPhone,
        momoNetwork: data.momoNetwork,
        momoNumber: data.momoNumber,
        email: data.email,
        password: data.password,
        type: data.type
    }

     const schema = Joi.object({
        firstName: Joi.string().required(),
        otherNames: Joi.string().required(),
        primaryPhone: Joi.string().required(),
        momoNetwork: Joi.string().optional(),
        momoNumber: Joi.string().optional(),
        type: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
      });
    
      const { error, value } = schema.validate(myData);
    
      if (error) {
       throw new Error(error.details[0].message)
      }

      const { firstName, otherNames, primaryPhone, momoNetwork, momoNumber, email, password, type } = value
    
    try{
        const client = await Client.create({
            firstName: firstName,
            otherNames: otherNames,
            primaryPhone: primaryPhone,
            momoNetwork: momoNetwork,
            momoNumber: momoNumber,
            email: email,
            password: password,
            userType: type
        })
        return client
    }catch(e:any){
        throw new Error(e.message)
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
