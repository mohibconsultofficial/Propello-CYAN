import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { findVerifiedMarketData, generateDynamicVerifiedMarket, generateUniqueMarketScore, VERIFIED_REGISTRY } from "./src/data/verifiedPlaces.js";
import { getIntelligentReply } from "./src/data/chatKnowledge.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Enable basic CORS headers for internal API consistency
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Profile Persistence Store
const PROFILE_FILE_PATH = path.resolve(process.cwd(), "data", "profile.json");

const DEFAULT_PROFILE = {
  fullName: "Auisha Jubeen",
  email: "payments@propellonline.com",
  industry: "IT services / Software, platform, and app development",
  phone: "+1 (409) 797-6986",
  businessName: "Propello",
  website: "https://propello.online",
  accountHolder: "Auisha Jubeen",
  updatedAt: new Date().toISOString()
};

function readProfileFromDisk() {
  try {
    if (fs.existsSync(PROFILE_FILE_PATH)) {
      const data = fs.readFileSync(PROFILE_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn("Failed to read profile from disk, returning default:", err);
  }
  return DEFAULT_PROFILE;
}

function writeProfileToDisk(profile: any) {
  try {
    const dir = path.dirname(PROFILE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PROFILE_FILE_PATH, JSON.stringify(profile, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Failed to write profile to disk:", err);
    return false;
  }
}

// Profile API: GET current profile
app.get("/api/profile", (req, res) => {
  const profile = readProfileFromDisk();
  return res.json({ success: true, profile, source: "server" });
});

// Profile API: PUT update profile
app.put("/api/profile", (req, res) => {
  const incoming = req.body;
  if (!incoming || typeof incoming !== "object") {
    return res.status(400).json({ success: false, error: "Invalid profile data format" });
  }

  // Validate required fields
  const fullName = String(incoming.fullName || "").trim();
  const email = String(incoming.email || "").trim();
  const phone = String(incoming.phone || "").trim();
  const industry = String(incoming.industry || "").trim();
  const businessName = String(incoming.businessName || "").trim();
  const website = String(incoming.website || "").trim();

  if (!fullName || !email || !phone || !industry) {
    return res.status(400).json({ success: false, error: "Full name, email, phone, and industry are required." });
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: "Please provide a valid email address." });
  }

  const updatedProfile = {
    fullName,
    email,
    phone,
    industry,
    businessName: businessName || "Propello",
    website: website || "https://propello.online",
    accountHolder: fullName,
    updatedAt: new Date().toISOString()
  };

  const written = writeProfileToDisk(updatedProfile);
  return res.json({ 
    success: true, 
    profile: updatedProfile, 
    persisted: written,
    message: "Profile updated successfully on Propello server." 
  });
});

// Safe Geocoding endpoint to avoid browser CORS/Failed to fetch errors
app.get("/api/reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.json({ location: "Your Local Market" });
  }
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`, {
      headers: { 'User-Agent': 'PropelloWeb/1.0' },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (response.ok) {
      const data: any = await response.json();
      const city = data.address?.city || data.address?.town || data.address?.county || "Your Area";
      const state = data.address?.state || "";
      return res.json({ location: `${city}${state ? `, ${state}` : ''}` });
    }
  } catch {
    // Graceful silent fallback
  }
  return res.json({ location: "Your Local Market" });
});

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client successfully initialized on backend server.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI with provided key:", err);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Chatbot will run in premium simulation mode.");
}

// PROPELLO.ONLINE HIGH-INTELLIGENCE CONVERSATIONAL SYSTEM INSTRUCTIONS
const SYSTEM_PROMPT = `You are Propello AI, the articulate, authentic representative for Propello (propellonline.com / propello.online) and its founder, Mo Radford.
Propello engineers custom, high-converting websites built exclusively for industrial trades and specialty contractors (roofers, electricians, HVAC, plumbers, general contractors, concrete, excavators, painters, welders, remodelers, etc.).

CRITICAL CONVERSATIONAL RULES & TONE:
- Speak like a sharp, knowledgeable human specialist who genuinely understands the contractor trade business.
- Never sound like a corporate robot or script reader. Never use repetitive canned phrases like "Great question!" or "I'd be happy to help with that!"
- Answer the user's specific question directly, concisely, and accurately BEFORE adding any follow-up context.
- VITAL MANDATE: At the end of EVERY response, you MUST include this vital one-sentence prompt:
  "Would you like to book a call with Mo directly, or shall I pull up our quick quote form?"

STRICT SCOPE BOUNDARY & UNANSWERABLE QUESTIONS:
- You ONLY provide information regarding Propello, our contractor websites, trade services, pricing ($1,500 build / $97/mo hosting), portfolio, and Mo Radford.
- If asked about ANYTHING outside of Propello's website and services (such as general science, trivia, external topics, or anything you do not have verified company information about), do NOT answer the external topic. You MUST explicitly respond:
  "I don't have that information. I can only help with the content on the website and how to reach Mo, and you will have to ask him that. Would you like to book a call with Mo directly, or shall I pull up our quick quote form?"

EXACT KNOWLEDGE BASE:
1. Founder & Owner:
   - Mo Radford is the founder and owner of Propello.
   - If asked "who is the owner?", "who is your owner?", "who is the owner of you?", or "who created you?", directly state that Mo Radford is the founder and owner of Propello (and that Propello AI was created by Mo Radford and the Propello engineering team).
   - Direct Email: mo.radford@propellonline.com
   - Direct Phone / Text: +1 (409) 797-6986
2. Main Services:
   - When asked for "three main services" or "what services do you provide?":
     1) Custom High-Converting Websites ($1,500 turnkey build fee, interactive phone prototype delivered to your phone in 5-7 days).
     2) Local Contractor SEO & Google Maps 3-Pack Optimization (geo-targeted keywords, mobile page speed, Schema markup, and Google Business Profile setup).
     3) Dedicated Cloud Hosting & Zero-Contract Care ($97/month, zero contracts, 99.9% uptime, daily backups, and unlimited routine updates).
