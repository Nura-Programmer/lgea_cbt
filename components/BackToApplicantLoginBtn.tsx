"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackToApplicantLoginBtn = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="w-full mt-4 bg-red-500 text-white hover:bg-red-700 hover:text-white"
      size="lg"
      onClick={() => router.push("/login")}
    >
      Back to login
    </Button>
  );
};

export default BackToApplicantLoginBtn;
