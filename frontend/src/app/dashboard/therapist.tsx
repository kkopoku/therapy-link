"use client"

import { Table } from "flowbite-react"
import React from "react"
import { useRouter } from "next/navigation"
import LoadingTable from "@/components/loading/LoadingTable"
import LoadingDashboard from "./Loading"

interface Record{
    user: object
    sessions: Array<string>
}

interface TherapistDashboardProps{
    records: Record;
    loading: boolean;
}


export const TherapistDashboard: React.FC<TherapistDashboardProps> = ({ records, loading}) => {

    const router = useRouter()

    return(

        <>
            {!loading && records.sessions ? 
                <div className="flex flex-col gap-y-5 overflow-scroll">
                <div className="flex flex-col text-xs items-center"> 
                    <div className="grid grid-cols-3 w-full gap-6">
                        <div className="flex flex-col col-span-1 w-full h-24 max-h-24 bg-green-100 rounded-3xl border-dashed border border-secondaryGreen p-3">
                            <p>There is no linked TP in this MF</p>
                            <p className="text-xl">N/A</p>
                        </div>
                        <div className="col-span-1 w-full h-24 max-h-24 bg-slate-100 rounded-3xl border-dashed border border-secondaryGreen">
    
                        </div>
                        <div className="col-span-1 w-full h-24 max-h-24 bg-blue-100 rounded-3xl border-dashed border border-secondaryGreen">
    
                        </div>
                    </div>
                </div> 
    
                <div className="flex flex-col w-full flex-grow overflow-hidden">
                    <label>{("Upcoming Therapy Sessions").toUpperCase()}</label>
                    <div className="max-h-full rounded-xl border border-primaryGreen border-dashed overflow-y-scroll shadow-md">
                        <Table hoverable>
                            <Table.Head >
                                <Table.HeadCell>Start Date</Table.HeadCell>
                                <Table.HeadCell>Start Time</Table.HeadCell>
                                <Table.HeadCell>End Date</Table.HeadCell>
                                <Table.HeadCell>End Time</Table.HeadCell>
                                <Table.HeadCell>Duration</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {records.sessions.map((data:any,idx:number) => 
                                    <Table.Row key={idx} className="bg-white hover:cursor-pointer"
                                        onClick={()=> router.push(`/sessions/view/${data._id}`)}>
                                        <Table.Cell>{(new Date(data.startDate)).toDateString()}</Table.Cell>
                                        <Table.Cell>{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                        <Table.Cell>{(new Date(data.startDate)).toDateString()}</Table.Cell>
                                        <Table.Cell>{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                        <Table.Cell>{data.duration/(60)}</Table.Cell>
                                        <Table.Cell>{data.status}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
            : <LoadingDashboard />}
        </>
        
    )
}