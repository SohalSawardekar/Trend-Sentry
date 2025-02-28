import connectToDB from "@/utils/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDB();

    const userData = await request.json();
    console.log("📩 Incoming User Data:", userData); // Debug log

    if (!userData.name || !userData.email || !userData.password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("⚠️ User already exists:", existingUser.email); // Debug log
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password, // Password will be hashed by the pre-save hook
    });

    console.log("✅ User Created Successfully:", user); // Debug log

    // Return success response without password
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
