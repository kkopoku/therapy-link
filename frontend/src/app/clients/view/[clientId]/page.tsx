"use client"

import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getClientDetails } from "../../page.functions";
import { Toaster } from "react-hot-toast";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import { AdminViewComponent } from "@/components/pages/client/admin-view";

interface ClientDetails {
    _id: string;
    email: number;
    primaryPhone: string;
    secondaryPhone?: string;
    userType: string;
    momoNumber: string;
    momoNetwork: string;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    otherNames: string;
}
 
const items = [
    // { key: "_id", label: "id" },
    { key: "firstName", label: "First Name" },
    { key: "otherNames", label: "Other Names" },
    { key: "email", label: "Email" },
    { key: "primaryPhone", label: "Primary Phone" },
    { key: "secondaryPhone", label: "Secondary Phone" },
    // { key: "userType", label: "User Type" },
    { key: "momoNumber", label: "Momo Number" },
    { key: "momoNetwork", label: "Momo Network" },
    // { key: "createdAt", label: "Created At" },
    // { key: "updatedAt", label: "Updated At" },
];

export default function ViewClientPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [clientDetails, setClientDetails] = useState(null);
    const params = useParams();
    const { data: session } = useSession();
    const clientId = params.clientId as string;

    useEffect(() => {
        setLoading(true);
        if(session) getClientDetails(session, clientId, setClientDetails, setLoading);
    }, [session]);

    return (
        <AuthenticatedLayout pageName="View Client">
            <Toaster />
            <div className="w-full flex flex-col flex-grow pt-10">
                <div className="flex h-full flex-row w-full">
                    {(session && session?.user.type === "Administrator") && <AdminViewComponent loading={loading} clientDetails={clientDetails} items={items} session={session} />}
                    {(session && session?.user.type === "Therapist") && <div>More Things gang</div>}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
