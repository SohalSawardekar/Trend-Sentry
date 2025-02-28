"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import Navbar from "./navbar";

export default function TrendingPage() {
  const [trendingItems, setTrendingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTrendingItems([
        {
          id: 1,
          title: "AI Breakthrough in 2025",
          description:
            "New AI model surpasses human intelligence in problem-solving.",
          image: "https://source.unsplash.com/600x400/?technology,ai",
          category: "Technology",
          date: "Feb 28, 2025",
        },
        {
          id: 2,
          title: "SpaceX's Mars Mission",
          description:
            "Elon Musk announces the first manned mission to Mars in 2030.",
          image: "https://source.unsplash.com/600x400/?space,mars",
          category: "Space",
          date: "Feb 26, 2025",
        },
        {
          id: 3,
          title: "Quantum Computing Advancements",
          description: "Quantum supremacy achieved with a 500-qubit processor.",
          image: "https://source.unsplash.com/600x400/?quantum,technology",
          category: "Science",
          date: "Feb 24, 2025",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl mt-[2rem] font-bold text-gray-800 text-center mb-6">
          🚀 What's Trending?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {loading
            ? Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-64 w-full rounded-lg" />
                ))
            : trendingItems.map((item) => (
                <Link key={item.id} href={`/trending/${item.id}`}>
                  <Card className="overflow-hidden h-[30rem] transition-transform transform hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </AspectRatio>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                        <Badge>{item.category}</Badge>
                        <span>{item.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
