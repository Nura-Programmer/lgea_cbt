"use client";

import Link from "next/link";
import { Users, FileText, KeyRound, CircleCheck, CircleX } from "lucide-react";

type CardStatus = {
  title: string;
  href: string;
  icon: React.ReactNode;
  isReady: boolean;
  statusText: string;
};

const dashboardCards: CardStatus[] = [
  {
    title: "Applicants",
    href: "/admin/applicants",
    icon: <Users className="h-8 w-8 text-blue-600" />,
    isReady: false, // change to true if applicants exist
    statusText: "Upload applicants",
  },
  {
    title: "Questions",
    href: "/admin/questions",
    icon: <FileText className="h-8 w-8 text-green-600" />,
    isReady: true,
    statusText: "Questions uploaded",
  },
  {
    title: "Tokens",
    href: "/admin/tokens",
    icon: <KeyRound className="h-8 w-8 text-yellow-600" />,
    isReady: false,
    statusText: "Generate tokens",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">Quick overview and actions</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {dashboardCards.map(({ title, href, icon, isReady, statusText }) => (
          <Link
            href={href}
            key={title}
            className="group p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg bg-white transition duration-200 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-lg font-medium text-gray-800">
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
