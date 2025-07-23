"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { LoaderIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function TokenGeneratorForm() {
  const [engTokenCount, setEngTokenCount] = useState("10");
  const [arabTokenCount, setArabTokenCount] = useState("10");

  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/admin/tokens/generate", {
        arabTokenCount,
        engTokenCount,
      });

      toast(res.data.message || "Successful", {
        position: "top-right",
        closeButton: true,
      });
    } catch (err) {
      console.error(err);
      toast("Unexpected error", { position: "top-right", closeButton: true });
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate Tokens</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={async (e) => await handleGenerate(e)}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Generate Tokens</DialogTitle>
            <DialogDescription>
              Set the required quantity of each token.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>English Tokens</Label>
            <Input
              type="number"
              value={engTokenCount}
              onChange={(e) => setEngTokenCount(e.target.value)}
              min={1}
            />
            {(!engTokenCount || parseInt(engTokenCount) < 1) && (
              <p className="text-small text-red-500">
                Number of English tokens is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Arabic Tokens</Label>
            <Input
              type="number"
              value={arabTokenCount}
              onChange={(e) => setArabTokenCount(e.target.value)}
              min={1}
            />
            {(!arabTokenCount || parseInt(arabTokenCount) < 1) && (
              <p className="text-small text-red-500">
                Number of Arabic tokens is required
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={
                loading ||
                !engTokenCount ||
                !arabTokenCount ||
                parseInt(engTokenCount) <= 0 ||
                parseInt(arabTokenCount) <= 0
              }
            >
              {loading && <LoaderIcon className="animate-spin" />}
              Start Generating
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
