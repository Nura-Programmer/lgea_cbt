"use client";

import { Button } from "@/components/ui/button";

// Mock data — replace with real questions from DB later
const questions = [
  {
    id: 1,
    question: "What is the capital of Nigeria?",
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
    options: {
      A: "H2O",
      B: "CO2",
      C: "O2",
      D: "NaCl",
    },
  },
];

export default function QuestionsPage() {
  const handleDeleteAll = () => {
    // TODO: Implement deletion logic
    console.log("Delete all questions");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Questions</h1>
        <Button variant="destructive" onClick={handleDeleteAll}>
          Delete All
        </Button>
      </div>

      <ol className="">
        {questions.map((q, index) => (
          <li
            key={q.id}
            className="bg-white p-4 shadow border flex flex-col md:flex-row md:items-start"
          >
            {/* Left Side: Index + Question Text */}
            <div className="flex-1 space-y-2 pr-4 md:max-w-4xl">
              <span className="font-semibold text-sm text-gray-500">
                Question {index + 1}
              </span>
              <p className="text-gray-800 text-base leading-relaxed">
                {q.question}
              </p>
            </div>

            {/* Right Side: Options */}
            <div className="md:w-64 mt-4 border-l md:mt-0 md:pl-6 space-y-2 text-sm text-gray-700">
              {Object.entries(q.options).map(([key, val]) => (
                <div key={key} className="flex items-start gap-2">
                  <span className="font-semibold">{key}.</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
