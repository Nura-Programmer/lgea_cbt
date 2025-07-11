"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock tokens — replace with DB data later
const tokens = [
  { id: 1, token: "ABC123", tokenType: "science", usedBy: 101 },
  { id: 2, token: "XYZ456", tokenType: "arabic", usedBy: null },
  { id: 3, token: "QWE789", tokenType: "science", usedBy: 104 },
];

export default function TokensPage() {
  const handlePrint = () => {
    window.print(); // basic print for now
  };

  const handleDeleteAll = () => {
    console.log("Delete all tokens");
    // TODO: implement actual delete
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tokens</h1>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="destructive" onClick={handleDeleteAll}>
            Delete All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow">
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
            {tokens.map((token, index) => (
              <TableRow key={token.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-mono text-sm">
                  {token.token}
                </TableCell>
                <TableCell className="capitalize text-sm">
                  {token.tokenType}
                </TableCell>
                <TableCell>
                  {token.usedBy ? (
                    <span className="text-green-600 font-medium">
                      {token.usedBy}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Unused</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
