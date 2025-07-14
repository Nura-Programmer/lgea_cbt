"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export default function UploadApplicantsForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/applicants/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    alert(result.message || result.error);
    setUploading(false);
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DialogTrigger asChild>
          <Button variant="outline">Upload applicants</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose applicants file</DialogTitle>
            <DialogDescription>
              Only excel (.xlsx) and CSV (.csv) files are supported. Dont
              include any header row in the file. The columns should be exactly
              in the form (appNo, firstName, surname)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <input
                type="file"
                accept=".xlsx, .csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={uploading || !file}>
              {uploading ? "Uploading..." : "Upload Applicants"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
