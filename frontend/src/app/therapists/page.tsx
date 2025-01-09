"use client"

import React, { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { getTherapists } from "./page.functions"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function SessionsPage() {
  const [records, setRecords] = useState<any[]>([])
  const [filteredRecords, setFilteredRecords] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    getTherapists(session, setRecords, setLoading)
  }, [session])

  useEffect(() => {
    const filtered = records.filter(
      (record) =>
        record.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.otherNames.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRecords(filtered)
  }, [records, searchTerm])

  return (
    <AuthenticatedLayout
      pageName="Therapists"
      navFunctionName="Sign Out"
      navFunction={() => signOut({ callbackUrl: "/auth/login" })}
      sideBarFocus="My Sessions"
    >
      <Toaster />
      <div className="flex flex-col p-6 h-full w-full">
        <h1 className="text-2xl font-semibold mb-6">Upcoming Therapy Sessions</h1>

        <Card className="flex-1">
          <CardContent className="p-6">
            <div className="mb-4">
              <Input
                placeholder="Search therapists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md border-primaryGreen"
              />
            </div>
            <div className="rounded-md border border-primaryGreen">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primaryGreen text-white">First Name</TableHead>
                    <TableHead className="bg-primaryGreen text-white">Other Names</TableHead>
                    <TableHead className="bg-primaryGreen text-white">Availability</TableHead>
                    <TableHead className="bg-primaryGreen text-white">Gender</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, idx) => (
                      <TableRow key={idx}>
                        {Array.from({ length: 4 }).map((_, cellIdx) => (
                          <TableCell key={cellIdx}>
                            <Skeleton className="h-6 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    filteredRecords.map((data, idx) => (
                      <TableRow
                        key={idx}
                        onClick={() => router.push(`/sessions/view/${data._id}`)}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{data.firstName}</TableCell>
                        <TableCell>{data.otherNames}</TableCell>
                        <TableCell>{data.availability}</TableCell>
                        <TableCell>{data.gender}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  )
}

