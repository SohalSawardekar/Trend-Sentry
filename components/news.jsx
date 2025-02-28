"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingScreen from "./loadingScreen";
import axios from "axios";

const NewsCarousel = ({ tag = "everything", date = new Date() }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [len, setLen] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch from your own Next.js API route
        const apiUrl = `https://newsapi.org/v2/everything?q=${tag}&from=${date}&sortBy=publishedAt&apiKey=69dbf9de0aa9414fa90747744627fda0`;
        const response = await axios.get(apiUrl, {
          method: "GET",
        });
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setArticles(response.data.articles || []);
        setLen(response.data.articles.length);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [tag, date]);

  if (loading) return <LoadingScreen />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Carousel>
        <CarouselContent>
          {articles.slice(0, 10).map((article, index) => (
            <CarouselItem
              key={index}
              className="p-2 transition-opacity duration-500 ease-in-out"
            >
              <Card className="shadow-lg rounded-xl overflow-hidden">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center line-clamp-3 mb-3">
                    {article.description}
                  </p>
                  <p className="text-xs text-gray-500 text-center mb-2">
                    Source: {article.source.name}
                  </p>
                  <p className="text-xs text-gray-500 text-center mb-3">
                    Published: {new Date(article.publishedAt).toLocaleString()}
                  </p>
                  <div className="flex justify-center">
                    <Button asChild>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default NewsCarousel;
