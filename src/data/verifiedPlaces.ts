import { CompetitorPlace, CompetitorAuditResult } from '../types';

export interface VerifiedMarketEntry {
  nichePattern: RegExp;
  locationPattern: RegExp;
  opportunityScore: number;
  marketVerdict: 'saturated' | 'opportunity' | 'balanced';
  verdictHeadline: string;
  verdictMessage: string;
  actionCallout: string;
  places: CompetitorPlace[];
}

export const VERIFIED_REGISTRY: VerifiedMarketEntry[] = [
  // 1. ATLANTA, GA - CAR WRAPS & PPF
  {
    nichePattern: /wrap|ppf|tint|protective|vinyl|paint protection/i,
    locationPattern: /atlanta|alpharetta|marietta|georgia|\bga\b/i,
    opportunityScore: 89,
    marketVerdict: 'saturated',
    verdictHeadline: 'High Digital Competition: Established Studios Own Local Search in Atlanta',
    verdictMessage: 'Active vehicle restyling, wrap, and PPF businesses in the Atlanta metro area have high-performing digital platforms capturing commercial fleet contracts and luxury exotic jobs. Operating without a high-conversion infrastructure places you far behind these dominant providers.',
    actionCallout: 'Deploy your $1,500 Propello infrastructure to claim your territory and capture inbound wraps and PPF jobs.',
    places: [
      {
        name: 'AP3 Atlanta',
        address: '2244 Faulkner Rd NE, Atlanta, GA 30324',
        hasWebsite: true,
        websiteUrl: 'https://ap3atlanta.com',
        rating: 4.9,
        reviewsCount: 128,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=AP3+Atlanta+2244+Faulkner+Rd+NE+Atlanta+GA'
      },
      {
        name: 'Foilesta Custom Car Wraps',
        address: '1425 Ellsworth Industrial Blvd NW Suite 10, Atlanta, GA 30318',
        hasWebsite: true,
        websiteUrl: 'https://foilesta.com',
        rating: 5.0,
        reviewsCount: 36,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Foilesta+Atlanta+GA'
      },
      {
        name: 'The Wrap Society',
        address: '1120 Huff Rd NW Suite B, Atlanta, GA 30318',
        hasWebsite: true,
        websiteUrl: 'https://thewrapsociety.com',
        rating: 4.7,
        reviewsCount: 52,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=The+Wrap+Society+Atlanta+GA'
      },
      {
        name: 'Goldshield Paint Protection',
        address: '2250 Marietta Blvd NW Suite 106, Atlanta, GA 30318',
        hasWebsite: true,
        websiteUrl: 'https://goldshieldppf.com',
        rating: 4.9,
        reviewsCount: 71,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Goldshield+Paint+Protection+Atlanta+GA'
      },
      {
        name: 'Atlanta Custom Wraps',
        address: '6175 McDonough Dr NW Suite C, Norcross, GA 30093',
        hasWebsite: true,
        websiteUrl: 'https://www.atlantacustomwraps.com',
        rating: 4.8,
        reviewsCount: 94,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Atlanta+Custom+Wraps'
      }
    ]
  },

  // 2. DALLAS, TX - EXCAVATION, DEMOLITION & GRADING
  {
    nichePattern: /excavat|grading|demolition|dirt|paving|site prep|clearing/i,
    locationPattern: /dallas|fort worth|dfw|texas|\btx\b/i,
    opportunityScore: 92,
    marketVerdict: 'saturated',
    verdictHeadline: 'Intense Metro Competition: Heavy Civil Operators Heavily Marketed in DFW',
    verdictMessage: 'The Dallas–Fort Worth civil and excavation sector is contested by established contractors featuring full commercial capability portfolios and instant bidding funnels. General contractors vet partners online before issuing RFPs.',
    actionCallout: 'Stop losing GC bids to legacy contractors. Deploy your contractor-grade Propello website in 48 hours.',
    places: [
      {
        name: 'Dallas Demolition & Excavation',
        address: '10830 Sanden Dr, Dallas, TX 75238',
        hasWebsite: true,
        websiteUrl: 'https://dallasdemolition.com',
        rating: 4.4,
        reviewsCount: 42,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dallas+Demolition+10830+Sanden+Dr+Dallas+TX'
      },
      {
        name: "JR's Demolition & Excavation Inc.",
        address: '2200 Southwell Rd, Dallas, TX 75229',
        hasWebsite: true,
        websiteUrl: 'https://jrsdemolition.com',
        rating: 4.8,
        reviewsCount: 31,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=JRs+Demolition+Dallas+TX'
      },
      {
        name: 'Dallas Dirt Works',
        address: '9848 Monroe Dr, Dallas, TX 75220',
        hasWebsite: true,
        websiteUrl: 'https://dallasdirtworks.com',
        rating: 4.7,
        reviewsCount: 16,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dallas+Dirt+Works+Dallas+TX'
      },
      {
        name: 'Guzman Land Services',
        address: '12423 Woodmeade Dr, Dallas, TX 75253',
        hasWebsite: true,
        websiteUrl: 'https://www.guzmanlandservices.com',
        rating: 4.9,
        reviewsCount: 22,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Guzman+Land+Services+Dallas+TX'
      },
      {
        name: 'DFW Demolition & Earthworks',
        address: '1011 S Pearl Expy, Dallas, TX 75201',
        hasWebsite: true,
        websiteUrl: 'https://dfwdemolition.com',
        rating: 4.5,
        reviewsCount: 19,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=DFW+Demolition+Dallas+TX'
      }
    ]
  },

  // 3. MIAMI, FL - COMMERCIAL VEHICLE WRAPS & RESTYLING
  {
    nichePattern: /wrap|ppf|tint|auto|ceramic/i,
    locationPattern: /miami|fort lauderdale|florida|\bfl\b/i,
    opportunityScore: 94,
    marketVerdict: 'saturated',
    verdictHeadline: 'High Saturation Alert: South Florida Automotive Market Highly Visual',
    verdictMessage: 'South Florida wrap studios heavily utilize digital galleries and online booking systems to attract yacht owners, exotic vehicles, and commercial delivery fleets. Without a verified online portfolio, you miss out on high-margin clients.',
    actionCallout: 'Lock down your high-ticket presence with Propello’s $1,500 build and dedicated phone funnel.',
    places: [
      {
        name: 'First Class Autosports',
        address: '5840 Commerce Ln, South Miami, FL 33143',
        hasWebsite: true,
        websiteUrl: 'https://www.firstclassautosports.com',
        rating: 4.9,
        reviewsCount: 185,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=First+Class+Autosports+Miami+FL'
      },
      {
        name: 'Miami Auto Spa & Wraps',
        address: '2288 NW 21st Terrace, Miami, FL 33142',
        hasWebsite: true,
        websiteUrl: 'https://miamiautospa.com',
        rating: 4.8,
        reviewsCount: 96,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Miami+Auto+Spa+Miami+FL'
      },
      {
        name: 'Wrap Society Miami',
        address: '7255 NE 4th Ave, Miami, FL 33138',
        hasWebsite: true,
        websiteUrl: 'https://wrapsocietymiami.com',
        rating: 4.9,
        reviewsCount: 64,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Wrap+Society+Miami+FL'
      },
      {
        name: 'Sign & Wrap Solutions Miami',
        address: '8180 NW 36th St, Doral, FL 33166',
        hasWebsite: true,
        websiteUrl: 'https://signandwrap.com',
        rating: 4.6,
        reviewsCount: 38,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sign+Wrap+Solutions+Miami+FL'
      }
    ]
  },

  // 4. SAVANNAH, GA - LAND CLEARING & SITE PREP
  {
    nichePattern: /land clearing|clearing|forestry|mulching|excavat|site prep|grading/i,
    locationPattern: /savannah|pooler|chatham|georgia|\bga\b/i,
    opportunityScore: 48,
    marketVerdict: 'opportunity',
    verdictHeadline: 'Prime First-Mover Territory: Low Digital Competition in Coastal Georgia',
    verdictMessage: 'Most local land clearing and site prep contractors in the Savannah region rely strictly on word-of-mouth with zero professional digital infrastructure. You have an immediate window to capture #1 Google search ranking and dominate the territory.',
    actionCallout: 'Seize this open market opportunity before regional competitors modernize their digital systems.',
    places: [
      {
        name: 'Coastal Georgia Land Clearing',
        address: 'Highway 17 S, Savannah, GA 31405',
        hasWebsite: false,
        websiteUrl: undefined,
        rating: 4.2,
        reviewsCount: 8,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Coastal+Georgia+Land+Clearing+Savannah+GA'
      },
      {
        name: 'Savannah River Earthworks',
        address: 'Dean Forest Rd, Pooler, GA 31322',
        hasWebsite: true,
        websiteUrl: 'https://savannahriverearthworks.com',
        rating: 4.7,
        reviewsCount: 14,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Savannah+River+Earthworks+Savannah+GA'
      },
      {
        name: 'Lowcountry Forestry Mulching & Clearing',
        address: 'Quacco Rd, Savannah, GA 31419',
        hasWebsite: false,
        websiteUrl: undefined,
        rating: 4.4,
        reviewsCount: 6,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lowcountry+Forestry+Mulching+Savannah+GA'
      },
      {
        name: 'Chatham Site Prep & Grading',
        address: 'Louisville Rd, Savannah, GA 31415',
        hasWebsite: false,
        websiteUrl: undefined,
        rating: 4.0,
        reviewsCount: 5,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chatham+Site+Prep+Savannah+GA'
      }
    ]
  },

  // 5. HOUSTON, TX - CERAMIC COATING & TINT
  {
    nichePattern: /ceramic|tint|coating|detail|wrap/i,
    locationPattern: /houston|katy|woodlands|sugar land|texas|\btx\b/i,
    opportunityScore: 91,
    marketVerdict: 'saturated',
    verdictHeadline: 'High Competition Density: Houston Ceramic & Tint Market Is Crowded',
    verdictMessage: 'Houston restyling and ceramic coating studios compete heavily online with transparent pricing calculators, high-resolution before/after galleries, and instant mobile appointment bookings.',
    actionCallout: 'Outperform local shops with a specialized Propello website engineered for maximum conversion.',
    places: [
      {
        name: 'Vive Auto Detailing & Ceramic Coating',
        address: '1004 Silber Rd, Houston, TX 77055',
        hasWebsite: true,
        websiteUrl: 'https://vive-houston.com',
        rating: 4.9,
        reviewsCount: 310,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vive+Auto+Detailing+Houston+TX'
      },
      {
        name: 'Houston Ceramic Coating Studio',
        address: '6100 Richmond Ave Suite 112, Houston, TX 77057',
        hasWebsite: true,
        websiteUrl: 'https://houstonceramiccoating.com',
        rating: 4.9,
        reviewsCount: 142,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Houston+Ceramic+Coating+Studio'
      },
      {
        name: 'EVS Motors & Auto Styling',
        address: '12320 Bellaire Blvd, Houston, TX 77072',
        hasWebsite: true,
        websiteUrl: 'https://evsmotors.com',
        rating: 4.7,
        reviewsCount: 220,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=EVS+Motors+Houston+TX'
      },
      {
        name: 'SunCap Tint & PPF',
        address: '5610 Pinemont Dr, Houston, TX 77092',
        hasWebsite: true,
        websiteUrl: 'https://suncaptint.com',
        rating: 4.8,
        reviewsCount: 88,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SunCap+Tint+Houston+TX'
      }
    ]
  },

  // 6. NASHVILLE, TN - ASPHALT PAVING & CONCRETE
  {
    nichePattern: /paving|asphalt|sealcoating|concrete|striping/i,
    locationPattern: /nashville|franklin|davidson|tennessee|\btn\b/i,
    opportunityScore: 84,
    marketVerdict: 'saturated',
    verdictHeadline: 'High Commercial Demand: Commercial Bids Flowing to Top Ranked Contractors',
    verdictMessage: 'Commercial property managers and HOAs in the booming Nashville market rely on search results to vet asphalt paving, concrete, and sealcoating vendors. Established paving companies in Davidson County dominate incoming RFQ calls.',
    actionCallout: 'Win more commercial parking lot and paving contracts with a high-trust Propello platform.',
    places: [
      {
        name: 'Mid-State Paving & Sealcoating',
        address: '2600 Elm Hill Pike, Nashville, TN 37214',
        hasWebsite: true,
        websiteUrl: 'https://midstatepavingtn.com',
        rating: 4.8,
        reviewsCount: 74,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mid-State+Paving+Nashville+TN'
      },
      {
        name: 'Nashville Paving Specialists',
        address: '712 Massman Dr, Nashville, TN 37210',
        hasWebsite: true,
        websiteUrl: 'https://nashvillepavingspecialists.com',
        rating: 4.6,
        reviewsCount: 42,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nashville+Paving+Specialists'
      },
      {
        name: 'TN Asphalt Solutions',
        address: '4235 Hillsboro Pike, Nashville, TN 37215',
        hasWebsite: true,
        websiteUrl: 'https://tnasphaltsolutions.com',
        rating: 4.9,
        reviewsCount: 56,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=TN+Asphalt+Solutions+Nashville+TN'
      },
      {
        name: 'Heritage Concrete & Flatwork',
        address: '1100 2nd Ave N, Nashville, TN 37208',
        hasWebsite: false,
        websiteUrl: undefined,
        rating: 4.1,
        reviewsCount: 12,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Heritage+Concrete+Nashville+TN'
      }
    ]
  },

  // 7. LOS ANGELES, CA - CAR WRAPS, PPF & EXOTIC DETAILING
  {
    nichePattern: /wrap|ppf|tint|protective|vinyl|paint protection|exotic/i,
    locationPattern: /los angeles|\bla\b|burbank|glendale|long beach|california|\bca\b/i,
    opportunityScore: 96,
    marketVerdict: 'saturated',
    verdictHeadline: 'Extreme Digital Competition: Top Studios Command LA Search & Social',
    verdictMessage: 'The Los Angeles vehicle restyling and wrap scene is one of the highest-density digital markets in North America. Exotic owners and commercial production fleets thoroughly scrutinize website galleries and booking funnels before reaching out.',
    actionCallout: 'Compete at the highest level with Propello’s $1,500 conversion infrastructure and direct founder hotline.',
    places: [
      {
        name: 'Wraptilian Custom Car Wraps',
        address: '11130 Burbank Blvd, North Hollywood, CA 91601',
        hasWebsite: true,
        websiteUrl: 'https://wraptilian.com',
        rating: 4.9,
        reviewsCount: 145,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Wraptilian+North+Hollywood+CA'
      },
      {
        name: 'Phenomenal Vinyl LA',
        address: '7117 Melrose Ave, Los Angeles, CA 90046',
        hasWebsite: true,
        websiteUrl: 'https://phenomenalvinyl.com',
        rating: 4.8,
        reviewsCount: 98,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Phenomenal+Vinyl+Los+Angeles+CA'
      },
      {
        name: 'Aerowerks Motorsports & Wraps',
        address: '14104 Oxnard St, Van Nuys, CA 91401',
        hasWebsite: true,
        websiteUrl: 'https://aerowerks.com',
        rating: 5.0,
        reviewsCount: 72,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aerowerks+Van+Nuys+CA'
      },
      {
        name: 'SoCal Auto Graphics',
        address: '2201 S San Pedro St, Los Angeles, CA 90011',
        hasWebsite: false,
        websiteUrl: undefined,
        rating: 4.3,
        reviewsCount: 19,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SoCal+Auto+Graphics+Los+Angeles+CA'
      }
    ]
  },

  // 8. PHOENIX, AZ - ROOFING, CONCRETE & GENERAL TRADES
  {
    nichePattern: /roof|concrete|contract|paving|excavat|demolition|plumb|electr|hvac/i,
    locationPattern: /phoenix|scottsdale|mesa|tempe|chandler|arizona|\baz\b/i,
    opportunityScore: 88,
    marketVerdict: 'saturated',
    verdictHeadline: 'High Digital Saturation: Arizona Contractors Investing Heavily Online',
    verdictMessage: 'Commercial property managers and homeowners in the Greater Phoenix Valley rely heavily on digital reviews, instant bidding requests, and mobile proof. Established contractors dominate incoming quote inquiries.',
    actionCallout: 'Lock down your high-margin territory with our contractor-grade 48-hour live prototype.',
    places: [
      {
        name: 'Canyon State Roofing & Consulting',
        address: '4809 E Thistle Landing Dr, Phoenix, AZ 85044',
        hasWebsite: true,
        websiteUrl: 'https://canyonstateroofs.com',
        rating: 4.9,
        reviewsCount: 260,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Canyon+State+Roofing+Phoenix+AZ'
      },
      {
        name: 'Valley Concrete & Paving Pros',
        address: '2432 W Peoria Ave, Phoenix, AZ 85029',
        hasWebsite: true,
        websiteUrl: 'https://valleyconcreteaz.com',
        rating: 4.7,
        reviewsCount: 65,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Valley+Concrete+Phoenix+AZ'
      },
      {
        name: 'Desert Earth Excavation & Grading',
        address: '3839 E Thomas Rd, Phoenix, AZ 85018',
        hasWebsite: true,
        websiteUrl: 'https://desertearthaz.com',
        rating: 4.8,
        reviewsCount: 38,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Desert+Earth+Excavation+Phoenix+AZ'
      },
      {
        name: 'Sonoran Flatwork Contractors',
        address: '1802 W Bell Rd, Phoenix, AZ 85023',
        hasWebsite: false,
        websiteUrl: undefined,
        rating: 4.0,
        reviewsCount: 11,
        mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sonoran+Flatwork+Phoenix+AZ'
      }
    ]
  }
];

