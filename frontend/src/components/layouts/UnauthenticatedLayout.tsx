"use client"

import React,  { useEffect, useState } from "react"
import TopNavigation from "../navigation/TopNavigation"
import BottomNavigation from "../navigation/BottomNavigation"

interface LayoutProps {
    children?: React.ReactNode
}

const UnauthenticatedLayout: React.FC<LayoutProps> = ({children}) => {

    const [showBottomNav, setShowBottomNav] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowBottomNav(window.location.pathname !== '/auth/login');
        }
    }, []);

    return(
        <div>
            <main className="flex min-h-screen bg-slate-50 flex-col items-center font-sans text-black">
                <TopNavigation />
                {children}
            </main>
            {showBottomNav && <BottomNavigation />}
        </div>
    )
}

export default UnauthenticatedLayout

