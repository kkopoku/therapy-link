"use client";
import Image from "next/image";
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardList, Clock, Coins, CreditCard, Heart, MessageSquare, Shield, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { Check, X, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Logo from "@/components/logo/LogoBlack";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from "next/navigation";

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

const features = [
  {
    name: "Provided by a qualified therapist",
    hasInfo: true,
    info: "All our therapy sessions are conducted by licensed and experienced professionals, ensuring you receive the highest quality care.",
    therapyLink: true,
    inOffice: true
  },
  {
    name: "In-office visits",
    hasInfo: true,
    info: "Prefer face-to-face interactions? Schedule in-office visits for a more personal touch.",
    therapyLink: false,
    inOffice: true
  },
  {
    name: "Video sessions",
    hasInfo: true,
    info: "Connect with your therapist via secure video calls, making therapy accessible wherever you are.",
    therapyLink: true,
    inOffice: false
  },
  {
    name: "Easy scheduling",
    hasInfo: true,
    info: "Our user-friendly platform allows you to book, reschedule, or cancel appointments with ease.",
    therapyLink: true,
    inOffice: false
  },
  {
    name: "Digital worksheets",
    hasInfo: true,
    info: "Access therapeutic worksheets to complement your sessions and track your progress over time.",
    therapyLink: true,
    inOffice: false
  },
  {
    name: "Smart provider matching",
    hasInfo: true,
    info: "We match you with the most suitable therapist based on your needs and preferences.",
    therapyLink: true,
    inOffice: false
  },
  {
    name: "Easy to switch providers",
    hasInfo: true,
    info: "Not satisfied with your current therapist? Switch to a new provider seamlessly, no questions asked.",
    therapyLink: true,
    inOffice: false
  },
  {
    name: "Access therapy from anywhere",
    hasInfo: true,
    info: "Whether you're at home or traveling, our platform ensures you can connect with your therapist from anywhere.",
    therapyLink: true,
    inOffice: false
  }
];

const steps = [
  {
    icon: ClipboardList,
    title: "Fill out a questionnaire",
    description: "Answer a few questions about your preferences and the issues you'd like to tackle in therapy."
  },
  {
    icon: Users,
    title: "Get matched with a therapist",
    description: "Based on your answers, we'll match you with a licensed therapist who fits your objectives, preferences, and the type of issues you are dealing with."
  },
  {
    icon: CreditCard,
    title: "Buy Credits",
    description: "Purchase credits to book therapy sessions. Each session requires credits, and you can buy as many as you need to fit your schedule and goals."
  },
  {
    icon: MessageSquare,
    title: "Start communicating",
    description: "Use our secure platform to have unlimited private conversations with your therapist through video sessions."
  },
  {
    icon: Calendar,
    title: "Continue growing",
    description: "Work with your therapist to set goals and build the life you want. Switch therapists any time if needed."
  }
]

const faqs = [
  {
    question: "Who are the therapists?",
    answer: `Our therapists are licensed, trained, experienced, and accredited psychologists (PhD / PsyD), licensed marriage and family therapists (LMFT), licensed clinical social workers (LCSW / LMSW), or licensed professional counselors (LPC). All of them have a Masters Degree or Doctorate Degree in their field. They have been qualified and certified by their state's professional board after successfully completing the necessary education, exams, training and practice.`
  },
  {
    question: "Who will be helping me?",
    answer: "After completing our questionnaire, you will be matched with a qualified therapist who fits your objectives, preferences, and the type of issues you are dealing with. Different therapists have different approaches and areas of focus, so it's important to find the right person who can achieve the best results for you."
  },
  {
    question: "Is TherapyLink right for me?",
    answer: "TherapyLink may be right for you if you're looking to improve the quality of your life. Whenever there is anything that interferes with your happiness or prevents you from achieving your goals, we may be able to help. We also have therapists who specialize in specific issues such as stress, anxiety, relationships, parenting, depression, addictions, eating, sleeping, trauma, anger, family conflicts,grief, religion, self esteem and more."
  },
  {
    question: "How much does it cost?",
    answer: "The cost of therapy through TherapyLink ranges from $60 to $90 per week (billed every 4 weeks) and it is based on your location, preferences, and therapist availability. You can cancel your membership at any time, for any reason."
  },
  {
    question: "I signed up. How long until I'm matched with a therapist?",
    answer: "After you sign up, we will match you to an available therapist who fits your preferences and needs. On average, it may take a few hours up to a few days to be matched with a therapist. Your subscription will start once you're matched with a therapist."
  },
  {
    question: "How will I communicate with my therapist?",
    answer: "You will get a dedicated online therapy room with your therapist where you can message them anytime. Your therapist will respond during their working hours. You can also schedule live sessions including video, phone, or chat sessions."
  },
  {
    question: "Can TherapyLink substitute for traditional face-to-face therapy?",
    answer: "TherapyLink offers access to licensed therapists through a convenient online platform. While online therapy has been shown to be just as effective as in-person therapy for many issues, there may be situations where traditional face-to-face therapy is more appropriate. Your therapist can help you determine what's best for your specific situation."
  },
  {
    question: "How long can I use TherapyLink?",
    answer: "You can use TherapyLink for as long as you want. Whether you need it for a few weeks, months, or longer, the choice is yours. Some people come with a specific issue they want to address, while others use it as ongoing support and personal development."
  }
]

const creditFeatures = [
  {
    icon: Coins,
    title: "Pay as you go",
    description: "Buy credits and use them whenever you need. No subscription required."
  },
  {
    icon: Clock,
    title: "Credits don't expire",
    description: "Your purchased credits remain valid until you use them. No rush, no pressure."
  },
  {
    icon: CreditCard,
    title: "Flexible payments",
    description: "Top up your credits anytime. Only pay for the therapy you need."
  }
]

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 10 }
  }
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

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

