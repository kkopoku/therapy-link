"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import LogoText from "../logo/LogoText";

interface ButtonItem {
  name: string;
  style: string;
  link: string;
}

const TopNavigation: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const firstButtonList: ButtonItem[] = [
    { name: "Pricing", style: "", link: "/pricing" },
    { name: "Careers", style: "", link: "/therapist-jobs" },
    { name: "Community", style: "", link: "" },
    { name: "Resources", style: "", link: "" },
    { name: "Contact", style: "", link: "" },
  ];

  const secondButtonList: ButtonItem[] = status === "authenticated" ? [
    {
      name: "Sign Out",
      style: "h-10 lg:h-auto rounded-md py-1 px-2 border border-[#1A3634] bg-slate-200 transition-all duration-500",
      link: "api/auth/signout",
    },
    {
      name: "Start Assessment",
      style: "h-10 lg:h-auto rounded-md py-1 px-2 border text-white border-[#1A3634] bg-black hover:bg-[#1A3634] transition-all duration-500",
      link: "/auth/client-sign-up",
    },
  ] : [
    {
      name: "Sign In",
      style: "h-10 lg:h-auto rounded-md py-1 px-2 border border-[#1A3634] bg-[#E7D3AD] transition-all duration-500 hover:scale-110",
      link: "/auth/login",
    },
    {
      name: "Start Assessment",
      style: "h-10 lg:h-auto rounded-md py-1 px-2 border text-white4] bg-green-700 border-[#1A363n-900 hover:scale-110 transition-all duration-500",
      link: "/auth/client-sign-up",
    },
  ];

  const firstButtonListStyle = "font-extralight rounded-md py-1 px-2 text-white hover:bg-[#1A1A1D] transition-all duration-500 lg:h-auto h-10 shadow-md bg-[#0a1612] bg-opacity-50 hover:scale-110 min-w-20";

  return (
    <div className="relative top-0 flex flex-row z-50 w-full items-center justify-between text-sm py-5 bg-primaryGreen px-2 lg:px-10 shadow-md">
      <div className="flex items-center justify-between w-full">

        <div className="flex gap-3 w-full lg:w-auto">
          {/* Hamburger icon for small screens */}
          <div className="flex flex-row justify-between lg:hidden w-full" onClick={toggleMenu}>
            <LogoText />
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </div>
          {/* Large screen buttons */}
          <div className="hidden lg:flex flex-row gap-3">
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
        </div>

        <div className="hidden lg:flex flex-row gap-3">
          {secondButtonList.map((item) => (
            <button
              key={item.name}
              className={item.style}
              onClick={() => {
                if (item.link !== "api/auth/signout") router.push(item.link);
                else signOut({ callbackUrl: "/auth/login" });
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Small screen dropdown menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md py-5 px-10">
          <div className="flex flex-col gap-3">
            {firstButtonList.map((item) => (
              <button
                key={item.name}
                className={item.style ? item.style : firstButtonListStyle}
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push(item.link);
                }}
              >
                {item.name}
              </button>
            ))}
            {secondButtonList.map((item) => (
              <button
                key={item.name}
                className={item.style}
                onClick={() => {
                  setIsMenuOpen(false);
                  if (item.link !== "api/auth/signout") router.push(item.link);
                  else signOut({ callbackUrl: "/auth/login" });
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavigation;
