export type Language = 'vi' | 'en' | 'ko';

export interface Translations {
  brandTagline: string;
  home: string;
  landingBadge: string;
  scenarioGuideBtn: string;
  newbieModeBtn: string;
  enterApp: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  roleBizTitle: string;
  roleBizSub: string;
  roleBizDesc: string;
  roleBizBtn: string;
  roleCreatorTitle: string;
  roleCreatorSub: string;
  roleCreatorDesc: string;
  roleCreatorBtn: string;
  roleNewbieTitle: string;
  roleNewbieSub: string;
  roleNewbieDesc: string;
  roleNewbieBtn: string;
  devTeamTitle: string;
  devTeamHeadline: string;
  devTeamSub: string;
  whyStayTitle: string;
  whyStayHeadline: string;
  whyStayDesc: string;
  featureEscrowTitle: string;
  featureEscrowDesc: string;
  featureLocationTitle: string;
  featureLocationDesc: string;
  featureTrackingTitle: string;
  featureTrackingDesc: string;
  lifecycleTitle: string;
  lifecycleHeadline: string;
  stepDiscover: string;
  stepDiscoverDesc: string;
  stepMatch: string;
  stepMatchDesc: string;
  stepNegotiate: string;
  stepNegotiateDesc: string;
  stepBook: string;
  stepBookDesc: string;
  stepCollab: string;
  stepCollabDesc: string;
  stepSubmit: string;
  stepSubmitDesc: string;
  stepApprove: string;
  stepApproveDesc: string;
  stepPay: string;
  stepPayDesc: string;
  stepReview: string;
  stepReviewDesc: string;
  stepAnalyze: string;
  stepAnalyzeDesc: string;
  navDiscoverCreators: string;
  navDiscoverCampaigns: string;
  navDashboard: string;
  navMap: string;
  navCampaigns: string;
  navSwipe: string;
  navMatches: string;
  navCollabRoom: string;
  navEarnings: string;
  navAnalytics: string;
  navProfileBiz: string;
  navProfileCreator: string;
  creatorMode: string;
  businessMode: string;
  cancel: string;
  close: string;
  vnd: string;
  newbieModalTitle: string;
  newbieModalSub: string;
  newbieBizTab: string;
  newbieCreatorTab: string;
  newbieBizName: string;
  newbieCategory: string;
  newbieLocation: string;
  newbieBudget: string;
  newbieDesc: string;
  newbieCreatorName: string;
  newbieCreatorUsername: string;
  newbieNiche: string;
  newbieFollowers: string;
  newbieRate: string;
  newbieBio: string;
  newbieSubmit: string;
  activeCollabsTitle: string;
  activeCollabsDesc: string;
  activeCampaigns: string;
  allCampaigns: string;
  availableCampaigns: string;
  aiRecommendedCreators: string;
  recommendedForYou: string;
  browseAllCreators: string;
  allNiches: string;
  anyBudget: string;
  under700k: string;
  above700k: string;
  createCampaignBtn: string;
  campaignBudget: string;
  detailsBtn: string;
  interestedBtn: string;
  acceptOffer: string;
  counterOffer: string;
  decline: string;
  confirmBooking: string;
  submitContentBtn: string;
  approveContentBtn: string;
  requestRevisionBtn: string;
  leaveReviewBtn: string;
  collabRoomTitle: string;
  secNegotiation: string;
  secBooking: string;
  secInEscrow: string;
  secContent: string;
  secPayment: string;
  secReviews: string;
  walletTitle: string;
  walletSub: string;
  withdrawBtn: string;
  payoutHistory: string;
  totalEarned: string;
  holdingInEscrow: string;
  escrowHeld: string;
  fundsReleased: string;
  matchesTitle: string;
  matchesSub: string;
  openCollabRoom: string;
  viewRoom: string;
  noMatchesYet: string;
  noMatchesDesc: string;
  swipeTitleBiz: string;
  swipeTitleCreator: string;
  matchStamp: string;
  passStamp: string;
  allCaughtUp: string;
  resetDeck: string;
  mapViewBtn: string;
  openSwipeNow: string;
  resetDemoBtn: string;
  reportHelp: string;
  sendMsg: string;
  typeMessage: string;
  directMessages: string;
  bizVerified: string;
  verifiedBadge: string;
  totalViews: string;
  avgViews: string;
  totalEngagement: string;
  conversions: string;
  creatorBreakdown: string;
  promoCodeRedeemed: string;
  estimatedEarnings: string;
  awaitingAgreement: string;
  pendingRequests: string;
  matchScore: string;
  creatorMatches: string;
  [key: string]: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  vi: {
    brandTagline: 'Nền tảng kết nối Doanh nghiệp địa phương & Content Creator tại Hà Nội',
    home: 'Trang chủ',
    landingBadge: 'CollabLocal v2.4 · Hanoi Local Edition',
    scenarioGuideBtn: 'Xem kịch bản demo',
    newbieModeBtn: 'Thử Nghiệm Tự Tạo Hồ Sơ',
    enterApp: 'Vào Ứng Dụng',
    heroBadge: 'Mô Hình Chợ Hai Chiều · Bảo Vệ Ký Quỹ Escrow',
    heroHeadline: 'Kết nối Quán địa phương & Creator quay video review tại Hà Nội',
    heroSubheadline: 'Tìm kiếm theo vị trí bản đồ, quẹt thẻ ghép đôi, đàm phán hợp đồng trực tiếp và thanh toán ký quỹ an toàn 100%.',
    roleBizTitle: 'Dành Cho Doanh Nghiệp',
    roleBizSub: 'Chủ Nhà Hàng & Cafe',
    roleBizDesc: 'Tạo chiến dịch, duyệt hồ sơ Creator, đặt lịch quay và nghiệm thu video trước khi mở quỹ thù lao.',
    roleBizBtn: 'Vào Với Vai Trò Quán (Luna Coffee)',
    roleCreatorTitle: 'Dành Cho Nhà Sáng Tạo',
    roleCreatorSub: 'Content Creator & KOL',
    roleCreatorDesc: 'Quẹt thẻ tìm chiến dịch gần bạn, deal thù lao công bằng, nhận menu trải nghiệm miễn phí và bảo đảm thù lao 100%.',
    roleCreatorBtn: 'Vào Với Vai Trò Creator (@linhfoodie)',
    roleNewbieTitle: 'Dành Cho Người Dùng Mới',
    roleNewbieSub: 'Tự Tạo Hồ Sơ & Chiến Dịch',
    roleNewbieDesc: 'Tự nhập tên quán hoặc kênh Creator của riêng bạn để trải nghiệm tính năng ghép đôi hai chiều thời gian thực.',
    roleNewbieBtn: 'Mở Trình Tạo Hồ Sơ',
    devTeamTitle: 'Đội Ngũ Phát Triển',
    devTeamHeadline: 'Xây dựng cho cộng đồng F&B và Creator Hà Nội',
    devTeamSub: 'Giải quyết bài toán bùng thù lao, chậm duyệt bài và thiếu minh bạch trong hợp tác influencer marketing.',
    whyStayTitle: 'Giá Trị Cốt Lõi',
    whyStayHeadline: 'Tại sao cả hai bên đều chọn ở lại nền tảng?',
    whyStayDesc: 'Không lo bị bùng tiền, không lo Creator nhận đồ ăn rồi biến mất, mọi quy trình đều có hợp đồng và ký quỹ rõ ràng.',
    featureEscrowTitle: 'Bảo Vệ Ký Quỹ Escrow',
    featureEscrowDesc: 'Quán ký quỹ trước khi Creator đến quay. Tiền chỉ giải ngân khi video được duyệt đúng hạn.',
    featureLocationTitle: 'Bản Đồ Định Vị Địa Phương',
    featureLocationDesc: 'Tìm kiếm quán và Creator theo bán kính từng quận tại Hà Nội: Hoàn Kiếm, Tây Hồ, Cầu Giấy...',
    featureTrackingTitle: 'Đo Lường Hiệu Quả Thật',
    featureTrackingDesc: 'Theo dõi lượt xem, tương tác, mã voucher giảm giá độc quyền và tỷ lệ chuyển đổi khách đến quán.',
    lifecycleTitle: 'Quy Trình 10 Bước',
    lifecycleHeadline: 'Quy trình hợp tác chuẩn chỉnh từ kết nối đến nghiệm thu',
    stepDiscover: '01. Khám Phá',
    stepDiscoverDesc: 'Bản đồ & bộ lọc theo quận',
    stepMatch: '02. Ghép Đôi',
    stepMatchDesc: 'Quẹt thẻ hoặc mời trực tiếp',
    stepNegotiate: '03. Đàm Phán',
    stepNegotiateDesc: 'Thương lượng thù lao & brief',
    stepBook: '04. Đặt Lịch',
    stepBookDesc: 'Chọn ngày giờ đến quán',
    stepCollab: '05. Ký Quỹ Escrow',
    stepCollabDesc: 'Quán nạp 100% thù lao bảo đảm',
    stepSubmit: '06. Bàn Giao Nháp',
    stepSubmitDesc: 'Gửi link video & kịch bản',
    stepApprove: '07. Duyệt Bài',
    stepApproveDesc: 'Quán duyệt trong 24h hoặc góp ý',
    stepPay: '08. Giải Ngân',
    stepPayDesc: 'Tự động chuyển tiền về ví',
    stepReview: '09. Đánh Giá',
    stepReviewDesc: 'Chấm sao & feedback hai chiều',
    stepAnalyze: '10. Đo Lường',
    stepAnalyzeDesc: 'Xem số view & mã voucher',
    navDiscoverCreators: 'Khám phá Creator',
    navDiscoverCampaigns: 'Khám phá Chiến dịch',
    navDashboard: 'Bảng điều khiển',
    navMap: 'Bản đồ Hà Nội',
    navCampaigns: 'Chiến dịch',
    navSwipe: 'Quẹt thẻ Matching',
    navMatches: 'Danh sách ghép đôi',
    navCollabRoom: 'Phòng hợp tác',
    navEarnings: 'Thu nhập & Ví',
    navAnalytics: 'Phân tích số liệu',
    navProfileBiz: 'Hồ sơ Quán',
    navProfileCreator: 'Hồ sơ Creator',
    creatorMode: 'Chế độ Creator',
    businessMode: 'Chế độ Doanh nghiệp',
    cancel: 'Hủy bỏ',
    close: 'Đóng',
    vnd: '₫ VND',
    newbieModalTitle: 'Tạo Hồ Sơ Trải Nghiệm Mới',
    newbieModalSub: 'Dành cho Thầy Cô & Giám khảo tự do thiết lập tài khoản quán hoặc Creator mẫu',
    newbieBizTab: 'Tạo Quán Mới',
    newbieCreatorTab: 'Tạo Creator Mới',
    newbieBizName: 'Tên Quán / Nhà Hàng / Spa',
    newbieCategory: 'Lĩnh Vực Kinh Doanh',
    newbieLocation: 'Địa Chỉ / Khu Vực (Hà Nội)',
    newbieBudget: 'Ngân Sách Thù Lao Mẫu (VND)',
    newbieDesc: 'Giới Thiệu Ngắn Về Quán',
    newbieCreatorName: 'Họ Và Tên Creator',
    newbieCreatorUsername: 'Tên Tài Khoản (@username)',
    newbieNiche: 'Chủ Đề Kênh',
    newbieFollowers: 'Lượng Followers Ước Tính',
    newbieRate: 'Mức Thù Lao Mong Muốn (VND/video)',
    newbieBio: 'Tiểu Sử Kênh (Bio)',
    newbieSubmit: 'Lưu & Bắt Đầu Trải Nghiệm',
    activeCollabsTitle: 'Hợp tác đang diễn ra',
    activeCollabsDesc: 'Theo dõi tiến độ từ ký quỹ đến nghiệm thu',
    activeCampaigns: 'Chiến dịch đang mở',
    allCampaigns: 'Tất cả chiến dịch',
    availableCampaigns: 'Chiến dịch phù hợp',
    aiRecommendedCreators: 'Creator gợi ý bởi AI',
    recommendedForYou: 'Được gợi ý cho bạn',
    browseAllCreators: 'Xem tất cả Creator',
    allNiches: 'Mọi lĩnh vực',
    anyBudget: 'Mọi ngân sách',
    under700k: 'Dưới 700K',
    above700k: 'Trên 700K',
    createCampaignBtn: 'Tạo Chiến Dịch Mới',
    campaignBudget: 'Ngân sách thù lao',
    detailsBtn: 'Xem Chi Tiết',
    interestedBtn: 'Quan Tâm',
    acceptOffer: 'Chấp Nhận Đề Xuất',
    counterOffer: 'Thương Lượng Lại',
    decline: 'Từ Chối',
    confirmBooking: 'Xác Nhận Lịch Đến',
    submitContentBtn: 'Nộp Bản Nháp Video',
    approveContentBtn: 'Duyệt Video & Mở Quỹ',
    requestRevisionBtn: 'Yêu Cầu Chỉnh Sửa',
    leaveReviewBtn: 'Viết Đánh Giá',
    collabRoomTitle: 'Phòng Hợp Tác Trực Tuyến',
    secNegotiation: 'Giai Đoạn Đàm Phán',
    secBooking: 'Đặt Lịch Đến Quán',
    secInEscrow: 'Ký Quỹ Escrow An Toàn',
    secContent: 'Kiểm Duyệt Nội Dung',
    secPayment: 'Giải Ngân Thù Lao',
    secReviews: 'Đánh Giá Đối Tác',
    walletTitle: 'Ví CollabLocal & Thu Nhập',
    walletSub: 'Theo dõi số dư khả dụng, tiền ký quỹ và lịch sử rút tiền',
    withdrawBtn: 'Rút Tiền Về Ngân Hàng',
    payoutHistory: 'Lịch Sử Thanh Toán',
    totalEarned: 'Tổng thu nhập đã nhận',
    holdingInEscrow: 'Đang giữ trong Escrow',
    escrowHeld: 'Đang giữ ký quỹ',
    fundsReleased: 'Đã giải ngân',
    matchesTitle: 'Danh Sách Ghép Đôi Thành Công',
    matchesSub: 'Các đối tác đã đồng ý làm việc cùng bạn',
    openCollabRoom: 'Vào Phòng Làm Việc',
    viewRoom: 'Vào Phòng',
    noMatchesYet: 'Chưa Có Ghép Đôi Nào',
    noMatchesDesc: 'Hãy quẹt thẻ hoặc gửi lời mời chiến dịch để kết nối với đối tác!',
    swipeTitleBiz: 'Quẹt Thẻ Chọn Creator Hà Nội',
    swipeTitleCreator: 'Quẹt Thẻ Nhận Kèo Quán Gần Bạn',
    matchStamp: 'MATCH / QUAN TÂM',
    passStamp: 'BỎ QUA',
    allCaughtUp: 'Bạn đã xem hết danh sách!',
    resetDeck: 'Xem Lại Danh Sách',
    mapViewBtn: 'Xem Bản Đồ',
    openSwipeNow: 'Mở Quẹt Thẻ Ngay',
    resetDemoBtn: 'Đặt Lại Dữ Liệu Mẫu',
    reportHelp: 'Báo Cáo / Trợ Giúp',
    sendMsg: 'Gửi Tin Nhắn',
    typeMessage: 'Nhập tin nhắn trao đổi...',
    directMessages: 'Trao Đổi Trực Tiếp',
    bizVerified: 'Doanh nghiệp đã xác thực',
    verifiedBadge: 'Đã xác thực',
    totalViews: 'Tổng lượt xem video',
    avgViews: 'Lượt xem trung bình',
    totalEngagement: 'Tổng tương tác',
    conversions: 'Chuyển đổi voucher',
    creatorBreakdown: 'Hiệu Quả Từng Creator',
    promoCodeRedeemed: 'Mã voucher đã sử dụng',
    estimatedEarnings: 'Thu nhập dự kiến',
    awaitingAgreement: 'Đang chờ thỏa thuận',
    pendingRequests: 'Yêu cầu chờ xử lý',
    matchScore: 'Độ tương thích',
    creatorMatches: 'Ghép đôi với Creator'
  },
  en: {
    brandTagline: 'Local Business & Creator Marketplace in Hanoi',
    home: 'Home',
    landingBadge: 'CollabLocal v2.4 · Hanoi Local Edition',
    scenarioGuideBtn: 'Demo Scenario Guide',
    newbieModeBtn: 'Custom Profile Demo',
    enterApp: 'Enter App',
    heroBadge: 'Two-Sided Marketplace · Escrow Protected',
    heroHeadline: 'Connecting Hanoi Local Venues & Video Review Creators',
    heroSubheadline: 'Location-based discovery, swipe matching, direct negotiation, and 100% escrow payment protection.',
    roleBizTitle: 'For Local Businesses',
    roleBizSub: 'Restaurants, Cafes & Spas',
    roleBizDesc: 'Create campaigns, evaluate verified creators, schedule visits, and approve drafts before payout.',
    roleBizBtn: 'Enter as Venue (Luna Coffee)',
    roleCreatorTitle: 'For Content Creators',
    roleCreatorSub: 'Creators, KOLs & Reviewers',
    roleCreatorDesc: 'Swipe nearby campaigns, negotiate fair rates, enjoy complimentary tasting menus, and secure payouts.',
    roleCreatorBtn: 'Enter as Creator (@linhfoodie)',
    roleNewbieTitle: 'For Evaluators & Newbies',
    roleNewbieSub: 'Custom Profile & Campaign Setup',
    roleNewbieDesc: 'Create your own business or creator profile to test real-time two-way matchmaking.',
    roleNewbieBtn: 'Open Profile Creator',
    devTeamTitle: 'Development Team',
    devTeamHeadline: 'Built for Hanoi F&B & Creator Community',
    devTeamSub: 'Eliminating payment defaults, delayed feedback, and opaque collaboration workflows.',
    whyStayTitle: 'Core Value',
    whyStayHeadline: 'Why do both sides stay on the platform?',
    whyStayDesc: 'Protected payments, verified deliverables, scheduled tasting visits, and milestone-based peace of mind.',
    featureEscrowTitle: 'Escrow Payment Protection',
    featureEscrowDesc: 'Venues fund campaigns upfront. Payments are released only when content is verified and approved.',
    featureLocationTitle: 'Local Geo-Discovery',
    featureLocationDesc: 'Find venues and creators by Hanoi district: Hoan Kiem, Tay Ho, Cau Giay and more.',
    featureTrackingTitle: 'Real Performance Tracking',
    featureTrackingDesc: 'Track video views, engagement rates, unique promo code redemptions, and offline foot traffic.',
    lifecycleTitle: '10-Step Lifecycle',
    lifecycleHeadline: 'Standardized End-to-End Workflow',
    stepDiscover: '01. Discover',
    stepDiscoverDesc: 'Map & district filters',
    stepMatch: '02. Match',
    stepMatchDesc: 'Swipe deck or direct invite',
    stepNegotiate: '03. Negotiate',
    stepNegotiateDesc: 'Rates & deliverable brief',
    stepBook: '04. Book',
    stepBookDesc: 'Schedule venue visit slot',
    stepCollab: '05. Escrow Deposit',
    stepCollabDesc: '100% payout locked safely',
    stepSubmit: '06. Submit Draft',
    stepSubmitDesc: 'Upload video draft & caption',
    stepApprove: '07. Approve',
    stepApproveDesc: 'Review draft within 24h',
    stepPay: '08. Payout',
    stepPayDesc: 'Instant wallet release',
    stepReview: '09. Review',
    stepReviewDesc: 'Two-way ratings & badges',
    stepAnalyze: '10. Analytics',
    stepAnalyzeDesc: 'Real views & voucher ROI',
    navDiscoverCreators: 'Discover Creators',
    navDiscoverCampaigns: 'Discover Campaigns',
    navDashboard: 'Dashboard',
    navMap: 'Hanoi Map',
    navCampaigns: 'Campaigns',
    navSwipe: 'Swipe Match',
    navMatches: 'Matches',
    navCollabRoom: 'Collab Room',
    navEarnings: 'Earnings & Wallet',
    navAnalytics: 'Analytics',
    navProfileBiz: 'Venue Profile',
    navProfileCreator: 'Creator Profile',
    creatorMode: 'Creator Mode',
    businessMode: 'Business Mode',
    cancel: 'Cancel',
    close: 'Close',
    vnd: '₫ VND',
    newbieModalTitle: 'Create Custom Demo Profile',
    newbieModalSub: 'For evaluators and guests to test real-time matching with custom names and rates',
    newbieBizTab: 'Create Business',
    newbieCreatorTab: 'Create Creator',
    newbieBizName: 'Venue / Brand Name',
    newbieCategory: 'Business Category',
    newbieLocation: 'Location (Hanoi)',
    newbieBudget: 'Sample Campaign Budget (VND)',
    newbieDesc: 'Brief Venue Description',
    newbieCreatorName: 'Creator Full Name',
    newbieCreatorUsername: 'Username (@handle)',
    newbieNiche: 'Content Niche',
    newbieFollowers: 'Estimated Followers',
    newbieRate: 'Desired Rate (VND/video)',
    newbieBio: 'Creator Bio',
    newbieSubmit: 'Save & Start Experience',
    activeCollabsTitle: 'Active Collaborations',
    activeCollabsDesc: 'Track milestone progress from escrow to approval',
    activeCampaigns: 'Active Campaigns',
    allCampaigns: 'All Campaigns',
    availableCampaigns: 'Available Campaigns',
    aiRecommendedCreators: 'AI Recommended Creators',
    recommendedForYou: 'Recommended For You',
    browseAllCreators: 'Browse All Creators',
    allNiches: 'All Niches',
    anyBudget: 'Any Budget',
    under700k: 'Under 700K',
    above700k: 'Above 700K',
    createCampaignBtn: 'Create Campaign',
    campaignBudget: 'Campaign Budget',
    detailsBtn: 'View Details',
    interestedBtn: 'Interested',
    acceptOffer: 'Accept Offer',
    counterOffer: 'Counter Offer',
    decline: 'Decline',
    confirmBooking: 'Confirm Schedule',
    submitContentBtn: 'Submit Video Draft',
    approveContentBtn: 'Approve & Release Funds',
    requestRevisionBtn: 'Request Revision',
    leaveReviewBtn: 'Leave Review',
    collabRoomTitle: 'Online Collaboration Room',
    secNegotiation: 'Negotiation Stage',
    secBooking: 'Schedule Shoot',
    secInEscrow: 'Escrow Secured',
    secContent: 'Content Review',
    secPayment: 'Payment Release',
    secReviews: 'Partner Review',
    walletTitle: 'CollabLocal Wallet & Earnings',
    walletSub: 'Track available balance, escrow holds, and payout transfers',
    withdrawBtn: 'Withdraw to Bank',
    payoutHistory: 'Payout History',
    totalEarned: 'Total Earned',
    holdingInEscrow: 'Held in Escrow',
    escrowHeld: 'Held in Escrow',
    fundsReleased: 'Funds Released',
    matchesTitle: 'Matched Collaborations',
    matchesSub: 'Partners agreed to collaborate with you',
    openCollabRoom: 'Enter Collab Room',
    viewRoom: 'Enter Room',
    noMatchesYet: 'No Matches Yet',
    noMatchesDesc: 'Swipe campaigns or send invites to start matching!',
    swipeTitleBiz: 'Swipe Hanoi Creators',
    swipeTitleCreator: 'Swipe Nearby Campaigns',
    matchStamp: 'MATCH / LIKE',
    passStamp: 'PASS',
    allCaughtUp: "You've reviewed all cards!",
    resetDeck: 'Review Again',
    mapViewBtn: 'View Map',
    openSwipeNow: 'Start Swiping',
    resetDemoBtn: 'Reset Demo Data',
    reportHelp: 'Report & Dispute',
    sendMsg: 'Send Message',
    typeMessage: 'Type your message...',
    directMessages: 'Direct Chat',
    bizVerified: 'Verified Business',
    verifiedBadge: 'Verified',
    totalViews: 'Total Video Views',
    avgViews: 'Average Views',
    totalEngagement: 'Total Engagement',
    conversions: 'Voucher Conversions',
    creatorBreakdown: 'Performance by Creator',
    promoCodeRedeemed: 'Redeemed Promo Codes',
    estimatedEarnings: 'Estimated Earnings',
    awaitingAgreement: 'Awaiting Agreement',
    pendingRequests: 'Pending Requests',
    matchScore: 'Match Score',
    creatorMatches: 'Creator Matches'
  },
  ko: {
    brandTagline: '하노이 로컬 비즈니스 & 크리에이터 마켓플레이스',
    home: '홈',
    landingBadge: 'CollabLocal v2.4 · 하노이 로컬 에디션',
    scenarioGuideBtn: '데모 시나리오 안내',
    newbieModeBtn: '신규 프로필 직접 생성',
    enterApp: '앱 시작하기',
    heroBadge: '양방향 마켓플레이스 · 에스크로 안전 결제',
    heroHeadline: '하노이 로컬 매장과 영상 리뷰 크리에이터를 잇는 마켓플레이스',
    heroSubheadline: '위치 기반 지도 탐색, 스와이프 매칭, 1:1 실시간 견적 협상 및 100% 안전 에스크로 결제 보호.',
    roleBizTitle: '로컬 비즈니스용',
    roleBizSub: '식당, 카페 & 스파',
    roleBizDesc: '캠페인 개설, 크리에이터 프로필 검토, 방문 일정 확정 및 영상 최종 승인 후 정산.',
    roleBizBtn: '매장 모드로 시작 (Luna Coffee)',
    roleCreatorTitle: '콘텐츠 크리에이터용',
    roleCreatorSub: '크리에이터, KOL & 리뷰어',
    roleCreatorDesc: '내 주변 캠페인 스와이프 탐색, 1:1 단가 제안, 무료 시식 메뉴 및 100% 정산 지급 보장.',
    roleCreatorBtn: '크리에이터 모드로 시작 (@linhfoodie)',
    roleNewbieTitle: '평가자 & 신규 사용자용',
    roleNewbieSub: '자유 프로필 & 캠페인 생성',
    roleNewbieDesc: '매장 또는 크리에이터 정보를 직접 입력하여 실시간 양방향 매칭을 테스트하세요.',
    roleNewbieBtn: '프로필 생성기 열기',
    devTeamTitle: '개발 팀',
    devTeamHeadline: '하노이 F&B 및 크리에이터 커뮤니티를 위해 제작',
    devTeamSub: '대금 미지급, 승인 지연, 불투명한 인플루언서 마케팅 문제를 해결합니다.',
    whyStayTitle: '핵심 가치',
    whyStayHeadline: '양측 모두 플랫폼을 신뢰하고 이용하는 이유',
    whyStayDesc: '안전한 대금 보호, 검증된 결과물, 예약된 무료 시식 방문 및 단계별 안심 관리.',
    featureEscrowTitle: '에스크로 예치금 보호',
    featureEscrowDesc: '촬영 전 100% 예치금 입금. 가이드라인에 맞춘 영상 승인 시에만 정산 지급.',
    featureLocationTitle: '위치 기반 로컬 탐색',
    featureLocationDesc: '하노이 주요 구역(호안끼엠, 떠이호, 꺼우저이 등) 반경별 정밀 탐색.',
    featureTrackingTitle: '실질 성과 분석 및 추적',
    featureTrackingDesc: '실제 조회수, 참여율, 크리에이터 전용 할인 쿠폰 및 매장 방문 전환율 추적.',
    lifecycleTitle: '10단계 협업 라이프사이클',
    lifecycleHeadline: '탐색부터 최종 정산까지 표준화된 협업 프로세스',
    stepDiscover: '01. 탐색',
    stepDiscoverDesc: '지도 & 구역별 필터',
    stepMatch: '02. 매칭',
    stepMatchDesc: '스와이프 또는 직접 제안',
    stepNegotiate: '03. 협상',
    stepNegotiateDesc: '단가 & 브리프 조율',
    stepBook: '04. 예약',
    stepBookDesc: '방문 일시 확정',
    stepCollab: '05. 에스크로 예치',
    stepCollabDesc: '100% 안전 예치금 입금',
    stepSubmit: '06. 영상 제출',
    stepSubmitDesc: '영상 링크 & 대본 등록',
    stepApprove: '07. 검토 및 승인',
    stepApproveDesc: '24시간 이내 승인 또는 피드백',
    stepPay: '08. 자동 정산',
    stepPayDesc: '지갑으로 대금 즉시 송금',
    stepReview: '09. 상호 리뷰',
    stepReviewDesc: '별점 & 양방향 후기 작성',
    stepAnalyze: '10. 성과 분석',
    stepAnalyzeDesc: '조회수 및 쿠폰 전환 분석',
    navDiscoverCreators: '크리에이터 탐색',
    navDiscoverCampaigns: '캠페인 탐색',
    navDashboard: '대시보드',
    navMap: '하노이 지도',
    navCampaigns: '캠페인 관리',
    navSwipe: '스와이프 매칭',
    navMatches: '매칭 목록',
    navCollabRoom: '협업 룸',
    navEarnings: '정산 & 지갑',
    navAnalytics: '데이터 분석',
    navProfileBiz: '매장 프로필',
    navProfileCreator: '크리에이터 프로필',
    creatorMode: '크리에이터 모드',
    businessMode: '비즈니스 모드',
    cancel: '취소',
    close: '닫기',
    vnd: '₫ VND',
    newbieModalTitle: '새로운 체험 프로필 생성',
    newbieModalSub: '평가자 및 방문객이 직접 매장 또는 크리에이터를 등록하여 실시간 매칭을 테스트',
    newbieBizTab: '새 매장 등록',
    newbieCreatorTab: '새 크리에이터 등록',
    newbieBizName: '매장 / 브랜드명',
    newbieCategory: '업종 카테고리',
    newbieLocation: '주소 / 지역 (하노이)',
    newbieBudget: '샘플 캠페인 예산 (VND)',
    newbieDesc: '매장 소개글',
    newbieCreatorName: '크리에이터 성명',
    newbieCreatorUsername: '계정 아이디 (@username)',
    newbieNiche: '주요 콘텐츠 분야',
    newbieFollowers: '예상 팔로워 수',
    newbieRate: '희망 단가 (VND/영상)',
    newbieBio: '프로필 소개 (Bio)',
    newbieSubmit: '저장하고 시작하기',
    activeCollabsTitle: '진행 중인 협업',
    activeCollabsDesc: '예치금부터 영상 승인까지 단계별 추적',
    activeCampaigns: '모집 중인 캠페인',
    allCampaigns: '전체 캠페인',
    availableCampaigns: '지원 가능한 캠페인',
    aiRecommendedCreators: 'AI 추천 크리에이터',
    recommendedForYou: '회원님을 위한 추천',
    browseAllCreators: '전체 크리에이터 보기',
    allNiches: '모든 분야',
    anyBudget: '모든 예산',
    under700k: '70만 동 이하',
    above700k: '70만 동 이상',
    createCampaignBtn: '새 캠페인 만들기',
    campaignBudget: '캠페인 예산',
    detailsBtn: '상세보기',
    interestedBtn: '관심있음',
    acceptOffer: '제안 수락',
    counterOffer: '역제안 하기',
    decline: '거절',
    confirmBooking: '방문 예약 확정',
    submitContentBtn: '영상 초안 제출',
    approveContentBtn: '영상 승인 및 정산',
    requestRevisionBtn: '수정 요청',
    leaveReviewBtn: '리뷰 작성',
    collabRoomTitle: '온라인 협업 룸',
    secNegotiation: '협상 단계',
    secBooking: '촬영 일정 예약',
    secInEscrow: '에스크로 예치 완료',
    secContent: '콘텐츠 검토',
    secPayment: '정산 완료',
    secReviews: '파트너 평가',
    walletTitle: '지갑 및 정산 관리',
    walletSub: '출금 가능 잔액, 예치 중 금액 및 정산 내역 확인',
    withdrawBtn: '계좌로 출금하기',
    payoutHistory: '정산 내역',
    totalEarned: '총 누적 수익',
    holdingInEscrow: '에스크로 보관 중',
    escrowHeld: '예치 중',
    fundsReleased: '정산 완료',
    matchesTitle: '매칭된 협업 목록',
    matchesSub: '함께 협업하기로 동의한 파트너들',
    openCollabRoom: '협업 룸 입장',
    viewRoom: '입장',
    noMatchesYet: '아직 매칭이 없습니다',
    noMatchesDesc: '캠페인을 스와이프하거나 제안을 보내 매칭을 시작하세요!',
    swipeTitleBiz: '하노이 크리에이터 스와이프',
    swipeTitleCreator: '내 주변 매장 캠페인 스와이프',
    matchStamp: '매칭 / 관심',
    passStamp: '패스',
    allCaughtUp: '모든 카드를 확인했습니다!',
    resetDeck: '카드 다시 보기',
    mapViewBtn: '지도 보기',
    openSwipeNow: '지금 스와이프하기',
    resetDemoBtn: '데모 데이터 초기화',
    reportHelp: '신고 및 분쟁 해결',
    sendMsg: '메시지 전송',
    typeMessage: '메시지를 입력하세요...',
    directMessages: '실시간 대화',
    bizVerified: '검증된 사업자',
    verifiedBadge: '인증 완료',
    totalViews: '총 영상 조회수',
    avgViews: '평균 조회수',
    totalEngagement: '총 참여도',
    conversions: '쿠폰 전환 수',
    creatorBreakdown: '크리에이터별 성과',
    promoCodeRedeemed: '사용된 프로필 쿠폰',
    estimatedEarnings: '예상 총 수익',
    awaitingAgreement: '협의 대기 중',
    pendingRequests: '대기 중인 요청',
    matchScore: '매칭 적합도',
    creatorMatches: '크리에이터 매칭'
  }
};
