import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Heart, 
  X, 
  Star, 
  MapPin, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  Users, 
  TrendingUp, 
  Calendar, 
  RotateCcw,
  Info,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SwipeDeck: React.FC = () => {
  const { 
    role, 
    creators, 
    campaigns, 
    businesses, 
    likeCreator, 
    passCreator, 
    likeCampaign, 
    passCampaign,
    setViewingCreatorId,
    setViewingCampaignId,
    setViewingBusinessId
  } = useApp();

  const { t, l, loc } = useT();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [swipeAction, setSwipeAction] = useState<'left' | 'right' | null>(null);

  const isBusiness = role === 'business';
  const items = isBusiness ? creators : campaigns;
  const currentItem = items[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!currentItem) return;
    setSwipeAction(direction);

    setTimeout(() => {
      if (isBusiness) {
        if (direction === 'right') {
          likeCreator(currentItem.id);
        } else {
          passCreator(currentItem.id);
        }
      } else {
        if (direction === 'right') {
          likeCampaign(currentItem.id);
        } else {
          passCampaign(currentItem.id);
        }
      }

      setSwipeAction(null);
      setDragOffset(0);
      setCurrentIndex(prev => prev + 1);
    }, 250);
  };

  const handleResetDeck = () => {
    setCurrentIndex(0);
    setDragOffset(0);
  };

  if (!currentItem || currentIndex >= items.length) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-[22px] font-semibold text-[#222222] mb-2 font-display">
          {t.allCaughtUp}
        </h3>
        <p className="text-[14px] text-[#717171] mb-6 leading-relaxed max-w-xs mx-auto">
          {l(
            `Bạn đã duyệt qua toàn bộ ${isBusiness ? 'nhà sáng tạo nội dung' : 'chiến dịch quảng bá'} hiện có. Hãy kiểm tra mục Kết Nối (Matches) hoặc làm mới danh sách.`,
            `You have reviewed all available ${isBusiness ? 'creators' : 'campaigns'}. Check your Matches or restart from the beginning.`,
            `현재 등록된 모든 ${isBusiness ? '크리에이터' : '캠페인'}를 확인하셨습니다. 매칭 탭을 확인하거나 처음부터 다시 시작하세요.`
          )}
        </p>
        <button
          onClick={handleResetDeck}
          className="inline-flex items-center gap-2 px-5 py-3 btn-airbnb-primary text-white text-[14px] font-semibold rounded-full transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.resetDeck}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-4 flex flex-col items-center select-none">
      {/* Top Deck Info */}
      <div className="w-full flex items-center justify-between text-[12px] text-[#717171] mb-3 px-1">
        <span className="font-semibold uppercase tracking-wider text-[12px] text-[#2563EB] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBusiness ? t.swipeTitleBiz : t.swipeTitleCreator}</span>
        </span>
        <span className="font-medium font-mono text-[12px]">
          {currentIndex + 1} / {items.length}
        </span>
      </div>

      {/* Swipeable Card with Motion Gestures */}
      <div className="relative w-full aspect-[3/4] max-h-[540px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDrag={(_, info) => setDragOffset(info.offset.x)}
            onDragEnd={(_, info) => {
              if (info.offset.x > 90) {
                handleSwipe('right');
              } else if (info.offset.x < -90) {
                handleSwipe('left');
              } else {
                setDragOffset(0);
              }
            }}
            animate={
              swipeAction === 'right'
                ? { x: 400, opacity: 0, rotate: 20 }
                : swipeAction === 'left'
                ? { x: -400, opacity: 0, rotate: -20 }
                : { x: 0, opacity: 1, rotate: dragOffset * 0.05 }
            }
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-[#EAEAE7] bg-white cursor-grab active:cursor-grabbing flex flex-col justify-end"
          >
            {/* Visual Stamp Indicators on Drag */}
            {dragOffset > 40 && (
              <div className="absolute top-8 left-8 z-30 transform -rotate-12 border-3 border-emerald-500 bg-emerald-500/25 backdrop-blur-xs px-4 py-1.5 rounded-2xl text-emerald-400 font-semibold text-[18px] tracking-wider uppercase shadow-lg">
                {t.matchStamp}
              </div>
            )}
            {dragOffset < -40 && (
              <div className="absolute top-8 right-8 z-30 transform rotate-12 border-3 border-rose-500 bg-rose-500/25 backdrop-blur-xs px-4 py-1.5 rounded-2xl text-rose-400 font-semibold text-[18px] tracking-wider uppercase shadow-lg">
                {t.passStamp}
              </div>
            )}

            {isBusiness ? (
              // Business view: Creator Card
              (() => {
                const creator = currentItem as typeof creators[0];
                return (
                  <>
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="bg-white px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#222222] shadow-md font-mono">
                        {creator.rateDisplay}
                      </span>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[13px] text-[#222222]">
                        <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                        <span className="font-semibold">{creator.rating}</span>
                      </div>
                    </div>

                    <div className="relative z-10 p-5 text-white pointer-events-none">
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h2 className="text-[26px] font-semibold tracking-tight font-display">
                          {creator.username}
                        </h2>
                        <span className="text-[14px] text-white/80 font-medium">{creator.location}</span>
                      </div>

                      <p className="text-[14px] text-white/90 font-medium mb-2">
                        {loc(creator.niche)} Creator
                      </p>

                      <div className="grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/15 mb-3 text-center">
                        <div>
                          <span className="text-[11px] text-white/70 block">{t.followers}</span>
                          <span className="text-[14px] font-semibold font-mono">{creator.followersDisplay}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-white/70 block">{t.avgViews}</span>
                          <span className="text-[14px] font-semibold font-mono">{creator.averageViewsDisplay}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-white/70 block">{t.engagement}</span>
                          <span className="text-[14px] font-semibold text-[#008A05] font-mono">{creator.engagementRate}%</span>
                        </div>
                      </div>

                      {creator.aiReason && (
                        <p className="text-[13px] text-white/90 leading-snug line-clamp-2 mb-2 bg-black/40 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                          💡 {loc(creator.aiReason)}
                        </p>
                      )}

                      <div className="pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingCreatorId(creator.id);
                          }}
                          className="text-[13px] sm:text-[14px] text-white hover:text-white/80 flex items-center gap-1 font-semibold underline cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                          <span>{l('Xem portfolio & đánh giá chi tiết', 'View portfolio & reviews', '포트폴리오 및 리뷰 상세보기')}</span>
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()
            ) : (
              // Creator view: Campaign Card
              (() => {
                const campaign = currentItem as typeof campaigns[0];
                const biz = businesses.find(b => b.id === campaign.businessId);
                return (
                  <>
                    <img
                      src={biz?.image}
                      alt={biz?.name}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="bg-white px-3.5 py-1.5 rounded-full text-[13px] font-semibold text-[#222222] shadow-md font-mono">
                        {campaign.budgetDisplay}
                      </span>
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[13px] text-[#222222]">
                        <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                        <span className="font-semibold">{biz?.rating}</span>
                      </div>
                    </div>

                    <div className="relative z-10 p-5 text-white pointer-events-none">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2.5">
                          {biz?.logo && (
                            <img src={biz.logo} alt={biz.name} className="w-9 h-9 rounded-xl object-cover border border-white/80 shadow-md shrink-0" />
                          )}
                          <h2 className="text-[26px] font-semibold tracking-tight font-display">
                            {biz?.name}
                          </h2>
                        </div>
                        <span className="text-[14px] text-white/80 font-medium">{campaign.distanceKm} km</span>
                      </div>

                      <p className="text-[14px] text-white/90 font-medium mb-2">
                        {loc(campaign.title)}
                      </p>

                      <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 mb-3 space-y-1 text-[14px]">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">{l('Yêu Cầu:', 'Deliverables:', '제출 결과물:')}</span>
                          <span className="font-semibold text-white">{loc(campaign.deliverables)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">{l('Đối Tượng:', 'Target Niche:', '희망 대상:')}</span>
                          <span className="font-semibold text-white">{loc(campaign.creatorType)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">{l('Thời Hạn:', 'Deadline:', '마감일:')}</span>
                          <span className="font-semibold text-white">{loc(campaign.deadline)}</span>
                        </div>
                      </div>

                      {campaign.aiReason && (
                        <p className="text-[13px] text-white/90 leading-snug line-clamp-2 mb-2 bg-black/40 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                          💡 {loc(campaign.aiReason)}
                        </p>
                      )}

                      <div className="pointer-events-auto flex items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewingCampaignId(campaign.id);
                          }}
                          className="text-[13px] text-white hover:text-white/80 flex items-center gap-1 font-semibold underline cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                          <span>{l('Chi tiết yêu cầu', 'Campaign details', '캠페인 조건')}</span>
                        </button>

                        {biz && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewingBusinessId(biz.id);
                            }}
                            className="text-[12px] text-white/95 hover:text-white flex items-center gap-1 font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full cursor-pointer transition-colors backdrop-blur-xs border border-white/20"
                          >
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{l('Hồ sơ quán', 'Venue profile', '매장 프로필')}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Swipe Control Buttons */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-white border border-[#DDDDDD] hover:border-[#222222] hover:bg-[#F7F7F7] text-[#717171] hover:text-[#222222] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          title={l('Bỏ qua (Quẹt Trái)', 'Pass (Swipe Left)', '패스 (왼쪽으로 스와이프)')}
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        <button
          onClick={() => handleSwipe('right')}
          className="w-18 h-18 rounded-full btn-airbnb-primary hover:scale-105 active:scale-95 text-white shadow-[0_4px_16px_rgba(255,56,92,0.35)] flex items-center justify-center transition-all cursor-pointer"
          title={l('Thích / Kết Nối (Quẹt Phải)', 'Match / Like (Swipe Right)', '좋아요 / 매칭 (오른쪽으로 스와이프)')}
        >
          <Heart className="w-9 h-9 fill-white stroke-[2]" />
        </button>
      </div>

      <div className="text-center mt-3">
        <p className="text-[12px] text-[#717171]">
          <strong className="text-[#2563EB]">{l('Kéo sang phải', 'Drag right', '오른쪽으로 밀어서')}</strong> {l('để Thích', 'to Like', '좋아요')} · <strong className="text-[#222222]">{l('Kéo sang trái', 'Drag left', '왼쪽으로 밀어서')}</strong> {l('để Bỏ Qua', 'to Pass', '패스')}
        </p>
      </div>
    </div>
  );
};
