import Image from "next/image";
import TopNavigation from "@/components/navigation/TopNavigation";
import InfoCard from "@/components/cards/InfoCard";
import { BsInfoCircle } from "react-icons/bs";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const cardItems = [
  {
    title:"Mental Healthcare, on your time", 
    description: "Book a session from your app whenever you need help. Many of our clinicians work nights or weekends.", 
    icon:""
  },
]

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-white font-sans text-black">

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
            className="w-auto h-auto lg:pt-9"
            alt="First Image"
            src="/landing-page/image2.jpg"
            width={550}
            height={350}
            priority
          />
      </div>

      <div className="grid grid-cols-4 min-h-96 bg-[#E7D3AD] w-full p-28 gap-7 " >

        <div className="col-span-4 w-full">
          <p className="font-bold">Mental Healthcare, on your time</p>
          <p className="text-gray-700 font-light">Get access to an expert as soon as you need support</p>
        </div>

        <div className="col-span-1">
          <InfoCard 
            title="Direct access all the time"
            description="Book a session from your app whenever you need help. Many of our clinicians work nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard 
            title="Direct access all the time"
            description="Book a session from your app whenever you need help. Many of our clinicians work nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard 
            title="Direct access all the time"
            description="Book a session from your app whenever you need help. Many of our clinicians work nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard 
            title="Direct access all the time"
            description="Book a session from your app whenever you need help. Many of our clinicians work nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-2">
          <InfoCard 
            title="Direct access all the time"
            description="Book a session from your app whenever you need help. Many of our clinicians work nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-2">
          <InfoCard 
            title="Direct access all the time"
            description="Book a session from your app whenever you need help. Many of our clinicians work nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

      </div>

      <div className="flex w-full bg-[#1A3634] min-h-48 px-10 items-center justify-center text-center text-2xl text-white font-semibold">
        Pay as low as GHS 150.00 for a Session
      </div>

      <div className="flex min-h-96 z-10 w-full py-10 justify-center items-center">
        
      </div>

      <BottomNavigation />

    </main>
  );
}
