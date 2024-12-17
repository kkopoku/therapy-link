"use client"

import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { useSession, signOut } from "next-auth/react"
import { ClientDashboard } from "../../components/dashboard/Client"
import { TherapistDashboard } from "../../components/dashboard/Therapist"
import AdministratorDashboard from "../../components/dashboard/Administrator"
import LoadingDashboard from "../../components/dashboard/Loading"
import { getDashboardInfo } from "./page.functions";


export default function DashboardPage(){

    const [records, setRecords] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { data: session } = useSession()
    const user = session?.user

    useEffect(()=>{
      getDashboardInfo(session, setRecords, setLoading)
    },[session])

    return (
        <AuthenticatedLayout pageName="Dashboard" navFunctionName="sign out" navFunction={()=>signOut({callbackUrl:"/auth/login"})} sideBarFocus="Dashboard">

            <div className="flex flex-grow flex-col gap-y-5 w-full overflow-hidden">

              <div className="text-2xl font-light"> Hello, {user?.name} 👋🏽</div>

              {(loading && records.length == 0) ? 
                <>
                  <LoadingDashboard />
                </> 
                :
                <>
                  {user?.type === "Therapist" && <TherapistDashboard records={records} loading={loading}/>}
                  {user?.type === "Administrator" && <AdministratorDashboard />}
                  {user?.type === "Client" && <ClientDashboard records={records} loading={loading}/>}
                </>
              }
              

            </div>
        </AuthenticatedLayout>
    )
}