const containerVariantss = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariantss = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
}

export default function Home() {

  const router = useRouter()
  const ref = useRef(null)
  const profRef = useRef(null)
  const howItWorksRef = useRef(null)
  const faqRef = useRef(null)
  const creditsRef = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const inProfsView = useInView(profRef, { once: false, amount: 0.2 })
  const inHowItWorks = useInView(howItWorksRef, { once: false, amount: 0.2 })
  const inFaqView = useInView(faqRef, { once: false, amount: 0.2 })
  const inCreditsView = useInView(creditsRef, { once: false, amount: 0.2 })


  return (
    <UnauthenticatedLayout>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-tr from-[#E5D3B8]/10 to-transparent blur-3xl" />
      </div>


      {/* Green top element */}
      <div className="flex flex-col lg:flex-row bg-gradient-to-t from-[#152c2a] to-[#152521] w-full justify-center min-h-[700px] h-auto lg:h-[700px] text-white gap-y-3 px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: "all" }}
          variants={stagger}
          className="flex flex-col max-w-2xl h-full justify-center basis-full lg:basis-1/2"
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
            <Button className="relative group bg-transparent text-white border border-white hover:bg-white/5 px-8 py-6 text-lg hover:scale-105 transition-all duration-300">
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
          className="place-self-center justify-self-center justify-items-end gap-y-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 basis-full lg:basis-1/2"
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



      {/* Professionals you could trust element */}
      <div ref={profRef} className="w-full mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-[#F5F2EB]">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariantss}
          initial="hidden"
          animate={inProfsView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <div className="space-y-8">
            <motion.h1
              className="text-4xl sm:text-5xl font-medium tracking-tight text-gray-900"
              variants={itemVariantss}
            >
              Professional and qualified therapists who you can trust
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600"
              variants={itemVariantss}
            >
              Tap into the world&apos;s largest network of qualified and experienced therapists who can help you with a range of issues including depression, anxiety, relationships, trauma, grief, and more. With our therapists, you get the same professionalism and quality you would expect from an in-office therapist, but with the ability to communicate when and how you want.
            </motion.p>

            <motion.div variants={itemVariantss}>
              <Button
                className="bg-[#152c2a] hover:bg-primaryGreen text-[#f6ff76] rounded-full px-8 py-6 text-lg font-extralight hover:scale-105 transition-all"
                onClick={()=>router.push("auth/client-sign-up")}
              >
                Get matched to a therapist
              </Button>
            </motion.div>
          </div>

          {/* Images Grid */}
          <div className="flex relative h-[500px] w-full justify-center items-center">
            <motion.div
              className="absolute w-auto h-[320px] z-20 justify-center items-center"
              variants={imageVariants}
            >
              <Image
                src="/landing-page/image2.jpg"
                alt="Therapist portrait"
                className="w-full h-full object-cover rounded-3xl"
                width={560}
                height={560}
              />
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-300"
              variants={itemVariantss}
            />
            <motion.div
              className="absolute -bottom-2 left-0 lg:left-4 w-8 h-8 border-b-2 border-l-2 border-gray-300"
              variants={itemVariantss}
            />
          </div>
        </motion.div>
      </div>



      {/* How it works section */}
      <section ref={howItWorksRef} className="w-full bg-white bg-opacity-50 py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inHowItWorks ? "visible" : "hidden"}
        >
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-4xl sm:text-5xl font-medium text-gray-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with therapy is easy and straightforward
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={itemVariants}
              >
                <div className="w-20 h-20 rounded-full bg-[#152c2a] text-white flex items-center justify-center mb-6">
                  <step.icon className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <button className="bg-[#152c2a] px-8 py-4 rounded-full text-lg font-extralight text-[#f6ff76] hover:bg-primaryGreen transition-all hover:scale-105">
              Get Started Today
            </button>
          </motion.div>
        </motion.div>
      </section>


      {/* TherapyLink vs Traditional in-office therapy */}
      <div className="flex-col w-full bg-[#152c2a] min-h-48 px-10 py-10 items-center justify-center text-white space-y-5">
        <motion.div
          ref={ref}
          className="flex rounded-lg overflow-hidden justify-center items-center w-full"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="bg-[#2F4F4F] max-w-4xl text-white p-6 text-center rounded-lg shadow-[#272727] shadow-xl">
            <motion.h2
              className="text-2xl md:text-3xl mb-8"
              variants={itemVariants}
            >
              <span className="text-[#f6ff76]">TherapyLink</span> vs. traditional in-office therapy
            </motion.h2>

            <motion.div
              className="grid grid-cols-[1fr,auto,auto] gap-4"
              variants={containerVariants}
            >
              <div className="text-left font-medium" />
              <motion.div
                className="w-32 text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  variants={iconVariants}
                >
                  <div className="w-12 h-12 bg-[#3B5F5F] rounded-full flex items-center justify-center">
                    <Logo theme="white" size={0.7} />
                  </div>
                </motion.div>
                TherapyLink
              </motion.div>
              <motion.div
                className="w-32 text-center"
                variants={itemVariants}
              >
                <motion.div
                  className="flex justify-center mb-4"
                  variants={iconVariants}
                >
                  <div className="w-12 h-12 bg-[#3B5F5F] rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </motion.div>
                In-office
              </motion.div>

              {features.map((feature, index) => (
                <TooltipProvider key={index}>
                  <motion.div
                    className="contents"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="flex items-center gap-2 py-3 border-t border-[#3B5F5F]"
                      variants={itemVariants}
                    >
                      {feature.name}
                      {feature.hasInfo && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-gray-300" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64">{feature.info}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </motion.div>

                    <motion.div
                      className="flex justify-center items-center py-3 border-t border-[#3B5F5F]"
                      variants={iconVariants}
                    >
                      {feature.therapyLink ? (
                        <Check className="w-5 h-5 text-green-300" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </motion.div>

                    <motion.div
                      className="flex justify-center items-center py-3 border-t border-[#3B5F5F]"
                      variants={iconVariants}
                    >
                      {feature.inOffice ? (
                        <Check className="w-5 h-5 text-green-300" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </motion.div>
                  </motion.div>
                </TooltipProvider>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>


      {/* Credits section */}
      <section ref={creditsRef} className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col gap-y-10 max-w-5xl mx-auto"
          variants={containerVariantss}
          initial="hidden"
          animate={inCreditsView ? "visible" : "hidden"}
        >

          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl sm:text-4xl font-medium text-gray-900">
              Simple and Flexible Credit System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the therapy you need, when you need it, with our easy-to-use credit system
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={containerVariantss}
          >
            {creditFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={itemVariantss}
              >
                <div className="w-16 h-16 rounded-full bg-[#2F4F4F] text-white flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-idealGreen rounded-lg p-8 text-center shadow-lg"
            variants={itemVariantss}
          >
            <h3 className="text-2xl font-medium text-white mb-4">
              Credit Value
            </h3>
            <p className="text-xl text-white mb-6">
              <strong>1 Credit = 200 GHS = 1 Hour</strong> of therapy session
            </p>
            <Button
              className="bg-[#2F4F4F] text-white px-8 py-4 rounded-full text-lg hover:scale-105 hover:bg-[#3B5F5F] transition-all"
            >
              Purchase Credits
            </Button>
          </motion.div>

          <motion.p
            className="text-center mt-8 text-gray-600"
            variants={itemVariantss}
          >
            Start your therapy journey today with our flexible credit system.
            Buy credits now and use them whenever you're ready.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQs */}
      <div ref={faqRef} className="w-full bg-[#F5F2EB] py-12 px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inFaqView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-medium text-center mb-8"
            variants={itemVariants}
          >
            Frequently asked questions
          </motion.h2>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border-b-0 [&[data-state=open]]:bg-white rounded-md px-4"
                >
                  <AccordionTrigger className="text-base font-normal hover:no-underline py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div
            className="text-center mt-6 text-sm"
            variants={itemVariants}
          >
            <a href="#more-questions" className="text-[#2F4F4F] hover:underline">
              More questions?
            </a>
          </motion.div>
        </motion.div>
      </div>

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
