"use client"

import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import PrimaryInput from "@/components/inputs/PrimaryInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useSession } from "next-auth/react";
import { getCustomerDetails, createProfile, updateUserDetails, changePassword } from "./page.functions";
import { Toaster } from "react-hot-toast"


export default function ProfilePage(){

    const [firstName, setFirstName] = useState<string|null>(null)
    const [otherNames, setOtherNames] = useState<string|null>(null)
    const [primaryPhone, setPrimaryPhone] = useState<string|null>(null)
    const [secondaryPhone, setSecondaryPhone] = useState<string|null>(null)
    const [email, setEmail] = useState<string|null>(null)
    const [password, setPassword] = useState<string|null>(null)
    const [confirmPassword, setConfirmPassword] = useState<string|null>(null)
    const [showPasswords, setShowPasswords] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}`
    const { data: session } = useSession()

    useEffect(()=>{
        getCustomerDetails
        (
            session, 
            setFirstName, 
            setEmail, 
            setSecondaryPhone, 
            setPrimaryPhone, 
            setOtherNames, 
            apiUrl,
            setLoading
        );
    }, [session])


    return(
        <AuthenticatedLayout pageName="Profile" navFunctionName="Create Profile" navFunction={createProfile} sideBarFocus="Profile">
            <Toaster />
            <div className="w-full flex flex-col flex-grow">

                <div className="flex h-full items-center flex-row w-full border-b">

                    <div className="grid grid-cols-5 w-full gap-x-5">

                        <div className="flex flex-col col-span-2 font-extralight">
                            <span>Personal Information</span>
                            <span className="text-xs">Update Your Personal Information</span>
                        </div>

                        <form onSubmit={(e)=>updateUserDetails(e, firstName, otherNames, email, secondaryPhone, primaryPhone)} className="grid col-span-3 w-full">
                            <div className="grid grid-cols-2 gap-y-2">
                                <div className="flex flex-row col-span-2 items-center gap-x-5">
                                    <div className="flex rounded-full bg-blue-500 h-16 w-16 text-center items-center justify-center text-white text-3xl">{`${session?.user.name[0].toLocaleUpperCase() ?? ""}`}</div>
                                    { session && <div className="font-light text-xl">{`${session?.user.name ?? ""}`}</div>}
                                    {!session && <div className="animate-pulse bg-gray-300 h-6 w-full max-w-80 rounded"></div>}
                                </div>

                                <div className="flex flex-col col-span-2">
                                    {!loading && <div className="grid grid-cols-2 gap-x-5">
                                        <div className="col-span-2 lg:col-span-1">
                                            <PrimaryInput
                                                label="First Name"
                                                value={firstName ?? ""}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <PrimaryInput
                                                label="Other Names"
                                                value={otherNames ?? ""}
                                                onChange={(e) => setOtherNames(e.target.value)}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <PrimaryInput
                                                label="Email"
                                                value={email ?? ""}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <PrimaryInput
                                                label="Primary Phone"
                                                value={primaryPhone ?? ""}
                                                onChange={(e) => setPrimaryPhone(e.target.value)}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-span-2 lg:col-span-1">
                                            <PrimaryInput
                                                label="Secondary Phone"
                                                value={secondaryPhone ?? ""}
                                                onChange={(e) => setSecondaryPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>}
                                    {loading && <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                                        <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 h-12 rounded"></div>
                                        <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 h-12 rounded"></div>
                                        <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 h-12 rounded"></div>
                                        <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 h-12 rounded"></div>
                                        <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 h-12 rounded"></div>
                                    </div>}
                                    <div className="max-w-20 py-3">
                                        <PrimaryButton>Save</PrimaryButton>
                                    </div>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>

                <div className="grid flex-row w-full items-center h-full">
                    <div className="grid grid-cols-5 w-full gap-x-5">

                        <div className="flex flex-col col-span-2 font-extralight">
                            <span>Change Your Password</span>
                            <span className="text-xs">Update your password associated with your account.</span>
                        </div>

                        <form onSubmit={(e)=>changePassword(e, password, confirmPassword )} className="flex flex-col col-span-3 w-full">
                            {!loading && <div className="grid grid-cols-2 flex-row lg:gap-5">
                                <div className="lg:col-span-1 col-span-2 w-full">
                                    <PrimaryInput
                                        label="New Password"
                                        onChange={(e)=>setPassword(e.target.value)}
                                        value={password ?? ""}
                                        type="password"
                                        required={true}
                                    />
                                </div>
                                <div className="lg:col-span-1 col-span-2 w-full">
                                    <PrimaryInput
                                        label="Confirm Password"
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        value={confirmPassword ?? ""}
                                        type="password"
                                        required={true}
                                    />
                                </div>
                            </div>}

                            <div className="flex flex-col col-span-3 w-full">
                                {loading && <div className="grid grid-cols-2 flex-row gap-5">
                                    <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 w-full h-12 rounded"></div>
                                    <div className="col-span-2 lg:col-span-1 animate-pulse bg-gray-200 w-full h-12 rounded"></div>
                                </div>}
                            </div>

                            <div className="max-w-32 py-3">
                                <PrimaryButton>Change Password</PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    )
}