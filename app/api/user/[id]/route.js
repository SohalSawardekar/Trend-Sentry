import connectToDB from "@/utils/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = (await params).id;
    await connectToDB();

    const userData = await User.findById(id).lean();

    if (!userData) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: userData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Error: ${error.message}` },
      { status: 500 }
    );
  }
}
