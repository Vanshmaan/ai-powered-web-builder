import env from "./env.js";
import { GoogleGenAI } from "@google/genai";

console.log("GEMINI:", env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

export async function generateContent(prompt) {
  let lastError;

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      console.log(`Success with model: ${model}`);

      return response.text;
    } catch (error) {
      console.error(`Model ${model} failed:`, error.message);
      lastError = error;
    }
  }

  throw new Error(
    `All Gemini models failed. Last error: ${
      lastError?.message || "Unknown error"
    }`
  );
}