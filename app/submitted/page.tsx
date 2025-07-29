import BackToApplicantLoginBtn from "@/components/BackToApplicantLoginBtn";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";

const SubmittedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="max-w-md h-80 flex flex-col items-center justify-center bg-gray-50">
        <CardTitle className="flex flex-col items-center space-y-2">
          <CheckCircleIcon className="w-16 h-16 text-green-500 animate-caret-blink" />
          <h1 className="text-2xl text-gray-800">Submission Successful</h1>
        </CardTitle>
        <CardContent>
          <p className="text-lg text-gray-700">
            Your answers have been submitted. Your results will be processed and
            communicated to you shortly.
          </p>
        </CardContent>
        <CardFooter>
          <BackToApplicantLoginBtn />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubmittedPage;
