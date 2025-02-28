"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { formatDistanceToNow, parseISO, subDays } from "date-fns";

const SentimentDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [emotionData, setEmotionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [timeframe, setTimeframe] = useState("1M"); // Default: 1 Month

  const COLORS = [
    "#FF5733",
    "#3498DB",
    "#9B59B6",
    "#27AE60",
    "#F1C40F",
    "#E74C3C",
  ];

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await fetch("/api/sentiment");
        const json = await response.json();

        console.log("Fetched Data:", json); // Debugging: Check all fetched data

        if (response.ok) {
          const groupedData = json.reduce((acc, entry) => {
            const { date, label, count } = entry;
            if (!acc[date])
              acc[date] = { date, positive: 0, neutral: 0, negative: 0 };
            acc[date][label] += count;
            return acc;
          }, {});

          const formattedData = Object.values(groupedData);

          console.log("Formatted Data:", formattedData); // Debugging: Check after formatting

          setData(formattedData);
          setFilteredData(formattedData);
        } else {
          console.error("Error fetching sentiment data:", json.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSentimentData();
  }, []);

  useEffect(() => {
    const now = new Date();
    let cutoffDate;

    switch (timeframe) {
      case "1D":
        cutoffDate = subDays(now, 1);
        break;
      case "1W":
        cutoffDate = subDays(now, 7);
        break;
      case "1M":
        cutoffDate = subDays(now, 30);
        break;
      case "3M":
        cutoffDate = subDays(now, 90);
        break;
      case "1Y":
        cutoffDate = subDays(now, 365);
        break;
      case "5Y":
        cutoffDate = subDays(now, 5*365);
        break;
      default:
        cutoffDate = subDays(now, 30);
    }

    setFilteredData(data.filter((entry) => parseISO(entry.date) >= cutoffDate));
  }, [timeframe, data]);

  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await fetch("/api/emotion");
        const json = await response.json();

        if (response.ok) {
          const aggregatedData = json.reduce((acc, entry) => {
            acc[entry.emotion] = (acc[entry.emotion] || 0) + entry.value;
            return acc;
          }, {});

          const processedData = Object.keys(aggregatedData).map((key) => ({
            name: key,
            value: aggregatedData[key] * 100,
          }));

          setEmotionData(processedData);
        } else {
          console.error("Error fetching emotions:", json.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEmotionData();
  }, []);

  return (
    <div className="w-full p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card className="shadow-md border border-gray-300">
          <CardHeader className="text-2xl font-semibold text-center">
            📊 Real-Time Sentiment Analysis
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full h-[500px]">
            {/* Timeframe Selection Buttons */}
            <div className="flex space-x-4 mb-4">
              {["1D", "1W", "1M", "3M", "1Y", "5Y"].map((option) => (
                <Button
                  key={option}
                  variant={timeframe === option ? "default" : "outline"}
                  onClick={() => setTimeframe(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <ResponsiveContainer width="95%" height="100%">
              <BarChart data={filteredData}>
                <XAxis
                  dataKey="date"
                  stroke="#555"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) =>
                    formatDistanceToNow(parseISO(date), { addSuffix: true })
                  }
                />
                <YAxis stroke="#555" tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="positive"
                  fill="#4CAF50"
                  name="Positive"
                  barSize={20}
                />
                <Bar
                  dataKey="neutral"
                  fill="#FFC107"
                  name="Neutral"
                  barSize={20}
                />
                <Bar
                  dataKey="negative"
                  fill="#F44336"
                  name="Negative"
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Card className="shadow-md border border-gray-300">
          <CardHeader className="text-2xl font-semibold text-center">
            🎭 Emotion Analysis
          </CardHeader>
          <CardContent className="flex flex-col items-center w-full h-[400px]">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  dataKey="value"
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {emotionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => `${value.toFixed(2)} mentions`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SentimentDashboard;
