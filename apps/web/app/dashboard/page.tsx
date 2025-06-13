"use client";

import { useUserStore } from "@/lib/store/user-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import QuizCard from "../components/QuizCard";
import ProfileCard from "./components/ProfileCard";
import { useEffect, useState } from "react";
import ky from "ky";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoading: isUserLoading } = useUserStore();
  const [search, setSearch] = useState("");
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz`;
        const res: any = await ky.get(url).json();
        setQuizzes(res);
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
      } finally {
        setIsQuizLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  function generateQuizSlug(title: string, id: string) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `${slug}-${id}`;
  }

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  const greetingUser = () => {
    const now = new Date();
    const currentHour = now.getHours();

    let greeting =
      currentHour < 12
        ? "Good morning ☀️"
        : currentHour < 18
          ? "Good afternoon 🌤️"
          : "Good evening 🌙";

    const day = now.getDate();
    const month = now.toLocaleString("default", { month: "long" });

    return `${greeting}, ${day} ${month}.`;
  };

  return (
    <motion.div
      className="py-10 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-5xl mx-auto space-y-6 px-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.name || "Guest"}!
          </h1>
          <p className="text-muted-foreground">{greetingUser()}</p>
        </div>

        {/* User Summary */}
        <ProfileCard isLoading={isUserLoading} />

        {/* Search Quizzes */}
        <div className="flex h-12 gap-2 items-center">
          <Input
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-full"
          />
          <Button
            size="sm"
            className="h-full w-auto md:w-[10rem]"
            variant="outline"
            onClick={() => {}}
            disabled
          >
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>

        {/* Available Quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isQuizLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border shadow-sm space-y-4"
                >
                  <Skeleton className="h-[30px] w-[60%] rounded-full" />
                  <Skeleton className="h-[25px] w-[80%] rounded-full" />
                  <Skeleton className="h-[25px] w-[40%] rounded-full" />
                  <Skeleton className="h-[50px] w-full rounded-lg" />
                </div>
              ))
            : filteredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz._id}
                  title={quiz.title}
                  difficulty={quiz.difficulty}
                  languageIcon={quiz.imageUrl}
                  slug={generateQuizSlug(quiz.title, quiz._id)}
                  description={quiz.description}
                  tags={quiz.tags}
                />
              ))}
        </div>
      </div>
    </motion.div>
  );
}
