import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface LogoProps{
    theme?: string
}

const LogoText:React.FC<LogoProps> = ({theme="black"}) => {

    const router = useRouter()

    const src = (theme == "black") ? "/logos/therapy link/PNGs no background/v1black.png" : "/logos/logo_white.png"

    return(
        <div>
            <button onClick={()=>router.push("/")}>
                <Image width={40} height={40} className="w-auto h-auto" alt="logo" src={src}/>
            </button>
        </div>
    )
}

export default LogoText