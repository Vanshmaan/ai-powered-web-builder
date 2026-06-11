import { generateContent } from "../configs/gemini.config.js";

export const askGemini = async (prompt) => {
  try {
    console.log("Calling Gemini...");
    const response = await generateContent(prompt);

    console.log("Gemini response received");

    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};