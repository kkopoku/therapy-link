"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { getTherapists } from "./page.functions";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function SessionsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getTherapists(session, setRecords, setLoading);
  }, [session]);

  useEffect(() => {
    const filtered = records.filter(
      (record) =>
        record.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.otherNames.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecords(filtered);
  }, [records, searchTerm]);

  return (
    <AuthenticatedLayout
      pageName="Therapists"
      navFunctionName="Sign Out"
      navFunction={() => signOut({ callbackUrl: "/auth/login" })}
      sideBarFocus="My Therapists"
    >
      <div className="flex flex-col gap-y-3 h-full w-full">

        <h1 className="text-2xl font-semibold">
          Manage Therapist
        </h1>

        <Input
          placeholder="Search therapists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[300px] h-8 border-primaryGreen"
        />

        <div className="max-h-fit w-full rounded-xl border border-primaryGreen border-dashed relative overflow-y-scroll shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primaryGreen min-w-40 font-normal py-2 text-white">
                  Name
                </TableHead>
                <TableHead className="bg-primaryGreen min-w-52 font-normal py-2 text-white">
                  Availability
                </TableHead>
                <TableHead className="bg-primaryGreen min-w-20 font-normal py-2 text-white">
                  Gender
                </TableHead>
                <TableHead className="bg-primaryGreen min-w-20 font-normal py-2 text-white">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <TableRow key={idx}>
                      {Array.from({ length: 4 }).map((_, cellIdx) => (
                        <TableCell key={cellIdx}>
                          <Skeleton className="h-6 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : filteredRecords.map((data, idx) => (
                    <TableRow
                      key={idx}
                      onClick={() => router.push(`/therapists/${data._id}`)}
                      className="cursor-pointer hover:bg-gray-50 font-light"
                    >
                      <TableCell className="h-10">{(data?.firstName + " " + data?.otherNames).trim()}</TableCell>
                      <TableCell className="h-10">{data?.availability}</TableCell>
                      <TableCell className="h-10">{data?.gender}</TableCell>
                      <TableCell className="h-10">{data?.onboardingStatus}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
