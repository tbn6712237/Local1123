import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { X, Plus, Check } from 'lucide-react';

export const CreateCampaignModal: React.FC = () => {
  const { showCreateCampaignModal, setShowCreateCampaignModal, createCampaign, activeBusiness } = useApp();
  const { l, t } = useT();

  const [title, setTitle] = useState<string>(
    l('Luna Coffee - Trải Nghiệm Matcha Cloud & Cold Brew', 'Luna Coffee Autumn Matcha & Cold Brew Feature', 'Luna Coffee 가을 신메뉴 말차 클라우드 & 콜드브루 체험단')
  );
  const [category, setCategory] = useState<string>('Cafe');
  const [location, setLocation] = useState<string>(activeBusiness.location || 'Hoàn Kiếm, Hà Nội');
  const [budgetMin, setBudgetMin] = useState<number>(500000);
  const [budgetMax, setBudgetMax] = useState<number>(1000000);
  const [paymentType, setPaymentType] = useState<'Cash' | 'Cash + Perks' | 'Product Exchange'>('Cash + Perks');
  const [creatorType, setCreatorType] = useState<string>(l('Reviewer Ẩm Thực & Đời Sống', 'Food & Lifestyle Reviewers', '푸드 & 라이프스타일 리뷰어'));
  const [followerRange, setFollowerRange] = useState<string>('5K - 50K');
  const [platform, setPlatform] = useState<'TikTok' | 'Instagram' | 'Multi-platform'>('TikTok');
  const [deliverables, setDeliverables] = useState<string>(
    l('1 Video TikTok (60s) + 1 Story Check-in', '1 TikTok video + 1 Instagram story', '틱톡 영상 1편 + 인스타그램 스토리 1편')
  );
  const [deadline, setDeadline] = useState<string>('2026-10-28');
  const [numberCreators, setNumberCreators] = useState<number>(5);
  const [brief, setBrief] = useState<string>(
    l(
      'Quay video review chân thực giới thiệu không gian tối giản phong cách Nhật Bản tại phố Tràng Tiền, ly Matcha Cloud latte và trải nghiệm pour-over.',
      'Create an authentic short-form review introducing Luna Coffee, highlighting our cozy Japanese-minimalist atmosphere, signature Matcha Cloud latte, and Trang Tien location.',
      '트랑티엔 거리에 위치한 일본 미니멀 감성 카페 공간과 시그니처 말차 클라우드 라떼 및 핸드드립 체험기를 진솔하게 담아주세요.'
    )
  );

  if (!showCreateCampaignModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const min = Math.min(Number(budgetMin) || 100000, Number(budgetMax) || 100000);
    const max = Math.max(Number(budgetMin) || 100000, Number(budgetMax) || 100000);
    const slots = Math.max(1, Number(numberCreators) || 1);
    createCampaign({
      title: title.trim(),
      category,
      location: location.trim(),
      budgetMin: min,
      budgetMax: max,
      paymentType,
      creatorType: creatorType.trim(),
      followerRange,
      platform,
      deliverables: deliverables.trim(),
      deadline,
      numberCreators: slots,
      brief: brief.trim()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] my-auto overflow-hidden relative max-h-[92vh] flex flex-col">
        <div className="p-5 sm:p-6 border-b border-[#EBEBEB] flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#222222] font-display">
                {l('Tạo Chiến Dịch Mới', 'Create New Campaign', '새 캠페인 등록')}
              </h2>
              <p className="text-[14px] text-[#717171]">
                {l(
                  'Khởi chạy cơ hội hợp tác và thu hút các creator uy tín trong khu vực.',
                  'Launch collaboration opportunity for nearby creators.',
                  '인근 지역의 검증된 크리에이터를 위한 맞춤 협업 캠페인을 개설하세요.'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateCampaignModal(false)}
            className="p-1.5 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <label className="block text-[14px] font-semibold text-[#222222] mb-1">
              {l('Tên Chiến Dịch', 'Campaign Name', '캠페인 명칭')}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={l('Ví dụ: Luna Coffee Khai Trương Mùa Thu', 'e.g. Luna Coffee Launch Campaign', '예: Luna Coffee 가을 론칭 캠페인')}
              className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Lĩnh Vực', 'Category', '업종 / 카테고리')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
              >
                <option value="Cafe">{l('Cafe & Bánh Ngọt', 'Cafe / Roastery', '카페 & 베이커리')}</option>
                <option value="Restaurant">{l('Nhà Hàng & Ẩm Thực', 'Restaurant / Bistro', '레스토랑 & 맛집')}</option>
                <option value="Workshop">{l('Workshop & Thủ Công', 'Workshop / Craft Studio', '공방 & 원데이 클래스')}</option>
                <option value="Fashion">{l('Thời Trang & Streetwear', 'Fashion & Apparel', '패션 & 스트리트웨어')}</option>
                <option value="Beauty">{l('Làm Đẹp & Spa', 'Beauty & Wellness', '뷰티 & 스파')}</option>
                <option value="Hotel">{l('Homestay & Khách Sạn', 'Hotel & Stay', '호텔 & 스테이')}</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Địa Điểm Tại Hà Nội', 'Location', '매장 위치')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Ngân Sách / 1 Video (VND)', 'Budget Range (VND)', '영상당 예산 범위 (VND)')}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step={50000}
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                  placeholder={l('Tối thiểu', 'Min', '최소')}
                  required
                />
                <span className="text-[14px] text-[#717171]">-</span>
                <input
                  type="number"
                  step={50000}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                  placeholder={l('Tối đa', 'Max', '최대')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Hình Thức Thù Lao', 'Payment Type', '지급 방식')}
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as any)}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
              >
                <option value="Cash + Perks">
                  {l('Tiền Mặt + Quyền Lợi (Menu miễn phí)', 'Cash + Perks (Free drinks/food)', '현금 + 매장 메뉴 무료 제공')}
                </option>
                <option value="Cash">
                  {l('Chỉ Tiền Mặt', 'Cash Only', '현금 지급')}
                </option>
                <option value="Product Exchange">
                  {l('Đổi Sản Phẩm / Dịch Vụ', 'Product / Service Exchange', '제품 / 서비스 교환')}
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Đối Tượng Creator', 'Creator Type', '희망 크리에이터 분야')}
              </label>
              <input
                type="text"
                value={creatorType}
                onChange={(e) => setCreatorType(e.target.value)}
                placeholder={l('Ví dụ: Food / Cafe', 'e.g. Food / Lifestyle', '예: 푸드 / 카페')}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Lượng Follower', 'Follower Range', '팔로워 규모')}
              </label>
              <input
                type="text"
                value={followerRange}
                onChange={(e) => setFollowerRange(e.target.value)}
                placeholder="5K - 50K"
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
              >
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="Multi-platform">{l('Đa Nền Tảng', 'Multi-platform', '멀티 플랫폼')}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Hạng Mục Bàn Giao', 'Deliverables', '제출 결과물')}
              </label>
              <input
                type="text"
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                placeholder={l('1 video TikTok + 1 story', '1 TikTok video + 1 story', '틱톡 영상 1편 + 스토리 1건')}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                {l('Số Lượng Creator Cần Tuyển', 'Number of Creators', '모집 인원수')}
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={numberCreators}
                onChange={(e) => setNumberCreators(Number(e.target.value))}
                className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#222222] mb-1">
              {l('Bản Brief & Hướng Dẫn Nội Dung', 'Campaign Brief & Instructions', '기획 브리프 및 가이드라인')}
            </label>
            <textarea
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 bg-white text-[#222222] focus:outline-none focus:border-[#222222] focus:ring-1 focus:ring-[#222222]"
              required
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#EBEBEB]">
            <button
              type="button"
              onClick={() => setShowCreateCampaignModal(false)}
              className="px-4 py-2.5 text-[14px] font-semibold text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] rounded-xl cursor-pointer transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{l('Đăng Tuyển Chiến Dịch', 'Publish Campaign', '캠페인 등록 완료')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
