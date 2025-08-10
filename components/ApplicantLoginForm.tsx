"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AlertCircleIcon, LoaderIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormData {
  appNo: string;
  tokens: string;
}

export default function ApplicantLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLogin(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", data);

      if (res.status === 200) {
        toast.success(res.data.message || "You have successfully logged in.");

        router.push("/test");
        router.refresh();
      } else setError("Login failed. Please try again.");
    } catch (error) {
      const err = (
        error as {
          response: { data: { error: string } };
        }
      ).response.data.error;

      console.error("Login error:", error);

      setError(err || "Login failed. Please check your credentials.");
    }

    setIsLogin(false);
  };

  return (
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
              <InputOTPGroup className="w-full">
                <InputOTPSlot className="flex-1" index={0} />
                <InputOTPSlot className="flex-1" index={1} />
                <InputOTPSlot className="flex-1" index={2} />
                <InputOTPSlot className="flex-1" index={3} />
                <InputOTPSlot className="flex-1" index={4} />
                <InputOTPSlot className="flex-1" index={5} />
                <InputOTPSlot className="flex-1" index={6} />
                <InputOTPSlot className="flex-1" index={7} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.tokens && (
          <span className="text-red-500 text-sm mt-1">Tokens is required</span>
        )}
      </div>

      <Button type="submit" className="w-full mt-4" disabled={isLogin}>
        Login {isLogin && <LoaderIcon className="animate-spin ml-2" />}
      </Button>
    </form>
  );
}
