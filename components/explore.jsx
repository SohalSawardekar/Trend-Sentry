"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";

const SentimentAnalysis = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleSubmit = () => {
    if (!input) return;
    setResult(
      `Sentiment Analysis Result: ${
        input.length % 2 === 0 ? "Positive" : "Negative"
      }`
    );
  };

  const handleCancel = () => {
    setInput("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Main Content */}
      <Card className="w-full max-w-lg mt-10 p-6 bg-white shadow-lg rounded-lg border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 text-center">
            Enter Text for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            type="text"
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full text-xl px-4 py-10  border rounded-md focus:ring-2 focus:ring-blue-500 "
          />
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Test message
            </Button>
          </div>
          {result && (
            <div className="mt-6 text-center text-lg font-medium text-gray-800 bg-gray-200 p-4 rounded-md">
              {result === "Positive" ? (
                <div className="text-green-500 font-bold">Positive</div>
              ) : (
                <div className="text-red-600 font-bold">Negative</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
