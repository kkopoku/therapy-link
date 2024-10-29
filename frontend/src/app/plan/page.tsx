"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";
import ComingSoon from "@/components/pages/ComingSoon";


export default function PlanPage(){

    const { data: session } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Plan" navFunctionName="sign out" navFunction={()=>signOut({callbackUrl:"/auth/login"})} sideBarFocus="Plan">
           <ComingSoon />
        </AuthenticatedLayout>
    )
}