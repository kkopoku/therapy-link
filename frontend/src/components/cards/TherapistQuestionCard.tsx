"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QuestionCardProps {
  question: string
  type: string
  options?: string[]
  onAnswer: (answer: string | string[]) => void
  answer?: string | string[]
  onPrevious: () => void
  onNext: () => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
}

export default function TherapistQuestionCard({
  question,
  type,
  options,
  onAnswer,
  answer,
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion,
}: QuestionCardProps) {
  const renderQuestion = () => {
    switch (type) {
      case "text":
      case "email":
      case "tel":
        return (
          <Input
            type={type}
            value={(answer as string) || ""}
            onChange={(e) => onAnswer(e.target.value)}
            className="w-full"
          />
        )
      case "option":
        return (
          <RadioGroup onValueChange={onAnswer} value={answer as string}>
            {options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "multiselect":
        return (
          <>
            {options?.map((option) => (
              <div key={option} className="flex items-center space-x-2 mb-2">
                <Checkbox
                  id={option}
                  checked={((answer as string[]) || []).includes(option)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onAnswer([...((answer as string[]) || []), option])
                    } else {
                      onAnswer(((answer as string[]) || []).filter((item) => item !== option))
                    }
                  }}
                />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </>
        )
      case "date":
        return <DatePicker onAnswer={onAnswer} answer={answer as string} />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col w-full h-full md:min-h-[300px]">
      <div className="p-6 rounded-lg w-full flex-grow">
        <h2 className="text-xl font-semibold mb-4">{question}</h2>
        {renderQuestion()}
      </div>
      <div className="flex flex-row justify-between w-full items-end mt-4">
        <Button onClick={onPrevious} disabled={isFirstQuestion}>
          Previous
        </Button>
        <Button onClick={onNext}>{isLastQuestion ? "Review" : "Next"}</Button>
      </div>
    </div>
  )
}

interface DatePickerProps {
  onAnswer: (answer: string) => void
  answer: string
}

function DatePicker({ onAnswer, answer }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | null>(answer ? new Date(answer) : null)
  const [month, setMonth] = React.useState(date ? date.getMonth() : new Date().getMonth())
  const [year, setYear] = React.useState(date ? date.getFullYear() : new Date().getFullYear())

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  const handleDateSelect = (day: number) => {
    const newDate = new Date(year, month, day)
    setDate(newDate)
    onAnswer(newDate.toISOString())
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[280px] justify-start text-left font-normal text-black", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <Select value={year.toString()} onValueChange={(value) => setYear(Number.parseInt(value))}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={month.toString()} onValueChange={(value) => setMonth(Number.parseInt(value))}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, index) => (
                  <SelectItem key={m} value={index.toString()}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-sm font-medium">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const isSelected =
                date && date.getDate() === day && date.getMonth() === month && date.getFullYear() === year
              return (
                <Button
                  key={day}
                  variant="ghost"
                  className={cn("h-8 w-8 p-0 font-normal", isSelected && "bg-primary text-primary-foreground")}
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </Button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}