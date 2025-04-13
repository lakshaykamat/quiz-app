"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, User } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const initialLeaderboard = [
  { id: 1, name: "CodeWizard", score: 98 },
  { id: 2, name: "BugHunter", score: 95 },
  { id: 3, name: "SyntaxSamurai", score: 93 },
  { id: 4, name: "DevNinja", score: 90 },
  { id: 5, name: "PixelPirate", score: 88 },
];

export default function LeaderboardSection() {
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live leaderboard updates by randomizing scores slightly
      setLeaderboard((prev) =>
        prev
          .map((player) => ({
            ...player,
            score: Math.min(100, player.score + Math.floor(Math.random() * 3)),
          }))
          .sort((a, b) => b.score - a.score)
      );
    }, 4000 + Math.random() * 3000); // 4-7s range

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h2>
        <p className="text-gray-400 text-lg">Check out the top scorers in real time.</p>
      </div>

      <Card className="max-w-3xl mx-auto shadow-lg transition-all">
        <CardHeader className="flex items-center gap-2 justify-center">
          <Trophy className="h-6 w-6 text-yellow-400" />
          <CardTitle className="text-2xl">Top Players</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leaderboard.map((player, index) => (
              <motion.li
                key={player.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-between py-2 border p-2 rounded-lg transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-black rounded-full p-2">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold">{player.name}</span>
                </div>
                <span className="text-xl font-bold text-primary">{player.score}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
