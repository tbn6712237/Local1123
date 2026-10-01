export type UserRole = 'business' | 'creator';
export type Language = 'vi' | 'en' | 'ko';

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  views: string;
  engagement: string;
  platform: 'TikTok' | 'Instagram';
  thumbnailUrl?: string;
  caption?: string;
  videoDuration?: string;
  savesCount?: string;
}

export interface CreatorCapability {
  id: string;
  name: string;
  level: string;
  description: string;
  icon?: string;
}

export interface CreatorEquipment {
  category: string;
  items: string[];
}

export interface AudienceDemographics {
  ageGroups: { range: string; percent: number }[];
  gender: { female: number; male: number };
  topLocations: { city: string; percent: number }[];
  purchasingHabits: string;
}

export interface CreatorCaseStudy {
  id: string;
  brandName: string;
  brandLogo?: string;
  campaignTitle: string;
  date: string;
  deliverables: string;
  results: {
    views: string;
    saves: string;
    redemptions: number;
    highlight: string;
  };
  quote?: string;
}

export interface CreatorServicePackage {
  id: string;
  name: string;
  price: number;
  priceDisplay: string;
  turnaroundDays: number;
  revisions: number;
  features: string[];
  isRecommended?: boolean;
}

export interface CreatorPolicies {
  advanceBookingDays: number;
  exclusivityCommitment: string;
  adUsageRights: string;
  cancellationNotice: string;
}

export interface CategoryFit {
  category: string;
  matchScore: number;
  note: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorRole: 'business' | 'creator';
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  criteria: {
    label: string;
    score: number;
  }[];
}

export interface Creator {
  id: string;
  username: string;
  name: string;
  avatar: string;
  niche: string;
  location: string;
  distanceKm: number;
  followers: number;
  followersDisplay: string;
  averageViews: number;
  averageViewsDisplay: string;
  engagementRate: number;
  platforms: ('TikTok' | 'Instagram')[];
  ratePerVideo: number;
  rateDisplay: string;
  rating: number;
  completionRate: number;
  responseRate: number;
  previousCollabsCount: number;
  bio: string;
  badges: string[];
  portfolio: CreatorPortfolioItem[];
  reviews: ReviewItem[];
  aiReason?: string;
  lat: number;
  lng: number;
  // Professional Expansion Fields for Thorough Business Evaluation:
  capabilities?: CreatorCapability[];
  equipment?: CreatorEquipment[];
  audienceDemographics?: AudienceDemographics;
  caseStudies?: CreatorCaseStudy[];
  packages?: CreatorServicePackage[];
  policies?: CreatorPolicies;
  categoryFits?: CategoryFit[];
  contentStyleTags?: string[];
  avgTurnaroundHours?: number;
}

export interface FilmingSpot {
  name: string;
  description: string;
  photoUrl?: string;
  bestAngle?: string;
}

export interface SignatureItem {
  id: string;
  name: string;
  price: string;
  image?: string;
  isHero?: boolean;
  highlight: string;
  flavorNotes?: string;
}

export interface FilmingConditions {
  bestLightingHours: string;
  noiseLevel: string;
  filmingSpots: FilmingSpot[];
  amenities: string[];
  recommendedVisitTime: string;
}

export interface CreatorPerks {
  complimentaryMenu: string;
  plusOneAllowed: boolean;
  plusOnePerk: string;
  cashBudgetRange: string;
  welcomeContact: string;
}

export interface BrandStory {
  concept: string;
  philosophy: string;
  targetAudience: string;
  avgCustomerSpend: string;
}

export interface CreatorGuidelines {
  contentTone: string;
  reviewTurnaroundHours: number;
  dos: string[];
  donts: string[];
}

export interface PastCreatorCollab {
  creatorName: string;
  creatorAvatar?: string;
  campaignTitle: string;
  platform: 'TikTok' | 'Instagram';
  views: string;
  engagement: string;
  quote: string;
}

