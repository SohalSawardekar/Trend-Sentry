"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const NewsCarousel = () => {
  const tweets = [
    "🚀 Breaking: Market surges as tech stocks rally!",
    "💰 Investor sentiment remains mixed amid economic uncertainty.",
    "📈 Crypto market sees significant gains, Bitcoin crosses $50k!",
    "📉 Global inflation concerns continue to impact stock prices.",
    "🌟 New IPO announced: A promising startup enters the market!",
    "🏦 Federal Reserve hints at possible interest rate changes.",
    "🌱 Experts predict a strong year ahead for renewable energy stocks.",
    "📊 Tech giants report record earnings, driving Nasdaq higher.",
    "🔍 Retail investors are reshaping the stock market landscape.",
    "📌 Major hedge funds adjust portfolios in response to market trends.",
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[50%] p-6 shadow-lg border border-gray-300 bg-white">
        <CardHeader className="text-2xl font-semibold text-center mb-4">
          📰 Latest Market News
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Carousel
            orientation="vertical"
            className="h-80 w-full overflow-hidden relative"
          >
            <CarouselPrevious className="absolute top-0 left-1/2 transform -translate-x-1/2" />
            <CarouselContent className="h-80 flex flex-col">
              {tweets.map((tweet, index) => (
                <CarouselItem
                  key={index}
                  className="h-80 flex justify-center items-center"
                >
                  <Card className="p-6 shadow-lg border border-gray-200 rounded-lg text-center w-96">
                    <p className="text-lg text-gray-800">{tweet}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute bottom-0 left-1/2 transform -translate-x-1/2" />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsCarousel;
