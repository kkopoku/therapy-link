"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";

export default function PlanPage(){

    const { data: session } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Plan" navFunctionName="sign out" navFunction={signOut}>
            <div className="flex min-h-screen w-full">
            </div>
        </AuthenticatedLayout>
    )
}