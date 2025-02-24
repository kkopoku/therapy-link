"use client"

import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getSingleTherapist } from "../page.functions"
import { useSession } from "next-auth/react"
import LoadingSpinner from "@/components/loading/LoadingSpinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FileText } from "lucide-react"

interface Question {
  _id: string
  question: string
}

interface Answer {
  _id: string
  question: Question
  answer: string
}

interface Therapist {
  _id: string
  firstName: string
  otherNames: string
  email: string
  emailVerified: string
  userType: string
  bio: string
  gender: string
  specialty: string
  availability: string
  onboardingStatus: string
  answers: Answer[]
}

export default function ViewTherapistPage() {
  const params = useParams()
  const { data: session } = useSession()
  const therapistId = String(params.id)
  const [loading, setLoading] = useState<boolean>(true)
  const [therapist, setTherapist] = useState<Therapist | null>(null)

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        getSingleTherapist(session?.user.token as string, therapistId, setTherapist, setLoading)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
    fetchTherapist()
  }, [session, therapistId])

  const handleStatusUpdate = async (newStatus: string) => {
    if (!therapist) return

    // try {
    //   setLoading(true)
    //   await updateTherapistStatus(session?.user.token as string, therapistId, newStatus)
    //   setTherapist({ ...therapist, onboardingStatus: newStatus })
    //   toast.success(`Therapist status updated to ${newStatus}`)
    // } catch (error: any) {
    //   toast.error(error.message)
    // } finally {
    //   setLoading(false)
    // }
  }

  const handleViewResume = () => {
    // This is a placeholder URL. In a real application, you would use the actual resume URL from your database.
    const resumeUrl = `https://example.com/resumes/${therapistId}`
    window.open(resumeUrl, "_blank", "noopener,noreferrer")
    toast.success("Opening resume in a new tab")
  }

  const ActionButton = ({
    action,
    label,
    variant = "default",
  }: { action: string; label: string; variant?: "default" | "destructive" | "outline" }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant}>{label}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action will change the therapist's status to {action}.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleStatusUpdate(action)}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <AuthenticatedLayout pageName="View Therapist">
      {loading ? (
        <div className="flex flex-grow h-full items-center justify-center">
          <LoadingSpinner show border={5} size={50} />
        </div>
      ) : therapist ? (
        <div className="flex flex-col w-full space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback>
                  {therapist.firstName[0]}
                  {therapist.otherNames[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <CardTitle className="text-2xl">
                  {therapist.firstName} {therapist.otherNames}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{therapist.email}</p>
                <div className="flex gap-2 mt-2">
                  <Badge>{therapist.specialty}</Badge>
                  <Badge variant="outline">{therapist.gender}</Badge>
                  <Badge variant="secondary">{therapist.onboardingStatus}</Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={handleViewResume} variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </Button>
                {therapist.onboardingStatus === "Application In Review" && (
                  <>
                    <ActionButton action="Active" label="Approve" />
                    <ActionButton action="Denied" label="Deny" variant="destructive" />
                  </>
                )}
                {therapist.onboardingStatus === "Active" && (
                  <ActionButton action="Inactive" label="Deactivate" variant="outline" />
                )}
                {therapist.onboardingStatus === "Inactive" && <ActionButton action="Active" label="Activate" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Bio</h3>
                  <p className="text-sm text-muted-foreground">{therapist.bio}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Availability</h3>
                  <p className="text-sm text-muted-foreground">{therapist.availability}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questionnaire Answers</CardTitle>
            </CardHeader>
            <CardContent>
              {therapist?.answers?.map((answer, index) => (
                <div key={answer._id} className={`py-4 ${index !== 0 ? "border-t" : ""}`}>
                  <h4 className="font-medium mb-2">{answer.question.question}</h4>
                  <p className="text-sm text-muted-foreground">{answer.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">Therapist not found</p>
        </div>
      )}
    </AuthenticatedLayout>
  )
}