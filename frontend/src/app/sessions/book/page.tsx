"use client";

import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getCredits, bookSession } from "./page.functions";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";


export default function BookSessionPage() {
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState("");
  const { data:session } = useSession()

  useEffect(() => {
    if(session) {
      const token = `${session?.user?.token}`
      const credits = getCredits(token, setLoading, setCredits)
      console.log(credits)
    }
  },[session])

  const handleSubmit = async (e: React.FormEvent) => {
    const logtag = "[book][handleSubmit]"
    e.preventDefault();
    const toastId = toast.loading("Booking ...")
    setLoading(true)
    try{
      if(session){
        let response = await bookSession(session?.user.token, startDate, duration)
        console.log(`${logtag} ${JSON.stringify(response)}`)
        toast.success("Successfully booked", {id:toastId})
        setCredits((prev)=>`${+prev - +duration}`)
      }
    }catch(error:any){
      console.log(`${logtag} Error: ${error}`)
      toast.error(error.message, {id:toastId})
    }
    setLoading(false)
  };

  return (
    <AuthenticatedLayout pageName="Book Session">
      <Toaster />
      <div className="flex flex-row w-full">
        <button className="bg-primaryGreen text-white text-sm font-extralight rounded py-1 px-2">{`Credit(s): ${credits}`}</button>
      </div>

      <div className="flex flex-grow justify-center items-center w-full">
        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Book a Session</CardTitle>
            <CardDescription>Schedule your therapy session</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-2 gap-3 w-full">
              <div className="flex flex-col">
                <Label htmlFor="startDate">Start Date and Time</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={duration}
                  onChange={(e: any) => setDuration(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primaryGreen hover:bg-secondaryGreen">
                Book Session
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
