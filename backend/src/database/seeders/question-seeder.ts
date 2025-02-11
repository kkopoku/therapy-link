import Question from "../../models/question.model";

const questions = [
  {
    question: "Select an option to get started with",
    type: "option",
    options: [
      "Clinical Social Worker",
      "Marriage & Family Therapist",
      "Mental Health Counselor",
      "Professional Counselor",
      "Psychologist",
    ],
    index: "1",
    category: "therapist-registration",
  },
  {
    question: "Where do you currently spend most of your time?",
    type: "option",
    options: [
      "Other online platforms like BetterHelp",
      "Clinic or hospital",
      "Private practice",
      "Community mental health agency",
      "leaching or counseling in an academic setting",
      "Other clinical setting",
      "Not currently practicing",
    ],
    index: "2",
    category: "therapist-registration",
  },
  {
    question:
      "What's your highest level of education in psychology or related field?",
    type: "option",
    options: ["Bachelor's", "Master's", "Doctorate", "Other"],
    index: "5",
    category: "therapist-registration",
  },
  {
    question: "How many years of professional experience do you have?",
    type: "option",
    options: ["0-2", "3-5", "6-10", "11+"],
    index: "6",
    category: "therapist-registration",
  },
  {
    question: "Are you licensed to practice in Ghana?",
    type: "option",
    options: ["Yes", "No"],
    index: "7",
    category: "therapist-registration",
  },
  {
    question: "What are your areas of specialization? (Select all that apply)",
    type: "multiselect",
    options: [
      "Depression",
      "Anxiety",
      "Trauma",
      "Relationships",
      "Addiction",
      "Stress Management",
      "Other",
    ],
    index: "8",
    category: "therapist-registration",
  },
  {
    question: "What languages do you speak fluently? (Select all that apply)",
    type: "multiselect",
    options: ["English", "Twi", "Ga", "Ewe", "Hausa", "Other"],
    index: "9",
    category: "therapist-registration",
  },
  {
    question: "Are you available for online therapy sessions?",
    type: "option",
    options: ["Yes", "No"],
    index: "10",
    category: "therapist-registration",
  },
  {
    question: "Are you licensed Therapist",
    type: "option",
    options: ["Yes", "No"],
    index: "11",
    category: "therapist-registration",
  },
  {
    question: "Which Country/ State were you licensed?",
    type: "text",
    index: "12",
    category: "therapist-registration",
  },
  {
    question: "Enter your first name",
    type: "text",
    index: "13",
    category: "therapist-registration",
    tag: "firstName"
  },
  {
    question: "Enter your other names",
    type: "text",
    index: "14",
    category: "therapist-registration",
    tag: "otherNames"
  },
  {
    question: "Finally, Enter your email address",
    type: "text",
    index: "15",
    category: "therapist-registration",
    tag: "email"
  },
];

export default async function questionSeeder() {
  console.log("Question seeder running ... ");
  // Clear existing data
  await Question.deleteMany({});

  // Insert new data
  await Question.insertMany(questions);
  console.log("Question seeder completed ... ");
}
