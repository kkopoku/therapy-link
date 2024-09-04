"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { useSession, signOut } from "next-auth/react"
import ClientDashboard from "./Client";
import TherapistDashboard from "./Therapist"
import AdministratorDashboard from "./Administrator"
import LoadingDashboard from "./Loading"


export default function DashboardPage(){

    const { data: session } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Dashboard" navFunctionName="sign out" navFunction={()=>signOut({callbackUrl:"/auth/login"})}>

            <div className="flex flex-grow flex-col gap-y-5 w-full overflow-hidden">

              <div className="text-2xl font-light"> Hello, {user?.name} 👋🏽</div>

              {!session ? 
                <>
                  <LoadingDashboard />
                </> 
                :
                <>
                  {user?.type === "Therapist" && <TherapistDashboard />}
                  {user?.type === "Administrator" && <AdministratorDashboard />}
                  {user?.type === "Client" && <ClientDashboard />}
                </>
              }
              

            </div>
        </AuthenticatedLayout>
    )
}