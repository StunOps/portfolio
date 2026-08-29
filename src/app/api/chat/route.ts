export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: "Google AI API Key is missing. Please set GOOGLE_GENERATIVE_AI_API_KEY in Vercel settings." }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await req.json();
        const incomingMessages = body.messages || [];

        const systemPrompt = `You are Stunley Opeña's AI Portfolio Assistant 🦊. You speak professionally, enthusiastically, and concisely.

CRITICAL LENGTH REQUIREMENT:
- Keep all responses SHORT, CONCISE, and DIRECT (maximum 2 to 3 short sentences or bullet points per response).
- Never output long paragraphs or lengthy lists.

ABOUT STUNLEY OPEÑA (STUN):
- Role: Computer Engineering Student at University of Mindanao, Multimedia Designer, UI/UX Designer, AI Automation Developer, 3D CAD Designer.
- Tagline: "Bridging Development, Design, and AI Engineering to build intelligent, high-impact solutions."

EXPERTISE & SKILLS:
1. Web Dev: Next.js, React, Java, Python, SQL, Tailwind CSS, Vercel, Supabase, Qt.
2. AI Workflows: n8n, Claude AI, Gemini AI, Serper, HubSpot CRM.
3. Design: Figma, Photoshop, Illustrator, Canva, Lightroom.
4. 3D & Engineering: Fusion 360, AutoCAD.

FEATURED PROJECTS:
- Madayaw Bus Tap Admin: Comprehensive bus ticketing admin system with Figma UI design.
- AI Automation Workflows: n8n automated lead management and CRM integration.
- Merch & Brand Identity: Graphic design, typography, and visual branding.
- 3D CAD Models: Product modeling in Fusion 360.

CONTACT DETAILS:
- Email: stundesign.graphics@gmail.com
- WhatsApp: 09924456533
- Company: Code&Craft
- Socials: Facebook (Stunley Opeña), LinkedIn, Behance (stunleyopea), Instagram (@yelnutss).

INSTRUCTIONS:
- Give short, friendly answers (under 3 sentences).
- Use an emoji (like 🦊, ⚡, 🎨) occasionally.
- For hiring, recommend emailing stundesign.graphics@gmail.com or messaging on WhatsApp.`;

        // Format conversation for Gemini REST API
        const contents = [
            {
                role: "user",
                parts: [{ text: `System Instruction: ${systemPrompt}` }]
            },
            ...incomingMessages.map((m: any) => ({
                role: m.role === "user" ? "user" : "model",
                parts: [{ text: typeof m.content === "string" ? m.content : String(m.content || "") }]
            }))
        ];

        // Active supported models for Google AI Studio API keys
        const models = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-2.5-flash"];
        let responseText = "";
        let lastError = "";

        for (const model of models) {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents })
                });

                const data = await res.json();
                if (res.ok && data.candidates?.[0]?.content?.parts) {
                    // Extract text parts (ignoring thoughts or metadata parts)
                    const textParts = data.candidates[0].content.parts
                        .filter((p: any) => p.text && !p.thought)
                        .map((p: any) => p.text);
                    
                    responseText = textParts.join("\n").trim() || data.candidates[0].content.parts[0]?.text || "";
                    if (responseText) break;
                } else if (data.error?.message) {
                    lastError = data.error.message;
                }
            } catch (err: any) {
                lastError = err.message;
            }
        }

        if (!responseText) {
            throw new Error(lastError || "Failed to generate response from Gemini API");
        }

        return new Response(JSON.stringify({ text: responseText }), {
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