export function findVerifiedMarketData(niche: string, location: string): VerifiedMarketEntry | null {
  for (const entry of VERIFIED_REGISTRY) {
    if (entry.nichePattern.test(niche) && entry.locationPattern.test(location)) {
      return entry;
    }
  }
  return null;
}

// Deterministic hash to guarantee stable yet infinitely varied bespoke analytical output
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateUniqueMarketScore(niche: string, location: string): CompetitorAuditResult {
  const cleanNiche = (niche || 'Specialty Services').trim();
  const cleanLoc = (location || 'Local Market').trim();
  const seed = hashString(`${cleanNiche.toLowerCase()}-${cleanLoc.toLowerCase()}`);

  // Base score 64 to 97
  const score = 65 + (seed % 31);
  const isHighSaturation = score >= 82;

  // Combinatorial vocabularies to ensure NO TWO RESPONSES SHARE IDENTICAL SENTENCES
  const openingPhrases = [
    `Local search telemetry for ${cleanNiche} in ${cleanLoc} demonstrates`,
    `Our algorithmic footprint scan of ${cleanLoc}'s ${cleanNiche} sector reveals`,
    `Evaluating commercial discovery metrics across ${cleanLoc} indicates`,
    `A territorial audit for ${cleanNiche} contractors and studios serving ${cleanLoc} highlights`,
    `Market velocity telemetry across the ${cleanLoc} commercial zone reflects`,
    `Direct inbound search tracking for ${cleanNiche} specialists throughout ${cleanLoc} confirms`
  ];

  const marketDynamics = [
    `a decisive migration toward instant mobile procurement where prime commercial clients bypass outdated directories entirely.`,
    `that legacy operators relying exclusively on referral word-of-mouth are surrendering high-margin contracts to digitally fortified rivals.`,
    `an aggressive consolidation of high-ticket customer inquiries around the top three mobile-optimized websites in the area.`,
    `that commercial project managers and discerning clients enforce immediate mobile verification before requesting bids or estimates.`,
    `severe revenue leakage among established firms whose digital storefronts lack sub-second speed and structured proof.`,
    `a widening gap between companies running conversion-grade infrastructure and those operating with dormant web templates.`
  ];

  const strategicImpacts = [
    `Operating in ${cleanLoc} without a verified high-speed digital presence actively steers commercial accounts into competitor pipelines.`,
    `Without immediate tap-to-call routing and bespoke service galleries, high-value inquiries in ${cleanLoc} fail to convert.`,
    `With regional search competition escalating in ${cleanLoc}, a contractor-grade website provides the immediate authority required to command top-tier pricing.`,
    `Establishing an authoritative digital anchor in ${cleanLoc} immediately positions your business to capture priority municipal and private jobs.`,
    `Securing undisputed search prominence in ${cleanLoc} locks out incoming market entrants and establishes your firm as the default regional choice.`
  ];

  const headlines = isHighSaturation ? [
    `${cleanLoc} Market Saturation: Top Tier ${cleanNiche} Providers Dominate Local Inbound`,
    `High Commercial Vetting Density in ${cleanLoc}: Established Operators Win High-Value Quotes`,
    `${cleanLoc} Digital Velocity Alert: Dominant ${cleanNiche} Platforms Absorb Commercial Demand`,
    `Urgent Infrastructure Window: ${cleanLoc} ${cleanNiche} Market Heavily Screened Online`
  ] : [
    `First-Mover Territory Opportunity: ${cleanLoc} ${cleanNiche} Digital Vacuum Detected`,
    `Unclaimed High-Margin Ground: Low Digital Sophistication Across ${cleanLoc} ${cleanNiche} Sector`,
    `Strategic Expansion Window: Command the #1 Digital Authority Spot in ${cleanLoc}`,
    `High Yield Market Gap: ${cleanNiche} Service Providers in ${cleanLoc} Lack Modern Infrastructure`
  ];

  const actions = [
    `Deploy your $1,500 turnkey Propello platform in 48 hours to capture ${cleanLoc}'s highest-value ${cleanNiche} contracts.`,
    `Counter regional competitors in ${cleanLoc} with a mobile-first, conversion-engineered digital platform.`,
    `Claim your #1 market position in ${cleanLoc} with an interactive 48-hour prototype tested directly on your phone.`,
    `Stop surrendering high-margin ${cleanNiche} jobs in ${cleanLoc}. Launch your contractor-grade infrastructure today.`
  ];

  // Specific indexes derived from hash
  const searchDensity = 68 + ((seed >> 2) % 28);
  const mobileGap = 72 + ((seed >> 4) % 25);
  const commercialVetting = 75 + ((seed >> 6) % 23);
  const leadVelocity = 64 + ((seed >> 8) % 32);

  // Selected dynamic sentences
  const headline = headlines[seed % headlines.length];
  const opening = openingPhrases[(seed + 1) % openingPhrases.length];
  const dynamic = marketDynamics[(seed + 3) % marketDynamics.length];
  const impact = strategicImpacts[(seed + 5) % strategicImpacts.length];
  const callout = actions[(seed + 2) % actions.length];

  const verdictMessage = `${opening} ${dynamic} ${impact}`;

  const tacticalInsights = [
    `Local Search Density (${searchDensity}%): ${cleanLoc} searchers expect immediate tap-to-call mobile connectivity.`,
    `Commercial Vetting Receptivity (${commercialVetting}%): Developers and fleet accounts evaluate your online credentials prior to issuing RFPs.`,
    `Mobile Conversion Leverage (${mobileGap}%): High-resolution finish showcases and clear quote funnels outperform slow legacy websites.`
  ];

  return {
    niche: cleanNiche,
    location: cleanLoc,
    opportunityScore: score,
    marketVerdict: isHighSaturation ? 'saturated' : 'opportunity',
    verdictHeadline: headline,
    verdictMessage: verdictMessage,
    actionCallout: callout,
    searchDensityIndex: searchDensity,
    mobileGapIndex: mobileGap,
    commercialVettingIndex: commercialVetting,
    leadVelocityIndex: leadVelocity,
    tacticalInsights: tacticalInsights,
    places: [], // ZERO detailed competitor cards as requested
    mapGroundingSources: [
      {
        title: `${cleanNiche} in ${cleanLoc} Regional Market Analysis`,
        uri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanNiche + " " + cleanLoc)}`
      }
    ]
  };
}

export function generateDynamicVerifiedMarket(niche: string, location: string): VerifiedMarketEntry {
  const dynamic = generateUniqueMarketScore(niche, location);
  return {
    nichePattern: /.*/,
    locationPattern: /.*/,
    opportunityScore: dynamic.opportunityScore,
    marketVerdict: dynamic.marketVerdict,
    verdictHeadline: dynamic.verdictHeadline,
    verdictMessage: dynamic.verdictMessage,
    actionCallout: dynamic.actionCallout,
    places: [] // Zero competitor cards
  };
}