3. Other Websites & Portfolio:
   - When asked "do you have any other website?", "what other websites do you have?", or for portfolio work:
     - Our flagship agency domain is propellonline.com (and propello.online).
     - We also maintain private staging prototypes and live client websites for roofing, electrical, HVAC, plumbing, and general contractors across Texas and nationwide.
     - Because client prototypes are hosted on secure private staging links during development, Mo Radford shares live interactive walkthroughs directly to contractors' smartphones during our 5-minute kickoff call.
4. Service Area & Texas:
   - When asked "do you service in Texas?" or about specific cities (Houston, Dallas-Fort Worth, Austin, San Antonio, Beaumont, etc.):
     - Yes, absolutely! We are headquartered in Texas (area code 409) and actively service trade contractors statewide across Texas, as well as nationwide throughout the US and Canada.
5. Pricing & Offer:
   - Upfront build: Flat $1,500 one-time setup.
   - Monthly hosting & care: $97/month. ZERO contracts. Cancel or pause anytime.
   - Domain ownership: 100% owned by the client. We never hold domains or code hostage.
6. The Quote Form & Booking:
   - When the user asks for a quote, agrees to start, or asks to open the form, acknowledge and append the exact tag [OPEN_QUOTE_FORM] at the very end of your response.`;

// Multi-model Gemini executor with ultra-fast automatic failover
async function generateGeminiContentWithFallback(
  aiClient: GoogleGenAI,
  contents: any,
  systemInstruction?: string,
  temperature?: number,
  timeoutMs = 4000
): Promise<string | null> {
  // Ordered by speed and current availability
  const candidateModels = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash"
  ];

  for (const model of candidateModels) {
    try {
      const config: any = {};
      if (systemInstruction) config.systemInstruction = systemInstruction;
      if (temperature !== undefined) config.temperature = temperature;

      const apiPromise = aiClient.models.generateContent({
        model,
        contents,
        config: Object.keys(config).length > 0 ? config : undefined,
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeoutMs)
      );

      const response: any = await Promise.race([apiPromise, timeoutPromise]);
      if (response && response.text) {
        return response.text;
      }
    } catch {
      // Fast fallback to next model
      continue;
    }
  }
  return null;
}

// Chat API Route
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const fallback = getIntelligentReply(message, history);

  // If Gemini is not configured, reply using our intelligent knowledge engine
  if (!ai) {
    return res.json({
      text: fallback.text,
      nextSuggestions: fallback.nextSuggestions,
      triggerQuoteForm: fallback.triggerQuoteForm || false
    });
  }

  try {
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.slice(-8).forEach((msg: any) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const aiReply = await generateGeminiContentWithFallback(
      ai,
      contents,
      SYSTEM_PROMPT,
      0.6,
      4000
    );

    let reply = aiReply || fallback.text;
    let triggerQuoteForm = fallback.triggerQuoteForm || false;

    if (reply.includes("[OPEN_QUOTE_FORM]")) {
      reply = reply.replace("[OPEN_QUOTE_FORM]", "").trim();
      triggerQuoteForm = true;
    }

    return res.json({
      text: reply,
      nextSuggestions: fallback.nextSuggestions,
      triggerQuoteForm
    });

  } catch {
    return res.json({
      text: fallback.text,
      nextSuggestions: fallback.nextSuggestions,
      triggerQuoteForm: fallback.triggerQuoteForm || false
    });
  }
});

// Consultation Booking intake route (used by Propello AI and Contact form)
app.post("/api/booking", async (req, res) => {
  const { name, phone, email, trade, preferredDate, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required for consultation requests." });
  }

  const timestamp = new Date().toISOString();
  console.log("==========================================================================");
  console.log(`📅 NEW CONTRACTOR CONSULTATION REQUEST AT ${timestamp}:`);
  console.log(`👤 Name           : ${name}`);
  console.log(`📞 Phone          : ${phone}`);
  console.log(`📧 Email          : ${email || "Not provided"}`);
  console.log(`🔨 Trade / Niche  : ${trade || "General Contracting"}`);
  console.log(`⏰ Preferred Time : ${preferredDate || "Earliest available"}`);
  console.log(`📝 Notes          : ${notes || "None"}`);
  console.log(`✉️ Notification Route: mohibconsultofficial@gmail.com & mo.radford@propellonline.com`);
  console.log("==========================================================================");

  // Deliver lead directly to user's Gmail
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    await fetch("https://formsubmit.co/ajax/mohibconsultofficial@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://propello.online",
        "Referer": "https://propello.online/"
      },
      body: JSON.stringify({
        name,
        phone,
        email: email || "Not provided",
        trade: trade || "Contractor",
        preferredDate: preferredDate || "ASAP",
        notes: notes || "Submitted via Propello AI / Website",
        _subject: `New Propello Quote Lead: ${name} (${trade || "Contractor"})`,
        _cc: "mo.radford@propellonline.com",
        _template: "table"
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
  } catch (deliveryErr) {
    console.warn("Direct email delivery error (continuing gracefully):", deliveryErr);
  }

  return res.json({
    status: "success",
    message: "Consultation request successfully logged and sent to Mo Radford.",
    receivedAt: timestamp
  });
});

// Proposal Lead submission route
app.post("/api/proposal", (req, res) => {
  const { name, email, phone, businessType, message } = req.body;

  console.log("==========================================================================");
  console.log(`📨 SECURE PROPOSAL INQUIRY SUBMITTED TO MO.RADFORD@PROPELLONLINE.COM AT ${new Date().toISOString()}:`);
  console.log(`👤 Client: ${name}`);
  console.log(`📞 Phone : ${phone}`);
  console.log(`📧 Email : ${email}`);
  console.log(`🏢 Niche : ${businessType}`);
  console.log(`💬 Detail: ${message}`);
  console.log("==========================================================================");

  return res.json({
    status: "success",
    message: "Blueprint proposal captured and securely logged for Mo Radford."
  });
});

// Competitor Radar Route: Numerical Market Readiness Score & Bespoke Strategic Diagnosis
app.post("/api/competitor-radar", async (req, res) => {
  const { niche, location } = req.body;

  if (!niche || !location) {
    return res.status(400).json({ error: "Niche and location are required." });
  }

  const cleanNiche = String(niche).trim();
  const cleanLocation = String(location).trim();

  // If Gemini is available, attempt to generate an intelligent bespoke executive assessment with 3.5s timeout
  if (ai) {
    try {
      const contents = `You are a high-level digital infrastructure and competitive readiness auditor for commercial contractors and automotive styling studios.
