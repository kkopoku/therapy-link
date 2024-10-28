"use client";
import Image from "next/image";
import InfoCard from "@/components/cards/InfoCard";
import { BsInfoCircle } from "react-icons/bs";
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout";

const cardItems = [
  {
    title: "Mental Healthcare, on your time",
    description:
      "Book a session from your app whenever you need help. Many of our clinicians work nights or weekends.",
    icon: "",
  },
];

export default function Home() {
  return (
    <UnauthenticatedLayout>
      <div className="flex flex-col bg-[#1A3634] w-full items-center justify-center min-h-96 text-white gap-y-3">
        <p className="text-5xl text-center font-medium">
          Connecting You To Care
        </p>
        <p className="text-xl text-center font-extralight">
          Access mental health support tailored to your needs and on your
          schedule.
        </p>
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

      <div className="grid grid-cols-4 min-h-96 bg-[#E7D3AD] w-full px-28 py-16 gap-7 ">
        <div className="col-span-4 w-full">
          <p className="font-bold">Mental Healthcare, on your time</p>
          <p className="text-gray-700 font-light">
            Access mental health support tailored to your needs and on your
            schedule.
          </p>
        </div>

        <div className="col-span-1">
          <InfoCard
            title="Direct Access Anytime"
            description="Book a session whenever you need help. Many of our clinicians are available nights or weekends."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard
            title="Personalized Support"
            description="Connect with a therapist who specializes in your area of concern, whether it’s anxiety, depression, or relationship issues."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard
            title="Flexible Payment Options"
            description="Affordable session rates and multiple payment options make it easy to prioritize your mental health."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard
            title="Confidential & Secure"
            description="Your privacy is our priority. All sessions are confidential and secured for your peace of mind."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard
            title="Therapists You Can Trust"
            description="All therapists are licensed professionals with years of experience in mental health care."
            icon={<BsInfoCircle />}
          />
        </div>

        <div className="col-span-1">
          <InfoCard
            title="On-Demand Support"
            description="Access additional resources like articles, meditations, and self-help tools anytime, anywhere."
            icon={<BsInfoCircle />}
          />
        </div>
      </div>

      <div className="flex-col w-full bg-[#1A3634] min-h-48 px-10 py-10 items-center justify-center text-white space-y-5">
        <div className="text-4xl text-center font-medium">
          Simple, Transparent Pricing
        </div>
        <div className="flex justify-center gap-4">
          <PricingCard
            features={["One hour session with a licensed therapist", "Book sessions at flexible times, subject to availability", "Access to a library of self-help articles and guides", ]}
            packageName="Basic"
            price="GHS 150/session"
            onGetStarted={() => console.log("hi")}
          />
          <PricingCard
            features={["Weekly sessions with a licensed therapist", "Video-based sessions for a more personal experience", "Access to premium content, including guided exercises and meditation resources"]}
            packageName="Pro"
            price="GHS 500/month"
            onGetStarted={() => console.log("hi")}
          />
          <PricingCard
            features={["Tailored session frequency based on your unique needs", " Continuity with the same therapist for long-term support","Around-the-clock access to support via text or email","Completely customized based on your use case, with progress tracking and regular adjustments"]}
            packageName="Custom"
            price="Custom based on your needs"
            onGetStarted={() => console.log("hi")}
          />
        </div>
      </div>

      <div className="flex min-h-96 z-10 w-full py-10 justify-center items-center"></div>
    </UnauthenticatedLayout>
  );
}

const PriceCard = () => {
  return (
    <div className="bg-white border text-black border-black min-h-12 min-w-40 rounded-xl p-5">
      Waguan, we need the vagina
    </div>
  );
};

interface PricingCardProps {
  packageName: string;
  price: string;
  features: string[];
  onGetStarted: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  packageName,
  price,
  features,
  onGetStarted,
}) => {
  return (
    <div className="flex flex-col w-full max-w-sm bg-white rounded-lg shadow-lg p-6 text-gray-800 justify-between">
      <div>
        <p className="text-2xl font-semibold mb-4">{packageName}</p>
        <p className="text-base font-medium text-gray-700 mb-6">{price}</p>
      </div>

      <div>
        <ul className="mb-6 space-y-1 text-gray-600 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 text-green-500">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onGetStarted}
        className="bg-[#1A3634] text-white py-2 px-6 rounded-lg font-medium hover:bg-[#16312b] transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
};
