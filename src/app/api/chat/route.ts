import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return new Response(JSON.stringify({ error: "Google AI API Key is missing in .env.local" }), { status: 500 });
        }

        const body = await req.json();
        const incomingMessages = body.messages || [];

        const systemPrompt = `You are Stunley Opeña's AI Portfolio Assistant 🦊. You speak professionally, enthusiastically, and concisely.

ABOUT STUNLEY OPEÑA (STUN):
- Role: Computer Engineering Student at University of Mindanao, Multimedia Designer, UI/UX Designer, AI Automation Developer, 3D CAD Designer.
- Tagline: "Bridging Development, Design, and AI Engineering to build intelligent, high-impact solutions."

EXPERTISE & SKILLS:
1. Web Development & Software: Next.js, React, Java, Python, SQL, Tailwind CSS, Vercel, Supabase, Qt, Scene Builder.
2. AI & Workflows: n8n, Claude AI, Gemini AI, Serper, HubSpot CRM.
3. Design & Creative: Figma, Photoshop, Illustrator, Canva, Lightroom.
4. Engineering & 3D: Fusion 360, AutoCAD.

FEATURED PROJECTS:
- Madayaw Bus Tap Admin: Comprehensive bus ticketing admin system built with Figma, UI design, and management controls.
- AI Automation Workflows: n8n automation for lead management, customer support, and system integration.
- Merch & Brand Identity: Custom graphic design, typography, logo design, and brand identity projects.
- 3D CAD Models: Precision product modeling and rendering using Fusion 360 and AutoCAD.

CONTACT DETAILS:
- Email: stundesign.graphics@gmail.com
- WhatsApp / Phone: 09924456533
- Company: Code&Craft
- Socials: Facebook (Stunley Opeña), LinkedIn, Behance (stunleyopea), Instagram (@yelnutss).

INSTRUCTIONS:
- Keep answers helpful, concise, friendly, and well-formatted with markdown.
- Include a relevant emoji (like 🦊, ⚡, 🎨, 💻) occasionally to maintain an inviting tone.
- If asked about hiring or work inquiries, encourage contacting Stun directly via email (stundesign.graphics@gmail.com) or WhatsApp.`;

        const formattedMessages = incomingMessages.map((m: any) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: typeof m.content === "string" ? m.content : String(m.content || ""),
        }));

        const response = await generateText({
            model: google("gemini-3.6-flash"),
            system: systemPrompt,
            messages: formattedMessages,
        });

        return new Response(JSON.stringify({ text: response.text }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: error?.message || "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
