import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  X, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Calendar,
  MessageSquare,
  Award,
  Image as ImageIcon,
  ExternalLink,
  Sun,
  Volume2,
  Camera,
  Utensils,
  Gift,
  DollarSign,
  Clock,
  Users,
  Check,
  Sparkles,
  Heart,
  Share2,
  ArrowRight,
  ChevronRight,
  Zap,
  Shield,
  FileText,
  Phone,
  Navigation,
  Tag,
  Coffee,
  CheckCircle,
  Eye,
  Sliders,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

type SectionId = 'sec-filming' | 'sec-perks' | 'sec-menu' | 'sec-story' | 'sec-guidelines' | 'sec-reviews';

export const BusinessProfileModal: React.FC = () => {
  const { 
    viewingBusinessId, 
    setViewingBusinessId, 
    businesses, 
    campaigns, 
    activeCreator,
    likeCampaign,
    setActiveMatchId,
    setCurrentView
  } = useApp();

  const { t, l, loc } = useT();

  const [activeSection, setActiveSection] = useState<SectionId>('sec-filming');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!viewingBusinessId) return null;

  const business = businesses.find(b => b.id === viewingBusinessId);
  if (!business) return null;

  const bizCampaigns = campaigns.filter(c => c.businessId === business.id);
  const galleryPhotos = business.photos && business.photos.length > 0 ? business.photos : [business.image];

  // Calculate Creator-Venue Match
  const creatorNiche = activeCreator?.niche || '';
  const isGoodNicheMatch = 
    (business.category.includes('Cafe') && creatorNiche.includes('Ẩm Thực')) ||
    (business.category.includes('Ẩm Thực') && creatorNiche.includes('Ẩm Thực')) ||
    (business.category.includes('Spa') && creatorNiche.includes('Làm Đẹp')) ||
    (business.category.includes('Bar') && creatorNiche.includes('Đêm')) ||
    (business.category.includes('Workshop') && (creatorNiche.includes('Nhiếp Ảnh') || creatorNiche.includes('Đời Sống')));

  const matchPercent = isGoodNicheMatch ? 98 : 94;
  const matchExplanation = isGoodNicheMatch
    ? l(
        `Kênh của bạn (${activeCreator?.username}) chuyên về ${loc(creatorNiche)}, tệp người xem tại Hà Nội trùng khớp hoàn toàn với khách hàng mục tiêu của ${business.name}.`,
        `Your channel (${activeCreator?.username}) focuses on ${loc(creatorNiche)}, demographic matches target customers of ${business.name}.`,
        `귀하의 채널(${activeCreator?.username})의 콘텐츠 성향과 하노이 시청자층이 ${business.name}의 타겟 고객과 완벽히 일치합니다.`
      )
    : l(
        `Quán có không gian đẹp, ánh sáng tự nhiên và chính sách hỗ trợ Creator rất tốt, phù hợp cho video trải nghiệm đời sống và check-in.`,
        `Great venue aesthetics, natural light, and creator-friendly perks, ideal for lifestyle vlog content.`,
        `자연 채광과 포토존이 훌륭하며, 크리에이터 친화적인 편의를 제공하는 매장입니다.`
      );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleApplyCampaign = (campId: string) => {
    const matchId = likeCampaign(campId);
    if (matchId) {
      setActiveMatchId(matchId);
      setCurrentView('collab');
      setViewingBusinessId(null);
    }
  };

  const handleDirectCollab = () => {
    if (bizCampaigns.length > 0) {
      handleApplyCampaign(bizCampaigns[0].id);
    } else {
      setViewingBusinessId(null);
      setCurrentView('collab');
    }
  };

  const scrollTo = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target && scrollContainerRef.current) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scrollspy effect to highlight active anchor pill on scroll
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const sections: SectionId[] = [
      'sec-filming',
      'sec-perks',
      'sec-menu',
      'sec-story',
      'sec-guidelines',
      'sec-reviews'
    ];

    const scrollPos = container.scrollTop + 240;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        setActiveSection(sections[i]);
        break;
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.2)] border border-[#EBEBEB] my-6 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Floating Top Control Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#222222] hover:bg-white shadow-sm cursor-pointer border border-[#DDDDDD] transition-all hover:scale-105"
            title={l('Sao chép liên kết quán', 'Copy venue link', '매장 링크 복사')}
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              setViewingBusinessId(null);
              setSelectedPhoto(null);
            }}
            className="p-2.5 rounded-full bg-white/95 backdrop-blur-md text-[#222222] hover:bg-white shadow-sm cursor-pointer border border-[#DDDDDD] transition-all hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Container with Continuous Landing Page Flow */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-y-auto flex-1 scroll-smooth"
        >
          
          {/* Header Cover Image & Floating Elements */}
          <div className="relative h-52 sm:h-64 bg-[#F7F7F7] border-b border-[#EBEBEB] overflow-hidden">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            {/* Gallery Quick Pill */}
            <button
              onClick={() => setSelectedPhoto(galleryPhotos[0])}
              className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-full border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{galleryPhotos.length} {l('ảnh không gian & món', 'photos', '장의 사진')}</span>
            </button>

            {/* Overlapping Venue Logo */}
            <div className="absolute -bottom-8 left-6 sm:left-8 flex items-end gap-4 z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-1 shadow-xl border-4 border-white overflow-hidden shrink-0">
                <img
                  src={business.logo || business.image}
                  alt={`${business.name} logo`}
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Rating pill on cover */}
            <div className="absolute bottom-4 right-6 text-white flex items-center gap-1.5 text-[13px] font-semibold bg-black/60 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-xs">
              <Star className="w-4 h-4 fill-[#2563EB] text-[#2563EB]" />
              <span className="text-[15px] font-mono">{business.rating}</span>
              <span className="text-white/80 font-normal">({business.reviewsCount} {l('đánh giá', 'reviews', '리뷰')})</span>
            </div>
          </div>

          {/* Business Info Header */}
          <div className="pt-12 px-6 sm:px-8 pb-5 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-[24px] sm:text-[30px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
                    {business.name}
                  </h1>
                  <span className="bg-[#EFF6FF] text-[#2563EB] text-[12px] font-semibold px-3 py-0.5 rounded-full border border-[#2563EB]/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                    {t.bizVerified}
                  </span>
                  <span className="bg-[#EBF7EE] text-[#008A05] text-[12px] font-semibold px-3 py-0.5 rounded-full border border-[#008A05]/20 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {l('Đang Tuyển Creator', 'Accepting Creators', '크리에이터 모집 중')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[14px] text-[#717171] mt-1 font-medium">
                  <span className="text-[#222222] font-semibold bg-[#F7F7F7] px-2.5 py-0.5 rounded-lg border border-[#EBEBEB]">
                    {loc(business.category)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#717171]" />
                    {business.location}
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    ~{business.distanceKm} km {l('từ bạn', 'from you', '거리')}
                  </span>
                </div>
              </div>

              {/* Action Buttons for Creator */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSaved 
                      ? 'bg-[#EFF6FF] border-[#2563EB]/40 text-[#2563EB]' 
                      : 'border-[#DDDDDD] hover:border-[#222222] text-[#717171]'
                  }`}
                  title={isSaved ? l('Đã lưu quán', 'Saved venue', '저장됨') : l('Lưu quán vào danh sách', 'Save venue to list', '매장 저장')}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#2563EB] text-[#2563EB]' : ''}`} />
                </button>

                <button
                  onClick={handleDirectCollab}
                  className="px-6 py-3 btn-airbnb-primary text-white text-[14px] font-semibold rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span>{l('Ứng Tuyển Hợp Tác Ngay', 'Apply / Pitch Collaboration', '협업 제안하기')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Smart Creator Compatibility Box */}
            <div className="bg-gradient-to-r from-[#EFF6FF] via-rose-50/40 to-orange-50/50 p-4 sm:p-5 rounded-2xl border border-[#2563EB]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-[#2563EB] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    {matchPercent}% {l('Match Với Kênh Của Bạn', 'Match With Your Channel', '채널 적합도')}
                  </span>
                  <span className="text-[14px] font-semibold text-[#222222]">
                    {activeCreator ? activeCreator.username : 'Creator Channel'}
                  </span>
                </div>
                <p className="text-[13px] text-[#717171] leading-relaxed">
                  {matchExplanation}
                </p>
              </div>

              <div className="flex items-center gap-2 sm:self-center shrink-0">
                <span className="text-[12px] bg-white text-[#008A05] font-semibold px-3 py-1.5 rounded-xl border border-[#008A05]/20 shadow-xs">
                  {l('✓ Tasting Menu Miễn Phí', '✓ Free Tasting Menu', '✓ 무료 시식 메뉴')}
                </span>
                <span className="text-[12px] bg-white text-[#222222] font-semibold px-3 py-1.5 rounded-xl border border-[#EBEBEB] shadow-xs">
                  {l('🛡️ 100% Escrow Bảo Chứng', '🛡️ 100% Escrow Secured', '🛡️ 100% 안전 에스크로')}
                </span>
              </div>
            </div>

            {/* 6 Core Verification Metrics For Creators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-center text-[13px]">
              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Phản Hồi Chat', 'Response Rate', '응답률')}</span>
                <span className="text-[18px] font-semibold text-[#008A05] mt-0.5 block">{business.responseRate}%</span>
                <span className="text-[11px] text-[#717171]">{l('Trong vòng < 2h', 'Within 2 hours', '2시간 이내')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Đã Hợp Tác', 'Completed Collabs', '협업 건수')}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">{business.completedCollabs}+</span>
                <span className="text-[11px] text-[#717171]">{l('Creators đã quay', 'Creators filmed', '크리에이터 촬영')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Ký Quỹ Escrow', 'Escrow Protection', '안심 에스크로')}</span>
                <span className="text-[18px] font-semibold text-[#008A05] mt-0.5 block">100%</span>
                <span className="text-[11px] text-[#717171]">{l('Giải ngân đúng hẹn', 'Guaranteed pay', '정산 보증')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Đãi Ngộ Menu', 'Tasting Perk', '무료 시식')}</span>
                <span className="text-[18px] font-semibold text-[#2563EB] mt-0.5 block">{l('Miễn Phí', 'Complimentary', '무료')}</span>
                <span className="text-[11px] text-[#717171]">{l('+ 1 bạn đi cùng', '+1 guest allowed', '+1인 동반')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Thù Lao Tiền Mặt', 'Cash Budget', '현금 원고료')}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">600K–1.8M</span>
                <span className="text-[11px] text-[#717171]">{l('VND / video', 'VND / video', '동 / 영상')}</span>
              </div>

              <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Duyệt Video', 'Approval SLA', '검수 시간')}</span>
                <span className="text-[18px] font-semibold text-[#222222] mt-0.5 block">≤ 24h</span>
                <span className="text-[11px] text-[#717171]">{l('Nhanh chóng', 'Fast turnaround', '빠른 피드백')}</span>
              </div>
            </div>

            {/* Sticky Anchor Navigation Bar - Landing Page Format */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pt-2 pb-3 border-b border-[#EBEBEB] -mx-6 sm:-mx-8 px-6 sm:px-8">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: 'sec-filming' as SectionId, num: '01', label: l('Điều Kiện Quay Chụp', 'Filming & Angles', '촬영 환경'), icon: Camera },
                  { id: 'sec-perks' as SectionId, num: '02', label: l('Đãi Ngộ & Quyền Lợi', 'Perks & Hospitality', '혜택 & 지원'), icon: Gift },
                  { id: 'sec-menu' as SectionId, num: '03', label: l('Món Signature Nổi Bật', 'Signature Items', '대표 메뉴'), icon: Utensils, badge: business.signatureItems?.length },
                  { id: 'sec-story' as SectionId, num: '04', label: l('Câu Chuyện Quán & Tệp Khách', 'Brand Story & Vibe', '스토리 & 고객'), icon: FileText },
                  { id: 'sec-guidelines' as SectionId, num: '05', label: l('Quy Định & Tự Do Sáng Tạo', 'Guidelines & Do/Don’t', '가이드라인'), icon: Sliders },
                  { id: 'sec-reviews' as SectionId, num: '06', label: l('Đánh Giá Từ Creators', 'Creator Reviews', '크리에이터 후기'), icon: Star, badge: business.reviews.length }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                        isActive
                          ? 'bg-[#222222] text-white shadow-xs'
                          : 'bg-[#F7F7F7] text-[#717171] hover:text-[#222222] hover:bg-[#EBEBEB]'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-[#717171]'
                      }`}>
                        {item.num}
                      </span>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive ? 'bg-[#2563EB] text-white' : 'bg-[#E0E0E0] text-[#717171]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ======================================================== */}
            {/* CONTINUOUS LANDING PAGE STORY SECTIONS (SECTIONS 1 TO 6) */}
            {/* ======================================================== */}
            <div className="space-y-10 pt-2 pb-6">

              {/* SECTION 01: Filming Conditions & Spots */}
              <section id="sec-filming" className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded-md border border-[#2563EB]/20">
                      {l('PHẦN 01', 'PART 01', '파트 01')}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display flex items-center gap-2">
                      <Camera className="w-5 h-5 text-[#2563EB]" />
                      <span>{l('Điều Kiện Quay Chụp & Không Gian Thực Tế', 'Filming Conditions & Real Venue Spaces', '촬영 환경 및 포토존 분석')}</span>
                    </h3>
                  </div>
                  <span className="text-[12px] text-[#717171] hidden sm:inline">
                    {business.filmingConditions?.filmingSpots.length || 0} {l('góc quay gợi ý', 'filming spots', '개 추천')}
                  </span>
                </div>

                {/* Lighting & Acoustics 2-card highlight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 bg-[#EFF6FF] rounded-2xl border border-[#2563EB]/20 space-y-2">
                    <div className="flex items-center gap-2 text-[#2563EB]">
                      <Sun className="w-5 h-5" />
                      <h4 className="font-semibold text-[15px] text-[#222222]">
                        {l('Khung Giờ Ánh Sáng Tự Nhiên Đẹp Nhất', 'Best Natural Lighting Hours', '최적의 자연 채광 시간')}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#222222] leading-relaxed">
                      {loc(business.filmingConditions?.bestLightingHours) || l('08:30 – 10:30 & 14:00 – 16:30 (Ánh sáng tự nhiên ngập tràn qua giếng trời & cửa kính lớn)', '08:30 – 10:30 & 14:00 – 16:30 (Abundant natural light through skylights & large windows)', '08:30 – 10:30 & 14:00 – 16:30 (자연 채광 풍부)')}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Volume2 className="w-5 h-5" />
                      <h4 className="font-semibold text-[15px] text-[#222222]">
                        {l('Âm Thanh & Mức Độ Tiếng Ồn', 'Noise & Acoustics', '매장 소음 및 음향 환경')}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {loc(business.filmingConditions?.noiseLevel) || l('Yên tĩnh & Nhạc nền êm ái. Quán sẵn sàng vặn nhỏ hoặc tắt nhạc khi Creator cần thu âm voiceover trực tiếp.', 'Quiet & gentle acoustic/lofi music. Staff is happy to lower or turn off background music for live voiceover.', '조용함 & 잔잔한 배경음악. 크리에이터 마이크 녹음 시 음량 조절 가능.')}
                    </p>
                  </div>
                </div>

                {/* Best Check-in & Filming Spots */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    <span>{l('Các Góc Quay "Ăn Tiền" & Góc Sống Ảo Nổi Bật', 'Top Viral Filming & Check-in Spots', '대표 추천 촬영 스팟')}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {business.filmingConditions?.filmingSpots.map((spot, idx) => (
                      <div key={idx} className="p-4 bg-white rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-all space-y-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#222222] text-[14px] flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[11px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            {loc(spot.name)}
                          </span>
                          <span className="text-[11px] text-[#008A05] font-semibold bg-[#EBF7EE] px-2 py-0.5 rounded-full border border-[#008A05]/20">
                            {l('Gợi ý lên hình', 'Recommended Shot', '촬영 추천')}
                          </span>
                        </div>
                        <p className="text-[13px] text-[#717171] leading-relaxed">
                          {loc(spot.description)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Creator Amenities & Recommended Hours */}
                <div className="p-5 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-3">
                  <h4 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider">
                    {l('Tiện Ích & Hỗ Trợ Độc Quyền Cho Creator Tại Quán', 'Creator Amenities & On-site Support', '크리에이터 편의 시설 및 현장 지원')}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {business.filmingConditions?.amenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-[#EBEBEB] text-[13px] text-[#222222]">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{loc(am)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[13px] text-[#717171] flex items-center gap-2 border-t border-[#EBEBEB]">
                    <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>
                      <strong className="text-[#222222]">{l('Khung giờ ghé lý tưởng:', 'Best Filming Time:', '추천 방문 시간:')}</strong> {loc(business.filmingConditions?.recommendedVisitTime)}
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 02: Perks & Hospitality */}
              <section id="sec-perks" className="space-y-4 pt-4 border-t border-[#EBEBEB]/80">
                <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded-md border border-[#2563EB]/20">
                      {l('PHẦN 02', 'PART 02', '파트 02')}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#2563EB]" />
                      <span>{l('Chính Sách Đãi Ngộ & Quyền Lợi Hợp Tác', 'Creator Perks & Hospitality Package', '크리에이터 혜택 및 원고료 패키지')}</span>
                    </h3>
                  </div>
                  <span className="text-[12px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    {l('✓ Miễn Phí Trải Nghiệm', '✓ Free Experience Included', '✓ 무료 시식 혜택')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Complimentary Menu */}
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-[#2563EB]">
                      <Utensils className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">
                        {l('Thực Đơn Mời Trải Nghiệm Miễn Phí', 'Complimentary Tasting Menu', '무료 시식 / 체험 혜택')}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#222222] leading-relaxed">
                      {loc(business.creatorPerks?.complimentaryMenu)}
                    </p>
                    <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {l('✓ Đầy đủ món đẹp nhất để quay', '✓ All signature items provided for shoot', '✓ 촬영용 대표 메뉴 지원')}
                    </span>
                  </div>

                  {/* Plus One Policy */}
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">
                        {l('Chính Sách Người Đi Cùng (+1 Cameraman)', 'Plus-One / Crew Allowance', '동반인(+1인) 지원')}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {loc(business.creatorPerks?.plusOnePerk)}
                    </p>
                    <span className="inline-block text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {l('✓ Có bàn riêng cho ekip hỗ trợ', '✓ Reserved workspace for camera crew', '✓ 동반 촬영팀 전용석 제공')}
                    </span>
                  </div>

                  {/* Cash Budget & Escrow */}
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-[#008A05]">
                      <DollarSign className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">
                        {l('Thù Lao Tiền Mặt & Ký Quỹ Escrow', 'Cash Compensation & Escrow', '현금 원고료 및 에스크로')}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#222222] font-semibold">
                      {loc(business.creatorPerks?.cashBudgetRange)}
                    </p>
                    <p className="text-[12px] text-[#717171] leading-relaxed">
                      {l(
                        'Quán cam kết ký quỹ trước 100% ngân sách vào CollabLocal. Tiền được giải ngân ngay khi video được nghiệm thu đúng hẹn.',
                        'Venue guarantees 100% upfront escrow deposit into CollabLocal. Funds released immediately upon on-time draft approval.',
                        '매장이 100% 에스크로 사전 예치를 보장하며, 최종 승인 시 즉시 지급됩니다.'
                      )}
                    </p>
                  </div>

                  {/* Host Contact */}
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-purple-600">
                      <Building2 className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">
                        {l('Người Tiếp Đón Tại Quán', 'Dedicated On-site Host', '현장 전담 안내 매니저')}
                      </h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {loc(business.creatorPerks?.welcomeContact)}
                    </p>
                    <span className="inline-block text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {l('✓ Đón tiếp ân cần, giải thích món ăn', '✓ Warm hospitality & menu storytelling', '✓ 친절한 안내 및 메뉴 소개')}
                    </span>
                  </div>
                </div>
              </section>

              {/* SECTION 03: Signature Menu & USPs */}
              <section id="sec-menu" className="space-y-4 pt-4 border-t border-[#EBEBEB]/80">
                <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded-md border border-[#2563EB]/20">
                      {l('PHẦN 03', 'PART 03', '파트 03')}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-[#2563EB]" />
                      <span>{l('Món Signature Nổi Bật & Điểm Nhấn Hero Bắt Buộc Quay', 'Must-Feature Signature Menu (Hero Items)', '필수 촬영 시그니처 대표 메뉴')}</span>
                    </h3>
                  </div>
                  <span className="text-[12px] bg-[#EFF6FF] text-[#2563EB] font-semibold px-2.5 py-0.5 rounded-full border border-[#2563EB]/20">
                    {l('Bắt Trend & Tăng View', 'Trend & Engagement Booster', '트렌드 & 조회수 상승')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {business.signatureItems?.map((item) => (
                    <div key={item.id} className="p-5 bg-white rounded-2xl border border-[#EBEBEB] hover:border-[#222222] transition-all space-y-3 flex flex-col justify-between shadow-xs">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[15px] text-[#222222]">{loc(item.name)}</h4>
                          {item.isHero && (
                            <span className="text-[10px] font-semibold uppercase bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                              Hero Dish
                            </span>
                          )}
                        </div>

                        <div className="text-[16px] font-semibold text-[#2563EB] font-mono">
                          {loc(item.price)}
                        </div>

                        <div className="p-3 bg-[#F7F7F7] rounded-xl text-[12px] space-y-1">
                          <strong className="text-[#222222] block">{l('✨ Điểm nhấn thị giác khi lên hình:', '✨ Visual camera highlight:', '✨ 영상 촬영 시각적 포인트:')}</strong>
                          <p className="text-[#717171] leading-relaxed">{loc(item.highlight)}</p>
                        </div>

                        {item.flavorNotes && (
                          <p className="text-[12px] text-[#717171]">
                            <strong className="text-[#222222]">{l('Hương vị:', 'Flavor profile:', '풍미 / 맛:')}</strong> {loc(item.flavorNotes)}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#EBEBEB] text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{l('Quán chuẩn bị sẵn phần mới nóng hổi để quay', 'Freshly served hot for filming', '촬영용 갓 조리된 음식 제공')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 04: Brand Story & Audience + Photo Gallery */}
              <section id="sec-story" className="space-y-4 pt-4 border-t border-[#EBEBEB]/80">
                <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded-md border border-[#2563EB]/20">
                      {l('PHẦN 04', 'PART 04', '파트 04')}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#2563EB]" />
                      <span>{l('Câu Chuyện Quán & Tệp Khách Hàng Mục Tiêu', 'Brand Story & Audience Demographics', '브랜드 스토리 & 고객층 분석')}</span>
                    </h3>
                  </div>
                  <span className="text-[12px] text-[#717171]">
                    {l('Khảo sát trước khi đến', 'Pre-visit research', '방문 전 사전 조사')}
                  </span>
                </div>

                {/* Story and Concept */}
                <div className="p-5 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-3">
                  <h4 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    {l('Triết Lý Không Gian & Ý Tưởng Sáng Lập', 'Space Concept & Philosophy', '공간 컨셉 및 창업 철학')}
                  </h4>
                  <p className="text-[14px] sm:text-[15px] text-[#222222] leading-relaxed">
                    {loc(business.about)}
                  </p>
                  <p className="text-[13px] text-[#717171] leading-relaxed italic border-l-2 border-[#2563EB] pl-3">
                    "{loc(business.brandStory?.concept)}. {loc(business.brandStory?.philosophy)}."
                  </p>
                </div>

                {/* Target Audience & Average Customer Spend */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-blue-600">
                      <Users className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">{l('Tệp Khách Hàng Mục Tiêu Của Quán', 'Target Customer Demographics', '매장 타겟 고객층')}</h4>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed">
                      {loc(business.brandStory?.targetAudience)}
                    </p>
                    <p className="text-[12px] text-emerald-700 font-semibold pt-1">
                      {l('✓ Creator có thể đối chiếu với người theo dõi của mình để video đạt tương tác cao nhất.', '✓ Compare with your follower analytics for highest conversion.', '✓ 크리에이터 구독자층과 비교하여 최대 도달률 확보 가능.')}
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Tag className="w-5 h-5" />
                      <h4 className="font-semibold text-[#222222] text-[15px]">{l('Mức Chi Tiêu Trung Bình / Khách', 'Average Spend / Customer', '1인당 평균 지출액')}</h4>
                    </div>
                    <div className="text-[22px] font-semibold text-[#222222] font-display">
                      {loc(business.brandStory?.avgCustomerSpend)}
                    </div>
                    <p className="text-[12px] text-[#717171]">
                      {l('Phân khúc giá vừa vặn, tỷ lệ chuyển đổi khách ghé sau khi xem video đạt mức cao.', 'Accessible price tier driving high footfall conversion from videos.', '적정 가격대로 영상 시청 후 실제 매장 방문 전환율이 높습니다.')}
                    </p>
                  </div>
                </div>

                {/* Photo Gallery Grid */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#2563EB]" />
                      <span>{l('Bộ Sưu Tập Hình Ảnh Không Gian Thực Tế', 'Venue Image Gallery', '실제 공간 갤러리')}</span>
                    </h4>
                    <span className="text-[12px] text-[#717171] font-mono">
                      {galleryPhotos.length} {l('hình ảnh', 'photos', '장')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {galleryPhotos.map((photo, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setSelectedPhoto(photo)}
                        className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F7F7F7] border border-[#EBEBEB] cursor-pointer shadow-xs hover:shadow-md transition-all"
                      >
                        <img
                          src={photo}
                          alt={`${business.name} photo ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 05: Guidelines & Do/Don't */}
              <section id="sec-guidelines" className="space-y-4 pt-4 border-t border-[#EBEBEB]/80">
                <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded-md border border-[#2563EB]/20">
                      {l('PHẦN 05', 'PART 05', '파트 05')}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-[#2563EB]" />
                      <span>{l('Quy Định Phê Duyệt & Tự Do Sáng Tạo', 'Content Freedom & Venue Guidelines', '콘텐츠 가이드라인 및 검수 정책')}</span>
                    </h3>
                  </div>
                  <span className="text-[12px] bg-[#EBF7EE] text-[#008A05] font-semibold px-2.5 py-0.5 rounded-full border border-[#008A05]/20">
                    {l('Duyệt ≤ 24h', 'Review ≤ 24h', '검수 24시간 이내')}
                  </span>
                </div>

                <p className="text-[13px] text-[#717171] leading-relaxed">
                  {loc(business.creatorGuidelines?.contentTone)}
                </p>

                {/* Do's and Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#EBF7EE]/40 rounded-2xl border border-[#008A05]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[#008A05]">
                      <CheckCircle className="w-5 h-5" />
                      <h4 className="font-semibold text-[15px] text-[#222222]">{l('Những Điểm Nên Làm (Do\'s)', 'Guidelines (Do\'s)', '권장 사항 (Do\'s)')}</h4>
                    </div>
                    <ul className="space-y-2 text-[13px] text-[#222222]">
                      {business.creatorGuidelines?.dos.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#008A05] shrink-0 mt-0.5" />
                          <span className="leading-snug">{loc(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 bg-[#EFF6FF]/60 rounded-2xl border border-[#2563EB]/20 space-y-3">
                    <div className="flex items-center gap-2 text-[#2563EB]">
                      <AlertCircle className="w-5 h-5" />
                      <h4 className="font-semibold text-[15px] text-[#222222]">{l('Những Điểm Cần Tránh (Don\'ts)', 'Guidelines (Don\'ts)', '주의 사항 (Don\'ts)')}</h4>
                    </div>
                    <ul className="space-y-2 text-[13px] text-[#222222]">
                      {business.creatorGuidelines?.donts.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#2563EB] font-bold shrink-0 mt-0.5">✕</span>
                          <span className="leading-snug">{loc(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Exclusive Promo Voucher For Fanbase */}
                <div className="p-5 bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-2xl border border-purple-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Sparkles className="w-5 h-5" />
                      <h4 className="font-semibold text-[15px] text-[#222222]">{l('Mã Ưu Đãi Độc Quyền Cho Người Xem Của Bạn', 'Exclusive Promo Code For Your Viewers', '크리에이터 팬 전용 할인 코드')}</h4>
                    </div>
                    <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      {l('Đã Đào Tạo Nhân Viên', 'Staff Pre-Briefed', '직원 교육 완료')}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-purple-100">
                    <div>
                      <span className="text-[12px] text-[#717171] block">{l('Mã voucher tự động kích hoạt:', 'Auto-activated voucher code:', '자동 활성화 바우처 코드:')}</span>
                      <span className="text-[18px] font-bold text-purple-700 font-mono">{business.fanOffer?.codeTemplate}</span>
                    </div>
                    <div className="text-[13px] text-[#222222] font-semibold">
                      {l('Ưu đãi:', 'Discount:', '할인 혜택:')} <span className="text-[#2563EB]">{loc(business.fanOffer?.discount)}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#717171]">
                    {l(
                      'Quán cam kết 100% nhân viên quầy thu ngân đã được hướng dẫn áp dụng mã giảm giá khi khách mang video của Creator tới quán.',
                      '100% cashier staff trained to honor discount when viewers show creator\'s video.',
                      '영상을 보고 방문한 고객 대상 전 직원 할인 적용 안내 완료.'
                    )}
                  </p>
                </div>
              </section>

              {/* SECTION 06: Creator Community Reviews */}
              <section id="sec-reviews" className="space-y-4 pt-4 border-t border-[#EBEBEB]/80">
                <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[12px] font-bold font-mono bg-[#EFF6FF] text-[#2563EB] px-2.5 py-0.5 rounded-md border border-[#2563EB]/20">
                      {l('PHẦN 06', 'PART 06', '파트 06')}
                    </span>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#2563EB]" />
                      <span>{l('Đánh Giá Thực Tế Từ Các Creator Khác', 'Creator Reviews & Feedback', '크리에이터 실제 후기 및 평점')}</span>
                    </h3>
                  </div>
                  <span className="text-[12px] bg-white text-[#008A05] font-semibold px-2.5 py-0.5 rounded-full border border-[#008A05]/20">
                    {l('100% Đã Nhận Đủ Tiền Escrow', '100% Full Escrow Payout', '100% 에스크로 정산 완료')}
                  </span>
                </div>

                {/* Rating Score Breakdown */}
                <div className="p-5 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBEBEB] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-[36px] font-semibold text-[#222222] font-display">
                        {business.rating}
                      </div>
                      <div>
                        <div className="flex items-center gap-1 text-[#222222]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#222222] text-[#222222]" />
                          ))}
                        </div>
                        <span className="text-[13px] text-[#717171]">
                          {l('Dựa trên', 'Based on', '기준:')} {business.reviews.length} {l('đánh giá từ các Creator đã ghé quán quay video', 'reviews from creators who filmed at venue', '실제 방문 촬영 크리에이터 리뷰')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
                    <div>
                      <span className="text-[#717171] block">{l('Giao tiếp & Đón tiếp', 'Hospitality & Communication', '소통 및 환대')}</span>
                      <strong className="text-[16px] text-[#222222]">5.0 / 5.0</strong>
                    </div>
                    <div>
                      <span className="text-[#717171] block">{l('Độ tin cậy thanh toán', 'Payment Reliability', '결제 신뢰도')}</span>
                      <strong className="text-[16px] text-[#008A05]">5.0 / 5.0</strong>
                    </div>
                    <div>
                      <span className="text-[#717171] block">{l('Yêu cầu rõ ràng', 'Clear Requirements', '명확한 기획')}</span>
                      <strong className="text-[16px] text-[#222222]">4.8 / 5.0</strong>
                    </div>
                    <div>
                      <span className="text-[#717171] block">{l('Chuyên nghiệp & Hỗ trợ', 'Professional Support', '전문성 및 지원')}</span>
                      <strong className="text-[16px] text-[#222222]">4.9 / 5.0</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {business.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white rounded-2xl border border-[#EBEBEB] space-y-2.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 flex items-center justify-center font-bold text-[12px]">
                            {rev.authorName.charAt(1) || 'C'}
                          </div>
                          <div>
                            <span className="font-semibold text-[#222222] text-[14px] block">{rev.authorName}</span>
                            <span className="text-[12px] text-[#717171]">{l('Creator đã hoàn thành chiến dịch', 'Creator completed campaign', '캠페인 완료 크리에이터')}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#222222] text-[13px]">
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
              </section>

              {/* Active Campaigns Section at Bottom of Landing Page */}
              {bizCampaigns.length > 0 && (
                <section id="sec-campaigns" className="p-5 sm:p-6 bg-white rounded-3xl border border-[#EBEBEB] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-semibold text-[#222222] flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#2563EB]" />
                        <span>{l('Chiến Dịch Đang Mở Tuyển Của Quán', 'Active Campaigns at This Venue', '현재 모집 중인 캠페인')}</span>
                      </h3>
                      <p className="text-[13px] text-[#717171]">
                        {l('Chọn chiến dịch phù hợp với kênh của bạn để ứng tuyển ngay', 'Choose a campaign that fits your audience to apply now', '채널에 맞는 캠페인을 선택하여 바로 지원하세요')}
                      </p>
                    </div>
                    <span className="text-[12px] bg-[#EFF6FF] text-[#2563EB] font-semibold px-3 py-1 rounded-full border border-[#2563EB]/20">
                      {bizCampaigns.length} {l('chiến dịch', 'campaigns', '개 캠페인')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {bizCampaigns.map((camp) => (
                      <div 
                        key={camp.id} 
                        className="p-4 bg-[#F7F7F7] hover:bg-[#EFF6FF]/40 rounded-2xl border border-[#EBEBEB] hover:border-[#2563EB]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-[#222222] text-[15px]">{loc(camp.title)}</h4>
                            <span className="text-[11px] font-semibold bg-white text-[#222222] px-2 py-0.5 rounded-md border border-[#EBEBEB]">
                              {camp.platform}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#717171] line-clamp-1">{loc(camp.brief)}</p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-[16px] font-semibold text-[#2563EB] font-mono block">
                              {camp.budgetDisplay}
                            </span>
                            <span className="text-[11px] text-[#717171]">{camp.paymentType}</span>
                          </div>
                          <button
                            onClick={() => handleApplyCampaign(camp.id)}
                            className="px-5 py-2.5 btn-airbnb-primary text-white text-[13px] font-semibold rounded-xl cursor-pointer shadow-xs"
                          >
                            {l('Ứng Tuyển', 'Apply', '지원하기')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Operating Info & Parking Footer Card */}
              <div className="p-5 bg-[#F7F7F7] rounded-3xl border border-[#EBEBEB] text-[13px] text-[#717171] space-y-2">
                <div className="flex items-center gap-2 text-[#222222] font-semibold">
                  <Navigation className="w-4 h-4 text-[#2563EB]" />
                  <span>{l('Thông Tin Vận Hành & Hỗ Trợ Đỗ Xe:', 'Operating Info & Parking:', '영업 안내 및 주차 편의:')}</span>
                </div>
                <p>• <strong>Giờ mở cửa:</strong> {business.operationalInfo?.openingHours || '07:30 – 22:30 hàng ngày'}</p>
                <p>• <strong>Gửi xe:</strong> {business.operationalInfo?.parkingDetails || 'Xe máy đỗ miễn phí trước quán có bảo vệ dắt; ô tô có bãi đỗ thuận tiện cách 40m'}</p>
                <p>• <strong>Hotline Creator:</strong> <span className="text-[#2563EB] font-semibold">{business.operationalInfo?.hotline || '0988 123 456'}</span></p>
              </div>

            </div>

          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:px-8 bg-white border-t border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#717171]">{l('Ngân sách quán chi trả:', 'Venue budget:', '예산 범위:')}</span>
            <span className="text-[18px] font-semibold text-[#222222] font-display">
              {business.creatorPerks?.cashBudgetRange || '600K – 1.8M VND'}
            </span>
            <span className="text-[12px] text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              🛡️ Ký Quỹ Escrow An Toàn
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('sec-menu')}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-[#DDDDDD] hover:border-[#222222] rounded-xl text-[14px] font-semibold text-[#222222] transition-colors cursor-pointer"
            >
              {l('Xem Món Hero', 'View Hero Dishes', '대표 메뉴')}
            </button>
            <button
              onClick={handleDirectCollab}
              className="flex-1 sm:flex-initial px-6 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{l('Ứng Tuyển Hợp Tác Ngay', 'Apply / Pitch Collaboration', '협업 제안하기')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Enlarged Photo Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-3xl w-full relative space-y-3">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 text-sm bg-white/20 rounded-full cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[80vh] flex items-center justify-center">
              <img 
                src={selectedPhoto} 
                alt="Enlarged view" 
                className="max-h-[75vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between text-white/90 text-[13px] px-2">
              <span className="font-semibold">{business.name} • {business.location}</span>
              <span className="text-white/60">Góc quay thực tế tại quán</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
