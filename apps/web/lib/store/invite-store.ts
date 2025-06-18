// lib/store/invite-store.ts
import { create } from "zustand";

export type InviteInfo = {
  quizId: string;
  roomId: string;
  from: {
    _id: string;
    name: string;
    avatarUrl: string;
    email: string;
  };
} | null;

export const useInviteStore = create<{
  inviteInfo: InviteInfo;
  setInviteInfo: (info: InviteInfo) => void;
}>((set) => ({
  inviteInfo: null,
  setInviteInfo: (info) => set({ inviteInfo: info }),
}));
