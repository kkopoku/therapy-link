import express, { Request, Response } from 'express'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import clientRouter from './routes/client.route'
import sessionRouter from "./routes/session.route"
import dashboardRouter from './routes/dashboard.route'
import paystackRouter from './routes/paystack.route'
import creditRouter from './routes/credit.route'
import therapistRouter from './routes/therapist.route'
import dotenv from "dotenv"
import cors from "cors"
import authorize from './middlewares/auth.middleware'

dotenv.config({ path: '../.env' });

const app = express()
const prefix = "/api/v1"

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


app.use(`${prefix}/auth`, authRouter)
app.use(`${prefix}/user`, authorize, userRouter)
app.use(`${prefix}/session`, authorize, sessionRouter)
app.use(`${prefix}/client`, authorize, clientRouter)
app.use(`${prefix}/dashboard`, authorize, dashboardRouter)
app.use(`${prefix}/credit`, authorize, creditRouter)
app.use(`${prefix}/paystack`, paystackRouter)
app.use(`${prefix}/therapist`, authorize, therapistRouter)

export default app
