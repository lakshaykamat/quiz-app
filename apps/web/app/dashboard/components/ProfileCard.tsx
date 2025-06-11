"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user-store";

export default function ProfileCard() {
  const { user } = useUserStore();

  return (
    <Card className="rounded-xl p-6 md:p-10 shadow-md bg-primary text-primary-foreground flex flex-col gap-6">
      {/* Avatar + Name */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Image
            src={user?.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full outline object-cover border shadow-md"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center gap-8">
          <div className="flex items-center gap-2">
            <Image src="/icons/medal.png" alt="level" width={28} height={28} />
            <span className="font-semibold text-lg">Level {user?.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/icons/stars.png" alt="xp" width={28} height={28} />
            <span className="text-lg font-semibold">{user?.xp} XP</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
