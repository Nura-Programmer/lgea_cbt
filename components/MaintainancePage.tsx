import Image from "next/image";
import { Card } from "./ui/card";
import { Settings } from "lucide-react";
import maintainanceBg from "@/public/images/auth-cover-maintenance-bg.svg";

const MaintainancePage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="absolute w-full h-full top-0 left-0 -z-0">
        <Image
          src={maintainanceBg}
          alt="Maintenance Background"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          fill
          priority
        />
      </div>
      <Card className="w-full h-auto max-w-2xl relative z-10 flex flex-col items-center overflow-hidden rounded-2xl shadow-2xl p-6 space-y-4">
        <Settings className="w-24 h-auto text-gray-500 animate-pulse" />
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800">
          We&apos;ll be back soon!
        </h1>
        <p className="text-lg text-gray-600 max-w-xl text-center">
          Our application is currently undergoing maintenance. We apologize for
          the inconvenience and appreciate your patience. If you have any
          questions, feel free to contact us at{" "}
          <a
            href="mailto:nuranig34@gmail.com"
            className="text-blue-500 underline"
          >
            nuranig34@gmail.com
          </a>
          .
        </p>
        <div className="pt-2 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Intelligent CBT System by Nura
        </div>
      </Card>
    </main>
  );
};

export default MaintainancePage;
