import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Search, 
  Star, 
  MapPin, 
  Heart, 
  Sparkles, 
  SlidersHorizontal,
  Award,
  ArrowRight
} from 'lucide-react';
import { Creator } from '../../types';

export const DiscoverCreators: React.FC = () => {
  const { 
    creators, 
    likeCreator, 
    setViewingCreatorId, 
    setActiveMatchId, 
    setCurrentView,
    likes,
    activeBusiness
  } = useApp();

  const { t, l, loc } = useT();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nicheFilter, setNicheFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [maxRate, setMaxRate] = useState<number>(2000000);

  const filteredCreators = creators.filter((c) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (nicheFilter !== 'all' && !c.niche.toLowerCase().includes(nicheFilter.toLowerCase())) {
      return false;
    }
    if (platformFilter !== 'all') {
      const hasPlat = c.platforms.some(p => p.toLowerCase() === platformFilter.toLowerCase());
      if (!hasPlat) return false;
    }
    if (c.ratePerVideo > maxRate) return false;
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
            placeholder={l('Tìm theo tên, @username hoặc chủ đề...', 'Search creators by name, @username, niche...', '이름, @계정명, 분야로 검색...')}
            className="w-full text-[14px] rounded-full border border-[#DDDDDD] pl-9.5 pr-4 py-2.5 bg-white text-[#222222] shadow-[0_1px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:border-[#222222] transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[14px]">
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="rounded-full border border-[#DDDDDD] px-4 py-2.5 text-[14px] bg-white text-[#222222] font-medium hover:border-[#222222] transition-colors cursor-pointer"
          >
            <option value="all">{t.allNiches}</option>
            <option value="Ẩm Thực">{l('Ẩm Thực & Cafe', 'Food & Cafe', '푸드 & 카페')}</option>
            <option value="Làm Đẹp">{l('Làm Đẹp & Skincare', 'Beauty & Skincare', '뷰티 & 스킨케어')}</option>
            <option value="Fitness">{l('Fitness & Pilates', 'Fitness & Pilates', '피트니스 & 필라테스')}</option>
            <option value="Công Nghệ">{l('Công Nghệ & Workspace', 'Tech & Workspaces', '테크 & 공간')}</option>
            <option value="Nghệ Thuật">{l('Hội Họa & Workshop', 'Arts & Workshops', '예술 & 원데이 클래스')}</option>
            <option value="Thời Trang">{l('Thời Trang & Lookbook', 'Fashion & Lookbook', '패션 & 룩북')}</option>
            <option value="Đời Sống">{l('Lối Sống & Nightlife', 'Lifestyle & Nightlife', '라이프 & 나이트라이프')}</option>
            <option value="Du Lịch">{l('Du Lịch & Sống Chậm', 'Travel & Slow Living', '여행 & 슬로라이프')}</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="rounded-full border border-[#DDDDDD] px-4 py-2.5 text-[14px] bg-white text-[#222222] font-medium hover:border-[#222222] transition-colors cursor-pointer"
          >
            <option value="all">{l('Mọi Nền Tảng', 'All Platforms', '모든 플랫폼')}</option>
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
          </select>

          <select
            value={maxRate}
            onChange={(e) => setMaxRate(Number(e.target.value))}
            className="rounded-full border border-[#DDDDDD] px-4 py-2.5 text-[14px] bg-white text-[#222222] font-medium hover:border-[#222222] transition-colors cursor-pointer"
          >
            <option value={2000000}>{l('Mức Giá: Tối Đa 2M', 'Max: Any (2M)', '단가: 전체 (2M)')}</option>
            <option value={1000000}>{l('Dưới 1M VND', 'Under 1M VND', '100만 동 미만')}</option>
            <option value={800000}>{l('Dưới 800K VND', 'Under 800K VND', '80만 동 미만')}</option>
            <option value={600000}>{l('Dưới 600K VND', 'Under 600K VND', '60만 동 미만')}</option>
          </select>

          {/* Airbnb Floating Map Pill */}
          <button
            onClick={() => setCurrentView('map')}
            className="ml-auto flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#222222] hover:bg-black text-white text-[14px] font-semibold transition-all hover:scale-105 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>{t.navMap}</span>
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title & Count */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
            {l(`Khám Phá Nhà Sáng Tạo (${creators.length})`, `Discover Creators (${creators.length})`, `크리에이터 탐색 (${creators.length}명)`)}
          </h1>
          <p className="text-[15px] text-[#717171] leading-relaxed mt-1">
            {l(
              'Các nhà sáng tạo nội dung ẩm thực, phong cách sống và làm đẹp hàng đầu tại Hà Nội.',
              'Top vetted food, beauty, lifestyle, and cafe creators in Hanoi.',
              '하노이 최고의 푸드, 라이프스타일, 뷰티 크리에이터.'
            )}
          </p>
        </div>
      </div>

      {/* Creators Grid - Airbnb Listing Cards */}
      {filteredCreators.length === 0 ? (
        <div className="py-20 text-center bg-[#F7F7F7] rounded-3xl border border-[#EBEBEB] p-8">
          <p className="text-[16px] font-semibold text-[#222222] mb-1">
            {l('Không tìm thấy nhà sáng tạo phù hợp', 'No creators found matching criteria', '조건에 맞는 크리에이터가 없습니다')}
          </p>
          <p className="text-[14px] text-[#717171] mb-4 max-w-sm mx-auto">
            {l(
              'Hãy thử điều chỉnh từ khóa tìm kiếm hoặc mở rộng bộ lọc ngân sách và lĩnh vực.',
              'Try adjusting your search query or broadening your filters.',
              '검색어를 변경하거나 예산 및 분야 필터를 넓혀보세요.'
            )}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setNicheFilter('all'); setPlatformFilter('all'); setMaxRate(2000000); }}
            className="px-4 py-2 bg-[#222222] hover:bg-black text-white text-[14px] font-semibold rounded-full cursor-pointer transition-colors"
          >
            {l('Xóa Toàn Bộ Bộ Lọc', 'Clear All Filters', '필터 초기화')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {filteredCreators.map((creator) => {
            const isLiked = likes[`${activeBusiness.id}_${creator.id}`];

            return (
              <div 
                key={creator.id}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container - Airbnb Card Ratio */}
                  <div className="relative aspect-[20/19] rounded-2xl overflow-hidden bg-[#F7F7F7] mb-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out cursor-pointer"
                      referrerPolicy="no-referrer"
                      onClick={() => setViewingCreatorId(creator.id)}
                    />

                    {/* Airbnb "Guest favourite" badge top-left */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#222222] shadow-[0_2px_4px_rgba(0,0,0,0.12)] flex items-center gap-1 select-none pointer-events-none">
                      <Award className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{l('Yêu thích', 'Top Creator', '인기 크리에이터')}</span>
                    </div>

                    {/* Floating Heart Button top-right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        likeCreator(creator.id);
                      }}
                      className="absolute top-3 right-3 p-2 text-white hover:scale-110 active:scale-90 transition-transform drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] cursor-pointer"
                      title={isLiked ? 'Đã thích' : 'Thích'}
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
                        onClick={() => setViewingCreatorId(creator.id)}
                        className="text-[15px] font-semibold text-[#222222] truncate cursor-pointer hover:underline"
                      >
                        {creator.username}
                      </h3>
                      <div className="flex items-center gap-1 text-[14px] text-[#222222] font-medium shrink-0">
                        <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                        <span>{creator.rating}</span>
                      </div>
                    </div>

                    {/* Line 2: Niche & Location */}
                    <p className="text-[15px] text-[#717171] truncate">
                      {loc(creator.niche)} · {loc(creator.location)}
                    </p>

                    {/* Line 3: Metric */}
                    <p className="text-[15px] text-[#717171] truncate">
                      {creator.followersDisplay} {t.followers.toLowerCase()} · {creator.averageViewsDisplay} {t.avgViews.toLowerCase()}
                    </p>

                    {/* Line 4: Rate in Airbnb price format */}
                    <div className="pt-1 flex items-baseline gap-1">
                      <span className="text-[15px] font-semibold text-[#222222]">
                        {creator.rateDisplay}
                      </span>
                      <span className="text-[15px] text-[#717171]">/ video</span>
                    </div>

                    {/* Subtle AI Reason */}
                    {creator.aiReason && (
                      <div className="bg-[#F7F7F7] rounded-xl p-2.5 text-[12px] text-[#717171] mt-2 line-clamp-2">
                        <span className="font-semibold text-[#222222]">Match: </span>
                        {loc(creator.aiReason)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Airbnb Action Buttons */}
                <div className="pt-3 mt-2 flex items-center gap-2">
                  <button
                    onClick={() => setViewingCreatorId(creator.id)}
                    className="flex-1 py-2.5 px-3 border border-[#222222] hover:bg-[#F7F7F7] text-[14px] font-semibold text-[#222222] rounded-xl transition-colors cursor-pointer text-center"
                  >
                    {l('Hồ Sơ', 'Profile', '프로필')}
                  </button>

                  <button
                    onClick={() => {
                      const matchId = likeCreator(creator.id);
                      if (matchId) {
                        setActiveMatchId(matchId);
                        setCurrentView('collab');
                      }
                    }}
                    className="flex-1 py-2.5 px-3 btn-airbnb-primary rounded-xl text-[14px] font-semibold text-center cursor-pointer whitespace-nowrap"
                  >
                    {l('Báo Giá', 'Offer', '제안')}
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
