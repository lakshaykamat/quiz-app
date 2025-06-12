"use client";

import { useEffect } from "react";
import type { User } from "../store/user-store"; 
import Cookies from "js-cookie";
import ky from "ky";
import { useUserStore } from "@/lib/store/user-store";

export const useAuthSync = () => {
  const { setUser, clearUser, setLoading } = useUserStore();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      clearUser();
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await ky
          .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .json<User>();
          console.log("user data",userData)
        userData.xp = Math.round(userData.xp)
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        clearUser();
      }
    };

    fetchUser();
  }, []);
};
