"use client";

import { useEffect } from "react";
import type { User } from "../store/user-store"; 
import Cookies from "js-cookie";
import { useUserStore } from "@/lib/store/user-store";
import { getEnvironmentApiUrl } from "../utils";
import api from "../api";

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
        const userData = await api
          .get(`${getEnvironmentApiUrl()}/auth/me`, {
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
