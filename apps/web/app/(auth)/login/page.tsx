"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ky from "ky";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserStore } from "@/lib/store/user-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface LoginResponse {
    [x: string]: any;
    token: string;
  }

  const router = useRouter();
  const {setUser}=useUserStore()

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await ky.post("http://localhost:4001/api/v1/auth/login", {
        json: { email, password },
      }).json<LoginResponse>();
  
      toast.success("Logged in successfully!");
  
      Cookies.set("token", res.token, { expires: 7 });
  
      setUser(res.user)
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed.");
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

          <Button size={"lg"} className="w-full" onClick={() => handleLogin(email, password)}>
            Login
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
