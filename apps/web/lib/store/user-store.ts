import ky from "ky";
import { create } from "zustand";

function getTokenFromCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}


export interface User {
  name: string;
  email:string
  xp: number;
  level: number;
  quizzesTaken: string[]; // Array of quiz IDs or objects
  bio: string;
  role: string; // 'user' or 'admin'
  quizzes: string[]; // Array of quiz IDs or objects
  lastLogin: Date;
  isEmailVerified: boolean;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  password?: string; // Optional, for authentication purposes
  avatarUrl: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
  refreshUser: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  refreshUser: async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        throw new Error("Token not found in cookies");
      }
      const userData = await ky.get(process.env.NEXT_PUBLIC_AUTH_API_URL + '/me', {
        headers: { Authorization: `Bearer ${token}` },
      }).json<User>();  // assuming your backend has a /me route
      userData.xp = Math.round(userData.xp)
      set({ user: userData });
    } catch (e) {
      console.error("Failed to refresh user", e);
    }
  },
}));
