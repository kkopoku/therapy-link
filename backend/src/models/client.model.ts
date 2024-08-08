import User from "./user.model"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const clientSchema = new Schema(
  {
    momoNumber:{
      type: String,
      required: true,
    },
    momoNetwork:{
      type: String,
      required: true,
    },
  },{ discriminatorKey: 'userType'}
);

const Client = User.discriminator("Client", clientSchema);

export default Client;
