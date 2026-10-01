import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { Sparkles, ArrowRight, X, Heart, ShieldCheck } from 'lucide-react';
import { CollabLocalIcon } from './Logo';

export const MatchModal: React.FC = () => {
  const { matchCelebration, setMatchCelebration, setActiveMatchId, setCurrentView, role } = useApp();
  const { l, loc } = useT();

  if (!matchCelebration.show || !matchCelebration.match) return null;

  const { match, creator, business, campaign } = matchCelebration;

  const handleEnterRoom = () => {
    setActiveMatchId(match.id);
    setCurrentView('collab');
    setMatchCelebration({ show: false });
  };

  const localizedCampaignTitle = campaign ? loc(campaign.title) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] text-center relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setMatchCelebration({ show: false })}
          className="absolute top-4 right-4 p-2 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center drop-shadow-sm">
          <CollabLocalIcon className="w-16 h-16" />
        </div>

        <h2 className="text-[26px] font-semibold text-[#222222] tracking-tight mb-2 font-display">
          {l('Ghép Đôi Thành Công!', "It's a Match!", '매칭 성공! It\'s a Match!')}
        </h2>

        <p className="text-[14px] text-[#717171] mb-6 leading-relaxed">
          {role === 'business'
            ? l(
                `Bạn và ${creator?.username || 'Creator'} đều thể hiện mong muốn hợp tác trong chiến dịch "${localizedCampaignTitle || 'này'}"!`,
                `You and ${creator?.username || 'the creator'} are both interested in collaborating on "${localizedCampaignTitle || 'this campaign'}"!`,
                `귀사와 ${creator?.username || '크리에이터'}님이 "${localizedCampaignTitle || '해당 캠페인'}"에 상호 매칭되었습니다!`
              )
            : l(
                `Bạn và ${business?.name || 'Doanh nghiệp'} đều hào hứng hợp tác trong chiến dịch "${localizedCampaignTitle || 'này'}"!`,
                `You and ${business?.name || 'the business'} are both interested in working together on "${localizedCampaignTitle || 'this campaign'}"!`,
                `회원님과 ${business?.name || '광고주'}님이 "${localizedCampaignTitle || '해당 캠페인'}"에서 함께 협업하기로 매칭되었습니다!`
              )}
        </p>

        {/* Both avatars connected */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md mx-auto mb-1.5 bg-[#F7F7F7]">
              <img
                src={business?.image}
                alt={business?.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[13px] font-semibold text-[#222222] block truncate max-w-[100px]">
              {business?.name}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 flex items-center justify-center font-semibold text-[12px] shrink-0">
            ✕
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md mx-auto mb-1.5 bg-[#F7F7F7]">
              <img
                src={creator?.avatar}
                alt={creator?.username}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-[13px] font-semibold text-[#222222] block truncate max-w-[100px]">
              {creator?.username}
            </span>
          </div>
        </div>

        {/* Protection guarantee snippet */}
        <div className="bg-[#F7F7F7] rounded-2xl p-3.5 mb-6 text-left border border-[#EBEBEB] flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#008A05] shrink-0" />
          <p className="text-[13px] text-[#717171] leading-snug">
            <strong className="text-[#222222] font-semibold">
              {l('Bảo Vệ Ký Quỹ Đã Kích Hoạt:', 'Payment Protection Active:', '에스크로 결제 보호 활성화:')}
            </strong>{' '}
            {l(
              'Thương lượng thù lao trực tiếp trong phòng hợp tác chung với cam kết tự động giải ngân khi duyệt video.',
              'Negotiate rates directly in your shared collaboration room with guaranteed escrow release upon content approval.',
              '공동 협업 룸에서 직접 단가를 조율하고 영상 승인 즉시 안전하게 대금이 지급됩니다.'
            )}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleEnterRoom}
            className="w-full py-3 px-4 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{l('Vào Phòng Hợp Tác', 'Enter Collaboration Room', '협업 룸 입장하기')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setMatchCelebration({ show: false })}
            className="w-full py-2.5 px-4 text-[14px] font-semibold text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] rounded-xl transition-colors cursor-pointer"
          >
            {l('Tiếp Tục Khám Phá', 'Continue Browsing', '계속 둘러보기')}
          </button>
        </div>
      </div>
    </div>
  );
};
