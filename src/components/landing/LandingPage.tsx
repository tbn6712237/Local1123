import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Building2, 
  Camera, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Check, 
  TrendingUp, 
  Layers, 
  Lock, 
  Star,
  Users,
  Code2,
  UserCheck,
  HeartHandshake,
  Plus,
  Globe
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { LanguageDropdown } from '../common/LanguageDropdown';

interface LandingPageProps {
  onEnterApp: (selectedRole: 'business' | 'creator') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { setRole, setShowDemoWalkthrough, setShowNewbieModal } = useApp();
  const { t, lang } = useT();

  const handleSelectRole = (chosenRole: 'business' | 'creator') => {
    setRole(chosenRole);
    onEnterApp(chosenRole);
  };

  const handleOpenNewbie = () => {
    setShowNewbieModal(true);
  };

  const DEV_TEAM = [
    {
      num: '01',
      name: lang === 'ko' ? '신예림' : 'Shin Yerim',
      sub: lang === 'ko' ? 'Shin Yerim' : '신예림',
      tag: '01'
    },
    {
      num: '02',
      name: lang === 'vi' ? 'Jennifer - Nguyễn Bảo Trân' : lang === 'ko' ? '제니퍼 - 응우옌 바오 쩐' : 'Jennifer - Nguyen Bao Tran',
      sub: 'Jennifer',
      tag: '02'
    },
    {
      num: '03',
      name: lang === 'vi' ? 'Bob - Nguyễn Thạc Dương' : lang === 'ko' ? '밥 - 응우옌 탁 드엉' : 'Bob - Nguyen Thac Duong',
      sub: 'Bob',
      tag: '03'
    },
    {
      num: '04',
      name: lang === 'vi' ? 'Ben - Nguyễn Bảo Nam' : lang === 'ko' ? '벤 - 응우옌 바오 남' : 'Ben - Nguyen Bao Nam',
      sub: 'Ben',
      tag: '04'
    }
  ];

  const LIFECYCLE_STEPS = [
    { num: '01', title: t.stepDiscover, desc: t.stepDiscoverDesc },
    { num: '02', title: t.stepMatch, desc: t.stepMatchDesc },
    { num: '03', title: t.stepNegotiate, desc: t.stepNegotiateDesc },
    { num: '04', title: t.stepBook, desc: t.stepBookDesc },
    { num: '05', title: t.stepCollab, desc: t.stepCollabDesc },
    { num: '06', title: t.stepSubmit, desc: t.stepSubmitDesc },
    { num: '07', title: t.stepApprove, desc: t.stepApproveDesc },
    { num: '08', title: t.stepPay, desc: t.stepPayDesc },
    { num: '09', title: t.stepReview, desc: t.stepReviewDesc },
    { num: '10', title: t.stepAnalyze, desc: t.stepAnalyzeDesc }
  ];

  return (
    <div className="min-h-screen bg-white text-[#222222] flex flex-col">
      {/* Top Banner */}
      <div className="bg-[#222222] text-white py-2.5 px-4 text-center text-xs font-medium flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 rounded-full h-2 bg-[#FF385C]" />
          <span className="text-white/90">{t.landingBadge}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDemoWalkthrough(true)}
            className="underline text-white hover:text-white/80 transition-colors cursor-pointer font-semibold"
          >
            {t.scenarioGuideBtn}
          </button>
          <span className="text-white/40">·</span>
          {/* Smooth Language Dropdown */}
          <LanguageDropdown variant="dark" />
        </div>
      </div>

