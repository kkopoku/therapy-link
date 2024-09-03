"use client"

import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { useSession } from "next-auth/react"

export default function ClientViewPage(){

    const {data: session } = useSession()
    const user = session?.user

    return(
        <AuthenticatedLayout pageName="Client Details">
            <div>Here MF !</div>
            <div className="max-w-96">{JSON.stringify(user)}</div>
        </AuthenticatedLayout>
    )

}