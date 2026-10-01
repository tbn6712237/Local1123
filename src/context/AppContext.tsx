import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Business, 
  Creator, 
  Campaign, 
  CollaborationMatch, 
  NotificationItem, 
  CampaignAnalytics, 
  OfferHistoryItem 
} from '../types';
import { 
  INITIAL_BUSINESSES, 
  INITIAL_CREATORS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_MATCHES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ANALYTICS 
} from '../data/initialData';

interface MatchCelebrationData {
  show: boolean;
  match?: CollaborationMatch;
  creator?: Creator;
  business?: Business;
  campaign?: Campaign;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeBusiness: Business;
  activeCreator: Creator;
  currentView: string;
  setCurrentView: (view: string) => void;
  businesses: Business[];
  creators: Creator[];
  campaigns: Campaign[];
  matches: CollaborationMatch[];
  notifications: NotificationItem[];
  analytics: CampaignAnalytics;
  likes: Record<string, boolean>;
  activeMatchId: string | null;
  setActiveMatchId: (id: string | null) => void;
  viewingCreatorId: string | null;
  setViewingCreatorId: (id: string | null) => void;
  viewingBusinessId: string | null;
  setViewingBusinessId: (id: string | null) => void;
  viewingCampaignId: string | null;
  setViewingCampaignId: (id: string | null) => void;
  matchCelebration: MatchCelebrationData;
  setMatchCelebration: React.Dispatch<React.SetStateAction<MatchCelebrationData>>;
  showCreateCampaignModal: boolean;
  setShowCreateCampaignModal: (show: boolean) => void;
  showProModal: boolean;
  setShowProModal: (show: boolean) => void;
  showDisputeModal: boolean;
  setShowDisputeModal: (show: boolean) => void;
  showNotificationDrawer: boolean;
  setShowNotificationDrawer: (show: boolean) => void;
  showDemoWalkthrough: boolean;
  setShowDemoWalkthrough: (show: boolean) => void;
  showNewbieModal: boolean;
  setShowNewbieModal: (show: boolean) => void;
  showLanding: boolean;
  setShowLanding: (show: boolean) => void;
  lang: 'vi' | 'en' | 'ko';
  setLang: (lang: 'vi' | 'en' | 'ko') => void;
  createNewbieProfile: (type: 'business' | 'creator', entity: Business | Creator, campaign?: Campaign) => void;
  
  // Actions
  likeCreator: (creatorId: string) => string;
  passCreator: (creatorId: string) => void;
  likeCampaign: (campaignId: string) => string;
  passCampaign: (campaignId: string) => void;
  createCampaign: (data: Partial<Campaign>) => void;
  sendOffer: (matchId: string, amount: number, perks?: string, note?: string) => void;
  acceptOffer: (matchId: string, offerId: string) => void;
  declineOffer: (matchId: string, offerId: string) => void;
  bookVisit: (matchId: string, date: string, time: string, guests: number, notes?: string) => void;
  submitContent: (matchId: string, videoUrl: string, deliverableType: string, captionDraft: string) => void;
  approveContent: (matchId: string) => void;
  requestRevision: (matchId: string, revisionNote: string) => void;
  releasePayment: (matchId: string) => void;
  submitReview: (matchId: string, rating: number, criteria: { label: string; score: number }[], comment: string) => void;
  sendChatMessage: (matchId: string, text: string) => void;
  markNotificationsAsRead: () => void;
  resetDemoData: () => void;
  jumpToScenarioStep: (stepNumber: number) => void;
}

