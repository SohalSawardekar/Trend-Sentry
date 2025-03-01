import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";
import Sentiment from "@/models/sentiments";

export async function GET() {
  try {
    await connectToDB();

    // Fetch latest 100 sentiment records, sorted by time (newest first)
    const sentiments = await Sentiment.find().sort({ time: -1 });

    // Transform data for recharts
    const formattedData = sentiments.map((entry) => ({
      date: entry.time.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      label: entry.label,
      count: entry.count,
    }));

    // Add caching headers to optimize performance
    return NextResponse.json(formattedData, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate" },
    });
  } catch (error) {
    console.error("Error fetching sentiment data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
