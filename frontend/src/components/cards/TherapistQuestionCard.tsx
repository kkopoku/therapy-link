import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuestionCardProps {
  question: string
  type: string
  options?: string[]
  onAnswer: (answer: string | string[]) => void
  answer?: string | string[]
}

export default function TherapistQuestionCard({ question, type, options, onAnswer, answer }: QuestionCardProps) {
  switch (type) {
    case "text":
    case "email":
    case "tel":
      return (
        <div className="bg-white p-6 rounded-lg w-full">
          <h2 className="text-xl font-semibold mb-4">{question}</h2>
          <Input
            type={type}
            value={(answer as string) || ""}
            onChange={(e) => onAnswer(e.target.value)}
            className="w-full"
          />
        </div>
      )
    case "option":
      return (
        <div className="bg-white p-6 rounded-lg w-full">
          <h2 className="text-xl font-semibold mb-4">{question}</h2>
          <RadioGroup onValueChange={onAnswer} value={answer as string}>
            {options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    case "multiselect":
      return (
        <div className="bg-white p-6 rounded-lg w-full">
          <h2 className="text-xl font-semibold mb-4">{question}</h2>
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
        </div>
      )
    default:
      return null
  }
}

