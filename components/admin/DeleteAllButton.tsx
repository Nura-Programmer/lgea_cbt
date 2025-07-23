"use client";

import axios from "axios";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface DeleteProps {
  delType: "applicants" | "questions" | "tokens";
}

export default function DeleteAllButton({ delType }: DeleteProps) {
  const handleDeleteAll = async () => {
    const confirmDelete = confirm(
      `Are you sure you want delete all ${delType}?`
    );

    if (!confirmDelete) return;

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
  };

  // Destructive variant for delete action
  return (
    <Button variant="destructive" onClick={handleDeleteAll}>
      Delete All
    </Button>
  );
}
