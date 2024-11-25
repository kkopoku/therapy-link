"use client";

import { useState } from "react";
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

export default function BookSessionPage() {
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking session:", { startDate, duration });
  };

  const credits = 100

  return (
    <AuthenticatedLayout pageName="Book Session">
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
