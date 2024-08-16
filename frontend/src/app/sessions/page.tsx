"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";


export default function SessionsPage(){

    function createSession(){
        console.log("create session")
    }

    return(
        <AuthenticatedLayout pageName="Sessions" navFunctionName="Create Session" navFunction={createSession}>
            hello blud, you are at sessions
        </AuthenticatedLayout>
    )
}