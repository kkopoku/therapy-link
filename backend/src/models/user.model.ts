import mongoose from "mongoose"


const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  primaryPhone: { type: String, required: true},
  secondaryPhone: { type: String, required: false},
  userType: { type: String, required: true, enum: ['Therapist', 'Client', 'Administrator'] },
}, { discriminatorKey: 'userType' })

const User = mongoose.model('User', userSchema)

export default User
