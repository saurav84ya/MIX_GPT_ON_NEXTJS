
import {getResponseDeepSeek , getResponseGemini, getResponseGemma ,getResponseLlama} from '@/lib/ai'


export async function POST(req) {
    try {
      const body = await req.json();
      const { prompt, modelSelected } = body;

      console.log(" prompt, model ", prompt, modelSelected )
  
      if (!prompt || !modelSelected) {
        return Response.json({ success: false, message: "Missing prompt or model" }, { status: 400 });
      }
  
      let responseText = "";
  
      if (modelSelected === "gemini") {
        responseText = await getResponseGemini(prompt);
      } else if (modelSelected === "llama") {
        responseText = await getResponseLlama(prompt);
      } else if (modelSelected === "deepseek") {
        responseText = await getResponseDeepSeek(prompt);
      } else if (modelSelected === "gemma2") {
        responseText = await getResponseGemma(prompt);
      } else {
        return Response.json({ success: false, message: "Invalid model" }, { status: 400 });
      }
  
      return Response.json({ success: true, response: {
        prompt : prompt ,
        answer : responseText ,
        model : modelSelected 
      }}, { status: 200 });
  
    } catch (error) {
      console.error("API Error:", error);
      return Response.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
  }
  

