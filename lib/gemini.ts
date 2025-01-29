// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResult {
  captions: string[];
  hashtags: string[];
  bestTime: string;
  sentiment: "positive" | "neutral" | "negative";
  suggestions: string;
  improvedPost: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzePost = async (post: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Analyze this social media post draft: "${post}". Provide:
  1. 3 optimized captions based on current trends
  2. 15 relevant hashtags (comma-separated)
  3. Best posting time (format: HH:MM)
  4. Sentiment analysis (positive/neutral/negative)
  5. Improvement suggestions
  6. An improved version of the post incorporating the suggestions

  Format the improved post under a section titled "## Improved Post"
  don't add format for the post itself like **title**
  DON'T ever ADD "*" to the post
  iff post is in arabic provide me the same format of response bu the results in arabic
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

const isValidTimeFormat = (time: string): boolean => 
  /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

const isValidSentiment = (sentiment: string | undefined): sentiment is AnalysisResult["sentiment"] => 
  typeof sentiment === 'string' && ["positive", "neutral", "negative"].includes(sentiment.toLowerCase());

export const parseAnalysis = (text: string): AnalysisResult => {
  const sections = text.split("##").filter(Boolean);
  const result: AnalysisResult = {
    captions: [],
    hashtags: [],
    bestTime: "",
    sentiment: "neutral",
    suggestions: "",
    improvedPost: ""
  };

  sections.forEach(section => {
    const [header, ...content] = section.trim().split("\n");
    const lowerHeader = header.toLowerCase().trim();
    const sectionContent = content.join("\n").trim();
    
    if (lowerHeader.includes("optimized captions")) {
      result.captions = sectionContent
        .split("\n")
        .map(c => c.replace(/^\d+\.\s*\*\*(.*)\*\*/, "$1").trim())
        .filter(Boolean);
    }

    if (lowerHeader.includes("relevant hashtags")) {
      result.hashtags = [...new Set(
        sectionContent.match(/#\w+/g) || []
      )].slice(0, 15);
    }

    if (lowerHeader.includes("best posting time")) {
      const timeMatch = sectionContent.match(/(\d{2}:\d{2})/);
      result.bestTime = timeMatch && isValidTimeFormat(timeMatch[1]) 
        ? timeMatch[1] 
        : "";
    }

    if (lowerHeader.includes("sentiment analysis")) {
      const sentiment = sectionContent.trim().toLowerCase();
      result.sentiment = isValidSentiment(sentiment) 
        ? sentiment 
        : "neutral";
    }

    if (lowerHeader.includes("improvement suggestions")) {
      result.suggestions = sectionContent
        .split("\n")
        .map(line => line.replace(/^\*\s*/, "").trim())
        .join(" ")
        .trim();
    }

    if (lowerHeader.includes("improved post")) {
      result.improvedPost = sectionContent.trim();
    }
  });

  return result;
};