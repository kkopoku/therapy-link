"use client"

import React from 'react'
import { RiHome3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { IoDiamond } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { RiMentalHealthLine } from "react-icons/ri";


interface ButtonItem{
    name: string
    style?: string
    link: string
    icon?: React.ReactNode
}

const buttonList:ButtonItem[] = [
    {name: "Dashboard", link:"/dashboard", icon: <RiHome3Fill />},
    {name: "Profile", link:"/profile", icon: <FaUser /> },
    {name: "Sessions", link:"/sessions", icon: <MdPendingActions /> },
    {name: "Plan", link:"/plan", icon: <IoDiamond /> },
    {name: "My Therapist", link:"/my-therapist", icon: <RiMentalHealthLine /> },
]

const bottomList:ButtonItem[] = [
    {name: "How-To Guides", link:""},
    {name: "Report an Issue", link:"" },
    {name: "Request Features", link:"" },
    {name: "What's New? ", link:"" },
]


export default function SideBar(){

    const { data: session } = useSession()
    const router = useRouter()

    return(
        <div className={`flex w-[230px] min-h-screen py-3 pl-2 transition-all`}>
            <div className="flex flex-col w-full border border-slate-200 shadow-sm rounded-xl justify-between px-1">

                <div className='flex flex-col items-center gap-y-2'>
                    <div className='flex w-full h-16 items-center justify-center rounded-lg'>Application Logo</div>
                    <div className='flex w-full flex-col items-center font-extralight text-sm gap-y-1'>
                        {buttonList.map(button => 
                            <button className='flex items-center pl-2 text-left transition-all duration-500 rounded-lg py-2 w-full bg-slate-50 hover:bg-secondaryGreen hover:scale-95 hover:text-white' 
                                key={button.name} onClick={()=>router.push(button.link)}> 
                                <span className='pr-2 hover:text-white text-md'>{button.icon}</span> 
                                {button.name}
                            </button>
                        )}
                    </div>
                </div>

                <div className='flex flex-col items-center gap-y-2 pb-1'>
                    <div className='flex w-full flex-col items-center font-extralight text-sm gap-y-1'>
                        {bottomList.map(button => 
                            <button className='flex items-center pl-2 text-left transition-all duration-500 rounded-lg py-2 w-full bg-slate-50 hover:bg-secondaryGreen hover:scale-95 hover:text-white' 
                                key={button.name} onClick={()=>router.push(button.link)}>
                                    <span className='pr-2 hover:text-white text-md'>{button.icon}</span> 
                                    {button.name}
                            </button>
                        )}
                    </div>
                    <div className='w-full font-extralight'>
                        <button className='flex flex-row border-2 border-slate-200 w-full rounded-lg p-2 items-center'>
                            <div className='flex justify-center bg-primaryGreen min-h-10 min-w-10 rounded-full p-1 items-center text-white'>
                                <FaUser />
                            </div>
                            <div className='flex h-12 items-start justify-center pl-3 flex-col w-full text-xs truncate text-wrap'>
                                <p className='text-sm font-normal'>{session?.user.email}</p>
                                <span>{session?.user.type}</span>
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}