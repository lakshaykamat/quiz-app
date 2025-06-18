"use client";

import { useUserStore } from "@/lib/store/user-store";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { debounce } from "lodash";
import socket from "@/lib/socket";
import api from "@/lib/api";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { useInviteStore } from "@/lib/store/invite-store";

interface Friend {
  _id: string;
  name: string;
  avatarUrl: string;
  // Add other fields if needed
}

const PlayWithFriend = () => {
  const { user } = useUserStore();
  const { inviteInfo, setInviteInfo } = useInviteStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quiz");

  const [search, setSearch] = useState("");
  
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [otherPlayer, setOtherPlayer] = useState<Friend | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [friendReady, setFriendReady] = useState(false);

  useEffect(() => {
    if (!user || !quizId) return;

    socket.emit("joinQuiz", {
      quizId,
      name: user.name,
      avatarUrl: user.avatarUrl,
      userId: user._id,
    });

    socket.on("player-joined", (player) => {
      setOtherPlayer(player);
    });

    socket.on("startQuiz", () => {
      router.push(`/playground/${quizId}?roomId=${quizId}`);
    });

    socket.on("friendReady", ({ userId }) => {
      if (userId !== user._id) {
        setFriendReady(true);
      }
    });

    return () => {
      socket.off("player-joined");
      socket.off("startQuiz");
      socket.off("friendReady");
    };
  }, [user, quizId]);

  const handleReady = () => {
    if (!quizId || !user) return;
    setIsReady(true);
    socket.emit("playerReady", { quizId, userId: user._id });
  };

  const searchUsers = debounce(async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const data = await api.get(`auth/find/${query}`).json();
      //@ts-ignore
      setSuggestions(data);
    } catch (err) {
      console.error("Search error:", err);
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    searchUsers(search);
    return () => searchUsers.cancel();
  }, [search]);

  const inviteFriend = (friend:Friend) => {
    if (!quizId || !friend || !user) return;
    socket.emit("inviteFriend", {
      quizId,
      friendId: friend._id,
      inviter: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
    //@ts-ignore
    setOtherPlayer(friend);
    toast.success(`Invite sent to ${friend.name}`);
  };

  return (
    <Suspense
      fallback={<div className="flex justify-center h-screen">Loading...</div>}
    >
      <main className="max-w-4xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold mb-6">Real-Time Quiz Lobby</h1>

        <div className="flex justify-center items-center gap-8 my-10">
          {user && <ProfileComponent name={user.name} avatarUrl={user.avatarUrl} />}
          
          <img src="/icons/versus.png" className="w-16" alt="vs" />
          {otherPlayer ? (
            <ProfileComponent
            //@ts-ignore
              name={otherPlayer.name}
              //@ts-ignore
              avatarUrl={otherPlayer.avatarUrl}
            />
          ) : inviteInfo ? (
            <ProfileComponent
              name={inviteInfo.from.name}
              avatarUrl={inviteInfo.from.avatarUrl}
            />
          ) : (
            <SearchUserComponent
              {...{ search, setSearch, suggestions, onSelect: inviteFriend }}
            />
          )}
        </div>

        <Button
          disabled={isReady}
          className={`mt-8 text-lg transition-opacity ${
            isReady ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleReady}
        >
          {isReady ? "Waiting for friend..." : "I'm Ready"}
        </Button>

        {isReady && !friendReady && (
          <p className="mt-4 text-muted-foreground">
            Waiting for your friend to be ready...
          </p>
        )}
        {friendReady && !isReady && (
          <p className="mt-4 text-muted-foreground">
            Your friend is ready. Click ready to start!
          </p>
        )}
        {isReady && <p className="mt-4 text-muted-foreground">You're ready</p>}
        {otherPlayer && (
          <div className="mt-2">
            <p className="text-sm">
            {/* //@ts-ignore */}
              Waiting for {otherPlayer.name} to be ready...
            </p>
          </div>
        )}
      </main>
    </Suspense>
  );
};

interface ProfileComponentProps {
  name: string;
  avatarUrl: string;
}

const ProfileComponent = ({ name, avatarUrl }: ProfileComponentProps) => (
  <div className="flex flex-col items-center">
    <img src={avatarUrl} alt={name} className="w-24 h-24 rounded-full" />
    <p className="mt-2 font-medium text-lg">{name}</p>
  </div>
);

interface SearchUserComponentProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Friend[];
  onSelect: (friend: Friend) => void;
}

const SearchUserComponent = ({ search, setSearch, suggestions, onSelect }: SearchUserComponentProps) => (
  <Dialog>
    <DialogTrigger>
      <InviteFriendComponent />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Search Friend</DialogTitle>
        <DialogDescription>
          Invite a friend to join your quiz battle.
        </DialogDescription>
        <Input
          placeholder="Enter name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="my-4"
        />
        <div className="grid grid-cols-2 gap-4">
          {suggestions.map((friend) => (
            <DialogClose key={friend._id} onClick={() => onSelect(friend)}>
              <div className="text-center cursor-pointer">
                <img
                  src={friend.avatarUrl}
                  className="w-16 h-16 rounded-full mx-auto"
                  alt={friend.name}
                />
                <p className="mt-1 font-semibold">{friend.name}</p>
              </div>
            </DialogClose>
          ))}
        </div>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

const InviteFriendComponent = () => (
  <div className="text-center">
    <img src="/icons/invite.png" alt="invite" className="w-24 mx-auto" />
    <p className="mt-2 font-semibold text-lg">Invite Friend</p>
  </div>
);

export default PlayWithFriend;
