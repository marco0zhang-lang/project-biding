
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const expandContentTerms = async (keywords: string, projectName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Given the project name "${projectName}" and keywords "${keywords}", generate a list of 5-8 professional extended related terms for content expansion in a bidding database. Return only a comma-separated list of terms.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating terms. Please try again.";
  }
};

export const analyzeProjectContent = async (content: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze and summarize the following project content for a bidding evaluation. Focus on technical requirements and key deliverables: \n\n${content}`,
      config: {
        temperature: 0.4,
        maxOutputTokens: 500,
      }
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analysis failed.";
  }
};