Analyze the local market for "${cleanNiche}" in "${cleanLocation}".
Produce a unique, mathematically grounded Market Opportunity / Readiness Score (60-98) and a completely bespoke, non-repetitive diagnosis.
CRITICAL MANDATES:
1. DO NOT list individual competitor companies, competitor cards, street addresses, or individual phone numbers.
2. DO NOT use generic boilerplate sentences. The response MUST be specifically written for "${cleanNiche}" in "${cleanLocation}".
3. Provide:
   - opportunityScore: number between 62 and 96
   - marketVerdict: "saturated" or "opportunity"
   - verdictHeadline: A punchy, authoritative enterprise headline (e.g. "${cleanLocation} Market Saturation: Top Tier ${cleanNiche} Providers Dominate Local Inbound")
   - verdictMessage: 2 to 3 detailed, sophisticated sentences analyzing local search competition, commercial GC/fleet vetting, and the cost of an outdated web presence in "${cleanLocation}".
   - actionCallout: A concise 1-sentence action step referencing Mo Radford and Propello's working prototype review.
   - searchDensityIndex: number between 65 and 95
   - mobileGapIndex: number between 70 and 96
   - commercialVettingIndex: number between 70 and 98
   - leadVelocityIndex: number between 60 and 95
   - tacticalInsights: Array of 3 sharp bullet points tailored to this exact trade and location.

