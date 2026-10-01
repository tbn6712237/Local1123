import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Building2, 
  Camera, 
  Clock, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Circle, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  AlertTriangle, 
  Check, 
  FileText, 
  Upload, 
  Star, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { CollaborationMatch, Business, Creator, Campaign } from '../../types';
import { GoogleDriveIntegration } from '../common/GoogleDrivePicker';

export const CollaborationRoom: React.FC = () => {
  const { 
    matches, 
    activeMatchId, 
    businesses, 
    creators, 
    campaigns, 
    role, 
    sendOffer, 
    acceptOffer, 
    declineOffer, 
    bookVisit, 
    submitContent, 
    approveContent, 
    requestRevision, 
    releasePayment, 
    submitReview, 
    sendChatMessage,
    setShowDisputeModal
  } = useApp();

  const { t, lang, l, loc } = useT();

  const match = matches.find(m => m.id === activeMatchId) || matches[0];

  // Forms local state
  const [counterAmount, setCounterAmount] = useState<number>(650000);
  const [counterPerks, setCounterPerks] = useState<string>(
    l('Miễn phí thức uống & bánh ngọt cho 2 người', 'Free drinks & pastries for 2', '2인 음료 및 디저트 무료 제공')
  );
  const [counterNote, setCounterNote] = useState<string>('');
  const [showCounterForm, setShowCounterForm] = useState<boolean>(false);

  // Booking state
  const [bookingDate, setBookingDate] = useState<string>('2026-10-12');
  const [bookingTime, setBookingTime] = useState<string>('15:00');
  const [bookingGuests, setBookingGuests] = useState<number>(2);
  const [bookingNotes, setBookingNotes] = useState<string>(
    l('Bàn cạnh cửa sổ ánh sáng tự nhiên để ghi hình đẹp nhất', 'Table by the natural light window for aesthetic video capture', '영상 촬영을 위해 자연광이 잘 드는 창가 좌석 요청')
  );

  // Submission state
  const [videoUrl, setVideoUrl] = useState<string>('https://tiktok.com/@linhfoodie/video/72891928312019');
  const [captionDraft, setCaptionDraft] = useState<string>(
    l(
      'Một buổi chiều thưởng thức cà phê pour-over thủ công tại @lunacoffee Tràng Tiền! Đừng quên thử Matcha Cloud và bánh nướng nhé. Dùng mã LINH10 để giảm 10% ✨',
      'Had the dreamiest afternoon coffee tasting at @lunacoffee Trang Tien! Check out their signature Matcha Cloud & pour-over. Use my code LINH10 for 10% off ✨',
      '@lunacoffee 짱띠엔에서 핸드드립 커피와 디저트를 즐겨보세요! 시그니처 말차 클라우드도 추천합니다. 프로모션 코드 LINH10으로 10% 할인 받으세요 ✨'
    )
  );
  const [revisionFeedback, setRevisionFeedback] = useState<string>('');
  const [showRevisionForm, setShowRevisionForm] = useState<boolean>(false);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [crit1, setCrit1] = useState<number>(5);
  const [crit2, setCrit2] = useState<number>(5);
  const [crit3, setCrit3] = useState<number>(5);
  const [crit4, setCrit4] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>(
    role === 'business'
      ? l('Creator làm việc cực kỳ chuyên nghiệp, nộp video trước hạn. Quán nhận được hơn 180 lượt khách ghé dùng mã ưu đãi!', 'Exceptional creator! Arrived on time, delivered an aesthetic video that brought in 180+ customers!', '크리에이터가 매우 프로페셔널하게 일정보다 일찍 영상을 제출했습니다. 180명 이상의 손님이 프로모션 코드로 방문했습니다!')
      : l('Luna Coffee hỗ trợ rất nhiệt tình, brief rõ ràng, đồ uống ngon và giải ngân ký quỹ Escrow cực kỳ nhanh chóng!', 'Luna Coffee was a dream to work with. Crystal clear creative brief, warm baristas, and instant escrow payment release!', 'Luna Coffee는 매우 친절하게 지원해주었고, 브리프가 명확하며 에스크로 정산도 신속하게 처리되었습니다!')
  );

  // Chat input
  const [chatInput, setChatInput] = useState<string>('');

  if (!match) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-[#8C8C88]">
        <p>{l('Chưa chọn cuộc hợp tác nào. Hãy duyệt mục Tìm Kiếm hoặc Quẹt Thẻ để khớp nối!', 'No active collaboration selected. Browse Discover or Swipe Deck to find a match!', '선택된 협업이 없습니다. 탐색 또는 스와이프 모드에서 매칭을 진행해보세요!')}</p>
      </div>
    );
  }

  const business = businesses.find(b => b.id === match.businessId) || businesses[0];
  const creator = creators.find(c => c.id === match.creatorId) || creators[0];
  const campaign = campaigns.find(c => c.id === match.campaignId) || campaigns[0];

  const isBusiness = role === 'business';
  const hasAgreed = match.status !== 'matched' && match.status !== 'negotiating';

  // Multilingual checklist items completion
  const checklist = [
    { id: 'match', label: l('Đã khớp nối hai chiều', 'Match confirmed', '양방향 매칭 완료'), completed: true },
    { id: 'offer', label: l('Thống nhất thù lao & quyền lợi', 'Rate & deliverables agreed', '원고료 및 혜택 조율 완료'), completed: hasAgreed },
    { id: 'escrow', label: l('Tiền được khóa an toàn trong Escrow', 'Payment secured in escrow', '에스크로 안심 결제 예치 완료'), completed: hasAgreed },
    { id: 'booking', label: l('Đã đặt lịch ghé quán ghi hình', 'On-site filming visit booked', '매장 방문 촬영 일정 예약 완료'), completed: !!match.booking },
    { id: 'submission', label: l('Đã nộp video bản nháp', 'Content submitted for review', '영상 초안 제출 완료'), completed: !!match.submission },
    { id: 'approval', label: l('Doanh nghiệp phê duyệt nội dung', 'Content approved by business', '광고주 영상 최종 검토 승인'), completed: match.status === 'content_approved' || match.status === 'payment_released' || match.status === 'completed' },
    { id: 'payment', label: l('Giải ngân ký quỹ vào ví Creator', 'Escrow payment released', '크리에이터 지갑으로 에스크로 정산 완료'), completed: match.payment?.status === 'released' },
    { id: 'review', label: l('Gửi đánh giá xác thực hai chiều', 'Two-way verified review submitted', '양방향 인증 후기 작성 완료'), completed: isBusiness ? !!match.businessReviewed : !!match.creatorReviewed }
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(match.id, chatInput);
    setChatInput('');
  };

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    sendOffer(match.id, counterAmount, counterPerks, counterNote);
    setShowCounterForm(false);
    setCounterNote('');
  };

  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookVisit(match.id, bookingDate, bookingTime, bookingGuests, bookingNotes);
  };

  const handleSubmitContentForm = (e: React.FormEvent) => {
    e.preventDefault();
    submitContent(match.id, videoUrl, l('1 Video TikTok (4K) + 1 Story Instagram', '1 TikTok Video (4K) + 1 IG Story', 'TikTok 영상 1건 (4K) + Instagram 스토리 1건'), captionDraft);
  };

  const handleSendReview = (e: React.FormEvent) => {
    e.preventDefault();
    const criteria = isBusiness ? [
      { label: l('Giao tiếp & phản hồi', 'Communication', '소통 및 응답 속도'), score: crit1 },
      { label: l('Chất lượng video', 'Content Quality', '영상 퀄리티 및 미감'), score: crit2 },
      { label: l('Tính chuyên nghiệp', 'Professionalism', '전문성 및 태도'), score: crit3 },
      { label: l('Đúng hạn bàn giao', 'Deadline Punctuality', '마감 일정 준수'), score: crit4 }
    ] : [
      { label: l('Giao tiếp & phản hồi', 'Communication', '소통 및 응답 속도'), score: crit1 },
      { label: l('Độ tin cậy thanh toán', 'Payment Reliability', '정산 신뢰도'), score: crit2 },
      { label: l('Yêu cầu rõ ràng', 'Brief Clarity', '브리프 명확성'), score: crit3 },
      { label: l('Tính chuyên nghiệp', 'Professionalism', '전문성 및 매장 지원'), score: crit4 }
    ];

    submitReview(match.id, reviewRating, criteria, reviewComment);
    setShowReviewModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      {/* Collaboration Room Top Hero Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center -space-x-3 shrink-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-[#F7F7F7]">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[#F7F7F7]">
                <img
                  src={creator.avatar}
                  alt={creator.username}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#2563EB]/20">
                  {t.collabRoomTitle}
                </span>
                <span className="text-[13px] text-[#717171] font-mono">#{match.id.substring(0, 10)}</span>
                {match.promoCode && (
                  <span className="text-[12px] font-mono font-semibold bg-[#EBF7EE] text-[#008A05] px-2.5 py-0.5 rounded-full border border-[#008A05]/20">
                    Voucher: {match.promoCode} ({match.promoCodeUses || 0} {l('lượt dùng', 'uses', '회 사용')})
                  </span>
                )}
              </div>
              <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
                {business.name} × {creator.username}
              </h1>
              <p className="text-[14px] text-[#717171] mt-0.5">
                {l('Chiến dịch:', 'Campaign:', '캠페인:')} <strong className="text-[#222222]">{loc(campaign.title)}</strong> · {loc(campaign.deliverables)} · {l('Hạn chót', 'Due', '마감일')} {loc(campaign.deadline)}
              </p>
            </div>
          </div>

          {/* Dispute & Escrow Status */}
          <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
            <div className="bg-[#F7F7F7] px-4 py-2.5 rounded-2xl border border-[#EBEBEB] text-left">
              <span className="text-[11px] text-[#717171] uppercase tracking-wider block font-semibold">
                {l('Bảo Vệ Escrow', 'Escrow Protection', '에스크로 보호')}
              </span>
              <span className="text-[14px] font-semibold text-[#008A05] flex items-center gap-1 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#008A05]" />
                {match.payment?.status === 'released' 
                  ? t.fundsReleased 
                  : hasAgreed 
                  ? `${((match.agreedAmount || 650000)/1000).toLocaleString()}K VND ${t.escrowHeld}` 
                  : t.awaitingAgreement}
              </span>
            </div>

            <button
              onClick={() => setShowDisputeModal(true)}
              className="text-[13px] text-[#717171] hover:text-[#2563EB] p-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors flex items-center gap-1.5 border border-transparent hover:border-[#2563EB]/20 cursor-pointer"
              title={l('Báo cáo tranh chấp / hỗ trợ', 'Report an issue or dispute', '분쟁 중재 및 지원 요청')}
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.reportHelp}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Modules, Right Chat & Agreement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Negotiation / Booking / Content / Reviews */}
        <div className="lg:col-span-7 space-y-6">

          {/* Module 1: Offer & Rate Negotiation */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display">{t.secNegotiation}</h3>
                <p className="text-[14px] text-[#717171]">
                  {l('Đề xuất và thương lượng thù lao tiền mặt cùng các quyền lợi trải nghiệm.', 'Propose and accept collaboration fee and perks.', '원고료 및 매장 체험 혜택을 제안하고 협의합니다.')}
                </p>
              </div>
              {hasAgreed ? (
                <span className="text-[13px] font-semibold bg-[#EBF7EE] text-[#008A05] px-3.5 py-1 rounded-full border border-[#008A05]/20 flex items-center gap-1.5 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  {l('Đã Chốt:', 'Agreed:', '합의 완료:')} {((match.agreedAmount || 650000)/1000).toLocaleString()}K VND
                </span>
              ) : (
                <span className="text-[13px] font-semibold bg-[#EFF6FF] text-[#2563EB] px-3 py-1 rounded-full border border-[#2563EB]/20">
                  {l('Đang Đàm Phán', 'Negotiating', '협의 중')}
                </span>
              )}
            </div>

            {/* Offer History */}
            <div className="space-y-3 mb-5">
              {match.offers.map((off) => (
                <div 
                  key={off.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    off.status === 'accepted'
                      ? 'bg-[#EBF7EE] border-[#008A05]/30'
                      : off.status === 'pending'
                      ? 'bg-[#EFF6FF] border-[#2563EB]/25'
                      : 'bg-[#F7F7F7] border-[#EBEBEB]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[14px] mb-1">
                    <span className="font-semibold text-[#222222] flex items-center gap-1.5">
                      {off.sender === 'business' ? <Building2 className="w-4 h-4 text-[#222222]" /> : <Camera className="w-4 h-4 text-[#2563EB]" />}
                      {off.senderName}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[16px] text-[#222222]">
                        {(off.amount / 1000).toLocaleString()}K VND
                      </span>
                      <span className="text-[12px] text-[#717171]">({loc(off.timestamp)})</span>
                    </div>
                  </div>

                  {off.perks && (
                    <p className="text-[14px] text-[#222222] font-semibold bg-white/80 px-3 py-1 rounded-xl mb-1.5 border border-[#EBEBEB]">
                      + {l('Quyền lợi tặng thêm:', 'Perk:', '추가 제공 혜택:')} {loc(off.perks)}
                    </p>
                  )}

                  <p className="text-[14px] text-[#717171] leading-relaxed">
                    "{loc(off.note)}"
                  </p>

                  {/* Actions for pending offer */}
                  {off.status === 'pending' && !hasAgreed && (
                    <div className="mt-3 pt-2.5 border-t border-[#EBEBEB] flex items-center justify-end gap-2">
                      <button
                        onClick={() => acceptOffer(match.id, off.id)}
                        className="px-4 py-2 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.acceptOffer}</span>
                      </button>

                      <button
                        onClick={() => setShowCounterForm(true)}
                        className="px-3.5 py-2 border border-[#222222] hover:bg-[#F7F7F7] text-[14px] font-semibold text-[#222222] rounded-xl transition-colors cursor-pointer"
                      >
                        {t.counterOffer}
                      </button>

                      <button
                        onClick={() => declineOffer(match.id, off.id)}
                        className="px-2.5 py-2 text-[14px] font-medium text-[#717171] hover:text-[#2563EB] transition-colors cursor-pointer"
                      >
                        {t.decline}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Counteroffer Form Drawer */}
            {showCounterForm && !hasAgreed && (
              <form onSubmit={handleSendCounter} className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] font-semibold text-[#222222]">{l('Gửi Đề Xuất Báo Giá Mới', 'Send New Counteroffer', '새로운 견적 제안 보내기')}</h4>
                  <button 
                    type="button" 
                    onClick={() => setShowCounterForm(false)}
                    className="text-[13px] text-[#717171] hover:text-[#222222] cursor-pointer"
                  >
                    {t.cancel}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                      {l('Thù Lao Đề Xuất (VND)', 'Proposed Amount (VND)', '제안 원고료 (VND)')}
                    </label>
                    <input
                      type="number"
                      step={50000}
                      min={100000}
                      max={5000000}
                      value={counterAmount}
                      onChange={(e) => setCounterAmount(Number(e.target.value))}
                      className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                      {l('Quyền Lợi Kèm Theo', 'Additional Perks', '추가 제공 혜택')}
                    </label>
                    <input
                      type="text"
                      placeholder={l('Ví dụ: Tặng kèm set đồ uống & bánh cho 2 người', 'e.g. Free coffee flight & meal for 2', '예: 2인 음료 및 디저트 무료 제공')}
                      value={counterPerks}
                      onChange={(e) => setCounterPerks(e.target.value)}
                      className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {l('Tin Nhắn / Lý Do Điều Chỉnh', 'Message / Reasoning', '조율 사유 및 메시지')}
                  </label>
                  <input
                    type="text"
                    placeholder={l('Giải thích lý do điều chỉnh thù lao hoặc bổ sung quyền lợi...', 'Explain deliverable scope or adjustments...', '원고료 조율 사유 또는 추가 혜택 내용을 입력하세요...')}
                    value={counterNote}
                    onChange={(e) => setCounterNote(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl cursor-pointer shadow-xs transition-all"
                  >
                    {l('Gửi Đề Xuất Ngay', 'Send Counteroffer', '제안서 전송')}
                  </button>
                </div>
              </form>
            )}

            {!hasAgreed && !showCounterForm && (
              <div className="flex items-center justify-between text-[14px] pt-1">
                <span className="text-[#717171]">
                  {l('Cả hai bên có thể thương lượng tự do cho đến khi đạt được thỏa thuận chung.', 'Both parties can counter freely until agreed.', '양측 모두 합의에 도달할 때까지 자유롭게 조율할 수 있습니다.')}
                </span>
                <button
                  onClick={() => setShowCounterForm(true)}
                  className="text-[14px] font-semibold text-[#2563EB] hover:underline cursor-pointer"
                >
                  + {t.counterOffer}
                </button>
              </div>
            )}
          </div>

          {/* Module 2: Visit Booking */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display">{t.secBooking}</h3>
                <p className="text-[14px] text-[#717171]">
                  {l('Đặt lịch creator ghé quán, số người đi cùng và chuẩn bị bàn ghi hình.', 'Schedule creator arrival time, guest count, and shooting table.', '방문 일시, 동행 인원 및 촬영용 좌석을 예약합니다.')}
                </p>
              </div>
              {match.booking ? (
                <span className="text-[13px] font-semibold bg-[#EBF7EE] text-[#008A05] px-3.5 py-1 rounded-full border border-[#008A05]/20 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {l('Đã Chốt Lịch', 'Visit Confirmed', '방문 확정')}
                </span>
              ) : (
                <span className="text-[13px] font-semibold text-[#717171] bg-[#F7F7F7] px-3.5 py-1 rounded-full border border-[#DDDDDD]">
                  {l('Chưa Đặt Lịch', 'Pending Booking', '예약 대기')}
                </span>
              )}
            </div>

            {match.booking ? (
              <div className="bg-[#F7F7F7] p-4 rounded-2xl border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1 text-[14px]">
                  <div className="flex items-center gap-2 font-semibold text-[#222222]">
                    <Calendar className="w-4 h-4 text-[#2563EB]" />
                    <span>{match.booking.date} {l('lúc', 'at', '시간:')} {match.booking.time}</span>
                  </div>
                  <p className="text-[#717171]">
                    {l(
                      `Đoàn đi ${match.booking.guests} người · Địa điểm: ${business.location}`,
                      `Party of ${match.booking.guests} · Location: ${business.location}`,
                      `방문 인원: ${match.booking.guests}명 · 장소: ${business.location}`
                    )}
                  </p>
                  {match.booking.notes && (
                    <p className="text-[#717171] italic">{l('Ghi chú:', 'Note:', '메모:')} "{loc(match.booking.notes)}"</p>
                  )}
                </div>

                <div className="text-[13px] text-[#008A05] font-semibold bg-[#EBF7EE] px-3.5 py-1.5 rounded-full border border-[#008A05]/20">
                  ✓ {l('Đã giữ bàn & thông báo nhân viên', 'Table Reserved & Staff Notified', '좌석 예약 및 매장 안내 완료')}
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookVisitSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                      {l('Ngày Ghé Quán', 'Visit Date', '방문 날짜')}
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                      {l('Giờ Hẹn', 'Time', '방문 시간')}
                    </label>
                    <input
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                      {l('Số Người Đi Cùng', 'Guest Count', '동행 인원 수')}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={bookingGuests}
                      onChange={(e) => setBookingGuests(Number(e.target.value))}
                      className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {l('Yêu Cầu Đặc Biệt (Góc quay, ánh sáng, món dùng thử)', 'Special Requests', '특별 요청사항 (촬영 각도, 조명, 시식 메뉴 등)')}
                  </label>
                  <input
                    type="text"
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder={l('Ví dụ: Bàn góc yên tĩnh nhiều ánh sáng tự nhiên để quay video', 'e.g. Quiet corner table for video recording', '예: 자연광이 잘 드는 조용한 모서리 좌석')}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    {t.confirmBooking}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Module 3: Content Submission & Business Approval */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display">{t.secContent}</h3>
                <p className="text-[14px] text-[#717171]">
                  {l('Creator nộp link bản nháp & bài viết; Doanh nghiệp duyệt để mở khóa Escrow.', 'Creator submits video link & copy; Business approves to unlock escrow.', '초안 영상 링크 및 캡션을 제출하고 광고주 승인을 받으면 에스크로 정산이 진행됩니다.')}
                </p>
              </div>
              {match.submission?.status === 'approved' ? (
                <span className="text-[13px] font-semibold bg-[#EBF7EE] text-[#008A05] px-3.5 py-1 rounded-full border border-[#008A05]/20 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {l('Nội Dung Đã Duyệt', 'Content Approved', '콘텐츠 승인 완료')}
                </span>
              ) : match.submission?.status === 'pending_review' ? (
                <span className="text-[13px] font-semibold bg-[#EFF6FF] text-[#2563EB] px-3.5 py-1 rounded-full border border-[#2563EB]/20">
                  {l('Chờ Doanh Nghiệp Duyệt', 'Waiting Approval', '광고주 검토 대기')}
                </span>
              ) : (
                <span className="text-[13px] font-semibold text-[#717171] bg-[#F7F7F7] px-3.5 py-1 rounded-full border border-[#DDDDDD]">
                  {l('Chưa Nộp Video', 'Pending Submission', '영상 제출 대기')}
                </span>
              )}
            </div>

            {match.submission ? (
              <div className="space-y-4">
                <div className="bg-[#F7F7F7] p-4 rounded-2xl border border-[#EBEBEB] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-[#222222] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#2563EB]" />
                      {loc(match.submission.deliverableType)}
                    </span>
                    <span className="text-[12px] text-[#717171]">{loc(match.submission.submittedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[14px] text-[#717171]">{l('Link Video Bản Nháp:', 'Draft Video URL:', '영상 초안 링크:')}</span>
                    <a
                      href={match.submission.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#2563EB] hover:underline flex items-center gap-1 font-mono font-semibold truncate max-w-sm"
                    >
                      <span>{match.submission.videoUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#EBEBEB] text-[14px]">
                    <span className="text-[11px] uppercase font-semibold text-[#717171] block mb-1">
                      {l('Nội Dung Caption & Hashtag Đề Xuất:', 'Caption & Tags Draft:', '제안된 캡션 및 해시태그:')}
                    </span>
                    <p className="text-[#222222] leading-relaxed">{loc(match.submission.captionDraft)}</p>
                  </div>

                  {match.submission.revisionNote && (
                    <div className="bg-[#EFF6FF] p-3.5 rounded-xl border border-[#2563EB]/30 text-[14px] text-[#222222]">
                      <strong className="text-[#2563EB]">{l('Yêu cầu chỉnh sửa:', 'Requested adjustments:', '수정 요청사항:')}</strong> {loc(match.submission.revisionNote)}
                    </div>
                  )}
                </div>

                {/* Business actions when submitted */}
                {isBusiness && match.submission.status === 'pending_review' && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setShowRevisionForm(true)}
                      className="px-4 py-2.5 border border-[#222222] hover:bg-[#F7F7F7] text-[14px] font-semibold text-[#222222] rounded-xl transition-colors cursor-pointer"
                    >
                      {t.requestRevisionBtn}
                    </button>
                    <button
                      onClick={() => approveContent(match.id)}
                      className="px-5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t.approveContentBtn}</span>
                    </button>
                  </div>
                )}

                {/* Revision note form */}
                {showRevisionForm && (
                  <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] space-y-2.5">
                    <label className="block text-[14px] font-semibold text-[#222222]">
                      {l('Nêu rõ điểm cần điều chỉnh (ví dụ: quay rõ hơn ly Matcha Cloud và nhắc mã ưu đãi):', 'Specify what needs adjusting:', '수정이 필요한 부분을 구체적으로 작성하세요 (예: 시그니처 메뉴 클로즈업 추가):')}
                    </label>
                    <textarea
                      rows={2}
                      value={revisionFeedback}
                      onChange={(e) => setRevisionFeedback(e.target.value)}
                      placeholder={l('Vui lòng bổ sung dòng chữ địa chỉ quán trong 3 giây đầu video...', 'e.g. Please add the address text overlay during the intro hook.', '예: 인트로 3초 동안 매장 주소 자막을 추가해주세요...')}
                      className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowRevisionForm(false)}
                        className="px-3.5 py-2 text-[14px] text-[#717171] hover:text-[#222222] cursor-pointer"
                      >
                        {t.cancel}
                      </button>
                      <button
                        onClick={() => {
                          requestRevision(match.id, revisionFeedback);
                          setShowRevisionForm(false);
                          setRevisionFeedback('');
                        }}
                        className="px-4.5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl cursor-pointer"
                      >
                        {l('Gửi Yêu Cầu Chỉnh Sửa', 'Submit Revision', '수정 요청 전송')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmitContentForm} className="space-y-3">
                <p className="text-[14px] text-[#717171]">
                  {l('Creator tải lên video bản nháp (link TikTok/Google Drive) cùng nội dung caption và hashtag để quán kiểm duyệt trước khi đăng chính thức.', 'Creators upload video drafts along with suggested captions and promo codes for business verification.', '공식 업로드 전 매장 검토를 위해 영상 초안 링크(TikTok/Google Drive)와 캡션, 해시태그를 등록해주세요.')}
                </p>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <label className="block text-[14px] font-semibold text-[#222222]">
                      {l('Link Video / Tài Liệu Bản Nháp (TikTok / Google Drive)', 'Video / Doc Draft URL (TikTok / Google Drive)', '영상/초안 링크 (TikTok / Google Drive)')}
                    </label>
                    <GoogleDriveIntegration
                      compact
                      buttonText={l('Chọn từ Google Drive', 'Pick from Google Drive', 'Google Drive에서 선택')}
                      onFilesSelected={(docs) => {
                        if (docs.length > 0) {
                          setVideoUrl(docs[0].url || `https://drive.google.com/file/d/${docs[0].id}/view`);
                          if (!captionDraft) {
                            setCaptionDraft(`Google Drive File: ${docs[0].name}`);
                          }
                        }
                      }}
                    />
                  </div>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://drive.google.com/... or TikTok video link"
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {l('Nội Dung Caption & Hashtags', 'Caption & Hashtags Draft', '캡션 및 해시태그 내용')}
                  </label>
                  <textarea
                    rows={3}
                    value={captionDraft}
                    onChange={(e) => setCaptionDraft(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{t.submitContentBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Module 4: Payment Escrow Simulation */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-3 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display">{t.secPayment}</h3>
                <p className="text-[14px] text-[#717171]">
                  {l('Minh bạch 100% dòng tiền ký quỹ, không phí ẩn.', 'Transparent breakdown with zero hidden fees.', '숨겨진 수수료 없이 100% 투명한 에스크로 정산 내역.')}
                </p>
              </div>
              <span className={`text-[13px] font-semibold px-3 py-1 rounded-full border ${
                match.payment?.status === 'released' 
                  ? 'bg-[#EBF7EE] text-[#008A05] border-[#008A05]/20' 
                  : 'bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20'
              }`}>
                {match.payment?.status === 'released' ? t.fundsReleased : t.escrowHeld}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F7F7F7] rounded-2xl border border-[#EBEBEB] mb-3 text-center">
              <div>
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">
                  {l('Thù Lao Đã Chốt', 'Agreed Payment', '확정 원고료')}
                </span>
                <span className="text-[18px] font-semibold text-[#222222] font-mono">
                  {((match.agreedAmount || 650000) / 1000).toLocaleString()}K VND
                </span>
                <span className="text-[11px] text-[#717171] block">
                  {l('Doanh nghiệp ký quỹ', 'Deposited by Business', '광고주 에스크로 예치')}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">
                  {l('Phí Nền Tảng (10%)', 'Platform Fee (10%)', '플랫폼 수수료 (10%)')}
                </span>
                <span className="text-[18px] font-semibold text-[#717171] font-mono">
                  {((Math.round((match.agreedAmount || 650000) * 0.1)) / 1000).toLocaleString()}K VND
                </span>
                <span className="text-[11px] text-[#717171] block">
                  {l('Bảo vệ Escrow & Trọng tài', 'Escrow & Mediation', '에스크로 보호 및 분쟁 중재')}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#717171] uppercase block font-semibold">
                  {l('Creator Thực Nhận', 'Creator Net Payout', '크리에이터 실수령액')}
                </span>
                <span className="text-[18px] font-semibold text-[#008A05] font-mono">
                  {((Math.round((match.agreedAmount || 650000) * 0.9)) / 1000).toLocaleString()}K VND
                </span>
                <span className="text-[11px] text-[#008A05] block font-semibold">
                  {l('Đảm bảo 100%', 'Guaranteed Payout', '100% 안전 보장')}
                </span>
              </div>
            </div>

            <p className="text-[14px] text-[#717171] leading-relaxed">
              <strong className="text-[#222222]">{l('Tại sao ký quỹ Escrow quan trọng:', 'Why Escrow Matters:', '에스크로 안전 결제가 중요한 이유:')}</strong> {l(
                'Cả hai bên đều loại bỏ hoàn toàn rủi ro bị bùng tiền hay chậm trễ. Doanh nghiệp chỉ giải ngân khi video đạt yêu cầu; Creator an tâm tiền đã có sẵn trong hệ thống không thể bị đơn phương rút lại.',
                'Neither party takes financial risk. Businesses know funds won\'t be released until deliverables are verified. Creators know the funds are already funded and cannot be revoked arbitrarily.',
                '양측 모두 미지급 또는 약속 불이행의 위험이 없습니다. 광고주는 영상이 검토 및 승인된 후에만 정산하고, 크리에이터는 대금이 시스템에 안전하게 보관되어 일방적으로 취소되지 않음을 확신할 수 있습니다.'
              )}
            </p>
          </div>

          {/* Module 5: Two-Way Reviews & Reputation */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-3 border-b border-[#EBEBEB] pb-3">
              <div>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display">{t.secReviews}</h3>
                <p className="text-[14px] text-[#717171]">
                  {l('Chỉ những hợp tác đã hoàn tất mới được gửi đánh giá xác thực công khai.', 'Only completed collaborations can submit verified ratings.', '완료된 협업 건에 대해서만 검증된 공개 후기를 작성할 수 있습니다.')}
                </p>
              </div>
              <span className="text-[13px] font-semibold text-[#717171]">
                {match.businessReviewed && match.creatorReviewed 
                  ? l('Cả hai bên đã đánh giá', 'Both Completed', '양측 작성 완료') 
                  : l('Chờ đánh giá', 'Pending Reviews', '작성 대기 중')}
              </span>
            </div>

            {(isBusiness ? match.businessReviewed : match.creatorReviewed) ? (
              <div className="bg-[#EBF7EE] border border-[#008A05]/20 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#008A05]" />
                  <span className="text-[14px] font-semibold text-[#222222]">
                    {l('Bạn đã gửi đánh giá xác thực cho cuộc hợp tác này.', 'You have submitted your verified review for this collaboration.', '이번 협업에 대한 검증된 후기를 제출하셨습니다.')}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[14px] font-semibold text-[#222222]">
                  <Star className="w-4 h-4 fill-[#222222] text-[#222222]" />
                  <span>5.0</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-[#F7F7F7] border border-[#EBEBEB] p-4 rounded-2xl">
                <div>
                  <h4 className="text-[15px] font-semibold text-[#222222]">
                    {isBusiness ? l(`Đánh giá @${creator.username}`, `Review @${creator.username}`, `@${creator.username} 크리에이터 평가`) : l(`Đánh giá ${business.name}`, `Review ${business.name}`, `${business.name} 매장 평가`)}
                  </h4>
                  <p className="text-[13px] text-[#717171]">
                    {l('Chấm điểm tác phong, chất lượng video và độ tin cậy để cập nhật điểm uy tín.', 'Rate communication, deliverable quality, and professionalism to update public profile reputation.', '소통 태도, 영상 퀄리티, 신뢰도를 평가하여 프로필 평판에 반영합니다.')}
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="px-4 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs shrink-0 cursor-pointer transition-all"
                >
                  {t.leaveReviewBtn}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (5 cols): Live Chat & Progress Checklist */}
        <div className="lg:col-span-5 space-y-6">

          {/* Checklist Widget */}
          <div className="bg-white rounded-3xl p-5 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h3 className="text-[15px] font-semibold text-[#222222] mb-3 font-display">
              {l('Tiến Độ Vòng Đời Hợp Tác', 'Collaboration Lifecycle Checklist', '협업 라이프사이클 진행 현황')}
            </h3>
            <div className="space-y-2.5">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-2.5 text-[14px]">
                  {item.completed ? (
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#008A05] shrink-0" />
                  ) : (
                    <Circle className="w-4.5 h-4.5 text-[#DDDDDD] shrink-0" />
                  )}
                  <span className={item.completed ? 'text-[#222222] font-semibold' : 'text-[#717171]'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chat Panel */}
          <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col h-[520px]">
            <div className="p-4 border-b border-[#EBEBEB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-[#2563EB]" />
                <h3 className="text-[15px] font-semibold text-[#222222]">{t.directMessages}</h3>
              </div>
              <span className="text-[12px] text-[#717171]">{l('Bảo mật & Ký quỹ', 'Encrypted & Protected', '안전 암호화 및 에스크로 보호')}</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {match.chatMessages.map((msg) => {
                const isMe = msg.senderRole === role;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[11px] text-[#717171] mb-1">
                      {msg.senderRole === 'business' ? business.name : creator.username} · {loc(msg.timestamp)}
                    </span>
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-[14px] leading-relaxed ${
                        isMe
                          ? 'bg-[#222222] text-white rounded-tr-xs'
                          : 'bg-[#F7F7F7] text-[#222222] border border-[#EBEBEB] rounded-tl-xs'
                      }`}
                    >
                      {msg.text.includes('📁 [Google Drive]') ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 font-semibold">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" 
                              alt="Drive" 
                              className="w-4 h-4 shrink-0" 
                            />
                            <span>{msg.text.split(' - ')[0].replace('📁 [Google Drive] ', '')}</span>
                          </div>
                          {msg.text.includes('http') && (
                            <a 
                              href={msg.text.substring(msg.text.indexOf('http'))}
                              target="_blank"
                              rel="noreferrer"
                              className={`text-[12px] flex items-center gap-1 underline ${isMe ? 'text-[#EFF6FF] hover:text-white' : 'text-[#2563EB] hover:underline'}`}
                            >
                              <span>{l('Mở tệp trên Google Drive', 'Open in Google Drive', 'Google Drive에서 열기')}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      ) : (
                        loc(msg.text)
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Document Attachment Bar */}
            <div className="px-4 py-2.5 bg-[#F7F7F7] border-t border-[#EBEBEB] flex items-center justify-between text-[13px]">
              <span className="text-[12px] text-[#717171] font-medium">
                {l('Đính kèm tài liệu thảo luận:', 'Attach discussion docs:', '논의용 문서 첨부:')}
              </span>
              <GoogleDriveIntegration
                compact
                buttonText={l('Google Drive', 'Google Drive', 'Google Drive')}
                onFilesSelected={(docs) => {
                  docs.forEach(doc => {
                    sendChatMessage(match.id, `📁 [Google Drive] ${doc.name} - ${doc.url || ('https://drive.google.com/file/d/' + doc.id + '/view')}`);
                  });
                }}
              />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-[#EBEBEB] flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.typeMessage}
                className="flex-1 text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 text-[#222222] bg-white focus:outline-none focus:border-[#222222]"
              />
              <button
                type="submit"
                className="p-2.5 btn-airbnb-primary text-white rounded-xl shadow-xs cursor-pointer transition-all"
                title={t.sendMsg}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Campaign Brief Summary Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-2.5 text-[14px]">
            <h4 className="font-semibold text-[#222222] text-[15px]">{l('Tóm Tắt Yêu Cầu Chiến Dịch', 'Campaign Brief Summary', '캠페인 브리프 요약')}</h4>
            <p className="text-[#222222] leading-relaxed italic bg-[#F7F7F7] p-3.5 rounded-xl border border-[#EBEBEB]">
              "{loc(campaign.brief)}"
            </p>
            <div className="text-[13px] text-[#717171] space-y-1.5 pt-1">
              <div><strong className="text-[#222222] font-semibold">{l('Nội dung nộp:', 'Deliverables:', '제출 항목:')}</strong> {loc(campaign.deliverables)}</div>
              <div><strong className="text-[#222222] font-semibold">Hashtags:</strong> #LunaCoffee #HanoiCafe #MatchaCloud #CoffeeReview</div>
              <div><strong className="text-[#222222] font-semibold">{l('Mã ưu đãi:', 'Promo Code:', '할인 코드:')}</strong> {match.promoCode || 'LINH10'} ({l('giảm 10% cho khách ghé quán', '10% off for followers', '팔로워 방문 시 10% 할인')})</div>
            </div>
          </div>

        </div>

      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB]">
            <h3 className="text-[22px] font-semibold text-[#222222] mb-1 font-display">
              {isBusiness ? l(`Đánh giá @${creator.username}`, `Review @${creator.username}`, `@${creator.username} 평가`) : l(`Đánh giá ${business.name}`, `Review ${business.name}`, `${business.name} 평가`)}
            </h3>
            <p className="text-[14px] text-[#717171] mb-5">
              {l('Đánh giá của bạn được xác thực qua hợp đồng và giúp xây dựng uy tín hai chiều trên CollabLocal.', 'Your feedback is verified and helps build trust across the CollabLocal ecosystem.', '제출된 평가는 계약에 의해 검증되며 CollabLocal 생태계의 상호 신뢰를 구축합니다.')}
            </p>

            <form onSubmit={handleSendReview} className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1">{l('Điểm Đánh Giá Chung', 'Overall Rating', '종합 평점')}</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating ? 'fill-[#222222] text-[#222222]' : 'text-[#DDDDDD]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-[14px] font-semibold text-[#222222] ml-2">{reviewRating}.0 / 5</span>
                </div>
              </div>

              {/* Criteria sliders */}
              <div className="space-y-3 text-[14px]">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#222222]">{l('Giao tiếp & phản hồi:', 'Communication:', '소통 및 응답 속도:')}</span>
                    <span className="font-semibold font-mono text-[#222222]">{crit1} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crit1}
                    onChange={(e) => setCrit1(Number(e.target.value))}
                    className="w-full accent-[#222222]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#222222]">{isBusiness ? l('Chất lượng video:', 'Content Quality:', '영상 퀄리티:') : l('Độ tin cậy giải ngân:', 'Payment Reliability:', '정산 신뢰도:')}</span>
                    <span className="font-semibold font-mono text-[#222222]">{crit2} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crit2}
                    onChange={(e) => setCrit2(Number(e.target.value))}
                    className="w-full accent-[#222222]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#222222]">{l('Tính chuyên nghiệp:', 'Professionalism:', '전문성:')}</span>
                    <span className="font-semibold font-mono text-[#222222]">{crit3} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crit3}
                    onChange={(e) => setCrit3(Number(e.target.value))}
                    className="w-full accent-[#222222]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#222222]">{isBusiness ? l('Đúng hạn bàn giao:', 'Deadline Punctuality:', '마감 일정 준수:') : l('Yêu cầu rõ ràng & hỗ trợ:', 'Brief Clarity & Support:', '브리프 명확성 및 지원:')}</span>
                    <span className="font-semibold font-mono text-[#222222]">{crit4} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={crit4}
                    onChange={(e) => setCrit4(Number(e.target.value))}
                    className="w-full accent-[#222222]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                  {l('Nhận Xét Chi Tiết', 'Public Comment', '상세 후기 작성')}
                </label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 text-[#222222] bg-white focus:outline-none focus:border-[#222222]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 text-[14px] font-semibold text-[#717171] hover:text-[#222222] cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl cursor-pointer shadow-xs transition-all"
                >
                  {t.leaveReviewBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
