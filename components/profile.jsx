"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(session?.user?.id);
    if (status === "authenticated") {
      async function fetchUserData() {
        try {
          const res = await fetch(`/api/user/${session?.user?.id}`);
          const data = await res.json();
          if (res.ok) setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchUserData();
    }
  }, [session, status]);

  if (status === "loading") return <Skeleton className="w-96 h-96" />;
  if (!session)
    return <p className="text-center">Please log in to view your profile.</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 p-6 shadow-md">
        <CardHeader className="flex flex-col items-center gap-4">
          {loading ? (
            <Skeleton className="w-24 h-24 rounded-full" />
          ) : (
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user?.image || "/default-avatar.png"}
                alt="Profile Photo"
              />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <h2 className="text-xl font-semibold">
            {loading ? <Skeleton className="w-24 h-6" /> : user?.name}
          </h2>
        </CardHeader>
        <CardContent className="text-center">
          {loading ? (
            <Skeleton className="w-40 h-5 mx-auto" />
          ) : (
            <p className="text-gray-600">{user?.email}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
