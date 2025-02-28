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
} from "recharts";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const SentimentDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [emotionData, setEmotionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = [
    "#FF5733",
    "#3498DB",
    "#9B59B6",
    "#27AE60",
    "#F1C40F",
    "#E74C3C",
  ];
  const emotions = ["sadness", "joy", "love", "anger", "fear", "surprise"];

  useEffect(() => {
    // Generate dummy data for sentiment
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 100);

    const dummyData = Array.from({ length: 100 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);
      return {
        date: date.toISOString().split("T")[0],
        positive: Math.floor(Math.random() * 100),
        neutral: Math.floor(Math.random() * 100),
        negative: Math.floor(Math.random() * 100),
      };
    });

    setData(dummyData);
    setFilteredData(dummyData);
  }, []);

  useEffect(() => {
    if (filterDate) {
      setFilteredData(data.filter((entry) => entry.date === filterDate));
    } else {
      setFilteredData(data);
    }
  }, [filterDate, data]);

  // Fetch emotion data from API and scale values
  useEffect(() => {
    const fetchEmotionData = async () => {
      try {
        const response = await fetch("/api/emotion");
        const json = await response.json();

        if (response.ok) {
          // Aggregate emotion values
          const aggregatedData = json.reduce((acc, entry) => {
            if (acc[entry.emotion]) {
              acc[entry.emotion] += entry.value;
            } else {
              acc[entry.emotion] = entry.value;
            }
            return acc;
          }, {});

          // Convert aggregated object into array & scale values
          const processedData = Object.keys(aggregatedData).map((key) => ({
            name: key,
            value: aggregatedData[key] * 100, // Scale to 0-100
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
      {/* Sentiment Bar Graph */}
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
            <Input
              type="date"
              className="mb-4 w-1/4"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <ResponsiveContainer width="95%" height="100%">
              <BarChart data={filteredData}>
                <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 12 }} />
                <YAxis stroke="#555" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingBottom: 10 }} />
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

      {/* Emotion Pie Chart */}
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
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={5}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(1)}%`
                  }
                >
                  {emotionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value.toFixed(2)} mentions`}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sentiment & Emotion Summary */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="shadow-md border border-gray-300 p-4">
            <CardHeader className="text-xl font-semibold">
              📢 Sentiment Summary
            </CardHeader>
            <CardContent>
              <p>
                Sentiments are categorized into Positive, Neutral, and Negative.
                This helps brands understand public perception in real time.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Card className="shadow-md border border-gray-300 p-4">
            <CardHeader className="text-xl font-semibold">
              😊 Emotion Summary
            </CardHeader>
            <CardContent>
              <p>
                Emotions like Happiness, Sadness, Anger, and Surprise provide
                deeper insights into customer feelings and reactions.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SentimentDashboard;
