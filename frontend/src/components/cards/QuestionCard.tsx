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
    setMode(mode:string): void
}

const QuestionCard: React.FC<props> = ({question, type, options, next, back, setMode}) => {

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedCheckboxOptions, setSelectedCheckboxOptions] = useState<string[]>([]);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState<string>("");
    const [selectedTextArea, setSelectedTextArea] = useState<string>("");

    const handleAnswerChange = (event:any, type:string) => {
        if (question == "Help us match you to the right therapist:"){
            if(selectedOption !== "Individual (for myself)"){
                setMode("couple")
            }
        }
        switch (type) {
            case "checkbox":
                setSelectedCheckboxOptions((prev) =>
                prev.includes(event.target.value)
                    ? prev.filter((v) => v !== event.target.value)
                    : [...prev, event.target.value]
                )
                break
            case "option":
                setSelectedOption(event.target.value)
                next()
                break
            case "dropdown":
                setSelectedDropdownOption(event.target.value)
                break
            case "textarea":
                setSelectedTextArea(event.target.value)
                break
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
                        <input type="checkbox" value={value} checked={selectedCheckboxOptions.includes(value)}
                                onChange={(e)=>handleAnswerChange(e,"checkbox")} name="options" className='mr-2'
                        />
                        {value}
                    </label>
                ))}
                <SecondaryButton onClick={next} className='mt-3'>next</SecondaryButton>
            </div>
            }

            {type === "dropdown" && 
                <div className="flex flex-col w-full gap-y-3">
                    <select 
                        value={selectedDropdownOption} 
                        onChange={(e) => handleAnswerChange(e, "dropdown")} 
                        name="options"
                        className="w-full p-2 border text-black border-gray-300 rounded"
                    >
                        {options?.map((value, idx) => (
                            <option key={idx} value={value}>
                            {value}
                            </option>
                        ))}
                    </select>
                    <SecondaryButton onClick={next}>
                        Next
                    </SecondaryButton>
                </div>
            }

            {type === "textarea" && 
            <div className="w-full">
                <input 
                    type="text" 
                    value={selectedTextArea} 
                    onChange={(e) => handleAnswerChange(e,"textarea" )} 
                    name="text" 
                    placeholder="Enter your response here..."
                    className="w-full text-black p-2 border border-gray-300 rounded"
                />
                    <SecondaryButton onClick={next} className="mt-3">
                        Next
                    </SecondaryButton>
                </div>
            }

            {type === "option" && 
                <div className="w-full flex flex-col gap-4">
                    {options?.map((value, idx) => (
                        <button key={`${idx}`} value={value} className="px-2 min-h-12 rounded-xl bg-gray-100 text-black hover:bg-slate-300 transition-all"
                            onClick={(e)=>handleAnswerChange(e,"option")} name="options" >{value}
                        </button>
                    ))}
                </div>
            }

            <div className='p-5 bg-[#26504d] font-extralight rounded-lg'>
                Let&apos;s walk through the process of finding the best therapist for you! We&apos;ll start off with some basic questions.
            </div>
        </div>
    )
}

export default QuestionCard