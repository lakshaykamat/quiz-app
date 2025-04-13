"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import ky from "ky";
import { useUserStore } from "@/lib/store/user-store";

export const useAuthSync = () => {
  const { setUser, clearUser } = useUserStore();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      clearUser();
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await ky
          .get("http://localhost:4001/api/v1/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .json();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        clearUser();
      }
    };

    fetchUser();
  }, []);
};
