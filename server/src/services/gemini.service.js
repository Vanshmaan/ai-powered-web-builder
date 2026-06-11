import { generateContent } from "../configs/gemini.config.js";

export const askGemini = async(prompt) => {
    try {
        const response = await generateContent(prompt);
        if(!response){
            throw new Error('Gemini returned an empty response');
        }

        return response;
    } catch (error) {
        throw new Error('The Ai service is currently unavailable. Please try again later.')
    }
}