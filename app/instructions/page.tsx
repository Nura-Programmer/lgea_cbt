"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import rocket from "@/public/images/rocket.png";
import background from "@/public/images/instructions-bg.jpg";
import clock from "@/public/images/clock.png";

const Instructions = () => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60 * 2); // 2 minutes

  const handleStart = useCallback(() => router.push("/test"), [router]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleStart();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleStart]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Reprehenderit fugiat quis odio cumque nisi, tempora tempore enim quo
            natus provident modi libero explicabo voluptatibus rerum eligendi
            doloribus possimus, sint dolores?
          </p>
        </div>

        {/* Start Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="max-w-md"
            variant="destructive"
            onClick={handleStart}
          >
            Start Test Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
