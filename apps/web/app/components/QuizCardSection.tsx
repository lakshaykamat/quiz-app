"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, Code, BookOpen, Star } from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    icon: <Code className="h-8 w-8 text-yellow-400" />,
    description: "Test your core JavaScript knowledge and syntax skills.",
  },
  {
    id: 2,
    title: "Data Structures",
    icon: <BookOpen className="h-8 w-8 text-green-400" />,
    description: "Assess your understanding of arrays, trees, and more.",
  },
  {
    id: 3,
    title: "Algorithms Challenge",
    icon: <Brain className="h-8 w-8 text-purple-400" />,
    description: "Solve problems on sorting, searching, and recursion.",
  },
  {
    id: 4,
    title: "Leaderboard Quiz",
    icon: <Star className="h-8 w-8 text-pink-400" />,
    description: "Compete with others and climb the leaderboard.",
  },
];

export default function QuizCardsSection() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Challenge</h2>
        <p className="text-gray-400 text-lg">
          Pick a quiz category and start testing your skills now.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="bg-secondary transition-all">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  {quiz.icon}
                </div>
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-foreground mb-4">{quiz.description}</p>
                <Button className="w-full">Start Quiz</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
