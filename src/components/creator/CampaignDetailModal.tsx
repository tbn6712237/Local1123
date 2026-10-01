import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  X, 
  MapPin, 
  Star, 
  Clock, 
  Check, 
  Building2, 
  Heart,
  DollarSign,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

export const CampaignDetailModal: React.FC = () => {
  const { 
    viewingCampaignId, 
    setViewingCampaignId, 
    campaigns, 
    businesses, 
    likeCampaign, 
    activeCreator, 
    likes, 
    role,
    setViewingBusinessId 
  } = useApp();

  const { t, l, loc } = useT();

  if (!viewingCampaignId) return null;

  const campaign = campaigns.find(c => c.id === viewingCampaignId);
  if (!campaign) return null;

  const biz = businesses.find(b => b.id === campaign.businessId);
  const isLiked = likes[`${activeCreator.id}_${campaign.id}`];
  const galleryPhotos = biz?.photos && biz.photos.length > 0 ? biz.photos : biz?.image ? [biz.image] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] my-auto overflow-hidden relative max-h-[92vh] flex flex-col">
        <button
          onClick={() => setViewingCampaignId(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-[#222222] shadow-md cursor-pointer transition-all border border-black/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header photo & Business Logo */}
        <div className="relative shrink-0 h-48 sm:h-52 bg-[#F7F7F7] border-b border-[#EBEBEB]">
          {biz?.image && (
            <img
              src={biz.image}
              alt={biz.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Logo floating */}
          {biz?.logo && (
            <div className="absolute top-4 left-6 w-12 h-12 rounded-2xl bg-white p-0.5 border border-white/80 shadow-md overflow-hidden">
              <img src={biz.logo} alt={biz.name} className="w-full h-full object-cover rounded-xl" />
            </div>
          )}

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[12px] bg-[#2563EB] text-white px-3 py-1 rounded-full font-semibold shadow-xs inline-block mb-1.5 font-mono">
              {campaign.budgetDisplay}
            </span>
            <h2 className="text-[22px] sm:text-[26px] font-semibold font-display">{loc(campaign.title)}</h2>
            <p className="text-[14px] text-white/90 flex items-center gap-1.5 mt-0.5">
              <span className="font-semibold text-white">{biz?.name}</span>
              <span>•</span>
              <span>{loc(campaign.location)}</span>
              <span>•</span>
              <span>{campaign.distanceKm} km {l('cách bạn', 'away', '거리')}</span>
            </p>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-[13px]">
            <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
              <span className="text-[11px] text-[#717171] uppercase block font-semibold">Platform</span>
              <span className="font-semibold text-[#222222] mt-0.5 block">{campaign.platform}</span>
            </div>
            <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Hình thức', 'Payment', '지급 방식')}</span>
              <span className="font-semibold text-[#2563EB] mt-0.5 block">{loc(campaign.paymentType)}</span>
            </div>
            <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Chủ đề', 'Target Niche', '분야')}</span>
              <span className="font-semibold text-[#222222] mt-0.5 block">{loc(campaign.creatorType)}</span>
            </div>
            <div className="p-3 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
              <span className="text-[11px] text-[#717171] uppercase block font-semibold">{l('Hạn chót', 'Deadline', '마감일')}</span>
              <span className="font-semibold text-[#222222] mt-0.5 block">{loc(campaign.deadline)}</span>
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider mb-2">
              {l('Mô Tả & Yêu Cầu Chiến Dịch', 'Campaign Brief & Requirements', '캠페인 기획 브리프 및 가이드라인')}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#717171] leading-relaxed bg-[#F7F7F7] p-4 rounded-2xl border border-[#EBEBEB]">
              {loc(campaign.brief)}
            </p>
          </div>

          <div className="space-y-2 text-[14px] text-[#717171]">
            <h3 className="text-[14px] font-semibold text-[#222222] uppercase tracking-wider mb-2">
              {l('Hạng Mục Bàn Giao (Deliverables)', 'Deliverables Scope', '제출 결과물')}
            </h3>
            <div className="p-4 bg-white rounded-2xl border border-[#EBEBEB] space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#008A05] shrink-0" />
                <span className="text-[#222222] font-medium">{loc(campaign.deliverables)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#008A05] shrink-0" />
                <span>{l('Gắn mã khuyến mãi độc quyền trong caption & video', 'Include unique promo voucher in caption & video overlay', '캡션 및 영상 내 고유 프로모션 코드 노출 필수')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#008A05] shrink-0" />
                <span>{l('Ghé quán trải nghiệm trực tiếp (được tài trợ đồ uống / món ăn)', 'On-site visit required (free food/drinks provided during shoot)', '매장 방문 촬영 필수 (촬영 중 음료/메뉴 무상 제공)')}</span>
              </div>
            </div>
          </div>

          {/* Business Info & Photos Gallery */}
          {biz && (
            <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-3">
              <div className="flex items-center justify-between text-[14px]">
                <div className="flex items-center gap-3">
                  {biz.logo && (
                    <img src={biz.logo} alt={biz.name} className="w-10 h-10 rounded-xl object-cover border border-[#EBEBEB] shadow-2xs" />
                  )}
                  <div>
                    <span className="font-semibold text-[#222222] block">{biz.name}</span>
                    <span className="text-[#717171] text-[13px]">{loc(biz.category)} • {biz.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setViewingCampaignId(null);
                    setViewingBusinessId(biz.id);
                  }}
                  className="text-[14px] font-semibold text-[#222222] hover:text-[#2563EB] underline cursor-pointer transition-colors"
                >
                  {l('Xem Quán', 'View Store', '매장 보기')}
                </button>
              </div>

              {galleryPhotos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#EBEBEB]">
                  {galleryPhotos.slice(0, 4).map((p, i) => (
                    <div key={i} className="aspect-4/3 rounded-xl overflow-hidden bg-white border border-[#EBEBEB]">
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#EBEBEB]">
            <button
              onClick={() => setViewingCampaignId(null)}
              className="px-4 py-2.5 text-[14px] font-semibold text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] rounded-xl cursor-pointer transition-colors"
            >
              {t.close}
            </button>
            {role === 'creator' && (
              <button
                onClick={() => {
                  likeCampaign(campaign.id);
                  setViewingCampaignId(null);
                }}
                className="px-6 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isLiked ? l('Đã Ứng Tuyển', 'Applied', '지원 완료') : t.interestedBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
