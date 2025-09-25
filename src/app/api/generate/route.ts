import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key is not configured. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your .env.local file.');
      return NextResponse.json({ error: "AI service not configured" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    const text = response.text;

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return NextResponse.json({ 
      error: err.message || "Internal error" 
    }, { status: 500 });
  }
}
