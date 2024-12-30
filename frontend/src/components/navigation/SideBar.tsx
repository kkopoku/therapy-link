"use client";

import React, { useState } from "react";
import { RiHome3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { useSession, signOut } from "next-auth/react";
import { IoDiamond } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { RiMentalHealthLine } from "react-icons/ri";
import BlackLogo from "../logo/LogoBlack";
import { FaUsersGear } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";

interface ButtonItem {
  name: string;
  style?: string;
  link: string;
  icon?: React.ReactNode;
}

const clientButtonList: ButtonItem[] = [
  { name: "Dashboard", link: "/dashboard", icon: <RiHome3Fill /> },
  { name: "Profile", link: "/profile", icon: <FaUser /> },
  { name: "Sessions", link: "/sessions", icon: <MdPendingActions /> },
  { name: "Plan", link: "/plan", icon: <IoDiamond /> },
  { name: "My Therapist", link: "/my-therapist", icon: <RiMentalHealthLine /> },
];

const therapistButtonList: ButtonItem[] = [
  { name: "Dashboard", link: "/dashboard", icon: <RiHome3Fill /> },
  { name: "Profile", link: "/profile", icon: <FaUser /> },
  { name: "My Sessions", link: "/sessions", icon: <MdPendingActions /> },
  { name: "My Clients", link: "/clients", icon: <FaUsersGear /> },
  { name: "Payments", link: "/payments", icon: <FaMoneyBillWave /> },
];

const administratorButtonList: ButtonItem[] = [
  { name: "Dashboard", link: "/dashboard", icon: <RiHome3Fill /> },
  { name: "Profile", link: "/profile", icon: <FaUser /> },
  { name: "Manage Sessions", link: "/sessions", icon: <MdPendingActions /> },
  { name: "Manage Clients", link: "/clients", icon: <FaUsersGear /> },
  {
    name: "Manage Therapists",
    link: "/therapists",
    icon: <RiMentalHealthLine />,
  },
];

const bottomList: ButtonItem[] = [
  { name: "How-To Guides", link: "" },
  { name: "Report an Issue", link: "" },
  { name: "Request Features", link: "" },
  { name: "What's New? ", link: "" },
];

interface sideBarProps {
  focused?: string;
}

export default function SideBar({ focused }: sideBarProps) {
  const { data: session } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  function getButtonList(): ButtonItem[] {
    switch (session?.user.type) {
      case "Therapist":
        return therapistButtonList;
      case "Client":
        return clientButtonList;
      case "Administrator":
        return administratorButtonList;
      default:
        return [];
    }
  }

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className={`flex w-[230px] min-h-screen transition-all`}>
      <div className="flex flex-col w-full border border-black shadow-sm bg-primaryGreen justify-between px-3">
        <div className="flex flex-col items-center gap-y-2">
          <div className="flex w-full h-16 items-center pl-2 justify-start rounded-lg">
            <BlackLogo theme="white" /> <span className="ml-3 text-xl text-white">Therapy<span className="text-yellow1">Link</span></span>
          </div>
          <div className="flex w-full flex-col items-center font-extralight text-sm gap-y-1">
            {session &&
              getButtonList().map((button) => (
              <div key={button.name} className="w-full">
                <button
                className={`flex items-center pl-2 text-left transition-all duration-500 rounded-lg py-2 w-full bg-primaryGreen hover:text-yellow1 hover:scale-95 text-slate-200 ${
                  focused == button.name ? "bg-green-200" : ""
                }`}
                onClick={() => {
                  router.push(button.link);
                }}
                >
                <span className="pr-2 hover:text-slate-200 text-md">
                  {button.icon}
                </span>
                {button.name}
                </button>
                <div className="border-[0.5px] border-slate-200 w-full"></div>
              </div>
              ))}
            {!session &&
              clientButtonList.map((button) => (
                <div
                  className="animate-pulse rounded-lg w-full bg-secondaryGreen border border-slate-200 h-8"
                  key={button.name}
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-2 pb-1">
          <div className="flex w-full flex-col items-center font-extralight text-sm gap-y-1">
            {bottomList.map((button) => (
              <button
                className="flex items-center pl-2 text-left transition-all duration-500 rounded-lg py-2 w-full border border-slate-200 bg-primaryGreen hover:bg-secondaryGreen hover:scale-95 text-slate-200"
                key={button.name}
                onClick={() => router.push(button.link)}
              >
                <span className="pr-2 hover:text-slate-200 text-md">
                  {button.icon}
                </span>
                {button.name}
              </button>
            ))}
          </div>
          <div className="w-full font-extralight relative">
            <button
              className="flex flex-row border-2 border-slate-200 w-full rounded-lg p-2 items-center"
              onClick={togglePopup}
            >
              <div className="flex justify-center bg-secondaryGreen min-h-10 min-w-10 rounded-full p-1 items-center text-slate-200">
                <FaUser />
              </div>
              <div className="flex h-12 text-slate-200 items-start justify-center pl-3 flex-col w-full text-xs truncate text-wrap">
                <p className="text-sm font-normal">{session?.user.email}</p>
                <span>{session?.user.type}</span>
              </div>
            </button>

            {showPopup && (
              <div className="absolute bottom-20 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-10">
                <p className="text-sm">Are you sure you want to sign out?</p>
                <div className="flex justify-end mt-3">
                  <button
                    className="bg-primaryGreen text-slate-200 py-1 px-3 rounded mr-2"
                    onClick={handleSignOut}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-slate-200 py-1 px-3 rounded"
                    onClick={() => setShowPopup(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
