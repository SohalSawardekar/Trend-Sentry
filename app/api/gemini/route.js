import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  try {
    const { input, sentiment, emotion } = await request.json();

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.5,
      },
    });

    const prompt = `
Task: As an AI Recommendation Specialist for brand reputation management, analyze the following customer feedback and generate ONE precise, actionable recommendation that directly addresses the sentiment and emotion detected.

INPUT:
- Sentiment: ${sentiment}
- Emotion: ${emotion}
- Tweet: ${input}

REQUIREMENTS:
1. Generate EXACTLY ONE specific, practical recommendation that the brand can implement
2. Ensure your recommendation directly responds to both the detected sentiment and emotion
3. Frame your recommendation in business-oriented language suitable for marketing/PR teams
4. Keep your response concise (50-75 words maximum)
5. Focus on improving customer satisfaction and brand perception
6. Include a brief rationale explaining why this recommendation would be effective

FORMAT YOUR RESPONSE AS:
RECOMMENDATION: [Your single, concise recommendation]
RATIONALE: [Brief explanation of expected impact]
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    // Split the response into recommendation and rationale
    const [recommendation, rationale] = response
      .text()
      .split("\n\nRATIONALE: ");

    // Store them into variables
    const recommendationText = recommendation
      .replace("RECOMMENDATION: ", "")
      .trim();
    const rationaleText = rationale.trim();

    return NextResponse.json({
      recommendation: recommendationText,
      rationale: rationaleText,
    });
  } catch (error) {
    console.error("Error in recommendation system:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendation" },
      { status: 500 }
    );
  }
}
