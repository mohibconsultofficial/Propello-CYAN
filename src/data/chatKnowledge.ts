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
 * Normalizes input text for intent matching:
 * - Converts to lower case
 * - Strips unnecessary punctuation
 * - Normalizes spacing and common slang/contractions
 */
function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .replace(/[?!.,;:"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intelligent Standalone Knowledge Engine for Propello AI
 * - Works 100% offline, standalone on Netlify, GitHub Pages, or local environments without API keys
 * - Built exclusively for Propello (propellonline.com / propello.online)
 * - Founder & Owner: Mo Radford (mo.radford@propellonline.com, +1 409-797-6986)
 * - Turnkey Build: $1,500 one-time setup fee
 * - Hosting & Care: $97/month, zero contracts, 99.9% uptime, daily backups, unlimited updates
 * - Turnaround: 5 to 7 days to interactive phone prototype
 * - Headquarters: Texas (409 area code), serving Texas statewide & nationwide
 * - Answers directly with natural human speech, without generic filler
 */
export function getIntelligentReply(query: string, history: ChatHistoryItem[] = []): KnowledgeResponse {
  const rawQ = query.trim();
  const q = normalizeQuery(rawQ);

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
    lastBotMessage.includes('pull up our quick quote form');

  // =========================================================================
  // 1. DIRECT CONSENT TO OPEN QUOTE FORM
  // =========================================================================
  const affirmativeTriggers = [
    'yes', 'sure', 'yeah', 'yep', 'ok', 'okay', 'definitely', 'sounds good',
    'open it', 'open quote', 'lets do it', "let's do it", 'go ahead', 'please do',
    'fill form', 'send quote', 'get quote', 'ready', 'open form', 'quote please',
    'yes please', 'do that', 'pull it up', 'start', 'i want a quote', 'quote form',
    'request quote', 'give me a quote', 'i want quote', 'open the form'
  ];

  const isAffirmative = affirmativeTriggers.some((w) => {
    return q === w || q.startsWith(w + ' ') || q.endsWith(' ' + w) || q.includes(` ${w} `) || q.includes(w);
  });

  if (hasOfferedForm && (isAffirmative || q.includes('quote') || q.includes('form') || q.includes('pull up'))) {
    return {
      text: `Pulling up our quote request form right below. Drop in your name, contact phone, and trade details—founder Mo Radford receives it directly at ${TARGET_EMAIL} and will follow up promptly.`,
      triggerQuoteForm: true
    };
  }

  // Explicit command to open quote form
  if (
    q === 'quote' ||
    q.includes('open quote') ||
    q.includes('get a quote') ||
    q.includes('request a quote') ||
    q.includes('request quote') ||
    q.includes('give me a quote') ||
    q.includes('send a quote') ||
    q.includes('open the form') ||
    q.includes('open form') ||
    q.includes('pull up form') ||
    q.includes('pull up the form') ||
    q.includes('fill out form') ||
    q.includes('quote form') ||
    q.includes('get quote')
  ) {
    return {
      text: `Here is our quick quote form. Fill in your details below and Mo Radford will review your project specs directly.`,
      triggerQuoteForm: true
    };
  }

  // =========================================================================
  // 2. DECLINING FORM OR CALL
  // =========================================================================
  if (
    hasOfferedForm &&
    (q === 'no' || q === 'not yet' || q === 'nope' || q.includes('no thanks') || q.includes('later') || q === 'nah' || q.includes('dont want'))
  ) {
    return {
      text: `No problem at all. Take your time! What else can I answer for you about our designs, hosting, or turnaround? You can also call or text Mo directly anytime at ${TARGET_PHONE}.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 3. BOOKING / HOW TO BOOK / SCHEDULING / GETTING STARTED
  // =========================================================================
  const isBookingQuery =
    q.includes('how to book') ||
    q.includes('how do i book') ||
    q.includes('how do we book') ||
    q.includes('how can i book') ||
    q.includes('how to schedule') ||
    q.includes('how do i schedule') ||
    q.includes('book a call') ||
    q.includes('book call') ||
    q.includes('schedule a call') ||
    q.includes('schedule call') ||
    q.includes('set up a call') ||
    q.includes('how do i start') ||
    q.includes('how to start') ||
    q.includes('how do we start') ||
    q.includes('how to get started') ||
    q.includes('how do i get started') ||
    q.includes('onboarding') ||
    q.includes('sign up') ||
    q.includes('how to hire you') ||
    q.includes('hire propello') ||
    q.includes('i want to book') ||
    q === 'book' ||
    q === 'booking';

  if (isBookingQuery) {
    return {
      text: `Booking with Propello is direct and simple:\n\n1. Quick Kickoff: You can schedule a 5-minute kickoff call with founder Mo Radford or submit our quick quote form right here.\n2. Interactive Phone Prototype: We engineer a custom, mobile-first design for your trade and deliver a live prototype to your smartphone in 5 to 7 days.\n3. Approval & Launch: You test the speed, tap the buttons, and approve the build before we point your domain and deploy full Google SEO.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 4. OWNER / FOUNDER / MO RADFORD / WHO CREATED YOU
  // =========================================================================
  const isOwnerQuery =
    q.includes('who is mo') ||
    q.includes('who is mo radford') ||
    q.includes('who is the owner') ||
    q.includes('who is your owner') ||
    q.includes('who owns propello') ||
    q.includes('who owns you') ||
    q.includes('who is the owner of you') ||
    q.includes('owner of the company') ||
    q.includes('who founded') ||
    q.includes('who runs') ||
    q.includes('who created you') ||
    q.includes('who made you') ||
    q.includes('who built you') ||
    q.includes('who is behind') ||
    q.includes('tell me about mo') ||
    q === 'mo' ||
    q === 'mo radford';

  if (isOwnerQuery) {
    return {
      text: `Propello is founded and owned by Mo Radford. He is a contractor digital infrastructure specialist who runs the agency personally and works directly with trade contractors on every project from kickoff to launch.\n\nMo can be reached directly at:\n• Email: ${TARGET_EMAIL}\n• Phone / Text: ${TARGET_PHONE}\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 5. WHAT DO YOU SELL / WHAT DO YOU DO / PRODUCTS / OFFERINGS
  // =========================================================================
  const isWhatDoYouSell =
    q.includes('what do u sell') ||
    q.includes('what do you sell') ||
    q.includes('what do u do') ||
    q.includes('what do you do') ||
    q.includes('what are you selling') ||
    q.includes('what does propello do') ||
    q.includes('what do you offer') ||
    q.includes('what do u offer') ||
    q.includes('what do you provide') ||
    q.includes('what is propello') ||
    q.includes('what is this') ||
    q.includes('what are your products') ||
    q.includes('what products') ||
    q.includes('what are your services') ||
    q.includes('what kind of work');

  if (isWhatDoYouSell) {
    return {
      text: `We engineer custom, high-converting websites built exclusively for industrial trades and specialty contractors (roofers, electricians, HVAC, plumbers, concrete, excavation, and remodelers).\n\nEvery build includes:\n• Mobile-first custom design & interactive smartphone prototype in 5-7 days\n• Local contractor SEO & Google Maps optimization\n• Flat $1,500 turnkey build fee\n• $97/month cloud hosting & unlimited care with zero contracts\n• 100% domain and code ownership retained by you\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 6. FACTS / STATS / TELL ME ABOUT PROPELLO / WHAT DO YOU KNOW
  // =========================================================================
  const isFactsQuery =
    q.includes('tell me some facts') ||
    q.includes('tell me facts') ||
    q.includes('give me facts') ||
    q.includes('some facts') ||
    q.includes('company facts') ||
    q.includes('facts about') ||
    q.includes('tell me about you') ||
    q.includes('tell me about propello') ||
    q.includes('what do u know') ||
    q.includes('what do you know') ||
    q.includes('tell me more') ||
    q.includes('stats') ||
    q === 'facts';

  if (isFactsQuery) {
    return {
      text: `Here are key facts about Propello:\n\n• Exclusively Trade-Focused: We only build for contractors and specialty trades—no generic templates or corporate fluff.\n• Texas Roots, Nationwide Reach: Founded and run by Mo Radford out of Texas (409 area code), serving trade contractors across Texas and nationwide.\n• Rapid Smartphone Delivery: We deliver a live, interactive phone prototype in 5 to 7 days so you can test speed and tap buttons on your own device before paying for hosting.\n• Transparent Pricing: Exactly $1,500 upfront build fee + $97/month hands-off hosting with zero lock-in contracts.\n• 100% Client Ownership: Unlike agencies that hold domains hostage, you keep full legal ownership of your domain and assets at all times.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 7. HOW TO CALL / CONTACT / PHONE / REACH MO / SPEAK TO HUMAN
  // =========================================================================
  const isContactQuery =
    q.includes('how to call') ||
    q.includes('how do i call') ||
    q.includes('can i call') ||
    q.includes('phone number') ||
    q.includes('what is the number') ||
    q.includes('what is your number') ||
    q.includes('what is your phone') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('number') ||
    q.includes('telephone') ||
    q.includes('cell') ||
    q.includes('reach mo') ||
    q.includes('call mo') ||
    q.includes('text mo') ||
    q.includes('email') ||
    q.includes('contact') ||
    q.includes('speak to') ||
    q.includes('talk to') ||
    q.includes('speak with') ||
    q.includes('real person') ||
    q.includes('human');

  if (isContactQuery) {
    return {
      text: `You can reach founder Mo Radford directly:\n• Direct Phone / Text: ${TARGET_PHONE}\n• Email: ${TARGET_EMAIL}\n\nMo handles contractor accounts personally and speaks with trade owners every day.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 8. WHAT'S THE OFFER / THE OFFER / CORE PACKAGE
  // =========================================================================
  const isOfferQuery =
    q.includes('whats the offer') ||
    q.includes('what is the offer') ||
    q.includes('whats your offer') ||
    q.includes('what is your offer') ||
    q.includes('the offer') ||
    q.includes('tell me the offer') ||
    q.includes('offer details') ||
    q.includes('package details') ||
    q === 'offer';

  if (isOfferQuery) {
    return {
      text: `Our turnkey contractor package is structured as follows:\n\n• Flat $1,500 Upfront Build Fee: Complete mobile-first custom website, dedicated service pages, before/after photo galleries, click-to-call routing, and local contractor SEO.\n• Interactive Phone Prototype in 5–7 Days: You review and test the live build on your smartphone before launch.\n• $97/Month Hands-Off Care: High-speed cloud hosting, 99.9% uptime, daily backups, Google Search Console monitoring, and unlimited routine text/photo updates.\n• Zero Contracts: Cancel or pause anytime without penalty.\n• 100% Domain & Code Ownership: You own your domain and assets unconditionally.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 9. NEGOTIATION / DISCOUNTS / PRICING FLEXIBILITY
  // =========================================================================
  const isNegotiationQuery =
    q.includes('negotiate') ||
    q.includes('negotiable') ||
    q.includes('can we negotiate') ||
    q.includes('is price flexible') ||
    q.includes('discount') ||
    q.includes('cheaper') ||
    q.includes('lower price') ||
    q.includes('best price') ||
    q.includes('deal') ||
    q.includes('can you do better');

  if (isNegotiationQuery) {
    return {
      text: `Our $1,500 build fee and $97/month hosting are already set at a flat wholesale turnkey rate—about one-third of what traditional agencies charge ($5,000–$10,000) for custom contractor websites.\n\nThat said, founder Mo Radford works directly with trade business owners on every job. If you have specific scope requirements or want to discuss payment milestones, he is happy to talk through options on a 5-minute call.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 10. CONNECT ME / TRANSFER / PUT ME THROUGH
  // =========================================================================
  const isConnectQuery =
    q.includes('connect me') ||
    q.includes('connect') ||
    q.includes('transfer me') ||
    q.includes('transfer') ||
    q.includes('put me through') ||
    q.includes('talk to mo') ||
    q.includes('speak to mo') ||
    q.includes('connect with mo');

  if (isConnectQuery) {
    return {
      text: `I can connect you directly with founder Mo Radford right now:\n• Phone / Text: ${TARGET_PHONE}\n• Email: ${TARGET_EMAIL}\n\nYou can call or text Mo directly, or I can pull up our quick quote form below so he can review your trade details before contacting you.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 11. CONTINUATIONS / AND / SO / WHAT ELSE / GO ON
  // =========================================================================
  if (
    q === 'and' ||
    q === 'and?' ||
    q === 'so' ||
    q === 'so?' ||
    q === 'then' ||
    q === 'then?' ||
    q === 'what else' ||
    q === 'continue' ||
    q === 'go on' ||
    q === 'more'
  ) {
    return {
      text: `In addition to engineering your website, we manage everything end-to-end: high-speed cloud hosting, daily backups, local contractor SEO, Google Maps 3-Pack visibility, and unlimited routine text and photo updates whenever you complete new projects.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 12. THREE MAIN SERVICES / SERVICES BREAKDOWN
  // =========================================================================
  const isAskingThreeServices =
    q.includes('three main services') ||
    q.includes('3 main services') ||
    q.includes('three services') ||
    q.includes('3 services') ||
    q.includes('main services') ||
    q.includes('top services') ||
    q.includes('core services') ||
    q === 'services';

  if (isAskingThreeServices) {
    return {
      text: `Here are our 3 core services for contractors:\n\n1. Custom Turnkey Website Builds ($1,500 flat fee)\nWe engineer a mobile-first, high-converting website with dedicated trade service pages, high-res project galleries, and click-to-call buttons. Interactive staging prototype delivered to your smartphone in 5-7 days.\n\n2. Local Contractor SEO & Google Maps Optimization\nFull technical SEO setup, geo-targeted keyword placement, structured Schema markup, and Google Business Profile optimization to get you ranking in local search and Google Maps.\n\n3. Dedicated Cloud Hosting & Zero-Contract Care ($97/mo)\nHigh-speed enterprise hosting, 99.9% uptime, daily backups, and unlimited routine text, photo, and phone number updates whenever you need.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 13. OTHER WEBSITES / PORTFOLIO / SAMPLES / PAST WORK
  // =========================================================================
  const isAskingOtherWebsites =
    q.includes('other website') ||
    q.includes('another website') ||
    q.includes('other websites') ||
    q.includes('sample website') ||
    q.includes('sample') ||
    q.includes('samples') ||
    q.includes('examples of your work') ||
    q.includes('examples') ||
    q.includes('example') ||
    q.includes('portfolio') ||
    q.includes('past work') ||
    q.includes('previous work') ||
    q.includes('case studies') ||
    q.includes('show me a site') ||
    q.includes('show me work');

  if (isAskingOtherWebsites) {
    return {
      text: `Our primary agency platform is propellonline.com (propello.online). We also build dedicated, private staging prototypes for contractors across roofing, electrical, plumbing, HVAC, concrete, and excavation trades.\n\nBecause our client prototypes are hosted on secure private staging links before live deployment, founder Mo Radford shares live interactive walkthroughs directly to your smartphone during a quick 5-minute kickoff call.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 14. SERVICE AREA / TEXAS / CITIES / NATIONWIDE
  // =========================================================================
  const isAskingTexas =
    q.includes('texas') || q.includes('in tx') || q.includes('houston') ||
    q.includes('dallas') || q.includes('dfw') || q.includes('austin') ||
    q.includes('san antonio') || q.includes('beaumont') || q.includes('galveston') ||
    q.includes('midland') || q.includes('odessa') || q.includes('corpus christi') ||
    q.includes('el paso') || q.includes('fort worth');

  if (isAskingTexas) {
    return {
      text: `Yes, absolutely! We are headquartered right here in Texas (area code 409) and actively service contractors statewide—including Houston, Dallas-Fort Worth, Austin, San Antonio, Beaumont, and surrounding counties.\n\nEvery site we build is tailored for your specific service territory and local Google rankings so general contractors and property owners in your city find and call you first.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  const isAskingLocationGeneral =
    q.includes('service area') || q.includes('where are you located') ||
    q.includes('where do you operate') || q.includes('where are you based') ||
    q.includes('service in') || q.includes('what states') || q.includes('nationwide') ||
    q.includes('where are you from') || q.includes('location');

  if (isAskingLocationGeneral) {
    return {
      text: `We are based in Texas (phone area code 409), but we build websites for trade contractors nationwide across the United States and Canada.\n\nWe customize your site's SEO for your exact service towns, counties, and metro radius so you rank prominently in local search and Google Maps.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 15. CLIENT DOMAIN OWNERSHIP / HOSTAGE / GODADDY
  // =========================================================================
  if (
    (q.includes('domain') && !isOwnerQuery) ||
    q.includes('godaddy') || q.includes('namecheap') ||
    q.includes('google domains') || q.includes('cloudflare') ||
    q.includes('own the website') || q.includes('own my site') ||
    q.includes('transfer my domain') || q.includes('lock me in') ||
    q.includes('hold hostage') || q.includes('who owns the domain')
  ) {
    return {
      text: `You retain 100% legal ownership of your domain name, website code, and branding at all times.\n\nUnlike predatory agencies that register domains under their own accounts to hold contractors hostage, your domain stays securely in your account (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.). We simply point the DNS. You are always in full control.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 16. PRICING & COSTS
  // =========================================================================
  if (
    q.includes('cost') || q.includes('price') || q.includes('pricing') ||
    q.includes('how much') || q.includes('rate') || q.includes('fee') ||
    q.includes('1500') || q.includes('97')
  ) {
    if (q.includes('97') || q.includes('month') || q.includes('maintenance') || q.includes('hosting')) {
      return {
        text: `Our monthly care is a flat $97/month with zero contracts. It includes enterprise cloud hosting, SSL certificates, daily backups, Google uptime monitoring, and routine text/photo updates with no hourly fees.\n\n${CALL_BOOKING_PUSH}`
      };
    }
    return {
      text: `Our turnkey contractor website is a flat $1,500 one-time build, followed by $97/month for hands-off hosting and maintenance.\n\nThat covers the entire build: custom mobile-first design, 5-7 day interactive phone prototype, dedicated trade pages, quote forms, click-to-call routing, Google SEO setup, and Google Business Profile optimization. Zero long-term contracts.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 17. TIMELINE / TURNAROUND / PROCESS / HOW LONG
  // =========================================================================
  if (
    q.includes('timeline') || q.includes('turnaround') || q.includes('how long') ||
    q.includes('how fast') || q.includes('process') || q.includes('steps') ||
    q.includes('prototype') || q.includes('duration')
  ) {
    return {
      text: `Our turnaround is 5 to 7 business days from our kickoff call to delivering an interactive phone prototype directly to your smartphone.\n\nYou review the speed, tap the buttons, check your photo galleries, and request any edits. Once you give 100% approval, we point your domain and launch.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 18. SEO, GOOGLE MAPS & RANKINGS
  // =========================================================================
  if (
    q.includes('seo') || q.includes('google') || q.includes('rank') ||
    q.includes('ranking') || q.includes('google maps') || q.includes('traffic') ||
    q.includes('maps') || q.includes('search engine')
  ) {
    return {
      text: `Every Propello build includes complete contractor SEO:\n• Local geo-targeted keywords mapped to your trade and city\n• Sub-second mobile page loads (Google Core Web Vitals optimized)\n• Schema.org structured data for LocalBusiness & Contractor services\n• Google Search Console setup and automated sitemap submission\n• Google Business Profile guidance to boost your Google Maps 3-Pack rankings.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 19. SPECIFIC TRADES
  // =========================================================================
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
    painter: "commercial and residential painting (interior, exterior spray, industrial coatings)",
    welding: "welding and structural steel fabrication (mobile welding, iron gates, structural steel)",
    welder: "welding and structural steel fabrication (mobile welding, iron gates, structural steel)",
    solar: "solar energy installation (residential rooftop, commercial arrays, battery storage)",
    flooring: "commercial and residential flooring (hardwood, epoxy, tile, polish)",
    framing: "structural framing and carpentry (residential framing, commercial timber)",
    demolition: "demolition and site clearance contractors"
  };

  for (const [key, tradeLabel] of Object.entries(tradeMatches)) {
    if (q.includes(key)) {
      return {
        text: `Yes, we build high-converting websites specifically for ${tradeLabel}.\n\nYour site will feature dedicated service pages, high-resolution before/after photo galleries, fast click-to-call buttons for mobile visitors, and localized SEO to attract commercial general contractors and property owners.\n\n${CALL_BOOKING_PUSH}`
      };
    }
  }

  // =========================================================================
  // 20. PAYMENT METHODS / CITIBANK / ACH / SAFETY
  // =========================================================================
  if (
    q.includes('payment') || q.includes('how do i pay') || q.includes('how to pay') ||
    q.includes('invoice') || q.includes('citibank') || q.includes('ach') ||
    q.includes('wire') || q.includes('credit card') || q.includes('card')
  ) {
    return {
      text: `We accept payments through official business banking via Citibank, supporting ACH direct transfers, domestic Wire transfers, and major credit cards. You receive an official itemized business invoice for your records.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 21. CONTRACTS / GUARANTEES / CANCELLATION
  // =========================================================================
  if (
    q.includes('contract') || q.includes('contracts') || q.includes('guarantee') ||
    q.includes('cancel') || q.includes('cancellation') || q.includes('refund') ||
    q.includes('risk')
  ) {
    return {
      text: `We operate with ZERO lock-in contracts. You can pause or cancel your $97/month hosting at any time without fees or penalties.\n\nFurthermore, you test and review your working interactive prototype on your smartphone before launch. We do not go live until you give 100% approval.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 22. WHY PROPELLO VS WIX / SQUARESPACE / OTHER AGENCIES
  // =========================================================================
  if (
    q.includes('wix') || q.includes('squarespace') || q.includes('wordpress') ||
    q.includes('diy') || q.includes('why choose') || q.includes('why propello') ||
    q.includes('why you') || q.includes('other agencies') || q.includes('competitors')
  ) {
    return {
      text: `DIY builders like Wix or Squarespace are slow, bloated on mobile, and rarely pass Google Core Web Vitals or rank for local contractor keywords. Traditional agencies charge $5,000–$10,000 and take 3 months.\n\nPropello gives contractors a high-converting, custom-engineered platform for a flat $1,500 with a 5-7 day smartphone prototype and zero maintenance headaches.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 23. GREETINGS & PLEASANTRIES
  // =========================================================================
  if (
    q === 'hi' || q === 'hello' || q === 'hey' || q === 'yo' || q === 'sup' ||
    q === 'good morning' || q === 'good afternoon' || q === 'good evening' ||
    q.startsWith('hello') || q.startsWith('hi ') || q.startsWith('hey ') ||
    q.includes('how are you') || q.includes('how r u')
  ) {
    return {
      text: `Hello! I'm Propello AI. We engineer custom, high-converting websites built exclusively for contractors and industrial trade specialists.\n\nEvery project includes an interactive phone prototype delivered in 5-7 days, a flat $1,500 build fee, and hands-off hosting at $97/month with zero contracts.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 24. THANKS / POLITE CLOSINGS
  // =========================================================================
  if (
    q === 'thanks' || q === 'thank you' || q.includes('thank you') ||
    q === 'cool' || q === 'awesome' || q === 'great' || q === 'perfect' ||
    q.includes('sounds great') || q.includes('sounds good')
  ) {
    return {
      text: `You're very welcome! If you'd like to see how we would structure a high-converting site for your trade, founder Mo Radford is always happy to connect.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 25. GENERAL RELEVANT WEBSITE & CONTRACTOR INQUIRIES
  // =========================================================================
  const isRelevantWebsiteQuestion =
    q.includes('website') || q.includes('propello') || q.includes('contractor') ||
    q.includes('build') || q.includes('service') || q.includes('offer') ||
    q.includes('features') || q.includes('how do you work') || q.includes('about') ||
    q.includes('work') || q.includes('trade') || q.includes('design') ||
    q.includes('online') || q.includes('leads') || q.includes('business') ||
    q.includes('help');

  if (isRelevantWebsiteQuestion) {
    return {
      text: `Propello builds custom, high-converting websites for industrial trades and specialty contractors for a flat $1,500 build and $97/month hosting and maintenance. We deliver a working prototype to your phone in 5-7 days and you keep 100% domain ownership.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 26. STRICTLY UNANSWERABLE / OUT-OF-SCOPE INQUIRY
  // User mandate: "If there is a response which it cannot answer, it should then
  // encourage that I don't have that information. I can only help with the
  // content on the website and how to reach Mo, and you will have to ask him that."
  // =========================================================================
  return {
    text: `I don't have that information. I can only help with the content on the website and how to reach Mo, and you will have to ask him that.\n\n${CALL_BOOKING_PUSH}`
  };
}
