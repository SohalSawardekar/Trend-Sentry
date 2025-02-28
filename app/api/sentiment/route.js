import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const MODEL_URL = process.env.MODEL_URL;
    if (!MODEL_URL) {
      throw new Error("MODEL_URL is not defined in .env");
    }

    const requestData = await req.json();

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), // Send the data as JSON
    });

    if (!response.ok) {
      throw new Error(`Error from model API: ${response.statusText}`);
    }

    const responseData = await response.json();

    return NextResponse.json(
      { success: true, data: responseData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
