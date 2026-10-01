import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, ArrowRight, Sparkles } from 'lucide-react';

export const DemoWalkthroughModal: React.FC = () => {
  const { showDemoWalkthrough, setShowDemoWalkthrough, jumpToScenarioStep, lang } = useApp();

  if (!showDemoWalkthrough) return null;

  const getSteps = () => {
    if (lang === 'vi') {
      return [
        { step: 1, role: 'business', title: '1. Doanh Nghiệp Tạo Chiến Dịch', desc: 'Luna Coffee khởi tạo "Chiến Dịch Khai Trương Cafe" (Ngân sách: 500K - 1M VND).' },
        { step: 2, role: 'creator', title: '2. Creator Khám Phá Chiến Dịch', desc: '@linhfoodie duyệt bảng tin Discover và lọc theo chuyên mục Cafe / Ẩm thực.' },
        { step: 3, role: 'creator', title: '3. Định Vị Trên Bản Đồ Hà Nội', desc: 'Tìm thấy Luna Coffee trên bản đồ tương tác hiển thị ghim ngân sách (500K-1M).' },
        { step: 4, role: 'creator', title: '4. Xem Yêu Cầu & Quyền Lợi', desc: 'Xem chi tiết yêu cầu (1 video TikTok + 1 IG story) và không gian quán.' },
        { step: 5, role: 'creator', title: '5. Creator Quẹt Phải / Bày Tỏ Thích', desc: '@linhfoodie ứng tuyển bày tỏ mong muốn hợp tác với Luna Coffee.' },
        { step: 6, role: 'business', title: '6. Doanh Nghiệp Thích Lại Creator', desc: 'Luna Coffee kiểm tra tỉ lệ tương tác 4.8% và lịch sử đánh giá của @linhfoodie.' },
        { step: 7, role: 'both', title: '7. Khớp Nối "It\'s a Match!"', desc: 'Hai bên cùng thích nhau! Hệ thống kích hoạt Phòng Hợp Tác riêng biệt.' },
        { step: 8, role: 'both', title: '8. Vào Phòng Hợp Tác Chung', desc: 'Không gian làm việc chung với bản brief đã kiểm duyệt và khung chat trực tiếp.' },
        { step: 9, role: 'business', title: '9. Quán Đề Xuất Giá 600K VND', desc: 'Báo giá mở màn từ Luna Coffee kèm quyền lợi trải nghiệm pour-over miễn phí.' },
        { step: 10, role: 'creator', title: '10. Creator Đề Xuất Lại 700K VND', desc: '@linhfoodie gửi counteroffer theo bảng giá chuẩn sản xuất và màu film.' },
        { step: 11, role: 'business', title: '11. Quán Chốt Giá 650K + Đồ Uống', desc: 'Luna Coffee đồng thuận mức 650K tiền mặt + miễn phí toàn bộ menu cho 2 người.' },
        { step: 12, role: 'creator', title: '12. Chấp Nhận & Khóa Ký Quỹ Escrow', desc: '650K được ký quỹ an toàn trên hệ thống CollabLocal, trừ 10% phí nền tảng.' },
        { step: 13, role: 'creator', title: '13. Đặt Lịch Ghé Quán Trải Nghiệm', desc: 'Đặt lịch ghé quán ghi hình vào 15:00 ngày 12/10 (2 người).' },
        { step: 14, role: 'creator', title: '14. Creator Nộp Video Bản Nháp', desc: 'Tải lên video 4K TikTok và bản thảo caption để quán duyệt trước.' },
        { step: 15, role: 'business', title: '15. Doanh Nghiệp Duyệt Nội Dung', desc: 'Luna Coffee xác nhận bản nháp đạt chuẩn và cảm ơn creator hoàn thành đúng hạn.' },
        { step: 16, role: 'both', title: '16. Tự Động Giải Ngân Escrow', desc: '585K VND thực nhận được tự động cộng vào ví Creator an toàn.' },
        { step: 17, role: 'both', title: '17. Đánh Giá Hai Chiều Xác Thực', desc: 'Hai bên chấm điểm Giao tiếp, Chất lượng video và Tính chuyên nghiệp.' },
        { step: 18, role: 'business', title: '18. Đo Lường Chuyển Đổi & Mã Ưu Đãi', desc: 'Theo dõi 128K view, 8.4K tương tác và 186 lượt khách quét mã LINH10 tại quầy.' }
      ];
    }
    if (lang === 'ko') {
      return [
        { step: 1, role: 'business', title: '1. 비즈니스 캠페인 개설', desc: 'Luna Coffee가 "카페 론칭 캠페인" 개설 (예산: 50만~100만 동).' },
        { step: 2, role: 'creator', title: '2. 크리에이터 캠페인 탐색', desc: '@linhfoodie가 탐색 피드에서 카페/푸드 분야 캠페인 확인.' },
        { step: 3, role: 'creator', title: '3. 위치 기반 지도 탐색', desc: '하노이 지도에서 Luna Coffee 예산 핀(50만-100만) 확인.' },
        { step: 4, role: 'creator', title: '4. 캠페인 요구조건 확인', desc: '결과물(틱톡 영상 1편 + IG 스토리 1편) 및 매장 분위기 확인.' },
        { step: 5, role: 'creator', title: '5. 크리에이터 스와이프/지원', desc: '@linhfoodie가 Luna Coffee에 협업 희망 표현.' },
        { step: 6, role: 'business', title: '6. 비즈니스의 크리에이터 호감', desc: 'Luna Coffee가 @linhfoodie의 4.8% 참여율과 평점 확인 후 매칭.' },
        { step: 7, role: 'both', title: '7. "It\'s a Match!" 매칭 달성', desc: '양방향 상호 호감 확인으로 비공개 협업 룸 오픈.' },
        { step: 8, role: 'both', title: '8. 협업 룸 입장', desc: '브리프 확인, 단가 협상 및 1:1 채팅 워크스페이스 입장.' },
        { step: 9, role: 'business', title: '9. 비즈니스 60만 동 제안', desc: 'Luna Coffee의 60만 동 1차 제안 및 핸드드립 무료 제공 혜택.' },
        { step: 10, role: 'creator', title: '10. 크리에이터 70만 동 역제안', desc: '@linhfoodie가 기본 제작 단가 기준 70만 동 역제안.' },
        { step: 11, role: 'business', title: '11. 비즈니스 65만 동+혜택 최종 제안', desc: 'Luna Coffee가 65만 동 현금 + 2인 음료 무제한 혜택 제안.' },
        { step: 12, role: 'creator', title: '12. 크리에이터 수락 및 에스크로 체결', desc: '65만 동이 플랫폼 에스크로에 안전하게 잠금 예치됨.' },
        { step: 13, role: 'creator', title: '13. 매장 방문 촬영 예약', desc: '10월 12일 15:00 방문 촬영 예약 확정 (2인).' },
        { step: 14, role: 'creator', title: '14. 크리에이터 영상 초안 제출', desc: '4K 틱톡 영상 초안 및 캡션 문구 검토 요청.' },
        { step: 15, role: 'business', title: '15. 비즈니스 영상 승인', desc: 'Luna Coffee가 초안을 검토 후 승인 및 빠른 제작 감사 전달.' },
        { step: 16, role: 'both', title: '16. 에스크로 정산금 지급', desc: '크리에이터 지갑으로 정산금 585K VND 자동 입금.' },
        { step: 17, role: 'both', title: '17. 양방향 상호 검증 평가', desc: '소통, 퀄리티, 마감 준수 등 상호 평점 등록.' },
        { step: 18, role: 'business', title: '18. 캠페인 성과 및 쿠폰 추적', desc: '12.8만 조회수, 8,400개 인터랙션 및 186건 매장 쿠폰 매출 분석.' }
      ];
    }
    return [
      { step: 1, role: 'business', title: '1. Business Creates Campaign', desc: 'Luna Coffee launches "Cafe Launch Campaign" (Budget: 500K - 1M VND).' },
      { step: 2, role: 'creator', title: '2. Creator Discovers Campaign', desc: '@linhfoodie browses Discover feed and filters by Cafe / Food niche.' },
      { step: 3, role: 'creator', title: '3. Location-Based Map Discovery', desc: 'Finds Luna Coffee on the interactive Hanoi map displaying budget pin (500K-1M).' },
      { step: 4, role: 'creator', title: '4. Open Campaign & Requirements', desc: 'Inspects deliverables (1 TikTok video + 1 IG story) and cafe vibe.' },
      { step: 5, role: 'creator', title: '5. Creator Swipes Right / Interested', desc: '@linhfoodie expresses interest in collaborating with Luna Coffee.' },
      { step: 6, role: 'business', title: '6. Business Liked Creator', desc: 'Luna Coffee verified @linhfoodie\'s 4.8% engagement rate & past reviews.' },
      { step: 7, role: 'both', title: '7. "It\'s a Match!" Celebration', desc: 'Two-way matching confirmed. Unlocks private Collaboration Room.' },
      { step: 8, role: 'both', title: '8. Enter Collaboration Room', desc: 'Shared negotiation workspace with verified terms, brief, and chat.' },
      { step: 9, role: 'business', title: '9. Business Offers 600K VND', desc: 'Initial proposal from Luna Coffee with free pour-over perk.' },
      { step: 10, role: 'creator', title: '10. Creator Counters 700K VND', desc: '@linhfoodie counters with standard production rate and video grading.' },
      { step: 11, role: 'business', title: '11. Business Counters 650K + Perks', desc: 'Luna Coffee proposes 650K cash + unlimited specialty drinks for 2.' },
      { step: 12, role: 'creator', title: '12. Creator Accepts & Escrow Locked', desc: '650K locked safely in platform escrow with 10% platform fee.' },
      { step: 13, role: 'creator', title: '13. Creator Books On-Site Visit', desc: 'Schedules filming visit for 12 October, 15:00 (2 guests).' },
      { step: 14, role: 'creator', title: '14. Creator Submits Video Draft', desc: 'Uploads 4K TikTok draft & caption copy for business review.' },
      { step: 15, role: 'business', title: '15. Business Approves Content', desc: 'Luna Coffee approves draft and thanks creator for fast turnaround.' },
      { step: 16, role: 'both', title: '16. Escrow Payment Released', desc: 'Net 585K VND automatically credited to creator wallet safely.' },
      { step: 17, role: 'both', title: '17. Two-Way Verified Reviews', desc: 'Both parties score Communication, Quality, and Professionalism.' },
      { step: 18, role: 'business', title: '18. Campaign Analytics & Promo Tracking', desc: 'Tracks 128K views, 8.4K engagement, and 186 promo code conversions.' }
    ];
  };

  const steps = getSteps();

  const getRoleBadge = (role: string) => {
    if (lang === 'vi') {
      return role === 'business' ? 'Doanh Nghiệp' : role === 'creator' ? 'Creator' : 'Hai Bên';
    }
    if (lang === 'ko') {
      return role === 'business' ? '비즈니스' : role === 'creator' ? '크리에이터' : '공통';
    }
    return role === 'business' ? 'Business' : role === 'creator' ? 'Creator' : 'Both';
  };

  const headerTitle = lang === 'vi' ? '18 Bước Demo Thuyết Trình' : lang === 'ko' ? '18단계 데모 시연 가이드' : 'Prototype Scenario Guide (18 Steps)';
  const headerSubtitle = lang === 'vi' 
    ? 'Nhấn vào bất kỳ bước nào để nhảy trực tiếp tới giai đoạn tương ứng trong vòng đời hợp tác.' 
    : lang === 'ko'
    ? '원하는 단계를 클릭하면 해당 협업 라이프사이클 화면으로 즉시 이동합니다.'
    : 'Click any step to jump straight into that stage of the collaboration lifecycle.';
  const closeBtnText = lang === 'vi' ? 'Đóng Hướng Dẫn' : lang === 'ko' ? '가이드 닫기' : 'Close Guide';
  const jumpText = lang === 'vi' ? 'Chuyển' : lang === 'ko' ? '이동' : 'Jump';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#EBEBEB] flex items-center justify-between shrink-0 bg-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">{headerTitle}</h2>
              <p className="text-[14px] text-[#717171]">{headerSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setShowDemoWalkthrough(false)}
            className="p-1.5 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
          {steps.map((item) => (
            <div
              key={item.step}
              onClick={() => {
                jumpToScenarioStep(item.step);
                setShowDemoWalkthrough(false);
              }}
              className="p-4 rounded-2xl border border-[#EBEBEB] hover:border-[#222222] hover:bg-[#F7F7F7] transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#F7F7F7] group-hover:bg-[#2563EB] group-hover:text-white text-[#222222] text-[12px] font-semibold flex items-center justify-center shrink-0 transition-colors mt-0.5 border border-[#DDDDDD] group-hover:border-transparent">
                  {item.step}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-semibold text-[#222222] group-hover:text-[#2563EB] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white text-[#717171] font-semibold border border-[#EBEBEB]">
                      {getRoleBadge(item.role)}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#717171] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[13px] text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity font-semibold pl-2">
                <span>{jumpText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#F7F7F7] border-t border-[#EBEBEB] rounded-b-3xl flex items-center justify-between text-[13px] text-[#717171]">
          <span>CollabLocal Prototype Demo · Two-Sided Marketplace</span>
          <button
            onClick={() => setShowDemoWalkthrough(false)}
            className="px-5 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl cursor-pointer shadow-xs transition-all"
          >
            {closeBtnText}
          </button>
        </div>
      </div>
    </div>
  );
};
