import User from "./user.model"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const administratorSchema = new Schema(
  {
    roles:{
      type: Array,
      required: true,
    }
  },{ discriminatorKey: 'userType'}
)

const Administrator = User.discriminator("Administrator", administratorSchema);

export default Administrator;