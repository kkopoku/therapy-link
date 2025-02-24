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
      "Other online platforms like Therapy Link Center",
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
    tag: "specialty"
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
    question: "Whats your availability for online therapy sessions?",
    type: "multiselect",
    options: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    index: "11",
    category: "therapist-registration",
    tag: "availability"
  },
  {
    question: "Are you licensed Therapist",
    type: "option",
    options: ["Yes", "No"],
    index: "12",
    category: "therapist-registration",
  },
  {
    question: "Which Country/ State were you licensed?",
    type: "text",
    index: "13",
    category: "therapist-registration",
  },
  {
    question: "Enter your first name",
    type: "text",
    index: "14",
    category: "therapist-registration",
    tag: "firstName"
  },
  {
    question: "Enter your other names",
    type: "text",
    index: "15",
    category: "therapist-registration",
    tag: "otherNames"
  },
  {
    question: "What gender do you identify as?",
    type: "option",
    options: ["Male", "Female"],
    index: "16",
    category: "therapist-registration",
    tag: "gender"
  },
  {
    question: "Finally, Enter your email address",
    type: "text",
    index: "17",
    category: "therapist-registration",
    tag: "email"
  }
];


const coupleQuestions = [
  {
    question: "Help us match you to the right therapist:",
    type: "option",
    options: ["Individual (for myself)", "Couples (for myself and my partner)"],
    category: "client-registration-couple",
    index: "1",
  },
  {
    question: "What is your gender identity?",
    type: "option",
    options: ["Male", "Female"],
    category: "client-registration-couple",
    index: "2",
    tag: "gender"
  },
  {
    question: "What is your partner's gender identity?",
    type: "option",
    options: ["Woman", "Man", "Prefer not to say"],
    category: "client-registration-couple",
    index: "3",
  },
  {
    question: "How long have you and your partner been together?",
    type: "option",
    options: [
      "Less than 1 year",
      "1-3 years",
      "4-7 years",
      "8-10 years",
      "10+ years",
    ],
    category: "client-registration-couple",
    index: "4",
  },
  {
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
    category: "client-registration-couple",
    index: "5",
  },
  {
    question: "Have either of you attended couples therapy before?",
    type: "option",
    options: [
      "Yes, both of us",
      "Yes, only one of us",
      "No, neither of us",
      "Prefer not to say",
    ],
    category: "client-registration-couple",
    index: "6",
  },
  {
    question: "What are the main reasons you are seeking couples therapy?",
    type: "text",
    options: [],
    category: "client-registration-couple",
    index: "7",
  },
  {
    question: "Are there any specific issues you would like to focus on?",
    type: "multiselect",
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
    category: "client-registration-couple",
    index: "8",
  },
  {
    question: "How important is religion in your relationship?",
    type: "option",
    options: [
      "Very Important",
      "Important",
      "Neutral",
      "Not Important",
      "Not a part of our relationship",
    ],
    category: "client-registration-couple",
    index: "9",
  },
  {
    question: "Would you prefer to be matched with a therapist who shares your religious beliefs?",
    type: "option",
    options: ["Yes", "No", "No Preference"],
    category: "client-registration-couple",
    index: "10",
  },
  {
    question: "Do you or your partner have any mental health conditions or concerns?",
    type: "multiselect",
    options: [
      "Anxiety",
      "Depression",
      "Trauma/PTSD",
      "Substance abuse",
      "Anger management issues",
      "None",
      "Prefer not to say",
    ],
    category: "client-registration-couple",
    index: "11",
  },
  {
    question: "Are there any lifestyle factors or habits you’d like to address in therapy?",
    type: "multiselect",
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
    category: "client-registration-couple",
    index: "12",
  },
  {
    question: "How would you describe the level of communication in your relationship?",
    type: "option",
    options: [
      "Excellent (We communicate openly and effectively)",
      "Good (We communicate well most of the time)",
      "Fair (We have some communication issues)",
      "Poor (We struggle with communication)",
    ],
    category: "client-registration-couple",
    index: "13",
  },
  {
    question: "How would you rate the level of trust in your relationship?",
    type: "option",
    options: [
      "High (We fully trust each other)",
      "Moderate (There are some trust issues)",
      "Low (Trust is a significant issue for us)",
      "Prefer not to say",
    ],
    category: "client-registration-couple",
    index: "14",
  },
  {
    question: "How do you currently handle conflict in your relationship?",
    type: "option",
    options: [
      "We discuss issues calmly and respectfully",
      "We argue but usually resolve the issue",
      "We avoid conflict and don’t discuss problems",
      "We often have heated arguments with unresolved issues",
      "Other (Please specify)",
    ],
    category: "client-registration-couple",
    index: "15",
  },
  {
    question: "What are your shared goals for therapy?",
    type: "multiselect",
    options: [
      "Strengthen communication",
      "Rebuild trust",
      "Improve intimacy",
      "Manage conflicts better",
      "Navigate life transitions",
      "Strengthen emotional connection",
      "Other (Please specify)",
    ],
    category: "client-registration-couple",
    index: "16",
  },
  {
    question: "Do you have any cultural or personal preferences we should consider when matching you with a therapist?",
    type: "multiselect",
    options: [
      "Ethnicity",
      "Language preference",
      "Age",
      "Sexual orientation",
      "Other (Please specify)",
    ],
    category: "client-registration-couple",
    index: "17",
  },
  {
    question: "Are there any external factors causing stress in your relationship?",
    type: "multiselect",
    options: [
      "Financial stress",
      "Work-related stress",
      "Family interference",
      "Health issues",
      "Infertility",
      "Other (Please specify)",
    ],
    category: "client-registration-couple",
    index: "18",
  },
  {
    question: "How would you describe your and your partner's love languages?",
    type: "multiselect",
    options: [
      "Words of Affirmation",
      "Acts of Service",
      "Receiving Gifts",
      "Quality Time",
      "Physical Touch",
      "We haven’t identified our love languages yet",
      "Prefer not to say",
    ],
    category: "client-registration-couple",
    index: "19",
  },
  {
    question: "Do either of you have children, and how do they affect your relationship?",
    type: "option",
    options: [
      "Yes, children are a major factor in our relationship",
      "Yes, but they don’t impact our relationship significantly",
      "No, we don’t have children",
      "Prefer not to say",
    ],
    category: "client-registration-couple",
    index: "20",
  },
  {
    question: "Are you dealing with any extended family issues that impact your relationship?",
    type: "option",
    options: [
      "Yes, significant issues",
      "Yes, but they are manageable",
      "No, not an issue for us",
      "Prefer not to say",
    ],
    category: "client-registration-couple",
    index: "21",
  },
  {
    question: "Do you have any additional preferences or concerns you’d like us to consider?",
    type: "text",
    options: [],
    category: "client-registration-couple",
    index: "22"
  },
  {
    tag: "firstName",
    question: "What is your first name?",
    type: "text",
    required: true,
    index: "23",
    category: "client-registration-couple"
  },
  {
    tag: "otherNames",
    question: "What are your other names?",
    type: "text",
    required: true,
    index: "24",
    category: "client-registration-couple"
  },
  {
    tag: "primaryPhone",
    question: "What is your phone number?",
    type: "text",
    required: true,
    index: "25",
    category: "client-registration-couple"
  },
  {
    tag: "dateOfBirth",
    question: "What is your date of birth?",
    type: "date",
    required: true,
    index: "26",
    category: "client-registration-couple"
  }
];



