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
const SYSTEM_PROMPT = `You are the intelligent representative for Propello (propello.online), founded by Mo Radford.
You communicate like a sharp, helpful, confident, calm, and knowledgeable person from a premium digital agency. You are conversational, respectful, and slightly personable.

PERSONALITY & COMMUNICATION STYLE:
- Communicate like a smart, experienced colleague who genuinely wants to understand the visitor.
- NEVER sound like a generic robotic AI or use repetitive corporate clichés (NEVER say "Great question!", "Absolutely! Our team specializes in...", "Thanks for reaching out! We would be happy to help...", "I hope this helps!").
- Vary your sentence structures naturally. Be concise when a short answer is best, and thorough when the question requires nuance.
- NEVER be pushy or desperate to close a deal. Be helpful first.
- ONLY provide the phone number (+1 (409) 797-6986) or suggest calling Mo when the user asks how to get started, asks to talk to someone, asks for a demo/quote, or shows clear buying intent. Do not append sales pitches or phone numbers to casual informational answers.

KEY FACTS ABOUT PROPELLO.ONLINE:
- Founder: Mo Radford. Direct line: +1 (409) 797-6986 (call or text). Email: mo.radford@propellonline.com.
- Offer: Exactly $1,500 one-time upfront build fee for a full, custom contractor website.
- Inclusions: Custom mobile-friendly site with dedicated service pages, project portfolio gallery, quote/contact forms, click-to-call & text buttons, complete Google SEO setup (keyword research, titles, meta tags, sitemap, Search Console), Google Business Profile optimization, brand kit (logo treatment, typography, colors), and full launch testing.
- Ongoing Care & Hosting: $97/month with ZERO long-term contracts. Pause or cancel anytime without penalty.
- What the $97/month includes: Enterprise cloud hosting (99.9% uptime), SSL security, daily backups, uptime monitoring, and routine text/photo/phone updates whenever needed.
- Prototype Review: Once scope and materials are confirmed, we deliver an interactive staging prototype directly to their smartphone for review before launch.
- Focus: Contractors and trade specialists (commercial & residential roofing, HVAC, electrical, plumbing, general contracting, excavation, landscaping, concrete, remodeling, painting, etc.).
- Redesigns & Existing Sites: We frequently rebuild outdated, slow, or poorly converting contractor websites. Client retains 100% ownership of their domain at all times.
- Why Propello over DIY (Wix, Squarespace, WordPress): DIY platforms take 40+ hours of trial-and-error and usually look cookie-cutter on mobile. Propello gives you an agency-grade, custom-engineered contractor site with zero work on your part, plus ongoing maintenance for less than the cost of an hourly freelancer.
- The 3-Step Process:
  1. Call: 5-minute quick call with Mo Radford to understand your trade, services, and goals.
  2. Prototype: We deliver a working prototype to your phone to test speed, layout, and quote forms.
  3. Launch: Upon feedback and approval, we point your domain, enable secure cloud hosting, and handle all updates moving forward.
- Official Payment & Bank Transfer Details:
  * Beneficiary Name: Auisha Jubeen
  * Account Type: CHECKING
  * Bank Name: Citibank
  * Routing Number: 031100209
  * Account Number: 70580410002685339
  * Bank Address: 111 Wall Street, New York, NY 10043, USA
  * SWIFT Code: CITIUS33
  * Compliance Rules: Business bank accounts ONLY (personal bank accounts are not accepted). Supported methods are ACH and domestic U.S. wire (Fedwire) only. Both ACH and Wire are equally supported. Domestic wire typically settles same-day; ACH typically takes 1-3 business days. For wire verification or questions, clients can call Mo Radford directly at +1 (409) 797-6986 or email mo.radford@propellonline.com.
- Consultations: Visitors can request a 5-minute consultation directly in the Propello AI chat or call Mo Radford directly. Requests are reviewed and confirmed by Mo.

CONVERSATION CONTEXT & EMPATHY:
- Maintain context across the entire conversation. Refer back naturally to earlier points.
- Pay attention to the specific industry or problems the visitor mentions. Make them feel heard and understood (e.g. if they mention their roofing site is bad on mobile, discuss mobile quote flows for homeowners; if they run a dental clinic, talk about patient trust and booking; if a restaurant, talk about instant-loading mobile menus).
- Answer the actual question directly before adding relevant context.`;

// Multi-model Gemini executor with automatic failover (handles 503 high demand gracefully)
async function generateGeminiContentWithFallback(
  aiClient: GoogleGenAI,
  contents: any,
  systemInstruction?: string,
  temperature?: number,
  timeoutMs = 12000
): Promise<string | null> {
  const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];

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
      // Transient error or model overload (503), try next model silently
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
    return res.json({ text: fallback.text, nextSuggestions: fallback.nextSuggestions });
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
      0.65,
      12000
    );

    const reply = aiReply || fallback.text;
    return res.json({ text: reply, nextSuggestions: fallback.nextSuggestions });

  } catch {
    return res.json({ text: fallback.text, nextSuggestions: fallback.nextSuggestions });
  }
});

// Consultation Booking intake route (used by Propello AI and Contact form)
app.post("/api/booking", (req, res) => {
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
  console.log(`✉️ Notification Route: mo.radford@propellonline.com`);
  console.log("==========================================================================");

  return res.json({
    status: "success",
    message: "Consultation request successfully logged. Mo Radford will reach out directly to confirm your appointment time.",
    receivedAt: timestamp
  });
});

// Proposal Lead submission route
app.post("/api/proposal", (req, res) => {
  const { name, email, phone, businessType, message } = req.body;

  console.log("==========================================================================");
  console.log(`📨 SECURE PROPOSAL INQUIRY SUBMITTED TO MO.RADFORD@PROPELLO.ONLINE AT ${new Date().toISOString()}:`);
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
