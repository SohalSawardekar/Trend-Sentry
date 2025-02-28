"use client";

import { useState } from "react";
import Navbar from "./navbar";
import SentimentHistogram from "../components/SentimentHistogram";
import EmotionGraph from "./lineGraph";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="w-full flex flex-col items-center justify-center py-16 px-6 text-center">
        <SentimentHistogram />
        <EmotionGraph />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-600 to-cyan-500 text-white py-6 w-full text-center px-4 mt-auto">
        <p className="text-sm">&copy; 2025 Trend Sentry. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
