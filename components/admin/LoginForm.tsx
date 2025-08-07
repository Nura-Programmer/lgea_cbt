"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  interface FormData {
    username: string;
    password: string;
  }

  const onSubmit = async (data: FormData) => {
    try {
      setSubmitting(true);
      setError("");

      const res = await axios.post("/auth/admin/login", data);

      if (res.status === 200) {
        router.push("/admin/dashboard");

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
    } catch (err) {
      console.error("Login error:", err);
      // err?.response?.data?.error ||
      setError("Login failed. Please check your credentials.");
      // Handle error (e.g., show a notification)
    }

    setSubmitting(false);
    return;
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
        <Label htmlFor="username" className="mb-2">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="admin"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-500 text-sm mt-1">
            Username is required
          </span>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            Password is required
          </span>
        )}
      </div>

      <Button type="submit" className="w-full mt-4" disabled={submitting}>
        Login {submitting && <LoaderIcon className="animate-spin ml-2" />}
      </Button>
    </form>
  );
}
