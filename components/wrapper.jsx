"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "./loadingScreen";

export default function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait until session is determined
    if (!session) {
      router.push(""); // Redirect if not authenticated
    } else {
      router.push("/dashboard"); // Redirect to dashboard if authenticated
    }
  }, [session, status, router]);

  if (status === "loading") return <LoadingScreen />;

  return children;
}
