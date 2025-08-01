"use client";

import DeleteAllButton from "@/components/admin/DeleteAllButton";
import UploadForm from "@/components/admin/UploadForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { Applicant, Token, TokenType } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon, Loader, XCircleIcon } from "lucide-react";
import useSWR from "swr";

export default function ApplicantsPage() {
  const {
    data: applicants,
    isLoading,
    error,
  } = useSWR("/api/admin/applicants", fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
  });

  const getTokenType = (token: string) => {
    // If token is null or undefined, return "N/A"
    if (!token) return "N/A";

    // Some how type script doesn't recognize the type of token as string,
    // so we stringify it first
    const tokenStr = JSON.stringify(token);

    // Parse the token string to get the Token object
    const tokenObj = JSON.parse(tokenStr) as Token;
    const tokenType = tokenObj.tokenType as TokenType;

    return tokenType;
  };

  if (isLoading || error) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <p className="text-xl font-semibold text-red-800">
          {isLoading ? "Loading..." : "Unexpected error"}
        </p>
      </div>
    );
  }

  if (!isLoading && applicants && applicants.length < 1) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-800">
          No applicants found!
        </h2>
        <UploadForm uploadType="applicants" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Applicants</h1>
        <DeleteAllButton delType="applicants" />
      </div>

      <ScrollArea className="max-h-[calc(100vh-120px)] overflow-auto rounded-lg border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>App No</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Surname</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Token Type</TableHead>
              <TableHead>Test Score</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(applicants as (Applicant & Token)[]).map(
              (
                { id, appNo, firstName, surname, status, token, score },
                index
              ) => (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{appNo}</TableCell>
                  <TableCell>{firstName}</TableCell>
                  <TableCell>{surname}</TableCell>
                  <TableCell>
                    <span
                      className={`flex w-fit px-2 py-1 rounded-full text-xs font-medium bg-gray-100 ${
                        status === "DONE"
                          ? "text-green-700"
                          : status === "IN_PROGRESS"
                          ? "text-yellow-700"
                          : "text-red-700"
                      }`}
                    >
                      {status === "DONE" ? (
                        <CheckCircle2Icon className="w-4 h-4 mr-2" />
                      ) : status === "IN_PROGRESS" ? (
                        <Loader className="w-4 h-4 mr-2" />
                      ) : (
                        <XCircleIcon className="w-4 h-4 mr-2" />
                      )}
                      {status}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        token
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700 italic"
                      }`}
                    >
                      {getTokenType(token)}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`px-2 py-1 font-medium ${cn(
                      score ? "text-green-700" : "text-gray-700 italic"
                    )}`}
                  >
                    {score ? ((score / 30) * 100).toFixed(0) : "N/A"}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
