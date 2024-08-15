"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <UnauthenticatedLayout>
      <div className="grid flex-grow grid-cols-2 items-center justify-center w-full h-full bg-yellow-400">
        <div className="flex col-span-1 flex-grow h-full w-full bg-[#1A3634]"></div>

        <div className="flex flex-col col-span-1 flex-grow h-full w-full bg-white items-center justify-center">
          <div className="col-span-2 lg:col-span-1 bg-white flex flex-col items-center justify-center px-5 lg:px-16 gap-y-2">
            <div className="text-center text-2xl text-black font-bold">
              Sign In
            </div>

            <div className="text-center text-sm font-semibold text-slate-700">
              Enter your email and password to sign in
            </div>

            <form
              className="flex flex-col w-full items-center gap-2"
              onSubmit={handleSubmit}
            >
              <input
                className="border border-slate-500 rounded-md px-3 min-h-10 w-full"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="border border-slate-500 rounded-md px-3 min-h-10 w-full"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}

              <PrimaryButton type="submit">Sign In</PrimaryButton>
            </form>

            <span className="text-center text-sm font-light lg:w-2/3">
              By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </span>
          </div>
        </div>
      </div>
    </UnauthenticatedLayout>
  )
}
