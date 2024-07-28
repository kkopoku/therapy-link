import mongoose, { Schema } from "mongoose";


const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type:{
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("File", fileSchema);

export default User;
