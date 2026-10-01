import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Camera, 
  Sparkles, 
  ArrowRight, 
  DollarSign, 
  Handshake, 
  Calendar, 
  MapPin, 
  Star, 
  Heart,
  TrendingUp,
  Wallet,
  Clock,
  Eye
} from 'lucide-react';

export const CreatorDashboard: React.FC = () => {
  const { 
    activeCreator, 
    campaigns, 
    matches, 
    businesses, 
    setCurrentView, 
    setActiveMatchId,
    setViewingCampaignId,
    setViewingCreatorId,
    likeCampaign,
    setShowLanding
  } = useApp();

  const { t, lang, l, loc } = useT();

  const activeCollabs = matches.filter(m => m.creatorId === activeCreator.id);
  const totalEarnings = activeCollabs.reduce((sum, c) => sum + (c.agreedAmount || 0), 0);
  const earningsDisplay = totalEarnings > 0 ? `${(totalEarnings / 1000000).toFixed(1)}M` : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Top Quick Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3 rounded-2xl border border-[#EBEBEB]">
        <button
          onClick={() => setShowLanding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDDDDD] hover:bg-[#F7F7F7] text-[#222222] text-[14px] font-semibold transition-colors cursor-pointer group"
        >
          <Camera className="w-4 h-4 text-[#2563EB]" />
          <span>{l('Quay lại Màn hình chính', 'Back to Main Screen', '메인 화면으로 돌아가기')}</span>
        </button>

        <div className="flex items-center gap-2 text-[14px] text-[#717171]">
          <span className="hidden sm:inline">{l('Không gian sáng tạo:', 'Creator Workspace:', '크리에이터 워크스페이스:')}</span>
          <span className="font-semibold text-[#222222] bg-[#F7F7F7] px-3.5 py-1 rounded-full border border-[#EBEBEB]">
            {activeCreator.username}
          </span>
        </div>
      </div>

      {/* Top Welcome Card - Airbnb Style */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBEBEB] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F7F7F7] border border-[#EBEBEB] shrink-0">
            <img
              src={activeCreator.avatar}
              alt={activeCreator.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
                {activeCreator.name}
              </h1>
              <span className="text-[15px] text-[#717171] font-medium">{activeCreator.username}</span>
              <span className="text-[12px] bg-[#EFF6FF] text-[#2563EB] font-semibold px-2.5 py-0.5 rounded-full border border-[#2563EB]/20">
                {l('Creator Đã Xác Thực', 'Verified Creator', '인증된 크리에이터')}
              </span>
            </div>
            <p className="text-[15px] text-[#717171] leading-relaxed">
              {loc(activeCreator.niche)} · {activeCreator.followersDisplay} Followers · {activeCreator.rateDisplay} · {activeCreator.completionRate}% {l('Hoàn thành', 'Completion', '완료율')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setViewingCreatorId(activeCreator.id)}
            className="px-4 py-2.5 border border-[#DDDDDD] hover:border-[#222222] bg-white text-[14px] font-semibold text-[#222222] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Xem hồ sơ được chủ quán nhìn thấy"
          >
            <Eye className="w-4 h-4 text-[#2563EB]" />
            <span>{l('Xem Hồ Sơ Công Khai', 'Preview Public Profile', '공개 프로필 미리보기')}</span>
          </button>
          <button
            onClick={() => setCurrentView('swipe')}
            className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{t.swipeModeBtn}</span>
          </button>
          <button
            onClick={() => setCurrentView('map')}
            className="px-4.5 py-2.5 border border-[#222222] hover:bg-[#F7F7F7] text-[14px] font-semibold text-[#222222] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#222222]" />
            <span>{t.mapViewBtn}</span>
          </button>
        </div>
      </div>

      {/* 4 Creator Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.availableCampaigns}</span>
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#222222] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {campaigns.length}
          </div>
          <span className="text-[13px] text-[#717171] font-medium">{l('Quán cafe, spa, bar gần bạn', 'Near your radius', '반경 내 카페, 스파, 맛집')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.navMatches}</span>
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#222222] flex items-center justify-center">
              <Handshake className="w-4 h-4 text-[#222222]" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {activeCollabs.length}
          </div>
          <span className="text-[13px] text-[#2563EB] font-semibold">{l('Sẵn sàng đàm phán giá', 'Ready to negotiate', '단가 협의 준비 완료')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.activeCollabs}</span>
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#222222] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#222222]" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {activeCollabs.length}
          </div>
          <span className="text-[13px] text-[#717171] font-medium">{l('Đang quay & chỉnh video', 'In production', '촬영 및 영상 편집 중')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.estimatedEarnings}</span>
            <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <Wallet className="w-4 h-4 text-[#2563EB]" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {earningsDisplay} <span className="text-[14px] font-normal text-[#717171]">{t.vnd}</span>
          </div>
          <span className="text-[13px] text-[#222222] font-medium">{t.secInEscrow}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Collaborations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB]">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">
                  {t.activeCollabsTitle}
                </h3>
                <p className="text-[14px] text-[#717171] mt-0.5">{l('Theo dõi trao đổi, lịch quay và nộp bản nháp.', 'Manage ongoing partnerships & deliverables.', '진행 중인 협의, 촬영 일정 및 초안 제출 관리.')}</p>
              </div>
              <button
                onClick={() => setCurrentView('collab')}
                className="text-[14px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                {t.viewRoom}
              </button>
            </div>

            <div className="space-y-3">
              {activeCollabs.length === 0 ? (
                <div className="text-center py-8 px-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
                  <Camera className="w-8 h-8 text-[#717171] mx-auto mb-2" />
                  <p className="text-[15px] font-semibold text-[#222222] mb-1">
                    {l('Chưa có chiến dịch hợp tác đang diễn ra', 'No active partnerships yet', '진행 중인 파트너십이 없습니다')}
                  </p>
                  <p className="text-[13px] text-[#717171] max-w-xs mx-auto mb-3">
                    {l('Khám phá quán cà phê, nhà hàng quanh bạn hoặc quẹt thẻ để khớp nối!', 'Discover nearby venues or swipe deck to match!', '인근 매장을 둘러보거나 스와이프 모드에서 매칭을 시작해보세요!')}
                  </p>
                  <button
                    onClick={() => setCurrentView('discover')}
                    className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-full cursor-pointer shadow-sm"
                  >
                    {l('Khám Phá Chiến Dịch', 'Discover Campaigns', '캠페인 탐색하기')}
                  </button>
                </div>
              ) : (
                activeCollabs.map((collab) => {
                  const targetBiz = businesses.find(b => b.id === collab.businessId) || businesses[0];
                  const camp = campaigns.find(c => c.id === collab.campaignId) || campaigns[0];

                  return (
                    <div
                      key={collab.id}
                      onClick={() => {
                        setActiveMatchId(collab.id);
                        setCurrentView('collab');
                      }}
                      className="p-4 rounded-2xl border border-[#EBEBEB] hover:border-[#222222] hover:bg-[#F7F7F7]/60 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-13 h-13 rounded-xl overflow-hidden bg-[#F7F7F7] shrink-0 border border-[#EBEBEB]">
                          <img
                            src={targetBiz.logo || targetBiz.image}
                            alt={targetBiz.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-[15px] font-semibold text-[#222222] group-hover:text-[#2563EB] transition-colors">
                              {targetBiz.name}
                            </h4>
                            <span className="text-[13px] text-[#717171]">({loc(targetBiz.category)})</span>
                          </div>
                          <p className="text-[14px] text-[#717171]">{l('Chiến dịch:', 'Campaign:', '캠페인:')} {loc(camp.title)}</p>
                          <div className="flex items-center gap-2 mt-1 text-[13px] text-[#717171]">
                            <span className="font-semibold text-[#222222]">
                              {collab.agreedAmount ? `${(collab.agreedAmount / 1000).toFixed(0)}K VND` : l('Đề xuất: 650K VND', 'Offer: 650K VND', '제안: 650K VND')}
                            </span>
                            <span>·</span>
                            <span className="capitalize text-[#222222] font-semibold bg-[#F7F7F7] px-2.5 py-0.5 rounded-full border border-[#DDDDDD] text-[12px]">
                              {loc(collab.status)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[14px] text-[#2563EB] font-semibold">
                        <span>{t.viewRoom}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommended Campaigns */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB]">
            <div className="flex items-center justify-between mb-3 border-b border-[#EBEBEB] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">
                  {t.recommendedForYou}
                </h3>
              </div>
              <button
                onClick={() => setCurrentView('discover')}
                className="text-[14px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                {t.allCampaigns}
              </button>
            </div>

            <div className="space-y-3">
              {campaigns.slice(0, 4).map((camp) => {
                const biz = businesses.find(b => b.id === camp.businessId);
                return (
                  <div 
                    key={camp.id}
                    className="p-3.5 rounded-2xl border border-[#EBEBEB] hover:border-[#222222] transition-colors bg-white"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-[13px] text-[#717171]">{biz?.name} · {camp.distanceKm} km</span>
                        <h4 className="text-[15px] font-semibold text-[#222222]">{loc(camp.title)}</h4>
                      </div>
                      <span className="font-semibold text-[13px] text-[#222222] bg-[#F7F7F7] px-2.5 py-0.5 rounded-full border border-[#DDDDDD]">
                        {camp.budgetDisplay}
                      </span>
                    </div>

                    <p className="text-[13px] text-[#717171] mb-2 line-clamp-2 leading-relaxed">
                      {loc(camp.brief)}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingCampaignId(camp.id)}
                        className="flex-1 py-2 px-2.5 rounded-xl border border-[#222222] text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                      >
                        {t.detailsBtn}
                      </button>
                      <button
                        onClick={() => likeCampaign(camp.id)}
                        className="flex-1 py-2 px-2.5 rounded-xl btn-airbnb-primary text-[14px] font-semibold transition-all cursor-pointer"
                      >
                        {t.interestedBtn}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
