"use client"

import React, { useState } from "react"
import UnauthenticatedLayout from "@/components/layouts/UnauthenticatedLayout"
import QuestionCard from "@/components/cards/QuestionCard"
import Image from "next/image"
import ComingSoon from "@/components/pages/ComingSoon"

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
        <UnauthenticatedLayout hideBottomNavigation={true}>
            <ComingSoon />
        </UnauthenticatedLayout>
    )
}