"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";

const SentimentAnalysis = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://itsprotesilaus-trend-sentry.hf.space/predict",
        [{ id: 1, text: input }],
        { headers: { "Content-Type": "application/json" } }
      );

      const analysis = data.results[0];
      setResult({
        sentiment: analysis.sentiment.label,
        emotion: analysis.emotion.label,
        sentimentScore: (analysis.sentiment.score * 100).toFixed(2),
      });

      const { data: recommendationData } = await axios.post("/api/gemini", {
        input,
        sentiment: analysis.sentiment.label,
        emotion: analysis.emotion.label,
      });

      setRecommendation(recommendationData);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setResult(null);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setInput("");
    setResult(null);
    setRecommendation(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <Card className="w-full max-w-lg mt-10 p-6 bg-white shadow-lg rounded-lg border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 text-center">
            Enter Text for Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full text-xl px-4 py-10 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Sentiment"}
            </Button>
          </div>

          {result && (
            <div className="mt-6 text-center text-lg font-medium text-gray-800 bg-gray-200 p-4 rounded-md">
              <div>
                <span className="font-bold">Sentiment: </span>
                <span
                  className={
                    result.sentiment === "positive"
                      ? "text-green-500 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {result.sentiment} ({result.sentimentScore}%)
                </span>
              </div>
              <div>
                <span className="font-bold">Emotion: </span>
                <span className="text-purple-600 font-bold">
                  {result.emotion}
                </span>
              </div>
            </div>
          )}

          {recommendation && (
            <div className="mt-6 text-center text-lg font-medium text-gray-800 bg-gray-200 p-4 rounded-md">
              <div>
                <span className="font-bold">Suggestions: </span>
                <br />
                <span className="font-medium">
                  {recommendation.recommendation}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SentimentAnalysis;
