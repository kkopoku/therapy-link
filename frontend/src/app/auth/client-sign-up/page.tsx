"use client";

import QuestionCard from "@/components/cards/QuestionCard";
import TherapistQuestionCard from "@/components/cards/TherapistQuestionCard";
import React, { useState, useEffect } from "react";
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout";
import { getQuestions } from "./page.functions";
import { toast } from "sonner";
import { signUp } from "./page.functions";
import Button from "@/components/buttons/Button";
import { useRouter } from "next/navigation";

export default function ClientSignUpPage() {
  interface Question {
    question: string;
    type: string;
    options: Array<string>;
    _id: string;
    category: string;
    index?: string;
    tag?: string;
  }

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [stage, setStage] = useState("select-mode");
  const router = useRouter();

  const question: Question = questions
    ? questions[questionIndex]
    : {
        _id: "",
        question: "",
        type: "",
        index: "",
        category: "",
        options: [],
      };

  function nextQuestion() {
    if (questionIndex < questions?.length - 1) {
      if (
        !answers[question?._id] ||
        (Array.isArray(answers[question?._id]) &&
          answers[question?._id].length === 0)
      ) {
        toast.error("Please provide an answer before proceeding.");
        return;
      } else {
        setQuestionIndex(questionIndex + 1);
      }
    } else {
      setStage("summary");
    }
  }

  function previousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function handleAnswer(answer: string | string[]) {
    setAnswers({ ...answers, [question._id]: answer });
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

  const clientSignUp = async () => {
    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const stringAnswers = JSON.stringify(answers);
      const body:any = {
        type: "Client",
        email,
        password,
        answers: stringAnswers,
      }

      Object.entries(answers).forEach(([key, value]) => {
        const question = questions.find(q => q._id === key);

        if(question?.tag){
          const sValue = Array.isArray(value) ? Array(value).join("") : value
          body[question?.tag] = sValue
        }
      });

      await signUp(body);
      setStage("success")
    } catch (e: any) {
      toast.error(e.message);
      console.log(e.message);
    }
  };

  const handleSelectMode = async (mode: string) => {
    try {
      setLoading(true);
      const questions = await getQuestions(mode);
      setQuestions(questions);
      setStage("questions");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UnauthenticatedLayout>
      <div className="flex-grow h-full place-items-center place-content-center space-y-6">

        {stage !== "success" && <div className="flex flex-col items-center lg:max-w-4xl justify-center text-center lg:pt-15">
          <div className="text-3xl font-extralight">
            Help us match you to the right Therapist
          </div>
          <div className="font-extralight">
            It&apos;s important to have a therapist who you can establish a
            personal connection with. The following questions are designed to
            help match you to a licensed therapist based on your needs and
            personal preferences.
          </div>
        </div>}


        {stage === "select-mode" && (
          <div className="flex flex-col items-center justify-center py-10 w-[500px] p-5 border border-primaryGreen rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Help us match you to the right therapist
            </h2>
            <Button
              className="w-full py-2 mb-2 border border-primaryGreen text-primaryGreen rounded-lg hover:bg-primaryGreen hover:text-white transition"
              onClick={() => handleSelectMode("individual")}
            >
              Individual (for myself)
            </Button>
            <Button
              className="w-full py-2 border border-primaryGreen text-primaryGreen rounded-lg hover:bg-primaryGreen hover:text-white transition"
              onClick={() => handleSelectMode("couple")}
            >
              Couples (myself and my partner)
            </Button>
          </div>
        )}

        {stage == "questions" && (
          <div className="flex items-center justify-center py-10 w-[500px] p-5 bg-primaryGreen text-white rounded-lg">
            <TherapistQuestionCard
              onNext={nextQuestion}
              onPrevious={previousQuestion}
              isFirstQuestion={questionIndex == 0}
              isLastQuestion={questionIndex == questions.length - 1}
              question={question?.question}
              type={question?.type}
              options={question?.options}
              onAnswer={handleAnswer}
              answer={answers[question?._id]}
            />
          </div>
        )}

        {stage == "sign-up" && (
          <div className="flex items-center justify-center py-10 w-full">
            <section className="w-full">
              <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0 w-full">
                <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#1A3634]">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-2xl font-medium leading-tight tracking-tight text-white md:text-2xl">
                      Create an account
                    </h1>

                    <form
                      className="space-y-4 md:space-y-6"
                      action={clientSignUp}
                    >
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

        {stage == "summary" && (
          <div className="bg-white p-6 rounded-lg border border-primaryGreen">
            <h2 className="text-xl font-semibold mb-4">Application Summary</h2>

            <div className="max-h-96 overflow-scroll">
              {questions.map((q: Question) => (
                <div key={q._id} className="mb-2">
                  <p className="font-medium">{q?.question}</p>
                  <p className="text-gray-600">
                    {Array.isArray(answers[q._id])
                      ? (answers[q?._id] as Array<string>).join(", ") ??
                        "No Answer"
                      : answers[q?._id] ?? "No Answer"}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 w-full gap-x-5">
              <Button onClick={() => setStage("questions")} className="w-full bg-primaryGreen hover:bg-secondaryGreen text-white">
                Back
              </Button>
              <Button onClick={() => setStage("sign-up")} className="w-full bg-primaryGreen hover:bg-secondaryGreen text-white">
                Continue
              </Button>
            </div>
          </div>
        )}

        { (stage == "success") && 
          <div className="place-content-center place-items-center space-y-5">
            <h2 className="text-xl font-semibold">Application Submitted!</h2>
            <p>Thank you for completing the therapy application. We will review it and contact you shortly.</p>
            <Button onClick={() => router.replace("/")} className="bg-primaryGreen hover:bg-secondaryGreen text-white px-5">
              Return to Homepage
            </Button>
          </div>
        } 
      </div>
    </UnauthenticatedLayout>
  );
}
