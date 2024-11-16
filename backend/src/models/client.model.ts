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
      type: Schema.ObjectId,
      required: false,
      ref: "Therapist"
    },
    credits:{
      type: Number,
      required: true,
      default: 0
    }
  },{ discriminatorKey: 'userType'}
);

const Client = User.discriminator("Client", clientSchema);

export default Client;
