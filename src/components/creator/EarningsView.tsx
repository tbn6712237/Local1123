import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Building2,
  DollarSign,
  Info
} from 'lucide-react';

export const EarningsView: React.FC = () => {
  const { matches, businesses, activeCreator, setCurrentView, setActiveMatchId } = useApp();
  const { t, l } = useT();

  const myMatches = matches.filter(m => m.creatorId === activeCreator.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBEBEB] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-wider">
              {t.walletTitle}
            </span>
            <span className="text-[13px] text-[#717171]">· {t.escrowHeld}</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
            {l('Sổ Cái Tài Chính & Ví Thu Nhập', 'Financial Ledger & Wallet', '정산 지갑 및 에스크로 내역')}
          </h1>
          <p className="text-[15px] text-[#717171] max-w-xl mt-1 leading-relaxed">
            {t.walletSub}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[12px] text-[#717171] block font-medium">
              {l('Số Dư Khả Dụng Rút Tiền', 'Total Available Balance', '출금 가능 잔액')}
            </span>
            <span className="text-[26px] font-semibold text-[#222222] tabular-nums">
              3.420.000 ₫
            </span>
          </div>
          <button className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-xl transition-all cursor-pointer shadow-sm">
            {t.withdrawBtn}
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[13px]">
            <span className="font-semibold uppercase tracking-wider text-[12px]">{t.holdingInEscrow}</span>
            <Clock className="w-4 h-4 text-[#717171]" />
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums">
            650.000 ₫
          </div>
          <span className="text-[13px] text-[#717171] font-medium">
            {l('Sẽ giải ngân ngay khi đối tác duyệt', 'Releases upon business approval', '광고주 영상 승인 즉시 지급')}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[13px]">
            <span className="font-semibold uppercase tracking-wider text-[12px]">{t.totalEarned}</span>
            <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums">
            16.800.000 ₫
          </div>
          <span className="text-[13px] text-[#717171]">
            {l('Qua 24 chiến dịch hoàn thành xuất sắc', 'Across 24 completed collaborations', '24건의 완료된 협업 기준')}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[13px]">
            <span className="font-semibold uppercase tracking-wider text-[12px]">{l('Phí Bảo Vệ Ký Quỹ Escrow', 'Platform Escrow Fee', '에스크로 결제 보호 수수료')}</span>
            <ShieldCheck className="w-4 h-4 text-[#222222]" />
          </div>
          <div className="text-[26px] sm:text-[32px] font-semibold text-[#222222] tabular-nums">
            10% <span className="text-[14px] font-normal text-[#717171]">{l('cố định', 'standard', '고정')}</span>
          </div>
          <span className="text-[13px] text-[#717171] font-medium">
            {l('Bao gồm trọng tài & bảo hiểm thanh toán', 'Includes fraud protection & mediation', '부정 거래 방지 및 분쟁 중재 포함')}
          </span>
        </div>
      </div>

      {/* Escrow Mechanism Explainer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBEBEB] space-y-4">
        <h3 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">
          {l('Cách Cơ Chế Ký Quỹ Escrow Bảo Vệ Thu Nhập Của Bạn', 'How CollabLocal Payment Protection Works', 'CollabLocal 에스크로가 크리에이터 수익을 보호하는 방식')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
            <span className="text-[11px] font-semibold text-[#2563EB] block mb-1 font-mono">
              {l('BƯỚC 01', 'STEP 01', '1단계')}
            </span>
            <h4 className="font-semibold text-[#222222] mb-1 text-[14px]">
              {l('Doanh Nghiệp Ký Quỹ', 'Business Deposits', '광고주 에스크로 예치')}
            </h4>
            <p className="text-[#717171] text-[13px] leading-relaxed">
              {l(
                'Khi thỏa thuận được chốt, quán thanh toán 100% ngân sách vào ký quỹ trước.',
                'When an offer is accepted, business pre-funds 100% of the campaign budget.',
                '단가가 확정되면 광고주가 예산의 100%를 플랫폼 에스크로에 선입금합니다.'
              )}
            </p>
          </div>

          <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
            <span className="text-[11px] font-semibold text-[#2563EB] block mb-1 font-mono">
              {l('BƯỚC 02', 'STEP 02', '2단계')}
            </span>
            <h4 className="font-semibold text-[#222222] mb-1 text-[14px]">
              {l('Nền Tảng Giữ Tiền', 'Platform Holds Escrow', '플랫폼 안전 보관')}
            </h4>
            <p className="text-[#717171] text-[13px] leading-relaxed">
              {l(
                'Khoản tiền bị phong tỏa độc lập. Quán không thể đơn phương rút lại hoặc bùng thù lao.',
                'Money is frozen in impartial escrow. Neither side can cancel unilaterally.',
                '예치된 대금은 안전하게 동결되며, 광고주가 일방적으로 취소하거나 회수할 수 없습니다.'
              )}
            </p>
          </div>

          <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
            <span className="text-[11px] font-semibold text-[#2563EB] block mb-1 font-mono">
              {l('BƯỚC 03', 'STEP 03', '3단계')}
            </span>
            <h4 className="font-semibold text-[#222222] mb-1 text-[14px]">
              {l('Ghi Hình & Nộp Nháp', 'Creator Delivers', '촬영 및 초안 제출')}
            </h4>
            <p className="text-[#717171] text-[13px] leading-relaxed">
              {l(
                'Creator an tâm ghé quay phim và gửi link video bản nháp để đối tác kiểm duyệt.',
                'Creator shoots video, submits draft link & caption for business review.',
                '크리에이터는 안심하고 매장을 방문해 촬영한 후 영상 초안을 업로드합니다.'
              )}
            </p>
          </div>

          <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB]">
            <span className="text-[11px] font-semibold text-[#2563EB] block mb-1 font-mono">
              {l('BƯỚC 04', 'STEP 04', '4단계')}
            </span>
            <h4 className="font-semibold text-[#222222] mb-1 text-[14px]">
              {l('Giải Ngân Tức Thì', 'Instant Payout', '승인 즉시 자동 정산')}
            </h4>
            <p className="text-[#717171] text-[13px] leading-relaxed">
              {l(
                'Quán ấn Duyệt, hệ thống tự động cộng 90% thực nhận vào ví của bạn ngay lập tức.',
                'Business clicks Approve. Net 90% is instantly credited to creator wallet.',
                '광고주가 승인 버튼을 누르면 정산금(90%)이 크리에이터 지갑으로 즉시 입금됩니다.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Collaborations Ledger Table */}
      <div className="bg-white rounded-3xl border border-[#EBEBEB] overflow-hidden">
        <div className="p-5 border-b border-[#EBEBEB]">
          <h3 className="text-[18px] font-semibold text-[#222222] font-display">
            {t.payoutHistory}
          </h3>
        </div>

        <div className="divide-y divide-[#EBEBEB] text-[14px]">
          {myMatches.map((collab) => {
            const biz = businesses.find(b => b.id === collab.businessId) || businesses[0];
            const gross = collab.agreedAmount || 650000;
            const fee = Math.round(gross * 0.1);
            const net = gross - fee;

            return (
              <div 
                key={collab.id}
                onClick={() => {
                  setActiveMatchId(collab.id);
                  setCurrentView('collab');
                }}
                className="p-4 hover:bg-[#F7F7F7] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F7F7F7] shrink-0 border border-[#EBEBEB]">
                    <img
                      src={biz.image}
                      alt={biz.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#222222] text-[15px]">{biz.name}</h4>
                    <span className="text-[13px] text-[#717171]">
                      {l('Thù lao:', 'Agreed:', '단가:')} {(gross/1000).toLocaleString()}K · {l('Phí nền tảng:', 'Fee:', '수수료:')} -{(fee/1000).toLocaleString()}K (10%)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[16px] font-semibold text-[#222222] block tabular-nums">
                      +{(net/1000).toLocaleString()}K VND
                    </span>
                    <span className="text-[12px] text-[#717171] capitalize">
                      {collab.payment?.status === 'released' 
                        ? l('Đã vào ví', 'Paid to Wallet', '지갑 입금 완료')
                        : l('Đang trong Escrow', 'Held in Escrow', '에스크로 보호 중')}
                    </span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                    collab.payment?.status === 'released'
                      ? 'bg-[#F7F7F7] text-[#222222] border border-[#DDDDDD]'
                      : 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20'
                  }`}>
                    {collab.payment?.status === 'released' 
                      ? l('Đã Giải Ngân', 'Released', '정산 완료')
                      : l('Đã Ký Quỹ', 'Escrow Locked', '에스크로 예치')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
