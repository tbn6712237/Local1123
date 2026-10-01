import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  Wallet, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Plus, 
  Star, 
  Eye, 
  TrendingUp, 
  BarChart3, 
  Compass, 
  MessageSquare,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const BusinessDashboard: React.FC = () => {
  const { 
    activeBusiness, 
    campaigns, 
    matches, 
    creators, 
    setCurrentView, 
    setActiveMatchId,
    setShowCreateCampaignModal,
    setShowProModal,
    setViewingCreatorId,
    setViewingBusinessId,
    setShowLanding,
    likeCreator
  } = useApp();

  const { t, lang, l, loc } = useT();

  const businessCampaigns = campaigns.filter(c => c.businessId === activeBusiness.id);
  const activeCollabs = matches.filter(m => m.businessId === activeBusiness.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Top Quick Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-3 rounded-2xl border border-[#EBEBEB]">
        <button
          onClick={() => setShowLanding(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDDDDD] hover:bg-[#F7F7F7] text-[#222222] text-[14px] font-semibold transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 text-[#717171] group-hover:-translate-x-0.5 transition-transform" />
          <span>{lang === 'vi' ? 'Quay lại Màn hình chính' : lang === 'ko' ? '메인 화면으로 돌아가기' : 'Back to Main Screen'}</span>
        </button>

        <div className="flex items-center gap-2 text-[14px] text-[#717171]">
          <span className="hidden sm:inline">{lang === 'vi' ? 'Không gian quản trị:' : lang === 'ko' ? '비즈니스 워크스페이스:' : 'Workspace:'}</span>
          <span className="font-semibold text-[#222222] bg-[#F7F7F7] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#EBEBEB]">
            <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{activeBusiness.name}</span>
          </span>
          <button
            onClick={() => setViewingBusinessId(activeBusiness.id)}
            className="text-[#2563EB] hover:underline font-semibold cursor-pointer ml-1"
          >
            {lang === 'vi' ? 'Xem Hồ Sơ Quán' : lang === 'ko' ? '프로필 보기' : 'View Profile'}
          </button>
        </div>
      </div>

      {/* Main Welcome & Profile Card - Airbnb Host Style */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBEBEB] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Logo & Photo Avatar */}
          <div 
            onClick={() => setViewingBusinessId(activeBusiness.id)}
            className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#F7F7F7] border border-[#EBEBEB] shrink-0 cursor-pointer group"
            title="Click to view business profile"
          >
            <img
              src={activeBusiness.logo || activeBusiness.image}
              alt={activeBusiness.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
                {activeBusiness.name}
              </h1>
              <span className="text-[12px] bg-[#EFF6FF] text-[#2563EB] font-semibold px-2.5 py-0.5 rounded-full border border-[#2563EB]/20 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                {t.bizVerified}
              </span>
            </div>
            <p className="text-[15px] text-[#717171] mb-1 flex items-center gap-1.5 flex-wrap">
              <span className="font-medium text-[#222222]">{loc(activeBusiness.category)}</span>
              <span>·</span>
              <span>{activeBusiness.location}</span>
              <span>·</span>
              <span className="text-[#222222] font-medium">{activeBusiness.completedCollabs} {l('Hợp tác thành công', 'Collabs completed', '건 협업 완료')}</span>
            </p>
            <div className="flex items-center gap-1 text-[14px] text-[#222222] font-medium">
              <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
              <span>{activeBusiness.rating}</span>
              <span className="text-[#717171] font-normal">({activeBusiness.reviewsCount} {l('đánh giá', 'reviews', '후기')})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowProModal(true)}
            className="px-4.5 py-2.5 rounded-xl text-[14px] font-semibold border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>Business Pro</span>
          </button>
          <button
            onClick={() => setShowCreateCampaignModal(true)}
            className="px-5 py-2.5 btn-airbnb-primary rounded-xl text-[14px] font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t.createCampaignBtn}</span>
          </button>
        </div>
      </div>

      {/* 4 Overview Metric Cards - Airbnb Performance Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.activeCampaigns}</span>
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#222222] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {businessCampaigns.length}
          </div>
          <span className="text-[13px] text-[#717171] font-medium">{lang === 'vi' ? 'Đang tuyển creator' : lang === 'ko' ? '크리에이터 모집 중' : 'Recruiting creators'}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.creatorMatches}</span>
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#222222] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            8
          </div>
          <span className="text-[13px] text-[#2563EB] font-semibold">{lang === 'vi' ? '+3 kết nối mới' : lang === 'ko' ? '이번 주 +3 매칭' : '+3 this week'}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.pendingRequests}</span>
            <div className="w-8 h-8 rounded-full bg-[#F7F7F7] text-[#222222] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            4
          </div>
          <span className="text-[13px] text-[#717171] font-medium">{lang === 'vi' ? 'Cần duyệt bản nháp' : lang === 'ko' ? '초안 검토 대기' : 'Pending review'}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] hover:border-[#DDDDDD] transition-colors">
          <div className="flex items-center justify-between text-[#717171] mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider">{t.campaignBudget}</span>
            <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums tracking-tight">
            8.5M <span className="text-[14px] font-normal text-[#717171]">{t.vnd}</span>
          </div>
          <span className="text-[13px] text-[#222222] font-medium flex items-center gap-1">
            <span>🛡️</span>
            <span>{t.secInEscrow}</span>
          </span>
        </div>
      </div>

      {/* Main Content: Active Collaborations + High-Affinity Creators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Collaborations */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB]">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">{t.activeCollabsTitle}</h3>
                <p className="text-[14px] text-[#717171] mt-0.5">{t.activeCollabsDesc}</p>
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
                  <Building2 className="w-8 h-8 text-[#717171] mx-auto mb-2" />
                  <p className="text-[15px] font-semibold text-[#222222] mb-1">
                    {l('Chưa có hợp tác đang diễn ra', 'No active collaborations yet', '현재 진행 중인 협업이 없습니다')}
                  </p>
                  <p className="text-[13px] text-[#717171] max-w-xs mx-auto mb-3">
                    {l('Khám phá các nhà sáng tạo nội dung hoặc quẹt thẻ để bắt đầu kết nối!', 'Explore vetted creators or swipe to connect!', '검증된 크리에이터를 탐색하거나 스와이프하여 협업을 시작해보세요!')}
                  </p>
                  <button
                    onClick={() => setCurrentView('discover')}
                    className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-full cursor-pointer shadow-sm"
                  >
                    {l('Tìm Creator Ngay', 'Find Creators', '크리에이터 찾기')}
                  </button>
                </div>
              ) : (
                activeCollabs.map((collab) => {
                  const targetCreator = creators.find(c => c.id === collab.creatorId) || creators[0];
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
                            src={targetCreator.avatar}
                            alt={targetCreator.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-[15px] font-semibold text-[#222222] group-hover:text-[#2563EB] transition-colors">
                              {targetCreator.username}
                            </h4>
                            <span className="text-[13px] text-[#717171]">({loc(targetCreator.niche)})</span>
                          </div>
                          <p className="text-[14px] text-[#717171]">{l('Chiến dịch:', 'Campaign:', '캠페인:')} {loc(camp.title)}</p>
                          <div className="flex items-center gap-2 mt-1 text-[13px] text-[#717171]">
                            <span className="font-semibold text-[#222222]">
                              {collab.agreedAmount ? `${(collab.agreedAmount / 1000).toFixed(0)}K VND` : l('Đang thương lượng', 'Negotiating', '협의 중')}
                            </span>
                            <span>·</span>
                            <span className="capitalize text-[#222222] font-semibold bg-[#F7F7F7] px-2.5 py-0.5 rounded-full border border-[#DDDDDD] text-[12px]">
                              {loc(collab.status)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[14px] text-[#2563EB] font-semibold group-hover:translate-x-0.5 transition-transform">
                        <span>{t.manage}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommended Creators */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EBEBEB]">
            <div className="flex items-center justify-between mb-3 border-b border-[#EBEBEB] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <h3 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">
                  {t.aiRecommendedCreators}
                </h3>
              </div>
              <button
                onClick={() => setCurrentView('discover')}
                className="text-[14px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
              >
                {t.browseAllCreators}
              </button>
            </div>

            <div className="space-y-3">
              {creators.slice(0, 3).map((cr) => (
                <div 
                  key={cr.id}
                  className="p-3.5 rounded-2xl border border-[#EBEBEB] hover:border-[#222222] transition-colors bg-white"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F7F7F7] shrink-0 border border-[#EBEBEB]">
                        <img
                          src={cr.avatar}
                          alt={cr.username}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-[14px] font-semibold text-[#222222]">{cr.username}</span>
                          <span className="text-[13px] text-[#717171]">· {cr.distanceKm} km</span>
                        </div>
                        <span className="text-[13px] text-[#717171] block">{loc(cr.niche)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[14px] font-semibold text-[#222222] block">
                        {cr.rateDisplay}
                      </span>
                      <div className="flex items-center justify-end gap-1 text-[13px] text-[#222222] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                        <span>{cr.rating}</span>
                      </div>
                    </div>
                  </div>

                  {cr.aiReason && (
                    <p className="text-[12px] text-[#717171] bg-[#F7F7F7] p-2.5 rounded-xl border border-[#EBEBEB] mb-2 leading-relaxed">
                      💡 {loc(cr.aiReason)}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewingCreatorId(cr.id)}
                      className="flex-1 py-2 px-2.5 rounded-xl border border-[#222222] text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
                    >
                      {l('Xem Hồ Sơ', 'View Profile', '프로필 보기')}
                    </button>
                    <button
                      onClick={() => {
                        const matchId = likeCreator(cr.id);
                        if (matchId) {
                          setActiveMatchId(matchId);
                          setCurrentView('collab');
                        }
                      }}
                      className="py-2 px-3.5 rounded-xl btn-airbnb-primary text-[14px] font-semibold cursor-pointer"
                    >
                      {l('Báo Giá', 'Offer', '제안하기')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
