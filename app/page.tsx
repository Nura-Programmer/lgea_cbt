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
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Login Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8 md:p-10 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome to LGEA CBT
          </h2>
          <p className="text-balance">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Reprehenderit quos ratione repellendus labore quisquam consequatur?
          </p>

          <div className="flex justify-between mt-4">
            <Button className="w-40">
              <Link href="/login">Login as Applicant</Link>
            </Button>
            <Button variant={"destructive"} className="w-40">
              <Link href="/admin">Login as Admin</Link>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
