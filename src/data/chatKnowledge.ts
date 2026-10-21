export interface KnowledgeResponse {
  text: string;
  nextSuggestions?: string[];
}

export interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

/**
 * Intelligent Conversational Engine
 * Emulates a sharp, calm, helpful Propello representative.
 * Maintains context, avoids canned templates, and tailors answers to the visitor's situation.
 */
export function getIntelligentReply(query: string, history: ChatHistoryItem[] = []): KnowledgeResponse {
  const q = query.toLowerCase().trim();
  const recentHistoryText = history.slice(-4).map(h => h.text.toLowerCase()).join(' ');

  // 1. BUYING INTENT / CONTACT / SPEAK TO SOMEONE
  if (
    q.includes("bank") ||
    q.includes("wire") ||
    q.includes("citibank") ||
    q.includes("routing") ||
    q.includes("swift") ||
    q.includes("account number") ||
    q.includes("ach") ||
    q.includes("payment detail") ||
    q.includes("transfer")
  ) {
    if (q.includes("ach") && q.includes("wire")) {
      return {
        text: "Both ACH and domestic U.S. wire (Fedwire) transfers are fully supported for Propello payments. Domestic wire transfers typically settle the same business day within hours, while ACH transfers typically settle within 1 to 3 business days. Note that payments must be sent from a business bank account (personal accounts cannot be accepted).",
        nextSuggestions: ["What is the routing number?", "Can I verify with Mo Radford?", "View full payment details"]
      };
    }
    if (q.includes("personal") || q.includes("business account")) {
      return {
        text: "Transfers can only be received from business bank accounts. Due to banking and accounting compliance, personal bank accounts are not accepted.",
        nextSuggestions: ["What methods are supported?", "How fast does domestic wire settle?", "Call Mo Radford"]
      };
    }
    return {
      text: "Propello receives client payments via Citibank through ACH or domestic U.S. wire (Fedwire) exclusively from business accounts. The beneficiary name is Auisha Jubeen (Checking Account), Bank: Citibank, Routing Number: 031100209, Account Number: 70580410002685339, SWIFT: CITIUS33, Bank Address: 111 Wall Street, New York, NY 10043, USA.\n\nYou can access our dedicated Payment Details page or call founder Mo Radford directly at +1 (409) 797-6986 if you'd like verbal verification.",
      nextSuggestions: ["How long does a wire take?", "Are personal accounts accepted?", "Call Mo Radford"]
    };
  }

  if (
    q.includes("talk to someone") || 
    q.includes("speak with someone") || 
    q.includes("call someone") || 
    q.includes("speak to a human") ||
    q.includes("talk to a person") ||
    q.includes("call mo") ||
    q.includes("mo radford") ||
    q.includes("phone number") ||
    q.includes("how do i get started") ||
    q.includes("how to get started") ||
    q.includes("ready to start") ||
    q.includes("can you build mine") ||
    q.includes("i want a website") ||
    q.includes("hire you") ||
    q.includes("sign up")
  ) {
    if (q.includes("how do i get started") || q.includes("how to get started") || q.includes("ready to start")) {
      return {
        text: "Getting started takes about 5 minutes. You jump on a quick call with founder Mo Radford to go over what your business does and what you need on the site. From there, we build an interactive prototype and send it to your phone in 48 hours.\n\nYou can reach Mo directly at +1 (409) 797-6986 or email mo.radford@propellonline.com whenever you're ready.",
        nextSuggestions: ["What info do you need on the call?", "How much does it cost?", "Can you redesign my existing site?"]
      };
    }
    return {
      text: "You can reach founder Mo Radford directly at +1 (409) 797-6986, or email mo.radford@propellonline.com. Mo handles every project personally from the first call through launch, so you won't be bounced between account managers.",
      nextSuggestions: ["How fast can you build it?", "How much is the build fee?", "What's the process?"]
    };
  }

  // 2. CONTEXTUAL FOLLOW-UPS (e.g. "Does that include hosting?", "What about the domain?")
  const discussedPricingRecently = recentHistoryText.includes("1,500") || recentHistoryText.includes("cost") || recentHistoryText.includes("price") || recentHistoryText.includes("97");
  
  if (
    (q.includes("does that include") || q.includes("is that included") || q.includes("included in that") || q.includes("include hosting")) &&
    discussedPricingRecently
  ) {
    return {
      text: "Yes, exactly. The $97/month covers enterprise cloud hosting, SSL certificates, daily automated backups, security monitoring, and unlimited text and photo updates whenever you need them. There are no surprise hosting bills or server fees.",
      nextSuggestions: ["What if I have my own domain?", "Are there contracts?", "How do I get started?"]
    };
  }

  if (
    (q.includes("what about the domain") || q.includes("is domain included") || q.includes("do i need a domain")) &&
    discussedPricingRecently
  ) {
    return {
      text: "If you already own your domain, you keep full ownership of it. We simply point your DNS records to our cloud servers when the site is ready to go live. If you don't have one yet, we can guide you on securing it in your own name so you always own it.",
      nextSuggestions: ["How fast do you build it?", "What if I already have an old site?", "Call Mo Radford"]
    };
  }

  // 3. WIX / SQUARESPACE / WORDPRESS / DIY COMPARISON
  if (
    q.includes("wix") || 
    q.includes("squarespace") || 
    q.includes("wordpress") || 
    q.includes("why should i use you") || 
    q.includes("why choose you") || 
    q.includes("vs wix") ||
    q.includes("do it myself") ||
    q.includes("build it myself")
  ) {
    return {
      text: "Wix and Squarespace are fine if you want to spend 40 hours of your own time learning layout tools, troubleshooting mobile formatting, and writing copy. But most business owners find DIY sites end up sluggish on phones, look cookie-cutter, and fail to turn visitors into phone calls.\n\nWith Propello, you spend 5 minutes on the phone. 48 hours later, you have a custom, lightning-fast site engineered specifically for your business that you didn't have to touch — plus ongoing updates handled for you whenever you need them.",
      nextSuggestions: ["How much does it cost?", "Can you redesign my current site?", "Can I see examples?"]
    };
  }

  // 4. EXISTING WEBSITE REDESIGN / HATE CURRENT SITE
  if (
    q.includes("already have a website") || 
    q.includes("hate my website") || 
    q.includes("hate how it looks") || 
    q.includes("redesign") || 
    q.includes("rebuild") || 
    q.includes("old website") || 
    q.includes("upgrade my website") || 
    q.includes("worth rebuilding")
  ) {
    if (q.includes("worth rebuilding") || q.includes("is it even worth")) {
      return {
        text: "Almost always, yes — especially if your current site is more than 3 or 4 years old. Websites from a few years ago are usually slow, hard to read on modern smartphones, and lack clear click-to-call actions. If potential customers land on an outdated site, they often assume the company is small, outdated, or inactive.\n\nA clean rebuild modernizes your reputation overnight without touching your existing business operations.",
        nextSuggestions: ["Can we keep my domain?", "What is the cost?", "How fast can you do it?"]
      };
    }

    return {
      text: "That’s actually what a large portion of our clients come to us for. You keep your domain name, and we carry over whatever branding, logos, or copy you like. Then we build a brand new, high-speed, mobile-first site from the ground up.\n\nYour existing site stays online until the new one is approved and ready, so you have zero downtime.",
      nextSuggestions: ["What if I already own my domain?", "How much does it cost?", "Can I see a preview first?"]
    };
  }

  // 5. DOMAIN QUESTIONS
  if (q.includes("domain") || q.includes("godaddy") || q.includes("namecheap") || q.includes("url") || q.includes("web address")) {
    return {
      text: "You retain 100% ownership of your domain. Whether it's registered through GoDaddy, Namecheap, Google Domains, or anywhere else, you keep it in your own account. When we're ready to launch, we connect it to our cloud servers via a quick DNS update. It takes about five minutes.",
      nextSuggestions: ["Does hosting cost extra?", "How much is the total build?", "How long does it take?"]
    };
  }

  // 6. SPECIFIC INDUSTRIES (Making the visitor feel seen)
  if (q.includes("roof") || q.includes("contractor") || q.includes("hvac") || q.includes("plumb") || q.includes("electric") || q.includes("construction") || q.includes("landscap")) {
    return {
      text: "For trades and contractors, the biggest priority is mobile performance. Homeowners and general contractors looking up your business on their phones need to see your licensing, previous project photos, and a clear tap-to-call button without digging through menus.\n\nWe structure contractor sites so that visitors can evaluate your work and request an estimate in under 30 seconds.",
      nextSuggestions: ["How fast can you build it?", "How much does it cost?", "Can we use photos from my phone?"]
    };
  }

  if (q.includes("dentist") || q.includes("dental") || q.includes("doctor") || q.includes("clinic") || q.includes("medical") || q.includes("healthcare") || q.includes("chiro")) {
    return {
      text: "Yes. Healthcare and dental websites need a calm, high-trust visual feel, clear provider bios, and frictionless appointment booking links. Patients decide within five seconds whether a clinic looks clean and modern or dated.\n\nWe build clean, accessible layouts that make it easy for new patients to find your location, hours, and booking options.",
      nextSuggestions: ["Can you integrate our booking system?", "What's the turnaround time?", "How much is it?"]
    };
  }

  if (q.includes("restaurant") || q.includes("bar") || q.includes("cafe") || q.includes("bakery") || q.includes("food") || q.includes("catering")) {
    return {
      text: "For restaurants, the number one frustration for diners is a website that forces them to download a blurry PDF menu. We build web-native menus that load instantly on smartphones, along with prominent reservation buttons and one-tap directions.\n\nEverything is formatted so hungry customers can view your dishes and book a table right away.",
      nextSuggestions: ["Can we update menu items easily?", "What does it cost?", "How fast can it be ready?"]
    };
  }

  if (q.includes("truck") || q.includes("freight") || q.includes("logistics") || q.includes("transport")) {
    return {
      text: "For trucking and logistics companies, credibility with shippers, brokers, and driver recruits is key. We build platforms that clearly display your MC/DOT credentials, fleet capabilities, service corridors, and streamlined driver application or freight quote forms.",
      nextSuggestions: ["How much is the build fee?", "How fast is delivery?", "Call Mo Radford"]
    };
  }

  if (q.includes("law") || q.includes("legal") || q.includes("attorney") || q.includes("firm")) {
    return {
      text: "Legal practices need an authoritative, professional presence that immediately conveys competence. We design clean practice-area breakdowns, attorney bios, and confidential intake forms that make it easy for prospective clients to reach out.",
      nextSuggestions: ["How does hosting and security work?", "What's the pricing?", "How soon can we start?"]
    };
  }

  if (q.includes("auto") || q.includes("wrap") || q.includes("ppf") || q.includes("tint") || q.includes("detail") || q.includes("mechanic")) {
    return {
      text: "We do a lot of work with automotive studios. For vehicle wraps, PPF, and detailing, visuals are everything. We build high-resolution gallery showcases, before-and-after comparison sliders, and service package calculators that turn car enthusiasts into scheduled appointments.",
      nextSuggestions: ["Can I see an example?", "How much is it?", "How fast can you build it?"]
    };
  }

  if (q.includes("industry") || q.includes("what types of business") || q.includes("who do you build for") || q.includes("can you build for")) {
    return {
      text: "We build for businesses across virtually every industry — restaurants, real estate, roofing, medical clinics, law firms, automotive shops, local trades, consulting, logistics, and more. The industry isn't the restriction. If your business needs a clean, high-performing website that turns visitors into phone calls, we can build it.",
      nextSuggestions: ["How much does it cost?", "How fast can I see a draft?", "How do we get started?"]
    };
  }

  // 7. PRICING & WHAT'S INCLUDED
  if (
    q.includes("price") || 
    q.includes("pricing") || 
    q.includes("cost") || 
    q.includes("fee") || 
    q.includes("how much") || 
    q.includes("1500") || 
    q.includes("97") || 
    q.includes("expensive") ||
    q.includes("why $1500") ||
    q.includes("why does your website cost")
  ) {
    if (q.includes("why") || q.includes("why does your website cost")) {
      return {
        text: "Most agencies charge between $5,000 and $10,000 upfront, take three months, and invoice you every time you need a phone number changed. On the other end, cheap $300 templates usually look broken on phones and break when plugins update.\n\nOur $1,500 build fee covers a fully custom, mobile-engineered website ready in 48 hours, and the $97/mo handles cloud hosting, security, and unlimited content updates so you never have to touch a line of code or hire a developer again.",
        nextSuggestions: ["Are there contracts?", "What if I want to cancel?", "How do I get started?"]
      };
    }

    return {
      text: "Our pricing is simple and transparent: exactly $1,500 one-time for the complete custom build, and $97/month for hands-off care. That monthly fee covers enterprise cloud hosting, SSL, daily backups, and unlimited text and image updates with zero contracts.",
      nextSuggestions: ["Are there any hidden fees?", "What if I have an existing domain?", "How fast is delivery?"]
    };
  }

  // 8. CONTRACTS / CANCELLATION
  if (q.includes("contract") || q.includes("cancel") || q.includes("lock") || q.includes("retainer") || q.includes("commitment") || q.includes("terms")) {
    return {
      text: "There are zero long-term contracts. You can pause or cancel the $97/month maintenance whenever you want without penalty. We don't believe in trapping clients in 12-month agreements — we earn your business month-to-month by keeping your site running cleanly.",
      nextSuggestions: ["What is included in the $97/month?", "What happens if I cancel?", "How do we start?"]
    };
  }

  // 9. PROCESS / TIMELINE / 48-HOUR PROTOTYPE / WHAT HAPPENS AFTER I PAY
  if (
    q.includes("what happens after i pay") || 
    q.includes("after payment") || 
    q.includes("what happens next") || 
    q.includes("what is the process") ||
    q.includes("how it works") ||
    q.includes("step")
  ) {
    return {
      text: "The process is straightforward:\n\n1. Quick 5-minute call with Mo Radford to outline your business, services, and target customers.\n2. Within 48 hours, we build and send an interactive live staging prototype directly to your phone.\n3. You click through it, test the speed, and give feedback. Once you approve, we connect your domain and launch.",
      nextSuggestions: ["How much is the build fee?", "Can I test it on my phone?", "Call Mo Radford"]
    };
  }

  if (q.includes("fast") || q.includes("timeline") || q.includes("how long") || q.includes("how soon") || q.includes("turnaround") || q.includes("days") || q.includes("prototype") || q.includes("draft")) {
    return {
      text: "We deliver an interactive live prototype to your smartphone within 48 hours of our initial call. You can open the link, test how fast it loads, tap the call buttons, and see how your business looks in real time before we finalize the launch.",
      nextSuggestions: ["What do you need from me?", "How much does it cost?", "Can you redesign my existing site?"]
    };
  }

  // 10. HOSTING / MAINTENANCE / REVISIONS / UPDATES
  if (q.includes("hosting") || q.includes("server") || q.includes("cloud") || q.includes("maintenance") || q.includes("update") || q.includes("edit") || q.includes("revision") || q.includes("change")) {
    return {
      text: "Hosting and continuous maintenance are all included in the $97/month plan. Whenever you want to update photos, add a new service, change hours, or swap staff bios, you just text or email us and we handle it. You never have to mess with WordPress logins, server panels, or plugin errors.",
      nextSuggestions: ["Are there contracts?", "How much is the initial build?", "Can we keep our domain?"]
    };
  }

  // 11. LOGOS / PHOTOS / CONTENT / COPYWRITING
  if (q.includes("logo") || q.includes("photo") || q.includes("picture") || q.includes("copy") || q.includes("content") || q.includes("text") || q.includes("write")) {
    if (q.includes("logo")) {
      return {
        text: "If you have an existing logo, we’ll integrate it seamlessly. If your current logo is low-resolution or you don't have one yet, we can polish it up or produce a crisp modern brand mark to match the new site.",
        nextSuggestions: ["What about photos of my work?", "How much is the build?", "How fast can you deliver?"]
      };
    }
    return {
      text: "If you have photos and text, great — we will polish and format them. If you don't, we can help write clean, punchy copy and source high-quality imagery appropriate for your industry so you don't have to write essays.",
      nextSuggestions: ["How fast is the turnaround?", "What's the pricing?", "How do I get started?"]
    };
  }

  // 12. EXAMPLES / PORTFOLIO / CASE STUDIES
  if (q.includes("example") || q.includes("portfolio") || q.includes("sample") || q.includes("case study") || q.includes("proof") || q.includes("work")) {
    return {
      text: "We’ve built platforms across dental practices (like Aura Dental), roofing and exterior contractors (Horizon Roofing), automotive styling shops (Apex Auto), legal practices (Mercer & Hayes), and hospitality venues. If you’d like to see live demos tailored to your specific field, give Mo Radford a quick call at +1 (409) 797-6986 and he can text you direct live preview links.",
      nextSuggestions: ["Can you build for my industry?", "How much does it cost?", "Call Mo Radford"]
    };
  }

  // 13. HESITANT / DON'T KNOW WHAT I WANT YET
  if (q.includes("don't know what i want") || q.includes("not sure") || q.includes("confused") || q.includes("help me decide")) {
    return {
      text: "That is completely normal. Most business owners don't want to become web designers — they just want a clean site that makes their business look established and gets phones ringing.\n\nMo can take a look at your current footprint and competitors, and outline a simple blueprint in 5 minutes.",
      nextSuggestions: ["How do I talk to Mo?", "How much does it cost?", "How fast is delivery?"]
    };
  }

  // 14. TECHNICAL / SEO / MOBILE
  if (q.includes("seo") || q.includes("google") || q.includes("speed") || q.includes("mobile") || q.includes("ranking") || q.includes("ssl") || q.includes("security")) {
    return {
      text: "Speed and mobile optimization are built directly into our core architecture. Every site is built with clean semantic code, SSL encryption, structured data for local search, and optimized asset delivery so it loads in under a second on cellular networks. Google prioritizes sites that load fast on mobile devices, which helps your local visibility.",
      nextSuggestions: ["Does hosting include SSL?", "What is the cost?", "How do we get started?"]
    };
  }

  // 15. DEFAULT CONVERSATIONAL RESPONSE
  return {
    text: `We build high-performing websites for businesses across all fields for a flat $1,500 setup and $97/month hands-off care (zero contracts). Within 48 hours of our first call, we deliver a live prototype directly to your phone.\n\nCould you tell me a bit about your business or what you're looking to improve with your current website?`,
    nextSuggestions: ["How much does it cost?", "Can you redesign my existing site?", "Can I talk to Mo Radford?"]
  };
}
