import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface LogoProps{
    theme?: string
    size?: number
}

const Logo:React.FC<LogoProps> = ({theme="black", size=1}) => {

    const router = useRouter()

    const src = (theme == "black") ? "/logos/logo_black.png" : "/logos/logo_white.png"

    return(
        <button onClick={()=>router.push("/")} className="flex justify-center items-center">
            <Image width={40*size} height={40*size} className="w-auto h-auto" alt="logo" src={src}/>
        </button>
    )
}

export default Logo