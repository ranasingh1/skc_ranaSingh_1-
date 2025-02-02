import { OpenAI } from "openai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const apiKey = req.headers.get("X-OpenAI-Key");

  if (!apiKey) {
    console.log("❌ No API Key provided");
    return new Response("OpenAI API key is required", { status: 400 });
  }

  const openai = new OpenAI({ apiKey });

  try {
    console.log("📨 Received messages:", messages); // Log received messages

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly and patient Python tutor for children. Explain concepts in simple terms and use fun analogies when possible. Encourage the child and provide positive reinforcement.",
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false, // Disabling streaming to simplify debugging
    });

    const aiMessage = response.choices[0].message.content;
    console.log("🤖 AI Response:", aiMessage); // Log AI response

    return new Response(JSON.stringify({ message: aiMessage }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    return new Response("Failed to fetch OpenAI response", { status: 500 });
  }
}
