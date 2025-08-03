"use client";

import { fetcher } from "@/lib/fetcher";
// import { Test } from "@/lib/generated/prisma";
import useSWR from "swr";

export default function TestPage() {
  const {
    data: test,
    isLoading,
    error,
  } = useSWR("/api/admin/test", fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
  });

  // const {
  //   enable,
  //   // instructions,
  //   questionCount,
  //   testDuration,
  //   // instructionDuration,
  // } = test as Test;

  const enable = false;
  const questionCount = 30;
  const testDuration = 30;

  if (isLoading || error) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <p className="text-xl font-semibold text-red-800">
          {isLoading ? "Loading..." : "Unexpected error"}
        </p>
      </div>
    );
  }

  if (!isLoading || !test || !enable || testDuration < 5 || questionCount < 5) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-800">
          Test need to be set!
        </h2>
        {/* <UploadForm uploadType="test" /> */}
        test setting form
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Test</h1>
        {/* <DeleteAllButton delType="test" /> */}
      </div>

      {/* <ScrollArea className="max-h-[calc(100vh-120px)] overflow-auto rounded-lg border bg-white shadow"> */}
      {/* <ol className="grid lg:grid-cols-2 gap-2 p-4">
          {(questions as Question[]).map(
            ({ id, questionType, question, options, correctOption }, index) => (
              <li
                key={id}
                className="bg-white border border-gray-200 shadow-md px-6 py-5 flex flex-col md:flex-row md:items-start gap-6 transition hover:shadow-lg"
              >
                <div className="flex-1 md:pr-6 md:border-r-gray-200">
                  <div className="flex justify-between capitalize w-md text-sm text-gray-500 font-medium mb-1">
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
                  {Object.entries(options as string[]).map(([key, option]) => (
                    <div
                      key={key}
                      className="flex items-start gap-2 rounded-lg bg-gray-50 m-2 p-2"
                    >
                      <span className="font-semibold text-gray-600">
                        {OPTION_LABELS[parseInt(key)]}.
                      </span>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </li>
            )
          )}
        </ol> */}
      {/* </ScrollArea> */}
    </div>
  );
}
