"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type QuizCardProps = {
  title: string;
  description: string;
  difficulty: number; // 0: Easy, 1: Medium, 2:Hard
  tags: string[];
  slug: string;
  languageIcon?: string;
};

export default function QuizCard({
  title,
  description,
  difficulty,
  tags,
  slug,
  languageIcon,
}: QuizCardProps) {
  const getDifficultyLabel = (difficulty: number) => {
    return difficulty === 0 ? "Easy" : difficulty === 1 ? "Medium" : "Hard";
  };

  function truncateSentence(sentence: string, maxLength = 100) {
    if (sentence.length <= maxLength) {
      return sentence;
    } else {
      return sentence.slice(0, maxLength) + "...";
    }
  }
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="transition">
      <Card className="flex flex-col justify-between h-full">
        <CardHeader className="flex items-center gap-3">
          {languageIcon && (
            <img
              crossOrigin="anonymous"
              src={languageIcon}
              alt="icon"
              width={32}
              height={32}
              className="rounded"
            />
          )}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge
              variant="outline"
              className={`text-xs mt-1 ${
                difficulty === 0
                  ? "border-green-500 text-green-600"
                  : difficulty === 1
                    ? "border-yellow-500 text-yellow-600"
                    : "border-red-500 text-red-600"
              }`}
            >
              {getDifficultyLabel(difficulty)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 flex flex-col flex-1 justify-between">
          <p className="text-sm text-muted-foreground">
            {truncateSentence(description)}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-xs rounded-full"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Link href={`/quiz/${slug}`}>
            <Button
              className="w-full mt-4 hover:cursor-pointer"
              variant="default"
              size="sm"
            >
              Start The Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