export interface ExclusiveFanOffer {
  codeTemplate: string;
  discount: string;
  staffTrained: boolean;
}

export interface OperationalInfo {
  openingHours: string;
  parkingDetails: string;
  hotline: string;
  managerName?: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  distanceKm: number;
  rating: number;
  reviewsCount: number;
  description: string;
  verified: boolean;
  responseRate: number;
  completedCollabs: number;
  image: string;
  logo?: string;
  photos?: string[];
  badges: string[];
  lat: number;
  lng: number;
  reviews: ReviewItem[];
  about: string;
  // Professional Venue Evaluation fields for Creators:
  filmingConditions?: FilmingConditions;
  creatorPerks?: CreatorPerks;
  signatureItems?: SignatureItem[];
  brandStory?: BrandStory;
  creatorGuidelines?: CreatorGuidelines;
  pastCollabs?: PastCreatorCollab[];
  fanOffer?: ExclusiveFanOffer;
  operationalInfo?: OperationalInfo;
}

export interface Campaign {
  id: string;
  businessId: string;
  title: string;
  category: string;
  location: string;
  distanceKm: number;
  budgetMin: number;
  budgetMax: number;
  budgetDisplay: string;
  paymentType: 'Cash' | 'Cash + Perks' | 'Product Exchange';
  creatorType: string;
  followerRange: string;
  platform: 'TikTok' | 'Instagram' | 'Multi-platform';
  deliverables: string;
  deadline: string;
  numberCreators: number;
  brief: string;
  status: 'active' | 'completed' | 'draft';
  isSponsored?: boolean;
  createdAt: string;
  aiReason?: string;
}

export interface OfferHistoryItem {
  id: string;
  sender: 'business' | 'creator';
  senderName: string;
  amount: number;
  perks?: string;
  note: string;
  timestamp: string;
  status: 'pending' | 'countered' | 'accepted' | 'declined';
}

export interface BookingDetails {
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed';
  notes?: string;
}

export interface ContentSubmission {
  videoUrl: string;
  deliverableType: string;
  captionDraft: string;
  submittedAt: string;
  status: 'pending_review' | 'revision_requested' | 'approved';
  revisionNote?: string;
}

export interface PaymentDetails {
  grossAmount: number;
  platformFee: number;
  netCreatorAmount: number;
  status: 'escrowed' | 'released';
  releasedAt?: string;
}

export interface CollaborationMatch {
  id: string;
  businessId: string;
  creatorId: string;
  campaignId: string;
  status: 
    | 'matched'
    | 'negotiating'
    | 'offer_accepted'
    | 'visit_booked'
    | 'content_submitted'
    | 'content_approved'
    | 'payment_released'
    | 'completed';
  createdAt: string;
  offers: OfferHistoryItem[];
  agreedAmount?: number;
  agreedPerks?: string;
  booking?: BookingDetails;
  submission?: ContentSubmission;
  payment?: PaymentDetails;
  businessReviewed?: boolean;
  creatorReviewed?: boolean;
  promoCode?: string;
  promoCodeUses?: number;
  chatMessages: {
    id: string;
    senderId: string;
    senderRole: 'business' | 'creator';
    text: string;
    timestamp: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'match' | 'offer' | 'booking' | 'content' | 'payment' | 'review' | 'general';
  linkMatchId?: string;
}

export interface CampaignAnalytics {
  campaignId: string;
  campaignTitle: string;
  totalViews: number;
  totalViewsDisplay: string;
  engagementCount: number;
  engagementDisplay: string;
  clicks: number;
  promoCodeUses: number;
  estimatedConversions: number;
  completionRate: number;
  participatingCreators: number;
  creatorBreakdowns: {
    creatorId: string;
    creatorName: string;
    username: string;
    views: number;
    engagement: number;
    promoUses: number;
    status: string;
  }[];
}
