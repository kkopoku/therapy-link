"use client"

import React from "react"
import SideBar from "../navigation/SideBar"
import BottomNavigation from "../navigation/BottomNavigation"
import { signOut } from "next-auth/react"

interface LayoutProps {
    children?: React.ReactNode
    pageName: string
    navFunctionName?: string
    navFunction?(): void
    sideBarFocus?: string
}

const AuthenticatedLayout: React.FC<LayoutProps> = ({children, pageName, navFunctionName, navFunction, sideBarFocus}) => {
    return(
        <div>
            <main className="flex flex-row min-h-screen w-screen items-center bg-white font-sans text-black transition-all">
                <div className="flex items-center w-fit">
                    <SideBar focused={sideBarFocus} />
                </div>
                <div className="flex flex-col flex-grow h-screen overflow-x-auto pb-3 px-10 w-full items-center">
                    <div className="flex flex-row justify-between py-5 w-full">
                        <p className="text-lg text-primaryGreen font-semibold">{pageName}</p>
                        <button className="px-2 py-1 hover:bg-secondaryGreen hover:text-white text-sm text-center border-2 
                        border-primaryGreen hover:scale-105 transition-all rounded-lg"
                            onClick={()=>navFunction ? navFunction() : signOut({callbackUrl:"/auth/login"})}>{navFunction ? navFunctionName : "Sign Out"}
                        </button>
                    </div>
                    {children}
                </div>
            </main>
            {/* <BottomNavigation /> */}
        </div>
    )
}

export default AuthenticatedLayout