import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import Sentiment from "@/models/sentiments";

export async function GET() {
  try {
    await connectToDB();

    // Fetch all sentiment records from the database
    const sentiments = await Sentiment.find().sort({ time: 1 });

    // Transform data for recharts
    const formattedData = sentiments.map((entry) => ({
      date: entry.time.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      label: entry.label,
      count: entry.count,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching sentiment data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
