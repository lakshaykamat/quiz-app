"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ky, { HTTPError } from "ky";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserStore } from "@/lib/store/user-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  interface LoginResponse {
    [x: string]: any;
    token: string;
  }

  const router = useRouter();
  const { setUser } = useUserStore();

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
      const res = await ky
        .post(url, {
          json: { email, password },
        })
        .json<LoginResponse>();

      console.log(res);
      setMessage("Redirecting to dashboard...");
      toast.success("Logged in successfully!");

      Cookies.set("token", res.token, { expires: 7 });
      setUser(res.user);
      router.push("/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);

      // Handle ky HTTP errors properly
      if (error instanceof HTTPError) {
        try {
          // Try to get the error response body
          const errorResponse = await error.response.json();
          const errorMessage =
            errorResponse.message || errorResponse.error || "Login failed.";
          toast.error(errorMessage);
        } catch (jsonError) {
          // If JSON parsing fails, use status text or generic message
          toast.error(error.response.statusText || "Login failed.");
        }
      } else {
        // Handle network errors or other non-HTTP errors
        toast.error(error.message || "Network error. Please try again.");
      }
    }
  };
  return (
    <motion.div
      className="mt-20 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded border border-gray-200 shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 py-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 py-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            size={"lg"}
            disabled={isLoading}
            className="w-full hover:cursor-pointer"
            onClick={() => handleLogin(email, password)}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <Button
            size={"lg"}
            variant={"secondary"}
            className="w-full hover:cursor-pointer"
            onClick={() => {
              setEmail("lakshaykamat2048@gmail.com");
              setPassword("Lakshay2004");
            }}
          >
            Guest Credentials
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </div>
    </motion.div>
  );
}
