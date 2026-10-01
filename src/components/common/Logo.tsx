import React from 'react';
import { useT } from '../../i18n/useT';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const CollabLocalIcon: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="collabLocalBrandGrad" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="35%" stopColor="#2563EB" />
        <stop offset="70%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#111827" />
      </linearGradient>
      <linearGradient id="collabLocalGoldDot" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    
    {/* Circular Badge */}
    <circle cx="50" cy="50" r="48" fill="url(#collabLocalBrandGrad)" />
    
    {/* Subtle inner highlight border */}
    <circle cx="50" cy="50" r="47" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />

    {/* Location Pin Head (Local Venue Discovery) */}
    <path 
      d="M 50 24 C 42.5 24 36.5 30 36.5 37.5 C 36.5 44 43 51.5 50 56.5 C 57 51.5 63.5 44 63.5 37.5 C 63.5 30 57.5 24 50 24 Z" 
      fill="white" 
    />
    
    {/* Pin Inner Dot (Blue Iris) */}
    <circle cx="50" cy="36" r="6" fill="#2563EB" />

    {/* Outer Camera / Venue Frame (Content Creator & Local Business) */}
    <rect 
      x="23" 
      y="43" 
      width="54" 
      height="33" 
      rx="16.5" 
      fill="none" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round" 
    />

    {/* Center Lens Ring */}
    <circle 
      cx="50" 
      cy="59.5" 
      r="8.5" 
      fill="none" 
      stroke="white" 
      strokeWidth="5" 
    />

    {/* Amber Golden Dot (Camera Flash / Escrow Prestige) */}
    <circle 
      cx="65.5" 
      cy="52" 
      r="4" 
      fill="url(#collabLocalGoldDot)" 
    />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = false, className = '' }) => {
  const { t } = useT();

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-[17px]',
    md: 'text-[19px]',
    lg: 'text-[22px]',
    xl: 'text-[28px]'
  };

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Official CollabLocal Emblem from uploaded asset */}
      <div className={`${iconSizes[size]} shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200 drop-shadow-xs`}>
        <CollabLocalIcon />
      </div>

      <div>
        <div className="flex items-center">
          <span className={`font-bold tracking-tight text-[#0F172A] font-display leading-none ${textSizes[size]}`}>
            Collab<span className="text-[#2563EB]">Local</span>
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] font-medium text-[#64748B] block mt-0.5">
            {t.brandTagline}
          </span>
        )}
      </div>
    </div>
  );
};
