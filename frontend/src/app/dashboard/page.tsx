"use client"

import React from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { useSession, signOut } from "next-auth/react";
import { Table } from "flowbite-react";

const data:any[] = [
    {
      "date": "2024-08-21T14:00:00",
      "therapistName": "Dr. Emily Smith",
      "sessionType": "Online",
      "duration": "60 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-08-28T10:00:00",
      "therapistName": "Dr. John Doe",
      "sessionType": "In-person",
      "duration": "45 minutes",
      "sessionStatus": "Pending"
    },
    {
      "date": "2024-09-04T16:30:00",
      "therapistName": "Dr. Sarah Johnson",
      "sessionType": "Phone Call",
      "duration": "30 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-09-11T11:00:00",
      "therapistName": "Dr. Michael Brown",
      "sessionType": "Online",
      "duration": "60 minutes",
      "sessionStatus": "Rescheduled"
    },
    {
      "date": "2024-09-18T09:00:00",
      "therapistName": "Dr. Anna Williams",
      "sessionType": "In-person",
      "duration": "90 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-09-25T15:00:00",
      "therapistName": "Dr. Robert Davis",
      "sessionType": "Online",
      "duration": "60 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-10-02T12:00:00",
      "therapistName": "Dr. Jessica Wilson",
      "sessionType": "In-person",
      "duration": "45 minutes",
      "sessionStatus": "Pending"
    },
    {
      "date": "2024-10-09T13:30:00",
      "therapistName": "Dr. David Martinez",
      "sessionType": "Phone Call",
      "duration": "30 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-10-16T10:00:00",
      "therapistName": "Dr. Laura Garcia",
      "sessionType": "Online",
      "duration": "60 minutes",
      "sessionStatus": "Rescheduled"
    },
    {
      "date": "2024-10-23T17:00:00",
      "therapistName": "Dr. Thomas Robinson",
      "sessionType": "In-person",
      "duration": "90 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-10-30T09:30:00",
      "therapistName": "Dr. Susan Clark",
      "sessionType": "Online",
      "duration": "60 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-11-06T11:00:00",
      "therapistName": "Dr. Charles Lee",
      "sessionType": "Phone Call",
      "duration": "45 minutes",
      "sessionStatus": "Pending"
    },
    {
      "date": "2024-11-13T14:30:00",
      "therapistName": "Dr. Kimberly Lewis",
      "sessionType": "In-person",
      "duration": "30 minutes",
      "sessionStatus": "Confirmed"
    },
    {
      "date": "2024-11-20T16:00:00",
      "therapistName": "Dr. Mark Allen",
      "sessionType": "Online",
      "duration": "60 minutes",
      "sessionStatus": "Rescheduled"
    },
    {
      "date": "2024-11-27T08:00:00",
      "therapistName": "Dr. Patricia Walker",
      "sessionType": "In-person",
      "duration": "90 minutes",
      "sessionStatus": "Confirmed"
    }
  ]
  

export default function DashboardPage(){

    const { data: session, status } = useSession()
    const user = session?.user

    return (
        <AuthenticatedLayout pageName="Dashboard" navFunctionName="sign out" navFunction={signOut}>

            <div className="flex flex-grow flex-col gap-y-5 w-full">

                <div className="text-2xl font-light"> Hello, {user?.name} 👋🏽</div>

                <div className="flex flex-col text-xs items-center"> 
                    <div className="grid grid-cols-3 w-full gap-6">
                        <div className="flex flex-col col-span-1 w-full h-24 bg-green-100 rounded-3xl border-dashed border border-secondaryGreen p-3">
                            <p>Linked Therapist:</p>
                            <p className="text-xl">N/A</p>
                        </div>
                        <div className="col-span-1 w-full h-24 bg-slate-100 rounded-3xl border-dashed border border-secondaryGreen">

                        </div>
                        <div className="col-span-1 w-full h-24 bg-blue-100 rounded-3xl border-dashed border border-secondaryGreen">

                        </div>
                    </div>
                </div>


                <div className="flex flex-col w-full h-[540px]">
                    <label>{("Upcoming Therapy Sessions").toUpperCase()}</label>
                    <div className="pb-1 max-h-fit rounded-xl border border-primaryGreen border-dashed overflow-y-scroll shadow-md">
                        <Table hoverable className="relative">
                            <Table.Head >
                                <Table.HeadCell>Date</Table.HeadCell>
                                <Table.HeadCell>Time</Table.HeadCell>
                                <Table.HeadCell>Therapist Name</Table.HeadCell>
                                <Table.HeadCell>Session Type</Table.HeadCell>
                                <Table.HeadCell>Duration</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data.map(data => 
                                    <Table.Row key={data.date+data.status} className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{(new Date(data.date)).toDateString()}</Table.Cell>
                                        <Table.Cell className="py-0">{(new Date(data.date)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                        <Table.Cell className="py-0">{data.therapistName}</Table.Cell>
                                        <Table.Cell className="py-0">{data.sessionType}</Table.Cell>
                                        <Table.Cell className="py-0">{data.duration}</Table.Cell>
                                        <Table.Cell className="py-0">{data.sessionStatus}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>

                
            </div>
        </AuthenticatedLayout>
    )
}