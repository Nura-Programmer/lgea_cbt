"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function SetProfileDialog({
  type,
  onUsernameUpdated,
}: {
  type: "username" | "password";
  onUsernameUpdated?: (username: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!value.trim()) return toast.error("Field is required");

    setLoading(true);
    try {
      const res = await axios.post("/api/admin", { [type]: value.trim() });

      if (res.status === 200) {
        toast.success(`${type} updated`);
        setOpen(false);

        if (res.data.username && onUsernameUpdated)
          onUsernameUpdated(res.data.username);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={(e) => e.stopPropagation()}
        >
          Change {type}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change {type}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor={type}>{type}</Label>
          <Input
            id={type}
            type={type === "password" ? "password" : "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !value}>
            {loading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
