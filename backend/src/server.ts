import app from ".";
import https from "https";
// import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./database/connection";
import mongoose from "mongoose";
import dotenv from "dotenv"
import fs from 'fs';
// import path from 'path';

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 7002;

// const server = http.createServer(app);

const server = https.createServer({
  key: fs.readFileSync("../server.key"),
  cert: fs.readFileSync("../server.cert"),
},app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms: any = {};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms[roomID]) {
      rooms[roomID].push(socket.id);
    } else {
      rooms[roomID] = [socket.id];
    }

    const anotherUser = rooms[roomID].find((id: any) => id !== socket.id);

    if (anotherUser) {
      socket.emit("other user", anotherUser);
      socket.to(anotherUser).emit("user joined", socket.id);
      console.log("joined");
    }
  });

  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err: any) => {
  console.log("MongoDB connection error", err);
});


async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Therapy Link is live on port ${PORT}`);
  });
}

startServer();
