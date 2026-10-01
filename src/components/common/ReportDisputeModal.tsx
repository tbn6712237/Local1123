import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { X, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

export const ReportDisputeModal: React.FC = () => {
  const { showDisputeModal, setShowDisputeModal } = useApp();
  const { l } = useT();
  const [reason, setReason] = useState<string>('creator_noshow');
  const [details, setDetails] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!showDisputeModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowDisputeModal(false);
      setDetails('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] relative">
        <button
          onClick={() => setShowDisputeModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#EBF7EE] text-[#008A05] flex items-center justify-center mx-auto border border-[#008A05]/20">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-[22px] font-semibold text-[#222222] font-display">
              {l('Đã Gửi Báo Cáo Khiếu Nại', 'Dispute Report Submitted', '분쟁 신고가 접수되었습니다')}
            </h3>
            <p className="text-[14px] text-[#717171] max-w-sm mx-auto leading-relaxed">
              {l(
                'Đội ngũ kiểm duyệt của chúng tôi sẽ xử lý trong vòng 4 giờ. Khoản tiền vẫn được giữ an toàn trong Escrow.',
                'Our moderation team reviews protected escrow collaborations within 4 hours. All funds remain held safely in escrow.',
                '운영팀이 4시간 이내에 검토를 진행합니다. 모든 대금은 에스크로에 안전하게 보관됩니다.'
              )}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#2563EB] mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-[22px] font-semibold text-[#222222] font-display">
                {l('Báo Cáo Sự Cố / Khiếu Nại', 'Report Issue / Dispute', '문제 신고 및 분쟁 접수')}
              </h2>
            </div>
            <p className="text-[14px] text-[#717171] mb-5 leading-relaxed">
              {l(
                'CollabLocal cung cấp cơ chế trọng tài và bảo vệ ký quỹ Escrow cho các hợp tác xác thực. Chọn lý do bên dưới:',
                'CollabLocal provides mediation and escrow protection for verified collaborations. Select your reason below:',
                'CollabLocal은 검증된 협업에 대해 분쟁 조정 및 에스크로 보호를 제공합니다. 사유를 선택하세요:'
              )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1.5">
                  {l('Loại Sự Cố', 'Issue Type', '문제 유형')}
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                >
                  <option value="creator_noshow">
                    {l('Creator không đến quán đúng hẹn (No-show)', 'Creator did not arrive at scheduled booking time', '크리에이터 노쇼 (일정 미방문)')}
                  </option>
                  <option value="business_payment">
                    {l('Quán không cung cấp thù lao / quyền lợi như cam kết', 'Business did not provide agreed payment / perks', '광고주가 약속된 단가/혜택 미제공')}
                  </option>
                  <option value="content_not_delivered">
                    {l('Chậm trễ nộp video quá hạn cam kết', 'Content deliverable overdue past agreed deadline', '영상 초안 제출 마감 기한 지연')}
                  </option>
                  <option value="brief_changed">
                    {l('Yêu cầu chiến dịch bị thay đổi không báo trước', 'Campaign requirements changed without prior agreement', '사전 협의 없이 기획 브리프 변경')}
                  </option>
                  <option value="misleading">
                    {l('Số liệu hoặc thông tin portfolio không đúng thực tế', 'Misleading campaign or creator portfolio statistics', '포트폴리오 지표 또는 매장 정보 불일치')}
                  </option>
                  <option value="other">
                    {l('Vấn đề phát sinh khác', 'Other collaboration dispute', '기타 협업 관련 분쟁 사유')}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1.5">
                  {l('Mô Tả Chi Tiết & Bối Cảnh', 'Explanation & Context', '상세 내용 설명 및 정황')}
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={l(
                    'Mô tả sự việc đã xảy ra, nội dung trao đổi hoặc mốc thời gian bằng chứng...',
                    'Describe what occurred, any messages exchanged, or proof timestamps...',
                    '발생한 상황, 나눈 대화 내용 또는 증빙 시간을 입력하세요...'
                  )}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 text-[#222222] focus:outline-none focus:border-[#222222] placeholder:text-[#717171]"
                  required
                />
              </div>

              <div className="bg-[#F7F7F7] p-3.5 rounded-2xl border border-[#EBEBEB] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#008A05] shrink-0" />
                <span className="text-[13px] text-[#717171] leading-relaxed">
                  {l(
                    'Tiền được khóa an toàn trong Escrow cho đến khi hai bên hòa giải hoặc ban trọng tài giải quyết.',
                    'Funds are frozen in escrow until both parties confirm resolution or mediator issues payout.',
                    '양측이 합의하거나 운영팀 중재가 완료될 때까지 에스크로 대금은 안전하게 동결됩니다.'
                  )}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(false)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#DDDDDD] hover:border-[#222222] text-[14px] font-semibold text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer transition-colors"
                >
                  {l('Hủy', 'Cancel', '취소')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 rounded-xl btn-airbnb-primary text-white text-[14px] font-semibold shadow-xs cursor-pointer transition-all"
                >
                  {l('Gửi Khiếu Nại', 'Submit Dispute', '분쟁 접수하기')}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
