import { Button } from "./ui/button";
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
} from "./ui/alert-dialog";
import { LoaderIcon } from "lucide-react";

interface ConfirmProps {
  disableSubmitBtn: boolean;
  onConfirmSubmit: () => void;
}

export default function ConfirmSubmitBtn({
  disableSubmitBtn,
  onConfirmSubmit,
}: ConfirmProps) {
  // Destructive variant for delete action
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {disableSubmitBtn
            ? "Submitting " + <LoaderIcon className="ml-2 animate-spin" />
            : "Submit Test"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want submit?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you absolutely sure you want submit your test? This will submit
            your test and save it to the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={onConfirmSubmit}
            disabled={disableSubmitBtn}
          >
            Yes, Continue{" "}
            {disableSubmitBtn && <LoaderIcon className="ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
