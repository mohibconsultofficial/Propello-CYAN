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
export const BACKUP_GMAIL = "mo.radford@propellonline.com";
export const TARGET_PHONE = "+1 (409) 797-6986";

export const CALL_BOOKING_PUSH = "Would you like to book a call with Mo directly, or shall I pull up our quick quote form?";

/**
 * Normalizes input text for natural language intent analysis:
 * - Converts to lower case
 * - Expands common colloquial contractions (wanna -> want to, gonna -> going to, etc.)
 * - Strips punctuation marks
 * - Normalizes redundant whitespace
 */
function normalizeQuery(input: string): string {
  let normalized = input.toLowerCase();

  // Normalize common spoken colloquialisms & chat contractions
  normalized = normalized
    .replace(/\bwanna\b/g, 'want to')
    .replace(/\bgonna\b/g, 'going to')
    .replace(/\bi'm\b/g, 'i am')
    .replace(/\bim\b/g, 'i am')
    .replace(/\bi'd\b/g, 'i would')
    .replace(/\bid\b/g, 'i would')
    .replace(/\bu\b/g, 'you')
    .replace(/\bur\b/g, 'your')
    .replace(/\br\b/g, 'are')
    .replace(/\bpls\b|\bplz\b/g, 'please')
    .replace(/\bthx\b|\btks\b/g, 'thanks');

  // Strip punctuation but keep word boundary spacing
  normalized = normalized
    .replace(/[?!.,;:"'’`\/\\()\-+@#$%^&*~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized;
}

/**
 * Comprehensive contractor niche lookup map
 */
const TRADE_MATCHES: Record<string, string> = {
  roof: "commercial and residential roofing contractors (shingle, TPO, metal, tile, roof coatings, leak repair)",
  roofing: "commercial and residential roofing contractors (shingle, TPO, metal, tile, roof coatings, leak repair)",
  roofer: "commercial and residential roofing contractors (shingle, TPO, metal, tile, roof coatings, leak repair)",
  electric: "licensed electrical contractors and commercial electricians (service panels, EV chargers, rewiring, commercial buildouts)",
  electrical: "licensed electrical contractors and commercial electricians (service panels, EV chargers, rewiring, commercial buildouts)",
  electrician: "licensed electrical contractors and commercial electricians (service panels, EV chargers, rewiring, commercial buildouts)",
  plumb: "master plumbing and mechanical contractors (drain cleaning, water heaters, repiping, emergency commercial plumbing)",
  plumbing: "master plumbing and mechanical contractors (drain cleaning, water heaters, repiping, emergency commercial plumbing)",
  plumber: "master plumbing and mechanical contractors (drain cleaning, water heaters, repiping, emergency commercial plumbing)",
  hvac: "heating, air conditioning, and ventilation contractors (system replacements, heat pumps, commercial maintenance agreements)",
  air: "heating, air conditioning, and ventilation contractors (system replacements, heat pumps, commercial maintenance agreements)",
  heating: "heating, air conditioning, and ventilation contractors (system replacements, heat pumps, commercial maintenance agreements)",
  ac: "heating, air conditioning, and ventilation contractors (system replacements, heat pumps, commercial maintenance agreements)",
  concrete: "concrete contractors (flatwork, driveways, foundations, commercial slabs, stamped patios, retaining footings)",
  cement: "concrete contractors (flatwork, driveways, foundations, commercial slabs, stamped patios, retaining footings)",
  excavat: "excavation, grading, and site preparation contractors (dirt work, land clearing, trenching, pad construction)",
  excavation: "excavation, grading, and site preparation contractors (dirt work, land clearing, trenching, pad construction)",
  dirt: "dirt work, grading, and site excavation contractors",
  grading: "grading, earthwork, and site preparation contractors",
  remodel: "general remodeling and home improvement contractors (kitchens, bathrooms, full-home additions, commercial interiors)",
  remodeling: "general remodeling and home improvement contractors (kitchens, bathrooms, full-home additions, commercial interiors)",
  renovation: "renovation and restoration contractors",
  landscap: "landscape design, hardscaping, and outdoor living contractors (patios, irrigation, retaining walls, commercial turf)",
  landscaping: "landscape design, hardscaping, and outdoor living contractors (patios, irrigation, retaining walls, commercial turf)",
  hardscap: "hardscaping, stone work, and retaining wall contractors",
  fence: "fence installation contractors (wood privacy, ornamental iron, chain link, agricultural ranch fencing)",
  fencing: "fence installation contractors (wood privacy, ornamental iron, chain link, agricultural ranch fencing)",
  deck: "deck builders and outdoor structure specialists (composite decking, covered porches, pergolas, docks)",
  gutter: "gutter installation and drainage specialists (seamless aluminum gutters, gutter guards, downspout extensions)",
  paint: "commercial and residential painting contractors (interior, exterior spray, industrial coatings)",
  painting: "commercial and residential painting contractors (interior, exterior spray, industrial coatings)",
  painter: "commercial and residential painting contractors (interior, exterior spray, industrial coatings)",
  tree: "tree service and arborists (emergency removals, trimming, crane work, stump grinding)",
  paving: "asphalt paving, sealcoating, and line striping contractors",
  asphalt: "asphalt paving, sealcoating, and parking lot maintenance contractors",
  demolition: "commercial and residential demolition and site teardown contractors",
  pool: "custom swimming pool builders and pool renovation specialists",
  masonry: "brick, stone, and masonry restoration contractors",
  drywall: "sheetrock, drywall hanging, finishing, and texture contractors",
  insulation: "spray foam and attic insulation contractors",
  siding: "siding installation contractors (Hardie board, vinyl, LP SmartSide, exterior wrapping)",
  solar: "residential and commercial solar installation contractors",
  welding: "mobile welding and custom steel fabrication specialists",
  general: "licensed general contractors and commercial construction managers"
};

/**
 * Intelligent Standalone Natural Language Semantic Knowledge Engine for Propello AI
 * - Works 100% standalone and offline without requiring API keys or third-party servers.
 * - Handles arbitrary user phrasings, slang, and intents with multi-signal matching.
 * - Drives visitors directly toward booking calls with Mo Radford or opening the quick quote form.
 */
export function getIntelligentReply(query: string, history: ChatHistoryItem[] = []): KnowledgeResponse {
  const rawQ = query.trim();
  const q = normalizeQuery(rawQ);
  const words = q.split(' ').filter(Boolean);

  // Analyze conversational context from previous turn
  const previousBotTexts = history
    .filter((h) => h.sender === 'bot')
    .map((h) => h.text.toLowerCase());
  const lastBotMessage = previousBotTexts[previousBotTexts.length - 1] || '';

  const hasOfferedForm =
    lastBotMessage.includes('quote form') ||
    lastBotMessage.includes('review your specs') ||
    lastBotMessage.includes('book a call') ||
    lastBotMessage.includes('pull up our quick quote form');

  // =========================================================================
  // 1. DIRECT AFFIRMATION OR REJECTION OF PROMPTED ACTION
  // =========================================================================
  const directAffirmations = [
    'yes', 'sure', 'yeah', 'yep', 'ok', 'okay', 'definitely', 'sounds good',
    'open it', 'open quote', 'lets do it', 'let us do it', 'go ahead', 'please do',
    'fill form', 'send quote', 'get quote', 'ready', 'open form', 'quote please',
    'yes please', 'do that', 'pull it up', 'start', 'i want a quote', 'quote form',
    'request quote', 'give me a quote', 'i want quote', 'open the form', 'bring it up',
    'show me the form', 'show form', 'let me fill it', 'let me quote'
  ];

  const isAffirmative = directAffirmations.some((phrase) => {
    return q === phrase || q.startsWith(phrase + ' ') || q.endsWith(' ' + phrase) || q.includes(` ${phrase} `);
  });

  if (hasOfferedForm && (isAffirmative || q.includes('quote') || q.includes('form') || q.includes('pull up') || q === 'yes' || q === 'sure' || q === 'ok')) {
    return {
      text: `Pulling up our quote request form right below! Drop in your name, contact phone, and trade details—founder Mo Radford receives it directly at ${TARGET_EMAIL} and will follow up promptly.`,
      triggerQuoteForm: true
    };
  }

  // Declining form or call gracefully
  if (
    hasOfferedForm &&
    (q === 'no' || q === 'not yet' || q === 'nope' || q.includes('no thanks') || q.includes('not right now') || q.includes('later') || q === 'nah' || q.includes('dont want'))
  ) {
    return {
      text: `No problem at all! What else can I answer for you regarding our turnaround, SEO, or trade websites? You can also call or text Mo directly anytime at ${TARGET_PHONE}.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 2. HIGH-INTENT PURCHASING / BUYING / ORDERING / STARTING A PROJECT
  // (e.g. "I wanna buy", "ready to purchase", "sign me up", "how do I buy",
  //  "let's build a website", "take my money", "where do I pay", "hire you")
  // =========================================================================
  const hasBuyKeyword =
    words.includes('buy') ||
    words.includes('purchase') ||
    words.includes('order') ||
    words.includes('hire') ||
    words.includes('checkout') ||
    q.includes('want to buy') ||
    q.includes('wanna buy') ||
    q.includes('ready to buy') ||
    q.includes('can i buy') ||
    q.includes('how do i buy') ||
    q.includes('where do i buy') ||
    q.includes('want to purchase') ||
    q.includes('ready to purchase') ||
    q.includes('sign me up') ||
    q.includes('sign up') ||
    q.includes('place an order') ||
    q.includes('hire you') ||
    q.includes('hire propello') ||
    q.includes('hire mo') ||
    q.includes('take my money') ||
    q.includes('pay for website') ||
    q.includes('pay to start') ||
    q.includes('start a project') ||
    q.includes('start project') ||
    q.includes('start my website') ||
    q.includes('build my website') ||
    q.includes('build me a website') ||
    q.includes('make me a website') ||
    q.includes('need a website') ||
    q.includes('want a website') ||
    q.includes('get a website') ||
    q.includes('create my website') ||
    q.includes('build a site') ||
    q.includes('need a site') ||
    q.includes('want your services') ||
    q.includes('ready to start') ||
    q.includes('ready to go') ||
    q.includes('let us do it') ||
    q.includes('lets do it') ||
    q.includes('let us build') ||
    q.includes('lets build') ||
    q.includes('want to work with you') ||
    q.includes('work together');

  if (hasBuyKeyword) {
    return {
      text: `Let's make it happen! Starting your contractor website with Propello is direct and straightforward:\n\n1. Quick Kickoff: Submit our 30-second quote form right below, or call founder Mo Radford directly.\n2. Live Prototype in 5–7 Days: We engineer a custom, high-converting design tailored to your trade and deliver a live interactive prototype directly to your smartphone.\n3. Approval & Launch: You test the speed and buttons on your phone. Only once you give 100% approval do we connect your domain, configure Google SEO, and deploy.\n\nEverything is included for a flat $1,500 build fee and $97/month hosting with zero long-term contracts.\n\nOpening our quick quote form below so you can drop in your details, or feel free to call Mo directly at ${TARGET_PHONE}!`,
      triggerQuoteForm: true
    };
  }

  // =========================================================================
  // 3. EXPLICIT QUOTE / ESTIMATE / FORM REQUESTS
  // =========================================================================
  const isQuoteRequest =
    q === 'quote' ||
    q.includes('open quote') ||
    q.includes('get a quote') ||
    q.includes('request a quote') ||
    q.includes('request quote') ||
    q.includes('give me a quote') ||
    q.includes('send a quote') ||
    q.includes('send quote') ||
    q.includes('open the form') ||
    q.includes('open form') ||
    q.includes('pull up form') ||
    q.includes('pull up the form') ||
    q.includes('fill out form') ||
    q.includes('quote form') ||
    q.includes('get quote') ||
    q.includes('estimate') ||
    q.includes('proposal') ||
    q.includes('how much for a quote');

  if (isQuoteRequest) {
    return {
      text: `Opening our quick quote form right below! Fill in your details and founder Mo Radford will review your project specs directly.`,
      triggerQuoteForm: true
    };
  }

  // =========================================================================
  // 4. BOOKING / HOW TO BOOK / SCHEDULING / GETTING STARTED
  // =========================================================================
  const isBookingQuery =
    q.includes('book') ||
    q.includes('booking') ||
    q.includes('schedule') ||
    q.includes('onboarding') ||
    q.includes('how to start') ||
    q.includes('how do i start') ||
    q.includes('how do we start') ||
    q.includes('how to get started') ||
    q.includes('how do i get started') ||
    q.includes('next steps') ||
    q.includes('how do we work') ||
    q.includes('process');

  if (isBookingQuery && !q.includes('who is') && !q.includes('price')) {
    return {
      text: `Booking with Propello is direct and simple:\n\n1. Quick Kickoff: Connect directly with founder Mo Radford via phone/text at ${TARGET_PHONE}, or submit our quick quote form right here.\n2. Interactive Phone Prototype: We engineer a custom, mobile-first design for your trade and deliver a live prototype to your smartphone in 5 to 7 days.\n3. Approval & Launch: You test the speed, tap the buttons, and approve the build before we point your domain and deploy full Google SEO.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 5. PRICING / COSTS / PACKAGES / WHAT IS THE PRICE
  // =========================================================================
  const isPricingQuery =
    words.includes('price') ||
    words.includes('pricing') ||
    words.includes('cost') ||
    words.includes('costs') ||
    words.includes('rate') ||
    words.includes('rates') ||
    words.includes('fee') ||
    words.includes('fees') ||
    q.includes('how much') ||
    q.includes('what do you charge') ||
    q.includes('what does it cost') ||
    q.includes('package') ||
    q.includes('retainer') ||
    q.includes('hidden fees') ||
    q.includes('expensive') ||
    q.includes('affordable') ||
    q.includes('cheap') ||
    q.includes('1500') ||
    q.includes('97');

  if (isPricingQuery) {
    return {
      text: `We keep our pricing completely transparent with zero hidden fees:\n\n• Turnkey Custom Build: Exactly $1,500 one-time setup fee. Includes custom trade design, 5-7 day smartphone prototype, dedicated service pages, project photo gallery, click-to-call mobile buttons, and complete local Google SEO setup.\n• Ongoing Care & Enterprise Cloud Hosting: $97/month with ZERO contracts. Pause or cancel anytime without penalty. Includes daily backups, 99.9% uptime monitoring, SSL certificate, and unlimited text/photo updates whenever you need.\n• Domain Ownership: You retain 100% legal ownership of your domain and code at all times.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 6. OWNER / FOUNDER / MO RADFORD / WHO CREATED YOU
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
    words.includes('ceo') ||
    words.includes('founder') ||
    q === 'mo' ||
    q === 'mo radford';

  if (isOwnerQuery) {
    return {
      text: `Propello is founded and owned by Mo Radford. He is a contractor digital infrastructure specialist who runs the agency personally and works directly with trade contractors on every project from kickoff to launch.\n\nMo can be reached directly at:\n• Direct Phone / Text: ${TARGET_PHONE}\n• Direct Email: ${TARGET_EMAIL}\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 7. WHAT DO YOU SELL / WHAT DO YOU DO / SERVICES & OFFERINGS
  // =========================================================================
  const isServicesQuery =
    q.includes('what do you sell') ||
    q.includes('what do u sell') ||
    q.includes('what do you do') ||
    q.includes('what do u do') ||
    q.includes('what is propello') ||
    q.includes('what are your services') ||
    q.includes('what services') ||
    q.includes('what products') ||
    q.includes('what do you offer') ||
    q.includes('what do u offer') ||
    q.includes('what do you provide') ||
    q.includes('what is this') ||
    q.includes('tell me what you do') ||
    q.includes('what can you do for me') ||
    q.includes('contractor websites') ||
    q.includes('features');

  if (isServicesQuery) {
    return {
      text: `We engineer custom, high-converting websites built exclusively for industrial trades and specialty contractors (roofers, electricians, HVAC, plumbers, concrete, excavation, and remodelers).\n\nEvery project includes:\n• Mobile-first custom design & interactive smartphone prototype delivered in 5–7 days\n• Complete local contractor SEO & Google Maps optimization\n• Flat $1,500 turnkey build fee with 100% domain ownership\n• $97/month hands-off cloud hosting with zero contracts\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 8. HOW TO CALL / CONTACT / PHONE / SPEAK TO A HUMAN
  // =========================================================================
  const isContactQuery =
    words.includes('call') ||
    words.includes('phone') ||
    words.includes('telephone') ||
    words.includes('cell') ||
    words.includes('email') ||
    words.includes('contact') ||
    q.includes('reach mo') ||
    q.includes('call mo') ||
    q.includes('text mo') ||
    q.includes('how to call') ||
    q.includes('can i call') ||
    q.includes('phone number') ||
    q.includes('what is the number') ||
    q.includes('speak to human') ||
    q.includes('talk to human') ||
    q.includes('talk to a person') ||
    q.includes('real person') ||
    q.includes('speak to mo') ||
    q.includes('talk to mo') ||
    q.includes('representative');

  if (isContactQuery) {
    return {
      text: `You can reach founder Mo Radford directly:\n\n• Direct Phone / Text: ${TARGET_PHONE}\n• Direct Email: ${TARGET_EMAIL}\n\nMo handles contractor accounts personally—no junior account managers or call center delays. Would you like to call Mo now, or shall I pull up our quick quote form?`
    };
  }

  // =========================================================================
  // 9. LOCATION / TEXAS / CITIES / SERVICE AREA / NATIONWIDE
  // =========================================================================
  const isLocationQuery =
    words.includes('texas') ||
    words.includes('tx') ||
    words.includes('houston') ||
    words.includes('dallas') ||
    words.includes('austin') ||
    words.includes('dfw') ||
    q.includes('san antonio') ||
    q.includes('fort worth') ||
    q.includes('beaumont') ||
    q.includes('location') ||
    q.includes('located') ||
    q.includes('where are you') ||
    q.includes('where is propello') ||
    q.includes('service area') ||
    q.includes('service in') ||
    q.includes('near me') ||
    q.includes('nationwide') ||
    q.includes('canada');

  if (isLocationQuery) {
    return {
      text: `Propello is based in Texas (409 area code) and proudly services trade and specialty contractors throughout Texas (Houston, DFW, Austin, San Antonio, Beaumont, and statewide) as well as across the United States and Canada.\n\nEvery site we build is tailored to your local service area radius, with localized contractor SEO to ensure you rank for high-value residential and commercial jobs in your market.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 10. TIMELINE / TURNAROUND / HOW FAST / PROTOTYPE
  // =========================================================================
  const isTimelineQuery =
    q.includes('turnaround') ||
    q.includes('timeline') ||
    q.includes('how long') ||
    q.includes('how fast') ||
    q.includes('timeframe') ||
    q.includes('how many days') ||
    q.includes('delivery') ||
    q.includes('when will it be ready') ||
    q.includes('5 to 7 days') ||
    q.includes('5-7 days') ||
    words.includes('prototype');

  if (isTimelineQuery) {
    return {
      text: `We deliver a working interactive prototype directly to your smartphone in just 5 to 7 days once scope and project materials are confirmed.\n\nYou review the layout, tap the buttons, and test the speed on your own phone before launch. We don't go live until you give 100% approval.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 11. DOMAIN & OWNERSHIP
  // =========================================================================
  const isDomainQuery =
    words.includes('domain') ||
    words.includes('godaddy') ||
    words.includes('namecheap') ||
    q.includes('who owns') ||
    q.includes('do i own') ||
    q.includes('ownership') ||
    q.includes('source code') ||
    q.includes('assets') ||
    q.includes('keep my domain') ||
    q.includes('my domain');

  if (isDomainQuery) {
    return {
      text: `You retain 100% legal ownership of your domain name, website code, and digital assets at all times. We never hold your domain hostage. You can connect an existing domain (GoDaddy, Namecheap, Google, etc.) or we can help you register a new one.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 12. HOSTING & ONGOING MAINTENANCE
  // =========================================================================
  const isHostingQuery =
    words.includes('hosting') ||
    words.includes('maintenance') ||
    words.includes('updates') ||
    words.includes('edits') ||
    words.includes('changes') ||
    words.includes('backups') ||
    words.includes('security') ||
    words.includes('ssl') ||
    words.includes('uptime') ||
    q.includes('can i edit') ||
    q.includes('change photos') ||
    q.includes('make changes');

  if (isHostingQuery) {
    return {
      text: `Our $97/month hands-off care & hosting package includes:\n\n• Enterprise cloud hosting with 99.9% uptime\n• SSL certificate security and automated daily backups\n• Unlimited ongoing updates: whenever you need new photos, service changes, or text edits, just call or text us\n• Zero lock-in contracts: pause or cancel anytime without penalty\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 13. LOCAL CONTRACTOR SEO & GOOGLE MAPS
  // =========================================================================
  const isSeoQuery =
    words.includes('seo') ||
    words.includes('google') ||
    words.includes('ranking') ||
    words.includes('rank') ||
    words.includes('keywords') ||
    words.includes('leads') ||
    words.includes('traffic') ||
    q.includes('google maps') ||
    q.includes('search console') ||
    q.includes('business profile') ||
    q.includes('commercial gcs') ||
    q.includes('general contractors');

  if (isSeoQuery) {
    return {
      text: `Every website includes full Google SEO optimization built right in:\n\n• Trade-specific keyword research for your exact city and service radius\n• High-performance meta titles, descriptions, and schema markup for contractors\n• Google Search Console setup and XML sitemap indexing\n• Google Business Profile guidance so local property owners and commercial general contractors find you first\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 14. SPECIFIC CONTRACTOR TRADES / NICHES
  // =========================================================================
  for (const [key, tradeLabel] of Object.entries(TRADE_MATCHES)) {
    if (q.includes(key)) {
      return {
        text: `Yes! We engineer high-converting websites specifically for ${tradeLabel}.\n\nYour site will feature dedicated service pages, high-resolution project photo galleries, rapid click-to-call mobile buttons, and localized SEO to attract commercial general contractors and local property owners.\n\n${CALL_BOOKING_PUSH}`
      };
    }
  }

  // =========================================================================
  // 15. PAYMENT METHODS / CITIBANK / ACH / SECURITY
  // =========================================================================
  const isPaymentQuery =
    words.includes('payment') ||
    words.includes('citibank') ||
    words.includes('ach') ||
    words.includes('wire') ||
    words.includes('invoice') ||
    q.includes('how do i pay') ||
    q.includes('how to pay') ||
    q.includes('credit card') ||
    q.includes('card');

  if (isPaymentQuery) {
    return {
      text: `We accept payments through official business banking via Citibank, supporting ACH direct transfers, domestic Wire transfers, and major credit cards. You receive an official itemized business invoice for your records.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 16. ZERO CONTRACTS / CANCELLATION / GUARANTEES
  // =========================================================================
  const isContractQuery =
    words.includes('contract') ||
    words.includes('contracts') ||
    words.includes('cancel') ||
    words.includes('cancellation') ||
    words.includes('guarantee') ||
    words.includes('refund') ||
    words.includes('risk') ||
    q.includes('lock in');

  if (isContractQuery) {
    return {
      text: `We operate with ZERO lock-in contracts. You can pause or cancel your $97/month hosting at any time without fees or penalties.\n\nFurthermore, you test and review your working interactive prototype on your smartphone before launch. We do not go live until you give 100% approval.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 17. WHY PROPELLO VS DIY BUILDERS (Wix, Squarespace, other agencies)
  // =========================================================================
  const isComparisonQuery =
    words.includes('wix') ||
    words.includes('squarespace') ||
    words.includes('wordpress') ||
    words.includes('diy') ||
    q.includes('why choose') ||
    q.includes('why propello') ||
    q.includes('why you') ||
    q.includes('other agencies') ||
    q.includes('competitors');

  if (isComparisonQuery) {
    return {
      text: `DIY builders like Wix or Squarespace are slow, bloated on mobile, and rarely pass Google Core Web Vitals or rank for local contractor keywords. Traditional agencies charge $5,000–$10,000 and take 3 months.\n\nPropello gives contractors a high-converting, custom-engineered platform for a flat $1,500 with a 5-7 day smartphone prototype and zero maintenance headaches.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 18. FACTS / STATS / ABOUT PROPELLO
  // =========================================================================
  const isFactsQuery =
    q.includes('facts') ||
    q.includes('stats') ||
    q.includes('tell me about you') ||
    q.includes('tell me about propello') ||
    q.includes('what do you know') ||
    q.includes('tell me more');

  if (isFactsQuery) {
    return {
      text: `Here are key facts about Propello:\n\n• Exclusively Trade-Focused: We only build for contractors and specialty trades—no generic templates or corporate fluff.\n• Texas Roots, Nationwide Reach: Founded and run by Mo Radford out of Texas (409 area code), serving trade contractors across Texas and nationwide.\n• Rapid Smartphone Delivery: We deliver a live, interactive phone prototype in 5 to 7 days so you can test speed and tap buttons on your own device before paying for hosting.\n• Transparent Pricing: Exactly $1,500 upfront build fee + $97/month hands-off hosting with zero lock-in contracts.\n• 100% Client Ownership: Unlike agencies that hold domains hostage, you keep full legal ownership of your domain and assets at all times.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 19. GREETINGS & PLEASANTRIES
  // =========================================================================
  const isGreeting =
    q === 'hi' || q === 'hello' || q === 'hey' || q === 'yo' || q === 'sup' ||
    q === 'good morning' || q === 'good afternoon' || q === 'good evening' ||
    q.startsWith('hello') || q.startsWith('hi ') || q.startsWith('hey ') ||
    q.includes('how are you') || q.includes('how r u');

  if (isGreeting) {
    return {
      text: `Hello! I'm Propello AI. We engineer custom, high-converting websites built exclusively for contractors and industrial trade specialists.\n\nEvery project includes an interactive phone prototype delivered in 5-7 days, a flat $1,500 build fee, and hands-off hosting at $97/month with zero contracts.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // Thanks & polite acknowledgments
  const isThanks =
    words.includes('thanks') ||
    words.includes('thank') ||
    q.includes('thank you') ||
    q === 'cool' || q === 'awesome' || q === 'great' || q === 'perfect' ||
    q.includes('sounds great') || q.includes('sounds good');

  if (isThanks) {
    return {
      text: `You're very welcome! If you'd like to see how we would structure a high-converting site for your trade, founder Mo Radford is always happy to connect.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 20. GENERAL CONTRACTOR & WEBSITE INQUIRIES
  // (Catch-all for anything related to websites, trades, leads, building, online)
  // =========================================================================
  const isGeneralWebsiteQuery =
    words.includes('website') ||
    words.includes('site') ||
    words.includes('propello') ||
    words.includes('contractor') ||
    words.includes('contractors') ||
    words.includes('build') ||
    words.includes('service') ||
    words.includes('offer') ||
    words.includes('work') ||
    words.includes('trade') ||
    words.includes('design') ||
    words.includes('online') ||
    words.includes('leads') ||
    words.includes('business') ||
    words.includes('help');

  if (isGeneralWebsiteQuery) {
    return {
      text: `Propello builds custom, high-converting websites for industrial trades and specialty contractors for a flat $1,500 build and $97/month hosting and maintenance. We deliver a working prototype to your phone in 5-7 days and you keep 100% domain ownership.\n\n${CALL_BOOKING_PUSH}`
    };
  }

  // =========================================================================
  // 21. STRICT OUT-OF-SCOPE BOUNDARY
  // Only triggered when a query is genuinely unrelated to Propello, contractor
  // websites, trades, Mo, pricing, or our business (e.g. trivia, weather, cooking)
  // =========================================================================
  return {
    text: `I don't have that information. I can only help with the content on the website and how to reach Mo, and you will have to ask him that.\n\n${CALL_BOOKING_PUSH}`
  };
}
