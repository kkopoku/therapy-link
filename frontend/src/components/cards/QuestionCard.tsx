"use client"
import React, {useState} from 'react';
import SecondaryButton from '../buttons/SecondaryButton';
import { IoMdArrowBack } from "react-icons/io";


interface props {
    question?: string,
    type?: string,
    options?: Array<string>,
    next(): void,
    back(): void,
}

const QuestionCard: React.FC<props> = ({question, type, options, next, back}) => {

    const [selectedOption, setSelectedOption] = useState("");

    const handleAnswerChange = (event:any, type:string) => {
        switch (type) {
            case "checkbox":
            case "option":
                console.log(event.target.value)
                setSelectedOption(event.target.value)
                next()

        }
    };

    return(
        <div className='bg-[#1A3634] text-white flex flex-col items-center justify-center w-full h-fit min-h-64 rounded-lg py-5 px-4 gap-y-5'>
            <div className='flex align-middle first-line:text-lg font-extralight w-full'>
                <span className='pr-2'>
                    <button onClick={back} className='bg-black p-1 text-white rounded-full'><IoMdArrowBack /></button>
                </span>
                <span>Question: {question}</span>
            </div>

            {type === "checkbox" && 
            <div className="w-full">
                {options?.map((value, idx) => (
                    <label key={idx} className="block">
                        <input type="checkbox" value={value} checked={selectedOption === value} 
                                onChange={(e)=>handleAnswerChange(e,"checkbox")} name="options" className='mr-2'
                        />
                        {value}
                    </label>
                ))}
            </div>
            }

            {type === "option" && 
                <div className="w-full flex flex-col gap-4">
                    {options?.map((value, idx) => (
                        <button id={`${idx}`} value={value} className="px-2 min-h-12 rounded-xl bg-gray-100 text-black hover:bg-slate-300 transition-all"
                            onClick={(e)=>handleAnswerChange(e,"option")} name="options" >{value}
                        </button>
                    ))}
                </div>
            }

            <div className='p-5 bg-[#26504d] font-extralight rounded-lg'>
                Let's walk through the process of finding the best therapist for you! We'll start off with some basic questions.
            </div>
        </div>
    )
}

export default QuestionCard