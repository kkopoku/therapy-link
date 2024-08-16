"use client"

import React from "react"
import SideBar from "../navigation/SideBar"
import BottomNavigation from "../navigation/BottomNavigation"

interface LayoutProps {
    children?: React.ReactNode
    pageName: string
    navFunctionName: string
    navFunction(): void
}

const AuthenticatedLayout: React.FC<LayoutProps> = ({children, pageName, navFunctionName, navFunction}) => {
    return(
        <div>
            <main className="flex flex-row min-h-screen items-center bg-white font-sans text-black transition-all">
                <div className="flex items-center w-fit">
                    <SideBar />
                </div>
                <div className="flex-grow h-screen px-5">
                    <div className="flex flex-row justify-between py-5">
                        <p className="text-lg text-primaryGreen font-semibold">{pageName}</p>
                        <button className="px-2 py-1 hover:bg-secondaryGreen hover:text-white text-sm text-center border-2 border-primaryGreen hover:scale-105 transition-all rounded-lg"
                            onClick={()=>navFunction()}>{navFunctionName}
                        </button>
                    </div>
                    {children}
                </div>
            </main>
            <BottomNavigation />
        </div>
    )
}

export default AuthenticatedLayout