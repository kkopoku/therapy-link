"use client"

import { Table } from "flowbite-react"
import { data } from "./page.functions"

export default function LoadingDashboard(){
    return(
        <div className="flex flex-col gap-y-5 overflow-scroll">
            <div className="flex flex-col text-xs items-center"> 
                <div className="grid grid-cols-3 w-full gap-6">
                    <div className="col-span-1 w-full h-24 bg-slate-200 animate-pulse rounded-3xl border-dashed border border-slate-400"/>
                    <div className="col-span-1 w-full h-24 bg-slate-200 animate-pulse rounded-3xl border-dashed border border-slate-400"/>
                    <div className="col-span-1 w-full h-24 bg-slate-200 animate-pulse rounded-3xl border-dashed border border-slate-400"/>
                </div>
            </div>


            <div className="flex flex-col w-full flex-grow overflow-hidden gap-y-2">
                <label className="w-full max-w-80 animate-pulse h-5 bg-slate-300 rounded-full"/>
                <div className="max-h-fit rounded-xl border border-slate-400 border-dashed overflow-y-scroll shadow-md">
                    <Table hoverable>
                        <Table.Head >
                            <Table.HeadCell><div className="bg-slate-100 rounded-full w-full"/></Table.HeadCell>
                            <Table.HeadCell><div className="bg-slate-100 rounded-full w-full"/></Table.HeadCell>
                            <Table.HeadCell><div className="bg-slate-100 rounded-full w-full"/></Table.HeadCell>
                            <Table.HeadCell><div className="bg-slate-100 rounded-full w-full"/></Table.HeadCell>
                            <Table.HeadCell><div className="bg-slate-100 rounded-full w-full"/></Table.HeadCell>
                            <Table.HeadCell><div className="bg-slate-100 rounded-full w-full"/></Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {data.map(data => 
                                <Table.Row key={data.date+data.status} className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 leading-none">
                                    <Table.Cell className="whitespace-nowrap"><div className="py-1 bg-slate-300 h-3 rounded-full w-full"/></Table.Cell>
                                    <Table.Cell className="py-0 leading-none"><div className="py-1 bg-slate-300 h-3 rounded-full w-full"/></Table.Cell>
                                    <Table.Cell className="py-0 leading-none"><div className="py-1 bg-slate-300 h-3 rounded-full w-full"/></Table.Cell>
                                    <Table.Cell className="py-0 leading-none"><div className="py-1 bg-slate-300 h-3 rounded-full w-full"/></Table.Cell>
                                    <Table.Cell className="py-0 leading-none"><div className="py-1 bg-slate-300 h-3 rounded-full w-full"/></Table.Cell>
                                    <Table.Cell className="py-0 leading-none"><div className="py-1 bg-slate-300 h-3 rounded-full w-full"/></Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}