"use client";
import { useUserStore } from "@/lib/store/user-store";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const PlayWithFriend = (props: Props) => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");
  const { user, isLoading } = useUserStore();
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <main className="flex flex-col max-w-5xl mx-auto items-center md:min-h-screen p-4">
      <h1 className="text-3xl md:text-5xl font-bold mt-7 mb-4">
        Compete with a Friend
      </h1>
      <div className="my-12 flex flex-col md:flex-row w-full justify-between gap-10 items-center">
        <ProfileComponent name={user.name} avatarUrl={user.avatarUrl} />
        <img className="w-16 md:w-32 mx-auto" src="/icons/versus.png" alt="" />
        <InviteFriendComponent />
      </div>
    </main>
  );
};

const InviteFriendComponent = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        className="w-36 md:w-64 rounded-full p-1 outline-secondary outline-4"
        src={"/icons/invite.png"}
        alt="Invite Friend"
      />
      <p className="text-2xl mt-4 font-semibold">Invite Friend</p>
    </div>
  );
};
const ProfileComponent = ({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <img
        className="w-36 md:w-64 rounded-full p-1 outline-secondary outline-4"
        src={avatarUrl}
        alt="User Picture"
      />
      <p className="text-2xl mt-4 font-semibold">{name}</p>
    </div>
  );
};
export default PlayWithFriend;
