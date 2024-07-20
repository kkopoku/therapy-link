import Image from "next/image";

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

      <div className="flex flex-row z-10 w-full max-w-5xl items-center justify-between text-sm py-5">

        <div className="basis-1/3">
          <p>Logo</p>
        </div>
        
        <div className="hidden lg:flex flex-row justify-between basis-2/3">
          <div className="flex flex-row gap-3">
            {firstButtonList.map(item=>(
              <button className={item.style ? item.style : firstButtonListStyle}>{item.name}</button>
            ))}
          </div>
          <div className="flex flex-row gap-3">
            {secondButtonList.map(item=>(
              <button className={item.style}>{item.name}</button>
            ))}
          </div>
        </div>
        
      </div>

      <div className="flex flex-col bg-[#1A3634] w-full items-center justify-center min-h-96 text-white gap-y-3">
        <p className="text-4xl text-center font-bold">Safe Space To Figure Things Out</p>
        <p className="text-md text-center font-medium">What Mental Health Support Do You Need?</p>
      </div>

      <div className="px-5 py-20 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Image
            alt="First Image"
            src="/landing-page/image1.jpg"
            width={550}
            height={350}
          />
          <Image 
            alt="First Image"
            src="/landing-page/image2.jpg"
            width={550}
            height={350}
          />
      </div>

      <div className="min-h-96 bg-[#E7D3AD] w-full" >
        
      </div>

    </main>
  );
}
