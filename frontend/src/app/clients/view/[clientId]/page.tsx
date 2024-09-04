"use client"

import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getClientDetails } from "../../page.functions";
import { Toaster } from "react-hot-toast";
import PrimaryInput from "@/components/inputs/PrimaryInput";

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
    { key: "email", label: "Email" },
    { key: "primaryPhone", label: "Primary Phone" },
    { key: "secondaryPhone", label: "Secondary Phone" },
    { key: "userType", label: "User Type" },
    { key: "momoNumber", label: "Momo Number" },
    { key: "momoNetwork", label: "Momo Network" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "firstName", label: "First Name" },
    { key: "otherNames", label: "Other Names" }
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
                    <div className="grid grid-cols-5 w-full gap-x-5">
                        <div className="flex flex-col col-span-2 font-extralight">
                            <span>Client Information</span>
                            <span className="text-xs">Details of the selected client</span>
                        </div>

                        <div className="flex flex-col col-span-3 w-full">
                            {loading ? (
                                <div className="grid grid-cols-2 gap-x-5 gap-y-3 animate-pulse">
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                    <div className="bg-gray-200 h-12 rounded"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                                    {items.map((item, idx)=> 
                                        <div className="lg:col-span-1 col-span-2" key={idx}>
                                            <PrimaryInput label={item.label} value={clientDetails ? clientDetails[item.key] : 'N/A'} disabled/>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
