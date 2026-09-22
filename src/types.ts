export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  websiteType?: string;
  capturedAt: string;
  status: 'new' | 'contacted' | 'approved';
}

export interface Review {
  id: string;
  authorName: string;
  authorPhotoUrl: string;
  rating: number; // 1-5
  text: string;
  relativeTimeDescription: string;
  publishTime: string;
  isFake?: boolean; // We are showing demo customizable aspects
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedReplies?: string[];
  isLeadForm?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isMain: boolean;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CompetitorPlace {
  name: string;
  address: string;
  hasWebsite: boolean;
  websiteUrl?: string;
  mapsUrl?: string;
  rating?: number;
  reviewsCount?: number;
  phone?: string;
  sourceUri?: string;
}

export interface CompetitorAuditResult {
  niche: string;
  location: string;
  totalFound?: number;
  withWebsites?: number;
  withoutWebsites?: number;
  opportunityScore: number; // 0 to 100 Opportunity / Urgency Score
  marketVerdict: 'saturated' | 'opportunity' | 'balanced';
  verdictHeadline: string;
  verdictMessage: string;
  actionCallout: string;
  searchDensityIndex?: number;
  mobileGapIndex?: number;
  commercialVettingIndex?: number;
  leadVelocityIndex?: number;
  tacticalInsights?: string[];
  places?: CompetitorPlace[];
  mapGroundingSources?: { title: string; uri: string }[];
}