const individualQuestions = [
  {
    question: "Help us match you to the right therapist:",
    type: "option",
    options: ["Individual (for myself)", "Couples (for myself and my partner)"],
    category: "client-registration-individual",
    index: "1"
  },
  {
    question: "What gender do you identify with?",
    type: "option",
    options: ["Male", "Female"],
    category: "client-registration-individual",
    index: "2",
    tag: "gender"
  },
  {
    question: "How old are you?",
    type: "option",
    options: ["18-24", "25-32", "32-40", "40-50", "50+"],
    category: "client-registration-individual",
    index: "3"
  },
  {
    question: "How do you identify sexually?",
    type: "option",
    options: ["Straight", "Prefer not to say"],
    category: "client-registration-individual",
    index: "4",
  },
  {
    question: "What is your relationship status?",
    type: "option",
    options: ["Single", "Married", "Divorced", "Separated", "In a relationship", "Widowed", "Prefer not to say"],
    category: "client-registration-individual",
    index: "5",
  },
  {
    question: "How important is religion in your life?",
    type: "option",
    options: ["Very Important", "Important", "Neutral", "Not Important", "Not a part of my life"],
    category: "client-registration-individual",
    index: "6",
  },
  {
    question: "Which religion do you identify with?",
    type: "option",
    options: ["Christianity", "Islam", "Traditional", "Other (Please specify)", "None"],
    category: "client-registration-individual",
    index: "7",
  },
  {
    question: "Would you prefer to be matched with a therapist who shares your religious beliefs?",
    type: "option",
    options: ["Yes", "No", "No Preference"],
    category: "client-registration-individual",
    index: "8",
  },
  {
    question: "What led you to seek therapy today?",
    type: "multiselect",
    options: ["Anxiety", "Depression", "Stress Management", "Relationship Issues", "Family Conflict", "Work/Career Issues", "Grief/Loss", "Trauma/Abuse", "Substance Abuse", "Eating Disorders", "Self-Esteem Issues", "Life Transitions", "Chronic Illness", "Other (Please specify)"],
    category: "client-registration-individual",
    index: "9",
  },
  {
    question: "What are your expectations from your therapist?",
    type: "multiselect",
    options: ["Help me understand my feelings", "Provide me with coping strategies", "Offer guidance and advice", "Listen without judgment", "Help me set and achieve personal goals", "Improve my relationships", "Support me in making life changes", "Other (Please specify)"],
    category: "client-registration-individual",
    index: "10",
  },
  {
    question: "How would you rate your current eating habits?",
    type: "option",
    options: ["Good", "Fair", "Not great"],
    category: "client-registration-individual",
    index: "11",
  },
  {
    question: "How would you describe your current sleep patterns?",
    type: "option",
    options: ["Regular and restful", "Sometimes restless", "Struggle with sleep", "Prefer not to say"],
    category: "client-registration-individual",
    index: "12",
  },
  {
    question: "Are you currently taking any medications for mental health?",
    type: "option",
    options: ["Yes", "No", "Prefer not to say"],
    category: "client-registration-individual",
    index: "13",
  },
  {
    question: "Have you attended therapy before?",
    type: "option",
    options: ["Yes", "No", "Prefer not to say"],
    category: "client-registration-individual",
    index: "14",
  },
  {
    question: "Do you have any preferences for your therapist’s age?",
    type: "option",
    options: ["No preference", "Younger (18-30)", "Middle-aged (31-50)", "Older (51+)"],
    category: "client-registration-individual",
    index: "15",
  },
  {
    question: "How would you describe your current support system?",
    type: "option",
    options: ["Strong (Family/friends actively involved)", "Moderate (Some support but could be stronger)", "Weak (Limited to no support)", "Prefer not to say"],
    category: "client-registration-individual",
    index: "16",
  },
  {
    question: "Do you have a history of trauma or abuse that you’d like to address in therapy?",
    type: "option",
    options: ["Yes", "No", "Prefer not to say"],
    category: "client-registration-individual",
    index: "17",
  },
  {
    question: "Are you currently experiencing suicidal thoughts?",
    type: "option",
    options: ["Yes, frequently", "Yes, occasionally", "No", "Prefer not to say"],
    category: "client-registration-individual",
    index: "18",
  },
  {
    question: "How do you prefer your therapy sessions to be conducted?",
    type: "option",
    options: ["In-person", "Online (video or phone)", "No preference"],
    category: "client-registration-individual",
    index: "19",
  },
  {
    question: "How often would you like to attend therapy sessions?",
    type: "option",
    options: ["Weekly", "Bi-weekly", "Monthly", "As needed"],
    category: "client-registration-individual",
    index: "20",
  },
  {
    question: "Do you have any specific challenges or disabilities you'd like your therapist to be aware of?",
    type: "text",
    options: [],
    category: "client-registration-individual",
    index: "21",
  },
  {
    question: "What language would you prefer for your therapy sessions?",
    type: "option",
    options: ["English", "Akan", "Ewe", "Ga", "Other (Please specify)"],
    category: "client-registration-individual",
    index: "22",
  },
  {
    question: "Are there any specific characteristics or qualities you prefer in a therapist?",
    type: "text",
    options: [],
    category: "client-registration-individual",
    index: "23",
  },
  {
    question: "How do you cope with stress or difficult situations?",
    type: "multiselect",
    options: ["Talking to friends or family", "Exercise or physical activity", "Meditation or mindfulness practices", "Avoidance or distraction", "Substance use", "Other (Please specify)"],
    category: "client-registration-individual",
    index: "24",
  },
  {
    question: "How would you describe your current mental health?",
    type: "option",
    options: ["Excellent", "Good", "Fair", "Poor", "Prefer not to say"],
    category: "client-registration-individual",
    index: "25",
  },
  {
    question: "Are you currently employed or in school?",
    type: "option",
    options: ["Employed full-time", "Employed part-time", "Unemployed", "Student", "Prefer not to say"],
    category: "client-registration-individual",
    index: "26",
  },
  {
    question: "Do you have any financial concerns that might affect your therapy sessions?",
    type: "option",
    options: ["Yes", "No", "Prefer not to say"],
    category: "client-registration-individual",
    index: "27",
  },
  {
    question: "Is there anything else you’d like your therapist to know before starting your sessions?",
    type: "text",
    options: [],
    category: "client-registration-individual",
    index: "28",
  },
  {
    tag: "firstName",
    question: "What is your first name?",
    type: "text",
    required: true,
    index: "29",
    category: "client-registration-individual",
  },
  {
    tag: "otherNames",
    question: "What are your other names?",
    type: "text",
    required: true,
    index: "30",
    category: "client-registration-individual",
  },
  {
    tag: "primaryPhone",
    question: "What is your phone number?",
    type: "text",
    required: true,
    index: "31",
    category: "client-registration-individual",
  },
  {
    tag: "dateOfBirth",
    question: "What is your date of birth?",
    type: "date",
    required: true,
    index: "32",
    category: "client-registration-individual",
  }
];

export default async function questionSeeder() {
  console.log("Question seeder running ... ");
  // Clear existing data
  await Question.deleteMany({});

  // Insert new data
  await Question.insertMany(questions);
  await Question.insertMany(coupleQuestions);
  await Question.insertMany(individualQuestions);
  console.log("Question seeder completed ... ");
}
