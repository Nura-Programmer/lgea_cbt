"use client";

import DeleteAllButton from "@/components/admin/DeleteAllButton";
import PrintButton from "@/components/admin/PrintButton";
import TokensGeneratorForm from "@/components/admin/TokensGeneratorForm";
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
import { Token } from "@/lib/generated/prisma";
import useSWR from "swr";

export default function TokensPage() {
  const {
    data: tokens,
    isLoading,
    error,
  } = useSWR("/api/admin/tokens", fetcher, { refreshInterval: 5000 });

  if (isLoading || error) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <p className="text-xl font-semibold text-red-800">
          {isLoading ? "Loading..." : "Unexpected error"}
        </p>
      </div>
    );
  }

  if (!isLoading && tokens && tokens.length < 1) {
    return (
      <div className="h-full flex flex-col justify-center items-center space-y-4 text-center">
        <h2 className="text-xl font-semibold text-red-800">No tokens found!</h2>
        <TokensGeneratorForm />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tokens</h1>
        <div className="flex gap-3">
          <TokensGeneratorForm />
          <PrintButton />
          <DeleteAllButton delType="tokens" />
        </div>
      </div>

      <ScrollArea className="max-h-[calc(100vh-120px)] overflow-auto rounded-lg border bg-white shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">SN</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Token Type</TableHead>
              <TableHead>ID Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(tokens as Token[]).map((token, index) => (
              <TableRow key={token.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-mono text-sm">
                  {token.token}
                </TableCell>
                <TableCell className="capitalize text-sm">
                  {token.tokenType}
                </TableCell>
                <TableCell>
                  {token.used ? (
                    <span className="text-green-600 font-medium">Used</span>
                  ) : (
                    <span className="text-gray-400 italic">Unused</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
