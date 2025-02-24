import Administrator from "../models/administrator.model";
import Client from "../models/client.model";
import Therapist from "../models/therapist.model";
import Joi from "joi";
import { logger } from "../config/logger.config";

/**
 * @param {any} data request body parameters
 *
 * @throws {Error}
 * @returns {Promise<any>}
 */
export async function createUser(data: any): Promise<any> {
    logger.info(`Creating user of type: ${data.type}`);
    switch (data.type) {
        case "Client":
            return await createClient(data);

        case "Therapist":
            return await createTherapist(data);

        case "Administrator":
            return await createAdministrator(data);
    }
}

async function createClient(data: any) {
    const myData = {
        firstName: data.firstName,
        otherNames: data.otherNames,
        primaryPhone: data.primaryPhone,
        momoNetwork: data.momoNetwork,
        momoNumber: data.momoNumber,
        email: data.email,
        password: data.password,
        type: data.type
    };

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
        logger.error(`Client validation failed: ${error.details[0].message}`);
        throw new Error(error.details[0].message);
    }

    const { firstName, otherNames, primaryPhone, momoNetwork, momoNumber, email, password, type } = value;

    try {
        const client = await Client.create({
            firstName,
            otherNames,
            primaryPhone,
            momoNetwork,
            momoNumber,
            email,
            password,
            userType: type
        });
        logger.info(`Client created successfully: ${client._id}`);
        return client;
    } catch (e: any) {
        logger.error(`Error creating client: ${e.message}`);
        throw new Error(e.message);
    }
}

async function createTherapist(data: any) {
    try {
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
            availability: data.availability,
            gender: data.gender
        });
        logger.info(`Therapist created successfully: ${therapist._id}`);
        return therapist;
    } catch (e: any) {
        logger.error(`Error creating therapist: ${e.message}`);
        return false;
    }
}

async function createAdministrator(data: any) {
    try {
        const administrator = await Administrator.create({
            email: data.email,
            password: data.password,
            primaryPhone: data.primaryPhone,
            firstName: data.firstName,
            otherNames: data.otherNames,
            userType: "Administrator"
        });
        logger.info(`Administrator created successfully: ${administrator._id}`);
        return administrator;
    } catch (e: any) {
        logger.error(`Error creating administrator: ${e.message}`);
        return false;
    }
}
