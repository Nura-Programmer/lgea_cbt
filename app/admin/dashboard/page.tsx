import Link from "next/link";
import { Users, FileText, KeyRound, CircleCheck, CircleX } from "lucide-react";
import { applicantsExist, questionsExist, tokensExist } from "@/data/mocks";

type CardStatus = {
  title: string;
  icon: React.ReactNode;
  isReady: boolean;
  statusText: string;
};

const dashboardCards: CardStatus[] = [
  {
    title: "applicants",
    icon: <Users className="h-8 w-8 text-blue-600" />,
    isReady: applicantsExist, // change to true if applicants exist
    statusText: applicantsExist ? "Applicants uploaded" : "Upload applicants!",
  },
  {
    title: "questions",
    icon: <FileText className="h-8 w-8 text-green-600" />,
    isReady: questionsExist,
    statusText: questionsExist ? "Questions uploaded" : "Upload questions!",
  },
  {
    title: "tokens",
    icon: <KeyRound className="h-8 w-8 text-yellow-600" />,
    isReady: tokensExist,
    statusText: tokensExist ? "Tokens available" : "Generate new tokens",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">Quick overview and actions</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {dashboardCards.map(({ title, icon, isReady, statusText }) => (
          <Link
            href={`/admin/${title}`}
            key={title}
            className="group p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg bg-white transition duration-200 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-lg capitalize font-medium text-gray-800">
                  {title}
                </span>
              </div>
              {isReady ? (
                <CircleCheck className="h-6 w-6 text-green-500" />
              ) : (
                <CircleX className="h-6 w-6 text-red-500" />
              )}
            </div>
            <p className="text-sm text-gray-600 group-hover:text-gray-800">
              {statusText}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
