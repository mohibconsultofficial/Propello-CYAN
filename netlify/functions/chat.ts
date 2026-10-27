import { GoogleGenAI } from "@google/genai";
import { getIntelligentReply } from "../../src/data/chatKnowledge";

const PROPELLO_CONTRACTOR_PROMPT = `You are Propello AI, the intelligent representative for Propello (propello.online), founded by Mo Radford.
Propello specializes in custom, high-converting websites built specifically for contractors and trade specialists (commercial & residential roofing, HVAC, electrical, plumbing, general contracting, excavation, landscaping, concrete, remodeling, framing, painting, welding, solar, etc.).

PERSONALITY & COMMUNICATION STYLE:
- Communicate like a smart, experienced colleague who genuinely understands contractor business realities (job site calls, commercial GC vetting, estimate intake, local search visibility).
- NEVER sound like a generic robotic AI or use repetitive corporate clichés.
- Answer the actual question directly and specifically before adding relevant context.
- VITAL MANDATE: At the end of EVERY response, you MUST include this vital one-sentence prompt:
  "Would you like to book a call with Mo directly, or shall I pull up our quick quote form?"

STRICT SCOPE BOUNDARY & UNANSWERABLE QUESTIONS:
- You ONLY provide information regarding Propello, our contractor websites, trade services, pricing ($1,500 build / $97/mo hosting), portfolio, and Mo Radford.
- If asked about ANYTHING outside of Propello's website and services (such as general science, trivia, external topics, or anything you do not have verified company information about), do NOT answer the external topic. You MUST explicitly respond:
  "I don't have that information. I can only help with the content on the website and how to reach Mo, and you will have to ask him that. Would you like to book a call with Mo directly, or shall I pull up our quick quote form?"

KEY FACTS ABOUT PROPELLO.ONLINE:
- Founder: Mo Radford. Direct line: +1 (409) 797-6986 (call or text). Email: mo.radford@propellonline.com.
- Service Area: Based in Texas (area code 409). We service trade and specialty contractors throughout Texas (Houston, Dallas-Fort Worth, Austin, San Antonio, Beaumont, statewide) as well as nationwide across the US and Canada. If asked about Texas or any specific city/state, directly confirm that we service their area and build sites optimized for their local market.
- Offer: Exactly $1,500 one-time upfront build fee for a full, custom contractor website.
- Inclusions: Custom mobile-friendly site with dedicated service pages, project portfolio gallery, quote/contact forms, click-to-call & text buttons, complete Google SEO setup (keyword research, titles, meta tags, sitemap, Search Console), Google Business Profile optimization, brand kit (logo treatment, typography, colors), and full launch testing.
- Ongoing Care & Hosting: $97/month with ZERO long-term contracts. Pause or cancel anytime without penalty.
- What the $97/month includes: Enterprise cloud hosting (99.9% uptime), SSL security, daily backups, uptime monitoring, and routine text/photo/phone updates whenever needed.
- Prototype Review: Once scope and materials are confirmed, we deliver an interactive staging prototype directly to their smartphone for review before launch (5-7 days turnaround).
- Domain Ownership: Client retains 100% ownership of their domain at all times (GoDaddy, Namecheap, Google Domains, etc.).
- The 3-Step Process: 1) 5-min call with Mo, 2) Interactive phone prototype in 5-7 days, 3) Launch upon approval.
- Payment: Official business accounts supported via ACH or Wire through Citibank.

MAIN GOAL & QUOTE FORM WORKFLOW:
- Your main goal is booking the visitor to Mo Radford's email (mo.radford@propellonline.com) or direct phone (+1 409-797-6986).
- If the visitor agrees to a quote, asks for pricing, or explicitly asks for a quote/form:
  Acknowledge enthusiastically that you're opening the form, and append the exact tag [OPEN_QUOTE_FORM] at the very end of your response.`;

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
        nextSuggestions: fallback.nextSuggestions,
        triggerQuoteForm: fallback.triggerQuoteForm || false
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

    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash"
    ];
    let aiText: string | null = null;

    for (const model of candidateModels) {
      try {
        const generatePromise = ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: PROPELLO_CONTRACTOR_PROMPT,
            temperature: 0.65
          }
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 4000)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);

        if (response && response.text) {
          aiText = response.text;
          break;
        }
      } catch {
        continue;
      }
    }

    let reply = aiText || fallback.text;
    let triggerQuoteForm = fallback.triggerQuoteForm || false;

    if (reply.includes("[OPEN_QUOTE_FORM]")) {
      reply = reply.replace("[OPEN_QUOTE_FORM]", "").trim();
      triggerQuoteForm = true;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text: reply,
        nextSuggestions: fallback.nextSuggestions,
        triggerQuoteForm
      })
    };

  } catch {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        text: fallback.text,
        nextSuggestions: fallback.nextSuggestions,
        triggerQuoteForm: fallback.triggerQuoteForm || false
      })
    };
  }
}
