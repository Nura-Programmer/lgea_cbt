import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import loginImage from "@/public/images/auth-cover-login-bg.svg";
import {
  InputOTP,
  InputOTPGroup,
  // InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function AdminLoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/2 h-60 md:h-auto">
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

          <form className="space-y-5">
            <div>
              <Label htmlFor="appNo" className="mb-2">
                App No.
              </Label>
              <Input id="appNo" type="text" placeholder="4312" />
            </div>

            <div>
              <Label htmlFor="tokens" className="mb-2">
                Tokens
              </Label>
              <InputOTP maxLength={9}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                  <InputOTPSlot index={8} />
                </InputOTPGroup>

                {/* <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup> */}
              </InputOTP>
            </div>

            <Button type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
}

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Image from "next/image";

// export default function Admins() {
//   return (
//     <Card className="w-sm flex items-center">
//       <CardHeader>
//         <Image src="globe.svg" width={200} height={200} alt="login" />
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//                 <a
//                   href="#"
//                   className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                 >
//                   Forgot your password?
//                 </a>
//               </div>
//               <Input id="password" type="password" required />
//             </div>
//           </div>
//         </form>
//         <Button type="submit" className="w-full mt-2">
//           Login
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }
