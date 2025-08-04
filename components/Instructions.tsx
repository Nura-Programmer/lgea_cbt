"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import rocket from "@/public/images/rocket.png";
import background from "@/public/images/instructions-bg.jpg";
import clock from "@/public/images/clock.png";
import { LoaderIcon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Test } from "@/lib/generated/prisma";

interface Props {
  test: Test;
  visible: boolean;
  onStartExam: () => void;
  loading: boolean;
}

const Instructions = ({ test, visible, onStartExam, loading }: Props) => {
  const { durationMinutes, instructions, instructionMinutes, questionCount } =
    test;

  const [timeLeft, setTimeLeft] = useState((60 * instructionMinutes) | 2); // Use settings from DB or default to 2 minutes

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onStartExam();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onStartExam]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex h-screen bg-gray-100" hidden={visible}>
      {/* Left: Main Question Panel */}
      <div className="hidden md:block flex-1 relative overflow-hidden">
        <div className="w-full h-screen blur-xs relative">
          <Image
            src={background}
            alt="colour bubbles"
            fill
            sizes="100%"
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute self-center top-64">
          <Image src={rocket} alt="rocket" className="object-cover" priority />
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="flex-1 p-2 md:p-4 space-y-4 self-center-safe">
        {/* Timer */}
        <div className="p-2 space-y-2 text-center">
          <div className="flex justify-center">
            <Image
              src={clock}
              alt="clock"
              className="max-w-20 lg:max-w-32 animate-bounce"
            />
          </div>
          <h1 className="text-gray-500 text-2xl md:text-3xl">
            Your Test will automatically start in
          </h1>
          <p className="font-mono text-2xl text-red-600">
            {formatTime(timeLeft)} minutes
          </p>
        </div>

        {/* Instructions */}
        <div className="px-4 space-y-2 lg:mx-12 overflow-y-auto text-gray-800">
          <h2 className="text-lg">
            <em>Instructions:</em>{" "}
            <small>
              Please read the instructions carefully before starting.
            </small>
          </h2>
          <ScrollArea className="max-h-[calc(100vh-380px)] overflow-y-auto">
            <ol className="list-decimal list-inside space-y-1">
              <li>
                You will have <strong>{durationMinutes} minutes</strong> to
                complete the test.
              </li>
              <li>
                The test consists of <strong>{questionCount} questions</strong>.
                Each question is worth <strong>1 mark</strong>.
              </li>
              {instructions.split("\n").map((instruction) => (
                <li key={instruction}>{instruction}</li>
              ))}
              <li>
                Click the <strong>Start Test Now</strong> button to begin.
              </li>
              <li>
                To submit the Test, click the <strong>Submit Test</strong>{" "}
                button at the bottom-right of the screen.
              </li>
              <li>Good luck!</li>
            </ol>
          </ScrollArea>

          {/* Start Button */}
          <div className="flex justify-center mt-8">
            <Button
              className="max-w-md"
              variant="destructive"
              onClick={onStartExam}
            >
              Start Test Now
              {loading && <LoaderIcon className="ml-2 animate-spin" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
