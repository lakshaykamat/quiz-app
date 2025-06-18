"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/lib/store/user-store";
import { useAuthSync } from "@/lib/hooks/useAuthSync";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import socket from "@/lib/socket";
import { toast } from "sonner"; // or use `react-toastify`

import { useRouter } from "next/navigation";
import { useInviteStore } from "@/lib/store/invite-store";

const Navbar = () => {
  const { user, isLoading } = useUserStore();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { setInviteInfo } = useInviteStore();

  useAuthSync();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  // 🔔 Listen for real-time invites

  useEffect(() => {
    if (!user) return;

    socket.emit("register", { userId: user._id });

    socket.on("invite-received", ({ quizId, roomId, from }) => {
      setInviteInfo({ quizId, roomId, from }); // ✅ Save for later use
      toast(`You got an invite from ${from.name}`, {
        action: {
          label: "Accept",
          onClick: () => {
            socket.emit("accept-invite", {
              roomId,
              name: user.name,
              avatarUrl: user.avatarUrl,
            });

            router.push(`/playground/friends?quiz=${quizId}`);
          },
        },
      });
    });

    return () => {
      socket.off("invite-received");
    };
  }, [user]);

  const navLinkStyles =
    "text-secondary-foreground text-sm hover:outline p-2 px-4 rounded transition-colors";

  return (
    <header className="w-full bg-secondary text-secondary-foreground shadow py-3 px-4 md:py-5 md:px-10">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold">
          <Link href="/" className="transition-colors hover:opacity-80">
            Quiz Master
          </Link>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {isLoading ? (
            <>{/* TODO: Add Skeleton Loader */}</>
          ) : user ? (
            <>
              <li className="font-semibold">XP: {user.xp}</li>
              <li className="font-semibold">Level {user.level}</li>
              <li className="font-semibold">Hi, {user.name}</li>
              <li>
                <Link href="/profile">
                  <Image
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-secondary p-4 rounded shadow">
          {isLoading ? (
            <>{/* TODO: Add Skeleton Loader */}</>
          ) : user ? (
            <>
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  width={48}
                  height={48}
                  className="rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <p>XP: {user.xp}</p>
                <p>Level {user.level}</p>
              </div>
              <Link href="/profile" className={navLinkStyles}>
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className={navLinkStyles}>
                Home
              </Link>
              <Link href="/about" className={navLinkStyles}>
                About
              </Link>
              <Link href="/login" className={navLinkStyles}>
                Login
              </Link>
              <Link
                href="/register"
                className={`${navLinkStyles} bg-primary text-white`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
