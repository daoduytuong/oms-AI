import { GoogleGenAI } from "@google/genai";
import { Order } from '../types';

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const generateEmailDraft = async (order: Order, tone: 'professional' | 'apologetic' | 'friendly'): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      You are a customer support agent for an Order Management System.
      Draft a short email to the customer regarding their order.
      
      Order Details:
      - Order ID: ${order.id}
      - Customer Name: ${order.customer.name}
      - Status: ${order.status}
      - Items: ${order.items.map(i => i.productName).join(', ')}
      
      Tone: ${tone}
      Goal: Update them on the status.
      
      Keep it concise (under 100 words).
      Return only the email body text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate draft.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API key.";
  }
};

export const analyzeOrderRisk = async (order: Order): Promise<{ riskLevel: string; reasoning: string }> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Analyze this order for potential fraud risk or anomalies.
      
      Order Data:
      - Total: $${order.total}
      - Customer: ${order.customer.name}
      - Address: ${order.customer.address}
      - Notes: ${order.notes || 'None'}
      
      Output JSON format:
      {
        "riskLevel": "Low" | "Medium" | "High",
        "reasoning": "Short explanation"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return { riskLevel: "Unknown", reasoning: "Service unavailable." };
  }
};
