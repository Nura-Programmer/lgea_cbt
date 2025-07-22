"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import loginImage from "@/public/images/auth-cover-login-bg.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormData {
  appNo: string;
  tokens: string;
}

export default function ApplicantLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  console.log(errors);

  const onSubmit = async (data: FormData) => {
    setIsLogin(true);

    try {
      const res = await axios.post("/api/login", data);

      if (res.status === 200) {
        router.push("/test");

        toast(res.data.message || "successful", {
          dismissible: true,
          duration: 5000,
          position: "top-right",
          // style: {
          //   backgroundColor: "#f0fff4",
          //   color: "#065f46",
          //   border: "1px solid #bbf7d0",
          // },
          description: "You have successfully logged in.",
          icon: <CheckCircle2Icon className="h-4 w-4 text-green-500" />,
          richColors: true,
          action: {
            label: <XCircleIcon className="h-4 w-4" />,
            onClick: () => toast.dismiss(),
          },
        });
      } else setError("Login failed. Please try again.");
    } catch (error) {
      console.error("Login error:", error);
      // err?.response?.data?.error ||
      setError("Login failed. Please check your credentials.");
      // Handle error (e.g., show a notification)
    }

    setIsLogin(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/2 h-60 md:h-100">
          <Image
            src={loginImage}
            alt="Login Illustration"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Applicant Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label htmlFor="appNo" className="mb-2">
                App No.
              </Label>
              <Input
                id="appNo"
                type="text"
                placeholder="43120"
                {...register("appNo", { required: true })}
              />
              {errors.appNo && (
                <span className="text-red-500 text-sm mt-1">
                  Application Number is required
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="tokens" className="mb-2">
                Tokens
              </Label>
              <Controller
                name="tokens"
                control={control}
                render={({ field }) => (
                  <InputOTP maxLength={8} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.tokens && (
                <span className="text-red-500 text-sm mt-1">
                  Tokens is required
                </span>
              )}
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLogin}>
              Login {isLogin && <LoaderIcon className="animate-spin ml-2" />}
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
}
