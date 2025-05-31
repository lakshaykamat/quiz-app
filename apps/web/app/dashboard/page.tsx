"use client";

import { useUserStore } from "@/lib/store/user-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import QuizCard from "../components/QuizCard";
import ProfileCard from "./components/ProfileCard";
import { useEffect, useState } from "react";
import ky from "ky";
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useUserStore();
  const [search, setSearch] = useState("");
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res:any = await ky.get(process.env.NEXT_PUBLIC_API_URL + "/quiz").json()
        console.log(res);
        setQuizzes(res); // assuming your API response is { data: { data: [...] } }
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="px-6 py-10 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-5xl mx-auto space-y-6 px-4">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground">Here are your available quizzes:</p>

        {/* User Summary */}
        <ProfileCard />

        {/* Search Quizzes */}
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <Button size="sm" variant="outline">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>

        {/* Available Quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              difficulty={quiz.difficulty}
              languageIcon={quiz.imageUrl} // assuming you store icon name in your quiz doc
              onStart={() => router.push(`/playground/${quiz._id}`)}
              description={quiz.description}
              tags={quiz.tags}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
