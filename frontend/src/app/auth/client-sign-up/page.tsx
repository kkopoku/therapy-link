"use client";

import QuestionCard from "@/components/cards/QuestionCard";
import React, { useState } from "react";
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout";

export default function ClientSignUpPage() {
  interface Question {
    question: string;
    type: string;
    options: Array<string>;
    id: string;
    category: string;
  }

  const questions: Array<Question> = [
    {
      question: "How old are you?",
      type: "option",
      options: ["18-25", "26-35", "35-45", "50+"],
      id: "1",
      category: "client-registration",
    },
    {
      question: "Are you Ghanaian?",
      type: "option",
      options: ["yes", "no"],
      id: "2",
      category: "client-registration",
    },
    {
      question: "What type of therapy are you looking for?",
      type: "option",
      options: [
        "Individual (for myself)",
        "Couples (for myself and my partner)",
        "Teen (for my child)",
      ],
      id: "3",
      category: "client-registration",
    },
    {
      question: "What is your gender identity?",
      type: "option",
      options: ["Woman", "Man"],
      id: "4",
      category: "client-registration",
    },
    /*{
            "question": "How old are you?",
            "type": "option",
            "options": [],
            "id": "5",
            "category": "client-registration"
        },*/
    {
      question: "How do you identify?",
      type: "option",
      options: ["Straight", "Gay", "Lesbian", "Bi or Pan", "Prefer not to say"],
      id: "6",
      category: "client-registration",
    },
    {
      question: "What is your relationship status?",
      type: "option",
      options: [
        "Single",
        "In a relationship",
        "Married",
        "Divorced",
        "Widowed",
        "Other",
      ],
      id: "7",
      category: "client-registration",
    },
    {
      question: "How important is religion in your life?",
      type: "option",
      options: [
        "Very important",
        "Important",
        "Somewhat important",
        "Not important at all",
      ],
      id: "8",
      category: "client-registration",
    },
    {
      question: "Which religion do you identify with?",
      type: "option",
      options: [
        "Christianity",
        "Islam",
        "Judaism",
        "Hinduism",
        "Buddhism",
        "Other",
        "Prefer not to say",
      ],
      id: "9",
      category: "client-registration",
    },
    {
      question:
        "Would you like to be matched with a therapist who provides Christian-based therapy?",
      type: "option",
      options: ["No", "Yes"],
      id: "10",
      category: "client-registration",
    },
    {
      question: "Do you consider yourself to be spiritual?",
      type: "option",
      options: ["No", "Yes"],
      id: "11",
      category: "client-registration",
    },
    {
      question: "Have you ever been in therapy before?",
      type: "option",
      options: ["No", "Yes"],
      id: "12",
      category: "client-registration",
    },
    {
      question: "How would you rate your current physical health?",
      type: "option",
      options: ["Good", "Fair", "Poor"],
      id: "13",
      category: "client-registration",
    },
    {
      question: "How would you rate your current eating habits?",
      type: "option",
      options: ["Good", "Fair", "Poor"],
      id: "14",
      category: "client-registration",
    },
    {
      question:
        "Are you currently experiencing overwhelming sadness, grief, or depression?",
      type: "option",
      options: ["No", "Yes"],
      id: "15",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Little interest or pleasure in doing things?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "16",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "17",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling down, depressed or hopeless?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "18",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble falling asleep, staying asleep, or sleeping too much?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "19",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling tired or having little energy?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "20",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Poor appetite or overeating?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "21",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "22",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Trouble concentrating on things, such as reading the newspaper or watching television?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "23",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: Thoughts that you would be better off dead or of hurting yourself in some way?",
      type: "option",
      options: [
        "Not at all",
        "Several days",
        "More than half the days",
        "Nearly every day",
      ],
      id: "24",
      category: "client-registration",
    },
    {
      question:
        "Over the past 2 weeks, how often have you been bothered by any of the following problems: How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
      type: "option",
      options: [
        "Not difficult at all",
        "Somewhat difficult",
        "Very difficult",
        "Extremely difficult",
      ],
      id: "25",
      category: "client-registration",
    },
    {
      question: "Are you currently employed?",
      type: "option",
      options: ["No", "Yes"],
      id: "26",
      category: "client-registration",
    },
    {
      question: "Do you have any problems or worries about intimacy?",
      type: "option",
      options: ["No", "Yes"],
      id: "27",
      category: "client-registration",
    },
    {
      question: "How often do you drink alcohol?",
      type: "option",
      options: ["Never", "Infrequently", "Monthly", "Weekly", "Daily"],
      id: "28",
      category: "client-registration",
    },
    {
      question: "When was the last time you thought about suicide?",
      type: "option",
      options: [
        "Never",
        "Over a year ago",
        "Over 3 months ago",
        "Over a month ago",
        "Over 2 weeks ago",
        "In the last 2 weeks",
      ],
      id: "29",
      category: "client-registration",
    },
    {
      question:
        "Are you currently experiencing anxiety, panic attacks or have any phobias?",
      type: "option",
      options: ["No", "Yes"],
      id: "30",
      category: "client-registration",
    },
    {
      question: "Are you currently taking any medication?",
      type: "option",
      options: ["No", "Yes"],
      id: "31",
      category: "client-registration",
    },
    {
      question: "Are you currently experiencing any chronic pain?",
      type: "option",
      options: ["No", "Yes"],
      id: "32",
      category: "client-registration",
    },
    {
      question: "How would you rate your current financial status?",
      type: "option",
      options: ["Good", "Fair", "Poor"],
      id: "33",
      category: "client-registration",
    },
    {
      question: "How would you rate your current sleeping habits?",
      type: "option",
      options: ["Good", "Fair", "Poor"],
      id: "34",
      category: "client-registration",
    },
    {
      question:
        "If you identify as a Christian, which denomination best describes you?",
      type: "option",
      options: [
        "Protestant",
        "Catholic",
        "Orthodox",
        "Anglican",
        "Presbyterian",
        "Baptist",
        "Lutheran",
        "Methodist",
        "Other",
        "Non-denominational",
        "Not sure",
        "Not a Christian",
      ],
      id: "35",
      category: "client-registration",
    },
    {
      question:
        "In order to give your therapist the right expectations, please answer a few questions about your spiritual background. How long has your faith been important to you?",
      type: "option",
      options: [
        "Less than a year",
        "1-3 years",
        "More than 3 years",
        "My whole life",
      ],
      id: "36",
      category: "client-registration",
    },
    {
      question: "Which best describes your prayer life?",
      type: "option",
      options: [
        "I never pray",
        "I occasionally pray",
        "I pray daily",
        "I pray throughout my day",
      ],
      id: "37",
      category: "client-registration",
    },
    {
      question:
        "Which best describes the nature of the therapy you are seeking?",
      type: "option",
      options: [
        "Mental health therapy from a Christian perspective",
        "Spiritual therapy on primarily faith-based matters",
        "Holistic therapy addressing both psychological and spiritual components",
        "Other",
      ],
      id: "38",
      category: "client-registration",
    },
    {
      question: "How do you prefer to communicate with your therapist?",
      type: "option",
      options: [
        "Mostly via messaging",
        "Mostly via phone or video sessions",
        "Not sure yet (decide later)",
      ],
      id: "39",
      category: "client-registration",
    },
    {
      question: "Who referred you to BetterHelp?",
      type: "option",
      options: [
        "Instagram",
        "TV",
        "Magazine or newspaper",
        "Celebrity",
        "Snapchat",
        "Radio",
        "Facebook",
        "Google search",
        "Podcast",
        "YouTube",
        "Friend or family member",
        "Spotify streaming music",
        "Reddit",
        "Streaming TV (Hulu, Peacock...)",
        "TikTok",
        "Mailer/Direct Mail",
        "Other",
      ],
      id: "40",
      category: "client-registration",
    },
    {
      question: "Are you Ghanaian?",
      type: "option",
      options: ["Yes", "No"],
      id: "41",
      category: "client-registration",
    },
    {
      question: "Select all that apply",
      type: "option",
      options: [
        "I am a student",
        "I am unemployed",
        "I am poor",
        "I am employed",
      ],
      id: "41",
      category: "client-registration",
    },
  ];

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(questions[questionIndex]);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  function nextQuestion() {
    if (questions.length - 1 === parseInt(question.id)) {
      setShowSignUp(true);
    }
    if (questionIndex < questions.length - 1) {
      let next = questionIndex + 1;
      setQuestionIndex(next);
      setQuestion(questions[next]);
    }
  }

  function previousQuestion() {
    if (questionIndex > 0) {
      let prev = questionIndex - 1;
      setQuestionIndex(prev);
      setQuestion(questions[prev]);
    }
  }

  function handlePasswordChange(e: any, type?: string) {
    if (type === "password") {
      if (!confirmPassword) {
        setPassword(e.target.value);
      } else {
        setPassword(e.target.value);
        if (e.target.value === confirmPassword) {
          setPasswordsMatch(true);
        } else {
          setPasswordsMatch(false);
        }
      }
    } else {
      setConfirmPassword(e.target.value);
      if (e.target.value === password) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
  }

  async function signUp() {
    if (!passwordsMatch) return;
    try {
      let body = {
        email: email,
        password: password,
      };
      let response = await fetch(`${serverURL}/api/v1/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errorBody = await response.json();
        console.log(errorBody);
        throw new Error(`Request failed with status ${response.status}`);
      }

      response = await response.json();
    } catch (e: any) {
      console.log(e.message);
    }
  }

  return (
    <UnauthenticatedLayout>
      <div className="flex flex-col items-center lg:max-w-4xl justify-center text-center pt-10 lg:pt-15">
        <div className="text-3xl font-extralight">
          Help us match you to the right Therapist
        </div>
        <div className="font-extralight">
          It's important to have a therapist who you can establish a personal
          connection with. The following questions are designed to help match
          you to a licensed therapist based on your needs and personal
          preferences.
        </div>
      </div>

      {!showSignUp && (
        <div className="flex items-center justify-center py-10 max-w-[80vh]">
          <QuestionCard
            question={question.question}
            type={question.type}
            options={question.options}
            next={nextQuestion}
            back={previousQuestion}
          />
        </div>
      )}

      {showSignUp && (
        <div className="flex items-center justify-center py-10 w-full">
          <section className="w-full">
            <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 w-full">
              <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#1A3634]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-2xl font-medium leading-tight tracking-tight text-white md:text-2xl">
                    Create an account
                  </h1>

                  <form className="space-y-4 md:space-y-6" action={signUp}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-light text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className=" text-gray-900 text-sm rounded-lg w-full p-2.5"
                        placeholder="name@company.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-light text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className={`bg-gray-50 text-sm rounded-lg w-full p-2`}
                        placeholder="••••••••"
                        onChange={(e) => handlePasswordChange(e, "password")}
                        value={password}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-light text-white"
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className={`border bg-gray-50 ${
                          !passwordsMatch
                            ? "bg-red-50 border-red-700"
                            : "bg-green-50 border-green-700 outline-green-700"
                        } font-light text-sm rounded-lg block w-full p-2`}
                        placeholder="••••••••"
                        onChange={(e) => handlePasswordChange(e)}
                        value={confirmPassword}
                        required
                      />
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-light text-gray-500 dark:text-gray-300"
                        >
                          I accept the{" "}
                          <a className="font-medium` hover:underline dark:text-primary-500">
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-black font-light rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Create an account
                    </button>
                    <p className="text-sm font-light text-white">
                      Already have an account? &nbsp;
                      <a className="font-medium text-gray-400 hover:underline dark:text-primary-500">
                        Login here
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </UnauthenticatedLayout>
  );
}
