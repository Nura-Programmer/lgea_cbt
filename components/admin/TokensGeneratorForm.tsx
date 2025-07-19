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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { LoaderIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function TokenGeneratorForm() {
  const [tokenType, setTokenType] = useState("");
  const [count, setCount] = useState("10");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/admin/tokens/generate", {
        tokenType,
        count,
      });

      toast(res.data.message || "Successful", {
        position: "top-right",
        closeButton: true,
      });
    } catch (err) {
      console.log(err);
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
              Select the type of tokens you want to generate and specify the
              number of tokens to create.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Token Type</Label>
            <Select value={tokenType} onValueChange={setTokenType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="arabic">Arabic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Number of Tokens</Label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min={1}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading || !tokenType || parseInt(count) <= 0}
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
