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
  attemptedCount: number;
  questionCount: number;
  disableSubmitBtn: boolean;
  onConfirmSubmit: () => void;
}

export default function ConfirmSubmitBtn({
  attemptedCount,
  questionCount,
  disableSubmitBtn,
  onConfirmSubmit,
}: ConfirmProps) {
  const unAttempted = questionCount - attemptedCount;

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
            <ul>
              <li>
                Unattempted question<small>(s)</small>: {unAttempted} out of{" "}
                {questionCount}
              </li>
              <li>
                Attempted question<small>(s)</small>: {attemptedCount}
              </li>
            </ul>
            <p className="mt-4">
              Are you absolutely sure you want submit your test? This will
              submit your test and save it to the servers.
            </p>
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
