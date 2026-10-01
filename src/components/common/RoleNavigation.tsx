import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  LayoutDashboard, 
  Compass, 
  MapPin, 
  Layers, 
  Handshake, 
  MessageSquare, 
  BarChart3, 
  User, 
  Sparkles, 
  Wallet,
  Building2,
  Heart
} from 'lucide-react';

export const RoleNavigation: React.FC = () => {
  const { role, currentView, setCurrentView, matches, setViewingBusinessId, setViewingCreatorId, activeBusiness, activeCreator } = useApp();
  const { t } = useT();

  const isBusiness = role === 'business';
  const activeCollabsCount = matches.filter(m => m.status !== 'completed').length;

  const businessNav = [
    { id: 'discover', label: t.navDiscoverCreators, icon: Compass },
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'map', label: t.navMap, icon: MapPin },
    { id: 'campaigns', label: t.navCampaigns, icon: Layers },
    { id: 'matches', label: t.navMatches, icon: Handshake },
    { id: 'collab', label: t.navCollabRoom, icon: MessageSquare, badge: activeCollabsCount },
    { id: 'analytics', label: t.navAnalytics, icon: BarChart3 },
    { id: 'profile', label: t.navProfileBiz, icon: User, onClick: () => setViewingBusinessId(activeBusiness.id) }
  ];

  const creatorNav = [
    { id: 'discover', label: t.navDiscoverCampaigns, icon: Compass },
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'map', label: t.navMap, icon: MapPin },
    { id: 'swipe', label: t.navSwipe, icon: Heart },
    { id: 'matches', label: t.navMatches, icon: Handshake },
    { id: 'collab', label: t.navCollabRoom, icon: MessageSquare, badge: activeCollabsCount },
    { id: 'earnings', label: t.navEarnings, icon: Wallet },
    { id: 'profile', label: t.navProfileCreator, icon: User, onClick: () => setViewingCreatorId(activeCreator.id) }
  ];

  const navItems = isBusiness ? businessNav : creatorNav;

  return (
    <>
      {/* Desktop Airbnb Category Bar */}
      <nav className="bg-white border-b border-[#EBEBEB] sticky top-20 z-30 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-6 md:gap-8 overflow-x-auto pt-3 pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    setCurrentView(item.id);
                  }
                }}
                className={`flex flex-col items-center gap-1.5 pb-2.5 border-b-2 whitespace-nowrap transition-all duration-150 cursor-pointer relative group ${
                  isActive
                    ? 'border-[#222222] text-[#222222] opacity-100'
                    : 'border-transparent text-[#717171] opacity-75 hover:opacity-100 hover:border-[#DDDDDD] hover:text-[#222222]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-105 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#2563EB] text-white text-[10px] font-semibold flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className={`text-[12px] tracking-tight ${isActive ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Airbnb Fixed Bottom Tab Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EBEBEB] px-3 py-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setCurrentView(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer ${
                isActive ? 'text-[#2563EB]' : 'text-[#717171] hover:text-[#222222]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#2563EB]" />
                ) : null}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-semibold text-[#222222]' : 'font-normal'}`}>
                {item.label.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
