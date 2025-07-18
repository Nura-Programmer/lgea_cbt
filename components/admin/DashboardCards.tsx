"use client";

import { fetcher } from "@/lib/fetcher";
import {
  CircleCheck,
  CircleX,
  FileText,
  KeyRound,
  LoaderIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

type CardStatus = {
  title: string;
  isReady: boolean;
  statusText: string;
}[];

type IconKey = keyof typeof Icons;

const Icons = {
  applicants: <Users className="h-8 w-8 text-blue-600" />,
  questions: <FileText className="h-8 w-8 text-green-600" />,
  tokens: <KeyRound className="h-8 w-8 text-yellow-600" />,
};

const DashboardCards = () => {
  const { data: dashboardCards }: { data: CardStatus } = useSWR(
    "/api/admin/dashboard/status",
    fetcher,
    {
      refreshInterval: 20000, // Refresh every 20 seconds
    }
  );

  if (!dashboardCards)
    return (
      <div className="text-gray-600 flex gap-2">
        Loading
        <LoaderIcon />
      </div>
    );

  //   localStorage.setItem(
  //     "cards",
  //     JSON.stringify(
  //       dashboardCards.map((card) => ({
  //         ...card,
  //         href: `/admin/${card.title}`,
  //       }))
  //     )
  //   );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {dashboardCards.map(({ title, isReady, statusText }) => (
        <Link
          href={`/admin/${title}`}
          key={title}
          className="group p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg bg-white transition duration-200 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Icons[title as IconKey]}
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
  );
};

export default DashboardCards;
