export interface KnowledgeResponse {
  text: string;
  nextSuggestions?: string[];
  triggerQuoteForm?: boolean;
}

export interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

export const TARGET_EMAIL = "mo.radford@propellonline.com";
export const BACKUP_GMAIL = "mohibconsultofficial@gmail.com";
export const TARGET_PHONE = "+1 (409) 797-6986";

const CALL_BOOKING_PUSH = "Would you like to book a call with Mo directly, or shall I pull up our quick quote form?";

/**
 * Intelligent Standalone Knowledge Engine for Propello AI
 * - Grounded in exact business facts for Propello (propellonline.com / propello.online)
 * - Founder & Owner: Mo Radford (mo.radford@propellonline.com, +1 409-797-6986)
 * - Turnkey Build: $1,500 one-time setup fee
 * - Hosting & Care: $97/month, zero contracts, 99.9% uptime, daily backups, unlimited updates
 * - Turnaround: 5 to 7 days to interactive phone prototype
 * - Headquarters: Texas (409 area code), serving Texas statewide & nationwide
 * - Retains conversational context and answers directly with natural human speech
 */
export function getIntelligentReply(query: string, history: ChatHistoryItem[] = []): KnowledgeResponse {
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();

  // Inspect previous turn context
  const previousBotTexts = history
    .filter((h) => h.sender === 'bot')
    .map((h) => h.text.toLowerCase());
  const lastBotMessage = previousBotTexts[previousBotTexts.length - 1] || '';

  const hasOfferedForm =
    lastBotMessage.includes('quote form') ||
    lastBotMessage.includes('review your specs') ||
    lastBotMessage.includes('kickoff call') ||
    lastBotMessage.includes('book a call') ||
    lastBotMessage.includes('take a look at your trade');

  // 1. DIRECT CONSENT TO OPEN QUOTE FORM
  const affirmativeWords = [
    'yes', 'sure', 'yeah', 'yep', 'ok', 'okay', 'definitely', 'sounds good',
    'open it', 'open quote', 'lets do it', "let's do it", 'go ahead', 'please do',
    'fill form', 'send quote', 'get quote', 'ready', 'open form', 'quote please',
    'yes please', 'do that', 'pull it up', 'start'
  ];
  const isAffirmative = affirmativeWords.some(
    (w) => q === w || q.startsWith(w + ' ') || q.endsWith(' ' + w) || q === `${w}!` || q.includes(w)
  );

  if (hasOfferedForm && isAffirmative) {
    return {
      text: `Pulling up our quote request form right below. Drop in your name, contact phone, and trade details—founder Mo Radford receives it directly at ${TARGET_EMAIL} and will follow up promptly.`,
      triggerQuoteForm: true
    };
  }

  // Explicit command to open quote form
  if (
    q.includes("open quote") ||
    q.includes("get a quote") ||
    q.includes("request a quote") ||
    q.includes("give me a quote") ||
    q.includes("send a quote") ||
    q.includes("open the form") ||
    q.includes("fill out form") ||
    q.includes("quote form") ||
    q === "quote"
  ) {
    return {
      text: `Here is our quick quote form. Fill in your details below and Mo Radford will review your project specs directly.`,
      triggerQuoteForm: true
    };
  }

  // 2. DECLINING FORM
  if (
    hasOfferedForm &&
    (q === 'no' || q === 'not yet' || q === 'nope' || q.includes('no thanks') || q.includes('later') || q === 'nah')
  ) {
    return {
      text: `No problem at all. Take your time! What else can I answer for you about our designs, hosting, or turnaround? You can also call or text Mo directly anytime at ${TARGET_PHONE}.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 3. OWNER / FOUNDER / CREATOR / IDENTITY
  const isAskingAboutCompanyOwner =
    q.includes("who is the owner") ||
    q.includes("who is your owner") ||
    q.includes("who owns propello") ||
    q.includes("who owns you") ||
    q.includes("who is the owner of you") ||
    q.includes("owner of the company") ||
    q.includes("who founded") ||
    q.includes("who runs") ||
    q.includes("who is mo") ||
    q.includes("who created you") ||
    q.includes("who made you");

  if (isAskingAboutCompanyOwner) {
    return {
      text: `Propello is founded and owned by Mo Radford. He runs the agency personally and works directly with trade contractors on every project.\n\nMo can be reached directly at:\n• Email: ${TARGET_EMAIL}\n• Phone / Text: ${TARGET_PHONE}\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 4. THREE MAIN SERVICES / SERVICES INQUIRY
  const isAskingThreeServices =
    q.includes("three main services") ||
    q.includes("3 main services") ||
    q.includes("three services") ||
    q.includes("3 services") ||
    q.includes("main services") ||
    q.includes("top services");

  if (isAskingThreeServices) {
    return {
      text: `Here are our 3 core services for contractors:\n\n1. Custom Turnkey Website Builds ($1,500 flat fee)\nWe engineer a mobile-first, high-converting website with dedicated trade service pages, high-res project galleries, and click-to-call buttons. Interactive staging prototype delivered to your smartphone in 5-7 days.\n\n2. Local Contractor SEO & Google Maps Optimization\nFull technical SEO setup, geo-targeted keyword placement, structured Schema markup, and Google Business Profile optimization to get you ranking in local search and Google Maps.\n\n3. Dedicated Cloud Hosting & Zero-Contract Care ($97/mo)\nHigh-speed enterprise hosting, 99.9% uptime, daily backups, and unlimited routine text, photo, and phone number updates whenever you need.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 5. OTHER WEBSITES / PORTFOLIO / SAMPLES / LIVE EXAMPLES
  const isAskingOtherWebsites =
    q.includes("other website") ||
    q.includes("another website") ||
    q.includes("other websites") ||
    q.includes("sample website") ||
    q.includes("examples of your work") ||
    q.includes("portfolio") ||
    q.includes("past work") ||
    q.includes("previous work");

  if (isAskingOtherWebsites) {
    return {
      text: `Our primary agency platform is propellonline.com (propello.online). We also build dedicated, private staging prototypes for contractors across roofing, electrical, plumbing, HVAC, and concrete trades.\n\nBecause our client prototypes are hosted on secure private staging links before live deployment, founder Mo Radford shares live interactive walkthroughs directly to your smartphone during a quick 5-minute kickoff call.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 6. SERVICE AREA / TEXAS / CITIES / NATIONWIDE
  const isAskingTexas =
    q.includes("texas") || q.includes("in tx") || q.includes("houston") ||
    q.includes("dallas") || q.includes("dfw") || q.includes("austin") ||
    q.includes("san antonio") || q.includes("beaumont") || q.includes("galveston");

  if (isAskingTexas) {
    return {
      text: `Yes, absolutely! We are headquartered right here in Texas (area code 409) and actively service contractors statewide—including Houston, Dallas-Fort Worth, Austin, San Antonio, Beaumont, and surrounding counties.\n\nEvery site we build is tailored for your specific service territory and local Google rankings so general contractors and property owners in your city find and call you first.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  const isAskingLocationGeneral =
    q.includes("service area") || q.includes("where are you located") ||
    q.includes("where do you operate") || q.includes("where are you based") ||
    q.includes("service in") || q.includes("what states") || q.includes("nationwide");

  if (isAskingLocationGeneral) {
    return {
      text: `We are based in Texas (phone area code 409), but we build websites for trade contractors nationwide across the United States and Canada.\n\nWe customize your site's SEO for your exact service towns, counties, and metro radius so you rank prominently in local search and Google Maps.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 7. CLIENT DOMAIN OWNERSHIP
  if (
    (q.includes("domain") && !isAskingAboutCompanyOwner) ||
    q.includes("godaddy") || q.includes("namecheap") ||
    q.includes("own the website") || q.includes("own my site") ||
    q.includes("transfer my domain") || q.includes("lock me in")
  ) {
    return {
      text: `You retain 100% legal ownership of your domain name, website code, and branding at all times.\n\nUnlike predatory agencies that register domains under their own accounts to hold contractors hostage, your domain stays securely in your account (GoDaddy, Namecheap, Google Domains, etc.). We simply point the DNS. You are always in full control.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 8. PRICING & COSTS
  if (
    q.includes("cost") || q.includes("price") || q.includes("pricing") ||
    q.includes("how much") || q.includes("rate") || q.includes("fee")
  ) {
    if (q.includes("97") || q.includes("month") || q.includes("maintenance") || q.includes("hosting")) {
      return {
        text: `Our monthly care is a flat $97/month with zero contracts. It includes enterprise cloud hosting, SSL certificates, daily backups, Google uptime monitoring, and routine text/photo updates with no hourly fees.\n\n${CALL_BOOKING_PUSH}`
      };
    }
    return {
      text: `Our turnkey contractor website is a flat $1,500 one-time build, followed by $97/month for hands-off hosting and maintenance.\n\nThat covers the entire build: custom mobile-first design, 5-7 day interactive phone prototype, dedicated trade pages, quote forms, click-to-call routing, Google SEO setup, and Google Business Profile optimization. Zero long-term contracts.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 9. TIMELINE / TURNAROUND / PROCESS
  if (
    q.includes("timeline") || q.includes("turnaround") || q.includes("how long") ||
    q.includes("how fast") || q.includes("process") || q.includes("prototype")
  ) {
    return {
      text: `Our turnaround is 5 to 7 business days from our kickoff call to delivering an interactive phone prototype directly to your smartphone.\n\nYou review the speed, tap the buttons, check your photo galleries, and request any edits. Once you give 100% approval, we point your domain and launch.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 10. SEO, GOOGLE MAPS & RANKINGS
  if (
    q.includes("seo") || q.includes("google") || q.includes("rank") ||
    q.includes("ranking") || q.includes("google maps") || q.includes("traffic")
  ) {
    return {
      text: `Every Propello build includes complete contractor SEO:\n• Local geo-targeted keywords mapped to your trade and city\n• Sub-second mobile page loads (Google Core Web Vitals optimized)\n• Schema.org structured data for LocalBusiness & Contractor services\n• Google Search Console setup and automated sitemap submission\n• Google Business Profile guidance to boost your Google Maps 3-Pack rankings.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 11. SPECIFIC TRADES
  const tradeMatches: Record<string, string> = {
    roofing: "commercial and residential roofing (shingle, metal, TPO, storm repair)",
    roofer: "commercial and residential roofing (shingle, metal, TPO, storm repair)",
    hvac: "HVAC contractors (emergency AC replacement, heat pumps, commercial maintenance)",
    plumbing: "plumbing specialists (emergency leaks, repiping, tankless heaters, commercial rough-in)",
    plumber: "plumbing specialists (emergency leaks, repiping, tankless heaters, commercial rough-in)",
    electrical: "licensed electricians (panel upgrades, EV chargers, commercial buildouts)",
    electrician: "licensed electricians (panel upgrades, EV chargers, commercial buildouts)",
    landscaping: "landscaping and outdoor living (hardscaping, pavers, commercial turf care)",
    concrete: "concrete and masonry contractors (driveways, commercial slabs, foundations)",
    excavation: "excavation, grading, and site preparation (land clearing, utility trenching)",
    remodeling: "general remodeling and renovation (luxury kitchens, additions, commercial tenant finish)",
    painting: "commercial and residential painting (interior, exterior spray, industrial coatings)",
    welding: "welding and structural steel fabrication (mobile welding, iron gates, structural steel)",
    solar: "solar energy installation (residential rooftop, commercial arrays, battery storage)"
  };

  for (const [key, tradeLabel] of Object.entries(tradeMatches)) {
    if (q.includes(key)) {
      return {
        text: `Yes, we build high-converting websites specifically for ${tradeLabel}.\n\nYour site will feature dedicated service pages, high-resolution before/after photo galleries, fast click-to-call buttons for mobile visitors, and localized SEO to attract commercial general contractors and property owners.\n\n${CALL_BOOKING_PUSH}`
      };
    }
  }

  // 12. CONTACT / MO RADFORD / HUMAN
  if (
    q.includes("phone") || q.includes("call") || q.includes("number") ||
    q.includes("email") || q.includes("contact") || q.includes("speak to") ||
    q.includes("talk to") || q.includes("real person") || q.includes("human")
  ) {
    return {
      text: `You can reach founder Mo Radford directly:\n• Direct Phone / Text: ${TARGET_PHONE}\n• Email: ${TARGET_EMAIL}\n\nMo handles contractor accounts personally. ${CALL_BOOKING_PUSH}`
    };
  }

  // 13. GREETINGS
  if (
    q === "hi" || q === "hello" || q === "hey" || q === "good morning" ||
    q === "good afternoon" || q === "good evening" || q.startsWith("hello") || q.startsWith("hi ")
  ) {
    return {
      text: `Hello! I'm Propello AI. We engineer custom, high-converting websites built exclusively for contractors and industrial trade specialists.\n\nEvery project includes an interactive phone prototype delivered in 5-7 days, a flat $1,500 build fee, and hands-off hosting at $97/month with zero contracts.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 14. GENERAL RELEVANT WEBSITE INQUIRIES
  const isRelevantWebsiteQuestion =
    q.includes("website") || q.includes("propello") || q.includes("contractor") ||
    q.includes("build") || q.includes("service") || q.includes("offer") ||
    q.includes("features") || q.includes("how do you work") || q.includes("about");

  if (isRelevantWebsiteQuestion) {
    return {
      text: `Propello builds custom, high-converting websites for industrial trades and specialty contractors for a flat $1,500 build and $97/month hosting and maintenance. We deliver a working prototype to your phone in 5-7 days and you keep 100% domain ownership.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // 15. UNANSWERABLE / OUT-OF-SCOPE INQUIRY
  // Explicit instruction: "If there is a response which it cannot answer, it should then encourage that I don't have that information. I can only help with the content on the website and how to reach Mo, and you will have to ask him that."
  return {
    text: `I don't have that information. I can only help with the content on the website and how to reach Mo, and you will have to ask him that.\n\n${CALL_BOOKING_PUSH}`
  };
}
