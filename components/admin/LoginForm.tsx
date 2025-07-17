"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, LoaderIcon } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");

      const res = await axios.post("/api/admin/login", data);

      if (res.status === 200) return router.push("/admin/dashboard");
      else setError("Login failed. Please try again.");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err?.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
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
