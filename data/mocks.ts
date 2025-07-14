type Applicants = {
  id: number;
  appNo: string;
  firstName: string;
  surname: string;
  status?: "PENDING" | "DONE" | "IN_PROGRESS";
  tokenType?: string;
};

type Questions = {
  id: number;
  tokenType: string; // e.g. "english" or "arabic"
  question: string;
  questionType: "objective" | "multiChoice";
  options: Record<string, string>; // e.g. { A: "Option A", B: "Option B", ... }
  correctOption: string | string[]; // e.g. "A" or ["A", "B"] in case of multi-choice
  marks?: number; // default to 1 if not provided
};

type Tokens = {
  id: number;
  token: string;
  tokenType: string;
  usedBy: number | null;
};

// Mock tokens — replace with DB data later
export const tokens: Tokens[] = [
  // { id: 1, token: "ABC123", tokenType: "science", usedBy: 101 },
  // { id: 2, token: "XYZ456", tokenType: "arabic", usedBy: null },
  // { id: 3, token: "QWE789", tokenType: "science", usedBy: 104 },
];

// Mock data — Replace with real data fetched via Prisma/React Query later
export const applicants: Applicants[] = [
  // {
  //   id: 1,
  //   appNo: "SCI001",
  //   firstName: "Aisha",
  //   surname: "Abdullahi",
  //   status: "PENDING",
  //   tokenType: "science",
  // },
  // {
  //   id: 2,
  //   appNo: "ARA002",
  //   firstName: "Yusuf",
  //   surname: "Ahmed",
  //   status: "DONE",
  //   tokenType: "arabic",
  // },
  // {
  //   id: 3,
  //   appNo: "SCI003",
  //   firstName: "Fatima",
  //   surname: "Sani",
  //   status: "IN_PROGRESS",
  //   tokenType: "science",
  // },
];

// Example mock questions — replace with real data later
export const questions: Questions[] = [
  {
    id: 1,
    question: "What is the capital of Nigeria?",
    tokenType: "english",
    questionType: "objective",
    correctOption: "B",
    options: {
      A: "Lagos",
      B: "Abuja",
      C: "Kano",
      D: "Port Harcourt",
    },
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    tokenType: "english",
    questionType: "objective",
    correctOption: "C",
    options: {
      A: "Earth",
      B: "Venus",
      C: "Mars",
      D: "Jupiter",
    },
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    tokenType: "english",
    questionType: "objective",
    correctOption: "A",
    options: {
      A: "H2O",
      B: "CO2",
      C: "O2",
      D: "NaCl",
    },
  },
  {
    id: 4,
    question: "What is the capital of Nigeria?",
    tokenType: "english",
    questionType: "objective",
    correctOption: "B",
    options: {
      A: "Lagos",
      B: "Abuja",
      C: "Kano",
      D: "Port Harcourt",
    },
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    tokenType: "english",
    questionType: "objective",
    correctOption: "C",
    options: {
      A: "Earth",
      B: "Venus",
      C: "Mars",
      D: "Jupiter",
    },
  },
  {
    id: 6,
    question: "What is the chemical symbol for water?",
    tokenType: "english",
    questionType: "objective",
    correctOption: "A",
    options: {
      A: "H2O",
      B: "CO2",
      C: "O2",
      D: "NaCl",
    },
  },
];

export const tokensExist = tokens.length > 0;
export const applicantsExist = applicants.length > 0;
export const questionsExist = questions.length > 0;
