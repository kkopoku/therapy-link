import { Table } from "flowbite-react"
import { data } from "./page.functions"

export default function ClientDashboard(){
    return(
        <div className="flex flex-col gap-y-5 overflow-scroll">
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


                <div className="flex flex-col w-full flex-grow overflow-hidden">
                    <label>{("Upcoming Therapy Sessions").toUpperCase()}</label>
                    <div className="max-h-fit rounded-xl border border-primaryGreen border-dashed overflow-y-scroll shadow-md">
                        <Table hoverable>
                            <Table.Head >
                                <Table.HeadCell>Date</Table.HeadCell>
                                <Table.HeadCell>Time</Table.HeadCell>
                                <Table.HeadCell>Therapist Name</Table.HeadCell>
                                <Table.HeadCell>Session Type</Table.HeadCell>
                                <Table.HeadCell>Duration</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {data.map((data,idx) => 
                                    <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 leading-none">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{(new Date(data.date)).toDateString()}</Table.Cell>
                                        <Table.Cell className="py-0 leading-none">{(new Date(data.date)).toLocaleTimeString("en-US",{ hour12: false})}</Table.Cell>
                                        <Table.Cell className="py-0 leading-none">{data.therapistName}</Table.Cell>
                                        <Table.Cell className="py-0 leading-none">{data.sessionType}</Table.Cell>
                                        <Table.Cell className="py-0 leading-none">{data.duration}</Table.Cell>
                                        <Table.Cell className="py-0 leading-none">{data.sessionStatus}</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
              </div>
    )
}