"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage(){

    const { data: session, status } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Dashboard" navFunctionName="sign out" navFunction={signOut}>
            <div className="flex flex-col min-h-screen w-full">
                <div className="text-2xl font-light"> Hello, {user?.name} 👋🏽</div>
                <div className="flex flex-grow flex-col pt-20 gap-y-3 text-xs items-center"> 
                    <div className="grid grid-cols-3 w-full gap-6">
                        <div className="flex flex-col col-span-1 w-full h-24 bg-green-100 rounded-3xl border-dashed border-2 border-secondaryGreen p-3">
                            <p>Linked Therapist:</p>
                            <p className="text-xl">N/A</p>
                        </div>
                        <div className="col-span-1 w-full h-24 bg-slate-100 rounded-3xl border-dashed border-2 border-secondaryGreen">

                        </div>
                        <div className="col-span-1 w-full h-24 bg-blue-100 rounded-3xl border-dashed border-2 border-secondaryGreen">

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}