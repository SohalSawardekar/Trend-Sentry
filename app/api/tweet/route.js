import Tweets from "@/models/tweet";
import { NextResponse } from "next/server";
import connectToDB from "@/utils/db";

export async function GET(req) {
  try {
    await connectToDB();
    const tweets = await Tweets.find({}).lean();

    if (tweets.length === 0) {
      return NextResponse.json(
        { success: false, message: "No tweets found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tweets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
