import User from "./user.model"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const clientSchema = new Schema(
  {
    momoNumber:{
      type: String,
      required: false,
    },
    momoNetwork:{
      type: String,
      required: false,
    },
    therapist:{
      type: String,
      required: false,
      ref: "Therapist"
    }
  },{ discriminatorKey: 'userType'}
);

const Client = User.discriminator("Client", clientSchema);

export default Client;
