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
    therapistId:{
      type: String,
      required: false
    }
  },{ discriminatorKey: 'userType'}
);

const Client = User.discriminator("Client", clientSchema);

export default Client;
