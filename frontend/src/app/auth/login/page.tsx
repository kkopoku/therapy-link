"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout"
import Image from "next/image"
import BlackLogo from "@/components/logo/logo-black"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

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
    setLoading(false)
  }

  return (
    <UnauthenticatedLayout>
      <div className="grid flex-grow grid-cols-1 lg:grid-cols-3 items-center justify-center w-full h-full">

        <div className="flex flex-col col-span-1 flex-grow h-full w-full bg-white items-center justify-center">
          <div className="col-span-2 lg:col-span-1 min-h-[30rem] w-full max-w-lg rounded-lg p-5 flex flex-col items-center justify-center px-14 lg:px-5 gap-y-2">
            
            <BlackLogo />
            
            <div className="text-center text-2xl text-black font-semibold pt-5">
              Sign In
            </div>

            <div className="text-center text-sm font-medium text-slate-700">
              Enter your email and password to sign in
            </div>

            <form
              className="flex flex-col w-full items-center gap-5 text-sm font-extralight"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full">
                <label className="w-full text-xs pl-1">Email <span className="text-red-600">*</span></label>
                <input
                  className="border border-slate-500 rounded-lg px-3 min-h-10 w-full disabled:bg-slate-200"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  disabled={loading}
                  required
                />
              </div>

            <div className="flex flex-col w-full">
              <label className="w-full text-xs pl-1">Password <span className="text-red-600">*</span></label>
              <input
                className="border border-slate-500 rounded-lg px-3 min-h-10 w-full disabled:bg-slate-200"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            <PrimaryButton type="submit">Sign In</PrimaryButton>
            </form>
            

            {/* <span className="flex gap-2 items-center text-center text-xs font-light">
              <input type="checkbox" className=""/>
              <a>By clicking continue, you agree to our Terms of Service and Privacy Policy.</a>
            </span> */}

          </div>
        </div>

        <div className="hidden lg:flex relative col-span-2 flex-grow h-full w-full">
          <Image alt="image" fill className="absolute inset-0 w-full h-full object-cover" src="/landing-page/image1.jpg"/>
          <div className="h-full inset-0 z-10 w-full bg-primaryGreen bg-opacity-60"></div>
        </div>
      </div>
    </UnauthenticatedLayout>
  )
}
