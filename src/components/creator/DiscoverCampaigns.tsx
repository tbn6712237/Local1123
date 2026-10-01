import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Search, 
  Star, 
  MapPin, 
  Heart, 
  Award,
  Sparkles
} from 'lucide-react';
import { Campaign } from '../../types';

export const DiscoverCampaigns: React.FC = () => {
  const { 
    campaigns, 
    businesses, 
    likeCampaign, 
    passCampaign, 
    setViewingCampaignId, 
    setViewingBusinessId,
    likes, 
    activeCreator,
    setCurrentView 
  } = useApp();

  const { t, l, loc } = useT();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');

  const filteredCampaigns = campaigns.filter((camp) => {
    const biz = businesses.find(b => b.id === camp.businessId);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = camp.title.toLowerCase().includes(q) || 
                    camp.brief.toLowerCase().includes(q) || 
                    biz?.name.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (categoryFilter !== 'all' && !camp.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
      return false;
    }
    if (budgetFilter === 'above700k' && camp.budgetMax < 700000) return false;
    if (budgetFilter === 'under700k' && camp.budgetMax > 700000) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Airbnb Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-[#EBEBEB]">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#717171]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={l('Tìm theo tên quán, địa chỉ hoặc món...', 'Search venues, spots or campaigns...', '매장명 또는 캠페인으로 검색...')}
            className="w-full text-[14px] rounded-full border border-[#DDDDDD] pl-9.5 pr-4 py-2.5 bg-white text-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#222222] transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[14px]">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-full border border-[#DDDDDD] px-4 py-2.5 text-[14px] bg-white text-[#222222] font-medium hover:border-[#222222] transition-colors cursor-pointer"
          >
            <option value="all">{t.allNiches}</option>
            <option value="Cafe">{l('Cafe & Roastery / Bánh', 'Cafe & Bakery', '카페 & 베이커리')}</option>
            <option value="Fitness">{l('Fitness & Pilates', 'Fitness & Pilates', '피트니스 & 필라테스')}</option>
            <option value="Spa">{l('Spa & Sức Khỏe', 'Spa & Wellness', '스파 & 웰빙')}</option>
            <option value="Bar">{l('Bar & Cocktail', 'Bar & Cocktails', '바 & 칵테일')}</option>
            <option value="Nhà Hàng">{l('Nhà Hàng & Cơm Nhà', 'Restaurants & Dining', '레스토랑 & 맛집')}</option>
            <option value="Workshop">{l('Workshop Gốm & Nến Thơm', 'Pottery & Candle Workshop', '도예 & 캔들 공방')}</option>
            <option value="Thời Trang">{l('Thời Trang Thiết Kế', 'Designer Fashion', '디자이너 패션')}</option>
            <option value="Villa">{l('Villa & Nghỉ Dưỡng', 'Villa & Vacation Stay', '빌라 & 휴양 스테이')}</option>
          </select>

          <select
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
            className="rounded-full border border-[#DDDDDD] px-4 py-2.5 text-[14px] bg-white text-[#222222] font-medium hover:border-[#222222] transition-colors cursor-pointer"
          >
            <option value="all">{t.anyBudget}</option>
            <option value="above700k">{t.above700k}</option>
            <option value="under700k">{t.under700k}</option>
          </select>

          {/* Airbnb Floating Map Pill & Swipe */}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setCurrentView('swipe')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#DDDDDD] hover:border-[#222222] text-[#222222] text-[14px] font-semibold transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{t.swipeModeBtn}</span>
            </button>

            <button
              onClick={() => setCurrentView('map')}
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#222222] hover:bg-black text-white text-[14px] font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>{t.navMap}</span>
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
            {l(`Khám Phá Chiến Dịch (${campaigns.length})`, `Discover Campaigns (${campaigns.length})`, `캠페인 탐색 (${campaigns.length}개)`)}
          </h1>
          <p className="text-[15px] text-[#717171] leading-relaxed mt-1">
            {l(
              'Các địa điểm cafe, ẩm thực, workshop và dịch vụ trải nghiệm tại Hà Nội đang tìm kiếm Creator.',
              'Cafes, dining spots, wellness studios, and workshops actively booking local creators.',
              '하노이 로컬 카페, 맛집, 웰니스, 공방의 유료 협업 캠페인.'
            )}
          </p>
        </div>
      </div>

      {/* Campaigns Grid - Airbnb Listing Cards */}
      {filteredCampaigns.length === 0 ? (
        <div className="py-20 text-center bg-[#F7F7F7] rounded-3xl border border-[#EBEBEB] p-8">
          <p className="text-[16px] font-semibold text-[#222222] mb-1">
            {l('Không có chiến dịch phù hợp với bộ lọc', 'No campaigns match your current filters', '조건에 일치하는 캠페인이 없습니다')}
          </p>
          <p className="text-[14px] text-[#717171] mb-4 max-w-sm mx-auto">
            {l(
              'Hãy thử chọn "Tất Cả" ở mục lĩnh vực hoặc xóa từ khóa tìm kiếm.',
              'Try resetting category filter to "All" or clearing the search text.',
              '분야 필터를 "전체"로 설정하거나 검색어를 초기화해보세요.'
            )}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setBudgetFilter('all'); }}
            className="px-4 py-2 bg-[#222222] hover:bg-black text-white text-[14px] font-semibold rounded-full cursor-pointer transition-colors"
          >
            {l('Xóa Toàn Bộ Bộ Lọc', 'Clear All Filters', '필터 초기화')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {filteredCampaigns.map((camp) => {
            const biz = businesses.find(b => b.id === camp.businessId);
            const isLiked = likes[`${activeCreator.id}_${camp.id}`];

            return (
              <div
                key={camp.id}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container - Airbnb Card Ratio */}
                  <div className="relative aspect-[20/19] rounded-2xl overflow-hidden bg-[#F7F7F7] mb-3">
                    <img
                      src={biz?.image || biz?.logo}
                      alt={biz?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out cursor-pointer"
                      referrerPolicy="no-referrer"
                      onClick={() => setViewingCampaignId(camp.id)}
                    />

                    {/* Airbnb "Guest favourite" badge top-left */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#222222] shadow-[0_2px_4px_rgba(0,0,0,0.12)] flex items-center gap-1 select-none pointer-events-none">
                      <Award className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{loc(camp.category)}</span>
                    </div>

                    {/* Floating Heart Button top-right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        likeCampaign(camp.id);
                      }}
                      className="absolute top-3 right-3 p-2 text-white hover:scale-110 active:scale-95 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer"
                      title={isLiked ? 'Đã lưu' : 'Lưu chiến dịch'}
                    >
                      <Heart 
                        className={`w-6 h-6 transition-colors ${
                          isLiked 
                            ? 'fill-[#2563EB] text-[#2563EB]' 
                            : 'fill-black/30 text-white stroke-[2]'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Airbnb Listing Details */}
                  <div className="space-y-0.5">
                    {/* Line 1: Title & Rating */}
                    <div className="flex items-center justify-between gap-2">
                      <h3 
                        onClick={() => biz && setViewingBusinessId(biz.id)}
                        className="text-[15px] font-semibold text-[#222222] truncate cursor-pointer hover:underline hover:text-[#2563EB]"
                        title={l('Xem hồ sơ quán', 'View venue profile', '매장 프로필 보기')}
                      >
                        {biz?.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[14px] text-[#222222] font-medium shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                        <span>{biz?.rating}</span>
                      </div>
                    </div>

                    {/* Line 2: Campaign title */}
                    <p className="text-[15px] text-[#717171] truncate font-medium">
                      {loc(camp.title)}
                    </p>

                    {/* Line 3: Location distance & deadline */}
                    <p className="text-[15px] text-[#717171] truncate">
                      {camp.distanceKm} km · {loc(camp.deadline)}
                    </p>

                    {/* Line 4: Price in Airbnb format */}
                    <div className="pt-1 flex items-baseline gap-1">
                      <span className="text-[15px] font-semibold text-[#222222]">
                        {camp.budgetDisplay}
                      </span>
                      <span className="text-[15px] text-[#717171]">/ campaign</span>
                    </div>

                    {/* Subtle Brief */}
                    <p className="text-[13px] text-[#717171] line-clamp-2 pt-1 leading-relaxed">
                      {loc(camp.brief)}
                    </p>
                  </div>
                </div>

                {/* Airbnb Action Buttons */}
                <div className="pt-3 mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setViewingCampaignId(camp.id)}
                    className="flex-1 py-2.5 px-3 border border-[#222222] hover:bg-[#F7F7F7] text-[14px] font-semibold text-[#222222] rounded-xl transition-colors cursor-pointer text-center"
                  >
                    {l('Chi Tiết', 'Details', '상세보기')}
                  </button>

                  <button
                    onClick={() => likeCampaign(camp.id)}
                    className={`flex-1 py-2.5 px-3 rounded-xl text-[14px] font-semibold text-center cursor-pointer transition-colors whitespace-nowrap ${
                      isLiked 
                        ? 'bg-[#222222] text-white hover:bg-black' 
                        : 'btn-airbnb-primary'
                    }`}
                  >
                    {isLiked ? l('Đã Ứng Tuyển', 'Applied', '지원완료') : l('Ứng Tuyển', 'Apply Now', '지원하기')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
