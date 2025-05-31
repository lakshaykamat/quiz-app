"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/lib/store/user-store";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Star, RefreshCcw } from "lucide-react";

export default function ProfilePage() {
  const { user } = useUserStore();

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-10 px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Overview */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <img
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="avatar"
              className="rounded-full w-24 h-24 mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your Stats</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Level</p>
                <span className="font-bold text-lg">2</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium">XP</p>
                <span className="font-bold">120 / 200</span>
              </div>

              <Progress value={(120 / 200) * 100} />

              <div className="flex items-center justify-between">
                <p className="font-medium">Quizzes Played</p>
                <span className="font-bold">14</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium">Accuracy</p>
                <span className="font-bold">78%</span>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-medium">Rank</p>
                <span className="font-bold">#42</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Achievements */}
      <h3 className="text-2xl font-bold mb-4">Recent Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Trophy className="w-10 h-10 mx-auto text-yellow-500 mb-3" />
            <h4 className="font-semibold">Quiz Streak!</h4>
            <p className="text-sm text-muted-foreground">5 quizzes in a row</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <TrendingUp className="w-10 h-10 mx-auto text-green-500 mb-3" />
            <h4 className="font-semibold">Fast Learner</h4>
            <p className="text-sm text-muted-foreground">+50 XP in a day</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Star className="w-10 h-10 mx-auto text-purple-500 mb-3" />
            <h4 className="font-semibold">Top Scorer</h4>
            <p className="text-sm text-muted-foreground">90% in a quiz</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Reset Progress */}
      <div className="flex justify-end">
        <Button variant="destructive">
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reset Progress
        </Button>
      </div>
    </motion.div>
  );
}
