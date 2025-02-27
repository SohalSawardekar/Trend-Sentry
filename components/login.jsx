"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevents automatic redirection
      });

      if (res?.error) {
        console.log("Login failed:", res.error);
        alert("Invalid credentials. Please try again.");
        setLoading(false); // Stop loading
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.log(`Error: ${error}`);
      alert("An unexpected error occurred.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-200 to-zinc-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>
              <div className="flex flex-col justify-center items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pt-5"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="animate-spin " />
                Logging in
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
          </form>
          <p className="text-lg w-full text-center mt-[1rem]">OR</p>
          <div className="w-full flex items-center justify-center">
            <Button
              variant="outline"
              className="flex items-center  space-x-2 mt-[1rem]"
              onClick={signIn}
            >
              <FcGoogle size={20} />
              <span>Login with Google</span>
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center mt-[1rem]">
            <p>Don't have an account ?</p>
            <Link href="/register" passHref>
              <Button
                variant="link"
                className="-translate-x-3 text-[1rem] font-semibold hover:cursor-pointer"
              >
                Register
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
