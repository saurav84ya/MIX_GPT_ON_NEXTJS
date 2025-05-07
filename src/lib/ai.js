
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const groq = new Groq({ apiKey: process.env.API_KEY_LAMA });




// Gemini
const getResponseGemini = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.candidates[0].content.parts[0].text;
  };
  
  // LLaMA
  const getResponseLlama = async (prompt) => {
    const messages = [{ role: "user", content: prompt }];
    const result = await groq.chat.completions.create({
      messages,
      model: "llama3-70b-8192",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });
    return result.choices[0].message.content;
  };
  
  // DeepSeek
  const getResponseDeepSeek = async (prompt) => {
    const messages = [{ role: "user", content: prompt }];
    const result = await groq.chat.completions.create({
      messages,
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: false,
    });
    return result.choices[0].message.content;
  };
  
  // Gemma2
  const getResponseGemma = async (prompt) => {
    const messages = [
      { role: "user", content: prompt },
      { role: "assistant", content: "Hello! 👋 How can I help you today?" },
    ];
    const result = await groq.chat.completions.create({
      messages,
      model: "gemma2-9b-it",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });
    return result.choices[0].message.content;
  };

  module.exports = { getResponseDeepSeek , getResponseGemini, getResponseGemma ,getResponseLlama}