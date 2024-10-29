"use client"

import React,  { useEffect, useState } from "react"
import TopNavigation from "../navigation/TopNavigation"
import BottomNavigation from "../navigation/BottomNavigation"

interface LayoutProps {
    children?: React.ReactNode
    hideBottomNavigation?: boolean
}

const UnauthenticatedLayout: React.FC<LayoutProps> = ({children, hideBottomNavigation=false}) => {

    const [showBottomNav, setShowBottomNav] = useState(false);
    const [showTopNav, setShowTopNav] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowBottomNav(window.location.pathname !== '/auth/login');
            setShowTopNav(window.location.pathname !== '/auth/login');
        }
        if(hideBottomNavigation) setShowBottomNav(false)
    }, []);

    return(
        <div>
            <main className="flex min-h-screen bg-slate-50 flex-col items-center font-sans text-black">
                {showTopNav && <TopNavigation />}
                {children}
            </main>
            {showBottomNav && <BottomNavigation />}
        </div>
    )
}

export default UnauthenticatedLayout

