"use client";

import { Button } from "../ui/button";

interface DeleteProps {
  delType: string;
}

export default function DeleteAllButton({ delType }: DeleteProps) {
  const handleDeleteAll = () => {
    // TODO: Add confirmation and delete logic
    console.log("Delete all", delType);
  };

  // Destructive variant for delete action
  return (
    <Button variant="destructive" onClick={handleDeleteAll}>
      Delete All
    </Button>
  );
}
