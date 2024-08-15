"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage(){

    const { data: session, status } = useSession()

    return (
        <AuthenticatedLayout>
            <div className="text-4xl font bold"> User is now Authenticated </div>
            <div className="flex flex-col pt-20 gap-y-3 text-xs w-screen font bold text-wrap items-center justify-center"> 
                <div>{ JSON.stringify(session?.user.type) }</div>
                <button className="p-2 text-center bg-black text-white hover:scale-105 transition-all rounded-lg" onClick={()=>signOut()}>sign out</button>
            </div>
        </AuthenticatedLayout>
    )
}