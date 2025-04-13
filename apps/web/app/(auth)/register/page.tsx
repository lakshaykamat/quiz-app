"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ky from "ky";


export default function RegisterPage() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleRegister = async () => {
    try {
        if (password !== passwordConfirm) {
            console.error("Passwords do not match.");
            toast.error("Passwords do not match.");
            return;
        }
      const res = await ky.post("http://127.0.0.1:4001/api/v1/auth/signup", {
        json: { name, email, password },
      }).json();
  
      toast.success("Registration successful!");
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Registration failed.");
    }
  };

  return (
    <motion.div
      className="mt-20 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-md bg-card text-card-foreground p-8 rounded border border-gray-200 shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <User className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="name"
              className="pl-10 py-6"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-4 h-5 w-5 text-gray-400"/>
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 py-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-4 h-5 w-5 text-gray-400"/>
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 py-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-4 h-5 w-5 text-gray-400"/>
            <Input
              type="passwordConfirm"
              placeholder="Re Enter Password"
              className="pl-10 py-6"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <Button size={"lg"} className="w-full" onClick={handleRegister}>
            Register
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
