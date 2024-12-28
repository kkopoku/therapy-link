"use client";
import Image from "next/image";
import InfoCard from "@/components/cards/InfoCard";
import { BsInfoCircle } from "react-icons/bs";
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const cardItems = [
  {
    title: "Mental Healthcare, on your time",
    description:
      "Book a session from your app whenever you need help. Many of our clinicians work nights or weekends.",
    icon: "",
  },
];

const trustIndicators = [
  {
    icon: Shield,
    title: "Licensed Therapists",
    description: "Verified professionals",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book 24/7",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Tailored to you",
  },
  {
    icon: Users,
    title: "10k+ Users",
    description: "Trust our platform",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

export default function Home() {
  return (
    <UnauthenticatedLayout>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-[#E5D3B8]/10 to-transparent blur-3xl" />
      </div>

      {/* Green top element */}
      <div className="flex flex-row bg-gradient-to-t from-[#152c2a] to-[#152521] w-full justify-center min-h-[700px] h-[700px] text-white gap-y-3 px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: "all" }}
          variants={stagger}
          className="flex flex-col max-w-2xl h-full justify-center basis-1/2"
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col lg:text-[80px] text-4xl font-semibold w-full leading-tight lg:leading-none"
          >
            <div>Connecting you</div>
            <div>
              to <span className="text-[#f6ff76]">Care</span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="lg:text-xl font-extralight w-full"
          >
            Access mental health support tailored to your needs and on your
            schedule.
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-10 flex items-center gap-x-6"
          >
            <Button className="relative group bg-[#f6ff76] text-[#1C332D] hover:bg-[#f6ff76] px-8 py-6 text-lg overflow-hidden hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Book Session</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#f6ff76] to-[#aeb552] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Button>
            <Button className="relative group bg-transparent text-white border-2 border-white hover:bg-white/5 px-8 py-6 text-lg hover:scale-105 transition-all duration-300">
              <span className="relative z-10">How It Works</span>
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated trust indicators */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: "all" }}
          className="place-self-center justify-self-center justify-items-end gap-y-5 grid grid-cols-2 basis-1/2"
        >
          {trustIndicators.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex items-center"
              >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex h-12 min-w-12 items-center justify-center rounded-full bg-emerald-600/10 
                               transition-colors group-hover:bg-emerald-600/20 mr-2"
              >
                <item.icon className="h-6 w-6 text-emerald-600" />
              </motion.div>
              <div className="w-36">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}

        </motion.div>
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

      <div className="grid grid-cols-2 lg:grid-cols-4 min-h-96 bg-[#E7D3AD] w-full lg:px-28 px-5 py-16 gap-7 ">
        <div className="lg:col-span-4 col-span-2 w-full">
          <p className="font-bold text-lg lg:text-2xl">
            Mental Healthcare, on your time
          </p>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-4">
          <PricingCard
            features={[
              "One hour session with a licensed therapist",
              "Book sessions at flexible times, subject to availability",
              "Access to a library of self-help articles and guides",
            ]}
            packageName="Basic"
            price="GHS 150/session"
            onGetStarted={() => console.log("hi")}
          />

          <PricingCard
            features={[
              "Weekly sessions with a licensed therapist",
              "Video-based sessions for a more personal experience",
              "Access to premium content, including guided exercises and meditation resources",
            ]}
            packageName="Pro"
            price="GHS 500/month"
            onGetStarted={() => console.log("hi")}
          />

          <PricingCard
            features={[
              "Tailored session frequency based on your unique needs",
              " Continuity with the same therapist for long-term support",
              "Around-the-clock access to support via text or email",
              "Completely customized based on your use case, with progress tracking and regular adjustments",
            ]}
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
