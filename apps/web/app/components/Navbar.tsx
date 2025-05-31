"use client";

import Link from "next/link";
import { useUserStore } from "@/lib/store/user-store";
import { useAuthSync } from "@/lib/hooks/useAuthSync";

const Navbar = () => {
  const { user, isLoading } = useUserStore();

  useAuthSync();

  const navLinkStyles =
    "text-secondary-foreground text-sm hover:outline p-7 py-2 rounded transition-colors";

  return (
    <header className="w-full bg-secondary text-secondary-foreground shadow-xs py-5 px-10">
      <nav className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors"
          >
            Quiz Master
          </Link>
        </h1>

        <ul className="hidden md:flex gap-2 md:gap-5 items-center">
          {isLoading ? (
            <>
            {/* TODO Show skeleton */}
            </>
          ) : user ? (
            <>
              <li>
                <p>XP: {user.xp}</p>
              </li>
              <li>
                <p>Level {user.level}</p>
              </li>
              <li className="text-sm font-bold">Hi, {user.name}</li>
              <li>
                <Link href="/profile">
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  width={42}
                  height={42}
                  className="rounded-full object-cover hover:opacity-80 transition-opacity"
                />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/" className={navLinkStyles}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={navLinkStyles}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/login" className={navLinkStyles}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={`${navLinkStyles} bg-primary text-white`}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
