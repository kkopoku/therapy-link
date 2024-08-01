import express, { Request, Response } from 'express'
import { connectDB } from "./database/connection"
import userRouter from './routes/user.route'
import dotenv from "dotenv"

dotenv.config({ path: '../.env' });

const app = express()
const port = process.env.PORT
const prefix = "/api/v1"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


app.use(`${prefix}/user`, userRouter);

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
