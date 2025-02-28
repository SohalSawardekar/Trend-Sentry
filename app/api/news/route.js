import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag") || "all"; // Default query
    const date =
      searchParams.get("date") || new Date().toISOString().split("T")[0]; // Default today

    if (!process.env.NEWS_API_KEY) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    // Construct API URL
    const apiUrl = `https://newsapi.org/v2/everything?q=${tag}&from=${date}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;
    console.log("Fetching:", apiUrl);

    // Axios request with headers to prevent 426 error
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NewsFetcher/1.0)",
        Accept: "application/json",
        Connection: "keep-alive",
      },
      httpAgent: false, // Ensures HTTP/1.1 is used
    });

    if (!response.data.articles || response.data.articles.length === 0) {
      return NextResponse.json({ error: "No articles found" }, { status: 404 });
    }

    return NextResponse.json(response.data.articles, { status: 200 });
  } catch (error) {
    console.error("Error fetching news data:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch news data", details: error.message },
      { status: 500 }
    );
  }
}
