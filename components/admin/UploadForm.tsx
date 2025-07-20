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
import axios from "axios";

interface UploadFormProps {
  uploadType: string;
}

export default function UploadForm({ uploadType }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const getColFormat = (type: string) => {
    switch (type) {
      case "applicants":
        return "(appNo, firstName, surname)";
      case "questions":
        return `('tokenType' [english, arabic], 'question', 'questionType' [objective, multiChoice],
        'options' [A, B, C, D], 'correctOption' and optional 'marks' default to 1)`;
      // case "tokens":
      //   return "(appNo, tokenType)";
      // case "results":
      //   return "(appNo, tokenType, score)";
      default:
        return "unknown format";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`/api/admin/${uploadType}/upload`, formData);

      if (res.status === 200) alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Unexpected error occurred");
    }

    setUploading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload {uploadType}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Choose {uploadType} file</DialogTitle>
            <DialogDescription>
              Only excel (.xlsx) file is supported. Dont include any header row
              in the file. The columns should be exactly in the form:
              <br /> <strong>{getColFormat(uploadType)}</strong>.
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
