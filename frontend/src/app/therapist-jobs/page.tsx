"use client"

import React, { useState } from "react"
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout"
import QuestionCard from "@/components/cards/QuestionCard"
import Image from "next/image"

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
]


export default function TherapistJobsPage(){

    const [questionIndex, setQuestionIndex] = useState(0);
    const [question, setQuestion] = useState(questions[questionIndex]);
    const [showSignUp, setShowSignUp] = useState(false);

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

    return(
        <UnauthenticatedLayout>

            <div className="flex relative h-[80vh] w-full">
                <div className="bg-primaryGreen bg-opacity-45 z-10 h-full w-full"></div>
                <Image fill alt="image" src="/landing-page/image1.jpg"/>
                <div className="flex absolute inset-0 justify-center items-center">
                    <div className="bg-white rounded-lg max-w-2xl p-1 z-20">
                        {/* I am gonna put some shit here */}
                        <QuestionCard
                            question={question.question}
                            type={question.type}
                            options={question.options}
                            next={nextQuestion}
                            back={previousQuestion}
                            setMode={()=>null}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-full w-full py-10 items-center">
                <div className="font-extralight text-2xl">Private practice with no doors & no overhead</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 pt-10 w-full">
                    <div className="col-span-1 bg-blue-200">hi</div>
                    <div className="col-span-1 bg-blue-200">hi</div>
                </div>
            </div>
        </UnauthenticatedLayout>
    )
}