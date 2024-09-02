import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function BlackLogo(){

    const router = useRouter()

    return(
        <div>
            <button onClick={()=>router.push("/")}>
                <Image width={40} height={40} className="w-auto h-auto" alt="logo" src="/logos/logo_only.png"/>
            </button>
        </div>
    )
}