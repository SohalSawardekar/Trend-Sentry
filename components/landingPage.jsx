"use client";

import Image from "next/image";
import {
  FaChartLine,
  FaRobot,
  FaUsers,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Navbar */}
      <nav className="bg-slate-300 text-white px-6 py-4 flex justify-around items-center w-full">
        <h1 className="text-xl font-bold" id="logo">
          Trend Sentry
        </h1>
        <Button className="bg-slate-800 hover:bg-slate-600 hover:text-slate-50">
          <Link href="/login">Login</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-wrap items-center justify-center p-6 w-full max-w-[90%] md:max-w-5xl">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 flex flex-col md:flex-row w-full h-auto md:h-[35rem] gap-6">
          {/* Left - Welcome Text */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome to Trend Sentry
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-4">
              Track and analyze social media sentiment in real time with
              AI-powered NLP. Stay ahead of viral trends and negative feedback
              before they impact your brand.
            </p>
            <Button className="mt-[3rem] px-8 py-7 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition duration-300">
              <Link href="/login" className="text-xl">Get Started</Link>
            </Button>
          </div>

          {/* Right - Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="https://t4.ftcdn.net/jpg/01/04/78/29/360_F_104782909_YVpAT9NiEWAr2OSRiUXtiyKUZrrsDzAb.jpg"
              alt="Welcome Image"
              width={500}
              height={500}
              priority
              className="rounded-[20px] h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-5xl text-center py-16 px-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose Trend Sentry?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaChartLine />}
            title="Real-time Tracking"
            description="Monitor social media discussions instantly."
          />
          <FeatureCard
            icon={<FaRobot />}
            title="AI-powered NLP"
            description="Detect trends, sarcasm, praise, and criticism accurately."
          />
          <FeatureCard
            icon={<FaUsers />}
            title="Multi-platform Analysis"
            description="Analyze sentiment across Twitter, Facebook, and more."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl py-16 text-center px-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard
            number="1"
            title="Connect Accounts"
            description="Link your social media accounts securely."
          />
          <StepCard
            number="2"
            title="AI Analyzes Trends"
            description="Our AI detects trends and sentiment instantly."
          />
          <StepCard
            number="3"
            title="Get Insights"
            description="Receive real-time reports to improve your brand image."
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-5xl py-16 px-4">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          <FAQ
            question="How does Trend Sentry analyze sentiment?"
            answer="Our AI scans and categorizes sentiments using ML algorithms."
          />
          <FAQ
            question="Which platforms are supported?"
            answer="Twitter, Facebook, Instagram, and LinkedIn."
          />
          <FAQ
            question="Is my data secure?"
            answer="We use end-to-end encryption for data protection."
          />
          <FAQ
            question="Can I customize alerts?"
            answer="Yes! Customize alerts and detailed reports based on your preferences."
          />
        </div>
      </section>

      {/* Footer with Social Media Links */}
      <footer className="bg-gray-800 text-white py-6 w-full text-center px-4">
        <h3 className="text-lg font-semibold">Follow Us</h3>
        <div className="flex justify-center gap-4 mt-2">
          <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
          <FaLinkedin className="text-xl cursor-pointer hover:text-blue-300" />
          <FaFacebook className="text-xl cursor-pointer hover:text-blue-500" />
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <div className="text-blue-600 text-4xl">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mt-4">{title}</h4>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}

// FAQ Component
function FAQ({ question, answer }) {
  return (
    <div className="border-b py-4">
      <h4 className="font-semibold text-gray-800">{question}</h4>
      <p className="text-gray-600 mt-2">{answer}</p>
    </div>
  );
}

// Step Card Component
function StepCard({ number, title, description }) {
  return (
    <div className="p-6 bg-blue-50 shadow-md rounded-lg text-center">
      <h4 className="text-2xl font-bold text-blue-600">{number}</h4>
      <h5 className="text-xl font-semibold text-gray-800 mt-2">{title}</h5>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}
