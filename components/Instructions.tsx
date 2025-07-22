"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import rocket from "@/public/images/rocket.png";
import background from "@/public/images/instructions-bg.jpg";
import clock from "@/public/images/clock.png";

interface Props {
  visible: boolean;
  onExamStarted: () => void;
}

const Instructions = ({ visible, onExamStarted }: Props) => {
  const [timeLeft, setTimeLeft] = useState(60 * 2); // 2 minutes

  // const handleStart = useCallback(() => router.push("/test"), [router]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // handleStart();
          onExamStarted();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExamStarted]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" hidden={visible}>
      {/* Left: Main Question Panel */}
      <div className="hidden md:block flex-1 relative">
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
      <div className="flex-1 p-2 md:p-4 space-y-4 self-center-safe overflow-y-auto">
        <div className="space-y-4">
          {/* Timer */}
          <div className="p-2 space-y-4 text-center">
            <div className="flex justify-center">
              <Image
                src={clock}
                alt="clock"
                className="max-w-32 animate-bounce"
              />
            </div>
            <h1 className="text-gray-500 text-2xl md:text-3xl">
              Your Test will automatically start in
            </h1>
            <p className="font-mono text-2xl text-red-600">
              {formatTime(timeLeft)} minutes
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-4 space-y-4 md:mx-12">
          <h2 className="text-lg">
            <em>Instructions:</em>
          </h2>
          <p className="text-gray-800">
            <ol className="list-decimal list-inside space-y-2 overflow-auto">
              <li>
                You will have <strong>2 minutes</strong> to complete the test.
              </li>
              <li>
                The test consists of <strong>10 questions</strong>.
              </li>
              <li>
                Each question is worth <strong>10 points</strong>.
              </li>
              <li>You can skip questions and come back later.</li>
              <li>Once you start, you cannot pause the test.</li>
              <li>Ensure you have a stable internet connection.</li>
              <li>
                Click the <strong>Start Test Now</strong> button to begin.
              </li>
              <li>
                To submit the Test, click the <strong>Submit Test</strong>{" "}
                button at the bottom-right of the screen.
              </li>
              <li>Good luck!</li>
            </ol>
          </p>
        </div>

        {/* Start Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="max-w-md"
            variant="destructive"
            onClick={onExamStarted}
          >
            Start Test Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
