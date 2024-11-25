"use client"

import React, { useEffect, useState } from "react"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { Table } from "flowbite-react"
import { getSessions, createSession } from "./page.functions"
import { Toaster } from "react-hot-toast"
import { useSession } from "next-auth/react"
import LoadingTable from "@/components/loading/LoadingTable"
import { useRouter } from "next/navigation"


export default function SessionsPage(){

    const [records, setRecords] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(()=>{
        getSessions(session, setRecords, setLoading)
    },[session])

    useEffect(()=>{
        
    },[])

    return(
        <AuthenticatedLayout pageName="Sessions" navFunctionName="Book Session" navFunction={()=>router.push("sessions/book")} sideBarFocus="My Sessions">
            <Toaster />
            <div className="flex flex-grow flex-col gap-y-5 w-full overflow-scroll">

            {!loading && <div className="flex flex-col border-none flex-grow gap-y-5 overflow-hidden">
                    <label>{("Upcoming Therapy Sessions").toUpperCase()}</label>
                    <div className="max-h-fit w-full rounded-xl border border-primaryGreen border-dashed relative overflow-y-scroll shadow-md">
                        <Table hoverable>
                            <Table.Head className="text-white font-extralight">
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Start Date</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Start Time</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">End Date</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">End Time</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Therapist Name</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Duration</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {records.map((data:any,idx:number)=>
                                    <Table.Row key={idx} onClick={()=>{
                                        router.push(`/sessions/view/${data._id}`)
                                    }} className="bg-white hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800 leading-none">
                                        <Table.Cell>{(new Date(data.startDate)).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                        <Table.Cell>{(new Date(data.endDate)).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>{(new Date(data.endDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                        <Table.Cell>{data.endDate}</Table.Cell>
                                        <Table.Cell>{data.duration}</Table.Cell>
                                        <Table.Cell>{data.status}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>}

                {loading && <LoadingTable />}
                
            </div>
        </AuthenticatedLayout>
    )
}