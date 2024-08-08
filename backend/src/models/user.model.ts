import mongoose, { Error } from "mongoose"
import bcrypt from "bcrypt"


const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    secondaryPhone: { type: String, required: false },
    userType: { type: String, required: true, enum: ['Therapist', 'Client', 'Administrator'] },
  },
  { discriminatorKey: 'userType', timestamps: true }
)

userSchema.pre("save", async function (next) {
  try{
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  }catch(e:any){
    next(e)
  }
})

// userSchema.methods.createJWT = function () {
//   return jwt.sign({ employee_id: this._id, first_name: this.first_name, last_name: this.last_name, organisation_id: this.organisation_id },
//       process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
// }

userSchema.methods.comparePassword = async function (candidatePassword:string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

const User = mongoose.model('User', userSchema)
export default User
