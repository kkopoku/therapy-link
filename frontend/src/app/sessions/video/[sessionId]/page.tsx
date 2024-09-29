"use client";

import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client"
import { useParams } from "next/navigation";
import { callUser } from "./page.functions";

export default function VideoPage() {

  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const otherUser = useRef<string | null>(null);
  const userStream = useRef<MediaStream | null>(null);
  const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
  const { sessionId } = useParams()

 
  useEffect(() => {

    navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      userStream.current = stream;

      socketRef.current = io(`${uri}`);

      socketRef.current.emit("join room", sessionId);
      console.log("Joining room:", sessionId);

      socketRef.current.on("other user", (userID) => {
        console.log("Other user joined:", userID);
        callUser(userID);
        otherUser.current = userID;
      });

      socketRef.current.on("user joined", (userID) => {
        console.log("User joined:", userID);
        otherUser.current = userID;
      });

      // socketRef.current.on("offer", handleRecieveCall);

      // socketRef.current.on("answer", handleAnswer);

      // socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
    })
    .catch((e) => console.log(e));

    // return () => {
    //   if (socket) socket.disconnect();
    // };

  }, []);

  return (
    <div className="flex justify-center items-center bg-white h-screen text-black">
      <div>{sessionId} hi</div>
      {/* <button className="bg-green-500 rounded-lg p-2 w-44 text-white" onClick={sendTestEvent}>Test</button> */}
    </div>
  );
}