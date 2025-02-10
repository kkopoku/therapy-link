"use client";

import { useState, useEffect } from "react";
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout";
import TherapistQuestionCard from "@/components/cards/TherapistQuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { getQuestions, submitApplication } from "./page.functions";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

interface Question {
  question: string;
  type: string;
  options?: Array<string>;
  _id: string;
  category: string;
  tag?: string;
}

export default function TherapistJobsPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>(
    {}
  );
  const [stage, setStage] = useState("questions");
  const [resume, setResume] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const question = questions
    ? questions[questionIndex]
    : {
        _id: "",
        question: "",
        type: "",
        index: "",
        category: "",
        options: [],
      };
  const progress = ((questionIndex + 1) / questions?.length) * 100;

  function handleAnswer(answer: string | string[]) {
    setAnswers({ ...answers, [question._id]: answer });
  }

  function nextQuestion() {
    if (questionIndex < questions?.length - 1) {
      if (!answers[question._id] || (Array.isArray(answers[question._id]) && answers[question._id].length === 0)) {
        toast.error("Please provide an answer before proceeding.");
        return;
      }

      console.log("ID: ",question._id)
      console.log("Question: ",question.question)
      console.log("Answer: ",answers[question._id])
      setQuestionIndex(questionIndex + 1);
    } else {
      setStage("summary");
    }
  }

  function previousQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function handleResumeUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file && file.size <= 1048576) {
      setResume(file);
    } else {
      alert("File size should be 1MB or less.");
    }
  }

  async function submit() {
    try {

      if (!resume) {
        toast.error("Please upload a resume before submitting.");
        return;
      }

      const formData = new FormData();

      Object.entries(answers).forEach(([key, value]) => {
        // Find the corresponding question
        const question = questions.find(q => q._id === key);
        console.log("FOund Question: ",question);

        if(question?.tag){
          const sValue = Array.isArray(value) ? Array(value).join("") : value
          formData.append(question.tag, sValue)
        }
      
      });
      
      formData.append("answers", JSON.stringify(answers));
      formData.append("file", resume!);

      console.log(formData);
      
      setLoading(true)
      const data = await submitApplication(formData)
      toast.success(data?.message);
      setStage("submitted");
    } catch (error: any) {
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const questions = await getQuestions();
        setQuestions(questions);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <UnauthenticatedLayout hideBottomNavigation={true}>
      <Toaster />
      <div className="flex flex-grow items-center bg-[#152521] justify-center flex-col w-full mx-auto p-4 h-full">
        <div className="bg-white p-5 rounded-xl w-[500px]">
          <div className="w-full">
            <h1 className="text-2xl mb-2 text-center">Therapist Application</h1>
            <Progress value={progress} className="" />
          </div>

          {!loading && (
            <>
              {stage == "questions" && (
                <div className="flex flex-col w-full h-full md:min-h-[300px]">
                  <TherapistQuestionCard
                    question={question?.question}
                    type={question?.type}
                    options={question?.options}
                    onAnswer={handleAnswer}
                    answer={answers[question?._id]}
                  />
                  <div className="flex flex-grow flex-row justify-between h-full w-full items-end">
                    <Button
                      onClick={previousQuestion}
                      disabled={questionIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button onClick={nextQuestion}>
                      {questionIndex === questions?.length - 1
                        ? "Review"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              )}

              {stage == "summary" && (
                <div className="bg-white p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">
                    Application Summary
                  </h2>

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

                  <div className="flex justify-between mt-4 w-full">
                  <Button
                      onClick={() => setStage("questions")}
                      className="w-full"
                    >
                      back
                    </Button>
                    <Button
                      onClick={() => setStage("resume")}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {stage === "resume" && (
                <div className="flex flex-col items-center md:min-h-[300px] mt-5">
                  <div className="w-full">
                    <Input
                      className="px-0 py-0 text-black"
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                    />
                  </div>

                  <div className="flex flex-grow flex-row justify-between h-full w-full items-end">
                    <Button onClick={() => setStage("summary")}>Back</Button>
                    <Button
                      onClick={() => {
                        submit();
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}

              {stage == "submitted" && (
                <div className="flex flex-col items-center md:min-h-[300px] mt-5">
                  <p className="text-xl font-semibold mb-4">
                    Application Submitted
                  </p>
                  <p>
                    Thank you for submitting your application. We will review it
                    and get back to you shortly.
                  </p>
                </div>
              )}
            </>
          )}

          {loading && <div className="flex justify-center py-5">
            <LoadingSpinner show border={5} size={40} />
          </div>}
        </div>
      </div>
    </UnauthenticatedLayout>
  );
}