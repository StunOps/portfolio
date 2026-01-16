import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";

/**
 * AI SDK 6.0 - THE DEFINITIVE FIX
 * Uses toUIMessageStreamResponse() which replaced toDataStreamResponse()
 */

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return new Response("Google AI API Key is missing. Please add it to .env.local", { status: 500 });
        }

        const { messages } = await req.json();

        // System prompt forced to the message requested by Stun
        const systemPrompt = "Stun is currently working on this, so that it can help you further and efficiently. 🦊";

        const result = streamText({
            model: google("gemini-1.5-flash"),
            system: `Respond only with the following message: ${systemPrompt}`,
            messages: await convertToModelMessages(messages),
        });

        // IN AI SDK 6.0, use toUIMessageStreamResponse() for useChat
        return result.toUIMessageStreamResponse();
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
