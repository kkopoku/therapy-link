import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface LogoProps{
    theme?: string
}

const Logo:React.FC<LogoProps> = ({theme="black"}) => {

    const router = useRouter()

    const src = (theme == "black") ? "/logos/logo_black.png" : "/logos/logo_white.png"

    return(
        <div>
            <button onClick={()=>router.push("/")}>
                <Image width={40} height={40} className="w-auto h-auto" alt="logo" src={src}/>
            </button>
        </div>
    )
}

export default Logo