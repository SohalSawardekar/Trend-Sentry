"use client";

import { useState } from "react";
import Navbar from "./navbar";

export default function HomePage() {

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <main className="w-full flex flex-col items-center justify-center py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to MyWebsite
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl">
          Explore the latest trends, news, and more with a sleek and modern
          experience.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-600 to-cyan-500 text-white py-6 w-full text-center px-4 mt-auto">
        <p className="text-sm">&copy; 2025 MyWebsite. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
