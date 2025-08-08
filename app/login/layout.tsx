import { Card } from "@/components/ui/card";
import Image from "next/image";
import loginImage from "@/public/images/auth-cover-login-bg.svg";

export default function LoginPage({ children }: { children: React.ReactNode }) {
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
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white">{children}</div>
      </Card>
    </main>
  );
}
