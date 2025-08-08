import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/2 h-60 md:h-100">
          <Image
            src="/images/completed-steps.png"
            alt="Welcome to LGEA CBT"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Login Form */}
        <div className="text-center space-y-6 px-2">
          <Image
            src="/images/subeb_logo.png"
            alt="SUBEB"
            width={100}
            height={10}
            className="mx-auto my-4 object-cover height-auto w-24"
          />
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800">
            Welcome to CBT Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto px-8">
            Take computer-based tests in a secure, reliable, and intuitive
            environment. Powered by modern web technologies.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login/admin">
              <Button variant="outline" className="w-46 text-lg" size="lg">
                Admin login
              </Button>
            </Link>

            <Link href="/login">
              <Button className="w-46 text-lg" size="lg">
                Applicant login
              </Button>
            </Link>
          </div>

          <div className="pt-2 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Intelligent CBT System by Nura
          </div>
        </div>
      </Card>
    </main>
  );
}
