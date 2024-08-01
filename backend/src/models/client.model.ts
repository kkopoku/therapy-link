import mongoose, { Schema } from "mongoose";
import User from "./user.model"


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
  }
);

const Client = User.discriminator("Client", clientSchema);

export default Client;
