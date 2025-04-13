"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Timer, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

export default function LiveStatsSection() {
  const [stats, setStats] = useState({
    playersOnline: 120,
    quizzesCompleted: 4580,
    avgTime: 35,
    topScore: 98,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomize dummy values a little to simulate "live" updates
      setStats((prev) => ({
        playersOnline: prev.playersOnline + (Math.floor(Math.random() * 10) - 5),
        quizzesCompleted: prev.quizzesCompleted + Math.floor(Math.random() * 20),
        avgTime: Math.max(20, prev.avgTime + (Math.floor(Math.random() * 5) - 2)),
        topScore: Math.min(100, prev.topScore + (Math.floor(Math.random() * 2))),
      }));
    }, 2000 + Math.random() * 1000); // 5-7s range

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      id: 1,
      title: "Players Online",
      value: stats.playersOnline,
      icon: <Users className="h-8 w-8 text-green-400" />,
    },
    {
      id: 2,
      title: "Quizzes Completed",
      value: stats.quizzesCompleted,
      icon: <CheckCircle className="h-8 w-8 text-blue-400" />,
    },
    {
      id: 3,
      title: "Avg. Completion Time (s)",
      value: stats.avgTime,
      icon: <Timer className="h-8 w-8 text-yellow-400" />,
    },
    {
      id: 4,
      title: "Top Score Today",
      value: stats.topScore,
      icon: <Trophy className="h-8 w-8 text-pink-400" />,
    },
  ];

  return (
    <div className="bg-secondary">
    <section className="max-w-3xl mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Quiz Stats</h2>
        <p className="text-secondary-foreground text-lg">See how the community's performing right now.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card className="bg-secondary transition-all hover:scale-105">
              <CardHeader className="flex flex-col items-center">
                {stat.icon}
                <CardTitle className="text-xl mt-2">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-3xl font-bold text-primary">
                {stat.value}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
            
    </div>
  );
}
