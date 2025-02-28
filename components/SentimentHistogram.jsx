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
} from "recharts";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const SentimentHistogram = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    // Generate 100 dummy data samples with dates
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

  return (
    <Card className="w-full p-6 shadow-md border border-gray-300">
      <CardHeader className="text-2xl font-semibold text-center">
        📊 Real-Time Sentiment Analysis
      </CardHeader>
      <CardContent className="flex flex-col items-center w-full h-[500px]">
        <Input
          type="date"
          className="mb-4 w-[10%]"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <ResponsiveContainer width="95%" height="100%">
          <BarChart data={filteredData} className="cursor-pointer">
            <XAxis dataKey="date" stroke="#555" tick={{ fontSize: 12 }} />
            <YAxis stroke="#555" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ddd",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingBottom: 10 }} />
            <Bar
              dataKey="positive"
              fill="#4CAF50"
              name="Positive"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="neutral"
              fill="#FFC107"
              name="Neutral"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="negative"
              fill="#F44336"
              name="Negative"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SentimentHistogram;
