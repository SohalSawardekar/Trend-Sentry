"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [session, status]);

  if (status === "loading") return <Skeleton className="w-96 h-96" />;
  if (!session)
    return <p className="text-center">Please log in to view your profile.</p>;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100 p-6">
        <Card className=" w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-xl rounded-lg p-8">
          <CardHeader className="flex flex-col items-center">
            {loading ? (
              <Skeleton className="w-32 h-32 rounded-full" />
            ) : (
              <Avatar className="w-32 h-32 border-4 border-gray-300 shadow-md">
                <AvatarImage
                  src={user?.profile || "/default-avatar.png"}
                  alt="Profile Picture"
                />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <h2 className="text-2xl font-semibold text-gray-900 mt-4">
              {loading ? <Skeleton className="w-24 h-6" /> : user?.name}
            </h2>
          </CardHeader>
          <CardContent className="text-center">
            {loading ? (
              <Skeleton className="w-40 h-5 mx-auto" />
            ) : (
              <p className="text-lg text-gray-700 font-medium">{user?.email}</p>
            )}
            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
              <Button className="w-full md:w-auto" disabled>
                Edit Profile
              </Button>
              <Button
                className="w-full md:w-auto"
                variant="destructive"
                disabled
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
