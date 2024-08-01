import User from "./user.model"
import { Schema } from "mongoose"

const administratorSchema = new Schema(
  {
    roles:{
      type: Array,
      required: true,
    }
  }
);

const Administrator = User.discriminator("Administrator", administratorSchema);

export default Administrator;