"use client";

import { Github, Twitter, Mail, Code } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <Code className="h-8 w-8" />
          <span className="text-white text-xl font-bold">QuizMaster</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="#" className="hover:text-gray-400 hover:underline transition">Home</Link>
          <Link href="#" className="hover:text-purple-400 transition">Quizzes</Link>
          <Link href="#" className="hover:text-purple-400 transition">Leaderboard</Link>
          <Link href="#" className="hover:text-purple-400 transition">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-5">
          <Link href="#" aria-label="GitHub" className="hover:text-white transition">
            <Github className="h-6 w-6" />
          </Link>
          <Link href="#" aria-label="Twitter" className="hover:text-white transition">
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="mailto:hello@quizmaster.com" aria-label="Email" className="hover:text-white transition">
            <Mail className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
      </div>
    </footer>
  );
}
