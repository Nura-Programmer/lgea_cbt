"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import useSWR from "swr";
// import { fetcher } from "@/lib/fetcher";
import { Applicant, Question, Token } from "@/lib/generated/prisma";
import Instructions from "@/components/Instructions";
import axios from "axios";
import { toast } from "sonner";
import { LoaderIcon, XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Test {
  applicant: Applicant & Token;
  questions: Question[];
  message?: string;
  error?: string;
}

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [instructionVisiblity, setInstructionVisiblity] = useState(true);
  const [examStarted, setExamStarted] = useState(false);
  const [submittingExam, setSubmittingExam] = useState(false);
  const [loadingExam, setLoadingExam] = useState(false);
  const [data, setData] = useState<Test>();
  const [isDataRequested, setIsDataRequested] = useState(false);

  // TODO: Frequently update applicant's test state
  // const { data }: { data: Test } = useSWR("/api/test", fetcher);

  if (!isDataRequested) {
    (async () => {
      const { data }: { data: Test } = await axios.get("/api/test");
      setData(data);
    })();

    setIsDataRequested(true);
  }

  const handleOptionSelect = (qId: number, option: string) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleSubmit = useCallback(async () => {
    setSubmittingExam(true);

    try {
      const res = await axios.post("/api/test", { answers });

      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/submitted");
      } else {
        toast.info("Unexpected Error!", {
          description: "Unable to submit your Test",
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to submit exam. Please try again later.");
    }

    setSubmittingExam(false);
  }, [answers, router]);

  const handleStartExam = useCallback(async () => {
    setLoadingExam(true);

    try {
      const res = await axios.get("/api/test?request=startExam");

      toast.success(res.data.message || "Exam started successfully", {
        duration: 5000,
        position: "top-right",
        richColors: true,
        action: {
          label: <XCircleIcon className="h-4 w-4 fill-red-500 rounded-full" />,
          onClick: () => toast.dismiss(),
        },
      });

      setLoadingExam(false);
      setInstructionVisiblity(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to start exam. Please try again later.");
    }

    setExamStarted(true);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!examStarted) return;

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
  }, [handleSubmit, examStarted]);

  // Saving test state in real time
  useEffect(() => {
    if (!examStarted) return;

    const timer = setInterval(async () => {
      const res = await axios.patch("/api/test", { answers });

      console.log(res);
    }, 5000); //Save every 5 seconds

    return () => clearInterval(timer);
  }, [answers, examStarted]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  if (instructionVisiblity)
    return (
      <Instructions
        visible={!instructionVisiblity}
        onStartExam={handleStartExam}
        loading={loadingExam}
      />
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading <LoaderIcon className="ml-2 animate-spin" />
      </div>
    );

  const { applicant, questions } = data;
  const { appNo, firstName, surname } = applicant;
  const token = JSON.stringify(applicant.token);

  const { tokenType } = JSON.parse(token) as Token;

  const currentQuestion = questions[currentIndex];

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
            {(currentQuestion.options as []).map((opt, idx) => {
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
            <span className="font-semibold text-gray-600">App No:</span> {appNo}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Name:</span>{" "}
            {firstName} {surname}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Token Type:</span>{" "}
            {tokenType || "N/A"}
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
        <Button
          className="w-full mt-6"
          onClick={handleSubmit}
          disabled={submittingExam}
        >
          {submittingExam ? (
            <>
              Test Submitting
              <LoaderIcon className="ml-2 animate-spin" />
            </>
          ) : (
            "Submit Test"
          )}
        </Button>
      </div>
    </div>
  );
}
