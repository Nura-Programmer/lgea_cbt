"use client";

import axios from "axios";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2Icon } from "lucide-react";

interface DeleteProps {
  delType: "applicants" | "questions" | "tokens";
}

export default function DeleteAllButton({ delType }: DeleteProps) {
  const handleDeleteAll = async () => {
    const toadDelId = toast.loading("Deleting", {
      icon: <Loader2Icon className="animate-spin m-2" />,
      onDismiss: () => toast.dismiss(),
      position: "top-right",
    });

    try {
      const res = await axios.delete(`/api/admin/${delType}`);

      toast(res.data.message || "Successfully Deleted", {
        position: "top-right",
        closeButton: true,
      });
    } catch (err) {
      console.error(err);
      toast("Unexpected error", { position: "top-right", closeButton: true });
    }
    toast.dismiss(toadDelId);
  };

  // Destructive variant for delete action
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete All</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete ALL{" "}
            {delType} and remove them from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDeleteAll}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
