"use client";

import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MdCallEnd } from "react-icons/md";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { CiVideoOff, CiVideoOn } from "react-icons/ci";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function VideoPage() {
  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const otherUser = useRef<string | null>(null);
  const [otherUserState, setOtherUserState] = useState<string | null>("");
  const [myUserState, setMyUserState] = useState(false);
  const userStream = useRef<MediaStream | null>(null);
  const uri = `${process.env.NEXT_PUBLIC_SERVER_URL}`;
  const { sessionId } = useParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const router = useRouter()

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }

          userStream.current = stream;
          setMyUserState(true);

          console.log(`This is the websocket uri: ${uri}`)
          socketRef.current = io(`${uri}`);

          socketRef.current.emit("join room", sessionId);
          console.log("Joining room:", sessionId);

          socketRef.current.on("other user", (userID) => {
            console.log("Other user joined:", userID);
            callUser(userID);
            otherUser.current = userID; //otherUser is the otherUser socketId, kapish ? good
            setOtherUserState(userID);
          });

          socketRef.current.on("user joined", (userID) => {
            console.log("User joined:", userID);
            otherUser.current = userID;
            setOtherUserState(userID);
          });

          socketRef.current.on("offer", handleReceiveCall);

          socketRef.current.on("answer", handleAnswer);

          socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
        })
        .catch((e) => console.log(e));
    } catch (e: any) {
      console.log(e);
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Your function or code before refresh
      console.log("Page is about to be refreshed");
      socketRef.current?.emit("handleDisconnectCleanUp", sessionId);

      // Custom message (optional)
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      console.log("close page");
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleCancelCall();
    };
  }, []);

  function callUser(userID: string) {
    console.log("Calling user:", userID);
    peerRef.current = createPeer(userID);
    userStream.current?.getTracks().forEach((track) => {
      console.log("Adding track to peer connection:", track);
      peerRef.current?.addTrack(track, userStream.current!);
    });
  }

  function createPeer(userID: string) {
    console.log("Creating peer connection for user:", userID);
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID: string) {
    console.log("Negotiation needed for user:", userID);

    peerRef.current
      ?.createOffer()
      .then((offer) => {
        console.log("Created offer:", offer);

        return peerRef.current?.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current?.id,
          sdp: peerRef.current?.localDescription,
        };
        console.log("Sending offer payload:", payload);
        socketRef.current?.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleReceiveCall(incoming: {
    sdp: RTCSessionDescriptionInit;
    caller: string;
  }) {
    console.log("Received call from:", incoming.caller);

    peerRef.current = createPeer(incoming.caller);
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      ?.setRemoteDescription(desc)
      .then(() => {
        userStream.current?.getTracks().forEach((track) => {
          console.log(
            "Adding track to peer connection after receiving call:",
            track
          );
          peerRef.current?.addTrack(track, userStream.current!);
        });
      })
      .then(() => {
        return peerRef.current?.createAnswer();
      })
      .then((answer) => {
        console.log("Created answer:", answer);
        return peerRef.current?.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socketRef.current?.id,
          sdp: peerRef.current?.localDescription,
        };
        console.log("Sending answer payload:", payload);
        socketRef.current?.emit("answer", payload);
      });
  }

  function handleAnswer(message: { sdp: RTCSessionDescriptionInit }) {
    console.log("Received answer:", message.sdp);
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current?.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e: RTCPeerConnectionIceEvent) {
    if (e.candidate) {
      console.log("Outgoing ICE candidate: ", e.candidate);
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socketRef.current?.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming: RTCIceCandidateInit) {
    console.log("Incoming ICE candidate: ", incoming);
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current?.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e: RTCTrackEvent) {
    console.log("Received remote track");
    if (partnerVideo.current) {
      partnerVideo.current.srcObject = e.streams[0];
    }
  }

  function handleCancelCall() {
    if (peerRef.current) {
      console.log("Closing peer connection");
      peerRef.current.close();
      peerRef.current = null;
    }

    if (userStream.current) {
      console.log("Stopping user media tracks");
      userStream.current.getTracks().forEach((track) => track.stop());
      userStream.current = null;
    }

    if (socketRef.current?.connected) {
      console.log("Disconnecting socket");
      socketRef.current.emit("handleDisconnectCleanUp", sessionId, () => {
        console.log("Cleanup event sent, now disconnecting socket");
        socketRef.current?.disconnect();
      });
    } else {
      console.log("Socket is already disconnected");
    }
    router.replace("/sessions")
  }


  function toggleMicrophone() {
    userStream.current?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted((prev) => !prev);
  }


  function toggleVideo() {
    userStream.current?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoEnabled((prev) => !prev);
  }
  

  return (
    <AuthenticatedLayout pageName="Video Session">
      <div className="w-full flex flex-col flex-grow gap-10 justify-between items-center h-screen text-black">

        <div className="flex flex-grow flex-row w-full gap-x-5 justify-center items-center">

          <div className="basis-1/2 relative overflow-hidden h-full w-full justify-center items-center">
            <video
              autoPlay
              muted
              ref={userVideo}
              style={{ transform: "scaleX(-1)" }}
              className="w-full h-full object-cover"
            />
          </div>

          {otherUserState ? (
            <div className="basis-1/2 relative overflow-hidden h-full w-full justify-center items-center">
              <video
                autoPlay
                ref={partnerVideo}
                style={{ transform: "scaleX(-1)" }}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <LoadingUserComponent />
          )}
        </div>

        <div className="flex w-full justify-center text-white bg-primaryGreen min-h-16 p-2 gap-x-5 rounded-lg">
          <ControlUnitButton tooltip="End Call" icon={<MdCallEnd/>} onClick={handleCancelCall}/>
          <ControlUnitButton tooltip={isMuted ? "Unmute" : "Mute"} icon={isMuted ? <FaVolumeMute/> : <FaVolumeUp/>} onClick={toggleMicrophone}/>
          <ControlUnitButton tooltip={isVideoEnabled ? "Turn on video" : "Turn off video"} icon={isVideoEnabled ? <CiVideoOn/> : <CiVideoOff/>} onClick={toggleVideo}/>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}


const ControlUnitButton:React.FC<ControlUnitButtonProps> = ({tooltip="", icon, onClick}) => {
  return(
    <button className="flex flex-col bg-black justify-center bg-opacity-20 rounded-md hover:bg-opacity-45 w-16 h-15 items-center p-2 transition-all delay-75" 
      onClick={onClick} 
      title={tooltip}
    >
      <span className="text-xl">{icon}</span>
    </button>
  )
}

const LoadingUserComponent = () => {
  return(
    <div className="flex flex-col gap-5 basis-1/2 justify-center items-center w-full h-full ">
      <LoadingSpinner size={70} border={10}/>
      <p>User is joining soon ...</p>
    </div>
  )
}

interface ControlUnitButtonProps{
  tooltip?: string
  icon: React.ReactNode
  onClick?: () => void 
}
