"use client"

import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout"
import LoadingSpinner from "@/components/loading/LoadingSpinner"
import { useState, useEffect } from "react"
import { verifyOTP } from "./page.functions"
import { toast } from "sonner"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function VerifyAccountPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [verified, setVerified] = useState<boolean>(false)

  useEffect(() => {
    const checkOTP = async () => {
      try {
        setLoading(true)
        const response = await verifyOTP(id as string)
        setVerified(true)
        setLoading(false)
      } catch (error: any) {
        toast.error(error.message)
        setLoading(false)
      }
    }

    checkOTP()
  }, [id])

  const handleGoToLogin = () => {
    router.push("/auth/login")
  }

  return (
    <UnauthenticatedLayout>
      {loading ? (
        <div className="flex flex-grow items-center justify-center h-full">
          <LoadingSpinner show size={50} border={5} />
        </div>
      ) : verified ? (
        <div className="flex flex-col flex-grow items-center justify-center h-full space-y-6 text-center">
          <CheckCircle className="w-16 h-16 text-primaryGreen" />
          <h1 className="text-3xl font-bold">Account Verified!</h1>
          <p className="text-lg text-gray-600 max-w-md">
            Your account has been successfully verified. You can now log in and start using our services.
          </p>
          <Button onClick={handleGoToLogin} className="mt-4">
            Go to Login
          </Button>
        </div>
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center h-full space-y-6 text-center">
          <h1 className="text-3xl font-bold text-red-500">Verification Failed</h1>
          <p className="text-lg text-gray-600 max-w-md">
            We couldn't verify your account. Please try again or contact support if the problem persists.
          </p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Go to Home
          </Button>
        </div>
      )}
    </UnauthenticatedLayout>
  )
}