Format strictly inside this JSON marker block:
:::COMPETITOR_RADAR_JSON
{
  "opportunityScore": 88,
  "marketVerdict": "saturated",
  "verdictHeadline": "...",
  "verdictMessage": "...",
  "actionCallout": "...",
  "searchDensityIndex": 84,
  "mobileGapIndex": 79,
  "commercialVettingIndex": 92,
  "leadVelocityIndex": 81,
  "tacticalInsights": ["...", "...", "..."]
}
:::END_COMPETITOR_RADAR_JSON`;

      const responseText = (await generateGeminiContentWithFallback(ai, contents, undefined, undefined, 8000)) || "";
      
      let parsedData: any = null;
      const jsonMatch = responseText.match(/:::COMPETITOR_RADAR_JSON([\s\S]*?):::END_COMPETITOR_RADAR_JSON/);
      if (jsonMatch && jsonMatch[1]) {
        try {
          parsedData = JSON.parse(jsonMatch[1].trim());
        } catch (err) {
          console.error("JSON marker parse error:", err);
        }
      }

      if (parsedData && typeof parsedData.opportunityScore === "number") {
        return res.json({
          niche: cleanNiche,
          location: cleanLocation,
          opportunityScore: parsedData.opportunityScore,
          marketVerdict: parsedData.marketVerdict || (parsedData.opportunityScore >= 80 ? "saturated" : "opportunity"),
          verdictHeadline: parsedData.verdictHeadline,
          verdictMessage: parsedData.verdictMessage,
          actionCallout: parsedData.actionCallout || `Deploy your $1,500 turnkey Propello platform with full prototype review to claim ${cleanLocation}'s highest-value jobs.`,
          searchDensityIndex: parsedData.searchDensityIndex || 82,
          mobileGapIndex: parsedData.mobileGapIndex || 78,
          commercialVettingIndex: parsedData.commercialVettingIndex || 91,
          leadVelocityIndex: parsedData.leadVelocityIndex || 79,
          tacticalInsights: parsedData.tacticalInsights || [
            `Local Search Density: High mobile intent requires sub-second load times.`,
            `Commercial Vetting: Project managers review portfolios before issuing contracts.`,
            `Direct Conversions: Seamless click-to-call routing captures high-ticket inquiries.`
          ],
          places: [], // ZERO detailed competitor cards as requested
          mapGroundingSources: [
            {
              title: `${cleanNiche} in ${cleanLocation} Market Telemetry`,
              uri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanNiche + " " + cleanLocation)}`
            }
          ]
        });
      }
    } catch {
      // Graceful fallback to deterministic unique market synthesis
    }
  }

  // Guaranteed instant 100% unique synthesis fallback
  const uniqueResult = generateUniqueMarketScore(cleanNiche, cleanLocation);
  return res.json(uniqueResult);
});

// Setup Vite & Static Assets Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Guaranteed SPA fallback in development mode for direct refresh on routes like /payment-details
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.startsWith("/api")) {
        return next();
      }
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        next(e);
      }
    });

    console.log("Vite dev middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files serving from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Propello platform server successfully loaded on http://localhost:${PORT}`);
  });
}

startServer();
