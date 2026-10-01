import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { X, Check, Sparkles, ShieldCheck, Zap, TrendingUp, Users } from 'lucide-react';

export const BusinessProModal: React.FC = () => {
  const { showProModal, setShowProModal } = useApp();
  const { t, lang } = useT();
  const [upgraded, setUpgraded] = useState<boolean>(false);

  if (!showProModal) return null;

  const handleSimulateUpgrade = () => {
    setUpgraded(true);
    setTimeout(() => {
      setShowProModal(false);
      setUpgraded(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] relative my-auto max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => setShowProModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {upgraded ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#EBF7EE] text-[#008A05] flex items-center justify-center mx-auto border border-[#008A05]/20">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-[22px] font-semibold text-[#222222] font-display">
              {lang === 'vi' ? 'Đã Kích Hoạt Gói Business Pro!' : lang === 'ko' ? '비즈니스 프로 활성화 완료!' : 'Business Pro Activated!'}
            </h3>
            <p className="text-[14px] text-[#717171] max-w-sm mx-auto leading-relaxed">
              {lang === 'vi' 
                ? 'Doanh nghiệp của bạn đã được mở khóa bộ lọc creator nâng cao, ưu tiên ghim bản đồ và chạy tối đa 10 chiến dịch cùng lúc.' 
                : lang === 'ko'
                ? '크리에이터 고급 필터, 지도 상단 고정 노출 및 최대 10개 캠페인 동시 진행 권한이 부여되었습니다.'
                : 'You now have unlimited creator filters, priority matching, and 10 active campaign slots.'}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-wider">
                CollabLocal Business Pro
              </span>
            </div>

            <h2 className="text-[26px] font-semibold text-[#222222] mb-1 font-display">
              {lang === 'vi' ? 'Công Cụ Tối Ưu Cho Doanh Nghiệp Phát Triển' : lang === 'ko' ? '비즈니스 성장을 위한 고급 프로 도구' : 'Advanced Tools for Growing Campaigns'}
            </h2>
            <p className="text-[14px] text-[#717171] mb-6">
              {lang === 'vi' 
                ? 'Thúc đẩy hiệu quả marketing người ảnh hưởng với thuật toán gợi ý ưu tiên và đo lường doanh thu POS tại quán.' 
                : lang === 'ko'
                ? '우선 추천 알고리즘과 매장 POS 연동 성과 추적으로 인플루언서 마케팅 효율을 극대화합니다.'
                : 'Supercharge your local influencer marketing with priority AI matching and full attribution analytics.'}
            </p>

            <div className="bg-[#F7F7F7] rounded-3xl p-5 border border-[#EBEBEB] mb-6">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[15px] font-semibold text-[#222222]">{lang === 'vi' ? 'Gói Đăng Ký Tháng' : lang === 'ko' ? '월간 구독 플랜' : 'Pro Membership'}</span>
                <div className="text-right">
                  <span className="text-[26px] font-semibold font-mono text-[#222222]">990.000 ₫</span>
                  <span className="text-[14px] text-[#717171]"> / {lang === 'vi' ? 'tháng' : lang === 'ko' ? '월' : 'month'}</span>
                </div>
              </div>

              <div className="space-y-3 text-[14px] text-[#717171]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#008A05] shrink-0" />
                  <span><strong className="text-[#222222]">{lang === 'vi' ? 'Bộ Lọc Creator Chuyên Sâu:' : lang === 'ko' ? '정밀 크리에이터 필터:' : 'Advanced Creator Filters:'}</strong> {lang === 'vi' ? 'Lọc theo địa bàn cụ thể, tỷ lệ tương tác thật và phân khúc ngân sách.' : lang === 'ko' ? '타겟 지역, 진성 팔로워 비율 및 맞춤 예산대 필터링.' : 'Audience geography, real follower authenticity score, and price tiers.'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#008A05] shrink-0" />
                  <span><strong className="text-[#222222]">{lang === 'vi' ? 'Ưu Tiên Khớp Nối:' : lang === 'ko' ? '우선 매칭 및 상단 고정:' : 'Priority Matching:'}</strong> {lang === 'vi' ? 'Chiến dịch của bạn được hiển thị nổi bật trên đầu bản đồ và thẻ quẹt creator.' : lang === 'ko' ? '탐색 지도 및 스와이프 덱 상단에 캠페인이 우선 노출됩니다.' : 'Your campaigns appear featured at the top of creator discover feeds and map pins.'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#008A05] shrink-0" />
                  <span><strong className="text-[#222222]">{lang === 'vi' ? 'Tối Đa 10 Chiến Dịch Cùng Lúc:' : lang === 'ko' ? '최대 10개 캠페인 동시 진행:' : 'Up to 10 Active Campaigns:'}</strong> {lang === 'vi' ? 'Chạy đồng thời menu mùa thu, sự kiện cuối tuần và chiến dịch review định kỳ.' : lang === 'ko' ? '시즌 신메뉴, 주말 이벤트 및 상시 리뷰 캠페인을 동시에 운영.' : 'Run seasonal menu launches, weekend events, and ongoing creator reviews simultaneously.'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4.5 h-4.5 text-[#008A05] shrink-0" />
                  <span><strong className="text-[#222222]">{lang === 'vi' ? 'Hợp Tác Đội Ngũ:' : lang === 'ko' ? '팀 협업 계정 연동:' : 'Team Collaboration:'}</strong> {lang === 'vi' ? 'Mời quản lý marketing và nhân viên thu ngân theo dõi đối soát mã ưu đãi.' : lang === 'ko' ? '마케터와 매장 직원이 함께 프로모션 코드를 대조 검증.' : 'Invite marketing managers and store baristas with custom permissions.'}</span>
                </div>
              </div>
            </div>

            {/* Platform Economics Breakdown */}
            <div className="bg-[#F7F7F7] p-4.5 rounded-2xl border border-[#EBEBEB] text-[13px] text-[#717171] space-y-1.5 mb-6">
              <span className="font-semibold text-[#222222] block text-[14px]">
                {lang === 'vi' ? 'Mô Hình Doanh Thu Nền Tảng (Business Model):' : lang === 'ko' ? '플랫폼 비즈니스 모델:' : 'CollabLocal Freemium Marketplace Model:'}
              </span>
              <p>• <strong>{lang === 'vi' ? 'Miễn phí cơ bản:' : lang === 'ko' ? '기본 무료:' : 'Core platform:'}</strong> {lang === 'vi' ? 'Đăng ký tài khoản, tìm kiếm bản đồ và tạo 1 chiến dịch hoạt động.' : lang === 'ko' ? '가입, 지도 탐색, 1개 활성 캠페인 무료 등록.' : 'Free to register, browse creators, map discovery, and post 1 active campaign.'}</p>
              <p>• <strong>{lang === 'vi' ? 'Phí giao dịch ký quỹ (Take rate):' : lang === 'ko' ? '에스크로 결제 수수료:' : 'Take rate:'}</strong> {lang === 'vi' ? '10% trên mỗi hợp tác hoàn tất thành công.' : lang === 'ko' ? '성공 완료된 협업 건당 10% 안전 거래 수수료.' : '10% escrow transaction fee on completed collaborations.'}</p>
              <p>• <strong>{lang === 'vi' ? 'Doanh thu định kỳ (SaaS Pro):' : lang === 'ko' ? '구독형 SaaS 수익:' : 'Optional upgrade:'}</strong> {lang === 'vi' ? '990K VND/tháng cho chuỗi và doanh nghiệp lớn.' : lang === 'ko' ? '프랜차이즈 및 확장 매장을 위한 월 990K VND 구독.' : 'Business Pro monthly subscription for scale.'}</p>
            </div>

            <button
              onClick={handleSimulateUpgrade}
              className="w-full py-3.5 px-4 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {lang === 'vi' ? 'Thử Nghiệm Nâng Cấp Pro (Mô Phỏng Demo)' : lang === 'ko' ? '프로 업그레이드 시뮬레이션 (데모)' : 'Simulate Upgrade to Pro (Demo)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
