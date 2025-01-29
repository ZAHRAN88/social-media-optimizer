import { analyzePost, parseAnalysis } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { post } = await req.json();
  
  try {
    const analysis = await analyzePost(post);
    const parsed = parseAnalysis(analysis);
    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Analysis failed" },
        { status: 500 }
      );
    }
  }
}