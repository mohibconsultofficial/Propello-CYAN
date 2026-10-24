export interface KnowledgeResponse {
  text: string;
  nextSuggestions?: string[];
}

export interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

/**
 * Intelligent Conversational Engine for Propello AI
 * Grounded in verified contractor web specifications, clear $1,500 turnkey offer,
 * $97/month hosting and maintenance, and prototype review workflow.
 */
export function getIntelligentReply(query: string, history: ChatHistoryItem[] = []): KnowledgeResponse {
  const q = query.toLowerCase().trim();
  const recentHistoryText = history.slice(-4).map(h => h.text.toLowerCase()).join(' ');

  // 1. GETTING STARTED & SPEAKING WITH FOUNDER
  if (
    q.includes("talk to someone") || 
    q.includes("speak with someone") || 
    q.includes("call someone") || 
    q.includes("speak to a human") ||
    q.includes("talk to a person") ||
    q.includes("call mo") ||
    q.includes("mo radford") ||
    q.includes("phone number") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("how do i get started") ||
    q.includes("how to get started") ||
    q.includes("ready to start") ||
    q.includes("schedule") ||
    q.includes("book") ||
    q.includes("consultation")
  ) {
    if (q.includes("book") || q.includes("schedule") || q.includes("consultation") || q.includes("appointment")) {
      return {
        text: "You can schedule a 5-minute consultation directly through the 'Consult' button in the chat header, or call founder Mo Radford directly at +1 (409) 797-6986. You can also email mo.radford@propellonline.com anytime.\n\nWe'll cover your trade, core services, and what you need on the site.",
        nextSuggestions: ["Request consultation now", "What's included in the $1,500 build?", "Call Mo directly: +1 (409) 797-6986"]
      };
    }

    if (q.includes("email")) {
      return {
        text: "You can email founder Mo Radford directly at mo.radford@propellonline.com, or call +1 (409) 797-6986. Mo personally reviews and replies to all contractor inquiries.",
        nextSuggestions: ["What is the pricing?", "How does the prototype review work?", "Call Mo Radford"]
      };
    }

    return {
      text: "Getting started takes about 5 minutes. You jump on a quick call with founder Mo Radford to go over your trade, core services, and project photos. From there, we agree on scope and build an interactive staging prototype directly for your review before launch.\n\nYou can reach Mo directly at +1 (409) 797-6986 or email mo.radford@propellonline.com.",
      nextSuggestions: ["What's included in the package?", "How much does it cost?", "Can you redesign my existing site?"]
    };
  }

  // 2. PRICING & INCLUSIONS ($1,500 + $97/mo)
  if (
    q.includes("cost") ||
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("how much") ||
    q.includes("fee") ||
    q.includes("included") ||
    q.includes("package") ||
    q.includes("deliverables")
  ) {
    if (q.includes("97") || q.includes("monthly") || q.includes("maintenance") || q.includes("hosting")) {
      return {
        text: "The $97/month ongoing service covers high-speed enterprise cloud hosting, automated daily backups, SSL certificate upkeep, security monitoring, technical support, and routine website updates (such as updating photos, services, phone numbers, or text whenever you need). There are zero lock-in contracts; you can pause or cancel anytime.",
        nextSuggestions: ["What is the initial $1,500 setup?", "Do I own my domain?", "Schedule a consultation"]
      };
    }

    return {
      text: "Our complete contractor website package is exactly $1,500 one-time setup, followed by $97/month for hands-off hosting and maintenance.\n\nThe package includes:\n• Custom mobile-friendly website with individual service pages\n• Project portfolio / past work gallery\n• Quote-request & contact forms\n• Tap-to-call & text buttons\n• Complete Google SEO setup (keyword research, titles, meta tags, sitemap, Search Console)\n• Google Business Profile optimization\n• Professional brand kit (logo treatment, typography, colors)\n• Full technical testing, domain DNS setup, and launch.\n\nThere are zero contracts or surprise agency invoices.",
      nextSuggestions: ["What does the $97/mo cover?", "How does the prototype review work?", "Book a 5-minute consultation"]
    };
  }

  // 3. PROTOTYPE REVIEW / PROCESS / TIMELINE
  if (
    q.includes("process") ||
    q.includes("timeline") ||
    q.includes("turnaround") ||
    q.includes("how long") ||
    q.includes("prototype") ||
    q.includes("review") ||
    q.includes("steps") ||
    q.includes("how it works")
  ) {
    return {
      text: "Our process is clear and collaborative:\n\n1. Discovery: A 5-minute call with Mo Radford to confirm your services, target areas, and project photos.\n2. Prototype: We build an interactive staging prototype and deliver it directly to your phone for review before launch.\n3. Revisions & Launch: You test the speed and layout on your phone. Once approved, we connect your domain, activate SSL, submit your sitemap to Google, and manage ongoing updates.",
      nextSuggestions: ["Do I own my domain?", "What's included in the $1,500 build?", "Call Mo Radford"]
    };
  }

  // 4. CONTRACTOR NICHES / TRADES
  if (
    q.includes("roof") ||
    q.includes("contractor") ||
    q.includes("plumb") ||
    q.includes("hvac") ||
    q.includes("electric") ||
    q.includes("landscape") ||
    q.includes("paving") ||
    q.includes("excavat") ||
    q.includes("remodel") ||
    q.includes("concrete") ||
    q.includes("paint") ||
    q.includes("trade") ||
    q.includes("industry")
  ) {
    return {
      text: "Yes, we specialize in websites built specifically for contractors and trades—including commercial and residential roofing, HVAC, electrical, plumbing, general contracting, excavation, landscaping, concrete, and remodeling.\n\nWe structure individual pages for your highest-margin services and optimize them so property managers and homeowners searching locally can evaluate your capabilities and request estimates directly.",
      nextSuggestions: ["Can you show an example?", "What is the complete pricing?", "Discuss my project"]
    };
  }

  // 5. EXISTING WEBSITES / REDESIGNS
  if (q.includes("redesign") || q.includes("existing") || q.includes("current website") || q.includes("have a website") || q.includes("old site")) {
    return {
      text: "We frequently rebuild outdated, slow, or poorly converting websites for contractors. If you already have a domain and brand assets, you keep 100% ownership of your domain. We rebuild a modern, mobile-first website, and when approved, we simply update the DNS records to point to our high-speed cloud infrastructure with zero downtime.",
      nextSuggestions: ["How much is the rebuild?", "How does prototype review work?", "Call Mo Radford"]
    };
  }

  // 6. DOMAIN OWNERSHIP & HOSTING
  if (q.includes("domain") || q.includes("godaddy") || q.includes("namecheap") || q.includes("own the website") || q.includes("hosting")) {
    return {
      text: "You retain 100% ownership of your domain name at all times (registered wherever you prefer, such as GoDaddy, Namecheap, or Google Domains). When launching, we simply point your DNS records to our secure cloud servers. Hosting, daily backups, and SSL security upkeep are fully included in the $97/month service.",
      nextSuggestions: ["What is included in the $1,500 build?", "How do I get started?", "Schedule a consultation"]
    };
  }

  // 7. SEO & GOOGLE BUSINESS PROFILE
  if (q.includes("seo") || q.includes("google") || q.includes("search") || q.includes("ranking") || q.includes("maps") || q.includes("local")) {
    return {
      text: "Every build includes complete technical and local SEO setup:\n• Keyword research tailored to your local service cities\n• Custom page titles and meta descriptions for every service\n• Image compression and ALT tags for past project photos\n• XML sitemap generation and Google Search Console property verification\n• Google Business Profile alignment for Google Maps discovery.\n\nWe build clean, search-engine accessible platforms that make it easy for local customers to discover you.",
      nextSuggestions: ["What's the pricing?", "Do you handle social media?", "Discuss my project"]
    };
  }

  // 8. WHY PROPELLO VS DIY (WIX / SQUARESPACE / WORDPRESS)
  if (q.includes("wix") || q.includes("squarespace") || q.includes("wordpress") || q.includes("diy") || q.includes("myself") || q.includes("why choose")) {
    return {
      text: "Contractors choose Propello because DIY platforms like Wix or Squarespace take dozens of hours of trial-and-error, usually look like generic templates, load sluggishly on mobile, and fail to convince general contractors. Traditional agencies charge $5,000 to $10,000 upfront and take months.\n\nPropello gives you a custom-engineered contractor website for a flat $1,500, a working prototype to review on your phone, and ongoing maintenance for $97/mo so you never have to mess with software, plugins, or broken layouts again.",
      nextSuggestions: ["What's included in the $1,500 package?", "How do I get started?", "Call Mo Radford"]
    };
  }

  // DEFAULT CONTEXTUAL FALLBACK
  return {
    text: "We engineer high-performance websites for contractors and trade specialists for a flat $1,500 one-time build and $97/month ongoing hosting and care (no long-term contracts). We deliver an interactive prototype directly to your phone for review before launch.\n\nWould you like to know more about what's included in the build, or discuss your specific trade and project?",
    nextSuggestions: [
      "What's included in the $1,500 package?",
      "How does prototype review work?",
      "Schedule a 5-minute consultation",
      "Call founder Mo Radford: +1 (409) 797-6986"
    ]
  };
}