      {/* Header */}
      <header className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-5 flex items-center justify-between border-b border-[#EBEBEB] bg-white sticky top-0 z-30">
        <Logo size="md" />

        <div className="flex items-center gap-3">
          {/* Language Dropdown in Header */}
          <LanguageDropdown variant="light" />

          <button
            onClick={handleOpenNewbie}
            className="text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] border border-[#DDDDDD] px-4 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FF385C]" />
            <span className="hidden sm:inline">{t.newbieModeBtn}</span>
            <span className="sm:hidden">+ Newbie</span>
          </button>

          <button
            onClick={() => handleSelectRole('business')}
            className="text-[14px] font-semibold btn-airbnb-primary px-5 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>{t.enterApp}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 sm:px-8 pt-12 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F6] border border-[#FF385C]/20 text-[#FF385C] text-[13px] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF385C]" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight text-[#222222] mb-5 font-display leading-[1.12]">
            {t.heroHeadline}
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#717171] max-w-2xl mx-auto leading-relaxed">
            {t.heroSubheadline}
          </p>
        </div>

        {/* 3 Entry Cards: Business, Creator, and NEWBIE MODE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {/* Card 1: Doanh Nghiệp (Luna Coffee) */}
          <div 
            onClick={() => handleSelectRole('business')}
            className="group relative bg-white rounded-3xl p-7 border border-[#EBEBEB] hover:border-[#DDDDDD] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFF8F6] text-[#FF385C] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[12px] font-semibold text-[#FF385C] tracking-wider uppercase">{t.roleBizTitle}</span>
                <span className="text-[12px] text-[#717171]">· Demo Luna Coffee</span>
              </div>
              <h2 className="text-[22px] font-semibold text-[#222222] mb-2 font-display">
                {t.roleBizSub}
              </h2>
              <p className="text-[14px] text-[#717171] leading-relaxed mb-5">
                {t.roleBizDesc}
              </p>

              <ul className="space-y-2.5 text-[14px] text-[#717171] mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF385C] shrink-0" />
                  <span>{lang === 'vi' ? 'Bản đồ vị trí & duyệt hồ sơ xác thực' : lang === 'ko' ? '위치 기반 지도 탐색 & 검증된 프로필' : 'Map-based discovery & verified profiles'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF385C] shrink-0" />
                  <span>{lang === 'vi' ? 'Tạo chiến dịch với thù lao rõ ràng' : lang === 'ko' ? '투명한 예산 조건의 캠페인 개설' : 'Create campaigns with upfront budgets'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF385C] shrink-0" />
                  <span>{lang === 'vi' ? 'Ký quỹ Escrow bảo vệ an toàn' : lang === 'ko' ? '안전한 에스크로 예치금 결제 보호' : 'Secured Escrow payment protection'}</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3 px-4 btn-airbnb-primary text-[14px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <span>{t.roleBizBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 2: Creator (@linhfoodie) */}
          <div 
            onClick={() => handleSelectRole('creator')}
            className="group relative bg-white rounded-3xl p-7 border border-[#EBEBEB] hover:border-[#DDDDDD] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] text-[#222222] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[12px] font-semibold text-[#222222] tracking-wider uppercase">{t.roleCreatorTitle}</span>
                <span className="text-[12px] text-[#717171]">· Demo @linhfoodie</span>
              </div>
              <h2 className="text-[20px] font-semibold text-[#222222] mb-2 font-display">
                {t.roleCreatorSub}
              </h2>
              <p className="text-[14px] text-[#717171] leading-relaxed mb-5">
                {t.roleCreatorDesc}
              </p>

              <ul className="space-y-2.5 text-[14px] text-[#717171] mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#222222] shrink-0" />
                  <span>{lang === 'vi' ? 'Quẹt thẻ chiến dịch theo vị trí' : lang === 'ko' ? '근처 매장 캠페인 스와이프 매칭' : 'Swipe deck matching nearby venues'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#222222] shrink-0" />
                  <span>{lang === 'vi' ? 'Thương lượng báo giá trực tiếp' : lang === 'ko' ? '실시간 1:1 견적 협상 및 역제안' : 'Direct negotiation & counteroffers'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#222222] shrink-0" />
                  <span>{lang === 'vi' ? 'Đảm bảo nhận tiền 100% khi duyệt' : lang === 'ko' ? '영상 승인 시 100% 정산 지급 보장' : '100% guaranteed payout upon approval'}</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3 px-4 border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] text-[14px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span>{t.roleCreatorBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 3: NEWBIE MODE (Tự Tạo Hồ Sơ - Dành Cho Thầy Cô & Giám Khảo) */}
          <div 
            onClick={handleOpenNewbie}
            className="group relative bg-[#F7F7F7] rounded-3xl p-7 border border-[#EBEBEB] hover:border-[#DDDDDD] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#222222] text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[12px] font-semibold text-[#222222] tracking-wider uppercase">{t.roleNewbieTitle}</span>
                <span className="text-[11px] bg-white border border-[#DDDDDD] text-[#222222] font-semibold px-2 py-0.5 rounded-full">
                  {lang === 'vi' ? 'Thầy Cô / Mới' : lang === 'ko' ? '평가자 / 신규' : 'Evaluators'}
                </span>
              </div>
              <h2 className="text-[20px] font-semibold text-[#222222] mb-2 font-display">
                {t.roleNewbieSub}
              </h2>
              <p className="text-[14px] text-[#717171] leading-relaxed mb-5">
                {t.roleNewbieDesc}
              </p>

              <ul className="space-y-2.5 text-[14px] text-[#717171] mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#222222] shrink-0" />
                  <span>{lang === 'vi' ? 'Tự đặt tên quán, mức giá & mô tả' : lang === 'ko' ? '매장명, 단가, 소개글 자유 입력' : 'Custom venue name, rates & bio'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#222222] shrink-0" />
                  <span>{lang === 'vi' ? 'Lập tức đồng bộ vào database chung' : lang === 'ko' ? '모의 데이터베이스에 실시간 반영' : 'Instantly synchronized in mock DB'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#222222] shrink-0" />
                  <span>{lang === 'vi' ? 'Tương tác hai chiều với tài khoản mẫu' : lang === 'ko' ? '양방향 매칭 및 협업 룸 즉시 연동' : 'Two-way matching across both modes'}</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-3 px-4 bg-[#222222] hover:bg-black text-white text-[14px] font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer">
              <Sparkles className="w-4 h-4 text-[#FF385C]" />
              <span>{t.roleNewbieBtn}</span>
            </button>
          </div>
        </div>

        {/* Development Team Section */}
        <div className="bg-white rounded-3xl p-8 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#FF385C]">
              {t.devTeamTitle}
            </span>
          </div>
          <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#222222] font-display mb-2">
            {t.devTeamHeadline}
          </h3>
          <p className="text-[14px] text-[#717171] mb-6 max-w-xl">
            {t.devTeamSub}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEV_TEAM.map((dev) => (
              <div 
                key={dev.num}
                className="p-5 rounded-2xl bg-[#F7F7F7] border border-[#EBEBEB] hover:border-[#222222] hover:bg-white hover:shadow-md transition-all flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#222222] text-white font-semibold text-[13px] flex items-center justify-center font-mono shrink-0">
                  {dev.num}
                </div>
                <div className="min-w-0">
                  <h4 className="text-[15px] font-semibold text-[#222222] truncate">
                    {dev.name}
                  </h4>
                  {dev.sub && (
                    <span className="text-[13px] text-[#717171] font-normal block truncate">
                      {dev.sub}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Stay on Platform (Business Model & Escrow Protection) */}
        <div className="bg-[#222222] text-white rounded-3xl p-8 sm:p-12 mb-20 shadow-xl">
          <div className="max-w-2xl mb-10">
            <span className="text-[12px] font-semibold text-[#FF385C] uppercase tracking-wider block mb-2">
              {t.whyStayTitle}
            </span>
            <h3 className="text-2xl sm:text-[32px] font-semibold font-display mb-3">
              {t.whyStayHeadline}
            </h3>
            <p className="text-[15px] text-white/70 leading-relaxed">
              {t.whyStayDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <ShieldCheck className="w-6 h-6 text-[#FF385C] mb-3" />
              <h4 className="text-[18px] font-semibold mb-1.5">{t.featureEscrowTitle}</h4>
              <p className="text-[14px] text-white/70 leading-relaxed">{t.featureEscrowDesc}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <MapPin className="w-6 h-6 text-[#FF385C] mb-3" />
              <h4 className="text-[18px] font-semibold mb-1.5">{t.featureLocationTitle}</h4>
              <p className="text-[14px] text-white/70 leading-relaxed">{t.featureLocationDesc}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <TrendingUp className="w-6 h-6 text-[#FF385C] mb-3" />
              <h4 className="text-[18px] font-semibold mb-1.5">{t.featureTrackingTitle}</h4>
              <p className="text-[14px] text-white/70 leading-relaxed">{t.featureTrackingDesc}</p>
            </div>
          </div>
        </div>

        {/* 10-Step Collaboration Chain */}
        <div className="bg-white rounded-3xl p-8 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-12">
          <div className="text-center mb-8">
            <span className="text-[12px] font-semibold text-[#717171] uppercase tracking-wider">
              {t.lifecycleTitle}
            </span>
            <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#222222] mt-1 font-display">
              {t.lifecycleHeadline}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {LIFECYCLE_STEPS.map((st) => (
              <div key={st.num} className="p-4 rounded-2xl bg-[#F7F7F7] border border-[#EBEBEB] hover:border-[#222222] hover:bg-white transition-all">
                <span className="text-[13px] font-semibold text-[#FF385C] block mb-1 font-mono">{st.num}</span>
                <span className="text-[14px] font-semibold text-[#222222] block mb-0.5">{st.title}</span>
                <span className="text-[12px] text-[#717171] leading-tight block">{st.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Airbnb-style Footer */}
      <footer className="border-t border-[#EBEBEB] bg-[#F7F7F7] py-8 text-[14px] text-[#717171]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 CollabLocal, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">Company details</span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageDropdown variant="light" showLabel />
            <span className="font-semibold text-[#222222] text-[14px]">₫ VND</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
