import express, { Request, Response } from 'express'
import { connectDB } from "./database/connection"
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import clientRouter from './routes/client.route'
import sessionRouter from "./routes/session.route"
import dotenv from "dotenv"
import cors from "cors"
import authorize from './middlewares/auth.middleware'

dotenv.config({ path: '../.env' });

const app = express()
const port = process.env.PORT
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

const run = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to the database', error)
  }
}


run()
