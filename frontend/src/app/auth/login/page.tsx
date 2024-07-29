"use client"

import { useState } from "react"
import PrimaryButton from "@/components/buttons/PrimaryButton"

export default function Page() {

    const [email, setEmail] = useState("")

    return(
        <main className="grid grid-cols-2 min-h-screen text-black">

            <div className="hidden lg:block col-span-1 bg-[#1A3634]">
                <div className="p-5">Logo</div>
            </div>

            <div className="col-span-2 lg:col-span-1 bg-white flex flex-col items-center justify-center px-5 lg:px-16 gap-y-2">

                <div className="text-center text-2xl text-black font-bold">
                    Create An Account
                </div>

                <div className="text-center text-sm font-semibold text-slate-700">
                    Enter You Email To Create An Account
                </div>

                <form className="flex flex-col w-full items-center gap-2">
                    <input className="border border-slate-500 rounded-md px-3 min-h-10 w-full text-center" name="email" 
                    type="email" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <PrimaryButton>
                        Sign In With Email
                    </PrimaryButton>
                </form>

                <span className="font-light text-slate-500">or</span>

                <PrimaryButton>
                    Sign In With Google
                </PrimaryButton>

                <span className="text-center text-sm font-light lg:w-2/3">By clicking continue, you agree to our Terms of Service and Privacy Policy.</span>

            </div>

        </main>
    )
}