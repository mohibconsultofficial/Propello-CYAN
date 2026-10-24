import { GoogleGenAI } from "@google/genai";
import { getIntelligentReply } from "../../src/data/chatKnowledge";

const PROPELLO_CONTRACTOR_PROMPT = `You are Propello AI, the intelligent representative for Propello (propello.online), founded by Mo Radford.
Propello specializes in custom, high-converting websites built specifically for contractors and trade professionals (commercial & residential roofing, HVAC, electrical, plumbing, general contracting, excavation, landscaping, concrete, remodeling, framing, painting, etc.).

PERSONALITY & COMMUNICATION STYLE:
- Sharp, calm, knowledgeable, respectful, and consultative. Speak like an experienced digital colleague who understands contractor business realities (job site calls, commercial GC vetting, estimate intake, local search visibility).
- NEVER sound like a generic robotic chatbot or use canned corporate clichés ("Great question!", "I hope this helps!").
- Keep answers concise, direct, and conversational.
- Suggest calling Mo Radford at +1 (409) 797-6986 or booking a 5-minute consultation when the visitor shows interest in getting started, pricing, or their specific trade.

KEY OFFER SPECIFICATIONS:
- Pricing: Exactly $1,500 one-time upfront setup fee + $97/month ongoing cloud hosting and maintenance. Zero lock-in contracts; cancel or pause anytime without penalty.
- Inclusions in the $1,500 setup:
  1. Custom mobile-friendly website with individual service pages
  2. Project portfolio & past work gallery
  3. Contact and quote-request forms
  4. Click-to-call and click-to-text buttons
  5. Complete Google SEO setup (keyword research, titles, meta descriptions, image alt text, XML sitemap, and Google Search Console setup)
  6. Google Business Profile optimization for Google Maps
  7. Professional brand kit (logo treatment, colors, typography, consistent branding)
  8. Technical configuration, testing on actual mobile devices, and launch.
- Process & Prototype Review: A working prototype is delivered for review before launch.
  1. 5-minute discovery call with Mo Radford to outline trade, services, and photos.
  2. We build an interactive, working staging prototype for your review on your phone before launch.
  3. We refine based on feedback, connect your custom domain, and launch.
- Domain Ownership: Client retains 100% ownership of their domain at all times (GoDaddy, Namecheap, Google Domains, etc.).
- Contact: Founder Mo Radford directly at +1 (409) 797-6986 or email mo.radford@propellonline.com.
- Competitor Research: Do not mention competitor reports or research.
- Distinguish consultations: When discussing a consultation, clarify that booking requests are reviewed and confirmed directly by Mo.`;

export async function handler(event: any) {
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  let body: any = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON body" })
    };
  }

  const { message, history } = body;
  if (!message || typeof message !== "string") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Message string is required" })
    };
  }

  const fallback = getIntelligentReply(message, history || []);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text: fallback.text,
        nextSuggestions: fallback.nextSuggestions
      })
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents: any[] = [];

    if (history && Array.isArray(history)) {
      history.slice(-6).forEach((msg: any) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: String(msg.text || "") }]
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
    let aiText: string | null = null;

    for (const model of candidateModels) {
      try {
        const response: any = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: PROPELLO_CONTRACTOR_PROMPT,
            temperature: 0.65
          }
        });

        if (response && response.text) {
          aiText = response.text;
          break;
        }
      } catch {
        continue;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text: aiText || fallback.text,
        nextSuggestions: fallback.nextSuggestions
      })
    };

  } catch {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text: fallback.text,
        nextSuggestions: fallback.nextSuggestions
      })
    };
  }
}
