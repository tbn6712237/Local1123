import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  X, 
  Sparkles, 
  Building2, 
  Camera, 
  Check, 
  User, 
  MapPin, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Business, Creator, Campaign } from '../../types';

export const NewbieSetupModal: React.FC = () => {
  const { 
    showNewbieModal, 
    setShowNewbieModal, 
    createNewbieProfile
  } = useApp();

  const { t, lang, l, loc } = useT();

  const [accountType, setAccountType] = useState<'business' | 'creator'>('business');

  // Business form fields
  const [bizName, setBizName] = useState<string>(
    l('Tiệm Bánh & Trà Thầy Giáo', 'Professor Bakery & Tea', '선생님 베이커리 & 티')
  );
  const [bizCategory, setBizCategory] = useState<string>('Cafe & Tiệm Bánh');
  const [bizLocation, setBizLocation] = useState<string>('Quận Cầu Giấy, Hà Nội');
  const [bizDesc, setBizDesc] = useState<string>(
    l(
      'Thương hiệu bánh ngọt thủ công Pháp và specialty coffee vừa khai trương. Cần tìm các bạn food reviewers trải nghiệm và quay video review không gian & menu bánh signature.',
      'Artisanal French bakery and specialty roastery newly opened. Looking for food reviewers to shoot video reviews of signature pastries.',
      '새로 오픈한 프랑스 수제 베이커리 & 스페셜티 로스터리입니다. 시그니처 디저트와 매장 공간을 리뷰해 주실 크리에이터를 찾습니다.'
    )
  );
  const [initialBudget, setInitialBudget] = useState<number>(800000);

  // Creator form fields
  const [creatorName, setCreatorName] = useState<string>(
    l('Thầy Giáo Review', 'Professor Reviewer', '선생님 리뷰어')
  );
  const [creatorUsername, setCreatorUsername] = useState<string>('@thaygiaoreview');
  const [creatorNiche, setCreatorNiche] = useState<string>('Ẩm Thực & Đời Sống');
  const [creatorFollowers, setCreatorFollowers] = useState<number>(22500);
  const [creatorRate, setCreatorRate] = useState<number>(750000);
  const [creatorBio, setCreatorBio] = useState<string>(
    l(
      'Kênh review chân thực các quán ăn ngon, cafe làm việc yên tĩnh và trải nghiệm dịch vụ chất lượng tại Hà Nội. Luôn cam kết bàn giao video đúng hẹn.',
      'Authentic food reviewer exploring cozy cafes, workspaces, and local experiences across Hanoi. Guaranteed on-time delivery.',
      '하노이 지역의 맛집, 조용한 작업 카페, 고품질 서비스를 솔직하게 리뷰합니다. 마감 기한을 철저히 준수합니다.'
    )
  );

  const [selectedAvatar, setSelectedAvatar] = useState<string>('/src/assets/images/creator_linh_foodie_1790496173627.jpg');

  if (!showNewbieModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (accountType === 'business') {
      const newBizId = `biz-newbie-${Date.now()}`;
      const newBiz: Business = {
        id: newBizId,
        name: bizName,
        category: bizCategory,
        location: bizLocation,
        distanceKm: 1.2,
        rating: 5.0,
        reviewsCount: 1,
        description: bizDesc,
        about: bizDesc,
        verified: true,
        responseRate: 100,
        completedCollabs: 0,
        image: '/src/assets/images/luna_coffee_interior_1790496155821.jpg',
        logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&h=200&fit=crop&q=80',
        photos: [
          '/src/assets/images/luna_coffee_interior_1790496155821.jpg',
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&fit=crop&q=80',
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&fit=crop&q=80'
        ],
        badges: [
          l('Doanh Nghiệp Mới', 'New Business', '신규 매장'),
          l('Đã Xác Thực', 'Verified', '인증 완료'),
          l('Cam Kết Escrow', 'Escrow Committed', '에스크로 준수')
        ],
        lat: 21.0360,
        lng: 105.7900,
        reviews: []
      };

      const newCampaign: Campaign = {
        id: `camp-newbie-${Date.now()}`,
        businessId: newBizId,
        title: `${bizName} - ${l('Chiến Dịch Khai Trương Trải Nghiệm', 'Grand Launch Experience', '오픈 기념 체험단 캠페인')}`,
        category: bizCategory,
        location: bizLocation,
        distanceKm: 1.2,
        budgetMin: Math.max(initialBudget - 200000, 300000),
        budgetMax: initialBudget + 300000,
        budgetDisplay: `${((Math.max(initialBudget - 200000, 300000))/1000).toFixed(0)}K - ${((initialBudget + 300000)/1000).toFixed(0)}K VND`,
        paymentType: 'Cash + Perks',
        creatorType: l('Ẩm Thực & Cafe', 'Food & Lifestyle', '푸드 & 라이프스타일'),
        followerRange: '5K - 50K',
        platform: 'TikTok',
        deliverables: l('1 Video TikTok Review + 1 Story Check-in', '1 TikTok Review Video + 1 Story Check-in', '틱톡 리뷰 영상 1편 + 스토리 체크인 1건'),
        deadline: l('30 Tháng 10, 2026', 'October 30, 2026', '2026년 10월 30일'),
        numberCreators: 3,
        brief: `${bizName} - ${l('Tạo video ngắn giới thiệu không gian ấm cúng và thử món bánh signature.', 'Create a short-form video featuring our cozy space and signature menu.', '아늑한 매장 분위기와 시그니처 디저트를 소개하는 숏폼 영상을 제작해주세요.')}`,
        status: 'active',
        isSponsored: false,
        createdAt: new Date().toISOString().split('T')[0],
        aiReason: l('Chiến dịch mới vừa ra mắt trong bán kính 2 km', 'New campaign launched within 2 km', '반경 2km 이내에 신규 등록된 캠페인')
      };

      createNewbieProfile('business', newBiz, newCampaign);
    } else {
      const newCreatorId = `creator-newbie-${Date.now()}`;
      const newCreator: Creator = {
        id: newCreatorId,
        username: creatorUsername.startsWith('@') ? creatorUsername : `@${creatorUsername}`,
        name: creatorName,
        avatar: selectedAvatar,
        niche: creatorNiche,
        location: l('Hà Nội (Gần bạn)', 'Hanoi (Near you)', '하노이 (가까운 거리)'),
        distanceKm: 1.5,
        followers: creatorFollowers,
        followersDisplay: `${(creatorFollowers / 1000).toFixed(1)}K`,
        averageViews: Math.round(creatorFollowers * 1.8),
        averageViewsDisplay: `${((creatorFollowers * 1.8) / 1000).toFixed(0)}K`,
        engagementRate: 5.4,
        platforms: ['TikTok', 'Instagram'],
        ratePerVideo: creatorRate,
        rateDisplay: `${(creatorRate / 1000).toFixed(0)}K VND / video`,
        rating: 5.0,
        completionRate: 100,
        responseRate: 100,
        previousCollabsCount: 3,
        bio: creatorBio,
        badges: [
          l('Creator Mới', 'New Creator', '신규 크리에이터'),
          l('Phản Hồi Nhanh 100%', '100% Fast Response', '100% 빠른 응답'),
          l('Xác Thực Danh Tính', 'Identity Verified', '신원 인증 완료')
        ],
        lat: 21.0310,
        lng: 105.8120,
        aiReason: l('Hồ sơ mới phù hợp ngân sách và định hướng nội dung của bạn', 'New creator profile matching your budget and niche', '예산 및 콘텐츠 방향성에 적합한 신규 크리에이터'),
        portfolio: [
          {
            id: `p-${Date.now()}-1`,
            title: l('Trải Nghiệm Khai Trương Tiệm Cà Phê Mới Tại Hà Nội', 'New Cafe Grand Opening Experience in Hanoi', '하노이 신규 카페 오픈 체험 영상'),
            views: '35.4K',
            engagement: '5.6%',
            platform: 'TikTok',
            caption: l('Góc làm việc và thưởng thức cà phê cực chill.', 'Cozy work & coffee spot with great aesthetic.', '여유롭게 작업하기 좋은 감성 카페 공간.')
          }
        ],
        reviews: [
          {
            id: `r-${Date.now()}-1`,
            authorName: 'Luna Coffee',
            authorRole: 'business',
            rating: 5,
            date: l('Hôm qua', 'Yesterday', '어제'),
            comment: l('Bạn làm việc rất chỉn chu, đúng giờ và nội dung rất tự nhiên!', 'Very professional, on-time delivery and natural aesthetic!', '매우 꼼꼼하고 일정에 맞춰 자연스러운 영상을 완성해주셨습니다!'),
            criteria: [
              { label: l('Giao tiếp', 'Communication', '소통'), score: 5 },
              { label: l('Chất lượng', 'Quality', '퀄리티'), score: 5 },
              { label: l('Chuyên nghiệp', 'Professionalism', '전문성'), score: 5 },
              { label: l('Thời hạn', 'Deadline', '일정'), score: 5 }
            ]
          }
        ]
      };

      createNewbieProfile('creator', newCreator);
    }

    setShowNewbieModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] my-auto max-h-[92vh] overflow-y-auto relative">
        <button
          onClick={() => setShowNewbieModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-[#FFF8F6] text-[#FF385C] flex items-center justify-center shrink-0 border border-[#FF385C]/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[#FF385C] uppercase tracking-wider">
                {l('Chế Độ Newbie / Khám Phá', 'Newbie Sandbox Mode', '뉴비 체험 / 샌드박스 모드')}
              </span>
              <span className="text-[12px] bg-[#EBF7EE] text-[#008A05] font-semibold px-2.5 py-0.5 rounded-full border border-[#008A05]/20">
                {l('Tự Tạo Hồ Sơ Trải Nghiệm', 'Create Custom Account', '맞춤 프로필 생성')}
              </span>
            </div>
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#222222] font-display">
              {t.newbieModalTitle}
            </h2>
            <p className="text-[14px] text-[#717171]">
              {t.newbieModalSub}
            </p>
          </div>
        </div>

        {/* Role Toggle Switcher */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1.5 bg-[#F7F7F7] rounded-full border border-[#DDDDDD]">
          <button
            type="button"
            onClick={() => setAccountType('business')}
            className={`py-2.5 px-4 rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              accountType === 'business'
                ? 'bg-[#222222] text-white shadow-xs'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{t.newbieBizTab}</span>
          </button>

          <button
            type="button"
            onClick={() => setAccountType('creator')}
            className={`py-2.5 px-4 rounded-full text-[14px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              accountType === 'creator'
                ? 'bg-[#222222] text-white shadow-xs'
                : 'text-[#717171] hover:text-[#222222]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{t.newbieCreatorTab}</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {accountType === 'business' ? (
            <>
              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                  {t.newbieBizName}
                </label>
                <input
                  type="text"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieCategory}
                  </label>
                  <select
                    value={bizCategory}
                    onChange={(e) => setBizCategory(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                  >
                    <option value="Cafe & Tiệm Bánh">{l('Cafe & Tiệm Bánh', 'Cafe & Bakery', '카페 & 베이커리')}</option>
                    <option value="Nhà Hàng Ẩm Thực">{l('Nhà Hàng Ẩm Thực', 'Restaurant & Dining', '레스토랑 & 맛집')}</option>
                    <option value="Workshop Thủ Công">{l('Workshop Nghệ Thuật / Gốm', 'Art & Pottery Workshop', '도예 & 원데이 클래스')}</option>
                    <option value="Thời Trang Thiết Kế">{l('Thời Trang Thiết Kế', 'Designer Fashion', '디자이너 패션')}</option>
                    <option value="Spa & Chăm Sóc Sắc Đẹp">{l('Spa & Chăm Sóc Sắc Đẹp', 'Spa & Beauty Care', '스파 & 뷰티 케어')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieLocation}
                  </label>
                  <input
                    type="text"
                    value={bizLocation}
                    onChange={(e) => setBizLocation(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                  {t.newbieBudget}
                </label>
                <input
                  type="number"
                  step={50000}
                  value={initialBudget}
                  onChange={(e) => setInitialBudget(Number(e.target.value))}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                  {t.newbieDesc}
                </label>
                <textarea
                  rows={3}
                  value={bizDesc}
                  onChange={(e) => setBizDesc(e.target.value)}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieCreatorName}
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieCreatorUsername}
                  </label>
                  <input
                    type="text"
                    value={creatorUsername}
                    onChange={(e) => setCreatorUsername(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieNiche}
                  </label>
                  <select
                    value={creatorNiche}
                    onChange={(e) => setCreatorNiche(e.target.value)}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3 py-2.5 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                  >
                    <option value="Ẩm Thực & Đời Sống">{l('Ẩm Thực & Cafe', 'Food & Cafe', '푸드 & 카페')}</option>
                    <option value="Du Lịch & Trải Nghiệm">{l('Du Lịch & Trải Nghiệm', 'Travel & Local Experience', '여행 & 로컬 체험')}</option>
                    <option value="Thời Trang & Lookbook">{l('Thời Trang & Lookbook', 'Fashion & Lookbook', '패션 & 룩북')}</option>
                    <option value="Lối Sống Tối Giản">{l('Lối Sống & Vlog', 'Lifestyle & Vlogs', '라이프스타일 & 브이로그')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieFollowers}
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={creatorFollowers}
                    onChange={(e) => setCreatorFollowers(Number(e.target.value))}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                    {t.newbieRate}
                  </label>
                  <input
                    type="number"
                    step={50000}
                    value={creatorRate}
                    onChange={(e) => setCreatorRate(Number(e.target.value))}
                    className="w-full text-[14px] rounded-xl border border-[#DDDDDD] px-3.5 py-2.5 bg-white text-[#222222] font-mono focus:outline-none focus:border-[#222222]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#222222] mb-1">
                  {t.newbieBio}
                </label>
                <textarea
                  rows={3}
                  value={creatorBio}
                  onChange={(e) => setCreatorBio(e.target.value)}
                  className="w-full text-[14px] rounded-xl border border-[#DDDDDD] p-3 bg-white text-[#222222] focus:outline-none focus:border-[#222222]"
                  required
                />
              </div>
            </>
          )}

          {/* Escrow note */}
          <div className="bg-[#F7F7F7] p-4 rounded-2xl border border-[#EBEBEB] flex items-center gap-2.5 text-[13px] sm:text-[14px] text-[#717171]">
            <ShieldCheck className="w-5 h-5 text-[#008A05] shrink-0" />
            <span>
              {l(
                'Tài khoản mới sẽ lập tức được đồng bộ vào cơ sở dữ liệu chung. Bạn có thể tương tác trực tiếp với Luna Coffee hoặc @linhfoodie ngay tức thì!',
                'Your custom profile will immediately synchronize into the shared database. You can interact directly with Luna Coffee or @linhfoodie right away!',
                '새로운 프로필이 전체 시스템에 즉시 동기화됩니다. Luna Coffee 매장 또는 @linhfoodie 크리에이터와 즉시 소통할 수 있습니다!'
              )}
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#EBEBEB]">
            <button
              type="button"
              onClick={() => setShowNewbieModal(false)}
              className="px-4 py-2.5 text-[14px] font-semibold text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] rounded-xl cursor-pointer transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 btn-airbnb-primary text-white text-[14px] font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{t.newbieSubmit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
