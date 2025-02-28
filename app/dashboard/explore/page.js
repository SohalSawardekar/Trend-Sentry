import SentimentAnalysis from "@/components/explore";
import Navbar from "@/components/navbar";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <SentimentAnalysis />
    </>
  );
};

export default page;
