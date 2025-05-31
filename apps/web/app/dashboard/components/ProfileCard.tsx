"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user-store";
import { Progress } from "@/components/ui/progress";

export default function ProfileCard() {
  const { user } = useUserStore();

  // Mock XP calculation — 100 XP needed per level
  const xpProgress = user ? (user.xp % 100) : 0;

  return (
    <Card className="rounded-xl px-10 flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <Image
            src={user?.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full object-cover border"
          />
          <div>
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/icons/medal.png" alt="level" width={24} height={24} />
            <span className="text-sm font-semibold">Level {user?.level || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/icons/stars.png" alt="xp" width={24} height={24} />
            <span className="text-sm font-semibold">{user?.xp || 40} XP</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {/* <div className="text-xs text-muted-foreground text-right">XP to next level: {100 - xpProgress}</div> */}
      {/* <Progress value={xpProgress} className="h-2 bg-secondary" /> */}

    </Card>
  );
}
