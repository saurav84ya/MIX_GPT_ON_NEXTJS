import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.API_KEY_LAMA,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const {prompt ,modelSelected } = body;

    console.log("modelSelected",modelSelected)

    if (!prompt) {
      return Response.json({ success: false, message: "Prompt is required" });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.6,
      max_completion_tokens: 1024,
      top_p: 0.95,
      stream: false,
      stop: null,
    });

    const content = chatCompletion.choices[0].message.content;

    return Response.json({
      success: true,
      response: content,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, message: "Something went wrong" });
  }
}


