"use client"

import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSessionDetails } from "../../page.functions";
import { Toaster } from "react-hot-toast";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation"

interface SessionDetails {
    _id: string;
    duration: number;
    therapist: any;
    client: any;
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
    const router = useRouter()

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

                        <div className="flex flex-col col-span-5 lg:col-span-2 font-extralight">
                            <span>Session Information</span>
                            <span className="text-xs">Details of the selected session</span>
                        </div>

                        <div className="flex flex-col col-span-5 lg:col-span-3 w-full gap-10">
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
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Therapist Name" value={`${sessionDetails?.therapist.firstName ?? "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Client Name" value={`${sessionDetails?.client.firstName ?? "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Start Date" value={new Date(sessionDetails?.startDate ?? "").toLocaleDateString() ?? "N/A"} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="End Date" value={new Date(sessionDetails?.endDate ?? "").toLocaleDateString() ?? "N/A"} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Status" value={`${sessionDetails?.status ?? "N/A"}`} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Created At" value={new Date(sessionDetails?.createdAt ?? "").toLocaleString() ?? "N/A"} disabled /></div>
                                    <div className="lg:col-span-1 col-span-2"><PrimaryInput label="Updated At" value={new Date(sessionDetails?.updatedAt ?? "").toLocaleString() ?? "N/A"} disabled /></div>
                                </div>
                            )}

                            <div className="h-full flex-row w-full">
                                <div className="w-full grid grid-cols-2 gap-5">
                                    <Button className="border-red-600 hover:bg-red-600 border-2 text-red-600 hover:text-white text-sm" >Cancel Session</Button >
                                    <Button className="bg-primaryGreen text-white hover:bg-secondaryGreen text-sm" onClick={()=>router.replace(`/sessions/video/${sessionDetails?._id}`)}>Start Session</Button >
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
