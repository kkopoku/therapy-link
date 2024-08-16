"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage(){

    const { data: session, status } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Dashboard" navFunctionName="sign out" navFunction={signOut}>
            <div className="flex min-h-screen w-full">
                <div className="text-2xl font-light"> Hello, {user?.name} 👋🏽</div>
                <div className="flex flex-col pt-20 gap-y-3 text-xs font bold text-wrap items-center justify-center"> 

                </div>
            </div>
        </AuthenticatedLayout>
    )
}