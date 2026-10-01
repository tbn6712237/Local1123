import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  Bell, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  Camera, 
  PlusCircle,
  Search,
  Menu,
  User,
  ArrowLeft,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { Logo } from './Logo';
import { LanguageDropdown } from './LanguageDropdown';

interface TopBarProps {
  onOpenLanding: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenLanding }) => {
  const { 
    role, 
    setRole, 
    activeBusiness, 
    activeCreator, 
    notifications, 
    setShowNotificationDrawer,
    setShowDemoWalkthrough,
    setShowNewbieModal,
    resetDemoData,
    setCurrentView,
    currentView
  } = useApp();

  const { t, lang, l } = useT();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    setCurrentView('discover');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Airbnb-Style Logo & Return */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onOpenLanding}
            className="text-left transition-transform active:scale-95 cursor-pointer"
            title={t.home}
          >
            <Logo size="md" showSubtitle={false} />
          </button>
        </div>

        {/* Zone 2: The Iconic Airbnb Search Pill */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-lg">
          <button
            onClick={handleSearchClick}
            className="flex items-center justify-between w-full max-w-md px-4 py-2 border border-[#DDDDDD] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all cursor-pointer bg-white group text-left"
          >
            <div className="flex items-center text-[14px] text-[#222222] divide-x divide-[#DDDDDD]">
              <span className="pr-3 pl-1 truncate font-semibold">
                {role === 'business' ? l('Nhà sáng tạo', 'Any Creator', '크리에이터') : l('Mọi chiến dịch', 'Any Campaign', '모든 캠페인')}
              </span>
              <span className="px-3 truncate text-[#717171] font-normal">
                {l('Hà Nội', 'Hanoi Local', '하노이 지역')}
              </span>
              <span className="pl-3 truncate text-[#717171] font-normal">
                {l('Mọi ngân sách', 'Any Budget', '예산 전체')}
              </span>
            </div>

            {/* Red Circle Search Button */}
            <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0 group-hover:bg-[#1D4ED8] transition-colors ml-2">
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Zone 3: Airbnb Actions, Mode Switch, Globe & Profile Pill */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Switch Role Button - Airbnb "Airbnb your home" style */}
          <button
            onClick={() => setRole(role === 'business' ? 'creator' : 'business')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer whitespace-nowrap"
            title={role === 'business' ? 'Chuyển sang chế độ Creator' : 'Chuyển sang chế độ Doanh nghiệp'}
          >
            {role === 'business' ? (
              <>
                <Camera className="w-4 h-4 text-[#2563EB]" />
                <span>{t.creatorMode}</span>
              </>
            ) : (
              <>
                <Building2 className="w-4 h-4 text-[#2563EB]" />
                <span>{t.businessMode}</span>
              </>
            )}
          </button>

          {/* Newbie Fast Button - Airbnb Experience host style */}
          <button
            onClick={() => setShowNewbieModal(true)}
            className="hidden lg:flex items-center gap-1.5 text-[14px] font-semibold text-[#222222] hover:bg-[#F7F7F7] px-3.5 py-2.5 rounded-full transition-colors cursor-pointer"
            title={t.newbieModeBtn}
          >
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>{t.newbieModeBtn}</span>
          </button>

          {/* Language Globe Button */}
          <LanguageDropdown variant="light" />

          {/* Notification Button with Red Badge */}
          <button
            onClick={() => setShowNotificationDrawer(true)}
            className="relative p-2.5 rounded-full text-[#222222] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#2563EB]" />
            )}
          </button>

          {/* User Menu Capsule - Iconic Airbnb Profile Pill */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 border border-[#DDDDDD] hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all rounded-full p-1 pl-3.5 bg-white cursor-pointer"
            >
              <Menu className="w-4 h-4 text-[#222222]" />
              <div className="w-7 h-7 rounded-full bg-[#717171] text-white flex items-center justify-center overflow-hidden font-semibold text-[12px]">
                {role === 'business' ? (
                  activeBusiness.logo ? (
                    <img src={activeBusiness.logo} alt={activeBusiness.name} className="w-full h-full object-cover" />
                  ) : (
                    activeBusiness.name.slice(0, 1)
                  )
                ) : (
                  activeCreator.avatar ? (
                    <img src={activeCreator.avatar} alt={activeCreator.name} className="w-full h-full object-cover" />
                  ) : (
                    activeCreator.name.slice(0, 1)
                  )
                )}
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] border border-[#EBEBEB] py-2 z-50 text-[14px]">
                <div className="px-4 py-2 border-b border-[#EBEBEB]">
                  <span className="text-[11px] font-semibold text-[#717171] uppercase tracking-wider block">
                    {role === 'business' ? t.roleBizTitle : t.roleCreatorTitle}
                  </span>
                  <p className="font-semibold text-[#222222] truncate">
                    {role === 'business' ? activeBusiness.name : activeCreator.name}
                  </p>
                  <p className="text-[13px] text-[#717171] truncate">
                    {role === 'business' ? activeBusiness.location : activeCreator.username}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setRole(role === 'business' ? 'creator' : 'business');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#F7F7F7] text-[#222222] font-semibold flex items-center justify-between cursor-pointer"
                  >
                    <span>{role === 'business' ? t.creatorMode : t.businessMode}</span>
                    <span className="text-[13px] text-[#2563EB] font-semibold">Switch</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowNewbieModal(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F7F7] text-[#222222] flex items-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-[#2563EB]" />
                    <span>{t.newbieModeBtn}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowDemoWalkthrough(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F7F7] text-[#222222] flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    <span>{t.scenarioGuideBtn}</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenLanding();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F7F7] text-[#222222] flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#717171]" />
                    <span>{lang === 'vi' ? 'Màn hình chính' : 'Home screen'}</span>
                  </button>
                </div>

                <div className="border-t border-[#EBEBEB] pt-1 mt-1">
                  <button
                    onClick={() => {
                      resetDemoData();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F7F7] text-[#717171] text-[13px] flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#717171]" />
                    <span>{t.resetDemoBtn}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
