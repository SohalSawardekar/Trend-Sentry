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
import { motion } from "framer-motion";

const SentimentDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [emotionData, setEmotionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const COLORS = [
    "#FF5733",
    "#3498DB",
    "#9B59B6",
    "#27AE60",
    "#F1C40F",
    "#E74C3C",
  ];

  useEffect(() => {
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
    setFilteredData(
      filterDate ? data.filter((entry) => entry.date === filterDate) : data
    );
  }, [filterDate, data]);

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
            <Input
              type="date"
              className="mb-4 w-[11%]"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <ResponsiveContainer width="95%" height="100%">
              <BarChart data={filteredData}>
                <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 12 }} />
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
