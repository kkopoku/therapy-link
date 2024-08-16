"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

interface ButtonItem {
  name: string;
  style: string;
  link: string;
}

const TopNavigation: React.FC = () => {
  const router = useRouter();
  const { status } = useSession()

  const firstButtonList: ButtonItem[] = [
    { name: "Pricing", style: "", link: "/pricing" },
    { name: "Solutions", style: "", link: "" },
    { name: "Careers", style: "", link: "/therapist-jobs" },
    { name: "Community", style: "", link: "" },
    { name: "Resources", style: "", link: "" },
    { name: "Contact", style: "", link: "" },
  ];

  const secondButtonList: ButtonItem[] = (status === "authenticated") ? [
    {
      name: "Sign Out",
      style:
        "rounded-md py-1 px-2 border border-[#1A3634] bg-slate-200 transition-all duration-500",
      link: "api/auth/signout",
    },
    {
      name: "Start Assessment",
      style:
        "rounded-md py-1 px-2 border text-white border-[#1A3634] bg-[#314845] hover:bg-[#1A3634] transition-all duration-500",
      link: "/auth/client-sign-up",
    },
  ] :
  [
    {
      name: "Sign In",
      style:
        "rounded-md py-1 px-2 border border-[#1A3634] bg-slate-200 transition-all duration-500",
      link: "/auth/login",
    },
    {
      name: "Start Assessment",
      style:
        "rounded-md py-1 px-2 border text-white border-[#1A3634] bg-[#314845] hover:bg-[#1A3634] transition-all duration-500",
      link: "/auth/client-sign-up",
    },
  ]


  const firstButtonListStyle =
    "rounded-md py-1 px-2 bg-slate-100 hover:bg-slate-300 transition-all duration-500";

  return (
    <div className="relative top-0 flex flex-row z-s0 w-full items-center justify-between text-sm py-5 bg-white px-10 lg:px-32 shadow-md">
      <div className="basis-1/3">
        <button onClick={()=>router.push("/")}>Logo</button>
      </div>
      <div className="hidden lg:flex flex-row justify-between basis-2/3">
        <div className="flex flex-row gap-3">
          {firstButtonList.map((item) => (
            <button
              key={item.name}
              className={item.style ? item.style : firstButtonListStyle}
              onClick={() => router.push(item.link)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-3">
          {secondButtonList.map((item) => (
            <button
              key={item.name}
              className={item.style}
              onClick={() =>{
                if (item.link !== "api/auth/signout")
                  router.push(item.link)
                else
                  signOut()
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
