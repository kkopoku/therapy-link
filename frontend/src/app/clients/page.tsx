"use client"

import React, { useEffect, useState } from "react"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { Table } from "flowbite-react"
import { getClients } from "./page.functions"
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
        getClients(session, setRecords, setLoading)
    },[session])

    return(
        <AuthenticatedLayout pageName="Clients">
            <Toaster />
            <div className="flex flex-grow flex-col gap-y-5 w-full overflow-scroll">

            {!loading && <div className="flex flex-col border-none flex-grow gap-y-5 overflow-hidden">
                    <label>{("Your Clients").toUpperCase()}</label>
                    <div className="max-h-fit w-full rounded-xl border border-primaryGreen border-dashed relative overflow-y-scroll shadow-md">
                        <Table hoverable>
                            <Table.Head className="text-white font-extralight">
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Name</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Email</Table.HeadCell>
                                <Table.HeadCell className="bg-primaryGreen py-2 font-normal sticky top-0">Phone Number</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {records.map((data:any,idx:number)=>
                                    <Table.Row key={idx} onClick={()=>{
                                        router.push(`/clients/view/${data._id}`)
                                    }} className="bg-white hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800 leading-none">
                                        <Table.Cell>{`${data.firstName} ${data.otherNames}`}</Table.Cell>
                                        <Table.Cell>{data.email}</Table.Cell>
                                        <Table.Cell>{data.primaryPhone}</Table.Cell>
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