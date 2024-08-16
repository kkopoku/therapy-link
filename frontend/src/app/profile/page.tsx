"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";


export default function ProfilePage(){

    function createProfile(){
        console.log("create session")
    }

    return(
        <AuthenticatedLayout pageName="Profile" navFunctionName="Create Profile" navFunction={createProfile}>
            Hello blud. You're at profile
        </AuthenticatedLayout>
    )
}