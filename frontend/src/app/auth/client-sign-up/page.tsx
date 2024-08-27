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

  const coupleQuestions: Question[] = [
    {
      id: "1",
      question: "What is your gender identity?",
      type: "option",
      options: ["Woman", "Man", "Prefer not to say"],
      category: "General",
    },
    {
      id: "2",
      question: "What is your partner's gender identity?",
      type: "option",
      options: ["Woman", "Man", "Prefer not to say"],
      category: "General",
    },
    {
      id: "3",
      question: "How long have you and your partner been together?",
      type: "option",
      options: [
        "Less than 1 year",
        "1-3 years",
        "4-7 years",
        "8-10 years",
        "10+ years",
      ],
      category: "Relationship",
    },
    {
      id: "4",
      question: "What is your relationship status?",
      type: "option",
      options: [
        "Dating",
        "Engaged",
        "Married",
        "Separated",
        "Living together",
        "Other (Please specify)",
      ],
      category: "Relationship",
    },
    {
      id: "5",
      question: "Have either of you attended couples therapy before?",
      type: "option",
      options: [
        "Yes, both of us",
        "Yes, only one of us",
        "No, neither of us",
        "Prefer not to say",
      ],
      category: "Therapy History",
    },
    {
      id: "6",
      question: "What are the main reasons you are seeking couples therapy?",
      type: "textarea",
      options: [],
      category: "Therapy Goals",
    },
    {
      id: "7",
      question: "Are there any specific issues you would like to focus on?",
      type: "checkbox",
      options: [
        "Communication",
        "Trust/Infidelity",
        "Financial Stress",
        "Intimacy/Sexual issues",
        "Parenting/Family dynamics",
        "Blended family challenges",
        "Conflict resolution",
        "Role expectations",
        "Emotional connection",
        "Life transitions (e.g., having a baby, retirement)",
        "Other (Please specify)",
      ],
      category: "Therapy Focus",
    },
    {
      id: "8",
      question: "How important is religion in your relationship?",
      type: "option",
      options: [
        "Very Important",
        "Important",
        "Neutral",
        "Not Important",
        "Not a part of our relationship",
      ],
      category: "Religion",
    },
    {
      id: "9",
      question: "Would you prefer to be matched with a therapist who shares your religious beliefs?",
      type: "option",
      options: ["Yes", "No", "No Preference"],
      category: "Religion",
    },
    {
      id: "10",
      question: "Do you or your partner have any mental health conditions or concerns?",
      type: "checkbox",
      options: [
        "Anxiety",
        "Depression",
        "Trauma/PTSD",
        "Substance abuse",
        "Anger management issues",
        "None",
        "Prefer not to say",
      ],
      category: "Mental Health",
    },
    {
      id: "11",
      question: "Are there any lifestyle factors or habits you’d like to address in therapy?",
      type: "checkbox",
      options: [
        "Smoking",
        "Drinking",
        "Drug use",
        "Diet/Eating habits",
        "Exercise/Physical activity",
        "Work-life balance",
        "Other (Please specify)",
        "None",
      ],
      category: "Lifestyle",
    },
    {
      id: "12",
      question: "How would you describe the level of communication in your relationship?",
      type: "option",
      options: [
        "Excellent (We communicate openly and effectively)",
        "Good (We communicate well most of the time)",
        "Fair (We have some communication issues)",
        "Poor (We struggle with communication)",
      ],
      category: "Communication",
    },
    {
      id: "13",
      question: "How would you rate the level of trust in your relationship?",
      type: "option",
      options: [
        "High (We fully trust each other)",
        "Moderate (There are some trust issues)",
        "Low (Trust is a significant issue for us)",
        "Prefer not to say",
      ],
      category: "Trust",
    },
    {
      id: "14",
      question: "How do you currently handle conflict in your relationship?",
      type: "option",
      options: [
        "We discuss issues calmly and respectfully",
        "We argue but usually resolve the issue",
        "We avoid conflict and don’t discuss problems",
        "We often have heated arguments with unresolved issues",
        "Other (Please specify)",
      ],
      category: "Conflict",
    },
    {
      id: "15",
      question: "What are your shared goals for therapy?",
      type: "checkbox",
      options: [
        "Strengthen communication",
        "Rebuild trust",
        "Improve intimacy",
        "Manage conflicts better",
        "Navigate life transitions",
        "Strengthen emotional connection",
        "Other (Please specify)",
      ],
      category: "Therapy Goals",
    },
    {
      id: "16",
      question: "Do you have any cultural or personal preferences we should consider when matching you with a therapist?",
      type: "checkbox",
      options: [
        "Ethnicity",
        "Language preference",
        "Age",
        "Sexual orientation",
        "Other (Please specify)",
      ],
      category: "Preferences",
    },
    {
      id: "17",
      question: "Are there any external factors causing stress in your relationship?",
      type: "checkbox",
      options: [
        "Financial stress",
        "Work-related stress",
        "Family interference",
        "Health issues",
        "Infertility",
        "Other (Please specify)",
      ],
      category: "Stress Factors",
    },
    {
      id: "18",
      question: "How would you describe your and your partner’s love languages?",
      type: "checkbox",
      options: [
        "Words of Affirmation",
        "Acts of Service",
        "Receiving Gifts",
        "Quality Time",
        "Physical Touch",
        "We haven’t identified our love languages yet",
        "Prefer not to say",
      ],
      category: "Love Languages",
    },
    {
      id: "19",
      question: "Do either of you have children, and how do they affect your relationship?",
      type: "option",
      options: [
        "Yes, children are a major factor in our relationship",
        "Yes, but they don’t impact our relationship significantly",
        "No, we don’t have children",
        "Prefer not to say",
      ],
      category: "Family",
    },
    {
      id: "20",
      question: "Are you dealing with any extended family issues that impact your relationship?",
      type: "option",
      options: [
        "Yes, significant issues",
        "Yes, but they are manageable",
        "No, not an issue for us",
        "Prefer not to say",
      ],
      category: "Family",
    },
    {
      id: "21",
      question: "Do you have any additional preferences or concerns you’d like us to consider?",
      type: "textarea",
      options: [],
      category: "Additional",
    }
  ];
  

  const individualQuestions: Question[] = [
    {
      id: "1",
      question: "Help us match you to the right therapist:",
      type: "option",
      options: ["Individual (for myself)", "Couples (for myself and my partner)", "Family (for family counseling)"],
      category: "General"
    },
    {
      id: "2",
      question: "What gender do you identify with?",
      type: "option",
      options: ["Woman", "Man", "Prefer not to say"],
      category: "Demographics"
    },
    {
      id: "3",
      question: "How old are you?",
      type: "dropdown",
      options: ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"],
      category: "Demographics"
    },
    {
      id: "4",
      question: "How do you identify sexually?",
      type: "option",
      options: ["Straight", "Prefer not to say"],
      category: "Demographics"
    },
    {
      id: "5",
      question: "What is your relationship status?",
      type: "option",
      options: ["Single", "Married", "Divorced", "Separated", "In a relationship", "Widowed", "Prefer not to say"],
      category: "Demographics"
    },
    {
      id: "6",
      question: "How important is religion in your life?",
      type: "option",
      options: ["Very Important", "Important", "Neutral", "Not Important", "Not a part of my life"],
      category: "Values"
    },
    {
      id: "7",
      question: "Which religion do you identify with?",
      type: "option",
      options: ["Christianity", "Islam", "Traditional", "Other (Please specify)", "None"],
      category: "Values"
    },
    {
      id: "8",
      question: "Would you prefer to be matched with a therapist who shares your religious beliefs?",
      type: "option",
      options: ["Yes", "No", "No Preference"],
      category: "Values"
    },
    {
      id: "9",
      question: "What led you to seek therapy today?",
      type: "checkbox",
      options: ["Anxiety", "Depression", "Stress Management", "Relationship Issues", "Family Conflict", "Work/Career Issues", "Grief/Loss", "Trauma/Abuse", "Substance Abuse", "Eating Disorders", "Self-Esteem Issues", "Life Transitions", "Chronic Illness", "LGBTQIA+ Issues", "Other (Please specify)"],
      category: "Therapy"
    },
    {
      id: "10",
      question: "What are your expectations from your therapist?",
      type: "checkbox",
      options: ["Help me understand my feelings", "Provide me with coping strategies", "Offer guidance and advice", "Listen without judgment", "Help me set and achieve personal goals", "Improve my relationships", "Support me in making life changes", "Other (Please specify)"],
      category: "Therapy"
    },
    {
      id: "11",
      question: "How would you rate your current eating habits?",
      type: "option",
      options: ["Good", "Fair", "Not great"],
      category: "Lifestyle"
    },
    {
      id: "12",
      question: "How would you describe your current sleep patterns?",
      type: "option",
      options: ["Regular and restful", "Sometimes restless", "Struggle with sleep", "Prefer not to say"],
      category: "Lifestyle"
    },
    {
      id: "13",
      question: "Are you currently taking any medications for mental health?",
      type: "option",
      options: ["Yes", "No", "Prefer not to say"],
      category: "Health"
    },
    {
      id: "14",
      question: "Have you attended therapy before?",
      type: "option",
      options: ["Yes", "No", "Prefer not to say"],
      category: "Therapy"
    },
    {
      id: "15",
      question: "Do you have any preferences for your therapist’s age?",
      type: "option",
      options: ["No preference", "Younger (18-30)", "Middle-aged (31-50)", "Older (51+)"],
      category: "Preferences"
    },
    {
      id: "16",
      question: "How would you describe your current support system?",
      type: "option",
      options: ["Strong (Family/friends actively involved)", "Moderate (Some support but could be stronger)", "Weak (Limited to no support)", "Prefer not to say"],
      category: "Support"
    },
    {
      id: "17",
      question: "Do you have a history of trauma or abuse that you’d like to address in therapy?",
      type: "option",
      options: ["Yes", "No", "Prefer not to say"],
      category: "Health"
    },
    {
      id: "18",
      question: "Are you currently experiencing suicidal thoughts?",
      type: "option",
      options: ["Yes, frequently", "Yes, occasionally", "No", "Prefer not to say"],
      category: "Health"
    },
    {
      id: "19",
      question: "How do you prefer your therapy sessions to be conducted?",
      type: "option",
      options: ["In-person", "Online (video or phone)", "No preference"],
      category: "Therapy"
    },
    {
      id: "20",
      question: "How often would you like to attend therapy sessions?",
      type: "option",
      options: ["Weekly", "Bi-weekly", "Monthly", "As needed"],
      category: "Therapy"
    },
    {
      id: "21",
      question: "Do you have any specific challenges or disabilities you'd like your therapist to be aware of?",
      type: "textarea",
      options: [],
      category: "Health"
    },
    {
      id: "22",
      question: "What language would you prefer for your therapy sessions?",
      type: "option",
      options: ["English", "Akan", "Ewe", "Ga", "Other (Please specify)"],
      category: "Preferences"
    },
    {
      id: "23",
      question: "Are there any specific characteristics or qualities you prefer in a therapist?",
      type: "textarea",
      options: [],
      category: "Preferences"
    },
    {
      id: "24",
      question: "How do you cope with stress or difficult situations?",
      type: "checkbox",
      options: ["Talking to friends or family", "Exercise or physical activity", "Meditation or mindfulness practices", "Avoidance or distraction", "Substance use", "Other (Please specify)"],
      category: "Lifestyle"
    },
    {
      id: "25",
      question: "How would you describe your current mental health?",
      type: "option",
      options: ["Excellent", "Good", "Fair", "Poor", "Prefer not to say"],
      category: "Health"
    },
    {
      id: "26",
      question: "Are you currently employed or in school?",
      type: "option",
      options: ["Employed full-time", "Employed part-time", "Unemployed", "Student", "Prefer not to say"],
      category: "Demographics"
    },
    {
      id: "27",
      question: "Do you have any financial concerns that might affect your therapy sessions?",
      type: "option",
      options: ["Yes", "No", "Prefer not to say"],
      category: "Preferences"
    },
    {
      id: "28",
      question: "Is there anything else you’d like your therapist to know before starting your sessions?",
      type: "textarea",
      options: [],
      category: "Preferences"
    }
  ];
  

  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(individualQuestions);
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

  function setMode(mode: string) {
    if (mode === "couple"){
      setQuestions(coupleQuestions)
    }else{
      setQuestions(individualQuestions)
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
          It&apos;s important to have a therapist who you can establish a personal
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
            setMode={setMode}
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
