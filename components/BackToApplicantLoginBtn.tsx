"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackToApplicantLoginBtn = () => {
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      className="hover:bg-red-700 hover:cursor-pointer"
      size="lg"
      onClick={() => router.push("/login")}
    >
      Back to login
    </Button>
  );
};

export default BackToApplicantLoginBtn;
