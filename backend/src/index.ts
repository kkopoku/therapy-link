import express, { Request, Response } from 'express'
import { connectDB } from "./database/connection"


const app = express();
const port = process.env.PORT || 3001;


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


const startServer = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
}


startServer()
