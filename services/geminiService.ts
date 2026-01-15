import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are "Busan Unnie" (Busan Sister), a friendly, trendy, and knowledgeable local tour guide for Busan, South Korea. 
        Your main audience is 20-30 year old Southeast Asian women who love K-Pop (especially BTS) and K-Dramas.
        
        Guidelines:
        1. Tone: Enthusiastic, warm, using emojis (💜, ✨, 🌊, 🇰🇷). Like a helpful big sister.
        2. Content: Focus on K-Pop spots, photo-worthy cafes, beauty (olive young), and spicy/delicious food.
        3. Keep answers concise and easy to read on a mobile phone (bullet points are good).
        4. If asked about BTS, mention specific members connected to Busan (Jimin, Jungkook).
        5. If asked about places, mention if they are "Instagrammable".
        
        Answer strictly in the context of Busan tourism.`,
        thinkingConfig: { thinkingBudget: 0 } 
      },
    });

    return response.text || "Sorry, I lost my connection to Busan! 😿 Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! Something went wrong. Please check your connection or try again later. 💜";
  }
};