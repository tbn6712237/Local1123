import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Heart, 
  Handshake, 
  ArrowRight, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  Check, 
  Sparkles,
  Building2,
  Camera,
  Layers,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MatchesList: React.FC = () => {
  const { 
    matches, 
    role, 
    businesses, 
    creators, 
    campaigns, 
    setActiveMatchId, 
    setCurrentView,
    activeBusiness,
    activeCreator 
  } = useApp();

  const { t, l, loc } = useT();
  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');
  const [swipeIdx, setSwipeIdx] = useState<number>(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const isBusiness = role === 'business';
  const filteredMatches = matches.filter(m => 
    isBusiness ? m.businessId === activeBusiness.id : m.creatorId === activeCreator.id
  );

  const safeSwipeIdx = filteredMatches.length > 0 ? Math.min(Math.max(0, swipeIdx), filteredMatches.length - 1) : 0;
  const currentMatch = filteredMatches.length > 0 ? filteredMatches[safeSwipeIdx] : null;

  const handleNextMatch = (dir: 'left' | 'right') => {
    if (filteredMatches.length === 0) return;
    setSwipeDirection(dir);
    setTimeout(() => {
      setSwipeDirection(null);
      setSwipeIdx((prev) => (prev + 1) % filteredMatches.length);
    }, 200);
  };

  const handlePrevMatch = () => {
    if (filteredMatches.length === 0) return;
    setSwipeIdx((prev) => (prev - 1 + filteredMatches.length) % filteredMatches.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
            {t.matchesTitle} ({filteredMatches.length})
          </h1>
          <p className="text-[15px] text-[#717171] leading-relaxed mt-1 max-w-2xl">
            {t.matchesSub}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Mode Switcher: Grid vs Swipe Deck */}
          {filteredMatches.length > 0 && (
            <div className="flex items-center bg-[#F7F7F7] p-1 rounded-full border border-[#DDDDDD]">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-[14px] font-semibold rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#222222] shadow-xs' : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                {l('Dạng Lưới', 'Grid View', '그리드 보기')}
              </button>
              <button
                onClick={() => setViewMode('swipe')}
                className={`px-4 py-2 text-[14px] font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'swipe' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-[#717171] hover:text-[#222222]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{l('Quẹt Thẻ Match', 'Swipe Mode', '스와이프 모드')}</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setCurrentView('swipe')}
            className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-full shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{t.openSwipeNow}</span>
          </button>
        </div>
      </div>

      {filteredMatches.length === 0 ? (
        <div className="bg-[#F7F7F7] rounded-3xl p-12 text-center border border-[#EBEBEB]">
          <div className="w-14 h-14 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-[22px] font-semibold text-[#222222] mb-1 font-display">
            {t.noMatchesYet}
          </h3>
          <p className="text-[15px] text-[#717171] max-w-sm mx-auto mb-6 leading-relaxed">
            {t.noMatchesDesc}
          </p>
          <button
            onClick={() => setCurrentView('swipe')}
            className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-full shadow-sm transition-all cursor-pointer"
          >
            {t.openSwipeNow}
          </button>
        </div>
      ) : viewMode === 'swipe' && currentMatch ? (
        /* Interactive Swipe Cards in Matches */
        <div className="max-w-md mx-auto py-2">
          <div className="flex items-center justify-between text-[13px] text-[#717171] mb-2 px-1">
            <span className="font-semibold text-[#2563EB] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{l('Quẹt Xem Các Kết Nối Của Bạn', 'Swipe Through Your Matches', '매칭 내역 스와이프')}</span>
            </span>
            <span className="font-mono">{safeSwipeIdx + 1} / {filteredMatches.length}</span>
          </div>

          {(() => {
            const biz = businesses.find(b => b.id === currentMatch.businessId) || businesses[0];
            const creator = creators.find(c => c.id === currentMatch.creatorId) || creators[0];
            const camp = campaigns.find(c => c.id === currentMatch.campaignId) || campaigns[0];
            const counterpartName = isBusiness ? creator.username : biz.name;
            const counterpartImage = isBusiness ? creator.avatar : biz.image;
            const counterpartSub = isBusiness ? `${loc(creator.niche)} · ${creator.followersDisplay} followers` : `${loc(biz.category)} · ${biz.location}`;

            return (
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMatch.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={
                      swipeDirection === 'right' 
                        ? { x: 300, opacity: 0, rotate: 15 }
                        : swipeDirection === 'left'
                        ? { x: -300, opacity: 0, rotate: -15 }
                        : { scale: 1, opacity: 1, x: 0, rotate: 0 }
                    }
                    exit={{ opacity: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => {
                      if (info.offset.x > 80) {
                        handleNextMatch('right');
                      } else if (info.offset.x < -80) {
                        handleNextMatch('left');
                      }
                    }}
                    className="bg-white rounded-3xl overflow-hidden border border-[#EBEBEB] shadow-[0_6px_20px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing"
                  >
                    <div className="relative h-64 bg-[#F7F7F7]">
                      <img
                        src={counterpartImage}
                        alt={counterpartName}
                        className="w-full h-full object-cover pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white text-[#222222] font-semibold text-[11px] uppercase tracking-wider shadow-sm">
                          It's a Match!
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-[22px] font-semibold font-display">{counterpartName}</h3>
                        <p className="text-[14px] text-white/90">{counterpartSub}</p>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <div className="p-3.5 rounded-2xl bg-[#F7F7F7] border border-[#EBEBEB] space-y-2 text-[14px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#717171]">{l('Chiến Dịch:', 'Campaign:', '캠페인:')}</span>
                          <span className="font-semibold text-[#222222]">{loc(camp.title)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#717171]">{l('Báo Giá Thù Lao:', 'Offer Status:', '제안 단가:')}</span>
                          <span className="font-semibold text-[#2563EB]">
                            {currentMatch.agreedAmount ? `${(currentMatch.agreedAmount/1000).toLocaleString()}K VND (${l('Đã Chốt', 'Agreed', '확정됨')})` : l('Đang Đàm Phán', 'Negotiating', '협상 중')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#717171]">{l('Tiến Độ Escrow:', 'Escrow Status:', '에스크로 상태:')}</span>
                          <span className="font-semibold text-[#008A05]">
                            {currentMatch.payment?.status === 'escrowed' || currentMatch.payment?.status === 'released'
                              ? l('Đã Ký Quỹ Escrow', 'Held in Escrow', '에스크로 예치됨')
                              : l('Chờ Ký Quỹ', 'Awaiting Escrow', '에스크로 대기')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveMatchId(currentMatch.id);
                          setCurrentView('collab');
                        }}
                        className="w-full py-3 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{t.openCollabRoom}</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Swipe Left/Right Controls */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => handleNextMatch('left')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#DDDDDD] hover:border-[#222222] text-[13px] font-semibold text-[#717171] hover:text-[#222222] shadow-xs cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{l('Quẹt Trái', 'Swipe Left', '왼쪽으로')}</span>
                  </button>
                  <button
                    onClick={() => handleNextMatch('right')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#2563EB] text-[13px] font-semibold text-[#2563EB] hover:bg-[#EFF6FF] shadow-xs cursor-pointer transition-colors"
                  >
                    <span>{l('Quẹt Phải', 'Swipe Right', '오른쪽으로')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* Grid of Matches */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMatches.map((m) => {
            const biz = businesses.find(b => b.id === m.businessId) || businesses[0];
            const creator = creators.find(c => c.id === m.creatorId) || creators[0];
            const camp = campaigns.find(c => c.id === m.campaignId) || campaigns[0];
            const counterpartName = isBusiness ? creator.username : biz.name;
            const counterpartImage = isBusiness ? creator.avatar : biz.image;
            const counterpartSub = isBusiness ? `${loc(creator.niche)} · ${creator.followersDisplay} followers` : `${loc(biz.category)} · ${biz.location}`;

            return (
              <div
                key={m.id}
                onClick={() => {
                  setActiveMatchId(m.id);
                  setCurrentView('collab');
                }}
                className="bg-white rounded-3xl p-5 border border-[#EBEBEB] hover:border-[#222222] hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F7F7F7] shrink-0 border border-[#EBEBEB]">
                        <img
                          src={counterpartImage}
                          alt={counterpartName}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-[17px] font-semibold text-[#222222] font-display">
                            {counterpartName}
                          </h3>
                        </div>
                        <span className="text-[14px] text-[#717171] block">{counterpartSub}</span>
                        <span className="text-[13px] text-[#2563EB] font-semibold block mt-0.5">
                          {l('Chiến dịch:', 'Campaign:', '캠페인:')} {loc(camp.title)}
                        </span>
                      </div>
                    </div>

                    <span className="text-[12px] uppercase font-semibold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
                      Matched
                    </span>
                  </div>

                  <div className="bg-[#F7F7F7] p-3.5 rounded-2xl border border-[#EBEBEB] text-[14px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#717171]">{l('Báo giá thù lao:', 'Offer Status:', '제안 단가:')}</span>
                      <span className="font-semibold text-[#222222]">
                        {m.agreedAmount ? `${(m.agreedAmount/1000).toLocaleString()}K VND (${l('Đã Chốt', 'Agreed', '확정됨')})` : l('Đang Đàm Phán', 'Negotiating in Room', '협상 중')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#717171]">{l('Bước tiếp theo:', 'Next Milestone:', '다음 단계:')}</span>
                      <span className="font-semibold text-[#008A05] capitalize">
                        {m.status === 'matched' ? l('Chốt thù lao & Ký quỹ', 'Agree Rate & Escrow', '단가 확정 & 에스크로') : loc(m.status.replace('_', ' '))}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EBEBEB] flex items-center justify-between text-[14px] text-[#2563EB] font-semibold">
                  <span>{t.openCollabRoom}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
