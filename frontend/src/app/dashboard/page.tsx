"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { useSession, signOut } from "next-auth/react"
import ClientDashboard from "./client";
import TherapistDashboard from "./therapist";
import AdministratorDashboard from "./administrator";
import { Session } from "next-auth";

export default function DashboardPage(){

    const { data: session, status } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Dashboard" navFunctionName="sign out" navFunction={signOut}>

            <div className="flex flex-grow flex-col gap-y-5 w-full overflow-hidden">

              <div className="text-2xl font-light"> Hello, {user?.name} 👋🏽</div>

              {!session ? 
                <div className="text 6xl font-semibold">Loading MF</div> 
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