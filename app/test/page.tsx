"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock applicant data & questions
const applicant = {
  appNo: "SCI102",
  fullName: "Fatima Yusuf",
  tokenType: "science",
};

const questions = [
  {
    id: 1,
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
  },
  {
    id: 2,
    question: "Which organ pumps blood?",
    options: ["Lungs", "Liver", "Heart", "Kidney"],
  },
  {
    id: 3,
    question: "Who discovered gravity?",
    options: ["Einstein", "Newton", "Tesla", "Galileo"],
  },
];

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 5); // 5 minutes

  const handleOptionSelect = (qId: number, option: string) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = useCallback(() => {
    console.log("Submitted answers:", answers);
    alert("Test submitted!");
    // TODO: POST to backend
  }, [answers]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [handleSubmit]);

  const currentQuestion = questions[currentIndex];
  const formatTime = (t: number) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left: Main Question Panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Question {currentIndex + 1}
          </h2>
          <p className="text-gray-700 text-lg">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, idx) => {
              const optionId = String.fromCharCode(65 + idx); // A, B, C, D
              return (
                <div
                  key={optionId}
                  className={cn(
                    "flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-100",
                    answers[currentQuestion.id] === optionId &&
                      "bg-blue-50 border-blue-500"
                  )}
                  onClick={() =>
                    handleOptionSelect(currentQuestion.id, optionId)
                  }
                >
                  <span className="font-semibold text-blue-600">
                    {optionId}.
                  </span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-72 bg-white border-l p-5 space-y-6 shadow-md">
        {/* Applicant Info */}
        <div className="text-sm space-y-1">
          <p>
            <span className="font-semibold text-gray-600">App No:</span>{" "}
            {applicant.appNo}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Name:</span>{" "}
            {applicant.fullName}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Token Type:</span>{" "}
            {applicant.tokenType}
          </p>
        </div>

        {/* Timer */}
        <div className="border border-dashed rounded-xl p-4 text-center">
          <p className="text-gray-500 text-xs">Time Remaining</p>
          <p className="font-mono text-2xl text-red-600">
            {formatTime(timeLeft)}
          </p>
        </div>

        {/* Question Navigation */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">
            Jump to Question:
          </p>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "text-sm rounded-md h-8 w-8 flex items-center justify-center border",
                  currentIndex === idx
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                )}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full mt-6" onClick={handleSubmit}>
          Submit Test
        </Button>
      </div>
    </div>
  );
}
