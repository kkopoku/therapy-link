"use client"

import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSessionDetails } from "../../page.functions";
import { Toaster } from "react-hot-toast";
import PrimaryInput from "@/components/inputs/PrimaryInput";

interface SessionDetails {
    _id: string;
    duration: number;
    therapistId: string;
    clientId: string;
    startDate: string;
    endDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function ViewSessionPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [sessionDetails, setSessionDetails] = useState<SessionDetails | null>(null);
    const params = useParams();
    const { data: session } = useSession();
    const sessionId = params.sessionId as string;

    useEffect(() => {
        setLoading(true);
        getSessionDetails(session, sessionId, setSessionDetails, setLoading);
    }, [session, sessionId]);

    return (
        <AuthenticatedLayout pageName="View Session">
            <Toaster />
            <div className="w-full flex flex-col flex-grow pt-10">
                <div className="flex h-full flex-row w-full">
                    <div className="grid grid-cols-5 w-full gap-x-5">
                        <div className="flex flex-col col-span-2 font-extralight">
                            <span>Session Information</span>
                            <span className="text-xs">Details of the selected session</span>
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
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Session ID" value={`${sessionDetails?._id}`} disabled/></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Duration (Minutes)" value={`${sessionDetails ? sessionDetails.duration/60 : "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Therapist Name" value={`${sessionDetails?.therapistId ?? "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Client Name" value={`${sessionDetails?.clientId ?? "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Start Date" value={new Date(sessionDetails?.startDate ?? "").toLocaleDateString() ?? "N/A"} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="End Date" value={new Date(sessionDetails?.endDate ?? "").toLocaleDateString() ?? "N/A"} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Status" value={`${sessionDetails?.status ?? "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Created At" value={new Date(sessionDetails?.createdAt ?? "").toLocaleString() ?? "N/A"} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Updated At" value={new Date(sessionDetails?.updatedAt ?? "").toLocaleString() ?? "N/A"} disabled /></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
