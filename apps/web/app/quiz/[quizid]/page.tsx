"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ky from "ky";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ClockIcon,
  UsersIcon,
  CircleDotIcon,
  FlameIcon,
  TrophyIcon,
  BarChartIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { getDifficulty } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

// Simulate faker.js style data generation
const generateMockStats = () => ({
  totalPlays: Math.floor(Math.random() * 1000) + 100,
  averageScore: Math.floor(Math.random() * 50) + 50,
  passRate: Math.floor(Math.random() * 50) + 50,
  activePlayers: Math.floor(Math.random() * 20) + 1,
});

const generateMockLeaderboard = () => [
  {
    name: "Alice",
    score: Math.floor(Math.random() * 100),
    avatar: "/avatars/avatar1.png",
  },
  {
    name: "Bob",
    score: Math.floor(Math.random() * 100),
    avatar: "/avatars/avatar2.png",
  },
  {
    name: "Charlie",
    score: Math.floor(Math.random() * 100),
    avatar: "/avatars/avatar3.png",
  },
];

interface Quiz {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: number | string;
  imageUrl: string;
  estimatedTime?: number;
  totalQuestions?: number;
}

export default function QuizDetailsPage() {
  const params = useParams();
  const slug = params.quizid as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(generateMockStats());
  const [leaderboard, setLeaderboard] = useState(generateMockLeaderboard());

  const extractQuizIdFromSlug = (slug: string) => {
    const lastDashIndex = slug.lastIndexOf("-");
    return slug.substring(lastDashIndex + 1);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const id = extractQuizIdFromSlug(slug);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz/${id}?questionLimit=-1`;
        const res: Quiz = await ky.get(url).json();
        //@ts-ignore
        res.difficulty = getDifficulty(res.difficulty);
        setQuiz(res);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateMockStats());
      setLeaderboard(generateMockLeaderboard());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-4">
        <Skeleton className="h-[40px] w-[60%]" />
        <Skeleton className="h-[25px] w-[80%]" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>
    );
  }
  const getDifficultyColor = (difficulty: number | string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-200";
      case "Medium":
        return "bg-yellow-200";
      case "Hard":
        return "bg-red-200";
      default:
        return "bg-gray-200";
    }
  };
  if (!quiz) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        <p className="text-center text-destructive">Quiz not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-12">
      {/* Top Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Content */}
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <Image
              src={quiz.imageUrl || "/default-quiz.png"}
              alt="Quiz Image"
              width={160}
              height={160}
              className="rounded-2xl p-2 object-cover border shadow-md"
            />
            <div>
              <h1 className="text-4xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground text-lg mt-4">
                {quiz.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className={getDifficultyColor(quiz.difficulty)}
            >
              {quiz.difficulty}
            </Badge>
            {quiz.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>

          <Card className="p-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-5 h-5" />
              <span>{quiz.estimatedTime ?? 10} min Time Limit</span>
            </div>
            <div className="flex items-center gap-3">
              <CircleDotIcon className="w-5 h-5" />
              <span>{quiz.totalQuestions ?? 15} Questions</span>
            </div>
            <div className="flex items-center gap-3">
              <UsersIcon className="w-5 h-5" />
              <span>Multiplayer Available</span>
            </div>
            <div className="flex items-center gap-3">
              <FlameIcon className="w-5 h-5" />
              <span>{quiz.difficulty} Difficulty</span>
            </div>
          </Card>

          <div className="flex gap-4">
            <Link href={`/playground/${quiz._id}`}>
              <Button size="lg" className="cursor-pointer">
                Start Solo
              </Button>
            </Link>
            <Link href={`/playground/friends/?quiz=${quiz._id}`}>
              <Button
                size="lg"
                variant="outline"
                className="hover:cursor-pointer"
              >
                Play with Friend
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Stats Panel */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChartIcon className="w-5 h-5" /> Live Quiz Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{stats.totalPlays}</span>
                <span className="text-muted-foreground text-sm">
                  Total Plays
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">
                  {stats.averageScore}%
                </span>
                <span className="text-muted-foreground text-sm">Avg Score</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{stats.passRate}%</span>
                <span className="text-muted-foreground text-sm">Pass Rate</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">
                  {stats.activePlayers}
                </span>
                <span className="text-muted-foreground text-sm">
                  Active Players
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrophyIcon className="w-5 h-5" /> Leaderboard
            </h2>
            <div className="space-y-3">
              {leaderboard.map((player, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={"https://avatar.iran.liara.run/public"}
                      alt={player.name}
                      width={40}
                      height={40}
                      className="rounded-full border"
                    />
                    <span>{player.name}</span>
                  </div>
                  <span className="font-semibold">{player.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.div
        className="space-y-4 px-4 md:px-10 py-8 bg-secondary rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-center">About This Quiz</h2>
        <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-3xl mx-auto">
          Dive deep into this {String(quiz.difficulty).toLowerCase()} quiz to
          challenge your knowledge on {quiz.tags.join(", ")}. Whether you're
          playing solo or competing with friends, this quiz is designed to test
          your skills, improve your learning curve, and deliver fun with every
          attempt!
        </p>
      </motion.div>
    </div>
  );
}
