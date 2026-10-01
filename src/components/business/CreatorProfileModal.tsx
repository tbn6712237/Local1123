import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { CreatorServicePackage, CreatorPortfolioItem } from '../../types';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Eye, 
  Users, 
  Award, 
  MessageSquare, 
  Calendar,
  ExternalLink,
  ShieldCheck,
  Heart,
  Building2,
  Sparkles,
  Camera,
  Video,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  Play,
  Check,
  ChevronRight,
  Zap,
  Shield,
  FileText,
  BarChart3,
  Mic,
  Layers,
  ThumbsUp,
  Tag,
  ArrowRight,
  Music,
  ShoppingBag,
  Sliders,
  CheckCircle
} from 'lucide-react';

type ProfileTab = 'overview' | 'projects' | 'audience' | 'packages' | 'reviews' | 'policies';

export const CreatorProfileModal: React.FC = () => {
  const { 
    viewingCreatorId, 
    setViewingCreatorId, 
    creators, 
    likeCreator, 
    likes, 
    activeBusiness,
    setActiveMatchId,
    setCurrentView,
    sendOffer
  } = useApp();

  const { t, l, loc } = useT();

  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [selectedVideo, setSelectedVideo] = useState<CreatorPortfolioItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!viewingCreatorId) return null;

  const creator = creators.find(c => c.id === viewingCreatorId);
  if (!creator) return null;

  const isLiked = likes[`${activeBusiness.id}_${creator.id}`];

  // Calculate dynamic match score with active business
  const businessCategory = activeBusiness.category || '';
  const matchingFit = creator.categoryFits?.find(fit => 
    businessCategory.toLowerCase().includes(fit.category.toLowerCase()) ||
    fit.category.toLowerCase().includes(businessCategory.toLowerCase())
  );
  const matchScore = matchingFit ? matchingFit.matchScore : 95;
  const matchNote = matchingFit ? loc(matchingFit.note) : l(
    'Rất phù hợp với tệp khách hàng trẻ, ưa thích trải nghiệm không gian và thưởng thức menu tại quán.',
    'Highly suitable for young demographic, venue ambiance and menu discovery.',
    '젊은 고객층과 매장 분위기 및 메뉴 탐방에 매우 적합합니다.'
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSelectPackage = (pkg: CreatorServicePackage) => {
    const matchId = likeCreator(creator.id);
    if (matchId) {
      sendOffer(
        matchId, 
        pkg.price, 
        `${pkg.name} (${pkg.features.slice(0, 2).join(', ')})`, 
        `Đã chọn ${pkg.name} với chi phí ${pkg.priceDisplay} từ hồ sơ cá nhân.`
      );
      setActiveMatchId(matchId);
      setCurrentView('collab');
      setViewingCreatorId(null);
    }
  };

  const handleStartCollab = () => {
    const matchId = likeCreator(creator.id);
    if (matchId) {
      setActiveMatchId(matchId);
      setCurrentView('collab');
    }
    setViewingCreatorId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-[#EBEBEB] my-6 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#222222] hover:bg-white shadow-sm cursor-pointer border border-[#DDDDDD] transition-all hover:scale-105"
            title={l('Sao chép liên kết hồ sơ', 'Copy profile link', '프로필 링크 복사')}
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setViewingCreatorId(null)}
            className="p-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#222222] hover:bg-white shadow-sm cursor-pointer border border-[#DDDDDD] transition-all hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Header Banner */}
          <div className="relative h-48 sm:h-56 bg-gradient-to-r from-rose-100 via-orange-50 to-amber-100 border-b border-[#EBEBEB] overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2">
              <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-semibold text-[#222222] shadow-xs border border-[#EBEBEB] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                {l('Hồ Sơ Đã Kiểm Định Nền Tảng', 'Platform Verified Creator Profile', '검증된 크리에이터 공식 프로필')}
              </span>
            </div>

            {/* Avatar & Key Badges overlapping */}
            <div className="absolute -bottom-10 left-6 sm:left-8 flex items-end gap-4">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-[#F7F7F7]">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Đang trực tuyến" />
              </div>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="pt-14 px-6 sm:px-8 pb-5 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
                    {creator.name}
                  </h1>
                  <span className="text-[16px] text-[#717171] font-medium">{creator.username}</span>
                  <span className="bg-[#EFF6FF] text-[#2563EB] text-[12px] font-semibold px-3 py-0.5 rounded-full border border-[#2563EB]/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                    {t.verifiedBadge}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[14px] text-[#717171] mt-1 font-medium">
                  <span className="text-[#222222] font-semibold bg-[#F7F7F7] px-2.5 py-0.5 rounded-lg border border-[#EBEBEB]">
                    {loc(creator.niche)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#717171]" />
                    {creator.location} ({creator.distanceKm} km {l('từ quán của bạn', 'from your venue', '귀하 매장에서')})
                  </span>
                  <span className="text-[#222222] font-semibold">
                    {creator.rateDisplay}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => likeCreator(creator.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isLiked 
                      ? 'bg-[#EFF6FF] border-[#2563EB]/40 text-[#2563EB]' 
                      : 'border-[#DDDDDD] hover:border-[#222222] text-[#717171]'
                  }`}
                  title={isLiked ? 'Đã yêu thích' : 'Lưu vào danh sách'}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#2563EB] text-[#2563EB]' : ''}`} />
                </button>

                <button
                  onClick={handleStartCollab}
                  className="px-6 py-3 btn-airbnb-primary text-white text-[14px] font-semibold rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>{l('Gửi Đề Xuất Báo Giá', 'Send Offer Proposal', '제안 보내기')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Smart Business Match Banner */}
            <div className="bg-gradient-to-r from-[#EFF6FF] via-rose-50/40 to-orange-50/50 p-4 sm:p-5 rounded-2xl border border-[#2563EB]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#2563EB] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    {matchScore}% Match
                  </span>
                  <span className="text-[14px] font-semibold text-[#222222]">
                    {l('Mức độ tương thích với', 'Compatibility with', '매장 적합도:')} <span className="text-[#2563EB]">{activeBusiness.name}</span>
                  </span>
                </div>
                <p className="text-[13px] text-[#717171] leading-relaxed">
                  {matchNote}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <span className="text-[12px] bg-white text-[#222222] font-semibold px-3 py-1.5 rounded-xl border border-[#EBEBEB] shadow-xs">
                  ⚡ {l('Phản hồi < 2h', 'Responds < 2h', '답변 2시간 이내')}
                </span>
                <span className="text-[12px] bg-white text-[#008A05] font-semibold px-3 py-1.5 rounded-xl border border-[#008A05]/20 shadow-xs">
                  🛡️ {l('Escrow Bảo Vệ', 'Escrow Protected', '안심 에스크로')}
                </span>
              </div>
            </div>

            {/* 6 Core Verification Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-[13px]">
              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{t.followers}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">{creator.followersDisplay}</span>
                <span className="text-[11px] text-[#717171]">TikTok & Instagram</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{t.avgViews}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">{creator.averageViewsDisplay}</span>
                <span className="text-[11px] text-[#008A05] font-semibold">{creator.engagementRate}% engagement</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Tỉ Lệ Hoàn Thành', 'Completion Rate', '협업 완료율')}</span>
                <span className="text-[18px] font-semibold text-[#008A05] mt-0.5 block">{creator.completionRate}%</span>
                <span className="text-[11px] text-[#717171]">{l('Không hủy lịch', 'Zero cancellations', '취소 없음')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Tốc Độ Phản Hồi', 'Response Rate', '응답 속도')}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">{creator.responseRate}%</span>
                <span className="text-[11px] text-[#717171]">{l('Trung bình 1.5h', 'Avg 1.5 hours', '평균 1.5시간')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Quán Đã Hợp Tác', 'Past Venues', '협업 매장 수')}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">{creator.previousCollabsCount}+</span>
                <span className="text-[11px] text-[#717171]">{l('Chiến dịch thật', 'Verified collabs', '실제 협업 건')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Điểm Đánh Giá', 'Review Score', '평점')}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                  <span>{creator.rating}</span>
                </span>
                <span className="text-[11px] text-[#717171]">({creator.reviews.length} {l('đánh giá', 'reviews', '리뷰')})</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-[#EBEBEB] overflow-x-auto">
              <div className="flex items-center gap-1 sm:gap-2 min-w-max">
                {[
                  { id: 'overview', label: l('Năng Lực & Kỹ Năng', 'Capabilities & Gear', '핵심 역량 및 장비'), icon: Sparkles },
                  { id: 'projects', label: l('Dự Án & Case Studies', 'Projects & Proof', '수행 프로젝트 & 성과'), icon: Video, badge: creator.caseStudies?.length },
                  { id: 'audience', label: l('Chân Dung Khán Giả', 'Audience Demographics', '시청자 분석 타겟'), icon: Users },
                  { id: 'packages', label: l('Bảng Giá & Gói Dịch Vụ', 'Packages & Rates', '정찰제 패키지'), icon: Tag, badge: creator.packages?.length },
                  { id: 'reviews', label: l('Đánh Giá Từ Quán', 'Business Reviews', '광고주 실제 평가'), icon: Star, badge: creator.reviews.length },
                  { id: 'policies', label: l('Chính Sách & An Toàn', 'Policies & Protection', '협업 규정 및 보증'), icon: ShieldCheck }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as ProfileTab)}
                      className={`pb-3.5 px-3 sm:px-4 text-[14px] font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'border-[#2563EB] text-[#2563EB]'
                          : 'border-transparent text-[#717171] hover:text-[#222222]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      {tab.badge !== undefined && (
                        <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? 'bg-[#2563EB] text-white' : 'bg-[#EBEBEB] text-[#717171]'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab 1: Overview & Capabilities */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Creator Bio & Vision */}
                <div className="space-y-2">
                  <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2563EB]" />
                    {l('Tôn Chỉ & Phong Cách Sáng Tạo', 'Creative Philosophy & Bio', '크리에이터 소개 및 철학')}
                  </h3>
                  <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-2">
                    <p className="text-[14px] sm:text-[15px] text-[#222222] leading-relaxed">
                      {loc(creator.bio)}
                    </p>
                    {creator.contentStyleTags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {creator.contentStyleTags.map((tag) => (
                          <span key={tag} className="text-[12px] font-medium text-[#2563EB] bg-white px-2.5 py-0.5 rounded-md border border-[#EBEBEB]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Core Capabilities Detailed Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#2563EB]" />
                      {l('Năng Lực Sản Xuất & Thế Mạnh Chuyên Sâu', 'Key Production Capabilities', '전문 제작 역량 및 강점')}
                    </h3>
                    <span className="text-[12px] text-[#717171]">
                      {creator.capabilities?.length || 0} {l('kỹ năng đã xác minh', 'verified skills', '검증된 역량')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {creator.capabilities && creator.capabilities.length > 0 ? (
                      creator.capabilities.map((cap) => (
                        <div key={cap.id} className="p-4 bg-white rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-all space-y-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-[#222222] text-[14px]">
                              {loc(cap.name)}
                            </span>
                            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF7EE] text-[#008A05] border border-[#008A05]/20 shrink-0">
                              {loc(cap.level)}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#717171] leading-relaxed">
                            {loc(cap.description)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 p-6 text-center text-[#717171] text-[14px] bg-[#F7F7F7] rounded-2xl">
                        {l('Thông tin kỹ năng đang được cập nhật', 'Skills updating', '역량 정보 업데이트 중')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Production Gear & Equipment */}
                <div className="space-y-3">
                  <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#2563EB]" />
                    {l('Thiết Bị Ghi Hình & Phần Mềm Hậu Kỳ', 'Production Gear & Equipment', '보유 촬영 장비 및 편집 툴')}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {creator.equipment?.map((eq, i) => (
                      <div key={i} className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-white border border-[#EBEBEB] flex items-center justify-center text-[#2563EB]">
                            {i === 0 ? <Camera className="w-3.5 h-3.5" /> :
                             i === 1 ? <Mic className="w-3.5 h-3.5" /> :
                             i === 2 ? <Sliders className="w-3.5 h-3.5" /> :
                                       <Layers className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-[13px] font-semibold text-[#222222]">
                            {loc(eq.category)}
                          </span>
                        </div>
                        <ul className="space-y-1 text-[12px] text-[#717171]">
                          {eq.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{loc(item)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-Step Standardized Workflow */}
                <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2563EB]" />
                      {l('Quy Trình Hợp Tác Chuẩn 4 Bước', 'Standard 4-Step Workflow', '표준 4단계 협업 프로세스')}
                    </h3>
                    <span className="text-[12px] bg-[#EFF6FF] text-[#2563EB] font-semibold px-2.5 py-0.5 rounded-full border border-[#2563EB]/20">
                      {l('Bàn giao trong 48h', '48h Turnaround', '48시간 내 초안 납품')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                    <div className="p-3.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] space-y-1">
                      <span className="text-[11px] font-mono font-semibold text-[#2563EB]">{l('BƯỚC 1', 'STEP 1', '1단계')}</span>
                      <h4 className="text-[13px] font-semibold text-[#222222]">{l('Thống Nhất Brief & Ngày Ghé', 'Agree on Brief & Date', '브리프 및 일정 조율')}</h4>
                      <p className="text-[12px] text-[#717171]">{l('Chủ quán gửi mong muốn, creator lên sườn kịch bản video.', 'Venue shares objectives, creator outlines video script concept.', '매장 요청사항 전달 및 영상 기획안 수립.')}</p>
                    </div>
                    <div className="p-3.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] space-y-1">
                      <span className="text-[11px] font-mono font-semibold text-[#2563EB]">{l('BƯỚC 2', 'STEP 2', '2단계')}</span>
                      <h4 className="text-[13px] font-semibold text-[#222222]">{l('Ghé Quán Trải Nghiệm', 'Visit & Experience', '매장 방문 및 촬영')}</h4>
                      <p className="text-[12px] text-[#717171]">{l('Quay B-roll 4K và thử món 1-2h, lịch sự không làm phiền khách.', 'Shoot 4K B-roll and taste menu (1-2h), courteous and discreet.', '1-2시간 4K B-roll 촬영 및 메뉴 시식 진행.')}</p>
                    </div>
                    <div className="p-3.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] space-y-1">
                      <span className="text-[11px] font-mono font-semibold text-[#2563EB]">{l('BƯỚC 3', 'STEP 3', '3단계')}</span>
                      <h4 className="text-[13px] font-semibold text-[#222222]">{l('Dựng Phim & Gửi Duyệt', 'Edit & Submit Draft', '영상 편집 및 초안 제출')}</h4>
                      <p className="text-[12px] text-[#717171]">{l('Gửi video bản nháp trong 48h để quán góp ý và chỉnh sửa.', 'Deliver draft video within 48h for feedback and revisions.', '48시간 내 초안 제출 및 피드백 반영.')}</p>
                    </div>
                    <div className="p-3.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] space-y-1">
                      <span className="text-[11px] font-mono font-semibold text-[#2563EB]">{l('BƯỚC 4', 'STEP 4', '4단계')}</span>
                      <h4 className="text-[13px] font-semibold text-[#222222]">{l('Đăng Tải & Đo Lường', 'Publish & Measure', '게시 및 성과 측정')}</h4>
                      <p className="text-[12px] text-[#717171]">{l('Đăng giờ vàng kèm mã voucher, theo dõi lượt xem và khách đến.', 'Post at prime time with exclusive promo code, track views and traffic.', '골든타임 업로드 및 전용 쿠폰 유입 추적.')}</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Projects & Case Studies */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Proven Case Studies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#2563EB]" />
                      {l('Chiến Dịch Đã Triển Khai Cho Các Quán', 'Past Venue Case Studies', '실제 매장 협업 성공 사례')}
                    </h3>
                    <span className="text-[12px] text-[#717171]">
                      {l('Số liệu thực tế đo lường', 'Verified metrics', '실제 측정 데이터')}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {creator.caseStudies && creator.caseStudies.length > 0 ? (
                      creator.caseStudies.map((cs) => (
                        <div key={cs.id} className="p-5 bg-white rounded-2xl border border-[#EBEBEB] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBEBEB] pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-[16px] text-[#222222] flex items-center gap-1.5">
                                  <Building2 className="w-4 h-4 text-[#2563EB]" />
                                  {cs.brandName}
                                </span>
                                <span className="text-[12px] text-[#717171] bg-[#F7F7F7] px-2 py-0.5 rounded-md border border-[#EBEBEB]">
                                  {cs.date}
                                </span>
                              </div>
                              <p className="text-[14px] font-medium text-[#222222] mt-1">
                                {cs.campaignTitle}
                              </p>
                            </div>
                            <span className="text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#2563EB]/20 self-start sm:self-center">
                              {cs.results.highlight}
                            </span>
                          </div>

                          {/* Deliverables summary */}
                          <div className="text-[13px] text-[#717171] flex items-center gap-1.5">
                            <span className="font-semibold text-[#222222]">{l('Sản phẩm bàn giao:', 'Deliverables:', '제작 산출물:')}</span>
                            <span>{cs.deliverables}</span>
                          </div>

                          {/* 4 Performance Metric Badges */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                            <div className="p-2.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] text-center">
                              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Lượt Xem Video', 'Video Views', '조회수')}</span>
                              <span className="text-[16px] font-semibold text-[#222222]">{cs.results.views}</span>
                            </div>
                            <div className="p-2.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] text-center">
                              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Lượt Lưu Địa Chỉ', 'Place Saves', '저장수')}</span>
                              <span className="text-[16px] font-semibold text-[#2563EB]">{cs.results.saves}</span>
                            </div>
                            <div className="p-2.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] text-center">
                              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Khách Dùng Voucher', 'Voucher Uses', '쿠폰 사용')}</span>
                              <span className="text-[16px] font-semibold text-[#008A05]">{cs.results.redemptions} {l('lượt', 'uses', '건')}</span>
                            </div>
                            <div className="p-2.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] text-center">
                              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Tăng Trưởng Khách', 'Customer Lift', '방문 증가')}</span>
                              <span className="text-[16px] font-semibold text-[#222222]">+25-35%</span>
                            </div>
                          </div>

                          {/* Client testimonial quote */}
                          {cs.quote && (
                            <div className="p-3 bg-[#F7F7F7] rounded-xl border-l-4 border-[#2563EB] text-[13px] text-[#222222] italic">
                              {cs.quote}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-[#717171] text-[14px] bg-[#F7F7F7] rounded-2xl">
                        {l('Đang cập nhật thêm case study', 'Case studies updating', '사례 업데이트 중')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Portfolio Videos Visual Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                      <Play className="w-4 h-4 text-[#2563EB]" />
                      {l('Thư Viện Video Review Thực Tế', 'Featured Video Portfolio', '대표 포트폴리오 영상')}
                    </h3>
                    <span className="text-[12px] text-[#717171]">
                      {l('Nhấn vào video để xem chi tiết', 'Click video to preview', '클릭하여 미리보기')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {creator.portfolio.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedVideo(item)}
                        className="group bg-white rounded-2xl border border-[#EBEBEB] hover:border-[#222222] overflow-hidden cursor-pointer transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col"
                      >
                        {/* Thumbnail with overlay */}
                        <div className="relative h-44 bg-[#F7F7F7] overflow-hidden">
                          <img
                            src={item.thumbnailUrl || '/src/assets/images/luna_coffee_interior_1790496155821.jpg'}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                          
                          {/* Duration Badge */}
                          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-mono text-white font-semibold">
                            {item.videoDuration || '0:55'}
                          </div>

                          {/* Platform Pill */}
                          <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-[#222222]">
                            {item.platform}
                          </div>

                          {/* Center Play Button on hover */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity">
                            <div className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-[#2563EB] group-hover:text-white text-[#222222] flex items-center justify-center shadow-lg transition-colors">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Bottom Stats */}
                          <div className="absolute bottom-2.5 left-3 right-3 text-white flex items-center justify-between text-[12px] font-semibold">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5 text-white" />
                              {item.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Bookmark className="w-3.5 h-3.5 text-[#2563EB]" />
                              {item.savesCount || '2.4K'} saves
                            </span>
                          </div>
                        </div>

                        {/* Title & Caption */}
                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                          <h4 className="font-semibold text-[#222222] text-[14px] line-clamp-2 leading-snug">
                            {loc(item.title)}
                          </h4>
                          {item.caption && (
                            <p className="text-[12px] text-[#717171] line-clamp-2 italic">
                              "{loc(item.caption)}"
                            </p>
                          )}
                          <div className="pt-1 flex items-center justify-between text-[12px] text-[#717171]">
                            <span>{l('Tương tác:', 'Engagement:', '참여도:')} <strong className="text-[#008A05]">{item.engagement}</strong></span>
                            <span className="text-[#2563EB] font-semibold group-hover:underline">{l('Chi tiết →', 'Details →', '상세보기 →')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tab 3: Audience Demographics */}
            {activeTab === 'audience' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Purchasing Habit Banner */}
                <div className="p-4 sm:p-5 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
                    <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider">
                      {l('Thói Quen Tiêu Dùng & Mức Chi Tiêu Của Khán Giả', 'Purchasing Habits & Spend Capacity', '시청자 소비 성향 및 객단가')}
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#222222] leading-relaxed">
                    {creator.audienceDemographics?.purchasingHabits || l(
                      'Khán giả trẻ trung, dân văn phòng tại Hà Nội, thích khám phá các quán cafe có gu và món ăn ngon cuối tuần. Mức chi tiêu 70.000₫ – 150.000₫/buổi.',
                      'Young professionals in Hanoi who frequent cafes and restaurants on weekends. Average spend 70k-150k VND per visit.',
                      '주말 카페와 맛집 탐방을 즐기는 하노이 직장인 및 젊은 층. 1회 평균 소비 7만~15만 동.'
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Age Distribution */}
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-3">
                    <h4 className="text-[14px] font-semibold text-[#222222] flex items-center justify-between">
                      <span>{l('Phân Bố Độ Tuổi', 'Age Distribution', '연령대 분포')}</span>
                      <span className="text-[12px] text-[#008A05] font-semibold">{l('Tập trung 18-34 tuổi (90%)', 'Core: 18-34 years (90%)', '18-34세 집중 (90%)')}</span>
                    </h4>

                    <div className="space-y-2.5">
                      {creator.audienceDemographics?.ageGroups.map((ag) => (
                        <div key={ag.range} className="space-y-1">
                          <div className="flex items-center justify-between text-[13px]">
                            <span className="font-medium text-[#222222]">{ag.range}</span>
                            <span className="font-semibold text-[#222222]">{ag.percent}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[#F7F7F7] overflow-hidden">
                            <div 
                              className="h-full bg-[#2563EB] rounded-full transition-all duration-500" 
                              style={{ width: `${ag.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gender Split */}
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-3">
                    <h4 className="text-[14px] font-semibold text-[#222222] flex items-center justify-between">
                      <span>{l('Tỉ Lệ Giới Tính', 'Gender Split', '성별 비율')}</span>
                      <span className="text-[12px] text-[#717171]">{l('Dữ liệu từ TikTok Analytics', 'Data from TikTok Analytics', 'TikTok 애널리틱스 데이터')}</span>
                    </h4>

                    <div className="pt-2 space-y-3">
                      <div className="flex items-center justify-between text-[14px] font-semibold">
                        <span className="text-rose-500">{l('Nữ', 'Female', '여성')} ({creator.audienceDemographics?.gender.female}%)</span>
                        <span className="text-blue-500">{l('Nam', 'Male', '남성')} ({creator.audienceDemographics?.gender.male}%)</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-[#F7F7F7] overflow-hidden flex">
                        <div 
                          className="h-full bg-rose-400 transition-all duration-500" 
                          style={{ width: `${creator.audienceDemographics?.gender.female}%` }}
                        />
                        <div 
                          className="h-full bg-blue-400 transition-all duration-500" 
                          style={{ width: `${creator.audienceDemographics?.gender.male}%` }}
                        />
                      </div>
                      <p className="text-[12px] text-[#717171] leading-relaxed">
                        {l(
                          'Tệp khán giả nữ chiếm ưu thế rất lớn trong việc quyết định địa điểm ăn uống, đi cafe và chăm sóc sắc đẹp.',
                          'Female audience heavily influences dining, cafe, and wellness destination choices.',
                          '여성 시청자 층이 식음료, 카페 및 뷰티 방문 결정에 큰 영향력을 발휘합니다.'
                        )}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Top Geographic Locations */}
                <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-3">
                  <h4 className="text-[14px] font-semibold text-[#222222] flex items-center justify-between">
                    <span>{l('Vị Trí Địa Lý Khán Giả', 'Geographic Distribution', '지역별 시청자 분포')}</span>
                    <span className="text-[12px] text-[#2563EB] font-semibold">{l('Đô thị trọng điểm chiếm trên 80%', 'Key urban centers over 80%', '주요 도시 80% 이상')}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {creator.audienceDemographics?.topLocations.map((locItem, idx) => (
                      <div key={idx} className="p-3.5 bg-[#F7F7F7] rounded-xl border border-[#EBEBEB] space-y-1">
                        <span className="text-[12px] text-[#717171] block">{locItem.city}</span>
                        <span className="text-[20px] font-semibold text-[#222222]">{locItem.percent}%</span>
                        <span className="text-[11px] text-[#008A05] block font-medium">{l('Khách hàng địa phương', 'Local Customers', '로컬 고객')}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tab 4: Packages & Pricing */}
            {activeTab === 'packages' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#222222]">
                      {l('Các Gói Hợp Tác Tiêu Chuẩn & Minh Bạch', 'Standardized Collaboration Packages', '정찰제 공식 협업 패키지')}
                    </h3>
                    <p className="text-[13px] text-[#717171]">
                      {l('Giá đã bao gồm quay dựng, hậu kỳ và quyền lợi xuất bản', 'All-inclusive pricing including shooting, editing and publishing rights', '촬영, 편집 및 게시 권한 일체 포함 정찰가')}
                    </p>
                  </div>
                  <span className="text-[12px] bg-[#EBF7EE] text-[#008A05] font-semibold px-3 py-1 rounded-full border border-[#008A05]/20 self-start sm:self-center">
                    {l('✓ Không phát sinh chi phí phụ', '✓ No Hidden Surcharges', '✓ 추가 비용 없음')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {creator.packages?.map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all ${
                        pkg.isRecommended 
                          ? 'border-[#2563EB] bg-[#EFF6FF]/30 shadow-[0_4px_16px_rgba(37,99,235,0.12)] ring-1 ring-[#2563EB]' 
                          : 'border-[#EBEBEB] bg-white hover:border-[#DDDDDD]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#222222] text-[15px]">{pkg.name}</h4>
                          {pkg.isRecommended && (
                            <span className="text-[10px] font-semibold uppercase bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                              {l('Khuyên dùng', 'Recommended', '추천')}
                            </span>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <div className="text-[24px] font-semibold text-[#222222] font-display">
                            {pkg.priceDisplay}
                          </div>
                          <div className="flex items-center gap-3 text-[12px] text-[#717171]">
                            <span>{l('Giao trong:', 'Turnaround:', '납품:')} <strong className="text-[#222222]">{pkg.turnaroundDays} {l('ngày', 'days', '일')}</strong></span>
                            <span>•</span>
                            <span>{l('Sửa:', 'Revisions:', '수정:')} <strong className="text-[#222222]">{pkg.revisions} {l('lần', 'rounds', '회')}</strong></span>
                          </div>
                        </div>

                        <div className="border-t border-[#EBEBEB] pt-3 space-y-2">
                          <span className="text-[12px] font-semibold text-[#717171] uppercase tracking-wider block">
                            {l('Quyền lợi bao gồm:', 'Features Included:', '포함 혜택:')}
                          </span>
                          <ul className="space-y-2 text-[13px] text-[#222222]">
                            {pkg.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{loc(feat)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectPackage(pkg)}
                        className={`w-full py-2.5 rounded-xl text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          pkg.isRecommended
                            ? 'btn-airbnb-primary shadow-xs'
                            : 'border border-[#222222] hover:bg-[#F7F7F7] text-[#222222]'
                        }`}
                      >
                        <span>{l('Chọn Gói Này & Đàm Phán', 'Select Package & Negotiate', '이 패키지로 협업 시작')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
                  <div className="text-[#717171]">
                    <span className="font-semibold text-[#222222]">{l('Cần gói tùy chỉnh riêng?', 'Need a tailored package?', '맞춤 패키지가 필요하신가요?')}</span> {l('Quán có thể gửi ngân sách đề xuất tự do qua tính năng Đàm Phán Giá.', 'You can propose a custom budget through the Price Negotiation tool.', '가격 협상 도구를 통해 자유롭게 예산을 제안하실 수 있습니다.')}
                  </div>
                  <button
                    onClick={handleStartCollab}
                    className="text-[#2563EB] font-semibold hover:underline shrink-0"
                  >
                    {l('Gửi đề xuất tự do →', 'Propose custom offer →', '자유 제안 보내기 →')}
                  </button>
                </div>
              </div>
            )}

            {/* Tab 5: Business Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Rating Criteria Score Summary */}
                <div className="p-5 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBEBEB] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[36px] font-semibold text-[#222222] font-display">
                        {creator.rating}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[#222222]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#222222] text-[#222222]" />
                          ))}
                        </div>
                        <span className="text-[13px] text-[#717171]">
                          {l(
                            `Dựa trên ${creator.reviews.length} đánh giá kiểm định từ chủ quán`,
                            `Based on ${creator.reviews.length} verified venue reviews`,
                            `광고주 검증 후기 ${creator.reviews.length}개 기준`
                          )}
                        </span>
                      </div>
                    </div>
                    <span className="text-[12px] bg-white text-[#008A05] font-semibold px-3 py-1.5 rounded-full border border-[#008A05]/20 shadow-xs self-start sm:self-center">
                      {l('100% Đánh giá thật sau khi giải ngân Escrow', '100% Verified reviews post-escrow payout', '100% 에스크로 정산 완료 후 작성된 실제 평가')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
                    <div>
                      <span className="text-[#717171] block">{l('Giao tiếp & Thái độ', 'Communication', '소통 및 태도')}</span>
                      <strong className="text-[16px] text-[#222222]">5.0 / 5.0</strong>
                    </div>
                    <div>
                      <span className="text-[#717171] block">{l('Chất lượng video & Thẩm mỹ', 'Video Aesthetics', '영상 퀄리티 및 미감')}</span>
                      <strong className="text-[16px] text-[#222222]">4.9 / 5.0</strong>
                    </div>
                    <div>
                      <span className="text-[#717171] block">{l('Tác phong & Đúng hẹn', 'Punctuality', '약속 및 마감 준수')}</span>
                      <strong className="text-[16px] text-[#222222]">5.0 / 5.0</strong>
                    </div>
                    <div>
                      <span className="text-[#717171] block">{l('Hiệu quả kéo khách', 'Foot-traffic ROI', '실제 고객 유입 효과')}</span>
                      <strong className="text-[16px] text-[#008A05]">4.8 / 5.0</strong>
                    </div>
                  </div>
                </div>

                {/* Individual Review Cards */}
                <div className="space-y-3">
                  {creator.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#F7F7F7] border border-[#EBEBEB] flex items-center justify-center font-semibold text-[#2563EB] text-[12px]">
                            {rev.authorName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-[#222222] text-[14px] block">{rev.authorName}</span>
                            <span className="text-[12px] text-[#717171]">{l('Chủ quán đối tác đã hợp tác', 'Verified Partner Venue', '협업 완료 공식 광고주')}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[#222222] text-[13px]">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                            ))}
                          </div>
                          <span className="text-[#717171] text-[12px]">({loc(rev.date)})</span>
                        </div>
                      </div>

                      <p className="text-[14px] text-[#222222] leading-relaxed italic">
                        "{loc(rev.comment)}"
                      </p>

                      {rev.criteria && rev.criteria.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#EBEBEB]/60">
                          {rev.criteria.map((c, i) => (
                            <span key={i} className="text-[11px] bg-[#F7F7F7] px-2 py-0.5 rounded-md text-[#717171] font-medium">
                              {loc(c.label)}: <strong className="text-[#222222]">{c.score}★</strong>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* Tab 6: Policies & Protection */}
            {activeTab === 'policies' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-[16px] font-semibold text-[#222222]">
                    {l('Cam Kết & Chính Sách Hợp Tác An Toàn', 'Commitments & Cooperation Policies', '협업 규정 및 신뢰 보증 정책')}
                  </h3>
                  <p className="text-[13px] text-[#717171]">
                    {l('Bảo vệ quyền lợi tối đa cho cả chủ quán và creator', 'Ensuring mutual rights for venues and creators', '광고주와 크리에이터 권익 보호 규정')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-[#008A05]">
                      <ShieldCheck className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">{l('Cam Kết Độc Quyền Khu Vực', 'Category Exclusivity Commitment', '상권 독점 보호 약정')}</h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {creator.policies?.exclusivityCommitment ? loc(creator.policies.exclusivityCommitment) : l('Cam kết không nhận review quán cafe/nhà hàng cùng phân khúc trong bán kính 1km trong vòng 14 ngày kể từ khi video xuất bản.', 'Will not review competing venues within 1km radius for 14 days following publication.', '게시 후 14일간 반경 1km 내 동일 업종 리뷰 진행 제한.')}
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-[#2563EB]">
                      <Zap className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">{l('Bản Quyền & Chạy Quảng Cáo (Spark Ads)', 'Advertising Rights & Spark Ads', '광고 라이선스 & Spark Ads 코드')}</h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {creator.policies?.adUsageRights ? loc(creator.policies.adUsageRights) : l('Quán được toàn quyền sử dụng video đăng tải lại trên các kênh chính thức của quán và cấp mã TikTok Spark Ads / Meta chạy quảng cáo trong 45 ngày.', 'Venue granted 45 days reposting rights and TikTok Spark Ads / Meta code authorization.', '45일간 공식 채널 리포스팅 및 TikTok Spark Ads 광고 집행 코드 제공.')}
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Calendar className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">{l('Lịch Quay & Đổi Lịch Linh Hoạt', 'Flexible Shoot Rescheduling', '유연한 촬영 일정 조율')}</h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {creator.policies?.cancellationNotice ? loc(creator.policies.cancellationNotice) : l('Thông báo đổi lịch trước 24 giờ. Nếu quán bận đột xuất hoặc thời tiết không thuận lợi, creator hỗ trợ sắp xếp quay bù miễn phí.', '24-hour advance notice for rescheduling. Free makeup shoot if unexpected venue rush or weather issues occur.', '24시간 전 사전 조율 시 기상 악화나 매장 사정으로 인한 무료 일정 변경 지원.')}
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Shield className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">{l('Cơ Chế Ký Quỹ Escrow An Toàn', 'Escrow Payment Safeguard', '안전 에스크로 예치 보증')}</h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {l('Ngân sách thù lao được giữ an toàn trong tài khoản bảo chứng của CollabLocal. Creator chỉ được nhận thanh toán khi chủ quán đã nghiệm thu và hài lòng với video.', 'Budget safely held in CollabLocal escrow. Payout released only upon venue satisfaction and draft approval.', '예치금은 에스크로 계좌에 보관되며 영상 승인 및 검수 완료 시 정산 지급됩니다.')}
                    </p>
                  </div>

                </div>
              </div>
            )}

          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:px-8 bg-white border-t border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#717171]">{l('Thù lao cơ bản:', 'Base rate:', '기본 단가:')}</span>
            <span className="text-[18px] font-semibold text-[#222222] font-display">
              {creator.rateDisplay}
            </span>
            <span className="text-[12px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {l('⚡ Sẵn sàng nhận dự án', '⚡ Open for Collaborations', '⚡ 프로젝트 수주 가능')}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('packages')}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#DDDDDD] hover:border-[#222222] rounded-xl text-[14px] font-semibold text-[#222222] transition-colors cursor-pointer"
            >
              {l('Xem Bảng Giá', 'View Packages', '패키지 보기')}
            </button>
            <button
              onClick={handleStartCollab}
              className="flex-1 sm:flex-initial px-6 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{l('Gửi Đề Xuất Báo Giá', 'Send Offer Proposal', '제안 보내기')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Video Simulation Mockup Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#181818] text-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-white/10 relative flex flex-col max-h-[85vh]">
            
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Simulated Screen */}
            <div className="relative aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedVideo.thumbnailUrl || '/src/assets/images/luna_coffee_interior_1790496155821.jpg'}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              {/* Sound animation */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
                <Music className="w-3 h-3 text-[#2563EB] animate-pulse" />
                <span className="truncate max-w-[140px]">{l('Âm thanh gốc - Chill Acoustic', 'Original Audio - Chill Acoustic', '오리지널 사운드 - 어쿠스틱')}</span>
              </div>

              {/* Vertical Action Column on Right */}
              <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4 text-white text-[11px] font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-rose-500">
                    <Heart className="w-5 h-5 fill-rose-500" />
                  </div>
                  <span>{selectedVideo.views}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span>248</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-[#2563EB]">
                    <Bookmark className="w-5 h-5 fill-[#2563EB]" />
                  </div>
                  <span>{selectedVideo.savesCount || '2.4K'}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span>{l('Chia sẻ', 'Share', '공유')}</span>
                </div>
              </div>

              {/* Bottom Video Metadata */}
              <div className="absolute bottom-4 left-4 right-16 space-y-1.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[13px]">{creator.username}</span>
                  <span className="bg-[#2563EB] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">Follow</span>
                </div>
                <h4 className="text-[13px] font-semibold leading-snug line-clamp-2">
                  {loc(selectedVideo.title)}
                </h4>
                {selectedVideo.caption && (
                  <p className="text-[12px] text-white/80 line-clamp-2">
                    {loc(selectedVideo.caption)}
                  </p>
                )}
                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <span>{selectedVideo.platform}</span>
                  <span>•</span>
                  <span>{l('Tương tác:', 'Engagement:', '참여도:')} {selectedVideo.engagement}</span>
                </div>
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="p-3 bg-[#222222] border-t border-white/10 flex items-center justify-between gap-2">
              <div className="text-[12px] text-white/70">
                {l('Thích phong cách video này?', 'Like this video style?', '이 영상 스타일이 마음에 드시나요?')}
              </div>
              <button
                onClick={() => {
                  setSelectedVideo(null);
                  handleStartCollab();
                }}
                className="px-4 py-1.5 btn-airbnb-primary text-white text-[12px] font-semibold rounded-lg"
              >
                {l('Đặt video tương tự →', 'Book Similar Video →', '유사 영상 제안하기 →')}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
