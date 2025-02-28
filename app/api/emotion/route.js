import connectToDB from "@/utils/db";
import Emotion from "@/models/emotions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const emotions = await Emotion.find({}).lean();

    if (!emotions.length) {
      return NextResponse.json(
        { message: "No emotions found" },
        { status: 404 }
      );
    }

    return NextResponse.json(emotions, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
