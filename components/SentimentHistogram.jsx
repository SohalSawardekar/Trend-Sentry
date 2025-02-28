"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const SentimentHistogram = () => {
  // Dummy data representing sentiment trends over time
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating dynamic data fetch (timestamps and sentiment counts)
    const dummyData = [
      { time: "10:00 AM", positive: 30, neutral: 15, negative: 10 },
      { time: "11:00 AM", positive: 45, neutral: 20, negative: 25 },
      { time: "12:00 PM", positive: 60, neutral: 30, negative: 40 },
      { time: "1:00 PM", positive: 55, neutral: 25, negative: 35 },
      { time: "2:00 PM", positive: 70, neutral: 40, negative: 50 },
    ];
    setData(dummyData);
  }, []);

  return (
    <div className="w-full h-[450px] bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        📊 Real-Time Sentiment Analysis
      </h2>
      <div className="flex justify-center items-center w-full h-full">
        <ResponsiveContainer width="95%" height="80%">
          <BarChart data={data} className="cursor-pointer">
            <XAxis dataKey="time" stroke="#555" tick={{ fontSize: 14 }} />
            <YAxis stroke="#555" tick={{ fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ddd",
              }}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: 14, paddingBottom: 10 }} />
            <Bar
              dataKey="positive"
              fill="#4CAF50"
              name="Positive"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="neutral"
              fill="#FFC107"
              name="Neutral"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
            <Bar
              dataKey="negative"
              fill="#F44336"
              name="Negative"
              radius={[6, 6, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentHistogram;
