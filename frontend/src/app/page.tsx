import Image from "next/image";
import TopNavigation from "@/components/navigation/TopNavigation";

export default function Home() {
  interface ButtonItem {
    name: string;
    style: string;
    link: string;
  }

  const firstButtonList:ButtonItem[] = [
    {name: "Pricing", style:"", link:""},
    {name: "Solutions", style:"", link:""},
    {name: "Community", style:"", link:""},
    {name: "Resources", style:"", link:""},
    {name: "Contact", style:"", link:""}
  ]
  const secondButtonList:ButtonItem[] = [
    {name: "Sign In", style:"rounded-md py-1 px-2 border border-[#1A3634] bg-slate-200 transition-all duration-500", link:""},
    {name: "Register", style:"rounded-md py-1 px-2 border text-white border-[#1A3634] bg-[#314845] hover:bg-[#1A3634] transition-all duration-500", link:""},
  ]

  const firstButtonListStyle:string = "rounded-md py-1 px-2 bg-slate-100 hover:bg-slate-300 transition-all duration-500"

  return (
    <main className="flex min-h-screen flex-col items-center bg-white font-mono text-black">

      <TopNavigation />

      <div className="flex flex-col bg-[#1A3634] w-full items-center justify-center min-h-96 text-white gap-y-3">
        <p className="text-4xl text-center font-bold">Safe Space To Figure Things Out</p>
        <p className="text-md text-center font-medium">What Mental Health Support Do You Need?</p>
      </div>

      <div className="px-5 py-20 grid grid-cols-1 w-full max-w-5xl justify-items-center lg:grid-cols-2 gap-5">
          <Image 
            className="w-auto h-auto"
            alt="First Image"
            src="/landing-page/image1.jpg"
            width={550}
            height={350}
            priority
          />
          <Image 
            className="w-auto h-auto"
            alt="First Image"
            src="/landing-page/image2.jpg"
            width={550}
            height={350}
            priority
          />
      </div>

      <div className="min-h-96 bg-[#E7D3AD] w-full" >
        
      </div>

    </main>
  );
}
