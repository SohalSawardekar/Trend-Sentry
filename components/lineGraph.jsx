"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import LoadingScreen from "./loadingScreen";

const EmotionGraph = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState("All");
  const [selectedRange, setSelectedRange] = useState("1M");

  const emotions = ["Sadness", "Joy", "Anger", "Fear", "Love", "Surprise"];

  // Time Range Options
  const timeRanges = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    "5Y": 5 * 365,
  };

  // Generate Dummy Data (Client-Side Only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const today = new Date();
      const past5years = Array.from({ length: 5 * 365 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - index);
        return {
          date: date.toISOString().split("T")[0],
          Sadness: Math.floor(Math.random() * 100),
          Joy: Math.floor(Math.random() * 100),
          Anger: Math.floor(Math.random() * 100),
          Fear: Math.floor(Math.random() * 100),
          Love: Math.floor(Math.random() * 100),
          Surprise: Math.floor(Math.random() * 100),
        };
      }).reverse();

      setData(past5years);
      setFilteredData(past5years.slice(-timeRanges["1M"])); // Default: 1 month
    }
  }, []);

  // Update Data Based on Selected Time Range
  useEffect(() => {
    if (!data) return;
    const rangeDays = timeRanges[selectedRange];
    setFilteredData(data.slice(-rangeDays));
  }, [selectedRange, data]);

  // Define a color map for emotions
  const emotionColors = {
    Sadness: "#FF5733",
    Joy: "#33FF57",
    Anger: "#337AFF",
    Fear: "#FF33A1",
    Love: "#FFD700",
    Surprise: "#8A2BE2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full p-6 space-y-6 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        📈 Emotion Trend Analysis
      </h2>

      {/* Time Range Filters */}
      <div className="flex justify-center space-x-2 mb-4">
        {Object.keys(timeRanges).map((range) => (
          <button
            key={range}
            className={`px-4 py-2 border rounded-lg shadow-sm transition-all ${
              selectedRange === range
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Emotion Filter */}
      <div className="flex flex-wrap gap-4 justify-center">
        <select
          className="px-4 py-2 border rounded-lg shadow-sm"
          value={selectedEmotion}
          onChange={(e) => setSelectedEmotion(e.target.value)}
        >
          <option value="All">All Emotions</option>
          {emotions.map((emotion) => (
            <option key={emotion} value={emotion}>
              {emotion}
            </option>
          ))}
        </select>
      </div>

      {/* Ensure data is loaded before rendering */}
      {filteredData ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white p-4 rounded-lg shadow-lg"
        >
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 12 }} />
              <YAxis stroke="#555" tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {selectedEmotion === "All"
                ? emotions.map((emotion) => (
                    <Line
                      key={emotion}
                      type="monotone"
                      dataKey={emotion}
                      stroke={emotionColors[emotion]}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  ))
                : selectedEmotion && (
                    <Line
                      type="monotone"
                      dataKey={selectedEmotion}
                      stroke={emotionColors[selectedEmotion]}
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  )}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      ) : (
        <LoadingScreen />
      )}
    </motion.div>
  );
};

export default EmotionGraph;
