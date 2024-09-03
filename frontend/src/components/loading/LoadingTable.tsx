"use client"

import { Table } from "flowbite-react"
import { data } from "@/components/dummy"

export default function LoadingTable(){
    return(
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
                            {data.map((data,idx) => 
                                <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800 py-0 leading-none">
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
        // </div>
    )
}