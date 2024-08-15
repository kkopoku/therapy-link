"use client"

import React from "react"
import TopNavigation from "../navigation/TopNavigation"
import BottomNavigation from "../navigation/BottomNavigation"

interface LayoutProps {
    children?: React.ReactNode
}

const AuthenticatedLayout: React.FC<LayoutProps> = ({children}) => {
    return(
        <div>
            <main className="flex min-h-screen bg-slate-50 flex-col items-center font-sans text-black">
                <TopNavigation />
                {children}
            </main>
            <BottomNavigation />
        </div>
    )
}

export default AuthenticatedLayout