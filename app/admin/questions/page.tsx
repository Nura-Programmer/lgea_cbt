"use client";

import DeleteAllButton from "@/components/admin/DeleteAllButton";
import UploadForm from "@/components/admin/UploadForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetcher } from "@/lib/fetcher";
import { Question } from "@/lib/generated/prisma";
import useSWR from "swr";

export default function QuestionsPage() {
  const {
    data: questions,
    isLoading,
    error,
  } = useSWR("/api/admin/questions", fetcher, {
    refreshInterval: 20000, // Refresh every 20 seconds
  });

  if (isLoading || error) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <p className="text-xl font-semibold text-red-800">
          {isLoading ? "Loading..." : "Unexpected error"}
        </p>
      </div>
    );
  }

  if (!isLoading && questions.lenght < 1) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-800">
          No questions found!
        </h2>
        <UploadForm uploadType="questions" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Questions</h1>
        <DeleteAllButton delType="questions" />
      </div>

      <ScrollArea className="max-h-[calc(100vh-120px)] overflow-y-auto">
        <ol className="grid lg:grid-cols-2 gap-2 p-4">
          {(questions as Question[]).map(
            ({ id, questionType, question, options, correctOption }, index) => (
              <li
                key={id}
                className="bg-white border border-gray-200 shadow-md px-6 py-5 flex flex-col md:flex-row md:items-start gap-6 transition hover:shadow-lg"
              >
                <div className="flex-1 md:pr-6 md:border-r-gray-200">
                  <div className="flex justify-between w-md text-sm text-gray-500 font-medium mb-1">
                    <span>Question {index + 1}</span> |
                    <em className="text-gray-400">{questionType}</em> |
                    <strong>
                      {correctOption
                        ? `Correct: ${correctOption}`
                        : "No correct option specified"}
                    </strong>
                  </div>
                  <p className="text-gray-800 text-base leading-relaxed font-medium">
                    {question}
                  </p>
                  {Object.entries(
                    JSON.parse(options as string) as [number, string]
                  ).map(([key, option]) => (
                    <div
                      key={key}
                      className="flex items-start gap-2 rounded-lg bg-gray-50 m-2 p-2"
                    >
                      <span className="font-semibold text-gray-600">
                        {key}.
                      </span>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </li>
            )
          )}
        </ol>
      </ScrollArea>
    </div>
  );
}
