import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

export async function GET(request) {
  try {
    if (!process.env.TWITTER_BEARER_TOKEN) {
      throw new Error("TWITTER_BEARER_TOKEN is missing.");
    }

    const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
    const roClient = twitterClient.readOnly; // Use read-only client

    const { searchParams } = new URL(request.url);
    let query = searchParams.get("q");
    const count = parseInt(searchParams.get("count") || "5", 10);

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    query = decodeURIComponent(query);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay

    async function fetchWithRetry(query, count, retries = 3) {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await roClient.v2.search(query, {
            "tweet.fields": ["created_at", "public_metrics", "author_id"],
            max_results: count,
          });

          console.log("Rate Limit Remaining:", response.rateLimit?.remaining);
          return response;
        } catch (error) {
          if (error.data?.status === 429 && i < retries - 1) {
            const waitTime = (error.rateLimit?.reset || 60) * 1000;
            console.warn(`Rate limit hit. Retrying in ${waitTime / 1000}s...`);
            await new Promise((res) => setTimeout(res, waitTime));
          } else {
            throw error;
          }
        }
      }
    }

    const response = await fetchWithRetry(query, count);

    return NextResponse.json(
      {
        data: response.data,
        _metadata: { cached: false, timestamp: new Date().toISOString() },
      },
      { headers: { "Cache-Control": "s-maxage=30" } }
    );
  } catch (error) {
    console.error("Twitter API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets", details: error.message },
      { status: 500 }
    );
  }
}
