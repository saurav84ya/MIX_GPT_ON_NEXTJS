import User from '@/database/model/User';
import UserPrompt from '@/database/model/UserPrompt';
import {
  getResponseDeepSeek,
  getResponseGemini,
  getResponseGemma,
  getResponseLlama
} from '@/lib/ai';

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, modelSelected, userId } = body;

    if (!prompt || !modelSelected || !userId) {
      return Response.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const isUserExist = await User.findById(userId);
    if (!isUserExist) {
      return Response.json({ success: false, message: "User may not exist" }, { status: 400 });
    }

    let responseText = "";
    switch (modelSelected) {
      case "gemini":
        responseText = await getResponseGemini(prompt);
        break;
      case "llama":
        responseText = await getResponseLlama(prompt);
        break;
      case "deepseek":
        responseText = await getResponseDeepSeek(prompt);
        break;
      case "gemma2":
        responseText = await getResponseGemma(prompt);
        break;
      default:
        return Response.json({ success: false, message: "Invalid model" }, { status: 400 });
    }

    if (!responseText) {
      return Response.json({ success: false, message: "Failed to generate response" }, { status: 500 });
    }

    const saved = await UserPrompt.create({
      userId,
      prompt,
      response: responseText,
      modelUsed: modelSelected
    });

    return Response.json({
      success: true,
      response: {
        id: saved._id,
        prompt: saved.prompt,
        answer: saved.response,
        model: saved.modelUsed,
        createdAt: saved.createdAt
      }
    }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
