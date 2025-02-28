"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LoadingScreen from "./loadingScreen";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      async function fetchUserData() {
        try {
          const res = await fetch(`/api/user/${session.user.email}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data.data);
          } else {
            console.error("Failed to fetch user:", data.message);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchUserData();
    }
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [session, status]);

  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "Trending", path: "/dashboard/trending" },
    { name: "News", path: "/dashboard/news" },
    { name: "Explore", path: "/dashboard/explore" },
  ];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <nav className="bg-slate-300 text-white px-6 py-4 w-full flex justify-between items-center shadow-md">
      {/* Logo */}
      <div id="logo" className="text-lg font-bold">
        Trend Sentry
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-6 ">
        {navLinks.map(({ name, path }) => (
          <Link key={name} href={path}>
            <Button
              variant={pathname === path ? "secondary" : "ghost"}
              className="text-lg text-slate-600 font-semibold hover:cursor-pointer"
            >
              {name}
            </Button>
          </Link>
        ))}
      </div>

      {/* Search & Profile */}
      <div className="hidden md:flex items-center gap-8 -translate-x-[5rem]">
        {/* Search Bar */}
        <Input
          type="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-40 md:w-56 bg-white"
        />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 text-black rounded-full hover:cursor-pointer"
            >
              <Avatar>
                <AvatarImage
                  src={user?.profile || "/default-avatar.png"}
                  alt="Profile Picture"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => {
                signOut({ callbackUrl: "/login" });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden text-2xl p-2">
            <FaBars />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col items-start gap-4 mt-6">
            {navLinks.map(({ name, path }) => (
              <Link key={name} href={path}>
                <Button
                  variant={pathname === path ? "primary" : "ghost"}
                  className="w-full justify-start"
                >
                  {name}
                </Button>
              </Link>
            ))}

            {/* Search Bar (Mobile) */}
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full mt-2"
            />

            {/* Profile Dropdown (Mobile) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <FaUserCircle className="text-2xl" /> Profile
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