const STORAGE_KEY = 'collablocal_mock_store_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('business');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  
  // Storage state with fallback
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_biz_v2');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
    } catch {
      return INITIAL_BUSINESSES;
    }
  });

  const [creators, setCreators] = useState<Creator[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_creators_v3');
      return saved ? JSON.parse(saved) : INITIAL_CREATORS;
    } catch {
      return INITIAL_CREATORS;
    }
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  const [matches, setMatches] = useState<CollaborationMatch[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_matches');
      return saved ? JSON.parse(saved) : INITIAL_MATCHES;
    } catch {
      return INITIAL_MATCHES;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_notifs');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [analytics, setAnalytics] = useState<CampaignAnalytics>(INITIAL_ANALYTICS);

  const [likes, setLikes] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_likes');
      if (saved) return JSON.parse(saved);
    } catch {}
    // default: Luna Coffee liked @linhfoodie
    return {
      'biz-luna_creator-linh': true
    };
  });

  // Modal and navigation states
  const [activeMatchId, setActiveMatchId] = useState<string | null>('match-demo-luna');
  const [viewingCreatorId, setViewingCreatorId] = useState<string | null>(null);
  const [viewingBusinessId, setViewingBusinessId] = useState<string | null>(null);
  const [viewingCampaignId, setViewingCampaignId] = useState<string | null>(null);
  const [matchCelebration, setMatchCelebration] = useState<MatchCelebrationData>({ show: false });
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState<boolean>(false);
  const [showProModal, setShowProModal] = useState<boolean>(false);
  const [showDisputeModal, setShowDisputeModal] = useState<boolean>(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState<boolean>(false);
  const [showDemoWalkthrough, setShowDemoWalkthrough] = useState<boolean>(false);
  const [showNewbieModal, setShowNewbieModal] = useState<boolean>(false);
  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [lang, setLang] = useState<'vi' | 'en' | 'ko'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_lang');
      if (saved === 'vi' || saved === 'en' || saved === 'ko') return saved;
    } catch {}
    return 'vi';
  });
  const [activeBusinessId, setActiveBusinessId] = useState<string>('biz-luna');
  const [activeCreatorId, setActiveCreatorId] = useState<string>('creator-linh');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_biz_v2', JSON.stringify(businesses));
      localStorage.setItem(STORAGE_KEY + '_creators_v3', JSON.stringify(creators));
      localStorage.setItem(STORAGE_KEY + '_campaigns', JSON.stringify(campaigns));
      localStorage.setItem(STORAGE_KEY + '_matches', JSON.stringify(matches));
      localStorage.setItem(STORAGE_KEY + '_notifs', JSON.stringify(notifications));
      localStorage.setItem(STORAGE_KEY + '_likes', JSON.stringify(likes));
      localStorage.setItem(STORAGE_KEY + '_lang', lang);
    } catch (e) {
      console.warn('Storage quota or error', e);
    }
  }, [businesses, creators, campaigns, matches, notifications, likes, lang]);

  const activeBusiness = businesses.find(b => b.id === activeBusinessId) || businesses[0];
  const activeCreator = creators.find(c => c.id === activeCreatorId) || creators[0];

  const createNewbieProfile = (type: 'business' | 'creator', entity: Business | Creator, campaign?: Campaign) => {
    if (type === 'business') {
      const biz = entity as Business;
      setBusinesses(prev => [biz, ...prev]);
      setActiveBusinessId(biz.id);
      if (campaign) {
        setCampaigns(prev => [campaign, ...prev]);
      }
      setRoleState('business');
      setCurrentView('dashboard');
      addNotification({
        title: 'Chào Mừng Doanh Nghiệp Mới!',
        message: `Hồ sơ "${biz.name}" và chiến dịch đã được khởi tạo thành công trên hệ thống.`,
        type: 'general'
      });
    } else {
      const cr = entity as Creator;
      setCreators(prev => [cr, ...prev]);
      setActiveCreatorId(cr.id);
      setRoleState('creator');
      setCurrentView('dashboard');
      addNotification({
        title: 'Chào Mừng Creator Mới!',
        message: `Hồ sơ "${cr.username}" của bạn đã sẵn sàng nhận hợp tác và hiển thị trên bản đồ.`,
        type: 'general'
      });
    }
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setCurrentView('dashboard');
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...notif,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [item, ...prev]);
  };

  const likeCreator = (creatorId: string): string => {
    const bizId = activeBusiness.id;
    const key = `${bizId}_${creatorId}`;
    setLikes(prev => ({ ...prev, [key]: true }));

    // Check if creator also liked any of this business's campaigns
    const businessCampaignIds = campaigns.filter(c => c.businessId === bizId).map(c => c.id);
    const creatorLikesBiz = businessCampaignIds.some(cId => likes[`${creatorId}_${cId}`]);

    const targetCreator = creators.find(c => c.id === creatorId);
    let existingMatch = matches.find(m => m.businessId === bizId && m.creatorId === creatorId);
    let matchIdToReturn = existingMatch ? existingMatch.id : '';

    if (!existingMatch) {
      const campaign = campaigns.find(c => c.businessId === bizId) || campaigns[0];
      const newMatchId = `match-${Date.now()}`;
      existingMatch = {
        id: newMatchId,
        businessId: bizId,
        creatorId: creatorId,
        campaignId: campaign.id,
        status: 'matched',
        createdAt: new Date().toISOString(),
        offers: [
          {
            id: `off-${Date.now()}`,
            sender: 'business',
            senderName: activeBusiness.name,
            amount: 600000,
            perks: 'Complimentary pour-over flight + pastry of choice',
            note: `Hi ${targetCreator?.name || 'there'}! We loved your profile and would love to collaborate.`,
            timestamp: 'Just now',
            status: 'pending'
          }
        ],
        promoCode: (targetCreator?.username.replace('@', '').toUpperCase() || 'PROMO') + '10',
        promoCodeUses: 0,
        chatMessages: [
          {
            id: `msg-${Date.now()}`,
            senderId: bizId,
            senderRole: 'business',
            text: `Hello ${targetCreator?.name}! Excited to connect for our upcoming campaign.`,
            timestamp: 'Just now'
          }
        ]
      };
      setMatches(prev => [existingMatch!, ...prev]);
      matchIdToReturn = newMatchId;
    }

    if (creatorLikesBiz || creatorId === 'creator-linh') {
      const campaign = campaigns.find(c => c.id === existingMatch?.campaignId) || campaigns[0];
      setMatchCelebration({
        show: true,
        match: existingMatch,
        creator: targetCreator,
        business: activeBusiness,
        campaign
      });

      addNotification({
        title: 'New Match!',
        message: `You matched with ${targetCreator?.username} for ${campaign.title}!`,
        type: 'match',
        linkMatchId: existingMatch.id
      });
    } else {
      addNotification({
        title: 'Offer Sent / Creator Liked',
        message: `You expressed interest in collaborating with ${targetCreator?.username}.`,
        type: 'general'
      });
    }

    return matchIdToReturn;
  };

  const passCreator = (creatorId: string) => {
    const key = `${activeBusiness.id}_${creatorId}`;
    setLikes(prev => ({ ...prev, [key]: false }));
  };

  const likeCampaign = (campaignId: string): string => {
    const creatorId = activeCreator.id;
    const key = `${creatorId}_${campaignId}`;
    setLikes(prev => ({ ...prev, [key]: true }));

    const targetCampaign = campaigns.find(c => c.id === campaignId);
    if (!targetCampaign) return '';

    const bizId = targetCampaign.businessId;
    const targetBusiness = businesses.find(b => b.id === bizId);
    const bizLikesCreator = likes[`${bizId}_${creatorId}`];

    let existingMatch = matches.find(m => m.businessId === bizId && m.creatorId === creatorId);
    let matchIdToReturn = existingMatch ? existingMatch.id : '';

    if (bizLikesCreator || bizId === 'biz-luna') {
      // MATCH!
      if (!existingMatch) {
        const newMatchId = `match-${Date.now()}`;
        existingMatch = {
          id: newMatchId,
          businessId: bizId,
          creatorId: creatorId,
          campaignId: campaignId,
          status: 'matched',
          createdAt: new Date().toISOString(),
          offers: [
            {
              id: `off-${Date.now()}`,
              sender: 'business',
              senderName: targetBusiness?.name || 'Business',
              amount: 600000,
              perks: 'Complimentary pour-over flight + pastry of choice',
              note: `Hi ${activeCreator.name}! We love your authentic content and would love to collaborate on ${targetCampaign.title}.`,
              timestamp: 'Just now',
              status: 'pending'
            }
          ],
          promoCode: 'LINH10',
          promoCodeUses: 0,
          chatMessages: [
            {
              id: `msg-${Date.now()}`,
              senderId: bizId,
              senderRole: 'business',
              text: `Hello ${activeCreator.name}! Welcome to the collaboration room for ${targetCampaign.title}!`,
              timestamp: 'Just now'
            }
          ]
        };
        setMatches(prev => [existingMatch!, ...prev]);
        matchIdToReturn = newMatchId;
      }

      setMatchCelebration({
        show: true,
        match: existingMatch,
        creator: activeCreator,
        business: targetBusiness,
        campaign: targetCampaign
      });

      addNotification({
        title: "It's a Match!",
        message: `You and ${targetBusiness?.name} are interested in working together on "${targetCampaign.title}"!`,
        type: 'match',
        linkMatchId: existingMatch.id
      });
    } else {
      addNotification({
        title: 'Interest Sent',
        message: `You applied to "${targetCampaign.title}". The business has been notified.`,
        type: 'general'
      });
    }

    return matchIdToReturn;
  };

  const passCampaign = (campaignId: string) => {
    const key = `${activeCreator.id}_${campaignId}`;
    setLikes(prev => ({ ...prev, [key]: false }));
  };

  const createCampaign = (data: Partial<Campaign>) => {
    const newCamp: Campaign = {
      id: `camp-${Date.now()}`,
      businessId: activeBusiness.id,
      title: data.title || 'New Creator Campaign',
      category: data.category || activeBusiness.category,
      location: data.location || activeBusiness.location,
      distanceKm: 2.1,
      budgetMin: data.budgetMin || 500000,
      budgetMax: data.budgetMax || 1000000,
      budgetDisplay: `${((data.budgetMin || 500000) / 1000).toFixed(0)}K - ${((data.budgetMax || 1000000) / 1000).toFixed(0)}K VND`,
      paymentType: data.paymentType || 'Cash + Perks',
      creatorType: data.creatorType || 'Food / Lifestyle',
      followerRange: data.followerRange || '5K - 50K',
      platform: data.platform || 'TikTok',
      deliverables: data.deliverables || '1 TikTok video + 1 Instagram story',
      deadline: data.deadline || '15 November 2026',
      numberCreators: data.numberCreators || 5,
      brief: data.brief || 'Create an engaging, authentic review highlighting the atmosphere and key specialties.',
      status: 'active',
      isSponsored: false,
      createdAt: new Date().toISOString().split('T')[0],
      aiReason: 'New active campaign seeking authentic local creators'
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setShowCreateCampaignModal(false);
    addNotification({
      title: 'Campaign Published',
      message: `"${newCamp.title}" is now live and visible to creators in Discover and Map.`,
      type: 'general'
    });
  };

  const sendOffer = (matchId: string, amount: number, perks?: string, note?: string) => {
    const isBiz = role === 'business';
    const senderName = isBiz ? activeBusiness.name : activeCreator.username;
    
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;

      const newOfferItem: OfferHistoryItem = {
        id: `off-${Date.now()}`,
        sender: isBiz ? 'business' : 'creator',
        senderName,
        amount,
        perks,
        note: note || (isBiz ? `Offered ${(amount/1000).toFixed(0)}K VND` : `Counteroffer of ${(amount/1000).toFixed(0)}K VND`),
        timestamp: 'Just now',
        status: 'pending'
      };

      const updatedOffers = m.offers.map(o => o.status === 'pending' ? { ...o, status: 'countered' as const } : o);

      return {
        ...m,
        status: 'negotiating',
        offers: [...updatedOffers, newOfferItem]
      };
    }));

    addNotification({
      title: 'New Offer Sent',
      message: `${senderName} proposed an offer of ${(amount/1000).toFixed(0)}K VND.`,
      type: 'offer',
      linkMatchId: matchId
    });
  };

  const acceptOffer = (matchId: string, offerId: string) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    const targetOffer = match.offers.find(o => o.id === offerId) || match.offers[match.offers.length - 1];
    const agreedAmt = targetOffer.amount;
    const agreedPrk = targetOffer.perks;

    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        status: 'offer_accepted',
        agreedAmount: agreedAmt,
        agreedPerks: agreedPrk,
        payment: {
          grossAmount: agreedAmt,
          platformFee: Math.round(agreedAmt * 0.1),
          netCreatorAmount: Math.round(agreedAmt * 0.9),
          status: 'escrowed'
        },
        offers: m.offers.map(o => o.id === offerId ? { ...o, status: 'accepted' as const } : o)
      };
    }));

    addNotification({
      title: 'Offer Accepted! Collaboration Confirmed',
      message: `Collaboration confirmed at ${(agreedAmt/1000).toFixed(0)}K VND. Funds are safely deposited in platform escrow. Next step: Schedule visit!`,
      type: 'payment',
      linkMatchId: matchId
    });
  };

  const declineOffer = (matchId: string, offerId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        offers: m.offers.map(o => o.id === offerId ? { ...o, status: 'declined' as const } : o)
      };
    }));
  };

  const bookVisit = (matchId: string, date: string, time: string, guests: number, notes?: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        status: 'visit_booked',
        booking: {
          date,
          time,
          guests,
          status: 'confirmed',
          notes
        }
      };
    }));

    addNotification({
      title: 'Store Visit Booked',
      message: `Visit confirmed for ${date} at ${time} (${guests} people). Business has been notified to welcome you!`,
      type: 'booking',
      linkMatchId: matchId
    });
  };

  const submitContent = (matchId: string, videoUrl: string, deliverableType: string, captionDraft: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        status: 'content_submitted',
        submission: {
          videoUrl,
          deliverableType,
          captionDraft,
          submittedAt: 'Just now',
          status: 'pending_review'
        }
      };
    }));

    addNotification({
      title: 'Content Submitted for Approval',
      message: `Creator submitted draft content. Waiting for business review and approval.`,
      type: 'content',
      linkMatchId: matchId
    });
  };

  const approveContent = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        status: 'payment_released',
        submission: m.submission ? { ...m.submission, status: 'approved' } : undefined,
        payment: m.payment ? { ...m.payment, status: 'released', releasedAt: 'Just now' } : undefined
      };
    }));

    addNotification({
      title: 'Content Approved & Payment Released!',
      message: `Business approved the content. Escrow funds have been released to the creator. Please leave a review!`,
      type: 'payment',
      linkMatchId: matchId
    });
  };

  const requestRevision = (matchId: string, revisionNote: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        submission: m.submission ? {
          ...m.submission,
          status: 'revision_requested',
          revisionNote
        } : undefined
      };
    }));

    addNotification({
      title: 'Revision Requested',
      message: `Business requested adjustments: "${revisionNote}"`,
      type: 'content',
      linkMatchId: matchId
    });
  };

  const releasePayment = (matchId: string) => {
    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        status: 'payment_released',
        payment: m.payment ? { ...m.payment, status: 'released', releasedAt: 'Just now' } : undefined
      };
    }));
  };

  const submitReview = (matchId: string, rating: number, criteria: { label: string; score: number }[], comment: string) => {
    const isBiz = role === 'business';
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      const updated = {
        ...m,
        businessReviewed: isBiz ? true : m.businessReviewed,
        creatorReviewed: !isBiz ? true : m.creatorReviewed
      };
      if (updated.businessReviewed && updated.creatorReviewed) {
        updated.status = 'completed';
      }
      return updated;
    }));

    const authorName = isBiz ? activeBusiness.name : activeCreator.username;

    if (isBiz) {
      // Add review to creator
      setCreators(prev => prev.map(c => {
        if (c.id !== match.creatorId) return c;
        const newReview = {
          id: `rev-${Date.now()}`,
          authorName,
          authorRole: 'business' as const,
          rating,
          date: 'Just now',
          comment,
          criteria
        };
        const allRatings = [...c.reviews.map(r => r.rating), rating];
        const newAvg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
        return {
          ...c,
          rating: newAvg,
          reviews: [newReview, ...c.reviews],
          previousCollabsCount: c.previousCollabsCount + 1
        };
      }));
    } else {
      // Add review to business
      setBusinesses(prev => prev.map(b => {
        if (b.id !== match.businessId) return b;
        const newReview = {
          id: `rev-${Date.now()}`,
          authorName,
          authorRole: 'creator' as const,
          rating,
          date: 'Just now',
          comment,
          criteria
        };
        const allRatings = [...b.reviews.map(r => r.rating), rating];
        const newAvg = Number((allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1));
        return {
          ...b,
          rating: newAvg,
          reviews: [newReview, ...b.reviews],
          completedCollabs: b.completedCollabs + 1
        };
      }));
    }

    addNotification({
      title: 'Review Submitted',
      message: `Thank you! Your feedback helps build verified trust on CollabLocal.`,
      type: 'review',
      linkMatchId: matchId
    });
  };

  const sendChatMessage = (matchId: string, text: string) => {
    if (!text.trim()) return;
    const isBiz = role === 'business';
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: isBiz ? activeBusiness.id : activeCreator.id,
      senderRole: isBiz ? 'business' as const : 'creator' as const,
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMatches(prev => prev.map(m => {
      if (m.id !== matchId) return m;
      return {
        ...m,
        chatMessages: [...m.chatMessages, newMsg]
      };
    }));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDemoData = () => {
    try {
      localStorage.clear();
    } catch {}
    setBusinesses(INITIAL_BUSINESSES);
    setCreators(INITIAL_CREATORS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setMatches(INITIAL_MATCHES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAnalytics(INITIAL_ANALYTICS);
    setLikes({ 'biz-luna_creator-linh': true });
    setActiveMatchId('match-demo-luna');
    setCurrentView('dashboard');
    addNotification({
      title: 'Demo State Reset',
      message: 'Marketplace state has been refreshed to initial demo parameters.',
      type: 'general'
    });
  };

  // Jump to any scenario step for rapid demonstration
  const jumpToScenarioStep = (stepNumber: number) => {
    const demoMatchId = 'match-demo-luna';
    setActiveMatchId(demoMatchId);

    if (stepNumber <= 1) {
      // Step 1: Business dashboard
      setRole('business');
      setCurrentView('campaigns');
    } else if (stepNumber === 2 || stepNumber === 3) {
      // Step 2 & 3: Creator Discover & Map
      setRole('creator');
      setCurrentView(stepNumber === 3 ? 'map' : 'discover');
    } else if (stepNumber === 4 || stepNumber === 5) {
      // Step 4 & 5: Creator opens campaign or swipes
      setRole('creator');
      setCurrentView('swipe');
    } else if (stepNumber === 6 || stepNumber === 7) {
      // Step 6 & 7: Match occurs
      setRole('business');
      likeCreator('creator-linh');
    } else if (stepNumber >= 8 && stepNumber <= 11) {
      // Negotiation room
      setCurrentView('collab');
    } else if (stepNumber === 12) {
      // Accepted offer
      acceptOffer(demoMatchId, 'off-3');
      setCurrentView('collab');
    } else if (stepNumber === 13) {
      // Booked visit
      bookVisit(demoMatchId, '12 October 2026', '15:00', 2, 'Table by the garden window for filming');
      setCurrentView('collab');
    } else if (stepNumber === 14) {
      // Content submitted
      submitContent(
        demoMatchId,
        'https://tiktok.com/@linhfoodie/video/72891928312019',
        '1 TikTok Review Video (4K) + 1 IG Story',
        'Had the most peaceful afternoon at @lunacoffee Trang Tien! Check out their Matcha Cloud & signature pour-over. Use code LINH10 for 10% off ✨'
      );
      setCurrentView('collab');
    } else if (stepNumber === 15 || stepNumber === 16) {
      // Content approved & Payment released
      approveContent(demoMatchId);
      setCurrentView('collab');
    } else if (stepNumber === 17) {
      // Reviews phase
      approveContent(demoMatchId);
      submitReview(demoMatchId, 5, [
        { label: 'Communication', score: 5 },
        { label: 'Content Quality', score: 5 },
        { label: 'Professionalism', score: 5 },
        { label: 'Deadline Punctuality', score: 5 }
      ], 'Exceptional creator! Drove 180+ customers with code LINH10.');
      setCurrentView('collab');
    } else if (stepNumber >= 18) {
      // Analytics
      setRole('business');
      setCurrentView('analytics');
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeBusiness,
        activeCreator,
        currentView,
        setCurrentView,
        businesses,
        creators,
        campaigns,
        matches,
        notifications,
        analytics,
        likes,
        activeMatchId,
        setActiveMatchId,
        viewingCreatorId,
        setViewingCreatorId,
        viewingBusinessId,
        setViewingBusinessId,
        viewingCampaignId,
        setViewingCampaignId,
        matchCelebration,
        setMatchCelebration,
        showCreateCampaignModal,
        setShowCreateCampaignModal,
        showProModal,
        setShowProModal,
        showDisputeModal,
        setShowDisputeModal,
        showNotificationDrawer,
        setShowNotificationDrawer,
        showDemoWalkthrough,
        setShowDemoWalkthrough,
        showNewbieModal,
        setShowNewbieModal,
        showLanding,
        setShowLanding,
        lang,
        setLang,
        createNewbieProfile,
        likeCreator,
        passCreator,
        likeCampaign,
        passCampaign,
        createCampaign,
        sendOffer,
        acceptOffer,
        declineOffer,
        bookVisit,
        submitContent,
        approveContent,
        requestRevision,
        releasePayment,
        submitReview,
        sendChatMessage,
        markNotificationsAsRead,
        resetDemoData,
        jumpToScenarioStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
