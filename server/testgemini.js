import dotenv from "dotenv";
dotenv.config();

console.log("1. Script started");

console.log("2. API Key:", process.env.GEMINI_API_KEY?.slice(0, 10));

import { GoogleGenAI } from "@google/genai";

console.log("3. Package imported");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("4. Client created");

try {
  console.log("5. Sending request...");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Say hello",
  });

  console.log("6. Response received");
  console.log(response.text);
} catch (err) {
  console.error("ERROR:");
  console.error(err);
}