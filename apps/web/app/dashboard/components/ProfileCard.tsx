"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user-store";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileCard({ isLoading = false }) {
  const { user } = useUserStore();

  return (
    <Card className="rounded-xl p-6 md:p-10 shadow-md bg-primary text-primary-foreground flex flex-col gap-6">
      {/* Avatar + Name */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {isLoading ? (
            <Skeleton className="w-[80px] h-[80px] rounded-full" />
          ) : (
            <Image
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full outline object-cover border shadow-md"
            />
          )}

          <div className="text-center sm:text-left">
            {isLoading ? (
              <>
                <Skeleton className="h-[24px] w-[150px] mb-2 rounded-full" />
                <Skeleton className="h-[16px] w-[200px] rounded-full" />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center gap-8">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Skeleton className="w-[28px] h-[28px] rounded-full" />
                <Skeleton className="h-[20px] w-[80px] rounded-full" />
              </>
            ) : (
              <>
                <Image src="/icons/medal.png" alt="level" width={28} height={28} />
                <span className="font-semibold text-lg">Level {user?.level}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Skeleton className="w-[28px] h-[28px] rounded-full" />
                <Skeleton className="h-[20px] w-[80px] rounded-full" />
              </>
            ) : (
              <>
                <Image src="/icons/stars.png" alt="xp" width={28} height={28} />
                <span className="text-lg font-semibold">{user?.xp} XP</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
