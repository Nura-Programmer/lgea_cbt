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

interface ConfirmProps {
  onConfirmSubmit: () => void;
}

export default function ConfirmSubmitBtn({ onConfirmSubmit }: ConfirmProps) {
  // Destructive variant for delete action
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Submit Test</Button>
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
          >
            Yes, Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
