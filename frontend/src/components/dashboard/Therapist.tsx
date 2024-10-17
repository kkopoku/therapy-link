"use client"

import { Table } from "flowbite-react"
import React, { PureComponent } from "react"
import { useRouter } from "next/navigation"
import LoadingDashboard from "./Loading"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FiUsers } from "react-icons/fi"
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { AiOutlineFileDone } from "react-icons/ai"
import { TbCalendarCancel } from "react-icons/tb"


interface Record{
    user: object
    sessions: Array<string>
    rejectedSessions: number
    upcomingSessions: number
    completedSessions: number
    totalRevenue: number
}

interface TherapistDashboardProps{
    records: Record
    loading: boolean
}

const data = [
    {
      name: "January",
      sessions: 4000,
      revenue: 2400,
      amt: 2400,
    },
    {
      name: "February",
      sessions: 3000,
      revenue: 1398,
      amt: 2210,
    },
    {
      name: "March",
      sessions: 2000,
      revenue: 9800,
      amt: 2290,
    },
    {
      name: "April",
      sessions: 2780,
      revenue: 3908,
      amt: 2000,
    },
    {
      name: "May",
      sessions: 1890,
      revenue: 4800,
      amt: 2181,
    },
    {
      name: "June",
      sessions: 2390,
      revenue: 13800,
      amt: 2500,
    },
    {
      name: "July",
      sessions: 3490,
      revenue: 4300,
      amt: 2100,
    },
]


export const TherapistDashboard: React.FC<TherapistDashboardProps> = ({ records, loading}) => {

    const router = useRouter()

    return(

        <>
            {!loading && records.sessions ? 
                <div className="flex flex-col gap-y-5 overflow-scroll">

                    <div className="flex flex-col text-xs items-center">

                        <div className="grid grid-cols-4 w-full gap-10">

                            <div className="flex flex-col col-span-1 w-full h-24 max-h-20 bg-green-100 rounded-3xl border-dashed border border-secondaryGreen p-3">
                                <p className="text-green-700"><span className="items-center align-middle inline-flex"><FaMoneyBillTrendUp /> &nbsp;</span>Total Revenue (GHS)</p>
                                <p className="text-xl text-green-700">{records.totalRevenue.toFixed(2)}</p>
                            </div>

                            <div className="flex flex-col col-span-1 w-full h-24 max-h-20 bg-blue-100 rounded-3xl border-dashed border border-secondaryGreen p-3">
                                <p className="text-blue-700"><span className="items-center align-middle inline-flex"><FiUsers /> &nbsp;</span>Total Clients</p>
                                <p className="text-xl text-blue-700">{records.upcomingSessions}</p>
                            </div>

                            <div className="flex flex-col col-span-1 w-full h-24 max-h-20 bg-slate-100 rounded-3xl border-dashed border border-secondaryGreen p-3">
                                <p><span className="items-center align-middle inline-flex text-sm"><AiOutlineFileDone /> &nbsp;</span>Completed Sessions</p>
                                <p className="text-xl">{records.completedSessions}</p>
                            </div>

                            <div className="flex flex-col col-span-1 w-full h-24 max-h-20 bg-red-50 rounded-3xl border-dashed border border-secondaryGreen p-3">
                                <p className="text-red-700"><span className="items-center align-middle inline-flex text-sm"><TbCalendarCancel /> &nbsp;</span>Rejected Sessions</p>
                                <p className="text-xl text-red-700">{records.rejectedSessions}</p>
                            </div>
                            
                        </div>
                    </div> 

                    <div className="flex flex-col text-xs items-center h-full max-h-56"> 
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    left: 5,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="sessions" name="Sessions(Count)" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="revenue" name="Revenue(GHS)" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
    
                    <div className="flex grid-cols-2 w-full flex-grow overflow-hidden gap-x-4">
                        <div className="flex flex-col col-span-1 w-full overflow-hidden">
                            <label className="text-sm">{("Upcoming Therapy Sessions")}</label>
                            <div className="max-h-full rounded-xl border border-primaryGreen border-dashed overflow-y-scroll shadow-md">
                                <Table hoverable>
                                    <Table.Head >
                                        <Table.HeadCell className="bg-primaryGreen text-center text-white font-extralight text-xs sticky top-0">Start Date</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-center text-white font-extralight text-xs sticky top-0">Start Time</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-center text-white font-extralight text-xs sticky top-0">End Date</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-center text-white font-extralight text-xs sticky top-0">End Time</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-center text-white font-extralight text-xs sticky top-0">Duration</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-center text-white font-extralight text-xs sticky top-0">Status</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {records.sessions.map((data:any,idx:number) => 
                                            <Table.Row key={idx} className="bg-white hover:cursor-pointer"
                                                onClick={()=> router.push(`/sessions/view/${data._id}`)}>
                                                <Table.Cell className="py-1 px-1 min-h-10 h-10 items-center text-center min-w-32 text-xs">{(new Date(data.startDate)).toDateString()}</Table.Cell>
                                                <Table.Cell className="py-1 px-1 min-h-10 h-10 items-center text-center min-w-32 text-xs">{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                                <Table.Cell className="py-1 px-1 min-h-10 h-10 items-center text-center min-w-32 text-xs">{(new Date(data.startDate)).toDateString()}</Table.Cell>
                                                <Table.Cell className="py-1 px-1 min-h-10 h-10 items-center text-center min-w-32 text-xs">{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                                <Table.Cell className="py-1 px-1 min-h-10 h-10 items-center text-center min-w-32 text-xs">{data.duration/(60)}</Table.Cell>
                                                <Table.Cell className="py-1 px-1 min-h-10 h-10 items-center text-center min-w-32 text-xs">{data.status}</Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>

                        <div className="flex flex-col col-span-1 w-full overflow-hidden">
                            <label className="text-sm">{("Upcoming Therapy Sessions")}</label>
                            <div className="max-h-full rounded-xl border border-primaryGreen border-dashed overflow-y-scroll shadow-md">
                                <Table hoverable>
                                    <Table.Head >
                                        <Table.HeadCell className="bg-primaryGreen text-white font-extralight text-xs sticky top-0">Start Date</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-white font-extralight text-xs sticky top-0">Start Time</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-white font-extralight text-xs sticky top-0">End Date</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-white font-extralight text-xs sticky top-0">End Time</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-white font-extralight text-xs sticky top-0">Duration</Table.HeadCell>
                                        <Table.HeadCell className="bg-primaryGreen text-white font-extralight text-xs sticky top-0">Status</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {records.sessions.map((data:any,idx:number) => 
                                            <Table.Row key={idx} className="bg-white hover:cursor-pointer"
                                                onClick={()=> router.push(`/sessions/view/${data._id}`)}>
                                                <Table.Cell className="py-1 min-w-32 text-xs">{(new Date(data.startDate)).toDateString()}</Table.Cell>
                                                <Table.Cell className="py-1 min-w-32 text-xs">{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                                <Table.Cell className="py-1 min-w-32 text-xs">{(new Date(data.startDate)).toDateString()}</Table.Cell>
                                                <Table.Cell className="py-1 min-w-32 text-xs">{(new Date(data.startDate)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                                <Table.Cell className="py-1 min-w-32 text-xs">{data.duration/(60)}</Table.Cell>
                                                <Table.Cell className="py-1 min-w-32 text-xs">{data.status}</Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>

                </div>
            : <LoadingDashboard />}
        </>
        
    )
}