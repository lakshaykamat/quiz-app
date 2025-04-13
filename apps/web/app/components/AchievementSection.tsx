"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Flame, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AchievementsSection() {
  const achievements = [
    {
      id: 1,
      title: "First Quiz Completed",
      description: "You've successfully completed your first quiz!",
      icon: <Award className="h-8 w-8 text-yellow-400" />,
    },
    {
      id: 2,
      title: "High Streak",
      description: "5 consecutive quizzes with a score over 90%.",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
    },
    {
      id: 3,
      title: "Quiz Veteran",
      description: "Completed 50 quizzes in total.",
      icon: <Star className="h-8 w-8 text-purple-500" />,
    },
    {
      id: 4,
      title: "Fast Finisher",
      description: "Finished a quiz in under 30 seconds.",
      icon: <Zap className="h-8 w-8 text-blue-400" />,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Achievements</h2>
        <p className="text-gray-400 text-lg">
          Earn badges and milestones as you master quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
  {achievements.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="bg-secondary transition-all hover:scale-105 h-full flex flex-col">
        <CardHeader className="flex flex-col items-center min-h-[100px]"> {/* adjust min-h as needed */}
          {item.icon}
          <CardTitle className="text-xl mt-3 text-center min-h-[40px] flex items-center justify-center">
            {item.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-400 text-sm flex-grow flex items-center justify-center min-h-[30px]">
          {item.description}
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

    </section>
  );
}
