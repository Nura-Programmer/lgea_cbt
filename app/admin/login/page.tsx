import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import loginImage from "@/public/images/auth-cover-login-bg.svg";

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>

          <form className="space-y-5">
            <div>
              <Label htmlFor="username" className="mb-2">
                Username
              </Label>
              <Input id="username" type="text" placeholder="admin" />
            </div>

            <div>
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input id="password" type="password" placeholder="********" />
            </div>

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
